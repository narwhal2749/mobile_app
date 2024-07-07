import { useAxios } from "@/app/HttpProvider";
import { SubmittedForm } from "../SubmittedForm";
import { API_URL } from "@env";

export const useSubmitForm = () => {
    const queryClient = useAxios();
    
    const submitForm = async (form: SubmittedForm) => {
        try {
            console.log("submitting", form);
            queryClient.post(`${API_URL}/form`, form);
        } catch (error) {
            console.error('Error fetching workstation:', error);
        }
    };

    return {submitForm}
};