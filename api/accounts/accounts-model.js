const db = require("../../data/db-config");

const getAll = () => {
  return db("accounts");
};

const getById = (id) => {
  return db("accounts").where({ id }).first();
};

const create = async (account) => {
  return db("accounts")
    .insert(account)
    .then(([id]) => {
      return getById(id);
    });
};

const updateById = (id, account) => {
  const accountId = id;
  return db("accounts")
    .where({ id })
    .update(account)
    .then(() => {
      return getById(accountId);
    });
};

const deleteById = (id) => {
  return db("accounts")
    .where({ id })
    .del()
    .then(() => {
      return getAll();
    });
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
