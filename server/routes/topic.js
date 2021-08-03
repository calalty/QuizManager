const router = require("express").Router();
const { userAuth, checkRole } = require("../middlewares/auth");
const Topic = require("../models/topic");
const Quiz = require("../models/quiz");
router.post("/api/createtopic", userAuth, checkRole("editor"), (req, res) => {
  let newTopic = new Topic({
    topic: req.body.topic,
  });
  newTopic.save();
  res.send(newTopic);
});

router.get("/api/findtopics", userAuth, (req, res) => {
  Topic.find({}).then((topic) => {
    res.send(topic);
  });
});

router.get("/api/findtopic/:id", userAuth, (req, res) => {
  Topic.findOne({
    _id: req.params.id,
  }).then((topic) => {
    res.send(topic);
  });
});

router.patch(
  "/api/patchtopic/:id",
  userAuth,
  checkRole("editor"),
  (req, res) => {
    Topic.findOneAndUpdate(
      {
        _id: req.params.id,
        _userId: req.user_id,
      },
      {
        $set: req.body,
      }
    ).then((updatedTopic) => {
      if (updatedTopic) {
        res.send(updatedTopic);
      }
    });
  }
);

router.delete(
  "/api/deletetopic/:id",
  userAuth,
  checkRole("editor"),
  (req, res) => {
    Topic.findOneAndDelete({
      _id: req.params.id,
      _userId: req.user_id,
    }).then((deletedTopic) => {
      if (deletedTopic) {
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
