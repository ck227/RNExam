"use strict";

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';


export default class App extends Component<{}> {

    componentDidMount() {

    }

    static navigationOptions = {
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

    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.whiteBlock}>
                    <View style={styles.roundBlock}>
                        <Image
                            source={require('./img/ic_avatar.png')}
                            style={styles.avatar}/>

                        <View style={styles.rightBlock}>
                            <Text>昵称：陈大爷</Text>
                            <Text style={{marginTop: 8}}>积分：100</Text>
                        </View>

                    </View>
                </View>


                <View style={{backgroundColor: 'white',marginTop:12}}>
                    <View style={{height:0.5,backgroundColor:'#CED0CE'}}/>
                    <View style={{flexDirection: 'row', padding: 14}}>
                        <Image source={require('./img/ic_my_bbs.png')} style={styles.icon}/>
                        <Text style={{marginLeft: 12}}>我的帖子</Text>
                        <View style={{flex:1,flexDirection:'row',justifyContent:'flex-end'}}>
                            <Image source={require('./img/ic_arrow_right_gray.png')} style={styles.icon}/>
                        </View>
                    </View>

                    <View style={{height:0.5,backgroundColor:'#CED0CE'}}/>
                    <View style={{flexDirection: 'row', padding: 14}}>
                        <Image source={require('./img/ic_my_course.png')} style={styles.icon}/>
                        <Text style={{marginLeft: 12}}>我的课程</Text>
                        <View style={{flex:1,flexDirection:'row',justifyContent:'flex-end'}}>
                            <Image source={require('./img/ic_arrow_right_gray.png')} style={styles.icon}/>
                        </View>
                    </View>

                    <View style={{height:0.5,backgroundColor:'#CED0CE'}}/>
                    <View style={{flexDirection: 'row', padding: 14}}>
                        <Image source={require('./img/ic_my_score.png')} style={styles.icon}/>
                        <Text style={{marginLeft: 12}}>我的积分</Text>
                        <View style={{flex:1,flexDirection:'row',justifyContent:'flex-end'}}>
                            <Image source={require('./img/ic_arrow_right_gray.png')} style={styles.icon}/>
                        </View>
                    </View>

                    <View style={{height:0.5,backgroundColor:'#CED0CE'}}/>
                    <View style={{flexDirection: 'row', padding: 14}}>
                        <Image source={require('./img/ic_my_buy.png')} style={styles.icon}/>
                        <Text style={{marginLeft: 12}}>在线购买</Text>
                        <View style={{flex:1,flexDirection:'row',justifyContent:'flex-end'}}>
                            <Image source={require('./img/ic_arrow_right_gray.png')} style={styles.icon}/>
                        </View>
                    </View>

                    <View style={{height:0.5,backgroundColor:'#CED0CE'}}/>
                    <View style={{flexDirection: 'row', padding: 14}}>
                        <Image source={require('./img/ic_buy_detail.png')} style={styles.icon}/>
                        <Text style={{marginLeft: 12}}>消费明细</Text>
                        <View style={{flex:1,flexDirection:'row',justifyContent:'flex-end'}}>
                            <Image source={require('./img/ic_arrow_right_gray.png')} style={styles.icon}/>
                        </View>
                    </View>
                    <View style={{height:0.5,backgroundColor:'#CED0CE'}}/>

                </View>



                <View style={{backgroundColor: 'white',marginTop:12}}>
                    <View style={{height:0.5,backgroundColor:'#CED0CE'}}/>
                    <View style={{flexDirection: 'row', padding: 14}}>
                        <Image source={require('./img/ic_my_course.png')} style={styles.icon}/>
                        <Text style={{marginLeft: 12}}>预约上课</Text>
                        <View style={{flex:1,flexDirection:'row',justifyContent:'flex-end'}}>
                            <Image source={require('./img/ic_arrow_right_gray.png')} style={styles.icon}/>
                        </View>
                    </View>

                    <View style={{height:0.5,backgroundColor:'#CED0CE'}}/>
                    <View style={{flexDirection: 'row', padding: 14}}>
                        <Image source={require('./img/ic_my_event.png')} style={styles.icon}/>
                        <Text style={{marginLeft: 12}}>活动</Text>
                        <View style={{flex:1,flexDirection:'row',justifyContent:'flex-end'}}>
                            <Image source={require('./img/ic_arrow_right_gray.png')} style={styles.icon}/>
                        </View>
                    </View>

                    <View style={{height:0.5,backgroundColor:'#CED0CE'}}/>
                    <View style={{flexDirection: 'row', padding: 14}}>
                        <Image source={require('./img/ic_my_history.png')} style={styles.icon}/>
                        <Text style={{marginLeft: 12}}>统计</Text>
                        <View style={{flex:1,flexDirection:'row',justifyContent:'flex-end'}}>
                            <Image source={require('./img/ic_arrow_right_gray.png')} style={styles.icon}/>
                        </View>
                    </View>
                    <View style={{height:0.5,backgroundColor:'#CED0CE'}}/>

                </View>



            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

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
    //
    whiteBlock: {
        padding: 12,
        backgroundColor: '#03A7FF'
    },
    roundBlock: {
        flexDirection: "row",
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 14,
        alignItems: 'center'
    },
    avatar: {
        height: 60,
        width: 60,
        borderColor: '#03A7FF',
        borderWidth: 1,
        borderRadius: 30
    },
    rightBlock: {
        marginLeft: 12,
    },
    //
});
