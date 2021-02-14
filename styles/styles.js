import { StyleSheet } from 'react-native'

export const dashboardStyle = StyleSheet.create({
    // Screen
    dashboardLayout: {
        display: 'flex',
        flexDirection: 'column'
    },

    // Account
    accountSection: {
        margin: 15,
        padding: 15,
    },
    accountDataContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    accountData: {
        flex: 1
    },

    // Market
    marketSection: {
        margin: 15,
        padding: 15,
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
        backgroundColor: 'green',
        margin: 5,
        borderRadius: 5,
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
        margin: 15,
        padding: 15,
    },
    position: {
        flex: 1,
        flexDirection: 'row',
        margin: 5,
        borderWidth: 1,
        padding: 5,
        borderRadius: 5,
    },
    positionsLeftCell: {
        flex: 1,
    },
    positionsRightCell: {
        flex: 1,
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
        fontSize: 20,
        fontWeight: 'bold',
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#686868',
        marginBottom: 10,
    },

    // Utility
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#686868'
    },
    label: {
        paddingTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
    }
})