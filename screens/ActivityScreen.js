import React from 'react'
import { Text, View } from 'react-native'
import alpacaApi from '../services/alpaca'
import {activityStyles} from '../styles/activityStyles'
import moment from 'moment'

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
                
                <View style={activityStyles.activityScreen} key={activity.id}>
                    <View style={activityStyles.activityContainer}>
                        <Text>{activity.symbol}</Text>
                        <Text style={activityStyles.info}>{activity.side} {activity.qty} @ ${activity.price}</Text>
                        <Text>{moment(activity.transaction_time).format('MM/DD/YYYY')}</Text>    
                    </View>
                    
                </View>
            
            )}
        </View>
    }
}

export default ActivityScreen