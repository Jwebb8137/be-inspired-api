const LikesService = {
  getAllLikes(knex, id) {
    return knex
    .select('*')
      .from('post_likes')
      .where('post_id', id)
  },

  insertLike(knex, newLike) {
    return knex
      .insert(newLike)
      .into('post_likes')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },
  getLikesByPostId(knex, id) {
    return knex
      .count()
      .select('*')
      .from('post_likes')
      .where('post_id', id)
      .first()
  },

  getById(knex, id) {
    return knex.from('posts').select('*').where('id', id).first()
  },

  // deleteLike(knex, id) {
  //   return knex('post_likes')
  //     .where({ post_id })
  //     .delete()
  // }
}

module.exports = LikesService