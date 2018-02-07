import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    ActivityIndicator,
    FlatList,
    TouchableOpacity,
    Alert,
} from 'react-native';

// import {StackNavigator} from 'react-navigation';
// import HomeDetailScreen from './HomeDetailScreen'
import Swiper from 'react-native-swiper';
import {constants} from "../../network/constants";



const {width} = Dimensions.get('window')

export default class HomeScreen extends Component<{}> {

    constructor(props) {
        super(props);
        this.state = {
            banners: [],
            news: [],
            page: 1,
            loading: false,
            refreshing: false,
        };
    }

    componentDidMount() {
        global.storage.load({
            key: 'loginState',
        }).then(ret => {
            let [x, y] = [ret.userId, ret.userToken]
            this.getBanner(x, y)
        }).catch(err => {

        })
        this.getNews()
    }

    getBanner = (userId, uerToken) => {
        var url = `${constants.url}?service=advertised.list&userId=${userId}&userToken=${uerToken}`
        fetch(url)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    banners: res.resultData,
                });
            })
            .catch(error => {
                // this.setState({error, loading: false});
            });
    }

    getNews = () => {
        var url = `${constants.url}?service=news.list&userId=1467&pageNo=${this.state.page}&parent=25`
        this.setState({loading: true});
        fetch(url)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    news: this.state.page === 1 ? res.resultData : [...this.state.news, ...res.resultData],
                    loading: false,
                    refreshing: false,
                });
            })
            .catch(error => {
                this.setState({error, loading: false});
            });
    }

    handleRefresh = () => {
        this.setState(
            {
                page: 1,
                refreshing: true
            },
            () => {
                this.getNews();
            }
        );
    };

    handleLoadMore = () => {
        this.setState(
            {
                page: this.state.page + 1
            },
            () => {
                this.getNews();
            }
        );
    };

    renderHeader = () => {
        return (
            <Swiper style={styles.wrapper} height={200} horizontal={true}
                    onMomentumScrollEnd={(e, state, context) => console.log('index:', state.index)}
                    dot={<View style={{
                        backgroundColor: 'rgba(0,0,0,.2)',
                        width: 5,
                        height: 5,
                        borderRadius: 4,
                        marginLeft: 3,
                        marginRight: 3,
                        marginTop: 3,
                        marginBottom: 3
                    }}/>}
                    activeDot={<View style={{
                        backgroundColor: '#03A7FF',
                        width: 8,
                        height: 8,
                        borderRadius: 4,
                        marginLeft: 3,
                        marginRight: 3,
                        marginTop: 3,
                        marginBottom: 3
                    }}/>}
                    paginationStyle={{
                        bottom: 5, left: null, right: 15
                    }} loop autoplay>
                {this.state.banners.map((banner) => {
                    return <View
                        key={_generateUUID()}
                        style={styles.slide}
                        title={<Text numberOfLines={1}>Why Stone split from Garfield</Text>}>
                        <Image resizeMode='stretch' style={styles.image}
                               source={{uri: constants.PicUrl + banner.thumbPath}}/>
                    </View>
                })}

            </Swiper>
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

    _itemClick = (item, index) => {
        this.props.navigation.navigate('HomeDetailScreen', {
            newsId: item.newsId,
        })
    };

    render() {
        return (
            <View style={styles.container}>

                <FlatList
                    data={this.state.news}
                    renderItem={({item, index}) => (

                        <TouchableOpacity key={_generateUUID()} onPress={this._itemClick.bind(this, item, index)}>
                            <View style={styles.item}>

                                <View style={styles.container2}>
                                    <Image
                                        source={{uri: constants.PicUrl + item.thumbPath}}
                                        style={styles.thumbnail}/>
                                    <View style={styles.rightContainer}>
                                        <Text style={styles.title}>{item.issueTime}</Text>
                                        <Text numberOfLines={2} style={styles.content}>{item.shortTitle}</Text>
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
                                    width: 104,
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
                    //onEndReachedThreshold={15}
                />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    icon: {
        height: 20,
        width: 20,
    },
    wrapper: {},
    slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB'
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5'
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9'
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },
    image: {
        width,
        flex: 1
    },
    //下面的列表
    item: {
        flex: 1,
        flexDirection: 'column',
    },
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
        width: 80,
        height: 60,
    },
    listView: {
        backgroundColor: '#FFFFFF',
    },

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
