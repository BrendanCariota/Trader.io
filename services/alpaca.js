import apisauce from 'apisauce'
import config from '../data/config'

const alpacaApi = (baseURL = config.BASE_URL) => {
    
    // apicsauce allows us to easily call our api and send the neccessary headers 
    const api = apisauce.create({
        baseURL: config.BASE_URL,
        headers: {
            'APCA-API-KEY-ID': config.ALPACA_API_KEY_ID,
            'APCA-API-SECRET-KEY': config.ALPACA_API_SECRET_KEY
        },
        timeout: 5000
    })

    const getAccount = () => api.get('v2/account')
    const getPositions = () => api.get('v2/positions')

    return {
        getAccount,
        getPositions
    }
}

export default alpacaApi