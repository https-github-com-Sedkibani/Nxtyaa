/*
@
 This file contains the requests ( services )
@
*/

import axiosInstance from "../../../config/axios-instance";

function connectRequest(body: any) {
  return axiosInstance({
    method: "post",
    url: "/connect",
    data: body,
  });
}

function getAuthUserRequest() {
  return axiosInstance({
    method: "get",
    url: "/me",
  });
}

function checkAccountRequest(fbId: any) {
  return axiosInstance({
    method: "get",
    url: "/check-account/" + fbId,
  });
}

function getPhotosRequest(page: number, ordered: string, isMyPhotos: boolean) {
  return axiosInstance({
    method: "get",
    url: `/photos?page=${page}${ordered === "desc" ? "&ordred=desc" : ""}${
      isMyPhotos ? "&photos=mine" : ""
    }`,
  });
}

function getParticipationsNumberRequest() {
  return axiosInstance({
    method: "get",
    url: `/participations`,
  });
}

function submitAnswersRequest(body: any) {
  return axiosInstance({
    method: "post",
    url: `/submit`,
    data: body,
  });
}

const AuthServices = {
  connectRequest,
  getAuthUserRequest,
  getPhotosRequest,
  getParticipationsNumberRequest,
  checkAccountRequest,
  submitAnswersRequest,
};

export default AuthServices;
