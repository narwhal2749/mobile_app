import { AnswerTypes } from "./domain/Question";
import { Workstation } from "./domain/Workstation";

export const assembleWorkstation = (data: any): Workstation =>{
  return {
    ...data,
    questions: data.questions?.map((question: any) => {
      return {
        ...question,
        answerType: getAnswerType(question.answerType),
      }
    }),
    groups: data.groups?.map((group: Record<string, any>) => {
      return {
        id: group.id,
        name: group.name,
        questions: group.questions?.map((question: any) => {
          return {
            ...question,
            answerType: getAnswerType(question.answerType),
          }
        }),
      }
    }),
  };
} 

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
    default:
      return AnswerTypes.TEXT;
  }
}
