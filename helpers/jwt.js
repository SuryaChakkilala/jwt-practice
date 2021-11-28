const expressJwt = require('express-jwt')

const authJwt = () => {
    const secret = 'secret'
    return expressJwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked
    }).unless({
        path: [
            '/api/v1/users/login',
            '/api/v1/users/register'
        ]
    })
}

const isRevoked = async(req, payload, done) => {
    if(!payload.isAdmin)
        return done(null, true)
    done()
}

module.exports = authJwt