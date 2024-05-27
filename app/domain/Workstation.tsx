import { Question } from "./Question";

export type Workstation = {
    id: string;
    organizationId: string;
    code: string;
    name: string;
    description?: string;
    questions?: Question[];
}