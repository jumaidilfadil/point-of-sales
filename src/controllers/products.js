// import model
const productModel = require('../models/products')

const dateFormat = require('dateformat')
const dateNow = new Date()
const config = require('../configs/configs')
const uploadFolder = 'uploads'
const baseSiteUpload = `${config.baseSite}:${config.serverPort}/${uploadFolder}`
const jwt = require('jsonwebtoken')
let status = 200

module.exports = {

  getProducts: (req, res) => {
    const search = req.query.search
    const sort = req.query.sort
    const order = req.query.order
    const page = req.query.page
    const limit = req.query.limit
    const offset = (page - 1) * limit

    var query = `SELECT a.id, a.name, a.description, CONCAT("${baseSiteUpload}/", a.image) AS image, b.name as category, a.price, a.stock, a.date_added, a.date_updated FROM product a, category b WHERE a.id_category=b.id`
    if(search)
      query += ` AND a.name LIKE '%${search}%'`
    if(sort && order)
      query += ` ORDER BY ${sort} ${order}`
    if(page >= 1 && limit >= 1 && offset >= 0)
      query += ` LIMIT ${offset}, ${limit}`

    productModel.getProducts(query)
      .then(result => {
        if(result !== undefined && result.length !== 0) {
          status = 200
          var data = {
            status,
            message: 'success getting all data',
            data: result
          }
        } else {
          status = 404
          var data = {
            status,
            message: 'data not found'
          }
        }
        res.status(status).json(data)
      })
      .catch(err => {
        status = 500
        res.status(status).json({
          status,
          message: 'error getting data from database'
        })
      })
  },

  addProduct: (req, res) => {
    productModel.getProductsName()
      .then(result => {
        const name = req.body.name
        let nameAll = result.map(v => v.name)

        if(nameAll.includes(name)) {
          status = 403
          res.status(status).json({
            status,
            message: 'product name already exists'
          })
        } else if(!req.files) {
          status = 400
          res.status(status).json({
            status,
            message: 'no image selected'
          })
        } else {
          //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
          let image = req.files.image
          if(image.mimetype === 'image/jpeg' || image.mimetype === 'image/png' || image.mimetype === 'image/gif') {
            let nowDate = dateFormat(dateNow, 'yyyymmddHHMMss')
            let imageName = `${nowDate}_${image.name}`
            
            //Use the mv() method to place the file in upload directory (i.e. "uploads")
            image.mv(`./uploads/${imageName}`)

            const { id, description, id_category, price, stock } = req.body
            const date_added = dateFormat(dateNow, 'yyyy-mm-dd')
            const data = { id, name, description, image: imageName, id_category, price, stock, date_added }
            const dataJSON = { id, name, description, image: `${baseSiteUpload}/${imageName}`, id_category, price, stock, date_added }

            productModel.addProduct(data)
              .then(result => {
                status = 200
                res.json({
                  status,
                  message: 'success adding new product data',
                  dataJSON
                })
              })
              .catch(err => {
                status = 400
                console.log(err)
                res.status(status).json({
                  status,
                  message: 'error adding new product data'
                })
              })
          } else {
            status = 403
            res.status(status).json({
              status,
              message: 'image type must jpg, png, or gif'
            })
          }
        }
      })
      .catch(err => {
        status = 400
        console.log(err)
        res.status(status).json({
          status,
          message: 'error adding new product data'
        })
      })
  },

  editProduct: (req, res) => {
    const idEdit = req.params.id

    productModel.getProductsNameForEdit(idEdit)
      .then(result => {
        const name = req.body.name
        let nameAll = result.map(v => v.name)

        if(nameAll.includes(name)) {
          status = 403
          res.status(status).json({
            status,
            message: 'product name already exists'
          })
        } else {
          const id = req.params
          const { description, id_category, price, stock } = req.body
          const date_updated = dateFormat(dateNow, 'yyyy-mm-dd')

          if(req.files) {
            let image = req.files.image
            if(image.mimetype === 'image/jpeg' || image.mimetype === 'image/png' || image.mimetype === 'image/gif') {
              let nowDate = dateFormat(dateNow, 'yyyymmddHHMMss')
              let imageName = `${nowDate}_${image.name}`
              
              //Use the mv() method to place the file in upload directory (i.e. "uploads")
              image.mv(`./${uploadFolder}/${imageName}`)

              var data = { name, description, image: imageName, id_category, price, stock, date_updated }
              var dataJSON = { name, description, image: `${baseSiteUpload}/${imageName}`, id_category, price, stock, date_updated }
            } else {
              status = 403
              res.status(status).json({
                status,
                message: 'image type must jpg, png, or gif'
              })
            }
          } else {
            var data = { name, description, id_category, price, stock, date_updated }
            var dataJSON = data
          }

          productModel.editProduct(data, id)
            .then(result => {
              status = 200
              res.json({
                status,
                message: 'success editing product data',
                dataJSON
              })
            })
            .catch(err => {
              status = 400
              console.log(err)
              res.status(status).json({
                status,
                message: 'error editing product data'
              })
            })
        }

      })
      .catch(err => {
        status = 400
        console.log(err)
        res.status(status).json({
          status,
          message: 'error editing product data'
        })
      })
  },

  deleteProduct: (req, res) => {
    const id = req.params
    const data = id

    productModel.deleteProduct(data)
      .then(result => {
        status = 200
        res.json({
          status,
          message: 'success deleting product data',
          data
        })
      })
      .catch(err => {
        status = 400
        console.log(err)
        res.status(status).json({
          status,
          message: 'error deleting product data'
        })
      })
  },

  addStockProduct: (req, res) => {
    const id = req.params
    const stockAdd = parseInt(req.body.stock)

    productModel.addStockProduct(stockAdd, id)
      .then(result => {
        status = 200
        res.json({
          status,
          message: 'success adding product stock data',
          data: {
            stock: stockAdd
          }
        })
      })
      .catch(err => {
        status = 400
        console.log(err)
        res.status(status).json({
          status,
          message: 'error addding product stock data'
        })
      })
  },

  reduceStockProduct: (req, res) => {
    const id = req.params
    var stockReduce = req.body.stock

    productModel.getProductStockById(id)
      .then(result => {
        var stockNow = parseInt(JSON.stringify(result[0].stock))
        var stockReduce = parseInt(req.body.stock)
        
        if( stockReduce > stockNow )
        {
          var stockReduce = 0
          status = 304
          var stockReduceJSON = {
            status,
            message: 'cannot reducing because the stock is reduced too much'
          }
        }
        else
        {
          status = 200
          var stockReduceJSON = {
            status,
            message: 'success reducing product stock data',
            data: {
              stock: stockReduce
            }
          }
        }
    
        productModel.reduceStockProduct(stockReduce, id)
          .then(result2 => {
            res.json(stockReduceJSON)
          })
          .catch(err => {
            status = 400
            console.log(err)
            res.status(status).json({
              status,
              message: 'error reducing product stock data'
            })
          })
      })
      .catch(err => {
        status = 500
        res.status(status).json({
          status,
          message: 'error getting data from database'
        })
      })
  }

}
