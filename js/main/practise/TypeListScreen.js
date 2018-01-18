/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

//已修改启动页面

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

// http://116.62.13.18:8399/GridIntf/gateway.do?service=question.major.list&userId=1467&userToken=VLlWWtIVDVzv9CWXBJ6k&examType=1&unityType=1

export default class App extends Component<{}> {

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
        let url = `${constants.url}?service=question.major.list&userId=${this.state.userId}&userToken=${this.state.userToken}&examType=1&unityType=1`
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

    render() {
        return (


            <FlatList
                style={styles.container}
                data={this.state.data}
                renderItem={({item, index}) => (

                    <TouchableOpacity>
                        <View style={styles.container2}>
                            <Text style={styles.title}>{item.majorName}</Text>
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
                //ListHeaderComponent={this.renderHeader}
                //ListFooterComponent={this.renderFooter}
                onRefresh={this.handleRefresh}
                refreshing={this.state.refreshing}
                //onEndReached={this.handleLoadMore}
                //onEndReachedThreshold={15}
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
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 12,
        paddingBottom: 12
    },
    title: {
        color: '#666666',
        fontSize: 14,
        textAlign: 'left',
    },
});
