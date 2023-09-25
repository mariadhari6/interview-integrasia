const x = [20, 15]
const fx = [3.225, 2.113]
const xt = 18

const interpolation = (x, fx, t) => {
  if (typeof t !== 'number') {
    throw "Tipe t harus berupa bilangan"
  }
  if (!Array.isArray(x) || !Array.isArray(fx)) {
    throw "x dan fx harus berupa array bertipe number"
  }
  const isNumber = x.concat(fx).every(item => typeof item === 'number')
  if (!isNumber) {
    throw "x dan fx harus berupa array bertipe number"
  }
  if (x.length !== 2 || fx.length !== 2) {
    throw "Panjang x dan fx harus 2"
  }
  const result = fx[0] + ((fx[1] - fx[0]) / (x[1] - x[0])) * (t - x[0])
  return result
}
console.log(interpolation(x, fx, xt));