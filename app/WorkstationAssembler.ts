import { AnswerTypes } from "./domain/Question";

export const assembleWorkstation = (data: any) => ({
    ...data,
    questions: data.questions?.map((question: any) => {
      return {
        ...question,
        answer_type: question.answer_type === 'TEXT' ? AnswerTypes.TEXT : question.answer_type === 'YES_NO' ? AnswerTypes.YES_NO : AnswerTypes.MULTIPLE_CHOICE
      }
    })
});
