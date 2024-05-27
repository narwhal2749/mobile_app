export enum AnswerTypes {
    YES_NO = "yesNo",
    TEXT = "text",
    MULTIPLE_CHOICE = "multipleChoice"
} ;

export type PossibleAnswer = {
    id: string;
    answer: string;
}

export type Question = {
    id: string;
    organizationId: string;
    title: string;
    answer_type: AnswerTypes;
    workstationIds?: string[];
    possible_answers?: PossibleAnswer[];
}