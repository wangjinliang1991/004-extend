# 004-extend

对应视频 https://www.bilibili.com/video/BV1DM4y157i9

## 扩展extend

eggjs框架提供的扩展点扩展自身的功能：

- Application  app/extend/application.js
- Context  app/extend/context.js
- Request  app/extend/request.js
- Response app/extend/response.js
- Helper  app/extend/helper.js



自定义的扩展：

插件 egg-view-nunjucks:  

Filter: app/extend/filter.js



扩展方式包括两种：

> 方法扩展

app.foo()

ctx.foo()

helper.foo()

> 属性扩展

app.bar

ctx.bar

request.bar

response.bar = "foo"



如何访问这些对象

> app

controller, middleware, helper, service中

使用 this.app 访问

> ctx

middleware中this就是ctx

controller, helper, service 使用this.ctx

> request/response/helper

ctx.request/ctx.response/ctx.helper



### 目标

1. 为ctx 添加一个扩展函数，用于判断ua类型
2. 实现一个自定义扩展方式，即app/extend/demo.js
3. 比较两种不同的属性扩展方式



router.js

```js
router.get('/',controller.home.isIOS);
```

controller

```js
async isIOS(){
    this.ctx.body = `isIOS: ${this.ctx.isIOS}`
}
```

