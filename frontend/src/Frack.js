import axios from 'axios';

const API_BASE_URL = process.env.NODE_ENV === 'production' ? 'https://api.MTGN.nu/' : '/';

function GetApiObject(url) {
    return {
        GetAll: function() {
            return axios({
                method: 'get',
                url: url,
                auth: {
                    username: sessionStorage.authToken,
                    password: ""
                }
            });
        },

        New: function(data) {
            return axios({
                method: "post",
                url: url,
                data: data,
                auth: {
                    username: sessionStorage.authToken,
                    password: ""
                }
            });
        },

        Update: function(id, data) {
            return axios({
                method: "put",
                url: url+"?id="+id,
                data: data,
                auth: {
                    username: sessionStorage.authToken,
                    password: ""
                }
            });
        },

        Delete: function(id) {
            return axios({
                method: "delete",
                url: url+"?id="+id,
                auth: {
                    username: sessionStorage.authToken,
                    password: ""
                }
            });
        },

        GetByFilter: function(filters) {
            return axios({
                method: "get",
                url: url + "?" +filters,
                auth: {
                    username: sessionStorage.authToken,
                    password: ""
                }
            });
        }
    }
}

var Frack = {
    ApiBaseURL: API_BASE_URL,

    Login: function(username, password) {
        //console.log("login API");
        return axios({
            method: "get",
            url: API_BASE_URL + "api/token",
            auth: {
                username: username,
                password: password
            }
        })/*.then((res) => {
            sessionStorage.authToken = res.data.token;
            return Frack.UpdateCurrentUser();
        });*/
    },

    Logout: function() {
        sessionStorage.authToken = "0";
    },

    HasToken: function() {
        return (sessionStorage.getItem("authToken") !== "0" && sessionStorage.getItem("authToken") !== null) 
    },

    UpdateCurrentUser: function() {
        return axios({
            method: "get",
            url: API_BASE_URL + "api/currentUser/",
            auth: {
                username: sessionStorage.authToken,
                password: ""
            }
        }).then(function(res) {
            Frack.CurrentUser = res.data;
        });
    },

    getCurrentUser: function() {
        if (Frack.CurrentUser === null) {
            return Frack.UpdateCurrentUser()
        }
        return Frack.CurrentUser
    },

    CurrentUser: null,

    TemplateCache: {},
    News: GetApiObject(API_BASE_URL + "api/news/"),
    Media: GetApiObject(API_BASE_URL + "api/media/"),
    User: GetApiObject(API_BASE_URL + "api/user/"),
    UserType: GetApiObject(API_BASE_URL + "api/user_type/"),
    N0lleGroup: GetApiObject(API_BASE_URL + "api/n0llegroup/"),
    Blandaren: GetApiObject(API_BASE_URL + "api/blandaren"),
    Event: GetApiObject(API_BASE_URL + "api/event/")
};

export default Frack;