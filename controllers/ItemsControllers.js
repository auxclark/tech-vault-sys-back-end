const Item = require('../schema/Item')

const addItem = async (req, res) => {
    const {  model, condition, assignedTo, dateAssigned, dateReturned, location, lastInspection } = req.body

    try {
        const item = await Item.create({
            model: model,
            condition: condition,
            assignedTo: assignedTo,
            dateAssigned: dateAssigned,
            dateReturned: dateReturned,
            location: location,
            lastInspection: lastInspection
        })
        res.json(item)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const fetchAllItems = async (req, res) => {
    try {
        const items = await Item.find()
        res.json(items)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const fetchItem = async (req, res) => {
    const { id } = req.params

    try {
        const item = await Item.findById(id)
        res.json(item)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const deleteItem = async (req, res) => {
    const { id } = req.params

    try {
        const items = await Item.findByIdAndDelete(id)
        res.json(items)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const updateItem = async (req, res) => {
    const { id } = req.params
    const { model, condition, assignedTo, dateAssigned, dateReturned, location, lastInspection } = req.body

    try {
        const item = await Item.findByIdAndUpdate(id, {
            model: model,
            condition: condition,
            assignedTo: assignedTo,
            dateAssigned: dateAssigned,
            dateReturned: dateReturned,
            location: location,
            lastInspection: lastInspection
        })
        res.json(item)
    }catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {
    addItem,
    fetchAllItems,
    fetchItem,
    deleteItem,
    updateItem
}

