const User = require('./user')
const errorHandler = require('../common/errorHandler')

User.methods(['get', 'post', 'put', 'delete'])
User.updateOptions({new: true, runValidators: true})
User.after('post', errorHandler).after('put', errorHandler)

module.exports = User
