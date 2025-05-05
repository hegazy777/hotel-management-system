export const baseURL = "https://upskilling-egypt.com:3000/api/v0";
export const imageURL = "https://upskilling-egypt.com:3000/";

export const auth_endpoints = {
  LOGIN: `/portal/users/login`,
  REGISTER: `/portal/users`,
  FORGET_PASSWORD: `/portal/users/forget-password`,
  RESET_PASSWORD: `/portal/users/reset-password`,
  CHANGE_PASSWORD: `/portal/users/change-password`,
  GET_USER: (id: string) => `/portal/users/${id}`,
};

export const userRooms_endpoints = {
  GET_ROOM_DETAILS: (id: string) => `/portal/rooms/${id}`,
};
export const userBooking = {
  CREATE_BOOKING: `/portal/booking`,
};

export const facilities_endpoints = {
  GET_ALL_FACILITIES: `/admin/room-facilities`,
  UPDATE_FACILITY: (id: string) => `/admin/room-facilities/${id}`,
  DELETE_FACILITY: (id: string) => `/admin/room-facilities/${id}`,
  ADD_FACILITY: `/admin/room-facilities`,
};

export const comments_endpoints = {
  GET_ALL_COMMENTS: `/portal/room-comments`,
  CREATE_COMMENT: `/portal/room-comments`,
};

export const reviews_endpoints = {
  CREATE_REVIEW: `/portal/room-reviews`,
};
