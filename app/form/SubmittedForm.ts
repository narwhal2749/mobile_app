export type SubmittedForm = {
    id: string;
    date: string;
    user: {
        name: string;
    },
    questions: Record<string, any>[];
    groups: Record<string, any>[];
    workstationId: string;
}