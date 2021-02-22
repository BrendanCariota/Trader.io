import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { buttonStyles } from '../styles/buttonStyles'

const CustomButton = ({ onPress, title, active}) => {
    return (
        <TouchableOpacity 
            onPress={onPress} 
            style={buttonStyles.container}
            TouchableOpacity={0.8}
            
        >
            <Text style={buttonStyles.btnText}>{title}</Text>
        </TouchableOpacity>
    )
}

export default CustomButton
