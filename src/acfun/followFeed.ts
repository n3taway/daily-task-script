import Superagent from 'superagent';
import { getAcfunCookies } from '../secret';
import { acfunApi } from './constant';

export default async function followFeed() {
    try {
        const res = await Superagent.get(acfunApi.followFeed)
            .set('Cookie', getAcfunCookies())
            .query({
                isGroup: 0,
                gid: -1,
                count: 10,
                pcursor: 1,
            });
        if (res.body.result === 0) {
            let content = '';
            res.body.feedList.forEach((item) => {
                content = content.concat(`\n author:${item.author} \n \ntitle:${item.title}\n`)
            })
            return Promise.resolve(res.body.feedList);
        } else {
            return Promise.reject({
                title: '内容推送获取失败',
                content: `${res.body.error_msg}`,
                api: `${acfunApi.followFeed}`,
            });
        }
    } catch (error) {
        return Promise.reject({
            title: '内容推送获取失败',
            content: 'runTime error',
            api: `${acfunApi.followFeed}`,
        });
    }
}
