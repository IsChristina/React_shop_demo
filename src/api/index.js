import ajax from './ajax'

const BASE = 'http://120.55.193.14:5000'
// 登陆
/*
export function reqLogin(username, password) {
  return ajax('/login', {username, password}, 'POST')
}*/
export const reqLogin = (username, password) => ajax(BASE + '/login', {username, password}, 'POST')

// 添加分类
//export const reqAddCategory = (categoryName, parentId) => ajax(BASE + '/manage/category/add', {categoryName, parentId}, 'POST')