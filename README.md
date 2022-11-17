
## 👋 Hi, 这里是一个低代码的简单尝试，希望可以给您一些帮助~

#### :apple: 安装依赖 ...

```js
npm install
```

#### :orange: 运行 ...
```js
npm run start
```
##### 配置 
- 选择类型 Banner | List | Footer
- 直接复制配置内容（链接失效自行替换）
###### Banner
```js
{
  标题: '低代码',
  介绍: '这是一个基于设计好的Schema的展示页面展示页面展示页面展示页面展示页面展示页面',
  头像链接: 'https://img2.baidu.com/it/u=3094149767,177600321&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
  背景链接: 'https://img1.baidu.com/it/u=2517897742,3125678085&fm=253&fmt=auto&app=138&f=JPEG?w=1180&h=399',
  背景高度: 590
}
```
###### List
```js
{
  标题: 'vue3',
  介绍: 'vue3指南vue3指南vue3指南vue3指南vue3指南vue3指南vue3指南vue3指南vue3指南vue3指南vue3指南',
  封面: 'https://storage.googleapis.com/vue-mastery.appspot…gRnYr7GjBDXt3hTzZw6KDU%2FaATFToW232Ta9krRBQ%3D%3D',
  链接: 'https://cn.vuejs.org/'
}
```

###### Footer
```js
{
  版权: 'Copyright©xxxx',
  本案: '皖网备xxxx号'
  标题: '百度',
  链接: 'https://www.baidu.com'
}
```
#### :book: 协议 ...
```js
const schema = 
  {
    name: "Page",
    attributes: {},
    children: [
      {
        name: "Banner",
        attributes: {},
        children: []
      },
      {
        name: "List",
        attributes: {},
        children: []
      },
      {
        name: "Footer",
        attributes: {},
        children: []
      }
      ...
    ]
  }
```