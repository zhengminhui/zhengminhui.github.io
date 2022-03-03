大家在面试中经常会被问到，浏览器事件循环和 node 事件循环有什么区别？

好问题。

简短说来，**从执行结果来看**，早期有区别，后来统一了。v11.0.0 (2018.10.23 release) 之后，没区别。

为什么？

看下面这段代码。

```js
setTimeout(() => console.log('timeout1'));
setTimeout(() => {
    console.log('timeout2')
    Promise.resolve().then(() => console.log('promise resolve'))
});
setTimeout(() => console.log('timeout3'));
setTimeout(() => console.log('timeout4'));
```

在浏览器中（chrome v89）

```shell
timeout1
timeout2
promise resolve
timeout3
timeout4
```

在 node 低于 v11.0.0环境中（在v6.11.2中验证，附赠一个[运行环境连接](https://www.tutorialspoint.com/execute_nodejs_online.php)）。

```sh
timeout1
timeout2
timeout3
timeout4
promise resolve
```

先看下node 11版本之前，node 是怎么执行的呢？

1. 执行完一个阶段的所有任务
2. 执行完nextTick队列里的内容
3. 执行完微任务队列里的内容

所以，可以理解上面的结果，先打完了timeout ，最后才来resolve。

但是这些都已经旧船票了，已经登不上新时代的大船了。

接下来看看浏览器里的执行顺序，也就是node 11以后的执行顺序，从那时起，大伙就是相亲相爱一家人了。

通俗说来，在浏览器环境中，事件循环分3步（第3步就是回到最初的起点）：

1. 运行时在每个事件循环开始时，依次执行task queue 中的每个task，在执行task的过程中，如果又有新的task添加进来怎么办。没办法，先来后到，你只能等下一次循环了。 
2. 第二步，当每一个 task 结束了，会去检查还有没有待执行的microtask，这里和 task 的显著区别是，他会等到microtask 队列为空才会停止。什么意思，如果一个微任务，不停的往微任务队列里添加新的微任务，那么，这一步骤就会头铁的进行下去。
3. microtask 执行完了，回到第1歩循环往复。

言归正传，我们再来看下面这个例子（验证环境 chrome 89 & node v14.16.0）。

```js
console.log(1);
setTimeout(function () {
  console.log(2);
  setTimeout(function () {
    console.log(3);
    Promise.resolve(4)
      .then((res) => {
        console.log(res); // 4
        setTimeout(function () {
          console.log(6);
        }, 0);
      })
      .then((res) => {
        console.log(res);
      })
      .then((res) => {
        console.log(res);
      })
      .then((res) => {
        console.log(res);
      });
  }, 0);
  setTimeout(function () {
    console.log(5);
  }, 0);
}, 0);

```

为了方便看一点，多 then 了几次。看看结果

```sh
1
2
3
4
undefined
undefined
undefined
5
6
```

可以看到，我们在then 中不断添加了新的 microtask 时，会继续执行下去，今日事今日毕。但是对于 task，不好意思，您往后稍稍。

v8博客上有张图，挺好。需要注意一点，图中 microtask 描述的是一个动态的过程，他还可以继续往 queue 里添加新的微任务，理解这点很重要。

![micro-tasks-vs-tasks.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7b1a464bf2a64aafb65ab790fdbf4bde~tplv-k3u1fbpfcp-watermark.image)

再来看下 node 中的event loop。

在这之前，解释一下为什么文章开头，我加粗的“从执行结果来看”。

本质上，事件循环是由宿主环境来实现，常见的宿主环境有web浏览器，nodejs，还有 Adobe Flash（没错，还有这个老哥，参见高程）。由于不同环境实现的不同，这也产生了这个古老的问题，“浏览器事件循环和 node 事件循环有什么区别？” 对于这种行为，这好吗？这不好。所以为了消除这种宿主环境之间执行的差异， node 11 之后改善了这个问题。

回到 node 官方文档，我们可以看到这么一张图流程图。

```
   ┌───────────────────────────┐
┌─>│           timers          │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │
│  └─────────────┬─────────────┘      ┌───────────────┐
│  ┌─────────────┴─────────────┐      │   incoming:   │
│  │           poll            │<─────┤  connections, │
│  └─────────────┬─────────────┘      │   data, etc.  │
│  ┌─────────────┴─────────────┐      └───────────────┘
│  │           check           │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │
   └───────────────────────────┘
```

这张图有点抽象，换一张。

![d502f94b-cc6c-4be7-ac8c-172897eefb05-original.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f9aa3e314b504fcfb4e4d78d760c44bf~tplv-k3u1fbpfcp-watermark.image)

关于事件循环的解释，网上的解释数不胜数。感觉不少都是把官方文档的内容颠来倒去拼凑一下。除了官方文档以外，还有一篇文章觉得值得一读（上图就是我借来的），同样也附在最后的链接部分。在这里我就不展开，或许下次专门写一篇文章来记录一下自己的阅读心得。

再说点题外话，截止到今天（2021-3-16）， 对于 task, microtask 的官方用词和翻译还是 “任务 task  vs 微任务 microtask”。没有所谓的“宏任务”，也没有“macrotask” 这玩意什么事。用于谦于老爷的话说，这都不挨着。

关于宏任务/ macrotask，打开掘金知乎，包括英文环境，随便搜一搜，大把的文章，到处都在说，到处都在用。但是去查官方文档，mdn，v8 blog，html spec 等等，很难找到这个词出现的源头。一个没有源头的词，出现了人传人现象，在各种文章图片中出现，很有趣。如果有朋友知道这个词的来历，欢迎指点。

好了，文章到此为止，谢谢大家的阅读，欢迎讨论和指正。

接下来补充一些辅助阅读材料。

1. mdn 文档。

   1. https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide
   2. https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide/In_depth

   一个小彩蛋，英文版的子标题， Run, JavaScript, run 是 Forrest Gump  里的经典台词，Run, Forrest , run!

2. Promise/A+: https://promisesaplus.com/#notes   

   文档中关于 platform code 的解释中有这么一段话 `This can be implemented with either a “macro-task” mechanism such as setTimeout or setImmediate, or with a “micro-task” mechanism such as MutationObserver or process.nextTick`。 这也是我为数不多检索到明确使用“macro”的一处，当然还特意加上了引号。

3. html 文档：https://html.spec.whatwg.org/multipage/webappapis.html#concept-agent-event-loop
4. nodejs 文档：https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/ 
5. nodejs 事件循环：https://www.voidcanvas.com/nodejs-event-loop/ ； 这篇文章的中文翻译：https://zhuanlan.zhihu.com/p/35918797
6. v8 博客关于任务，微任务的描述：https://v8.dev/blog/fast-async#tasks-vs.-microtasks
7. Jake Archibald 关于microtask 的文章，写于15年，仍然值得一读：https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/
8. 关于task 名称的讨论。
   1. https://www.zhihu.com/question/302612139
   2. https://www.zhihu.com/question/362096226
   3. https://weibo.com/1660579792/IkzWTc7FH

后记：

在写的过程中，看了不少材料，中文的，英文的，都有。发现可能只有1%的文章是经典，值得一读。其余的99%都是不知所云，机械复制粘贴，不说人话。甚至都不知道写完之后作者自己会不会去看。所以当我整理的过程中，也在思考，怎么把这件事用能被理解的方式，说清楚、讲明白，不仅是方便自己以后可以快速总结、回顾，也为不了解的朋友提供一些资料。这也是写这篇文章的初衷。