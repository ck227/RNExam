"use strict";

import React, {Component} from "react";
import {
    StyleSheet,
    Text,
    View,
    Alert,
    ScrollView,
    TouchableWithoutFeedback, TouchableOpacity,
} from 'react-native';

/**
 * 选项可以选择，单选题选择之后直接出结果(好了)
 *
 *
 */

export default class App extends Component<{}> {

    constructor(props) {
        super(props);
        this.state = {
            operating: false,
            isEnd: false,
            question: this.props.data,
            status: new Array(this.props.data.answers.length).fill(0),

            isRight: false,
            showAnalytics: false
        }
    }

    _itemClick = (answer, index) => {//单击选项
        //怎么把点击的状态记录下来呢
        this.setState({
            operating: true
        });
        if (this.state.isEnd)//如果已经选完了，不能再选了
            return
        //这里是单选的情况
        this.state.status.forEach((element, index2) => {
            if (index2 === index) {
                this.state.status[index2] = 1
            } else {
                this.state.status[index2] = 0
            }
        });

        this.setState({
            operating: false
        });
    };

    _btnClick = () => {
        let isRight = true
        this.state.question.answers.map((answer, index) => {
            if (answer.isTrue && this.state.status[index] === 0) {//正确答案没有选
                this.state.status[index] = 1
                isRight = false && isRight
            } else if (answer.isTrue && this.state.status[index] === 1) {////正确答案选了

            } else if (!answer.isTrue && this.state.status[index] === 0) {//错误答案没有选

            } else if (!answer.isTrue && this.state.status[index] === 1) {//错误答案选了
                this.state.status[index] = 2
                isRight = false && isRight
            }
        })

        this.setState({
            isRight: isRight,
            isEnd: true,
            showAnalytics: true,
        });
    };

    _renderAnalytics = () => {
        if (this.state.showAnalytics) {
            return (
                <View style={{justifyContent: 'flex-start', marginLeft: 8, marginRight: 8}}>
                    <Text style={{marginTop: 20}}>正确答案: {_getRightAnswer(this.state.question)}</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center',justifyContent:'space-between'}}>
                        <View style={{height: 1, width: 120, backgroundColor: 'gray'}}></View>
                        <Text >试题解析</Text>
                        <View style={{height: 1, width: 120, backgroundColor: 'gray'}}></View>
                    </View>
                    <Text style={{marginTop: 10}}>{this.state.question.analytics}</Text>
                </View>
            )
        } else {
            return null
        }
    }

    render() {
        let question = this.props.data
        return <ScrollView contentContainerStyle={styles.contentContainer}><View style={styles.slide}>
            <View style={{flexDirection: 'row', padding: 12, alignItems: 'flex-start'}}>
                <Text style={{
                    color: '#2CA7F5',
                    borderColor: '#2CA7F5',
                    borderWidth: 1,
                    padding: 4,
                }}>{question.type.startsWith('SINGEL_TRUE') ? '单选题' : '多选题'}</Text>
                <View style={{flex: 1, marginLeft: 4}}>
                    <Text>{question.questionTitle}</Text>

                    <View style={{marginTop: 12}}>
                        {question.answers.map((answer, index) => {
                            return <TouchableWithoutFeedback key={index}
                                                             onPress={this._itemClick.bind(this, answer, index)}><View
                                key={index} style={{
                                flexDirection: 'row',
                                paddingTop: 12,
                                paddingBottom: 6,
                                alignItems: 'center'
                            }}>
                                <View
                                    style={_changeStyle(this.state.status[index])}>
                                    <Text
                                        style={_changeTextStyle(this.state.status[index])}>{_getIndex(index)}</Text>
                                </View>
                                <Text style={{marginLeft: 6}}>{answer.answerContent}</Text>
                            </View>
                            </TouchableWithoutFeedback>
                        })}

                    </View>
                </View>
            </View>

            <TouchableOpacity onPress={this._btnClick.bind(this)}>
                <Text style={{
                    backgroundColor: '#2CA7F5',
                    paddingTop: 10,
                    paddingBottom: 10,
                    paddingLeft: 40,
                    paddingRight: 40,
                    borderRadius: 4,
                    color: 'white'
                }}>确定</Text>
            </TouchableOpacity>

            {
                this._renderAnalytics()
            }
            {/*<View style={{visible: this.state.showAnalytics}}>

                <Text style={{flex: 1}}>正确答案:{_getRightAnswer(question)}</Text>
            </View>*/}

        </View></ScrollView>;
    }


}


const styles = StyleSheet.create({
    wrapper: {},
    container: {
        flex: 1
    },
    contentContainer: {
        flex: 1,
    },
    slide: {
        flex: 1,
        backgroundColor: '#F3F4F8',
        alignItems: 'center'
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
    },

    //下面是选项字母的style
    buttonNormal: {
        justifyContent: 'center', alignItems: 'center', borderColor: 'gray',
        borderWidth: 1,
        height: 40,
        width: 40,
        borderRadius: 20
    },
    buttonSelect: {
        justifyContent: 'center', alignItems: 'center',
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: '#2CA7F5'
    },
    buttonWrong: {
        justifyContent: 'center', alignItems: 'center',
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: 'red'
    },
    //下面是选项字母的文字
    textWhite: {
        color: 'white'
    }

});

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

function _changeStyle(status) {
    switch (status) {
        case 0:
            return styles.buttonNormal
        case 1:
            return styles.buttonSelect
        case 2:
            return styles.buttonWrong
    }
}

function _changeTextStyle(status) {
    switch (status) {
        case 0:
            break
        case 1:
            return styles.textWhite
        case 2:
            return styles.textWhite
    }
}


function _getRightAnswer(question) {
    let rightAnswer = ''
    question.answers.map((answer, index) => {
        if (answer.isTrue) {
            rightAnswer += _getIndex(index)
        }
    })
    return rightAnswer
}

//正确答案是0  蓝色 正确答案是1  蓝色，错误答案是0 蓝色 错误答案是1 红色

function _btnClick(question, status) {
    let isRight = true
    question.answers.map((answer, index) => {
        if (answer.isTrue && status[index] === 0) {//正确答案没有选
            status[index] = 1
            isRight = false && isRight
        } else if (answer.isTrue && status[index] === 1) {////正确答案选了
            isRight = true && isRight
        } else if (!answer.isTrue && status[index] === 0) {//错误答案没有选
            isRight = true && isRight
        } else if (!answer.isTrue && status[index] === 1) {//错误答案选了
            status[index] = 2
            isRight = false && isRight
        }
    })
    // this.setState({
    //     isRight: isRight
    // });
}


