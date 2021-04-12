const router = require("express").Router();
const Account = require("./accounts-model");
const mw = require("./accounts-middleware");

router.get("/", async (req, res, next) => {
  try {
    const data = await Account.getAll();
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", mw.checkAccountId, async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await Account.getById(id);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

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

router.delete("/:id", mw.checkAccountId, async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await Account.deleteById(id);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

// eslint-disable-next-line no-unused-vars
router.use((err, req, res, next) => {
  res.status(500).json({
    message: "something went wrong inside the accounts router",
    errMessage: err.message,
  });
});

module.exports = router;
