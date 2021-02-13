import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import alpacaApi from '../services/alpaca'
import { dashboardStyle } from '../styles/styles'
import { Ionicons } from '@expo/vector-icons'

class DashboardScreen extends React.Component {

    // Sets the heading of the page
    static navigationOptions = {
        title: 'Dashboard'
    }

    constructor(props) {
        super(props)

        this.state = {
            buying_power: 0,
            cash: 0,
            long_market_value: 0,
            portfolio_value: 0,
            positions: []
        }
    }

    componentDidMount() {
        console.log('fetch data from alpaca')

        const api = alpacaApi()

        api.getAccount().then((response) => {
            console.log(response)

            if (response.ok) {
                this.setState({
                    buying_power: response.data.buying_power,
                    long_market_value: response.data.long_market_value,
                    portfolio_value: response.data.portfolio_value,
                    cash: response.data.cash
                })
            }
        })

        api.getPositions().then((response) => {
            console.log(response)

            if(response.ok) {
                this.setState({
                    positions: response.data
                })
            }
        })
    }

    renderRow = ({item}) => {
        return (
            <View key={item.asset_id} style={dashboardStyle.position}>
                <View style={dashboardStyle.positionsLeftCell}>
                    <Text style={dashboardStyle.symbol}>{item.symbol}</Text>
                    <Text style={dashboardStyle.subheading}>{item.qty} @ {item.avg_entry_price}</Text>
                </View>
                <View style={dashboardStyle.positionsRightCell}>
                    <Text style={dashboardStyle.price}>{item.current_price}</Text>
                    <Text style={dashboardStyle.subheading}>
                        <Ionicons name="caret-up" size={20} color='green' />
                        {(item.change_today * 100).toFixed(2)}
                    </Text>
                </View>
            </View>
        )
    }

    render() {
        return <View style={dashboardStyle.dashboardLayout}>

            <View style={dashboardStyle.accountSection}>
                <Text style={dashboardStyle.heading}>Account</Text>

                <View style={dashboardStyle.accountDataContainer}>
                    <View style={dashboardStyle.accountData}>
                        <Text style={dashboardStyle.label}>Buying Power</Text>
                        <Text>{this.state.buying_power}</Text>
                        <Text style={dashboardStyle.label}>Long Market Value</Text>
                        <Text>{this.state.long_market_value}</Text>
                    </View>
                    
                    <View style={dashboardStyle.accountData}>
                        <Text style={dashboardStyle.label}>Portfolio Value</Text>
                        <Text>{this.state.portfolio_value}</Text>
                        <Text style={dashboardStyle.label}>Cash</Text>
                        <Text>{this.state.cash}</Text>
                    </View>
                </View>
                
                
            </View>

            <View style={dashboardStyle.marketSection}>
                <Text>Market</Text>
                <View style={dashboardStyle.mainStockSection}>
                    <View style={dashboardStyle.mainStock}><Text>DIA</Text></View>
                    <View style={dashboardStyle.mainStock}><Text>SPY</Text></View>
                    <View style={dashboardStyle.mainStock}><Text>QQQ</Text></View>
                    <View style={dashboardStyle.mainStock}><Text>IWM</Text></View>    
                </View>
                
            </View>

            <View style={dashboardStyle.positionsSection}>
                <Text>Position Section</Text>
                <FlatList
                    data={this.state.positions}
                    renderItem={this.renderRow}
                    keyExtractor={item => item.asset_id}
                />
            </View>
        </View>
    }
}

export default DashboardScreen