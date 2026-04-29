const jwt = require('jsonwebtoken')
const User = require('../schema/user')

const requireAuth = async(req, res, next) => {
    try {
        // read from cookie OR header
        const token = req.cookies.Authorization || 
                      req.headers.authorization?.split(' ')[1]

        if(!token) {
            return res.status(401).json({ error: 'Unauthorized' })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.sub)

        if(!user) {
            return res.status(401).json({ error: 'Unauthorized' })
        }

        if(Date.now() > decoded.exp) {
            return res.status(401).json({ error: 'Unauthorized' })
        }

        req.user = user
        next()
    } catch (error) {
        res.status(401).json({ error: 'Unauthorized' })
    }
}

module.exports = requireAuth