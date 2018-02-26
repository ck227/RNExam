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
                    return <View key={index} style={styles.slide}>
                        <View style={{flexDirection: 'row', padding: 12, alignItems: 'flex-start'}}>
                            <Text style={{
                                color: '#2CA7F5',
                                borderColor: '#2CA7F5',
                                borderWidth: 1,
                                padding: 4,
                            }}>{question.type.startsWith('SINGEL_TRUE') ? '单选题' : '多选题'}</Text>
                            <View style={{flex: 1, marginLeft: 4}}>
                                <Text>{question.questionTitle}</Text>
                                {question.answers.map((answer, index) => {
                                    return <View key={index} style={{
                                        flexDirection: 'row',
                                        paddingTop: 12,
                                        paddingBottom: 6,
                                        alignItems: 'center'
                                    }}>
                                        <View style={{justifyContent: 'center', alignItems: 'center',borderColor: 'gray',
                                            borderWidth: 1,
                                            height: 40,
                                            width: 40,
                                            borderRadius: 20}}>
                                            <Text style={{}}>{_getIndex(index)}</Text>
                                        </View>
                                        <Text style={{marginLeft: 6}}>{answer.answerContent}</Text>
                                    </View>
                                })}
                            </View>

                        </View>

                    </View>
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

function _getIndex(index) {
    switch (index) {
        case 0:
            return 'A';
        case 1:
            return 'B';
        case 2:
            return 'C';
        case 3:
            return 'D';
        case 4:
            return 'E';
        case 5:
            return 'F';
        case 6:
            return 'G';
        case 7:
            return 'H';
        case 8:
            return 'I';
        case 9:
            return 'J';
        case 10:
            return 'K';

    }
}


/*
function _generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
};
*/

