const router = require("express").Router(); // sets up accounts router
const Account = require("./accounts-model"); // imports accounts model functions
const mw = require("./accounts-middleware"); // imports accounts middlewares using a named import

// route to GET all accounts
router.get("/", async (req, res, next) => {
  try {
    const data = await Account.getAll();
    res.json(data);
  } catch (err) {
    next(err);
  }
});

// route to GET an account by its id
router.get("/:id", mw.checkAccountId, async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await Account.getById(id);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

// route to POST a new account
router.post(
  "/",
  mw.checkAccountPayload,
  mw.checkAccountNameUnique,
  async (req, res, next) => {
    try {
      const account = req.body;
      const data = await Account.create(account);
      if (data.name !== null) {
        data.name = data.name.trim();
      }
      res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  }
);

// route to PUT/UPDATE an existing account by using its id to find it
router.put(
  "/:id",
  mw.checkAccountPayload,
  mw.checkAccountId,
  mw.checkAccountNameUnique,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const changes = req.body;
      const data = await Account.updateById(id, changes);
      res.json(data);
    } catch (err) {
      next(err);
    }
  }
);

// route to DELETE an existing account by using its id to find it
router.delete("/:id", mw.checkAccountId, async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await Account.deleteById(id);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

// error handling middleware for errors that occur in accounts router
// eslint-disable-next-line no-unused-vars
router.use((err, req, res, next) => {
  res.status(500).json({
    message: "something went wrong inside the accounts router",
    errMessage: err.message,
  });
});

module.exports = router;
