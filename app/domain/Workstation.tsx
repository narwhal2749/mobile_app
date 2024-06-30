import { Question } from "./Question";

export type QuestionGroup = {
    id: string;
    name: string;
    questions: Question[];
}
export type Workstation = {
    id: string;
    organizationId: string;
    code: string;
    name: string;
    description?: string;
    questions?: Question[];
    groups?: QuestionGroup[];
}