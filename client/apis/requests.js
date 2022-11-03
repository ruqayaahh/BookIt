import api, { getRequestError } from "./axiosConfig.js";

export const signup = async (payload) => {
  console.log(payload, "payload in signup function");
  return await api({
    url: "/signup",
    method: "post",
    data: { ...payload },
  });
};

export const login = async (payload) => {
  console.log(payload, "payload in login function");
  return await api({
    url: "/login",
    method: "post",
    data: { ...payload },
  });
};

export const saveNewBook = async (params, payload) => {
  return await api({
    url: `/dashboard/${params}/library`,
    method: "post",
    data: { ...payload },
  });
};

export const fetchLibrary = async (params) => {
  return await api({
    url: `/dashboard/${params}/library`,
    method: "get",
  });
};

