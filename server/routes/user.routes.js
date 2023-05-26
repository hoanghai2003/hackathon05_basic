const express = require("express");

const router = express.Router();

const database = require("../Utils/database");

router.get("/", async (req, res) => {
  try {
    let data = await database.execute("SELECT * FROM `api-keeper`.users");

    let [users] = data;

    console.log(users, "-----------");

    res.json({ status: "success", users });
  } catch (error) {
    res.json(error);
  }
});

router.get("/:id", checkExist, (req, res) => {
  res.json({ mess: "doc mot du lieu thanh cong" });
});

router.post("/", checkExist, validate, async (req, res) => {
  try {
    const { name_user, user_cmt } = req.body;

    await database.execute(
      "INSERT INTO `api-keeper`.`users` (`name_user`, `user_cmt`) VALUES (?, ?)",
      [name_user, user_cmt]
    );
  } catch (error) {}
  res.json({ mess: "post thanh cong" });
});

router.put("/:id", (req, res) => {
  res.json({ mess: "update thanh cong" });
});

router.delete("/:id_user", async (req, res) => {
  try {
    const { id_user } = req.params;

    await database.execute(
      "DELETE FROM `api-keeper`.`users` WHERE `id_user` = ?",
      [id_user]
    );

    res.json({ message: "Delete successful" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the user" });
  }
});

//Middleware
function checkExist(req, res, next) {
  let { name_user, user_cmt } = req.body;
  let data = database.execute("SELECT * FROM `api-keeper`.users");

  let find = data.find((e, i) => e.name_user === name_user);
  let findd = data.find((e, i) => e.user_cmt === user_cmt);

  if (find || findd) {
    res.json({ mess: "da ton tai " });
  } else {
    next();
  }
}

//validate
function validate(req, res, next) {
  let { name_user, user_cmt } = req.body;
  let validateSchems = Joi.object({
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    name_user: Joi.string().alphanum().min(3).max(30).required(),
    user_cmt: Joi.string().alphanum().min(3).max(30).required(),
  });

  let validateResult = validateSchems.validate({
    name_user,
    user_cmt,
  });
  if (!validateResult.error) {
    next();
  } else {
    res.json({
      mess: "ok",
    });
  }
}

module.exports = router;
