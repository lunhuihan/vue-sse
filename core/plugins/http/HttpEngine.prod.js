/**
 * Created by duy on 2018/6/20 15:38.
 */

import axios from 'axios';
import _ from 'lodash';

const $baseURL = Symbol('$baseURL');
const $headers = Symbol('$headers');
const $timeout = Symbol('$timeout');
const $query = Symbol('$query');
const $path = Symbol('$path');
const $body = Symbol('$body');
const $responseType = Symbol('$responseType');
const $mockStatusCode = Symbol('$mockStatusCode');
const $mockTimeout = Symbol('$mockTimeout');
const createInstance = Symbol('createInstance');
const requestedSever = Symbol('requestedSever');

export default class HttpEngine {

  [$baseURL] = '';

  [$headers] = {
    'Accept': 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
  };

  [$timeout] = 10000;

  [$query] = {};

  [$path] = '';

  [$body] = undefined;

  [$responseType] = 'json';

  [$mockStatusCode] = 200;

  [$mockTimeout] = 3000;

  [requestedSever] = false;

  /**
   * @param value {String}
   * */
  set baseURL (value) {
    if (!_.isString(value)) throw new TypeError('baseURL类型应为String');
    this[$baseURL] = value;
  }

  /**
   * @param value {Object}
   * */
  set headers (value) {
    if (!_.isObject(value)) throw new TypeError('headers类型应为Object');
    _.assign(this[$headers], value);
  }

  /**
   * @param value {Number}
   * */
  set timeout (value) {
    if (!_.isNumber(value)) throw new TypeError('timeout类型应为Number');
    this[$timeout] = value * 1000;
  }

  /**
   * @param value {Object}
   * */
  set query (value) {
    if (!_.isObject(value)) throw new TypeError('query类型应为Object');
    this[$query] = _.mapValues(value, function (value) {
      return _.isEqual(value, '') || _.isUndefined(value) ? undefined : value;
    });
  }

  /**
   * @param value {String}
   * */
  set path (value) {
    if (!_.isString(value)) throw new TypeError('path类型应为String');
    this[$path] = value;
  }

  /**
   * @param value {String|Number|Object}
   * */
  set body (value) {
    if (!(_.isString(value) || _.isNumber(value) || _.isObject(value))) throw new TypeError('body类型支持String、Number、Object');
    this[$body] = value;
  }

  /**
   * @param value {String}
   * */
  set responseType (value) { 
    if (!_.isString(value)) throw TypeError('responseType类型应为String');
    this[$responseType] = value;
  }

  /**
   * @param value {Number}
   * */
  set mockStatusCode (value) {
    if (!Number.isInteger(value)) throw new TypeError('mockStatusCode类型应为Integer');
    this[$mockStatusCode] = value;
  }

  /**
   * @param value {Number}
   * */
  set mockTimeout (value) {
    if (!Number.isInteger(value)) throw new TypeError('mockTimeout类型应为Integer');
    this[$mockTimeout] = value * 1000;
  }

  /**
   * @param value {Boolean}
   * */
  set requestedSever (value) {
    if (!_.isBoolean(value)) throw new TypeError('isRequestSever类型应为Boolean');
    this[requestedSever] = value;
  }

  [createInstance] () {
    let instance = axios.create({
      baseURL: this[$baseURL],
      timeout: this[$timeout],
      headers: this[$headers],
      responseType: this[$responseType]
    });
    instance.interceptors.request.use(
      config => {
        this.beforeSendRequestHandler(config);
        return config;
      },
      error => Promise.reject(error)
    );
    instance.interceptors.response.use(
      response => {
        this.afterResolveResponseHandler(response);
        return response;
      },
      error => {
        this.afterRejectResponseHandler(error);
        return Promise.reject(error);
      }
    );
    return instance;
  }

  /**
   * @description GET请求
   * @return Promise
   * */
  get () {
    return this[createInstance]().get(this[$path], {params: this[$query]});
  }

  /**
   * @description DELETE请求
   * @return Promise
   * */
  delete () {
    return this[createInstance]().delete(this[$path], {params: this[$query]});
  }

  /**
   * @description POST请求
   * @return Promise
   * */
  post () {
    return this[createInstance]().post(this[$path], this[$body], {params: this[$query]});
  }

  /**
   * @description PUT请求
   * @return Promise
   * */
  put () {
    return this[createInstance]().put(this[$path], this[$body], {params: this[$query]});
  }

  /**
   * @description PATCH请求
   * @return Promise
   * */
  patch () {
    return this[createInstance]().patch(this[$path], this[$body], {params: this[$query]});
  }

  /**
   * @description 发送请求之前的勾子
   * @param config {Object}
   * */
  beforeSendRequestHandler (config) {}

  /**
   * @description 成功应答的勾子
   * @param response {Object}
   * */
  afterResolveResponseHandler (response) {}

  /**
   * @description 错误应答的勾子
   * @param error {Object}
   * */
  afterRejectResponseHandler (error) {}
}
