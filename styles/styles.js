import { StyleSheet } from 'react-native'

export const dashboardStyle = StyleSheet.create({
    
    // Screen
    dashboardLayout: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fbf9f9',
    },

    // Account
    accountSection: {
        margin: 10,
        padding: 10,
    },
    accountDataContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    accountData: {
        flex: 1
    },
    accountMoneyLabel: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#363636',

    },

    // Chart
    chartContainer: {
        
        padding: 0,
    },
    chartBtns: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginLeft: 50,
        marginRight: 50,
    },


    // Market
    marketSection: {
        margin: 10,
        padding: 10,
    },
    mainStockSection: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 15,
        justifyContent: 'center',
    },
    mainStock: {
        height: 100,
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#429349',
        margin: 5,
        borderRadius: 5,
        elevation: 5,
    },
    indexSymbol: {
        fontSize: 32,
        color: 'white',
    },
    indexPrice: {
        fontSize: 18,
    },

    // Positions
    positionsSection: {
        margin: 10,
        padding: 10,
    },
    position: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 5,
        padding: 5,
        borderRadius: 5,
        backgroundColor: 'white',
        shadowColor: '#aebecd4d',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 5,
    },
    positionsLeftCell: {
        marginLeft: 5,
    },
    positionsRightCell: {
        
    },
    symbol: {
       fontSize: 16, 
       fontWeight: 'bold',
       color: 'black',
    },
    subheading: {
        color: '#808080',
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'green'
    },
    heading_portfolio: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#686868',
        marginBottom: 10,
    },

    // Utility
    heading: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#686868'
    },
    label: {
        paddingTop: 10,
        fontSize: 14,
        color: '#363636'
    }
})