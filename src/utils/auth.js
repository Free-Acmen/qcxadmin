import Cookies from 'js-cookie'


export function getCookie(key) {
  return Cookies.get(key)
}

export function setCookie(key, val) {
  return Cookies.set(key, val)
}

export function removeCookie(key) {
  return Cookies.remove(key)
}


export function setStorage(key, val) {
  var data = JSON.stringify({
    data: val
  });
  return window.localStorage.setItem(key, data);
}

export function getStorage(key) {
  var data = window.localStorage.getItem(key);
  return JSON.parse(data).data
}

export function clearStorage(key) {
  return window.localStorage.removeItem(key)
}


    