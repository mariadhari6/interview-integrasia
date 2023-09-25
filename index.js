const fs = require("fs")

const data = require('./assets/json/json1.json')

// Menampung data desa
const daftar_desa = []

// Menghitung total nilai project
const summarize = (a, b) => {
  b = b['nilai-project']
  if (typeof a === 'object') {
    a = a['nilai-project']
  }
  return a + b
}

/**
 * Proses utama
 * Menghitung nilai-project provinsi, setiap kabupaten dan setiap kecamatan
 */
Object.values(data).forEach(value => {
  if (typeof value === 'object') {
    value.forEach(kabupaten => {
      Object.values(kabupaten).forEach(val_kabupaten => {
        if (typeof val_kabupaten === 'object') {
          val_kabupaten.forEach(kecamatan => {
            kecamatan['nilai-project'] = kecamatan['desa'].reduce(summarize, 0)
            daftar_desa.push(...kecamatan['desa'])
          })
        }
      })
      kabupaten['nilai-project'] = kabupaten['kecamatan'].reduce(summarize, 0)
    })
    data['nilai-project'] = value.reduce(summarize, 0)
  }
})

// Menympan data yang sudah diubah agar lebih mudah untuk dibaca
fs.writeFile("assets/json/json1_result.json", JSON.stringify(data), (error) => {
  if (error) {
    console.log(error);
    throw error;
  }
  console.log("Hasil keseluruhan dapat dilihat pada file assets/json/json1_result.json");
})

// Filter desa berdasarkan minimal nilai-project
const filter_desa = daftar_desa.filter(desa => desa['nilai-project'] > 300)
console.log("Nama desa dengan nilai project > 300:");
console.table(filter_desa)

// Total nilai project pada kab2
const project_kab2 = data['kabupaten'][1]['nilai-project']
console.log(`\nNilai project pada kabuten kab2: ${project_kab2}\n`);