import {
  CONNECT_REQUEST,
  CONNECT_SUCCESS,
  CONNECT_FAILURE,
  GET_AUTH_REQUEST,
  GET_AUTH_SUCCESS,
  GET_AUTH_FAILURE,
  SET_ZONE,
} from "./types";
import AuthServices from "./services";

export function connect(body: any) {
  return async (dispatch: any) => {
    await dispatch({
      type: CONNECT_REQUEST,
    });
    try {
      const response = await AuthServices.connectRequest(body);
      localStorage.setItem("token", response.data.token);
      dispatch({
        type: CONNECT_SUCCESS,
        payload: {
          user: response.data.user,
          token: response.data.token,
        },
      });
    } catch (e) {
      if (e.response.status === 422) {
        dispatch({
          type: CONNECT_FAILURE,
          payload: e.response.data.errors,
        });
      } else {
        dispatch({
          type: CONNECT_FAILURE,
          payload: [],
        });
      }
    }
  };
}

export function getAuthUser() {
  return async (dispatch: any) => {
    await dispatch({
      type: GET_AUTH_REQUEST,
    });
    try {
      const response = await AuthServices.getAuthUserRequest();
      dispatch({
        type: GET_AUTH_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      dispatch({
        type: GET_AUTH_FAILURE,
      });
    }
  };
}

export function setZone(zoneName: string) {
  return async (dispatch: any) => {
    await dispatch({
      type: SET_ZONE,
      payload: zoneName,
    });
  };
}
