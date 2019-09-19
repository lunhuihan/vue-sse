/**
 * Created by duy on 2018/6/22 17:16.
 */

import _ from 'lodash';
import Utils from './Utils';

const $printMethod = Symbol('printMethod');
const $url = Symbol('$url');
const $method = Symbol('$method');
const $headers = Symbol('$headers');
const $query = Symbol('$query');
const $body = Symbol('$body');
const $status = Symbol('status');
const $response = Symbol('response');

export default class DebugEngine {

  [$printMethod] = 'log';

  [$url] = '';

  [$method] = '';

  [$headers] = {};

  [$status] = 0;

  set printMethod (value) {
    if (!_.isString(value)) throw new TypeError('DebugEngine.printMethod 类型应为 String');
    this[$printMethod] = value;
  }

  set url (value) {
    if (!_.isString(value)) throw new TypeError('DebugEngine.url 类型应为 String');
    this[$url] = value;
  }

  set method (value) {
    if (!_.isString(value)) throw new TypeError('DebugEngine.method 类型应为 String');
    this[$method] = value.toUpperCase();
  }

  set headers (value) {
    if (!_.isObject(value)) throw new TypeError('DebugEngine.headers 类型应为 Object');
    this[$headers] = value;
  }

  set query (value) {
    this[$query] = value;
  }

  set body (value) {
    this[$body] = value;
  }

  set status (value) {
    if (!Number.isInteger(value)) throw new TypeError('DebugEngine.status 类型应为整数');
    this[$status] = value;
  }

  set response (value) {
    this[$response] = value;
  }

  getCollectionInfo () {
    let collection = [
      {title: '请求地址', content: this[$url]},
      {title: '请求方法', content: this[$method]},
      {title: '请求头', content: this[$headers]},
      {title: 'Query参数', content: this[$query]},
      {title: 'Body参数', content: this[$body]},
      {title: 'HTTP状态码', content: this[$status]},
      {title: '应答内容', content: this[$response]},
    ];
    if (_.isString(this[$headers]['Content-Type'])) {
      if (this[$headers]['Content-Type'].indexOf('application/x-www-form-urlencoded') >= 0 ||
        this[$headers]['Content-Type'].indexOf('multipart/form-data') >= 0) {
        collection.splice(4, 1, {title: 'FormData参数', content: this[$body]});
      }
    }
    if (_.includes(['GET', 'DELETE'], this[$method])) {
      collection.splice(4, 1);
    }
    return collection;
  }

  print () {
    if (Utils.isDevelopmentEnv()) {
      console[this[$printMethod]]('****************************************');
      for (let item of this.getCollectionInfo()) {
        console[this[$printMethod]](`* - ${item['title']}：`, item['content']);
      }
      console[this[$printMethod]]('****************************************\n\r\n\r');
    }
  }
}
