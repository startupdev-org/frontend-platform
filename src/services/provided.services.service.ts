import axios from "axios";

const HOSTNAME = import.meta.env.VITE_BACKEND_HOSTNAME || "http://localhost:8080";

const AUTH_TOKEN = import.meta.env.VITE_MOCK_AUTH_TOKEN;

const mockBusinessId = "d4287dcf-9fdb-4025-806f-5eece5571571";

const REST_API_BASE_URL = `${HOSTNAME}/api/business/${mockBusinessId}/service`;

/**
 * 
 * @returns 
 */
export const getAllProvidedServices = async () => {
  try {
    console.log("trying to get the provided services")
    console.log('the url is: ', REST_API_BASE_URL)


    const response = await axios.get(REST_API_BASE_URL, {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`
      }
    });

    console.log('The response is: ', response)
    return response;
  } catch (error) {
    console.error("Error ocurred:", error);
    throw error;
  }
};

