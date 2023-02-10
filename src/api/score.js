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
  	url:'HYJY/Paths/AddPaths',
  	method: 'post',
  	data
  })
}
export function editPaths(data) {
  return request({
  	url:'HYJY/Paths/EditPaths',
  	method: 'post',
  	data
  })
}
export function delPaths(data) {
  return request({
  	url:'HYJY/Paths/DelPaths',
  	method: 'post',
  	data
  })
}

