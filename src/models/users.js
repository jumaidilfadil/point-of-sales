const conn = require('../configs/db')

module.exports = {

  checkUsername: (username) => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT username FROM users WHERE username=?', username, (err, result) => {
        if(!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  register: (data) => {
    return new Promise((resolve, reject) => {
      conn.query('INSERT INTO users SET ?', data, (err, result) => {
        if(!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },

  login: (username) => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT id, password FROM users WHERE username=?', username, (err, result) => {
        if(!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  }

}