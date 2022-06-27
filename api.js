const Posts = require('./models/posts')
const autoCatch = require('./lib/auto-catch')

module.exports = autoCatch({
  listPosts,
  createPost,
  deletePost
})

async function listPosts (req, res, next) {
  const { offset = 0, limit = 25, tag } = req.query

  const posts = await Posts.list({
    offset: Number(offset),
    limit: Number(limit),
    tag
  })

  res.json(posts)
}

async function createPost (req, res, next) {
  const posts = await Posts.create(req.body)
  res.json(posts)
}

async function deletePost (req, res, next) {
  await Posts.remove(req.params.id)
  res.json({ success: true })
}