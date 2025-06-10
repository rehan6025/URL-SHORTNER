import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

// Add a response interceptor
axiosInstance.interceptors.response.use(
  // For successful responses
  (response) => {
    return response;
  },
  // For error responses
  (error) => {
    // Handle different types of errors
    if (error.response) {
      // Server responded with a status code outside of 2xx
      console.error("Response error:", error.response.data);

      // Handle specific status codes
      switch (error.response.status) {
        case 401:
          // Handle unauthorized errors
          console.error("Unauthorized access");
          break;
        case 404:
          // Handle not found errors
          console.error("Resource not found");
          break;
        case 500:
          // Handle server errors
          console.error("Server error");
          break;
        default:
          // Handle other error statuses
          console.error(`Error with status code: ${error.response.status}`);
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error("No response received:", error.request);
    } else {
      // Error in setting up the request
      console.error("Request error:", error.message);
    }

    // Return the rejected promise to propagate the error to the caller
    return Promise.reject(error);
  }
);

export default axiosInstance;
