import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import TabBarIcon from '../components/TabBarIcon';
import DashboardScreen from '../screens/DashboardScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ActivityScreen from '../screens/ActivityScreen';
import SearchScreen from '../screens/SearchScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

// A STACK IS A TAB ON THE BUTTON

// Dashboard Tag
const DashboardStack = createStackNavigator(
  {
    Dashboard: DashboardScreen,
  },
  config
);

DashboardStack.navigationOptions = {
  tabBarLabel: 'Dashboard',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-speedometer'}`
          : 'md-speedometer'
      }
    />
  ),
};

DashboardStack.path = '';

const ActivityStack = createStackNavigator(
  {
    Activity: ActivityScreen,
  },
  config
);

// Acitvity Tab
ActivityStack.navigationOptions = {
  tabBarLabel: 'Activity',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-pulse'}`
          : 'md-pulse'
      }
    />
  ),
};

ActivityStack.path = '';

// Search Tab
const SearchStack = createStackNavigator(
  {
    Search: SearchScreen,
  },
  config
);

SearchStack.navigationOptions = {
  tabBarLabel: 'Search',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-search'}`
          : 'md-search'
      }
    />
  ),
};

SearchStack.path = '';

// Settings Tab
const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator({
  DashboardStack,
  ActivityStack,
  SearchStack,
  SettingsStack,
});

tabNavigator.path = '';

export default tabNavigator;