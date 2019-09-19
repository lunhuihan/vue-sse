/**
 * Created by duy on 2018/8/17 10:26.
 */

import _ from 'lodash';

const $config = Symbol('$config');
const $headers = Symbol('$headers');
const $data = Symbol('$data');

export default class MockResolveResponse {

  constructor (config, headers) {
    this[$config] = config;
    this[$headers] = headers;
  }

  [$data];

  get status () {
    return 200;
  }

  get statusText () {
    return 'OK';
  }

  get request () {
    return {};
  }

  get headers () {
    return this[$headers];
  }

  get config () {
    return this[$config];
  }

  get data () {
    return this[$data];
  }

  set data (value) {
    if (!(_.isString(value) || _.isBoolean(value) || _.isNumber(value) || _.isObject(value) || _.isUndefined(value))) throw new TypeError('data类型错误');
    this[$data] = value;
  }
}
