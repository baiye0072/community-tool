//对axios进行二次封装
import axios from "axios"

//引入进度条
import nprogress from "nprogress"
import 'nprogress/nprogress.css'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
//创建axios实例
const requests = axios.create({
    //请求超时时间
    timeout: 10000000,

    //基础路径
    baseURL: '/mock/api',
    // baseURL: 'https://h552848p38.zicp.fun/'
    // baseURL: 'http://10.1.1.117:6001/'
})

//请求拦截器,请求发送之前做处理
requests.interceptors.request.use(config => {
    //进度条开始x 
    nprogress.start()

    //返回配置项
    return config
})

//响应拦截器
requests.interceptors.response.use(res => {
    //进度条结束
    nprogress.done()
    return res
}, err => {
    return Promise.reject(err)
})

export default requests;



