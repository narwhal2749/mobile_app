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

export type Question = {
    [x: string]: any;
    id: string;
    organizationId: string;
    title: string;
    answerType: AnswerTypes;
    workstationIds?: string[];
    possibleAnswers?: PossibleAnswer[];
    required: boolean;
}