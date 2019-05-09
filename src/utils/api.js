// let baseUrl = 'http://127.0.0.1:3000/'
let baseUrl = 'http://47.101.185.46:3000/'

export const api = {
  base: baseUrl,
  register: baseUrl + 'register', //注册
  login: baseUrl + 'login', //登陆
  updateUser: baseUrl + 'update',   //更新个人信息
  getUserInfoById: baseUrl + 'getUserInfoById',   //根据用户id获取用户信息
  getSocketInfo: baseUrl + 'getSocketByUserId',   //获取Socket 映射
  getDoctorList: baseUrl + 'getUserByType',   //获取医生列表
  getDiseaseList: baseUrl + 'getDiseases', //获取常见疾病
  createChat: baseUrl + 'createChat', //新建问诊
  getChatList: baseUrl + 'getChatListByPatientId', //获取问诊列表
  getMsgHistory: baseUrl + 'getMsgHistory',  //问诊消息历史
  getChatInfoByChatId: baseUrl + 'getChatInfoByChatId', //获取问诊详情,
  uploadImg: baseUrl + 'uploadFile',  //上传图片,
  updateChat: baseUrl + 'updateChat'  //更新就诊信息
}
