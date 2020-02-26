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


