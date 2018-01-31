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
    ActivityIndicator,
    Alert,
} from 'react-native';

import {constants} from "../../network/constants";

import VideoPlayScreen from "./VideoPlayScreen"


export default class VideoListScreen extends Component<{}> {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            page: 1,
            refreshing: false,
            loading: false,

            path: '',

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
        let url = `${constants.url}?service=course.video.list&userId=${this.state.userId}&userToken=${this.state.userToken}&majorId=${params.id}&pageNo=${this.state.page}&examType=1`
        fetch(url)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    data: this.state.page === 1 ? res.resultData : [...this.state.news, ...res.resultData],
                    loading: false,
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
                page: 1,
                refreshing: true
            },
            () => {
                this.getData();
            }
        );
    };

    handleLoadMore = () => {
        this.setState(
            {
                page: this.state.page + 1
            },
            () => {
                this.getData();
            }
        );
    };

    renderFooter = () => {
        if (!this.state.loading) return null;
        return (
            <View
                style={{
                    paddingVertical: 20,
                    borderTopWidth: 1,
                    borderColor: "#CED0CE"
                }}>
                <ActivityIndicator animating size="large"/>
            </View>
        );
    };

    _itemClick = (item) => {
        this.getVideoPath(item.videoId)
    };


    getVideoPath = (sourceId) => {
        let url = `${constants.url}?service=course.video.source&userId=${this.state.userId}&userToken=${this.state.userToken}&sourceId=${sourceId}`
        fetch(url)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    path: res.resultData.resourceUrl,
                });

                this.props.navigation.navigate('VideoPlayScreen', {
                    path: this.state.path,
                })

            })
            .catch(error => {

            });
    }

    render() {
        return (
            <FlatList
                style={styles.container}
                data={this.state.data}
                renderItem={({item}) => (

                    <TouchableOpacity onPress={this._itemClick.bind(this, item)}>
                        <View style={styles.item}>

                            <View style={styles.container2}>
                                <Image
                                    source={{uri: constants.PicUrl + item.faceImgPath}}
                                    style={styles.thumbnail}/>
                                <View style={styles.rightContainer}>
                                    <Text style={styles.title}>{item.videoTitle}</Text>
                                    <Text numberOfLines={2} style={styles.content}>时长：{item.length}</Text>
                                </View>
                            </View>

                        </View>
                    </TouchableOpacity>
                )}
                ItemSeparatorComponent={() =>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View
                            style={{
                                height: 1,
                                width: 138,
                                backgroundColor: 'white'
                            }}/>
                        <View
                            style={{
                                height: 1,
                                backgroundColor: "#CED0CE",
                            }}
                        />
                    </View>
                }
                keyExtractor={(item, index) => index}
                ListHeaderComponent={this.renderHeader}
                ListFooterComponent={this.renderFooter}
                onRefresh={this.handleRefresh}
                refreshing={this.state.refreshing}
                onEndReached={this.handleLoadMore}
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
    iconParent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    icon: {
        height: 40,
        width: 40
    },
    //下面的列表

    container2: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 8,
        paddingBottom: 8
    },
    rightContainer: {
        flex: 1,
        marginLeft: 12
    },
    title: {
        color: '#999999',
        fontSize: 12,
        marginBottom: 8,
        textAlign: 'left',
    },
    content: {
        color: '#666666',
        fontSize: 14,
        textAlign: 'left'
    },
    thumbnail: {
        width: 120,
        height: 80,
    },
    listView: {
        backgroundColor: '#FFFFFF',
    },

});