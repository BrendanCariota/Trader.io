import React, {useState} from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { buttonStyles } from '../styles/buttonStyles'

const CustomButton = ({ onPress, title }) => {

    const [isPress, setIsPress] = useState(false)
    
    const touchProps = {
        activeOpacity: 1,                         // <-- "backgroundColor" will be always overwritten by "underlayColor"
        style: isPress ? buttonStyles.btnPress : buttonStyles.btnNormal, // <-- but you can still apply other style changes
        onPress: () => setIsPress(true),
        TouchableOpacity: 0.8,
    }

    return (
        <TouchableOpacity 
            {...touchProps}
        >
            <Text style={buttonStyles.btnText}>{title}</Text>
        </TouchableOpacity>
    )
}

export default CustomButton
