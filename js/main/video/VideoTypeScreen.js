"use strict";

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import {constants} from "../../network/constants";

import VideoListScreen from "./VideoListScreen"


export default class VideoTypeScreen extends Component<{}> {

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
            console.error(err)
        })
    }

    getData = () => {
        const {params} = this.props.navigation.state;
        let url = `${constants.url}?service=course.major.list&userId=${this.state.userId}&userToken=${this.state.userToken}&cataLogType=${params.id}&unityType=${params.type}&pId=${params.pId}`
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
        this.props.navigation.navigate('VideoListScreen', {
            id: item.majorId,
            name: item.majorName,
            isBuy: item.isFree || item.isBuy
        })
    };

    render() {
        return (
            <FlatList
                style={styles.container}
                data={this.state.data}
                renderItem={({item}) => (

                    <TouchableOpacity onPress={this._itemClick.bind(this, item)}>
                        <View style={styles.container2}>
                            <Text style={styles.title}>{item.majorName}</Text>

                            <View style={styles.iconParent}>
                                {
                                    item.isBuy || item.isFree ? <Image
                                        source={require('./img/ic_bought.png')}
                                        style={styles.icon}
                                    /> : <Image
                                        source={require('./img/ic_unbought.png')}
                                        style={styles.icon}
                                    />
                                }
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
        flexDirection: 'column',
    },
    container2: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: '#FFFFFF',
    },
    title: {
        color: '#666666',
        fontSize: 14,
        textAlign: 'left',
        marginTop: 16,
        marginBottom: 16,
        marginLeft: 14
    },
    iconParent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    icon: {
        height: 40,
        width: 40
    }

});