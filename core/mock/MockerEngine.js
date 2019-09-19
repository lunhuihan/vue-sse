/**
 * Created by duy on 2018/7/2 15:51.
 */

import _ from 'lodash';
import Paths from 'swagger-paths';
import MockResolveResponse from './MockResolveResponse';
import MockRejectError from './MockRejectError';
import {openApi, unknown} from '../../.swagger-config';

const $url = Symbol('$url');
const $method = Symbol('$method');
const $config = Symbol('$config');
const $headers = Symbol('$headers');
const $data = Symbol('$data');
const $status = Symbol('$status');
const $timeout = Symbol('$timeout');
const timeoutHandler = Symbol('timeoutHandler');
const getResponseData = Symbol('getResponseData');
const notFoundApi = Symbol('notFoundApi');

export default class MockerEngine {

  constructor (status, timeout) {
    this[$status] = status;
    this[$timeout] = timeout;
  }

  [$url] = '';

  [$method] = '';

  [$config] = {};

  [$headers] = {};

  [$data];

  set url (value) {
    if (!_.isString(value)) throw new TypeError('MockerEngine.url 类型应为 String');
    this[$url] = value;
  }

  set method (value) {
    if (!_.isString(value) || !_.includes(['get', 'delete', 'post', 'put', 'patch'], value.toLowerCase())) throw new TypeError('MockerEngine 非法请求');
    this[$method] = value.toLowerCase();
  }

  set config (value) {
    if (!_.isObject(value)) throw new TypeError('MockerEngine.config 类型应为 Object');
    this[$config] = value;
  }

  set headers (value) {
    if (!_.isObject(value)) throw new TypeError('MockerEngine.headers 类型应为 Object');
    this[$headers] = value;
  }

  async getResponse () {
    let response;
    if (this[$status] === 200) {
      response = new MockResolveResponse(this[$config], this[$headers]);
      response.data = this[getResponseData]();
    } else {
      response = new MockRejectError(this[$config], this[$headers], this[$status]);
    }
    await this[timeoutHandler]();
    return response;
  }

  [timeoutHandler] () {
    let ms = this[$timeout];
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  [getResponseData] () {
    let data;
    let hasFindApi = false;
    for (let {baseURL, paths} of openApi) {
      if (this[$url].indexOf(baseURL) === 0) {
        let pathsInstance = new Paths(paths || {});
        let result = pathsInstance.match(this[$url].replace(baseURL, ''));
        if (!_.has(result.value, this[$method])) this[notFoundApi]();
        data = !_.isNull(result.value[this[$method]]) ? result.value[this[$method]] : undefined;
        hasFindApi = true;
        break;
      }
    }
    for (let [requestURL, result] of Object.entries(unknown)) {
      if (this[$url] === requestURL) {
        if (!_.has(result, this[$method])) this[notFoundApi]();
        data = result[this[$method]] || undefined;
        hasFindApi = true;
        break;
      }
    }
    if (!hasFindApi) this[notFoundApi]();
    return data;
  }

  [notFoundApi] () {
    throw new Error(`Not Found Api => ${this[$url]} => [${this[$method]}]`);
  }
}
