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

function insertNewPost({ name, budget }) {
  return db("accounts").insert({ name, budget });
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
