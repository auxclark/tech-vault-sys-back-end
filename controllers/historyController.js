const History = require('../schema/History');

const addHistory = async (req, res) => {
    try {
        const history = await History.create(req.body)
        res.json(history)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getHistory = async (req, res) => {
    try {
        const history = await History.find()
        res.json(history)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getHistoryById = async (req, res) => {
    const { id } = req.params
    try {
        const history = await History.findById(id)
        res.json(history)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const deleteHistory = async (req, res) => {
    const { id } = req.params
    try {
        const history = await History.findByIdAndDelete(id)
        res.json(history)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = { addHistory, getHistory, getHistoryById, deleteHistory }