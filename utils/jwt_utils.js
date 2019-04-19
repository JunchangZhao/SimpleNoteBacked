const jwt = require('jsonwebtoken')

const secret = 'note_jwt'

function getToken(payload = {}) {
    return jwt.sign(payload, secret, {expiresIn: '30d'});
}

function getJWTPayload(token) {
    return jwt.verify(token.split(' ')[1], secret);
}


module.exports = {getToken, getJWTPayload, secret: secret}