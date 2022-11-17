```js
const schema = 
  {
    name: "Page",
    attributes: { },
    children: [
      {
        name: "Banner",
        attributes: {
          title: '低代码',
          description: '这是一个基于设计好的Schema的展示页面展示页面展示页面展示页面展示页面展示页面',
          showAvatar: true,
          avatarUrl: 'https://img2.baidu.com/it/u=3094149767,177600321&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
          bgUrl: 'https://img1.baidu.com/it/u=2517897742,3125678085&fm=253&fmt=auto&app=138&f=JPEG?w=1180&h=399',
          bgHeigh: 590
        },
        children: []
      },
      {
        name: "List",
        attributes: {},
        children: [
          {
            id: 'id1',
            title: 'vue3',
            description: 'vue3指南vue3指南vue3指南vue3指南vue3指南vue3指南vue3指南vue3指南vue3指南vue3指南vue3指南',
            cover: 'https://storage.googleapis.com/vue-mastery.appspot…gRnYr7GjBDXt3hTzZw6KDU%2FaATFToW232Ta9krRBQ%3D%3D',
            link: 'https://cn.vuejs.org/'
          }
        ]
      },
      {
        name: "Footer",
        attributes: {
          copyright: 'Copyright©xxxx',
          record: '皖网备xxxx号'
        },
        children: [{
          title: '百度',
          link: 'https://www.baidu.com'
        }]
      }
    ]
  }
```