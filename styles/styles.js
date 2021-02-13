import { StyleSheet } from 'react-native'

export const dashboardStyle = StyleSheet.create({
    // Screen
    dashboardLayout: {
        flex: 1,
        flexDirection: 'column'
    },

    // Account
    accountSection: {
        flex: 3,
        margin: 15,
    },
    accountDataContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    accountData: {
        flex: 1
    },

    // Market
    marketSection: {
        flex: 2,
        borderWidth: 1, 
        borderColor: 'red'
    },
    mainStockSection: {
        flex: 1, 
        flexDirection: 'row'
    },
    mainStock: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'orange'
    },

    // Positions
    positionsSection: {
        flex: 5,
        borderWidth: 1,
        borderColor: 'green'
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