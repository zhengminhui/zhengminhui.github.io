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
    # Specify the execution environment. You can specify an image from Dockerhub or use one of our Convenience Images from CircleCI's Developer Hub.
    # See: https://circleci.com/docs/2.0/configuration-reference/#docker-machine-macos-windows-executor
    docker:
      - image: node:18
    resource_class: large
    parallelism: 10
    # Add steps to the job
    # See: https://circleci.com/docs/2.0/configuration-reference/#steps
    steps:
      - checkout
      - restore_cache:
          name: Restore pnpm Package Cache
          keys:
            - pnpm-packages-{{ checksum "pnpm-lock.yaml" }}
      - run:
          name: Install pnpm package manager
          command: |
            curl -L https://pnpm.js.org/pnpm.js | node - add --global pnpm@7
      - run:
          name: Install Dependencies
          command: |
            pnpm install
      - save_cache:
          name: Save pnpm Package Cache
          key: pnpm-packages-{{ checksum "pnpm-lock.yaml" }}
          paths:
            - node_modules
      - run:
          name: "Generate blog"
          command: "hexo generate"

# Invoke jobs via workflows
# See: https://circleci.com/docs/2.0/configuration-reference/#workflows
workflows:
  deploy-blog-workflow:
    jobs:
      - build
```

When this blog publish to my blog, it means I finished.
