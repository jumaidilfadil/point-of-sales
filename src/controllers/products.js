// import model
const productModel = require('../models/products')

const dateFormat = require('dateformat')
const dateNow = new Date()
const config = require('../configs/configs')
const uploadFolder = 'uploads'
const baseSiteUpload = `${config.baseSite}:${config.serverPort}/${uploadFolder}`
const redis = require('redis');
const client = redis.createClient();
let status = 200

module.exports = {

  getProducts: (req, res) => {
    const search = req.query.search
    var sort = req.query.sort || 'id'
    var order = req.query.order || 'asc'
    const page = req.query.page
    const limit = req.query.limit
    const offset = (page - 1) * limit

    var query = `SELECT a.id, a.name, a.description, CONCAT("${baseSiteUpload}/", a.image) AS image, b.name as category, a.price, a.stock, a.date_added, a.date_updated
                  FROM product a, category b
                  WHERE a.id_category=b.id`
    if(search)
      query += ` AND a.name LIKE '%${search}%'`
    if(sort && order)
      query += ` ORDER BY ${sort} ${order}`
    if(page >= 1 && limit >= 1 && offset >= 0)
      query += ` LIMIT ${offset}, ${limit}`

    productModel.getProducts(query)
      .then(result => {
        if(result !== undefined && result.length !== 0) {

          var total_data = Object.keys(result).length
          var total_page
          var total_data_all
          
          if(page >= 1 && limit >= 1 && offset >= 0) {
            productModel.getProductsTotalDataAll()
              .then(resultTotalDataAll => {
                total_data_all = parseInt(JSON.stringify(resultTotalDataAll[0].total_data_all))
                total_page = Math.ceil(total_data_all/limit)
                status = 200
                var data = {
                  status,
                  message: 'success getting all data',
                  search_name: search,
                  sort,
                  order,
                  page,
                  limit,
                  total_page,
                  total_data,
                  data: result
                }
                var dataCache = {
                  status,
                  message: 'success getting all data from cache',
                  search_name: search,
                  sort,
                  order,
                  page,
                  limit,
                  total_page,
                  total_data,
                  data: result
                }
                client.set('data', JSON.stringify(dataCache))
                res.status(status).json(data)
              })
              .catch(err => {
                status = 500
                res.status(status).json({
                  status,
                  message: 'error getting total_data_all product from database (1)'
                })
              })
          } else {
            status = 200
            var data = {
              status,
              message: 'success getting all data',
              search_name: search,
              sort,
              order,
              page,
              limit,
              total_data,
              data: result
            }
            dataCache = {
              status,
              message: 'success getting all data from cache',
              search_name: search,
              sort,
              order,
              page,
              limit,
              total_data,
              data: result
            }
            client.set('data', JSON.stringify(dataCache))
            res.status(status).json(data)
          }
        } else {
          status = 404
          var data = {
            status,
            message: 'data not found'
          }
          res.status(status).json(data)
        }
      })
      .catch(err => {
        status = 500
        res.status(status).json({
          status,
          message: 'error getting data from database (2)'
        })
      })
  },
  
  getProductsCache: (req, res, next) => {
    client.get('data', (err, result) => {
      if (err) {
        throw err 
      } else {
        if (result != null) {
          let data = JSON.parse(result)
          let search = req.query.search
          let sort = req.query.sort
          let order = req.query.order
          let page = req.query.page
          let limit = req.query.limit

          console.log(data.search_name)
          
          if(
            (!search && data.search_name) ||
            (search && search !== data.search_name) ||
            (sort && order && (sort !== data.sort || order !== data.order)) ||
            (page && limit && (page !== data.page || limit !== data.limit))
          ) {
            client.del('data')
            next()
          } else {
            res.status(200).json(JSON.parse(result))
          } 

          // client.del('data')
        } else {
          next()
        }
      }
    })
  },

  addProduct: (req, res) => {
    productModel.getProductsName()
      .then(result => {
        const name = req.body.name
        const id_category = req.body.id_category
        const price = req.body.price
        const stock = req.body.stock
        let nameAll = result.map(v => v.name)

        if(!name) {
          status = 403
          res.status(status).json({
            status,
            message: 'name required'
          })
        } else if(!id_category) {
          status = 403
          res.status(status).json({
            status,
            message: 'id_category required'
          })
        } else if(!price) {
          status = 403
          res.status(status).json({
            status,
            message: 'price required'
          })
        } else if(!stock) {
          status = 403
          res.status(status).json({
            status,
            message: 'stock required'
          })
        } else if(nameAll.includes(name)) {
          status = 403
          res.status(status).json({
            status,
            message: 'product name already exists'
          })
        } else {
          var image
          if(req.files) {
            //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
            image = req.files.image
            if(image.mimetype === 'image/jpeg' || image.mimetype === 'image/png' || image.mimetype === 'image/gif') {
              let nowDate = dateFormat(dateNow, 'yyyymmddHHMMss')
              var imageName = `${nowDate}_${image.name}`
              
              //Use the mv() method to place the file in upload directory (i.e. "uploads")
              image.mv(`./uploads/${imageName}`)
            } else {
              status = 403
              res.status(status).json({
                status,
                message: 'image type must jpg, png, or gif'
              })
            }
          } else {
            var imageName = req.body.image
          }

          const { id, description } = req.body
          const date_added = dateFormat(dateNow, 'yyyy-mm-dd HH:MM:ss')
          const data = { id, name, description, image: imageName, id_category, price, stock, date_added }
          if(imageName) {
            var dataJSON = { id, name, description, image: `${baseSiteUpload}/${imageName}`, id_category, price, stock, date_added }
          } else {
            var dataJSON = { id, name, description, id_category, price, stock, date_added }
          }

          productModel.addProduct(data)
            .then(result => {
              status = 200
              res.json({
                status,
                message: 'success adding new product data',
                dataJSON
              })
              client.del('data')
            })
            .catch(err => {
              status = 400
              console.log(err)
              res.status(status).json({
                status,
                message: 'error adding new product data'
              })
            })
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
          const date_updated = dateFormat(dateNow, 'yyyy-mm-dd HH:MM:ss')

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
                data: dataJSON
              })
              client.del('data')
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
        client.del('data')
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
        client.del('data')
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

    productModel.getProductStockById(id)
      .then(result => {
        var stockNow = parseInt(JSON.stringify(result[0].stock))
        var stockReduce = parseInt(req.body.stock)
        
        if( stockReduce > stockNow ) {
          var stockReduce = 0
          status = 403
          var stockReduceJSON = {
            status,
            message: 'cannot reducing because the stock is reduced too much'
          }
        } else {
          stockNow -= stockReduce
          status = 200
          var stockReduceJSON = {
            status,
            message: 'success reducing product stock data',
            data: {
              stock_reduced: stockReduce,
              stock_now: stockNow
            }
          }
        }
    
        productModel.reduceStockProduct(stockReduce, id)
          .then(result2 => {
            res.status(status).json(stockReduceJSON)
            client.del('data')
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
