/**
 * 表格数据相关 API 请求
 * 封装表格列表等接口
 */
import request from '@/utils/request'

/**
 * 获取表格列表数据
 * @param {Object} params - 查询参数
 * @returns {Promise}
 */
export function getList(params) {
  return request({
    url: '/vue-admin-template/table/list',
    method: 'get',
    params
  })
}
