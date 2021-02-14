import React from 'react'
import { Text, View } from 'react-native'
import alpacaApi from '../services/alpaca'

class ActivityScreen extends React.Component {

    static navigationOptions = {
        title: 'Account Activity'
    }
    constructor(props) {
        super(props)

        this.state = {
            activities: []
        }
    }

    componentDidMount() {
        const api = alpacaApi()

        api.getActivities().then((response) => {
            if (response.ok) {
                this.setState({
                    activities: response.data
                })
            }
        })
    }

    render() {
        return <View>
            {this.state.activities.map((activity) => 
                
                <View key={activity.id}>
                    <Text>{activity.symbol}</Text>
                    <Text>{activity.side} {activity.qty} @ {activity.price}</Text>
                    <Text>{activity.transaction_time}</Text>
                </View>
            
            )}
        </View>
    }
}

export default ActivityScreen