const Items = require('../models/items')


//get all items
const getItems = async (req, res) => {
    try {
        const category = req.query.category
        const filter = {}
        if (category) {
            filter.category = category

        }
        const data = await Items.find(filter)
        res.json(data)
    }
    catch (error) {
        res.this.status(500).json({ error: 'an error fetching items' })

    }
}

//get singel item
const getItem = async (req, res) => {
    const titleParam = req.params.title
    const item = await Items.findOne({ title: titleParam })
    if (!item) {
        return res.json({ error: 'No such item' })
    }
    res.json(item)


}

//create new item
const createItem = async (req, res) => {
    try {
        const item = new Items({
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            thumbnail: req.file.filename,

        })
        console.log(item.title);
        await item.save();
        res.json('data Submitted')
    }
    catch (error) {
        res.status(500).json({ error:`An error occurred while create item. and the title  is:
         ${req.body.title}${req.body.slug}${req.body.description}${req.body.category}`} );

    }


}
//delete singel item

const deleteItem = async (req, res) => {
    const itemId = req.params.id
    try {
        await Items.deleteOne({ _id: itemId })
        res.json("delete item :" + req.params.id)
    }
    catch (error) {
        res.json(error);
    }

}
//update singel item

const updateItem = async (req, res) => {
    const itemId = req.params.id
    console.log(`back id :${itemId}`)
    try {
        const updateItem = {
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
          }
      
          if (req.file) {
            updateItem.thumbnail = req.file.filename;
          }
      
          await Items.findByIdAndUpdate(itemId, updateItem)
         
        

        if (!item) {
             res.json({ error: 'No such Item' })
        }

        res.json(item)

    }
    catch (error) {
        res.json(error);
    }

}
module.exports = {
    getItems,
    getItem,
    createItem,
    deleteItem,
    updateItem
}
