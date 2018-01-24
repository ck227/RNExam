
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';

import {TabNavigator} from 'react-navigation';
import TypeListScreen from './TypeListScreen.js'

export default class App extends Component<{}> {

    static navigationOptions = {

    };

    render() {
        return (
            <MyApp/>
        );
    }
}

const TypeListScreen1 = () => (
    <TypeListScreen type='1'/>
);
const TypeListScreen2 = () => (
    <TypeListScreen type='2'/>
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
            backgroundColor : '#03A7FF'
        }

    },
});