import apisauce from 'apisauce'
import config from '../data/config'

const polygonApi = (baseURL = config.POLYGON_URL) => {

    const api = apisauce.create({
        baseURL: config.POLYGON_URL,
        timeout: 5000,
    })

    // Creates a parameter we can pass into the URL to get Polygon stock data with an Alpaca API key
    const params = {
        apiKey: config.POLYGON_API_KEY
    }
    
    const getQuote = (symbol) => api.get(`v2/snapshot/locale/us/markets/stocks/tickers/${symbol}?apiKey=${config.POLYGON_API_KEY}`)

    return {
        getQuote
    }
}

export default polygonApi