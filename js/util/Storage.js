import Storage from 'react-native-storage';
import {AsyncStorage} from 'react-native';

var storage  = new Storage({
    size: 1000,/// 最大容量，默认值1000条数据循环存储
    storageBackend: AsyncStorage,//// 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage 如果不指定则数据只会保存在内存中，重启后即丢失
    defaultExpires: null,//  数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
    enableCache: true,// 读写时在内存中缓存数据。默认启用。

})
global.storage = storage;
