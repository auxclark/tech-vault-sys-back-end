const User = require('../schema/user')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signUp = async (req, res) => {
    const { email, password } = req.body
    const hashPassword = bcrypt.hashSync(password, 8)

    try {
        const user = await User.create({
            email: email,
            password: hashPassword
        })
        res.json(user)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email: email })
        const passwordMatch = bcrypt.compareSync(password, user.password)

        if(!user) {
            return res.status(401).json({ error: 'Invalid credentials' })
        }

        if(!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' })
        }

        const exp = Date.now() + 1000 * 60 * 60 * 24 * 30;
        const token = jwt.sign({ sub: user._id, exp: exp }, process.env.JWT_SECRET)

        res.cookie("Authorization", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            expires: new Date(exp),
        })
        res.status(200).json({ _id: user._id, name: user.name, email: user.email, role: user.role, token: token })

    }catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const logout = async (req, res) => {
    res.clearCookie("Authorization")
    res.sendStatus(200)
}

const checkAuth = (req, res) => {
    console.log(req.user)
    res.sendStatus(200)
}

const fetchUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const editUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;

    try {
        // Prepare an object with only the fields to update
        const updateData = { name, email };

        // If password is provided, hash it and include it in the update data
        if (password) {
            updateData.password = bcrypt.hashSync(password, 8);
        }

        // Update user with only the specified fields
        const user = await User.findByIdAndUpdate(id, updateData, { new: true });
        
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const deleteUser = async (req, res) => {
    const { id } = req.params
    try {
        const user = await User.findByIdAndDelete(id)
        res.json(user)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getUserById = async (req, res) => {
    const { id } = req.params
    try {
        const user = await User.findById(id)
        res.json(user)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = { signUp, login, logout, checkAuth, fetchUsers, editUser, deleteUser, getUserById }