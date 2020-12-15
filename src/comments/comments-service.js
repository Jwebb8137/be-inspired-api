const CommentsService = {
  getAllComments(knex, id) {
    return knex
      .from('comments')
      .where('post_id', id)
      .join('users', 'comments.user_id', 'users.id')
      .select('comments.date_commented', 'comments.comment', 'users.profile_img_url', 'users.username')
  },

  insertComment(knex, newComment) {
    return knex
      .insert(newComment)
      .into('comments')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },

  getById(knex, id) {
    return knex
      .from('comments')
      .select('*')
      .where('id', id)
      .first()
  },

  deleteComment(knex, id) {
    return knex('comments')
      .where({ id })
      .delete()
  },

  updateComment(knex, id, newCommentFields) {
    return knex('comments')
      .where({ id })
      .update(newCommentFields)
  },
}

module.exports = CommentsService