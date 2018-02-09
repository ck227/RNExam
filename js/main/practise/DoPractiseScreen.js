"use strict";

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Alert,
} from 'react-native';

import Swiper from 'react-native-swiper';

import {constants} from "../../network/constants";


const renderPagination = (index, total, context) => {
    return (
        <View style={styles.paginationStyle}>
            <Text style={{color: 'red'}}>
                <Text style={styles.paginationText}>{index + 1}</Text>/{total}
            </Text>
        </View>
    )
}


export default class DoPractiseScreen extends Component<{}> {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            refreshing: false,
            userId: '',
            userToken: '',
        };
    }

    componentDidMount() {
        global.storage.load({
            key: 'loginState',
        }).then(ret => {
            let [x, y] = [ret.userId, ret.userToken]
            this.setState({
                userId: x,
                userToken: y,
            });
            this.getData()
        }).catch(err => {

        })
    }

    getData = () => {
        const {params} = this.props.navigation.state;
        let url = `${constants.url}?service=question.test.list&userId=${this.state.userId}&userToken=${this.state.userToken}&examType=1&rangeType=1&majorId=${params.id}&questionNo=${params.historyNo}&rangeSize=9`
        fetch(url)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    data: res.resultData.questions,
                    refreshing: false,
                });
                // Alert.alert(this.state.data.length + '条数据')
            })
            .catch(error => {
                this.setState({error, refreshing: false});
                // Alert.alert(this.state.data.length + '条数据2')
            });
    }


    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{flex: 1, height: 300}}>
                    <Swiper
                        style={styles.wrapper}
                        renderPagination={renderPagination}
                        loop={false}>
                        {this.state.data.map((question) => {
                            return <View key={_generateUUID()} style={styles.slide1}
                                         title={<Text numberOfLines={1}>Aussie tourist dies at Bali hotel</Text>}>
                                <Text>{question.questionTitle}</Text>
                            </View>
                        })}

                    </Swiper>
                </View>
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
    wrapper: {
        height: 200
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
    paginationStyle: {
        position: 'absolute',
        bottom: 10,
        right: 10
    },
    paginationText: {
        color: 'white',
        fontSize: 20
    }
    

});


function _generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
};
