export const baseURL = "https://upskilling-egypt.com:3000/api/v0/";
export const imageURL = "https://upskilling-egypt.com:3000/";

export const users_endpoints = {
  LOGIN: `/Users/Login`,
  REGISTER: `/Users/Register`,
  VERIFY: `/Users/Verify`,
  RESET_REQUEST: `/Users/Reset/Request`,
  restPassword: `portal/users/reset-password`,
  GET_USER: `/Users/currentUser/`,
  getUser: (id: number) => `/Users/${id}`,
  CHANGE_PASSWORD: `/Users/ChangePassword`,
  UPDATE_USER: (id: number) => `/Users/${id}`,
  forgetPass: "portal/users/forgot-password"
};
