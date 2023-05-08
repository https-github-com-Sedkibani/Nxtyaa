import {
  CONNECT_FAILURE,
  CONNECT_REQUEST,
  CONNECT_SUCCESS,
  FB_LOGIN_FAILURE,
  FB_LOGIN_REQUEST,
  FB_LOGIN_SUCCESS,
  SET_ZONE,
} from "./../actions/auth-actions/types";
import { Reducer, AnyAction } from "redux";
import {
  GET_AUTH_REQUEST,
  GET_AUTH_SUCCESS,
  GET_AUTH_FAILURE,
} from "../actions/auth-actions/types";

const INITIAL_STATE: any = {
  user: null,
  token: null,
  fbUser: null,
  zone: null,
  isLoggedIn: false,
  isLoadingUser: true,
  authErrors: [],
};

export const authReducer: Reducer<any, AnyAction> = (
  state: any = INITIAL_STATE,
  action
): boolean => {
  switch (action.type) {
    case FB_LOGIN_REQUEST:
      return state;
    case FB_LOGIN_SUCCESS:
      return {
        ...state,
        fbUser: action.payload,
      };
    case FB_LOGIN_FAILURE:
      return state;

    case CONNECT_REQUEST:
      return state;
    case CONNECT_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isLoggedIn: true,
      };
    case CONNECT_FAILURE:
      return { ...state, authErrors: action.payload };

    case GET_AUTH_REQUEST:
      return {
        ...state,
        isLoadingUser: true,
      };
    case GET_AUTH_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isLoadingUser: false,
        isLoggedIn: true,
      };

    case GET_AUTH_FAILURE:
      return {
        ...state,
        isLoadingUser: false,
        isLoggedIn: false,
      };

    case SET_ZONE:
      return {
        ...state,
        zone: action.payload,
      };

    case "SET_TOKEN":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isLoggedIn: true,
      };

    default:
      return { ...state };
  }
};
