const db = require("./data/dbConfig");

async function getAllPosts(query = {}) {
  const { limit = 10, sortby = "id", sortdir = "desc" } = query;

  let rows = await db("accounts")
    .orderBy(sortby, sortdir)
    .limit(limit);

  return rows;
}

function getPostById(id) {
  return db
    .select("*")
    .from("accounts")
    .where({ id })
    .first();
}

function insertNewPost({
  name,
  budget
}) //here we could also do account instead of {name,budget}

{
  return (
    db("accounts")
      .insert({ name, budget }, "id")
      // and then put account here too in that case
      .then(ids => {
        const [id] = ids;

        return getPostById(id);
      })
  );
}

function replacePostById({ id, name, budget }) {
  return db("accounts")
    .where({ id })
    .update({ name, budget });
}

function deletePostById(id) {
  return db("accounts")
    .where({ id })
    .del();
}

module.exports = {
  getAllPosts,
  getPostById,
  insertNewPost,
  replacePostById,
  deletePostById
};
