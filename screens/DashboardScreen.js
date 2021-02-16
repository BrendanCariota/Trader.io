import React from 'react'
import { FlatList, StyleSheet, Text, View, ScrollView } from 'react-native'
import alpacaApi from '../services/alpaca'
import polygonApi from '../services/polygon'
import { dashboardStyle } from '../styles/styles'
import { Ionicons } from '@expo/vector-icons'
import NumberFormat from 'react-number-format'
import { LineChart } from 'react-native-chart-kit'
import { Dimensions } from 'react-native'

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
            positions: [],
            accountChartXValues: [],
            accountChartYValues: [],
        }
    }

    componentDidMount() {
        console.log('fetch data from alpaca')

        // --- ALPACA API ---
        const api = alpacaApi()

        api.getAccount().then((response) => {
    
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

            if(response.ok) {
                this.setState({
                    positions: response.data
                })
            }
        })

        api.getPortfolioHistory().then((response) => {
            if(response.ok) {

                const xValues = []
                const yValues = []

                const dataLength = response.data.timestamp.length
                const timestampData = response.data.timestamp
                const equityData = response.data.equity

                for (var i = 0; i <= dataLength - 1; i++) {
                    const oldTimestamp = timestampData[i]
                    var date = new Date(oldTimestamp * 1000)
                    var hours = date.getHours();
                    var minutes = "0" + date.getMinutes()
                    var seconds = "0" + date.getSeconds()
                    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2)

                    xValues.push(formattedTime)
                    yValues.push(equityData[i])
                }

                this.setState({
                    accountChartXValues: xValues,
                    accountChartYValues: yValues,
                })
            }
        })

        const symbols = ['DIA', 'SPY', 'QQQ', 'IWM']
        symbols.map((symbol) => {
            api.getLastTrade(symbol).then((response) => {
                
                let state = this.state
                state[symbol] = response.data.last.price

                this.setState(state)
            })
        })
        
    }

    render() {

        return <ScrollView style={dashboardStyle.dashboardLayout}>

            <View style={dashboardStyle.accountSection}>
                <Text style={dashboardStyle.heading}>Account</Text>

                <View style={dashboardStyle.accountDataContainer}>
                    <View style={dashboardStyle.accountData}>
                        <Text style={dashboardStyle.label}>Buying Power</Text>
                        <NumberFormat renderText={text => <Text style={dashboardStyle.accountMoneyLabel}>{text}</Text>} value={this.state.buying_power} displayType={'text'} thousandSeparator={true} prefix={'$'}/>
                        <Text style={dashboardStyle.label}>Long Market Value</Text>
                        <Text><NumberFormat renderText={text => <Text style={dashboardStyle.accountMoneyLabel}>{text}</Text>} value={this.state.long_market_value} displayType={'text'} thousandSeparator={true} prefix={'$'}/></Text>
                    </View>
                    
                    <View style={dashboardStyle.accountData}>
                        <Text style={dashboardStyle.label}>Portfolio Value</Text>
                        <NumberFormat renderText={text => <Text style={dashboardStyle.accountMoneyLabel}>{text}</Text>} value={this.state.portfolio_value} displayType={'text'} thousandSeparator={true} prefix={'$'}/>
                        <Text style={dashboardStyle.label}>Cash</Text>
                        <NumberFormat renderText={text => <Text style={dashboardStyle.accountMoneyLabel}>{text}</Text>} value={this.state.cash} displayType={'text'} thousandSeparator={true} prefix={'$'}/>
                    </View>
                </View>

                <View>
                    <Text>Bezier Line Chart</Text>
                    <LineChart
                        data={{
                        labels: this.state.accountChartXValues,
                        datasets: [
                            {
                            data: [
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100
                            ]
                            }
                        ]
                        }}
                        width={Dimensions.get("window").width - 60} // from react-native
                        height={220}
                        yAxisLabel="$"
                        yAxisSuffix="k"
                        yAxisInterval={1} // optional, defaults to 1
                        chartConfig={{
                        backgroundColor: "#e26a00",
                        backgroundGradientFrom: "#fb8c00",
                        backgroundGradientTo: "#ffa726",
                        decimalPlaces: 2, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16
                        },
                        propsForDots: {
                            r: "6",
                            strokeWidth: "2",
                            stroke: "#ffa726"
                        }
                        }}
                        bezier
                        style={{
                        marginVertical: 8,
                        borderRadius: 16
                        }}
                    />
                </View>

            
                
            </View>

            <View style={dashboardStyle.marketSection}>
                <Text style={dashboardStyle.heading}>Market</Text>
                <View style={dashboardStyle.mainStockSection}>
                    <View style={dashboardStyle.mainStock}><Text style={dashboardStyle.indexSymbol}>DIA</Text><Ionicons name="caret-up" size={20} color='#19502f' /><NumberFormat renderText={text => <Text style={dashboardStyle.indexPrice}>{text}</Text>} value={this.state.DIA} displayType={'text'} thousandSeparator={true} prefix={'$'}/></View>
                    <View style={dashboardStyle.mainStock}><Text style={dashboardStyle.indexSymbol}>SPY</Text><Ionicons name="caret-up" size={20} color='white' /><NumberFormat renderText={text => <Text style={dashboardStyle.indexPrice}>{text}</Text>} value={this.state.SPY} displayType={'text'} thousandSeparator={true} prefix={'$'}/></View>
                    <View style={dashboardStyle.mainStock}><Text style={dashboardStyle.indexSymbol}>QQQ</Text><Ionicons name="caret-up" size={20} color='white' /><NumberFormat renderText={text => <Text style={dashboardStyle.indexPrice}>{text}</Text>} value={this.state.QQQ} displayType={'text'} thousandSeparator={true} prefix={'$'}/></View>
                    <View style={dashboardStyle.mainStock}><Text style={dashboardStyle.indexSymbol}>IWM</Text><Ionicons name="caret-up" size={20} color='white' /><NumberFormat renderText={text => <Text style={dashboardStyle.indexPrice}>{text}</Text>} value={this.state.IWM} displayType={'text'} thousandSeparator={true} prefix={'$'}/></View>    
                </View>
                
            </View>

            <View style={dashboardStyle.positionsSection}>
                <Text style={dashboardStyle.heading_portfolio}>Positions</Text>
                
                {this.state.positions.map((item) => 
                    <View key={item.asset_id} style={dashboardStyle.position}>
                    <View style={dashboardStyle.positionsLeftCell}>
                        <Text style={dashboardStyle.symbol}>{item.symbol}</Text>
                        <Text style={dashboardStyle.subheading}>{item.qty} @ <NumberFormat renderText={text => <Text>{text}</Text>} value={item.avg_entry_price} displayType={'text'} thousandSeparator={true} prefix={'$'}/></Text>
                    </View>
                    <View style={dashboardStyle.positionsRightCell}>
                    <NumberFormat renderText={text => <Text style={dashboardStyle.price}>{text}</Text>} value={item.current_price} displayType={'text'} thousandSeparator={true} prefix={'$'}/>
                        <Text style={dashboardStyle.subheading}>
                            <Ionicons name="caret-up" size={20} color='green' />
                            {(item.change_today * 100).toFixed(2)}%
                        </Text>
                    </View>
                </View>
                )}
            </View>
        </ScrollView>
    }
}

export default DashboardScreen