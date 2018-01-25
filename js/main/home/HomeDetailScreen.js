"use strict";

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    WebView,
    Alert,
} from 'react-native';
import {constants} from "../../network/constants";

var WEBVIEW_REF = 'webview';

export default class App extends Component<{}> {


    constructor(props) {
        super(props);
        this.state = {
            url: '',
            status: 'No Page Loaded',
            backButtonEnabled: false,
            forwardButtonEnabled: false,
            loading: true,
            scalesPageToFit: true,
        };
    }

    render() {
        const {params} = this.props.navigation.state;
        return (
            <View style={styles.container}>
                <WebView style={styles.container}
                         source={{uri: `${constants.url}?service=news.detail&newsId=${params.newsId}`}}
                         startInLoadingState={true}
                         domStorageEnabled={true}
                         javaScriptEnabled={true}
                >
                </WebView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

});
