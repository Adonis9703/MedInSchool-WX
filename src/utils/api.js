let baseUrl = 'http://127.0.0.1:3000/'
// let baseUrl = 'http://47.101.185.46:3000/'

export const api = {
  register: baseUrl + 'register', //注册
  login: baseUrl + 'login', //登陆
  updateUser: baseUrl + 'update',   //更新个人信息
  getSocketInfo: baseUrl + 'getSocketByUserId',   //获取Socket 映射
  test: baseUrl+ 'test',
  getDoctorList: baseUrl+ 'getDoctorList'
}
