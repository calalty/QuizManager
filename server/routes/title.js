const router = require("express").Router();
const { userAuth, checkRole } = require("../middlewares/auth");
const Title = require("../models/title");
const Quiz = require("../models/quiz");
router.post("/api/createtitle", userAuth, checkRole("editor"), (req, res) => {
  let newTitle = new Title({
    title: req.body.title,
  });
  newTitle.save();
  res.send(newTitle);
});

router.get("/api/findtitles", userAuth, (req, res) => {
  Title.find({}).then((title) => {
    res.send(title);
  });
});

router.get("/api/findtitle/:id", userAuth, (req, res) => {
  Title.findOne({
    _id: req.params.id,
  }).then((title) => {
    res.send(title);
  });
});

router.patch(
  "/api/patchtitle/:id",
  userAuth,
  checkRole("editor"),
  (req, res) => {
    Title.findOneAndUpdate(
      {
        _id: req.params.id,
        _userId: req.user_id,
      },
      {
        $set: req.body,
      }
    ).then((updatedTitle) => {
      if (updatedTitle) {
        res.send(updatedTitle);
      }
    });
  }
);

router.delete(
  "/api/deletetitle/:id",
  userAuth,
  checkRole("editor"),
  (req, res) => {
    Title.findOneAndDelete({
      _id: req.params.id,
      _userId: req.user_id,
    }).then((deletedTitle) => {
      if (deletedTitle) {
        Quiz.deleteMany({
          _titleId: req.params.id,
        }).then((deletedQuizzes) => {
          res.send(deletedQuizzes);
        });
      }
    });
  }
);
module.exports = router;
