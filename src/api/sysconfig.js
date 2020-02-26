import request from '@/utils/request'


// 
export function addUser(url, data) {
  return request({
  	url:'Account/CreateUser',
  	method: 'post',
  	data
  })
}


//菜单管理

//获取列表接口
export function getmenulist(data) {
  return request({
  	url:'System/Moudle/GetModule',
  	method: 'post',
  	data
  })
}
//获取上级列表
export function getUpmenulist(data) {
  return request({
  	url:'System/Moudle/GetList',
  	method: 'post',
  	data
  })
}

//新增菜单
export function Addmenu(data) {
  return request({
  	url:'System/Moudle/Add',
  	method: 'post',
  	data
  })
}

//更新菜单
export function Updatemenu(data) {
	return request({
		url:'System/Moudle/Update',
		method: 'post',
		data
	})
}

//删除菜单
export function Delmenu(data) {
  return request({
  	url:'System/Moudle/Delete',
  	method: 'post',
  	data
  })
}


//权限管理

//添加角色
export function addrole(data) {
  return request({
    url: 'System/Role/Add',
    method: 'post',
    data
  })
}

//删除角色
export function Deletetrole(data) {
  return request({
    url: 'System/Role/Delete',
    method: 'post',
    data
  })
}

//获取角色列表
export function GetAuthByRole(data) {
  return request({
    url: 'System/Role/Getlist',
    method: 'post',
    data
  })
}

//保存权限
export function SavePower(data) {
  return request({
    url: 'System/Role/SaveAuth',
    method: 'post',
    data
  })
}

//用户管理
//重置密码
export function ResettingPassword(data) {
  return request({
    url: 'Account/ResettingPassword',
    method: 'post',
    data
  })
}

//导入邮箱
export function importEmail(data) {
  return request({
    url: 'Base/Email/ReadEmailFile',
    method: 'post',
    data
  })
}

//导入信用卡
export function importCard(data) {
  return request({
    url: 'Base/Creditcard/ReadCardFile',
    method: 'post',
    data
  })
}

//导入地址  还未对接
export function importAddress(data) {
  return request({
    url: 'Base/Creditcard/ReadAddressFile',
    method: 'post',
    data
  })
}
