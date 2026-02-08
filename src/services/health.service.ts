import axios from "axios";

const HOSTNAME = import.meta.env.VITE_SERVICE_HOSTNAME || "http://localhost:8080";
const REST_API_BASE_URL = `${HOSTNAME}/api/health`;

export const health = async () => {

    try {
        const response = await axios.get(`${REST_API_BASE_URL}/check`);
        console.log('response: ', response)
        return response.data;
    } catch (error) {
        throw error;
    }
};
