import request from '@/utils/request'

//categorystate 页面类目获取
export function getList(url, data, flag) {
  return request({
    url: url + '/GetCategoryList',
    method: 'post',
    data
  })
}

export function getProps(data) {
  return request({
    url: 'AMZDS/SpiderAsinExt/GetProps',
    method: 'post',
    data
  })
}

export function getModel(url, data, flag) {
  return request({
    url: url + '/GetModel',
    method: 'post',
    data
  })
}

export function getDiagram(data) {
  return request({
    url: 'AMZDS/SpiderAsin/GetDiagram',
    method: 'post',
    data
  })
}

export function getCategoryList(data) {
  return request({
    url: 'AMZDS/Category/GetCategoryList',
    method: 'post',
    data
  })
}

export function search(data) {
  return request({
    url: 'AMZDS/Category/Search',
    method: 'post',
    data
  })
}

