"use strict";

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    SectionList,
    Alert,
} from 'react-native';
import {constants} from "../../network/constants";


// http://116.62.13.18:8399/GridIntf/gateway.do?service=forum.category.list&userId=1467&userToken=GAy26LBw2VxXpbrHlj6M

export default class App extends Component<{}> {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
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
        let url = `${constants.url}?service=forum.category.list&userId=${this.state.userId}&userToken=${this.state.userToken}`
        fetch(url)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    data: res.resultData,
                });

            })
            .catch(error => {

            });
    }

    static navigationOptions = {
        headerTitle: '论坛',
        tabBarLabel: '论坛',

        headerLeft: null,//去左边返回键
        headerStyle: {
            backgroundColor: '#03A7FF',
        },
        headerTitleStyle: {
            color: 'white'
        },

        tabBarIcon: ({tintColor}) => (
            <Image
                source={require('./img/bbs.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        ),
    };

    render() {
        return (
            <View style={styles.container}>
                <SectionList
                    renderSectionHeader={({section}) =>
                        <View style={styles.parentView}>
                            <Text style={styles.parentText}>{section.title}
                            </Text>
                        </View>
                    }
                    renderItem={({item}) =>
                        <View style={styles.childView}>
                            <Image
                                source={require('./img/ic_bbs_default.png')}
                                style={styles.thumbnail}/>
                            <Text>{item.cateName}
                            </Text>
                        </View>
                    }

                    ItemSeparatorComponent={this._separator}
                    sections={this.selectionList()}
                />
            </View>
        );
    }

    selectionList = () => {
        let datas = []
        for (let b of this.state.data) {
            let itemdata = {data: b.childs, title: b.cateName}
            datas.push(itemdata)
        }
        return datas
    }

    _separatorParent = () => {
        return <View style={{height:10,backgroundColor:'#CED0CE'}}/>;
    }
    _separator = () => {
        return <View style={{height:1,backgroundColor:'#CED0CE'}}/>;
    }

    _renderItemComponent = ({item}) => <ItemComponent item={item} onPress={this._pressItem}/>;

    _pressItem = () => {

    };
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
    icon: {
        height: 20,
        width: 20,
    },
    parentView: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 16,
        backgroundColor:'white'
    },
    parentText: {
        fontSize: 16,
        color: '#03A7FF'
    },
    thumbnail: {
        height: 16,
        width: 20,
        marginLeft: 24,
        marginRight: 8
    },
    childView: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor:'white',
        padding:8
    }
});

