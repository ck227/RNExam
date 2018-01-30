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

    render() {
        return (
            <View style={styles.container}>
                <SectionList
                    renderSectionHeader={({section}) =>
                        <View key={_generateUUID()} style={styles.parentView}>
                            <Text style={styles.parentText}>{section.title}
                            </Text>
                        </View>
                    }
                    renderItem={({item}) =>
                        <View key={_generateUUID()} style={styles.childView}>
                            <Image
                                source={require('./img/ic_bbs_default.png')}
                                style={styles.thumbnail}/>
                            <Text>{item.cateName}
                            </Text>
                        </View>
                    }
                    keyExtractor={(item, index) => index}
                    ItemSeparatorComponent={this._separator}
                    sections={this.selectionList()}
                />
            </View>
        );
    }

    selectionList = () => {
        let datas = []
        if (this.state.data != null) {
            for (let b of this.state.data) {
                let itemdata = {data: b.childs, title: b.cateName}
                datas.push(itemdata)
            }
        }
        return datas
    }

    _separatorParent = () => {
        return <View style={{height: 10, backgroundColor: '#CED0CE'}}/>;
    }
    _separator = () => {
        return <View style={{height: 1, backgroundColor: '#CED0CE'}}/>;
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
        backgroundColor: 'white'
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
        backgroundColor: 'white',
        padding: 8
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

