const conn = require('../configs/db')

module.exports = {
  getCategory: () => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT * FROM category', (err, result) => {
        if(!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  getCategoryName: () => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT name FROM category', (err, result) => {
        if(!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  getCategoryNameForEdit: (id) => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT name FROM category WHERE id!=?', id, (err, result) => {
        if(!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  addCategory: (data) => {
    return new Promise((resolve, reject) => {
      conn.query('INSERT INTO category SET ?', data, (err, result) => {
        if(!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  editCategory: (data, id) => {
    return new Promise((resolve, reject) => {
      conn.query('UPDATE category SET ? WHERE id=?', [data, id], (err, result) => {
        if(!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  deleteCategory: (id) => {
    return new Promise((resolve, reject) => {
      conn.query('DELETE FROM category WHERE ?', id, (err, result) => {
        if(!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  }
}
