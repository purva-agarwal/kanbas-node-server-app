import * as dao from "./dao.js";
function QuestionRoutes(app) {
  app.get("/api/quizzes/:qid/questions", async (req, res) => {
    const { qid } = req.params;
    try {
      const questions = await dao.findQuestionFromQuiz(qid);
      res.send(questions);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });
  app.get("/api/questions/:qsid", async (req, res) => {
    try {
      const { qsid } = req.params;
      const question = await dao.findQuestionById(qsid);
      if (!question) {
        res.status(404).send("Question not found");
        return;
      }
      res.send(question);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });
  app.put("/api/questions/:qsid", async (req, res) => {
    const { qsid } = req.params;
    const question = req.body;
    try {
      const status = await dao.updateQuestion(qsid, question);
      res.sendStatus(204);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });
  app.delete("/api/questions/:qsid",  async (req, res) => {
    console.log(req.params);
    const { qsid } = req.params;
    try {
      const status = await dao.deleteQuestion(qsid);
      res.json(204);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });
  app.post("/api/quizzes/:qid/questions", async (req, res) => {
    const { qid } = req.params;

    const newQuestion = {
      ...req.body,
      quiz: qid,
    };

    try {
      const new_question = await dao.createQuestion(newQuestion);
      res.send(new_question);
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  });
}
export default QuestionRoutes;