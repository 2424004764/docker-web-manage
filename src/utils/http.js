import axios from 'axios'

class Axios {

    // 请求拦截器
    requestInterceptors(config){
        // 请求之前做些什么  可以在请求之前设置请求头信息
        // 如： 
        // config.headers.AuthorizationToken = "SHGDHSGFHGH@GHRGH"
        return config
    }

    request(options){
        const config = {
            timeout: 10000, // 10秒超时
            ...options,
            // baseURL: 'http://8.129.219.65:2376/',
            baseURL: '/api',
            headers: {}, // 如果需要在请求拦截器中增加headers，则需要先声明
        }
        const instance = axios.create(config)
        // 请求拦截器
        instance.interceptors.request.use(this.requestInterceptors(config), (error) => {
            // 请求错误 将错误信息返回
            return Promise.reject(error)
        })
        // 响应拦截器
        instance.interceptors.response.use((response) => {
            // 对响应的内容进行修改  请求成功了
            // 将响应返回
            return Promise.resolve(response)
        }, (error) => {
            // 响应错误 将错误信息返回
            return Promise.reject(error)
        })

        return instance(config)
    }
}

export default new Axios()