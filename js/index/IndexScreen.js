/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import SplashScreen from 'react-native-splash-screen'
import LoginScreen from '../login/LoginScreen'

export default class IndexScreen extends Component<{}> {

    static navigationOptions = {
        header: null,//添加了navigation之后会有标题栏，这里去掉
    };

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        setTimeout(() => {
                SplashScreen.hide()
            },
            1000
        );
    }

    render() {
        return (
            <LoginScreen/>
        );
    }
}


