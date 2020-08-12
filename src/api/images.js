import axios from '../utils/http'
const base_url = 'images/'

export const fetchImages = options => axios.request({
  method: 'get',
  url: base_url + 'json'
})

export default {}