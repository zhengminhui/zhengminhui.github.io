---
title: Use circleci to build an deploy my hexo blog
categories:
  - tech
tags:
  - circleci
  - deploy
  - hexo
abbrlink: circleci-hexo-blog
date: 2023-02-18 10:20:25
---

Finally!

When this blog publish to my blog, it means I finished the circleci configuration.

```yml
version: 2.1

jobs:
  build:
    docker:
      - image: node:latest
    working_directory: $CIRCLE_WORKING_DIRECTORY
    steps:
      - checkout
      - run: npm install -g npm
      - run: npm install -g hexo-cli
      - run: hexo generate
  deploy:
    docker:
      - image: node:latest
    working_directory: $CIRCLE_WORKING_DIRECTORY/zhengminhui.github.io
    steps:
      - checkout
      - run:
          name: Install Hexo CLI
          command: |
            npm install hexo-cli -g
      - attach_workspace:
          at: $CIRCLE_WORKING_DIRECTORY/zhengminhui.github.io
      - add_ssh_keys:
          fingerprints:
            - "7e:0d:09:19:ed:19:95:d6:2f:b4:72:03:63:d0:4b:5f"
      - deploy:
          name: Deploy website
          command: |
            git config --global user.name "zhengminhui"
            git config --global user.email "zhmh1025@hotmail.com"
            echo $PWD
            echo 'start deploy'
            hexo g
            hexo d
            hexo clean
            echo 'successfully finished'
workflows:
  deploy-blog-workflow:
    jobs:
      - build
      - deploy:
          requires:
            - build
```
