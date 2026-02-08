import axios from "axios";

const HOSTNAME = import.meta.env.VITE_SERVICE_HOSTNAME || "http://localhost:8080";
const REST_API_BASE_URL = `${HOSTNAME}/api/auth`;
