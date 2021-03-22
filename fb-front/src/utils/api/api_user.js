import axios from '../common/request'
import { config } from '../common/config'
// 登录后-获取用户信息
export const getUserInfo = (params) => { return axios.get(config.staticHost + 'api/business/headInfo', { params }).then(res => res.data) }
