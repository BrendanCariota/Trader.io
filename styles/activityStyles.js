import { StyleSheet } from 'react-native'

export const activityStyles = StyleSheet.create({
    activityContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        marginBottom: 5,
        padding: 5,
        borderRadius: 5,
        backgroundColor: 'white',
        shadowColor: '#aebecd4d',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 5,
    },
    info: {
        textTransform: 'uppercase'
    }
})