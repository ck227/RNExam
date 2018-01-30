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
    Alert
} from 'react-native';

import {StackNavigator} from 'react-navigation';
import {ProgressDialog} from 'react-native-simple-dialogs';

import {constants} from '../network/constants'
import ss from '../util/Storage' //不能省略，确保global的初始化

import MainScreen from '../main/main'

export default class LoginScreen extends Component<{}> {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            account: '18507104252',
            password: '123456',
            loading: false,
            loggedIn: false
        };
    }

    render() {
        return (
            this.state.loggedIn ? <MainScreen/> :

                <ImageBackground source={require('./img/login_bg.png')} style={styles.backgroundImage}>

                    <View style={styles.box}>

                        <Image source={require('./img/login_logo.png')} style={styles.logo}/>

                        <View style={styles.inputBox}>
                            <Image source={require('./img/login_phone.png')} style={styles.phone}/>
                            <TextInput style={styles.inputText}
                                       placeholder={'请输入手机号'}
                                       defaultValue={'18507104252'}
                                       underlineColorAndroid={'transparent'}
                                       onChangeText={(text) => this.setState({account: text})}/>
                            <Image source={require('./img/login_delete.png')} style={styles.delete}/>
                        </View>

                        <View style={styles.inputBox}>
                            <Image source={require('./img/login_pwd.png')} style={styles.phone}/>
                            <TextInput style={styles.inputText} placeholder={'请输入密码'}
                                       defaultValue={'123456'}
                                       underlineColorAndroid={'transparent'}
                                       onChangeText={(text) => this.setState({password: text})}/>
                            <Image source={require('./img/login_delete.png')} style={styles.delete}/>
                        </View>

                        <TouchableOpacity style={styles.login} onPress={this._loginFromApi.bind(this)}>
                            <Text style={styles.loginText}>登录</Text>
                        </TouchableOpacity>
                    </View>

                    <ProgressDialog
                        visible={this.state.loading}
                        message="玩命加载中..."
                        activityIndicatorSize="large"
                    />

                </ImageBackground>

        );
    }

    async _loginFromApi() {

        if (this.state.account == '') {
            return Alert.alert('账号不能为空')
        }
        if (this.state.password == '') {
            return Alert.alert('密码不能为空')
        }
        const {account, password} = this.state;
        this.setState({
            loading: true,
        });
        try {
            let response = await fetch(`${constants.url}?service=login&loginName=${account}&passWord=${password}`);
            let responseJson = await response.json()
            if (responseJson.resultCode == 100) {
                //保存获取到的id和token
                storage.save({
                    key: 'loginState',  // 注意:请不要在key中使用_下划线符号!
                    data: {
                        userId: responseJson.resultData.userId,
                        userToken: responseJson.resultData.userToken,
                    },
                    expires: null
                });
                // this.props.navigation.navigate('Main')
                this.setState({
                    loggedIn: true,
                });
            } else {
                Alert.alert(responseJson.resultMsg)
            }
        } catch (error) {
            // console.error(error)
            // Alert.alert('登录异常' + error)

            this.setState({
                loggedIn: true,
            });
        } finally {
            this.setState({
                loading: false
            });
        }
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
    },


});

// const Index = StackNavigator({
//     Login: {screen: LoginScreen},
//     Main: {screen: MainScreen},
// });

// const LoginNavigator = StackNavigator({
//     Splash: {
//         screen: SplashScreen,
//         navigationOptions: {
//             header: {
//                 visible: false
//             }
//         }
//     }
// });

// export default Index
