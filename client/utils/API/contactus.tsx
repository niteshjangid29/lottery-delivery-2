import axios from "axios";
import { ToLink } from "../../app/page";
interface ContactUsPayload {
    email: string;
    subject: string;
    message: string;
  }
  
export const submitContactUs = async (payload: ContactUsPayload): Promise<any> => {
    console.log(payload);
  try {
    const response = await axios.post(`${ToLink}/contactus`, payload);
    if (response.status === 200) {
      // notify("Message submitted successfully!");
      return response.data;
    } else {
      // notify("Failed to submit the message. Please try again.");
      return null;
    }
  } catch (error) {
    console.error("Error submitting contact form:", error);
    // notify("An error occurred while submitting the message.");
    return null;
  }
};
