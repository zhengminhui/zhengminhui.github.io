---
title: Run React Native App on Mac
categories:
  - web
tags:
  - react
  - react native
postSlug: b18b9540
date: 2018-02-05 01:05:04
---

1. make sure installed LATEST Xcode on your mac. Be make sure check your app store to upgrade your Xcode to latest version.
2. install homebrew or nvm, so you can install node and manage your nodejs version.
3. install nodejs and npm
4. install watchman
5. install react native cli such as `react-native-cli`
6. create your react native project using `react-native init <project-name>`

After installing these tools, use `react-native run-ios` to start your simulator.

And in case if you met this error code when you run `react-native run-ios [--simulator="iPhone X"]`

```shell
Found Xcode project TestProject.xcodeproj
xcrun: error: unable to find utility "instruments", not a developer
tool or in PATH

Command failed: xcrun instruments -s
xcrun: error: unable to find utility "instruments", not a developer
tool or in PATH
```

this is because you did not set your xcode's command line tools, so your can go to `preference -> locations -> Command Line Tools` to select.

![xcode command line tools](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/760e08710688460499ed894397ed156a~tplv-k3u1fbpfcp-watermark.image)
