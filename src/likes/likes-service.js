const LikesService = {
  getAllLikes(knex) {
    return knex.select('*').from('post_likes')
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
      .select('*')
      .from('post_likes')
      .where('post_id', id)
  },

  // deleteLike(knex, id) {
  //   return knex('post_likes')
  //     .where({ post_id })
  //     .delete()
  // }
}

module.exports = LikesService