import * as dao from "./dao.js";
function QuizRoutes(app) {
  app.get("/api/courses/:cid/quizzes", async (req, res) => {
    const { cid } = req.params;
    try {
      const quizzes = await dao.findQuizFromCourse(cid);
      res.send(quizzes);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });
  app.get("/api/quizzes/:qid", async (req, res) => {
    try {
      const { qid } = req.params;
      const quiz = await dao.findQuizById(qid);
      if (!quiz) {
        res.status(404).send("Quiz not found");
        return;
      }
      res.send(quiz);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });
  app.put("/api/quizzes/:qid", async (req, res) => {
    const { qid } = req.params;
    const quiz = req.body;
    try {
      const status = await dao.updateQuiz(qid, quiz);
      res.sendStatus(204);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });
  app.delete("/api/quizzes/:qid",  async (req, res) => {
    console.log(req.params);
    const { qid } = req.params;
    try {
      const status = await dao.deleteQuiz(qid);
      res.json(204);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });
  app.post("/api/courses/:cid/quizzes", async (req, res) => {
    const { cid } = req.params;

    const newQuiz = {
      ...req.body,
      course: cid,
    };

    try {
      const new_quiz = await dao.createQuiz(newQuiz);
      console.log(new_quiz);

      res.send(new_quiz);
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  });
}
export default QuizRoutes;