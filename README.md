# route-free-combination
支持批量导入路由并根据文件路径组装路由树

## 安装

npm install route-free-combination --save

## 目录组织
可以在每个独立模块下建立route文件夹，里面创建index.js文件，保存单个路由

例如，
```
my-project
 |-/src
    |-/views
        |-/user
            |-/route
                |-index.js
            |-/account
                |-/route
                    |-index.js
        |-/department
            |-/route
                |-index.js
```

## 单个路由示例

```
export default {
  path: 'user',
  name: 'userManagement',
  meta: {
    orderNo: 1,          // 控制菜单顺序
    title: '用户管理',
    ignoreKeepAlive: true,
  },
  component: () => import('../index.vue'),
};

```

## 使用

### 在vite项目中

```
import rfc from 'route-free-combination';

const modules = import.meta.globEager('../../views/**/route/*.ts');

let routeModuleList = rfc(modules);
```

### 在webpack项目中

```
import rfc from 'route-free-combination';

const routes = require.context('../views',true,/\.js$/)
let modules  = {};

routes.keys().forEach((key) => {
  if (key.indexOf('/route/index.js') > 0){
    modules[key] = routes(key);
  }
});

let routeModuleList = rfc(modules);      
```

## 结果
```
[
    {
      path: 'user',
      name: 'userManagement',
      meta: {
        orderNo: 1,          // 控制菜单顺序
        title: '用户管理',
        ignoreKeepAlive: true,
      },
      component: () => import('../index.vue'),
      children:[
        {
          path: 'account',
          name: 'account',
          meta: {
            orderNo: 1.1,          // 控制菜单顺序
            title: '账号管理',
            ignoreKeepAlive: true,
          },
          component: () => import('../index.vue'),
        }
      ]
    }，
    {
      path: 'department',
      name: 'department',
      meta: {
        orderNo: 2,          // 控制菜单顺序
        title: '部门管理',
        ignoreKeepAlive: true,
      },
      component: () => import('../index.vue'),
     }
]

```
