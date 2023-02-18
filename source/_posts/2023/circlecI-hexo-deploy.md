---
title: Use circleci to build an deploy my hexo blog
date: 2023-02-18 10:20:25
categories:
  - tech
tags:
  - circleci
  - deploy
  - hexo
---

1. in project setting, ssh keys, authorize circleci with github.

```yml
# Use the latest 2.1 version of CircleCI pipeline process engine.
# See: https://circleci.com/docs/2.0/configuration-reference
version: 2.1

# Define a job to be invoked later in a workflow.
# See: https://circleci.com/docs/2.0/configuration-reference/#jobs
jobs:
  build:
    docker:
      - image: node:18
    steps:
      - checkout
      - run:
          name: Update NPM
          command: sudo npm install -g npm@latest
      - run:
          name: Install Hexo CLI
          command: |
            sudo npm install hexo-cli -g
      - restore_cache:
          key: node-cache-{{ checksum "package-lock.json" }}
      - run:
          name: Install NPM packages
          command: npm ci
      - save_cache:
          key: node-cache-{{ checksum "package-lock.json" }}
          paths:
            - ./node_modules
      - run:
          name: Generate blog
          command: hexo generate
      - persist_to_workspace:
          root: public
          paths:
            - "*"

# Invoke jobs via workflows
# See: https://circleci.com/docs/2.0/configuration-reference/#workflows
workflows:
  deploy-blog-workflow:
    jobs:
      - build


```

I use pnpm.

When this blog publish to my blog, it means I finished.
