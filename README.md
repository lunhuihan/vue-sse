## vue-sse
vue版pc端管理台初始化模板

## 相关文档
- [vue.js框架文档](https://cn.vuejs.org/)
- [iView UI组件库文档](https://www.iviewui.com/)
- [vue-admin-components 组件文档](http://www.bychjh.com:808/vue-admin-components)

## 项目结构
```
|- config 环境配置文件(请求HTTP_BASE_URL等在此文件夹下配置)
|- json 模拟后端接口JSON文件
|- src  
    |- apis 后端API文件
        |- httpBase.js Http基类
        |- download.js 下载类
    |- assets 资源文件
        |- img 图片文件
        |- scss 样式文件
    |- components 项目组件文件
    |- router 路由
    |- utils 工具文件
        |- assist.js 基础方法(typeOf和deepCopy等)
        |- collect.js 操作对象组成的数组的方法
        |- crypto.js 加密相关方法
        |- download.js 下载类需要用到的下载方法
        |- filter.js 过滤器(时间和金额)
        |- helper.js 项目相关方法(获取、删除用户信息、退出登录)
        |- menu.js 处理菜单栏和面包屑的方法
        |- money.js 金额方法
        |- plugin.js 将过滤器和api注入进Vue
        |- storage.js 浏览器缓存方法
        |- time.js 时间相关方法
        |- uuid.js 生成uuid
        |- validate.js 校验数据相关方法
    |- views 页面文件
        |- public 公共页面文件
    |- main.js 入口文件
|- static 静态资源文件
    |- img
|- .swagger-config.js 模拟后端接口配置文件  
|- index.html HTML模板文件
```

## 项目运行、打包
本地运行
```
npm install
npm run dev
```

npm打包sit环境
```
npm run sit
```
npm打包demo环境
```
npm run demo
```
npm打包生产环境
```

npm run build
```

## HTTP基类
|属性|说明|类型|默认值|
|---|---|---|---|
|baseURL|API路径前缀|String|空字符串|
|headers|自定义请求头|Object|{"Accept":"application/json", "Content-Type":"application/json; charset=utf-8"}|
|timeout|请求最大超时时间，单位秒|Number|10|
|query|附加到url上的参数|Object|{}|
|path|API路径后缀|String|空字符串|
|body|自定义请求体|String/Number/Array/Object|-|
|mockStatusCode|模拟api响应状态码，该属性只在开发环境下有效|Number|200|
|mockTimeout|模拟api响应总时长，单位秒，该属性只在开发环境下有效|Number|3|
|requestedSever|是否请求api后端服务，该属性只在开发环境下有效|Boolean|false|

|方法|说明|返回值|
|---|---|---|
|get()|get请求|Promise|
|delete()|delete请求|Promise|
|post()|post请求|Promise|
|put()|put请求|Promise|
|patch()|patch请求|Promise|
|beforeSendRequestHandler(config)|发送请求之前的勾子|-|
|afterResolveResponseHandler(response)|成功应答的勾子|-|
|afterRejectResponseHandler(error)|错误应答的勾子|-|

自定义api服务用例
```
api url, example:
https://api.example.com/v1/pet/findByStatus?status=pending  
\________________________/\_______________/\_____________/
      baseURL                   path            query
```
src/apis/Http.js
```js
export default class Http extends HttpEngine {
  baseURL = 'https://api.example.com/v1';
  
  timeout = 20;
  
  requestedSever = true;
}
```
src/apis/TestApi.js
```js
import Http from '@/apis/Http';
export default class TestApi {
  static getPetList() {
    let http = new Http();
    http.path = '/pet/findByStatus';
    http.query = {status: 'pending'};
    // http.mockStatusCode = 400;
    // http.mockTimeout = 1;
    return http.get();
  }
  
  static getPetDetail(petId) {
    let http = new Http();
    http.path = `/pet/${petId}`;
    return http.get();
  }
  
  static removePet(petId) {
    let http = new Http();
    http.path = `/pet/${petId}`;
    return http.delete();
  }
  
  static addPet(formData) {
    let http = new Http();
    http.path = '/pet';
    http.body = formData;
    return http.post();
  }

  static editPet(formData) {
    let http = new Http();
    http.path = '/pet';
    http.body = formData;
    http.mockStatusCode = 400;
    http.mockTimeout = 1;
    return http.put();
  }
}
```

## 模拟数据
模拟服务端api响应数据

模拟数据用例  
.swagger-config.js
```js
import data1 from './json/data-1.json';
import data2 from './json/data-2.json';
export const openApi = [{
  baseURL: 'https://api.example.com/v1',
  paths: {
    '/pet/{petId}': {
      get: data1,
      delete: null
    },
    '/pet': {
      post: null,
      put: null
    },
    '/pet/findByStatus': {
      get: data2
    }
  }
}, {
  baseURL: 'https://api.example.com/v2',
  paths: {...}
}];

export const unknown = {
  'https://api.example.com/v3/pet/123': {
    get: null,
    post: null,
    delete: null,
    put: null
   },
   ...
};
```
注意
- 需将Http类的属性requestedSever设置为false时，且为开发环境时，模拟数据才生效。
- 在开发环境下，当Http类的属性mockStatusCode为200时，http响应数据由.swagger-config.js配置文件来指定；当mockStatusCode不为200时，http响应为ErrorModel对象。
- .swagger-config.js配置文件中，常量openApi指遵循OpenApi规范的服务端api；常量unknown指无规则服务端api。
- .swagger-config.js配置文件中，当设置响应内容为null时，即指http状态码为200，无应答。

ErrorModel如下所示:
```json
{
  "errorCode":"错误码",
  "errorMsg":"错误信息",
  "timestamp":"时间戳",
  "path":"访问路径"
}
```