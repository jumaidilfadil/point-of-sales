const conn = require('../configs/db')

module.exports = {
  getProducts: (query) => {
    return new Promise((resolve, reject) => {
      conn.query(query, (err, result) => {
        if(!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  getProductsName: () => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT name FROM product', (err, result) => {
        if(!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  getProductsNameForEdit: (idEdit) => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT name FROM product WHERE id!=?', idEdit, (err, result) => {
        if(!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  getProductStockById: (id) => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT stock FROM product WHERE ?', id, (err, result) => {
        if(!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  addProduct: (data) => {
    return new Promise((resolve, reject) => {
      conn.query('INSERT INTO product SET ?', data, (err, result) => {
        if(!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  editProduct: (data, id) => {
    return new Promise((resolve, reject) => {
      conn.query('UPDATE product SET ? WHERE ?', [data, id], (err, result) => {
        if(!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  deleteProduct: (id) => {
    return new Promise((resolve, reject) => {
      conn.query('DELETE FROM product WHERE ?', id, (err, result) => {
        if(!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  addStockProduct: (stockAdd, id) => {
    return new Promise((resolve, reject) => {
      conn.query('UPDATE product SET stock=stock+? WHERE ?', [stockAdd, id], (err, result) => {
        if(!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  reduceStockProduct: (stockReduce, id) => {
    return new Promise((resolve, reject) => {
      conn.query('UPDATE product SET stock=stock-? WHERE ?', [stockReduce, id], (err, result) => {
        if(!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  }
}
