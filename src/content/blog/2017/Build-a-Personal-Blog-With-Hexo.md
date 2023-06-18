---
title: Build a Personal Blog With Hexo
categories:
  - tech
tags:
  - hexo
  - blog
postSlug: a183496f
date: 2017-04-09 22:50:50
---

After spending several nights working on my personal blog with Hexo, I finished the structure work and deployed it with Github Pages. Compare to Wordpress, I think Hexo is more customizable and easier to handle as a developer. Hence I'm going to write down this tutorial to help more people who is also interested in building blog with Hexo, as well as summarizing what I have done for now.

Before we start, you should already be familiar with npm and git operations. Besides, make sure that your computer has Node and npm installed locally.

This article has five sections as follows:

- Install Hexo
- Deploy on Github
- Add new layouts
- Decorate with new Theme
- Add Busuanzi & Disqus & Google Analytics

#### Install Hexo

```bash
npm install hexo-cli -g
hexo init <folder>
cd <folder>
npm install
```

After the npm installation, you can now run the server:

```bash
hexo server
```

More info: [Server](https://hexo.io/docs/server.html)

At this time, go to `localhost:4000`, and you should see your blog now has a "Hello World" article with default theme.

#### Deploy on Github

You can follow [Github Pages](https://pages.github.com/) to create a repo in your github. After that, you can `git clone` with your https or ssh url to your local.
Then back to your blog folder. We need to relate your source code to your repo. First install hexo-deployer-git:

```bash
npm install hexo-deployer-git --save
```

Then update the `_config.yaml` file by adding these code in the bottom:

```bash
# Deployment
## Docs: https://hexo.io/docs/deployment.html
deploy:
  type: git
  repo: <your blog repo ssh or https url>
  branch: master
```

At this time, we can deploy the source code to the github repo:

```bash
hexo deploy
```

**TIP**: Sometime you may encounter that after your deployment, the website still did not change. At this time, you can try run:

```bash
hexo clean
```

This command will clean the cache file (`db.json`) and generate files (`public`).

More info: [Deployment](https://hexo.io/docs/deployment.html)

Now, you can take a look at your blog in your browser.

#### Add new layouts

```bash
hexo new post <title>
```

if met this fatal error:

```bash
Error: fatal: in unpopulated submodule '.deploy_git'
```

try install `hexo-deployer-git` again.

```bash
npm install hexo-deployer-git --save
```

#### Publish

```bash
rm -rf .deploy_git
hexo g
hexo d
hexo clean
```

#### CNAME

store the `CNAME` file in source so it won't be deleted automatically.
