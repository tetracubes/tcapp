import axios from "axios";
import * as AlertService from "./alert-service";
import AuthService from '../services/AuthService';
// import { async } from "q";

export async function post(url, param, options) {
  return await axios.post(url, param, options);
}

export function get(url, param, options) {
  return axios.get(url, param, options);
}

export function put(url, param, options) {
  return axios.put(url, param, options);
}

export function getAll(urlList) {
  return axios.all(urlList);
}

export async function all(data) {
  let promise = [];
  let modifyData = [];
  for (var i in data) {
    if (data[i].method === "get") {
      promise.push(get(data[i].url, data[i].params, ""));
    } else if (data[i].method === "put") {
    } else if (data[i].method === "post") {
    }
  }

  let resolvedArgs = await axios.all(promise);
  // axios.spread((...resolvedArgs) => {
  for (var j in resolvedArgs) {
    var alterObj = {};
    Object.keys(data[j]).map(key => {
      if (key !== "url" && key !== "method" && key !== "params") {
        alterObj[key] = data[j][key];
      }
    });
    alterObj["payload"] = resolvedArgs[j].data;
    modifyData.push(alterObj);
  }
  // });
  return modifyData;
}

// https://medium.com/@rakshitshah/setup-ssl-on-apache-tomcat-in-just-9-minutes-18ae0f82ca61

export function registerInterseptor() {
  // *** generic ***
  // axios.defaults.baseURL = "../app/";
  // *** localhost:8080 ***
  axios.defaults.baseURL = "https://srushti.net.in:48888";
  // http://176.9.7.17:48889/tcapiservice/
  // axios.defaults.baseURL = "http://localhost:8090";

  // https://dev.to/crishanks/deploy-host-your-react-app-with-cpanel-in-under-5-minutes-4mf6

  // request interceptor
  // const token = AuthService.getAuthHeader().token;
  // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  axios.interceptors.request.use(
    function (request) {
      // request.headers["X-Requested-With"] = "XMLHttpRequest";
      request.headers['Content-Type'] = 'application/json'
      request.headers["Access-Control-Allow-Origin"] = "*";
      // const token = AuthService.getAuthHeader().token;
      // if (token) {
      //     request.headers['Authorization'] = 'Bearer ' + token;
      // }
      return request;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  // response interceptor
  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response === undefined) {
        // AlertService.Error("Please login again with correct url.");
        // console.log(error);
        if (!window.location.href.includes("login")) {
          window.location.href =
            window.location.origin +
            // "/" + window.location.href.split("/")[3] +
            "/login";
            AlertService.Error("Please login again with correct url.");
        }
      } else if (error.response.status === 401) {
        
        if (!window.location.href.includes("login")) {
          window.location.href =
            window.location.origin +
            // "/" + window.location.href.split("/")[3] +
            "/login";
          AuthService.logOut();
          AlertService.Error("Please login again, your session has expired.");
        }
        // alert(error);
      } else if (error.response.status === 404) {
        if (!window.location.href.includes("login")) {
          
          window.location.href =
            window.location.origin +
            "/dashboard";

            AlertService.Error("Page/Api call didnot match");
        }
        // "/" + window.location.href.split("/")[3]
        // + "/" + window.location.href.split("/")[4];
      }
      // else if (
      //   error.response.status.toString().indexOf("40") == 0 ||
      //   error.response.status.toString().indexOf("50") == 0
      // ) {
      //   AlertService.Error("Unknown Exception");
      // }
      return Promise.reject(error);
    }
  );
}
