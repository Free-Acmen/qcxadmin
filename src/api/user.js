import request from '@/utils/request'

export function login(data) {
  return request({
    // url: '/user/login',
    url: 'Account/Login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    // url: '/user/info',
    url: 'Account/GetUserInfo',
    method: 'post',
    data: token
  })
}

export function logout() {
  return request({
    // url: '/user/logout',
    url: 'Account/Logout',
    method: 'post'
  })
}

export function GetAllUser(token) {
	return request({
    url: 'System/User/GetOnUserInfo',
    method: 'post',
    data: token
  })
}

export function GetCode(data) {
	return request({
    url: 'System/User/GetOnUserInfo',
    method: 'post',
    data: data
  })
}

export function LoginSubmit(data) {
	return request({
    url: 'System/User/GetOnUserInfo',
    method: 'post',
    data: data
  })
}

