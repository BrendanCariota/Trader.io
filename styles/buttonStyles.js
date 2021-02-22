import { StyleSheet } from 'react-native'

export const buttonStyles = StyleSheet.create({
    container: {
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        
    },
    btnText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase",
        color: '#363636',
    },
    btnActive: {
        backgroundColor: "#d6ab00",
    },
})