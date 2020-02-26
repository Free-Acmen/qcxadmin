import request from '@/utils/request'
//公共列表(增删改查))接口

export function getList(url, data, flag) {
  if(flag){
    url = url + '/GetPage'
  }else{
    url = url + '/GetPageTab'
  }
  return request({
    url: url,
    method: 'post',
    data
  })
}

export function add(url, data) {
  return request({
    url: url + '/Add',
    method: 'post',
    data
  })
}

export function update(url, data) {
  return request({
    url: url + '/Update',
    method: 'post',
    data
  })
}

export function del(url, data) {
  return request({
    url: url + '/Delete',
    method: 'post',
    data: data
  })
}

export function getsitename() {
  return request({
    url: 'FS/Location/GetLocations',
    method: 'post'
  })
}

