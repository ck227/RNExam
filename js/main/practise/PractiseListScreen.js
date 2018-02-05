"use strict";

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import {constants} from "../../network/constants";
import {NavigationActions} from "react-navigation";

import * as Progress from 'react-native-progress';

export default class PractiseListScreen extends Component<{}> {

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
        let url = `${constants.url}?service=question.major.list&userId=${this.state.userId}&userToken=${this.state.userToken}&examType=1&unityType=${params.type}&pId=${params.id}`
        fetch(url)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    data: res.resultData,
                    refreshing: false,
                });
            })
            .catch(error => {
                this.setState({error, refreshing: false});
            });
    }

    handleRefresh = () => {
        this.setState(
            {
                refreshing: true
            },
            () => {
                this.getData();
            }
        );
    };

    _itemClick = (item) => {
        // this.props.navigation.dispatch(NavigationActions.navigate({
        //     routeName: 'PractiseNavi',
        //     params: {},//这里是传到PractiseNavi的参数
        //     action: NavigationActions.navigate({routeName: 'PractiseListScreen', params: {id: item.id, type: this.props.type}}) //这里是传到子目录的参数
        // }))
    };

    render() {
        return (
            <FlatList
                style={styles.container}
                data={this.state.data}
                renderItem={({item}) => (
                    <TouchableOpacity onPress={this._itemClick.bind(this, item)}>
                        <View style={styles.item}>
                            <Text style={styles.title}>{item.majorName}</Text>

                            <View style={{flexDirection:'row', marginBottom: 8,alignItems:'center',marginLeft: 14,}}>
                                <View>
                                    <Progress.Bar style={styles.bar} width={250} borderWidth={0}
                                                  color={'#2CA7F5'} unfilledColor={'#B3B9C9'}
                                                  progress={item.historyNo / item.questionCount}/>
                                </View>

                                <Text style={{marginLeft: 8}} >{item.historyNo}/{item.questionCount}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
                ItemSeparatorComponent={() =>
                    <View style={{flex: 1, flexDirection: 'row',}}>
                        <View
                            style={{
                                height: 1,
                                backgroundColor: "#CED0CE",
                            }}
                        />
                    </View>
                }
                keyExtractor={(item, index) => index}
                onRefresh={this.handleRefresh}
                refreshing={this.state.refreshing}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    title: {
        color: '#666666',
        fontSize: 14,
        textAlign: 'left',
        marginTop: 12,
        marginBottom: 8,
        marginLeft: 14
    },
    bar: {

    }
});
