const cuid = require('cuid')

const db = require('../db')

const Post = db.model('Post', {
  _id: { type: String, default: cuid },
  title: { type: String, required: true},
  author: {type: String, required: true},
  content: { type: String, required: true },
  tags: { type: [String], index: true }
})

module.exports = {
  list,
  create,
  remove,
  model: Post
}

async function list (opts = {}) {
    const { offset = 0, limit = 25, tag } = opts
  
    const query = tag ? { tags: tag } : {}
    const posts = await Post.find(query)
      .sort({ _id: 1 })
      .skip(offset)
      .limit(limit)
  
    return posts
  }

  async function create (fields) {
    const post = await new Post(fields).save()
    return post
  }

  async function remove (_id) {
    await Post.deleteOne({ _id })
  }