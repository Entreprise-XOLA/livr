import axios from 'axios'
const axiosInstance = axios.create({ 
    baseURL: 'http://vps732924.ovh.net/Livraison/index.php' 
})
export default ({ Vue }) => {
    Vue.prototype.$axios = axios
}
export { axiosInstance }