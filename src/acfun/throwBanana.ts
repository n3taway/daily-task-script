import Superagent from 'superagent';
import Notification from '../notification';
import { acfunApi } from './constant';
import { getAcfunCookies } from '../secret';

export default async function throwBanana(feedList: Array<any>) {
    const videoList = feedList.filter(item => !item.isArticle);
    // const getDanMuResult = await Promise.all(videoList.map((videoInfo) => getDanMu(videoInfo)));
    try {
        const throwBananaResult = await Promise.all(videoList.map((videoInfo) => doThrowBanana(videoInfo)));
        return Promise.resolve(throwBananaResult);
    } catch (error) {
        new Notification().push({
            title: '投蕉失败',
            content: error,
            api: `${acfunApi.throwBanana}`,
        });
    }
}

// 投蕉
async function doThrowBanana(videoInfo) {
    const response = await Superagent.post(acfunApi.throwBanana)
        .set('Cookie', getAcfunCookies())
        // .set('referer', 'https://www.acfun.cn/a/ac<x>') //文章
        .set('referer', `https://www.acfun.cn/v/ac${videoInfo.cid}`)
        .type('form')
        .send({
            resourceId: videoInfo.cid,
            // resourceType: 3, //文章
            resourceType: 2,
            count: Math.floor(Math.random() * 5 + 1),
        });
    let result = {};
    if (response.body.result === 0) {
        result = {
            title: videoInfo.title,
            thrownBanana: response.body.extData.bananaRealCount,
            author: videoInfo.author,
        }
        return Promise.resolve(result)
    } else {
        return Promise.reject(response.body.error_msg)
    }
}


// Promise.all接口测试  获取视频初始弹幕
// async function getDanMu(videoInfo) {
//     const response = await Superagent
//         .post(acfunApi.danmakuPoll)
//         .set('Cookie', getAcfunCookies())
//         .type('form')
//         .send({
//             videoId: videoInfo.vid,
//             lastFetchTime: 0,
//             enableAdvanced: true,
//         });
//     const result = {
//         title: videoInfo.title,
//         onlineCount: response.body.onlineCount,
//     }
//     return Promise.resolve(result)
// }



// videoInfo

// {
//     "contentClass": "",
//     "goldBanana": 208,
//     "allowDanmaku": false,
//     "isSignedUpCollege": true,
//     "title": "传统鲁菜：爆炒腰花及其它几种腰子做法，据说一看就会，一学就废",
//     "userImg": "https://tx-free-imgs.acfun.cn/content/2020_8_14/1.5973845464385316E9.png?imageslim",
//     "verifiedType": 0,
//     "verifiedText": "",
//     "aid": 19884820,
//     "views": 1336,
//     "vid": 16195023, <=================================> videoId
//     "isArticle": false,
//     "author": "王一刀",
//     "stows": 5,
//     "avatar": "https://tx-free-imgs.acfun.cn/content/2020_8_14/1.5973845464385316E9.png?imageslim",
//     "errorlog": "",
//     "releaseDate": 1605872003455,
//     "danmakuSize": 12,
//     "titleImg": "https://imgs.aixifan.com/o_1enim20u2kmp183n6eo1s0f19ov0.jpeg",
//     "shareUrl": "http://m.acfun.cn/v/?ac=19884820",
//     "userId": 9424219,
//     "channelId": 89,
//     "cid": 19884820,
//     "score": 0,
//     "time": 579412,
//     "tags": "",
//     "description": "传统鲁菜...",
//     "success": true,
//     "username": "王一刀",
//     "url": "/v/ac19884820",
//     "comments": 8,
//     "sign": "原创生活美食视频，每周更新！！！"
// }