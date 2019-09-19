/**
 * Created by duy on 2018/7/3 15:49.
 */

export default class Utils {

  static isDevelopmentEnv () {
    return process.env.NODE_ENV === 'development';
  }

  static enableAdapterMode (isRequestSever) {
    return this.isDevelopmentEnv() && !isRequestSever;
  }
}
