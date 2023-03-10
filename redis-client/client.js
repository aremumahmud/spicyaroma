const redis = require('ioredis')
const redisConnUrl = process.env.REDIS_CONN_URI || null


const client = new redis(redisConnUrl)

module.exports = client