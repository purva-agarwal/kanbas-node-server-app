import model from "./model.js";
export const createQuiz = (quiz) => {
  delete quiz._id;
  return model.create(quiz);
};
export const findQuizFromCourse = (courseId) => model.find({course: courseId})
export const findQuizById = (quizId) => model.findById( quizId );
export const deleteQuiz = (quizId) => {
  return model.deleteOne({ _id: quizId });
};

export const updateQuiz = (quizId, quiz) => {
  return model.updateOne({ _id: quizId }, { $set: quiz });
};