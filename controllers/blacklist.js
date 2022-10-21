const jwt = require('express-jwt')
const blacklist = require('./blacklist')

let isRevokedCallback = function(req, payload, done){
  let issuer = payload.iss
  let tokenId = payload.jti

  blacklist.getRevokedToken(issuer, tokenId, function(err, token){
    if (err) { return done(err) }
    return done(null, !!token)  // 第二个参数为 true 则不通过
  })
}

app.use(jwt({
  secret: 'secret12345',
  isRevoked: isRevokedCallback
}))