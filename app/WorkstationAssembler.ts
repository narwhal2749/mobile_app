import { AnswerTypes } from "./domain/Question";

export const assembleWorkstation = (data: any) => ({
    ...data,
    questions: data.questions?.map((question: any) => {
      
      return {
        ...question,
        answerType: getAnswerType(question.answerType),
      }
    })
});

const getAnswerType = (answerType: string) => {
  switch (answerType) {
    case 'TEXT':
      return AnswerTypes.TEXT;
    case 'BOOLEAN':
      return AnswerTypes.BOOLEAN;
    case 'SELECT_MULTIPLE':
      return AnswerTypes.SELECT_MULTIPLE;
    case 'SELECT_ONE':
      return AnswerTypes.SELECT_ONE;
    case 'GROUP':
      return AnswerTypes.GROUP;
    default:
      return AnswerTypes.TEXT;
  }
}
