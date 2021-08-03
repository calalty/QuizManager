const { authenticate } = require("passport");
const { userAuth, checkRole } = require("../middlewares/auth");
const quiz = require("../models/quiz");
const Quiz = require("../models/quiz");
const router = require("express").Router();

router.post(
  "/api/createquiz/:titleId",
  userAuth,
  checkRole("editor"),
  (req, res) => {
    let newQuiz = new Quiz({
      description: req.body.description,
      answers: req.body.answers,
      _titleId: req.params.titleId,
    });

    newQuiz.save();
    res.send(newQuiz)
  }
);

router.get("/api/findquizzes/:titleId", userAuth, (req, res) => {
  Quiz.find({
    _titleId: req.params.titleId,
  }).then((quizzes) => {
    res.send(quizzes)
  });
});

router.get("/api/findquiz/:quizId", userAuth, (req, res) => {
    Quiz.find({
      _id: req.params.quizId,
    }).then((quiz) => {
      res.send(quiz)
    });
  });

router.delete(
  "/api/deletequiz/:id",
  userAuth,
  checkRole("editor"),
  (req, res) => {
    Quiz.findByIdAndDelete({
        _id: req.params.id
    }).then((deletedQuiz) => {
      if (deletedQuiz) {
        res.status(201).json({
          success: true,
          msg: "Quiz deleted!",
          deleted: deletedQuiz,
        });
      }
    });
  }
);

router.patch("/api/patchquiz/:quizId", userAuth,
checkRole("editor"), (req, res) => {
  Quiz.find({
    _id: req.params.quizId,
  }).then((foundQuiz) => {
    if (foundQuiz) {
      Quiz.updateOne({
        _id: req.params.quizId,
      },  {
        $set: req.body,
      }
      ).then((updated) => {
        res.status(201).json({
            success: true,
            msg: "Quiz updated!",
            updated: updated,
          });
      })
    }
    
  });
});

module.exports = router;
