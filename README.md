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

## 报错处理

nodejs.TypeError: Cannot read properties of undefined (reading 'info')

原因是environment.js写错了
```js
this.coreLogger = app.loggers.coreLogger;
```
loggers写成了logger，没有语法提示，好尴尬

## 扩展的默认配置

假设extend的demo.js写错了，写成了demo111.js
插件里面的demo.js写的合适的，就会读取插件里面的

如果都有，默认先读取插件的，可以debug看

##  application的扩展

```js
module.exports = {
  // 单例
  get bar() {
    return Math.random();
  }
}
```

controller直接用
```js
async info() {
    this.ctx.body = `info from: ${this.app.demo.info} with ${this.app.bar}`
  }
```

## 单例
只有application的扩展可以，因为整个生命周期只有1个app，而ctx每次都不一样
application.js
```js
const BAR = Symbol('Application#bar')

module.exports = {
  // 单例
  get bar() {
    if (!this[BAR]) {
      this[BAR] = Math.random()
    }
    return this[BAR];
  }
}
```