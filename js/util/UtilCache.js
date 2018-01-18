// export function getCache() {
//     global.storage.load({
//         key: 'loginState',
//         autoSync: true,//在没有找到数据或数据过期时自动调用相应的sync方法
//         syncInBackground: true,
//     }).then(ret => {
//
//         // this.setState({
//         //     userId: ret.userId,
//         //     userToken: ret.userToken,
//         // });
//         // console.warn(ret.userId)
//         // console.warn(ret.userToken)
//         let cccc = [ret.userId, ret.userToken]
//         return cccc
//
//     }).catch(err => {
//         switch (err.name) {
//             case 'NotFoundError':
//                 // TODO;
//                 // this.setState({
//                 //     userId: '',
//                 //     userToken: ''
//                 // });
//                 return ['', '']
//                 break;
//         }
//     })
// }