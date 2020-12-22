const PostsService = {
  getAllPosts(knex, limit, offset) {
    return knex
      .select('*')
      .from('posts')
      .orderBy('date_created', 'desc')
      .limit(limit)
      .offset(offset)
  },
  insertPost(knex, newPost) {
    return knex
      .insert(newPost)
      .into('posts')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },
  getPostsByUserId(knex, id) {
    return knex
      .select('*')
      .from('posts')
      .where('post_uploader_id', id)
      .orderBy('date_created', 'desc')
  },
  deleteById(knex, id) {
    return knex('posts')
      .where({ id })
      .delete()  
  },
  updatePost(knex, id, newPostFields) {
    return knex('posts')
      .where({ id })
      .update(newPostFields)
  },
}

module.exports = PostsService;