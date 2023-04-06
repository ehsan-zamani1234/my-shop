import axios from "axios"
const BASE_URL = 'http://kzico.runflare.run'


const getProducts = async () => {
    const response = await axios.get(`${BASE_URL}/product`)
    return response.data
}



export {getProducts}