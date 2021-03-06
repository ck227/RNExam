import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    Colors,
} from 'react-native';

import {StackNavigator, TabNavigator} from 'react-navigation';

import HomeScreen from './home/HomeScreen'
import PractiseScreen from './practise/PractiseScreen'
import VideoScreen from './video/VideoScreen'
import BBSScreen from './bbs/BBSScreen'
import MyScreen from './my/MyScreen'

//首页的
import HomeDetailScreen from './home/HomeDetailScreen'

//练习的
import PractiseListScreen from './practise/PractiseListScreen'
import DoPractiseScreen from './practise/DoPractiseScreen'

//视频的
import TypeVideoScreen from './video/TypeVideoScreen'
import VideoTypeScreen from './video/VideoTypeScreen'
import VideoListScreen from './video/VideoListScreen'
import VideoPlayScreen from './video/VideoPlayScreen'

const TabNavigator1 = TabNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            headerTitle: '首页',
            tabBarLabel: '首页',
            headerLeft: null,//去左边返回键
            headerStyle: {
                backgroundColor: '#03A7FF',
            },
            headerTitleStyle: {
                color: 'white'
            },
            tabBarIcon: ({tintColor}) => (
                <Image
                    source={require('./img/home.png')}
                    style={[styles.icon, {tintColor: tintColor}]}
                />
            ),
        },

    },
    Practise: {
        screen: PractiseScreen,
        navigationOptions: {
            // header: ,
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
        },
    },
    Video: {
        screen: VideoScreen,
        navigationOptions: {
            headerTitle: '视频',
            tabBarLabel: '视频',

            headerLeft: null,//去左边返回键
            headerStyle: {
                backgroundColor: '#03A7FF',
            },
            headerTitleStyle: {
                color: 'white'
            },

            tabBarIcon: ({tintColor}) => (
                <Image
                    source={require('./img/video.png')}
                    style={[styles.icon, {tintColor: tintColor}]}
                />
            ),
        },
    },
    BBS: {
        screen: BBSScreen,
        navigationOptions: {
            headerTitle: '论坛',
            tabBarLabel: '论坛',

            headerLeft: null,//去左边返回键
            headerStyle: {
                backgroundColor: '#03A7FF',
            },
            headerTitleStyle: {
                color: 'white'
            },

            tabBarIcon: ({tintColor}) => (
                <Image
                    source={require('./img/bbs.png')}
                    style={[styles.icon, {tintColor: tintColor}]}
                />
            ),
        },
    },
    my: {
        screen: MyScreen,
        navigationOptions: {
            headerTitle: '我的',
            tabBarLabel: '我的',

            headerLeft: null,//去左边返回键

            headerStyle: {
                backgroundColor: '#03A7FF',
            },
            headerTitleStyle: {
                color: 'white'
            },


            tabBarIcon: ({tintColor}) => (
                <Image
                    source={require('./img/my.png')}
                    style={[styles.icon, {tintColor: tintColor}]}
                />
            ),
        },
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
    }
});

const styles = StyleSheet.create({
    icon: {
        height: 20,
        width: 20,
    },
});


const PractiseNavi = StackNavigator({
    PractiseListScreen: {
        screen: PractiseListScreen,
        navigationOptions: {
            headerTitle: '练习分类',
        }
    },
    DoPractiseScreen: {
        screen: DoPractiseScreen,
        navigationOptions: {
            headerTitle: '练习',
        }
    },

}, {
    navigationOptions: {},
    headerMode: 'none',
})


const VideoNavi = StackNavigator({
    TypeVideoScreen: {
        screen: TypeVideoScreen,
        navigationOptions: {
            headerTitle: '视频分类',
        }
    },
    VideoTypeScreen: {
        screen: VideoTypeScreen,
        navigationOptions: {
            headerTitle: '视频分类2',
        }
    },
    VideoListScreen: {
        screen: VideoListScreen,
        navigationOptions: {
            headerTitle: '视频列表',
        }
    },
    VideoPlayScreen: {
        screen: VideoPlayScreen,
        navigationOptions: {
            header: null,
        }
    },

}, {
    navigationOptions: {},
    headerMode: 'none',
})

const App = StackNavigator({
    MainNavigator: {
        screen: TabNavigator1,
    },
    HomeDetailScreen: {
        screen: HomeDetailScreen,
        navigationOptions: {
            headerTitle: '详情',
        }
    },
    PractiseNavi: {
        screen: PractiseNavi,
    },
    VideoNavi: {
        screen: VideoNavi,
    },

}, {
    navigationOptions: {},
    // headerMode: 'none',
})


export default App
