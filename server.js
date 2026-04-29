const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const requireAuth = require('./middleware/requireAuth')
const { addItem, fetchAllItems, fetchItem, deleteItem, updateItem } = require('./controllers/ItemsControllers')
const { signUp, login, logout, checkAuth, fetchUsers, editUser, deleteUser, getUserById } = require('./controllers/usersController')
const { addHistory, getHistory, getHistoryById, deleteHistory } = require('./controllers/historyController')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: process.env.FRONTEND_URL || true,
    credentials: true
}))

//Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB')
}).catch((error) => {
    console.log(error)
})

// Start Server
app.listen(process.env.PORT, () => {
    console.log('Server is running')
})

// Routes for Items //

// ADD Item
app.post('/items', addItem)

// GET ALL Items
app.get('/items', fetchAllItems)

// GET an Item
app.get('/items/:id', fetchItem)

// DELETE an Item
app.delete('/items/:id', deleteItem)

// UPDATE an Item
app.patch('/items/:id', updateItem)


// Routes for Users //

// SIGN UP
app.post('/signup', signUp)

// LOGIN
app.post('/login', login)

// LOGOUT
app.post('/logout', logout)

// Get users
app.get('/users', fetchUsers)

// Get user by ID
app.get('/users/:id', getUserById)

// Edit user
app.patch('/users/:id', editUser)

// Delete user
app.delete('/users/:id', deleteUser)


// Routes for History //

// ADD History
app.post('/history', addHistory)

// GET ALL History
app.get('/history', getHistory)

// GET History by ID
app.get('/history/:id', getHistoryById)

// DELETE History
app.delete('/history/:id', deleteHistory)


// middlewares

// Check if user is authenticated
app.get('/check-auth', requireAuth ,checkAuth)