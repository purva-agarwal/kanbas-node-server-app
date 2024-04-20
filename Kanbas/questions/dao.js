import model from "./model.js";
import {findQuizById, updateQuiz} from "../quizzes/dao.js";
export const findQuestionFromQuiz = (quizId) => model.find({quizId})
export const findQuestionById = (questionId) => model.findById( questionId );
export const createQuestion = (question) => {
  delete question._id;
  return model.create(question);
};

export const deleteQuestion = (questionId) => {
  return model.deleteOne({ _id: questionId });
};

export const updateQuestion = (questionId, question) => {
  return model.updateOne({ _id: questionId }, { $set: question });
};