## 遇到的问题

这里是在写这个项目时碰到的问题和解决方法

### .tsx 文件被解析为 React，无法启动

---

安装插件 `@vitejs/plugin-vue-jsx`

引入`vite.config.ts`并启动 `jsx()`

这样 tsx/jsx 文件就被 vue 支持了，可以作为 vue 的组件 被 vue 解析了。

### CSSmodule

---

https://www.jianshu.com/p/be1778a76763

### 页面滑动时会出现跳动，漏出白边

---

因为只设置了#app 的背景颜色

白边实则是 body 的背景颜色，默认是白色的；在设置背景颜色时，要将 body 也设置上。

### 浏览器的退回：url 已更改但页面不刷新

---

有种办法是监听 popstate 事件，然后调用 go(0)刷新；
但是首先 SPA 应用就是不刷新的跳转路由，刷新了还用什么 vue-router。
再者，看起来很笨！
所以先暂定

spa 的路由，为何不更新？

OK!Fine! 找到原因了！

首先补充一下问题，页面不刷新伴随着`TypeError: Cannot read properties of null (reading 'isUnmounted')`

![报错](https://raw.githubusercontent.com/jasonk0/myImage-blog/master/imgs/isUnmounted报错.png)

之前没看到这个报错，一直在找 vue 和 vue-router 的毛病，并尝试从路由守卫上下手，干预路由的跳转。

后来看到了这个报错，又去找了各个平台以及官方库的 issues，都没找到相关的。

静下心来思考了一下，看了一下报错的地方是`component.isUnmounted()`，没有这个方法，所以报错，那么
作为 vue 的组件肯定都会有这个方法，不然路由没法判断组件的销毁与创建；
所以一定是这个组件写的有问题，没有被转译成 vue 的组件。

果然如此，在返回的模版中有问题。

```javascript
//之前是这么写的
return () => <h1>About</h1>;

// 应该这么写
return () => (
	<>
		<h1>About</h1>
	</>
);
```

> 应该保证组件有根，且根不为组件的唯一节点；且根只能有一个。

### defineComponent 和函数组件的区别？

---

defineComponent 是用来给 ts 提供更加全面严格的类型检查，当我们使用 jsx 的语法，有些 vue 生态中的类型，是不清晰的。
defineComponent 会带着详尽的类型去返回 render 函数，相当于包装了一层。

而普通的函数式组件的 return，会返回一个 jsx 的模版，虽然这样也足够 vue 内部进行解析并转化为 vue 的虚拟 DOM。

两者表现上的区别就在于 defineComponent 会返回一个（render）函数，而此函数返回的才是 jsx 模版。

而使用上的区别：函数式用于建立简单的没有数据传递的纯函数组件（无状态组件），defineComponent 可以通过 props、emit 等进行组件之间的通信；

> 另外，defineComponent 返回的（render）函数可以直接是函数式组件。
> 参考https://juejin.cn/post/6999260884631552037#heading-8

### setup 意味着什么？

---

可以理解为制造闭包，将组件逻辑放在 setup 中；也可以传递 props ，context 给渲染函数；本质上其实是包装逻辑。

另外回想一下 vue2 中的 options API，会有 methods、data 等一堆配置项，需要声明或者写一些逻辑都要找相应的配置项，
而 setup 就是典型的 Composition API，里边没有特定的区域，如果你需要就在头顶引用进来，直接在 setup 中使用，
每一个业务逻辑都可以成块的呈现。

### 对于未定义路有的重定向

---

输入了一个不存在的路由`/foo`，强行跳转就是空白页面。
之前的版本可以用通配符`*`，重定向到首页。
但是 vue-router4.x 取消了通配符。

另一种方式：使用动态路由 `{path:":/w+",redirect:"/"}`
真佩服想出这个方法的人，巧妙！

### 配置别名

---

发现`vite.config.ts`引入不了 path 和 path/posix 包，没法用 resolve 解析地址。

解决：没有类型，安装一下类型就可以饮引用了，`npm i @types/node -d`

在`tsconfig.json`里可以配置别名，`baseUrl:"."`配置基础路径，也就是根目录；`"paths":{"@*" : ["src/*]}`配置别名，意为“所有「@」开头的路径匹配为「src/」开头”，但是提示是有了，也可以找到，但是 vite 并不能找到对应的 module，所以还需要配置 vite，使用 path 包，配置就可以了

参考这个[博客](https://juejin.cn/post/7043325315606642719)

### img 标签的尺寸

---

图片限制宽度，有长有短；限制高度，又会拉伸/压缩。

我希望得到大小差不多，没有变形，可以有一定裁剪的图片：`object-fit:cover`是个不错的选择

> 指定可替换元素的内容应该如何适应到其使用的高度和宽度确定的框。新特性真香！
>
> [MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/object-fit)

### formData 的提交

---

在后端读取`req.body`时发现为空对象，因为我的 POST 方式为`multipart/form-data`。

POST 请求：formData 的提交方式主流有`application/x-www-form-urlencoded`和`multipart/form-data`

前者是默认提交方式，会以键值对的形式提交，适合简单的表单提交，在请求体中。

后者是在`<form>`中使用时需要设置`enctype`，在 body 中会使用`boundary`分开，适合做文件的上传；
相对应后端的读取需要借助`connect-multipart`中间件去解析`boundary`，并转化成可读取的对象。

> 参考这两位，[一](https://imququ.com/post/four-ways-to-post-data-in-http.html)，[二](https://lipeishang.github.io/2017/08/14/%E5%A1%AB%E5%9D%91%E7%AC%94%E8%AE%B0%E2%80%94Nodejs%E8%8E%B7%E5%8F%96form-data%E6%95%B0%E6%8D%AE/)

## 进展

### 主题切换

---

写一个主题切换，通过在根节点设置「CSS 自定义变量」，来达到全局统一风格，
通过 css 的属性选择器，和根节点上的自定义属性去切换主题。

主题配置文件在`src/theme`
themes.css 是主题配置，相应的需要在 options.ts 设置主题属性
SetTheme.ts 提供了更换主题的方法`setTheme`和初始化默认主题的方法`initTheme`

### home 布局

---

采用 flexable 布局 主轴 column，两根轴都 center

为了保证头部和底部的位置，设置他们 flex-grow 为 0；而中间的内容设置 flex-grow 为 1；并保证容器 wrapper 的最小高度为 100vh

这样固定高度的头部和底部就会老老实实呆在哪里，而不确定内容的中间区域，则是自适应。

### 图片上传

---

**web 端实现上传图片，并预览。**

使用 `<input>` 获取图片，在事件中拿到`files`，类型为`FileLists`，里边是上传的文件。

然后通过`createObjectURL`将文件对象转化为相关 MIME 的 URL

将 url 更新到`<img>`标签就可以实现预览。

另外，封装了 Select 和 Input，通过 onChange 触发修改 Ref 后的 value 值，从而实现响应式双向绑定。
也就是这边输入，绑定的 value 值跟着变化，并可以呈现在 DOM 上。

> 学到了`PropType`做类型转换，props 里的 type 只能指定基础数据类型，不能加范型、窄化什么的；找了找果然 vue 是有解决方案的——`PropType`

关于隐藏 file 类型的`<input>`，加上 css 样式`position:absolute;clet(0,0,0,0)`即可；
事件的触发可以使用`<label>`标签 for 指向 input 的 id（label 是个行内元素！）

> 参考[MDN 上的例子](https://developer.mozilla.org/zh-CN/docs/Web/API/File/Using_files_from_web_applications)
>
> 不得不说，mdn 上有太多实用但是需要探索的实例了。简直是个宝藏库

还有风格选择，本来打算用下拉菜单，然后没写出来，郁闷了两天，后来决定使用陈列展出的方式提供选择。

这其中涉及到状态控制（是否选中），父子传参（被选择的那一项需要传回父组件）

主要是父子通信，父 => 子 用 props； 子 => 父 用 emit 和 vue2 差不多。

重点在于自定义事件也需要在子组件的 props 里定义，不然父组件去绑定方法就绑不上。

> 自定义事件是子组件定义的，而触发后的处理函数是有父组件决定的

关于状态控制（互斥点击）：props 传递的值是具有响应性的，所以需要响应性就别解构；
从上边拿下来的 list`Array<object>`数据，如果需要转为响应式可以遍历数组用 reactive 包装每个元素。

**服务端**

1. 完善了图片上传功能

采取 formData(multipart: form-data)上传的方式，服务端通过 multipart 中间件来解析文件，blob 文件在`req.files`里

2. 完善了操作模型 CycleGAN 的功能，通过 shelljs 操作 python 的命令语句；并将返回给前端的 base64 图片改为 url 格式，前端即拿即用。

3. 小 bug 在一次上传后，第二次就会报 writeFilesync 的错误，`no such file`

找到了原因，路径问题，不可以直接`./first/second/target`去找，应该是使用 dirname`${__dirname}/first/second/target`

像第一种写法可能第一次可以找到地址，第二次就找不到了。

## 可能用得到

### 图片上传
