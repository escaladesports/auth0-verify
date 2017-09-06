'use strict'
const jwt = require('express-jwt')
const jwksRsa = require('jwks-rsa')

module.exports = (token, uri, clientId) => {
	return new Promise((resolve, reject) => {
		const app = jwt({
			secret: jwksRsa.expressJwtSecret({
				cache: true,
				rateLimit: true,
				jwksRequestsPerMinute: 5,
				jwksUri: `https://${uri}/.well-known/jwks.json`
			}),
			audience: clientId,
			algorithms: ['RS256']
		})
		app({
			// req
			headers: {
				authorization: `Bearer ${token}`
			}
		}, {}, err => {
			if(err) return reject(err)
			resolve()
		})
	})
}