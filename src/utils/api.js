export default {
  getSwiper: '/swiper', // 获取轮播图
  getAllCommodity: '/commodity', // 
  getCommodityByCategory: '/category/commodities', // 获取该分类下所有的商品
  getCommodity: '/commodity/', // 获取单个图书
  login: '/user/login', // 登录接口
  sendCode: '/smsCode', // 发送短信验证码
  register: '/user/register', // 注册
  getUserData: '/user', // 获取用户数据
  addCollection: '/collect', // 添加收藏
  addCart: '/cart', // 添加购物车
  addLike: '/like', // 点赞
  deleteCollection: '/collect/', // 删除收藏的商品
  deleteCart: '/cart/', // 删除购物车商品
  deleteTrace: '/trace/', // 删除购物车商品
  getCollection: '/collect', // 获得收藏的商品
  getCart: '/cart', // 获得购物车的商品
  getTrace: '/trace', // 获取浏览足迹
  changeUser: '/user', // 修改用户 信息
  changePassword: '/user/changePassword', // 修改密码
  getUploadToken: '/uploadToken', // 获得上传token
  upOrder: '/order', //提交订单
  getAllOrder: '/order', //得到所有订单
  getOrder1: '/order/status1', //得到待付款订单
  getOrder2: '/order/status2', //得到待发货订单
  getOrder3: '/order/status3', // 得到待收货订单
  getOrder4: '/order/status4', // 得到待评价订单
  deleteOrderById: '/order/',
  changeOrderStatus: '/order/',
  addCommentToCommodity: '/comment',
  getSearch: '/search'
}
