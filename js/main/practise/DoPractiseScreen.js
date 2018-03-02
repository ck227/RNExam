"use strict";

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

import Swiper from 'react-native-swiper';

import {constants} from "../../network/constants";

import Question from "./QuestionScreen"


/**
 做题进度
 拿下一题
 */
export default class DoPractiseScreen extends Component<{}> {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            refreshing: false,
            userId: '',
            userToken: '',
            historyNo: '',
            questionCount: '',
            currentNo: ''
        };
    }

    componentDidMount() {
        const {params} = this.props.navigation.state
        this.setState({
            historyNo: params.historyNo,
            questionCount: params.questionCount
        });
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
            <View style={{flex: 1, flexDirection: 'column-reverse'}}>
                <View style={{flexDirection: 'row-reverse', padding: 8}}>
                    <Text>{this.state.historyNo}/{this.state.questionCount}</Text>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}>
                        <Text>收藏</Text>
                    </View>
                </View>

                <Swiper
                    style={styles.wrapper}
                    showsPagination={false}
                    loop={false}>
                    {this.state.data.map((question, index) => {
                        // let answers = question.answers
                        let tmp = question
                        return <Question data={tmp} key={index} returnData={this._se.bind(this)}/>

                    })}
                </Swiper>
            </View>
        );
    }
}

function _setCurrentNo(currentNo) {
    this.setState({
        currentNo: currentNo
    });
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1
    },
    container: {
        flex: 1
    },
    slide: {
        flex: 1,
        backgroundColor: '#F3F4F8',
    },
    text: {
        color: 'red',
        fontSize: 30,
        fontWeight: 'bold',
    },
    paginationStyle: {
        position: 'absolute',
        bottom: 10,
        right: 10
    },
    paginationText: {
        color: 'red',
        fontSize: 20
    }


});

const renderPagination = (index, total, context) => {
    return (
        <View style={styles.paginationStyle}>
            <Text style={{color: 'black'}}>
                <Text style={styles.paginationText}>{index + 1}</Text>/{total}
            </Text>
        </View>
    )
}


