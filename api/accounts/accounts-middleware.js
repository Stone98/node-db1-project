const Account = require("./accounts-model");

// checks to see if the correct name and budget is sent to either insert or update an account
exports.checkAccountPayload = (req, res, next) => {
  const { name, budget } = req.body; // destructuring name and budget from req.body
  if (name === undefined || budget === undefined) {
    // sends error if nothing is provided for name or budget
    res.status(400).json({ message: "name and budget are required" });
  } else if (typeof name !== "string") {
    // sends error if name is not a string
    res.status(400).json({ message: "name of account must be a string" });
  } else if (name.trim().length < 3 || name.trim().length > 100) {
    // sends error if name trimmed is less than 3 characters or greater than 100 characters
    res
      .status(400)
      .json({ message: "name of account must be between 3 and 100" });
  } else if (typeof budget !== "number" || isNaN(budget)) {
    // sends error if budget is not a number
    res.status(400).json({ message: "budget of account must be a number" });
  } else if (budget < 0 || budget > 1000000) {
    // sends error if budget is less than 0 or greater than 1000000
    res
      .status(400)
      .json({ message: "budget of account is too large or too small" });
  } else {
    // moves on if all the above are true
    next();
  }
};

// checks the database to see if name of account is unique and not already used
exports.checkAccountNameUnique = async (req, res, next) => {
  const { name } = req.body; // destructuring name from req.body
  // variable created if the name given is already in the database, variable will be undefined if no match found
  const nameExists = await Account.getAll().where("name", name.trim()).first();
  if (!nameExists) {
    // if name does not exists in database, move on
    next();
  } else {
    // sends error if name already exists in the database
    res.status(400).json({ message: "that name is taken" });
  }
};
// checks to see if the id of an acoount exists in the database, used to find individual accounts
exports.checkAccountId = async (req, res, next) => {
  const { id } = req.params; // destructuring id from req.params
  // variable created if the id given is already in the database, variable will be undefined if no match found
  const idExists = await Account.getById(id);
  if (idExists) {
    // if id does exists in database, move on
    next();
  } else {
    // sends error if id does not exists in the database
    res.status(404).json({ message: "account not found" });
  }
};
