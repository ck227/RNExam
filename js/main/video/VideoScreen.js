import React, {Component} from 'react';

import {StackNavigator, TabNavigator} from 'react-navigation';
import TypeListScreen from './TypeListScreen.js'

const TypeListScreen1 = ({ navigation }) => (
    <TypeListScreen type='1' navigation={navigation}/>
);
const TypeListScreen2 = ({ navigation }) => (
    <TypeListScreen type='2' navigation={navigation}/>
);


const MyApp = TabNavigator({
    国家电网: {
        screen: TypeListScreen1,
    },
    南方电网: {
        screen: TypeListScreen2,
    },
}, {
    tabBarPosition: 'top',
    animationEnabled: true,
    swipeEnabled: true,
    tabBarOptions: {
        activeTintColor: '#03A7FF',
        inactiveTintColor: '#666666',

        showLabel: true,
        showIcon: false,
        style: {
            backgroundColor: 'white',
            height: 50
        },

        indicatorStyle: {
            height: 3,
            backgroundColor: '#03A7FF'
        }

    },
});

const SimpleApp = StackNavigator({
    VideoStack: {
        screen: MyApp,
    },
    // TypeVideoScreen: {
    //     screen: TypeVideoScreen
    // },
}, {
    navigationOptions: {},
    headerMode: 'none',
})

export default SimpleApp