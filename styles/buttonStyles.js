import { StyleSheet } from 'react-native'

export const buttonStyles = StyleSheet.create({
    btnNormal: {
        borderColor: 'blue',
        borderWidth: 1,
        borderRadius: 10,
        height: 30,
        width: 30,
      },
      btnPress: {
        borderColor: 'blue',
        borderWidth: 1,
        height: 30,
        width: 30,
    },
    btnText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase",
        color: '#363636',
    },
})