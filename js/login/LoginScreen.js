/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    ImageBackground,
    TouchableOpacity,
} from 'react-native';

export default class App extends Component<{}> {
    render() {
        return (

            <ImageBackground source={require('./img/login_bg.png')} style={styles.backgroundImage}>

                <View style={styles.box}>

                    <Image source={require('./img/login_logo.png')} style={styles.logo}/>

                    <View style={styles.inputBox}>
                        <Image source={require('./img/login_phone.png')} style={styles.phone}/>
                        <TextInput style={styles.inputText} placeholder={'请输入手机号'}
                                   underlineColorAndroid={'transparent'}/>
                        <Image source={require('./img/login_delete.png')} style={styles.delete}/>
                    </View>

                    <View style={styles.inputBox}>
                        <Image source={require('./img/login_pwd.png')} style={styles.phone}/>
                        <TextInput style={styles.inputText} placeholder={'请输入密码'}
                                   underlineColorAndroid={'transparent'}/>
                        <Image source={require('./img/login_delete.png')} style={styles.delete}/>
                    </View>

                    <TouchableOpacity style={styles.login}>
                        <Text style={styles.loginText}>登录</Text>
                    </TouchableOpacity>
                </View>

            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        flexDirection: 'column',
        alignItems: 'center',
    },
    logo: {
        height: 70,
        width: 70,
        marginTop: 20
    },
    box: {
        marginTop: 100,
        height: 300,
        width: 280,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: 12,
        alignItems: 'center',
    },
    inputBox: {
        flexDirection: 'row',
        width: 220,
        height: 42,
        backgroundColor: 'white',
        borderRadius: 8,
        marginTop: 20,
        alignItems: 'center',
    },
    phone: {
        height: 14,
        width: 14,
        marginLeft: 10
    },
    inputText: {
        height: 42,
        width: 160,
        marginLeft: 6
    },
    delete: {
        height: 14,
        width: 14,
        marginLeft: 6
    },
    pwd: {
        height: 20,
        width: 14,
        marginLeft: 6
    },
    login: {
        width: 220,
        height: 40,
        backgroundColor: '#2CA7F5',
        borderRadius: 8,
        marginTop: 16,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginText: {
        color: 'white'
    }

});
