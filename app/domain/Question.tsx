export enum AnswerTypes {
    BOOLEAN = "boolean",
    TEXT = "text",
    SELECT_MULTIPLE = "select_multiple",
    SELECT_ONE = "select_one",
} ;

export type PossibleAnswer = {
    id: string;
    answer: string;
}

export type QuestionGroup = {
    id: string;
    title: string;
}

export type Question = {
    id: string;
    organizationId: string;
    title: string;
    answerType: AnswerTypes;
    workstationIds?: string[];
    possibleAnswers?: PossibleAnswer[];
    group: QuestionGroup;
    required: boolean;
}