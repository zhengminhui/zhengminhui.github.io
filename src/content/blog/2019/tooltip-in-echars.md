---
title: 通过 confine 研究 tooltip 的实现过程 -- eCharts 源码解读
categories:
  - web
tags:
  - echarts
  - zrender
  - tooltip
  - confine
abbrlink: 9176cb10
date: 2019-11-05 23:09:13
---

实现业务需求时发现 tooltip 中呈现的内容比较多，当出现在边界时会出现一部分在可视范围以外。所幸 echarts 提供了一个 confine 配置给 tooltip，当为 true 时，可以强制使 tooltip 出现在 view 视图中。

接下来来看看源码中是怎样实现 confine 功能的。

首先可以看到，confine 是在 `src/component/tooltip/TooltipModel.js` 中定义，默认值是 `false`

```js
// 是否约束 content 在 viewRect 中。默认 false 是为了兼容以前版本。
export default echarts.extendComponentModel({
  type: "tooltip",

  dependencies: ["axisPointer"],

  defaultOption: {
    // ...
    // 'trigger' only works on coordinate system.
    // 'item' | 'axis' | 'none'
    trigger: "item",
    // 'click' | 'mousemove' | 'none'
    triggerOn: "mousemove|click",
    // 是否约束 content 在 viewRect 中。默认 false 是为了兼容以前版本。
    confine: false,

    // ...
  },
});
```

接下来，可以看到在同级目录下的 `TooltipView.js` 文件，这里负责定义了 TooltipView 相关的显示、隐藏、更新位置等的方法。在该文件中搜索 confine，发现相关代码主要是两处，一处是 `confineTooltipPosion` function，这里很好理解，通过计算当前 x、y 值，和当前的可视范围的宽高 viewWidth, viewHeight 比较，得到 confine 之后新的 x、y 值。 另一处则是调用`confineTooltipPosion`的 `_updatePosition` 方法.

在这里，一共定义了三种 showTooltip 方法，对应不同的对象。分别是 \_showAxisTooltip, \_showComponentItemTooltip 和 \_showSeriesItemTooltip . 我们只关注 series 中 item 的 tooltip， 至于 AxisTooltip 和 ComponentItemTooltip，在原理上基本一致。

梳理一番之后发现，在该类中，方法的调用链是 `confineTooltipPosion` -> `_updatePosition` -> `_showTooltipContent` -> `_showSeriesItemTooltip` -> `_tryShow` -> `_initGlobalListener` -> `render`. 执行顺序是从右至左。

理清了思路，接下来我们来看代码是如何实现 confine 的过程。

弄清了执行顺序后，就很好理解 tooltip 的渲染过程了。在生命周期 render 函数中，调用了 `_initGlobalListener`，在该方法中， 可以获取到一个共享的全局监听器 `globalListener`. 这个监听器具体实现和属性可参见`src/component/axisPointer/globalListener.js`。 这里我们先关注暴露出来的 `register`方法，他接受三个 arguments: `function register(key, api, handler)`; 所以这里就很好理解了，在初始化阶段，判断 tooltip 的触发条件（triggerOn:'click' | 'mousemove' | 'none' ）， 如果不是`none`， 则 globalListener 给`itemTooltip` 注册了回调 handler。当 `currTrigger`是 `click`或`mousemove` 时，调用 `_tryShow` 显示 tooltip，当 leave 时调用 `_hide`。

```js
// _initGlobalListener
var tooltipModel = this._tooltipModel;
var triggerOn = tooltipModel.get("triggerOn");

globalListener.register(
  "itemTooltip",
  this._api,
  bind(function (currTrigger, e, dispatchAction) {
    // If 'none', it is not controlled by mouse totally.
    if (triggerOn !== "none") {
      if (triggerOn.indexOf(currTrigger) >= 0) {
        this._tryShow(e, dispatchAction);
      } else if (currTrigger === "leave") {
        this._hide(dispatchAction);
      }
    }
  }, this)
);
```

tryShow 调用后, 我们可以看到这个方法实现非常直观，根据条件来判断显示 series、component 还是 axis 的 tooltip。我们重点关注\_showSeriesItemTooltip.

走到\_showSeriesItemTooltip，这个函数声明并计算了一系列的变量，都是为了 function \_showTooltipContent 的参数做准备。我们可以看到

```js
this._showOrMove(tooltipModel, function () {
  this._showTooltipContent(
    tooltipModel,
    defaultHtml,
    params,
    asyncTicket,
    e.offsetX,
    e.offsetY,
    e.position,
    e.target,
    markers
  );
});
```

结合 echarts tooltip 的文档和 tooltipModel 来看，我们可以传入一个配置参数 showDelay，如果 delay 大于 0 则 setTimeout，若干秒后执行回调函数，在这里则是显示 toolTip（ \_showTooltipContent）；否则立即执行 callback。不过官方文档并不建议设置 delay。 所以我们可以认为\_showOrMove 是个定时器，到了时间后显示 tooltip。\_showOrMove 实现如下。

```js
//_showOrMove
// showDelay is used in this case: tooltip.enterable is set
// as true. User intent to move mouse into tooltip and click
// something. `showDelay` makes it easyer to enter the content
// but tooltip do not move immediately.
var delay = tooltipModel.get("showDelay");
cb = zrUtil.bind(cb, this);
clearTimeout(this._showTimout);
delay > 0 ? (this._showTimout = setTimeout(cb, delay)) : cb();
```

回到\_showTooltipContent， 在这个方法里我们知道了 echarts 如何兼容 formatter，传入 string 和 function 时不同的处理方法。通过 typeof 判断后，如果是 string， 则通过 `formatUtil.formatTpl` 直接 replace, return 一个 tpl<string>; 如果 typeof 是 function， 则通过 `.innerHTML` 插入一段新的 string.

关键代码如下, 实现逻辑在这里就不过多关注了。

```js
// is string formatTpl
/**
 * Template formatter
 * @param {string} tpl
 * @param {Array.<Object>|Object} paramsList
 * @param {boolean} [encode=false]
 * @return {string}
 */
export function formatTpl(tpl, paramsList, encode) {
  if (!zrUtil.isArray(paramsList)) {
    paramsList = [paramsList];
  }
  var seriesLen = paramsList.length;
  if (!seriesLen) {
    return "";
  }

  var $vars = paramsList[0].$vars || [];
  for (var i = 0; i < $vars.length; i++) {
    var alias = TPL_VAR_ALIAS[i];
    tpl = tpl.replace(wrapVar(alias), wrapVar(alias, 0));
  }
  for (var seriesIdx = 0; seriesIdx < seriesLen; seriesIdx++) {
    for (var k = 0; k < $vars.length; k++) {
      var val = paramsList[seriesIdx][$vars[k]];
      tpl = tpl.replace(
        wrapVar(TPL_VAR_ALIAS[k], seriesIdx),
        encode ? encodeHTML(val) : val
      );
    }
  }

  return tpl;
}
```

```js
// is function, setContent
setContent: function (content) {
  this.el.innerHTML = content == null ? '' : content;
},
```

这里插一个题外话， HTML5 规范中表示 `<script>` tag 中的内容在使用 `innerHTML` 插入时是不应该被执行的

```js
name = "<script>alert('I am John in an annoying alert!')</script>";
el.innerHTML = name; // harmless in this case
```

但是当不使用 `<script>` tag 并使用 innerHTML 插入 string 时，则会有 croos-site scripting attact 风险

```js
const name = "<img src='x' onerror='alert(1)'>";
el.innerHTML = name; // shows the alert
```

基于这个原因，推荐使用 `Node.textContent` 而不是使用 `innerHTML`

好了，终于生成了 content，和需要的坐标、参数等，这个时候调用了 \_updatePosition. 在\_updatePosition 中我们看到 echats 是如何去做当 position 字段传入 string, array 和 function 时的处理方法的。如果对这里感兴趣可以关注一下。 在这个方法的最后，我们看到了对 confine 的判断，如果为 true，则再次调用 confineTooltipPosition, 返回新的 x，y 坐标。然后将 content 移动到新的坐标位置。

```js
var viewWidth = this._api.getWidth();
var viewHeight = this._api.getHeight();

// ...

if (tooltipModel.get("confine")) {
  var pos = confineTooltipPosition(x, y, content, viewWidth, viewHeight);
  x = pos[0];
  y = pos[1];
}

content.moveTo(x, y);
```

这里看到 echarts 获取可视范围的高宽，是通过封装在内的 \_api 内的方法获得。这里涉及到更底层的关于 echarts 调用 zrender 生成 root 绘图容器的过程，基本原理是先获取绘图区域实例，根据该实例再获取高宽。具体过程在此不作赘述。留个记录，有机会再来解析那一部分。具体代码可以参考 `zrender/src/Painter.js`.

回到 `confineTooltipPosition` 方法， 根据前面方法的定义，这里的 x，y 是 e.offsetX 和 e.offsetY. 表示事件发生时鼠标 pointer 到 target node 的 padding 的距离。 而 width 和 height 分别是 clientWidth 和 clientHeight 加上 borderWidth. 通过位置的大小比较，可以保证新的 content 处于可视区域内。第一个 x 判断是否右边溢出，第二个 x 判断是否左边溢出。

```js
function confineTooltipPosition(x, y, content, viewWidth, viewHeight) {
  var size = content.getOuterSize();
  var width = size.width;
  var height = size.height;

  x = Math.min(x + width, viewWidth) - width;
  y = Math.min(y + height, viewHeight) - height;
  x = Math.max(x, 0);
  y = Math.max(y, 0);

  return [x, y];
}

getOuterSize: function () {
    var width = this.el.clientWidth;
    var height = this.el.clientHeight;

    // Consider browser compatibility.
    // IE8 does not support getComputedStyle.
    if (document.defaultView && document.defaultView.getComputedStyle) {
        var stl = document.defaultView.getComputedStyle(this.el);
        if (stl) {
            width += parseInt(stl.borderLeftWidth, 10) + parseInt(stl.borderRightWidth, 10);
            height += parseInt(stl.borderTopWidth, 10) + parseInt(stl.borderBottomWidth, 10);
        }
    }

    return {width: width, height: height};
}
```

然后把 content 移动到新生成的坐标上，至此就完成了 confine 的功能。

最后说一个看代码的心得，平常在实现一些公共 sdk 时，经常需要暴露一些 api，有的时候看到直接定义的是一个 array，然后调用方使用 `array[index]` 去获取某个方法。这样的坏处一个是数组的顺序无法保证，增、删之后 index 可能会变，给调用方造成影响。另外一个是，通过 index 获取时，对调用的方法名感知不到，不能确保使用的方法是否正确。 echarts 中的这个实现比较优雅，apiList 和真正暴露使用的 api 对象解耦。通过遍历 apiList， 产生一个包含 apiList 元素为 key 的对象，调用这个对象时，使用函数名，更直观，更友好，值得学习。

```js
import * as zrUtil from "zrender/src/core/util";

var echartsAPIList = [
  "getDom",
  "getZr",
  "getWidth",
  "getHeight",
  "getDevicePixelRatio",
  "dispatchAction",
  "isDisposed",
  "on",
  "off",
  "getDataURL",
  "getConnectedDataURL",
  "getModel",
  "getOption",
  "getViewOfComponentModel",
  "getViewOfSeriesModel",
];
// And `getCoordinateSystems` and `getComponentByElement` will be injected in echarts.js

function ExtensionAPI(chartInstance) {
  zrUtil.each(
    echartsAPIList,
    function (name) {
      this[name] = zrUtil.bind(chartInstance[name], chartInstance);
    },
    this
  );
}

export default ExtensionAPI;
```
