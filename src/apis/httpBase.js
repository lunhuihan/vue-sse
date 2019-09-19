import { typeOf } from 'utils/assist';
import helper from 'utils/helper';
import {LoadingBar, Message} from 'iview';

let HttpEngine = (require(`core/plugins/http/HttpEngine.${process.env.NODE_ENV === 'development' ? 'dev' : 'prod'}`)).default;

export default class Http extends HttpEngine {

  baseURL = process.env.HTTP_BASE_URL;
  mockTimeout = 1
  requestedSever = false

  beforeSendRequestHandler (config) {
    let commonHeader = helper.getCommonHeader();
    config.headers = { ...config.headers, ...commonHeader };
    LoadingBar.start();
  }

  afterResolveResponseHandler (response) {
    LoadingBar.finish();
  }

  afterRejectResponseHandler (error) {
    LoadingBar.error();
    let errorMsg = error.message;
    let response = error.response
    if (errorMsg === 'Network Error') {
      errorMsg = '网络异常';
    }
    if (errorMsg.indexOf('timeout') >= 0) {
      errorMsg = '请求超时';
    }
    if (typeOf(response) === 'object') {
      if (typeOf(response.data) === 'object') {
        errorMsg = response.data['errorMsg'];
      }
      if (response.status === 401) {
        helper.logout()
        return
      }
    }
    Message.error({
      content: errorMsg,
      duration: 6,
      closable: true,
    });
  }
}