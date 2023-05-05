---
title: 搭建 Flutter 环境
categories:
  - web
tags:
  - Flutter
  - setup
abbrlink: ec9f837c
date: 2020-01-16 22:09:18
---
今年计划学习的新技术栈一个是 vue.js，等 3.0版本发布以后准备尝试一下。 另一个就是flutter。今天看了一下官方文档，按照文档在本机上把环境跑起来了。这里先记录一下搭建环境的步骤，也算是学习过程的一个记录。

这篇文章基本按照 https://flutter.dev/docs/get-started/install/macos 页面的指引一步步操作下来就可以在 mac 和 iphone 上运行 flutter demo 了。我把关键的命令和操作记录下来，过滤掉一些解释性的和暂时无关的文字，方便下次自己回顾，也可以当做一份汉化文档，方便初学者快速搭建环境排除掉一些其他的干扰。

### Flutter SDK ###

首先下载最新的 Flutter SDK，大约 1g 左右。下载完成之后，cd 到开发文件夹，执行 unzip 操作。

```bash
$ cd ~/development
$ unzip ~/Downloads/flutter_macos_v1.12.13+hotfix.5-stable.zip
```

如果不想使用固定版本的话，可以直接使用 git 操作，从 github 拉取最新的 flutter 源码。

```bash
 git clone https://github.com/flutter/flutter.git
```

之后将 `flutter` 操作添加到 path。

```bash
$ export PATH="$PATH:`pwd`/flutter/bin"
```

这只是临时添加到当前的 terminal 窗口，如果需要永久添加，可以阅读官方文档。这里我不想跑题，暂时不做展开，以后再讲。

### Run flutter doctor ###

进行完这三步之后，我们就可以跑一下命令行来看 flutter 是否安装完成。

```bash
$ flutter doctor
```

稍等片刻之后，会有一份 Doctor summary。在我的电脑上，因为没有安装 Android toolchain 和 Android Studio，所以这两项之前显示的是×。除此之外， Flutter，Xcode，VS Code， Connected Device 都是√，表明Flutter 已经配置好了。

### iOS setup ###

接下来我们就可以来针对 ios 配置一下开发环境。

首先安装最新版的 Xcode，如果不是最新版可以通过 mac app store 升级。

安装好之后，需要配置一下 Xcode 的命令行工具。执行如下操作

```bash
$ sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer
$ sudo xcodebuild -runFirstLaunch
```

最后需要确保同意 Xcode 证书。首次打开Xcode 或者在命令行执行一条语句都可以。

```bash
$ sudo xcodebuild -license
```

接下来我们在来配置 iOS 模拟器。

### iOS Simulator ###

命令行输入

```bash
$ open -a Simulator
```

该命令会默认打开最新的 iOS 机器，如果想换其他型号的 iphone 或者其他设备，可以从 Hardware > Device 下来选择你想要的机型。

### Create and run a flutter app ###

接下来我们创建一个官方的 demo 项目，并且把它跑起来。先保证 ios 模拟请还在运行，然后分别执行以下三条命令行。

```bash
$ flutter create my_app
$ cd my_app
$ flutter run
```

这时候我们就可以看到官方的 demo 跑起来了。

### Deploy to iOS devices

如果我们想在自己的 iOS 手机上运行 demo，可以通过 Xcode 来部署。

首先安装 CocoaPods。

```bash
$ sudo gem install cocoapods
$ pod setup
```

然后 cd 到 demo 的文件夹，执行

```bash
$ open ios/Runner.xcworkspace
```

打开之后，在 Xcode 左侧边栏选择 Runner项目。接下来我们来配置 Development Team。在 Runner 的配置页面，首先关注 Signing & Capabilities > Team。下来选择 Team，如果没有，可以使用自己的 Apple ID 创建一个 Personal Team， 不花钱，免费。创建完之后，我们需要修改一下 Bundle Identifier，这里的这个 identifier 需要保证)唯一性。


这里我遇到一个问题，The app ID "com.example.myapp" cannot be registered to your development team. Change your bundle identifier to a unique string to try again.  详情可以参见 https://github.com/flutter/flutter/issues/19498 。 

![github-issue](https://user-gold-cdn.xitu.io/2020/1/16/16faea496ad567c6?w=2526&h=1156&f=png&s=203465)

我解决的方法就是修改自动生成的 Bundle Identifier，按上图的例子，修改 example 或者 myapp 都可以解决问题。

最后可以通过flutter run 或者 点击 Xcode 上方的 build and run 按钮部署 demo app。

部署完之后，还需最后一步，在手机上添加信任 settings > general > profiles & device management ，找到 developer  app 下的自己开发账号的 app，点击 trust。

到此为止我们就完成了 flutter 开发环境的搭建，可以在电脑和自己的上运行 flutter 应用了。

我们下次再会。
