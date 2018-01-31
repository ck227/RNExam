"use strict";

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';



import Video from 'react-native-video';

export default class App extends Component<{}> {

    componentDidMount() {
        // this.player.presentFullscreenPlayer()
    }


    render() {
        const {params} = this.props.navigation.state;
        return (
            <View style={styles.container}>
                <Video
                    repeat
                    resizeMode='cover'
                    source={{uri:params.path}}
                    style={styles.backgroundVideo}
                />
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
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
});
