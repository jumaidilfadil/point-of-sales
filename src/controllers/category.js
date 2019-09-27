// import model
const categoryModel = require('../models/category')
let status = 200

module.exports = {

  getCategory: (req, res) => {
    categoryModel.getCategory()
      .then(result => {
        status = 200
        res.json({
          status: 200,
          message: 'success getting all category data',
          data: result
        })
      })
      .catch(err => {
        res.status(status).json({
          status,
          message: 'error getting category data from database'
        })
      })
  },

  addCategory: (req, res) => {
    categoryModel.getCategoryName()
      .then(result => {
        const name = req.body.name
        const data = { name: name }
        let nameAll = result.map(v => v.name)

        if(nameAll.includes(name)) {
          status = 403
          res.status(status).json({
            status,
            message: 'category name already exists'
          })
        } else {
          categoryModel.addCategory(data)
            .then(result => {
              status = 200
              res.json({
                status,
                message: 'success adding new category data',
                data
              })
            })
            .catch(err => {
              status = 400
              console.log(err)
              res.status(status).json({
                status,
                message: 'error adding new category data'
              })
            })
        }

      })
      .catch(err => {
        status = 400
        console.log(err)
        res.status(status).json({
          status,
          message: ''
        })
      })
  },

  editCategory: (req, res) => {
    const id = req.params.id

    categoryModel.getCategoryNameForEdit(id)
      .then(result => {
        const name = req.body.name
        const data = { name: name }
        let nameAll = result.map(v => v.name)

        if(nameAll.includes(name)) {
          status = 403
          res.status(status).json({
            status,
            message: 'category name already exists'
          })
        } else {
          categoryModel.editCategory(data, id)
            .then(result => {
              status = 200
              res.status(status).json({
                status,
                message: 'success editing category data',
                data
              })
            })
            .catch(err => {
              status = 400
              console.log(err)
              res.status(status).json({
                status,
                message: 'error editing category data'
              })
            })
        }

      })
      .catch(err => {
        console.log(err)
        status = 500
        res.status(status).json({
          status,
          message: 'error editing category data'
        })
      })
  },

  deleteCategory: (req, res) => {
    const { id } = req.params
    const data = { id }

    categoryModel.deleteCategory(data)
      .then(result => {
        status = 200
        res.json({
          status,
          message: 'success deleting category data',
          data
        })
      })
      .catch(err => {
        status = 500
        console.log(err)
        res.status(status).json({
          status,
          message: 'error deleting category data'
        })
      })
  }

}
