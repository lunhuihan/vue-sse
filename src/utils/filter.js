import Time from './time'
import Money from './money'

export function date(timeVal, format = 'Y-m-d H:i:s') {
  let timeUtil = new Time()
  return timeUtil.format(timeVal, format)
}
export function money(number, precision = 2, thousand = ',') {
  let MoneyUtil = new Money()
  return MoneyUtil.toMoney(number, precision, thousand)
}
