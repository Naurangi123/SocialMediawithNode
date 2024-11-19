import axios from 'axios'
import { TOKEN } from './constants'

const api=axios.create({
    baseURL:"http://localhost:8000"
})

api.interceptors.request.use(
    (config)=>{
        const token=localStorage.getItem(TOKEN)
        if (token){
            config.headers.Authorization=token
        }
        return config
    },
    (error)=>{
        return Promise.reject(error)
    }
)
export default api