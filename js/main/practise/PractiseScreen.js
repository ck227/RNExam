import React, {Component} from 'react';
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
        headerTitle: '练习',
        tabBarLabel: '练习',

        headerLeft: null,//去左边返回键
        headerStyle: {
            backgroundColor: '#03A7FF',
        },
        headerTitleStyle: {
            color: 'white'
        },

        tabBarIcon: ({tintColor}) => (
            <Image
                source={require('./img/practise.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        ),
    };

    render() {
        return (
            <MyApp/>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    icon: {
        height: 20,
        width: 20,
    },
});

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