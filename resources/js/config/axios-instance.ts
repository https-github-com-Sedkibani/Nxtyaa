import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.MIX_API_URL,
  // onUploadProgress: function (progressEvent) {
  //   var percentCompleted = Math.round(
  //     (progressEvent.loaded * 100) / progressEvent.total
  //   );
  //   console.log(percentCompleted);
  // },
  // onUploadProgress: (progressEvent) => alert("ok"),
});
axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response;
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosInstance;
