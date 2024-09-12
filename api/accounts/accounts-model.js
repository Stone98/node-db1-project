const db = require("../../data/db-config");

const getAll = () => {
  return db("accounts"); // returns all accounts in the database
};

const getById = (id) => {
  return db("accounts").where({ id }).first(); // returns the account who's id matched the id given first
};

const create = async (account) => {
  return db("accounts")
    .insert(account) // accesses the accounts table and adds the new account
    .then(([id]) => {
      return getById(id); // returns the newly created account
    });
};

const updateById = (id, account) => {
  const accountId = id; // assigns account's id to a variable so it can be accessed later
  return db("accounts")
    .where({ id })
    .update(account) // accesses the accounts table and adds the updates to the account with the specified id
    .then(() => {
      return getById(accountId); // returns the updated account
    });
};

const deleteById = (id) => {
  return db("accounts")
    .where({ id })
    .del() // accesses the accounts table and deletes the account with the specified id
    .then(() => {
      return getAll(); // returns all the accounts in the database, with the deleted account removed
    });
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
