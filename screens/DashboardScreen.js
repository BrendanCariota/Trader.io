import React, { useState } from 'react'
import { FlatList, StyleSheet, Text, View, ScrollView, Dimensions, SafeAreaView } from 'react-native'
import alpacaApi from '../services/alpaca'
import { dashboardStyle } from '../styles/styles'
import { Ionicons } from '@expo/vector-icons'
import NumberFormat from 'react-number-format'
import SwitchSelector from 'react-native-switch-selector'
import 'intl'
import 'intl/locale-data/jsonp/en'

import { VictoryLine, VictoryScatter, VictoryGroup, VictoryChart, VictoryAxis, VictoryTooltip, VictoryVoronoiContainer } from 'victory-native';

const options = [
    {label: '1D', value: '1D'},
    {label: '1W', value: '1W'},
    {label: '1M', value: '1M'},
    {label: '1Y', value: '1Y'},
]

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  })

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
            minYValue: 0,
            maxYValue: 0,
            chartData: [{x: 'why', y: 'this'}],
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
                const xValuesFormatted = []
                const yValuesFormatted = []

                const dataLength = response.data.timestamp.length
                const timestampData = response.data.timestamp
                const equityData = response.data.equity

                // This loops through and formats the timestamp into a readable time
                for (var i = 0; i <= dataLength - 1; i++) {
                    const oldTimestamp = timestampData[i]
                    var date = new Date(oldTimestamp * 1000)
                    var hours = date.getHours();
                    var minutes = "0" + date.getMinutes()
                    var seconds = "0" + date.getSeconds()
                    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2)

                    // Creates an array of Formatted Times for the LABELS of the x axis of the graph
                    xValuesFormatted.push(formattedTime)
                    yValuesFormatted.push(equityData[i])

                    // Creates an array of unformatted timestamps for PLOTTING values of the x axis of the graph
                    xValues.push(timestampData[i])
                    yValues.push(equityData[i])
                }

                var filteredYValues = yValues.filter(x => x)
                const minYValue = Math.min.apply(Math, filteredYValues)
                const maxYValue = Math.max.apply(Math, yValues)

                this.setState({
                    accountChartXValues: xValues,
                    accountChartYValues: yValues,
                    maxYValue: maxYValue,
                    minYValue: minYValue,
                })

                var loopLength = xValues.length
                var chartDataArray = []
                for (var k = 0; k <= loopLength - 1; k++) {
                    var xValue = xValues[k]
                    var yValue = yValues[k]
                    chartDataArray.push({x: xValue, y: yValue})
                
                }

                this.setState({
                    chartData: chartDataArray
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
            </View>
            
            <View style={dashboardStyle.chartContainer}>
                <VictoryChart 
                    minDomain={{ y: this.state.minYValue - 100 }} 
                    maxDomain={{ y: this.state.maxYValue + 100 }}
                    containerComponent={<VictoryVoronoiContainer voronoiDimension='x'/>}
                    height={250}
                    width={Dimensions.get('window').width}
                    padding={{ top: 0, bottom: 0}}
                >
                    <VictoryAxis 
                        style={{
                            tickLabels: {fill: 'transparent'},
                            axis: {strokeWidth: 2, strokeOpacity: 0.25}
                        }} 
                        tickCount={3}
                        offsetY={125}
                    />
                    <VictoryAxis 
                        dependentAxis
                        crossAxis
                        style={{}} 
                        tickCount={3}
                    />
                    <VictoryGroup
                        color='#d6ab00'
                        labels={({ datum }) => `${formatter.format(datum.y)}`}
                        labelComponent={
                            <VictoryTooltip 
                                style={{ fontSize: 18}} 
                                renderInPortal={false} 
                                center={{ x: 200, y: 25}} 
                                pointerLength={0}
                            />
                        }
                        data={this.state.chartData}
                    >
                        <VictoryLine
                            interpolation='monotoneX'
                            style={{
                                data: { strokeWidth: 4}
                            }}
                        />
                        <VictoryScatter 
                            size={({ active }) => active ? 8 : 1}
                        />
                    </VictoryGroup>
                </VictoryChart>

                <SwitchSelector
                    options={options}
                    initial={0}
                    onPress={value => console.log(`Call onPress with value: ${value}`)}
                    buttonColor='#d6ab00'
                    backgroundColor='#fbf9f9'
                    buttonMargin={20}
                    fontSize={16}
                    borderRadius={4}
                    bold={true}
                    textColor='#363636'
                />
            </View>

            {/* <View style={dashboardStyle.marketSection}>
                <Text style={dashboardStyle.heading}>Market</Text>
                <View style={dashboardStyle.mainStockSection}>
                    <View style={dashboardStyle.mainStock}><Text style={dashboardStyle.indexSymbol}>DIA</Text><Ionicons name="caret-up" size={20} color='#19502f' /><NumberFormat renderText={text => <Text style={dashboardStyle.indexPrice}>{text}</Text>} value={this.state.DIA} displayType={'text'} thousandSeparator={true} prefix={'$'}/></View>
                    <View style={dashboardStyle.mainStock}><Text style={dashboardStyle.indexSymbol}>SPY</Text><Ionicons name="caret-up" size={20} color='white' /><NumberFormat renderText={text => <Text style={dashboardStyle.indexPrice}>{text}</Text>} value={this.state.SPY} displayType={'text'} thousandSeparator={true} prefix={'$'}/></View>
                    <View style={dashboardStyle.mainStock}><Text style={dashboardStyle.indexSymbol}>QQQ</Text><Ionicons name="caret-up" size={20} color='white' /><NumberFormat renderText={text => <Text style={dashboardStyle.indexPrice}>{text}</Text>} value={this.state.QQQ} displayType={'text'} thousandSeparator={true} prefix={'$'}/></View>
                    <View style={dashboardStyle.mainStock}><Text style={dashboardStyle.indexSymbol}>IWM</Text><Ionicons name="caret-up" size={20} color='white' /><NumberFormat renderText={text => <Text style={dashboardStyle.indexPrice}>{text}</Text>} value={this.state.IWM} displayType={'text'} thousandSeparator={true} prefix={'$'}/></View>    
                </View>
            </View> */}

            <View style={dashboardStyle.positionsSection}>
                <Text style={dashboardStyle.heading_portfolio}>Positions</Text>
                
                {this.state.positions.map((item) => 
                    <View key={item.asset_id} style={dashboardStyle.position}>
                    <View style={dashboardStyle.positionsLeftCell}>
                        <Text style={dashboardStyle.symbol}>{item.symbol}</Text>
                        <Text style={dashboardStyle.subheading}>{item.qty} @ <NumberFormat renderText={text => <Text>{text}</Text>} value={item.avg_entry_price} displayType={'text'} thousandSeparator={true} prefix={'$'}/></Text>
                    </View>
                    <View style={dashboardStyle.positionsRightCell}>
                    <NumberFormat renderText={text => <Text style={[dashboardStyle.price, {color: item.current_price > item.avg_entry_price ? '#429449' : '#d91c2d'}]}>{text}</Text>} value={item.current_price} displayType={'text'} thousandSeparator={true} prefix={'$'}/>
                        <Text style={dashboardStyle.subheading}>
                            {
                                item.current_price > item.avg_entry_price ? <Ionicons name="caret-up" size={20} color='#429449' /> : <Ionicons name="caret-down" size={20} color='#d91c2d' />
                            }
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