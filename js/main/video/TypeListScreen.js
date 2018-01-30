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
    Image,
} from 'react-native';

import { NavigationActions } from 'react-navigation' //第三方的

import {constants} from "../../network/constants"; //常量


import VideoScreen from './VideoScreen'
import TypeVideoScreen from './TypeVideoScreen'


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
        let url = `${constants.url}?service=course.video.typelist`
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

    _itemClick = (item, index) => {
        // this.props.navigation.navigate('TypeVideoScreen')
        this.props.navigation.dispatch(navigateAction)
    };

    render() {
        return (
            <FlatList
                style={styles.container}
                data={this.state.data}
                renderItem={({item, index}) => (

                    <TouchableOpacity  onPress={this._itemClick.bind(this, item, index)}>
                        <View style={styles.container2}>
                            <Text style={styles.title}>{item.typeName}</Text>

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




const navigateAction = NavigationActions.navigate({
    routeName: 'VideoNavi',
    params: {},
    // navigate can have a nested navigate action that will be run inside the child router
    action: NavigationActions.navigate({ routeName: 'TypeVideoScreen'})
})



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

