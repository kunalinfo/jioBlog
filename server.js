const express = require('express')
const bodyParser = require('body-parser')

const api = require('./api')
const middleware = require('./middleware')

const port = process.env.PORT || 1337

const app = express()

app.use(middleware.cors)
app.use(bodyParser.json())

app.get('/posts', api.listPosts)
app.post('/posts', api.createPost)
app.delete('/posts/:id', api.deletePost)

app.use(middleware.handleValidationError)
app.use(middleware.handleError)
app.use(middleware.notFound)

const server = app.listen(port, () =>
  console.log(`Server listening on port ${port}`)
)

if (require.main !== module) {
  module.exports = server
}
