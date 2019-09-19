class UUID {
  createUUID() {
    var dg = new Date(1582, 10, 15, 0, 0, 0, 0)
    var dc = new Date()
    var t = dc.getTime() - dg.getTime()
    var tl = this.getIntegerBits(t, 0, 31)
    var tm = this.getIntegerBits(t, 32, 47)
    var thv = this.getIntegerBits(t, 48, 59) + '1' // version 1, security version is 2
    var csar = this.getIntegerBits(this.rand(4095), 0, 7)
    var csl = this.getIntegerBits(this.rand(4095), 0, 7)
    var n =
      this.getIntegerBits(this.rand(8191), 0, 7) +
      this.getIntegerBits(this.rand(8191), 8, 15) +
      this.getIntegerBits(this.rand(8191), 0, 7) +
      this.getIntegerBits(this.rand(8191), 8, 15) +
      this.getIntegerBits(this.rand(8191), 0, 15) // this last number is two octets long
    return tl + tm + thv + csar + csl + n
  }

  getIntegerBits(val, start, end) {
    var base16 = this.returnBase(val, 16)
    var quadArray = []
    var quadString = ''
    var i = 0
    for (i = 0; i < base16.length; i++) {
      quadArray.push(base16.substring(i, i + 1))
    }
    for (i = Math.floor(start / 4); i <= Math.floor(end / 4); i++) {
      if (!quadArray[i] || quadArray[i] === '') quadString += '0'
      else quadString += quadArray[i]
    }
    return quadString
  }

  returnBase(number, base) {
    return number.toString(base).toUpperCase()
  }

  rand(max) {
    return Math.floor(Math.random() * (max + 1))
  }
}
export default new UUID()
