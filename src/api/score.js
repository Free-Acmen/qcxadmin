import request from '@/utils/request'

export function setStatus(data) {
  return request({
  	url:'HYJY/Users/SetStatus',
  	method: 'post',
  	data
  })
}

export function setAllStatus(data) {
  return request({
  	url:'HYJY/Users/SetAllStatus',
  	method: 'post',
  	data
  })
}



export function getNextPaths(data) {
  return request({
  	url:'HYJY/Paths/GetNextPaths',
  	method: 'post',
  	data
  })
}

export function exportTab(data) {
  return request({
  	url:'HYJY/Users/ExportTab',
  	method: 'post',
  	data
  })
}

export function getStatusLog(data) {
  return request({
  	url:'HYJY/StatusLog/GetList',
  	method: 'post',
  	data
  })
}


export function addPaths(data) {
  return request({
  	url:'HYJY/Paths/Add',
  	method: 'post',
  	data
  })
}
export function editPaths(data) {
  return request({
  	url:'HYJY/Paths/Update',
  	method: 'post',
  	data
  })
}
export function delPaths(data) {
  return request({
  	url:'HYJY/Paths/Delete',
  	method: 'post',
  	data
  })
}

export function setHomeConfig(data) {
  return request({
  	url:'HYJY/Home/SetHomeConfig',
  	method: 'post',
  	data
  })
}

export function getHomeConfig(data) {
  return request({
  	url:'HYJY/Home/GetHomeConfig',
  	method: 'post',
  	data
  })
}




