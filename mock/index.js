/* 
  模拟了这样一个业务场景：
  一个网格布局的页面，每个网格是不同类型的图表、列表、最新的新闻动态，
  并且网格的顺序不是固定的，只有用户购买了的才会显式。
  /api/getProductIds 模拟的是获取用户的权限
  /api/getDataById 模拟的是请求对应网格的数据
*/
export default [
  // 获取图表数据的id
  {
    url: "/api/getProductIds",
    method: "get",
    response() {
      return {
        msg: "ok",
        code: 200,
        "data|24": [{
          "id|+1": 1011,
        }],
      }
    }
  },
  // 获取图表数据
  {
    url: "/api/getDataById",
    method: "get",
    response() {
      const _getRandom = () => Math.floor(Math.random() * 60)
      return {
        msg: "ok",
        code: 200,
        "data": {
          "xAxis|5": ['@date("yyyy-MM-dd")'],
          "yAxis|5": () => Array(5).fill(0).map(() => _getRandom()),
        },
      }
    },
    timeout: 2000,
  },
]