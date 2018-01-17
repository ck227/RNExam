import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    Colors,
} from 'react-native';

import {TabNavigator} from 'react-navigation';

import HomeScreen from './home/HomeScreen'
import PractiseScreen from './practise/PractiseScreen'
import VideoScreen from './video/VideoScreen'
import BBSScreen from './bbs/BBSScreen'
import MyScreen from './my/MyScreen'

const MyApp = TabNavigator({
    Home: {
        screen: HomeScreen,
    },
    Practise: {
        screen: PractiseScreen,
    },
    Video: {
        screen: VideoScreen,
    },
    BBS: {
        screen: BBSScreen,
    },
    my: {
        screen: MyScreen,
    },
}, {
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
    tabBarOptions: {
        activeTintColor: '#03A7FF',
        inactiveTintColor: '#666666',

        showLabel: true,
        showIcon: true,
        style: {
            backgroundColor: 'white',
            height: 60
        },

        indicatorStyle: {
            height: 0
        }

    },
});

export default MyApp
