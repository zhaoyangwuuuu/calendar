import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const getEvents = async (): Promise<Event[]> => {
  const response = await api.get("/events");
  return response.data;
};

export const createEvent = async (eventData: any) => {
  await api.post("/events", eventData);
};

export interface Event {
  id: string;
  title: string;
  date: string; // Format: 'YYYY-MM-DD'
  time: string; // Format: 'HH:mm'
  description?: string;
}

export default api;
