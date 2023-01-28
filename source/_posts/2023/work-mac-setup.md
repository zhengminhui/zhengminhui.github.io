---
title: my working mac setup as a web developer
categories:
  - tech
tags:
  - setup
  - workspace
  - web-development
abbrlink: mac-setup
date: 2023-01-28 14:56:12
---

This is my working mac setup checklist. I used these tools almost every day and I highly recommend them. I put the installation package on my NAS so that when I change my laptop, I can easily and quickly bring my development environment back.

Here is the checklist.

### Google Chrome

https://www.google.com/intl/zh-CN/chrome/

---

### ClashX

https://github.com/yichengchen/clashX

---

### Terminal

I used to use iterm2. But since I changed to warp, I feel like I cannot live without it. It looks nice and saves a lot of my time config it. I like the AI command auto-completion coming out of the box.

https://www.warp.dev/

---

#### Brew

Install brew via curl.
https://brew.sh/

Update and upgrade brew.

```
brew update && brew upgrade
```

---

#### ZSH and oh-my-zsh

First, install zsh via brew.

```shell
brew install zsh
```

Then install the oh-my-zsh plugin. I like it and will only some small changes on the top of the configurations.

https://ohmyz.sh/#install

Set proxy to terminal by adding this line at the top of your zshrc file.

`export https_proxy=http://127.0.0.1:7890 http_proxy=http://127.0.0.1:7890 all_proxy=socks5://127.0.0.1:7890`

To make sure it's properly set up, you can try pinging google public DNS.

```shell
ping 8.8.8.8
```

---

#### Theme Dracula

I use Dracula for Warp and IDE.

Here is how to install Dracula for oh-my-zsh. And I prefer to install it manually.

https://draculatheme.com/zsh

Use this command can get your zsh location path.

```
echo $ZSH
```

First, git clone the zsh repo in my workspace.

Then copy the theme file and lib folder to the zsh folder.

```
1. Download using the GitHub .zip download option and unzip them.
2. Move dracula.zsh-theme file to oh-my-zsh's theme folder: oh-my-zsh/themes/dracula.zsh-theme.
3. Move /lib to oh-my-zsh's theme folder: oh-my-zsh/themes/lib.
```

---

#### SSH key

Generate ssh key

`ssh-keygen -t rsa`

You can get your root path using

```shell
echo $PWD
```

Check your key

`vi $PWD/.ssh/id_rsa.pub`

Then copy the key to your GitHub.

---

#### nvm and npm

Install nvm and npm. I prefer always using the LTS version.

https://github.com/nvm-sh/nvm

---

#### pnpm

pnpm is a fast, disk space-efficient package manager.

https://pnpm.io/

Install it via brew.

`brew install pnpm`

---

#### IDE

I both use vscode and webstorm. Since sometimes I write some python code, I'll download `JetBrains Toolbox`. It can download and update webstorm and pycharm.

Jetbrains Toolbox

https://www.jetbrains.com/toolbox-app/

VS code, I used the insider version.

https://code.visualstudio.com/insiders/

---

#### Grammarly

https://app.grammarly.com/

---

#### medium unlimited

https://manojvivek.github.io/medium-unlimited/download/

---

#### Fonts

I use Jetbrains Mono, Fira code for coding and use lxgw for display Chinese. 

1. https://www.jetbrains.com/lp/mono/
2. https://github.com/tonsky/FiraCode
3. https://github.com/lxgw/LxgwWenKai

