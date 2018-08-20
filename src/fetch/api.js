import Cookies from 'js-cookie';
import axios from 'axios';
import Vue from 'vue';
// import { router } from '../router/index.js';
import qs from 'qs';
// import store from '@/store/index.js';
import {Message} from 'element-ui';
let AUTH_TOKEN = (function () {
    return Cookies.get('token');
})();

var instance = axios.create({
    timeout: 50000,
    headers: {
        'Content-Type': 'application/json'
    }
});
// instance.defaults.withCredentials = true;
instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
instance.interceptors.request.use(function (config) {
    config.headers.Authorization = Cookies.get('token');
    if (config.method === 'post' || config.method === 'patch') {
        config.data = qs.stringify(config.data);
    }
    return config;
}, function (err) {
    return Promise.reject(err);
});
instance.interceptors.response.use(function (res) {
    if (res.headers.token) {
        Cookies.set('token', res.headers.common['Authorization']);
    }
    return res;
}, function (err) {
    return err;
});
Vue.prototype.$axios = instance;

export function ajaxApi (method, url, params,callback) {
    return new Promise(function (resolve, reject) {
        var ajaxParams = {};
        if (method === 'post') {
            ajaxParams = {
                method: method,
                url: url,
                data: params
            };
            if (url.indexOf('excelUppload') != -1) {
                ajaxParams.headers = {'Content-type': 'multipart/form-data'};
            } else {
                ajaxParams.headers = {'Content-type': 'application/x-www-form-urlencoded'};
            }
        } else {
            ajaxParams = {
                method: method,
                url: url,
                params: params
            };
        }
        instance(ajaxParams).then(res => {
            var result = JSON.parse(JSON.stringify(res.data));
            if (result.code == 200) {
                resolve(result.data);
            } else if (result.code == 20014 || result.code == 20015 || result.code == 10013) {
            	Message({
            		type:'error',
            		message:'登录已过期,5秒后进入到登录页面',
            		duration:5000
            	})
//              $('<p class="goLogin">登录已过期,5秒后进入到登录页面</p>').appendTo('body');
                setTimeout(function () {
                    window.location.href = window.location.protocol + '//' + window.location.host + '/#login';
                    window.location.reload();
                }, 4000);
                reject(callback)
                Cookies.set('user', '');
                // store.commit('setMymenu', '');
            } else {
                Message({
                    type:'error',
                    message:result.message,
                    duration:'2000'
                })
                if(callback && typeof callback==='function'){
            		reject(callback())
            	}
            }
        }).catch((error) => {
            reject(error);
        });
    });
}

export function ajaxJson (method, url, data) {
    return new Promise(function (resolve, reject) {
        axios({
            method: method,
            url: url,
            data: data
        }).then(res => {
            if (res.data.code == 200) {
                resolve(res.data.data);
            } else {
                Vue.prototype.$Message(res.data.message);
            }
        }).catch((error) => {
            reject(error);
        });
    });
}

const configUrl = '/api/v1';
const loginUrl = '/api/v2';
export default {
    api (method, url, params,callback) {
        return ajaxApi(method, url, params,callback);
    },
    json (method, url, params) {
        return ajaxJson(method, url, params);
    },
    configUrl,
    loginUrl,
    instance
};
