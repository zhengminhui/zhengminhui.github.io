---
title: Project Doris 中期总结
date: 2023-07-17 17:21:53
draft: false
featured: true
tags:
  - tech
postSlug: project-doris-mid-term-retro
---

Project Doris 基本功能开发的差不多了，到目前实现的功能如下。

1. 加上了 clerk 用户登录，主要是避免被坏人刷页面，把 vercel 的免费带宽刷没了。
2. 把证监会和中证指数的查询都集成进来了，现在可以直接在网页查看，哪个更新了就点击按钮发送邮件。
3. 邮箱发送列表从环境变量储存到了 localstorage。写了个 hooks 把邮箱列表存在浏览器，方便我检查调试。

接下来还有些优化的 todo。

1. 要调整一下 UI。看到一个组件库叫 shadcn，也是 vercel 生态里的，准备集成进来，美化一下。
   - 加上 top banner，展示个人头像和登录状态。
   - 加上面包屑导航。
   - 加上 footer。
   - 把现在的 Link 用 Card 包一下，好看点。最好再加上一点动画效果，可以看看 motion framer。
   - 现在的列表是 div 按 flex 布局模拟的，看看有没有好看的列表展现形式。
2. 加上只有管理员用户才能发送邮件的功能。
3. 现在查询证监会的接口是写死的 pagesize 500，准备改成分批次查询 2000 条，待全部返回后再展示，现在 1 个接口大约 1 秒，分成 4-5 个请求，大约一共 5、6 秒内能返回，应该不会超时。下周试试。
4. 加上 cron job。中证指数和证监会发布公告的时间不定，怎么设置 cron job 是个问题，还需要重试和通知机制。不过这个优先级不高，因为已经部署到了 vercel，每天晚上九十点上去看看点点，成本很低。
5. 发送邮件现在是古早的 html 字符串拼接方式，准备改成 react email 和 resend。不过前周试了下，有 bug 导致编译报错，issue 里也提了，抽时间看看解决没有。

大概反思总结了一下，后面会把这段抽出来，专门写篇博客来记录，题目应该是 use next.js app router to build a web app to send email 之类的。
