
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';

export default class App extends Component<{}> {

    static navigationOptions = {
        headerTitle: '视频',
        tabBarLabel: '视频',

        headerLeft: null,//去左边返回键
        headerStyle: {
            backgroundColor: '#03A7FF',
        },
        headerTitleStyle: {
            color: 'white'
        },

        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require('./img/video.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        ),
    };

    render() {
        let pic = {
            uri: 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1516589248&di=271a7797af8631a660c95fd387c9fea1&src=http://www.sxbbs.com/data/attachment/forum/201712/06/162335rgfww48pmaf0fww2.jpg'
        };
        return (
            <View style={styles.container}>
                <Image source={pic} style={{width: 193, height: 110}} />
            </View>
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
