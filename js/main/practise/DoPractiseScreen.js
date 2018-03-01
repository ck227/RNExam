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
            <Swiper
                style={styles.wrapper}
                renderPagination={renderPagination}
                loop={false}>
                {this.state.data.map((question,index) => {
                    // let answers = question.answers
                    let tmp = question
                    return <Question data = {tmp} key = {index}/>
                })}
            </Swiper>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {},
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


