const express = require('express')
const router = express.Router()

const multer = require('multer')
const {
    getItems,
    getItem,
    createItem,
    deleteItem,
    updateItem
} = require('../controller/itemsController')

//get all items
router.get('/', getItems)
//get singel item
router.get('/:title', getItem)
//create new item
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
//middleware
const upload = multer({ storage: storage })

router.post('/', upload.single("thumbnail"), createItem)
//delete singel item
router.delete('/:id', deleteItem)
//update singel item
router.patch('/:id',upload.single("thumbnail"), updateItem)
module.exports = router