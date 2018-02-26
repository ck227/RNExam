"use strict";

import {Component} from "react";
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default class App extends Component<{}> {

    constructor(props) {
        super(props);
        this.state = {
            // question: '',
        }
    }

    render() {
        let question = this.props.hello
        return (
            <View style={styles.slide}>
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