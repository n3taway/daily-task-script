import Superagent from 'superagent';
import { storeConfig, SetCookiesType } from './store';
import { bilibiliApi } from './constant';

export async function initUserInfo(opt: SetCookiesType) {
    storeConfig.setCookies(opt);
    const cookie = storeConfig.getCookies();
    const res = await Superagent.get(bilibiliApi.userInfo).set('Cookie', cookie)
    if (res.body.code === 0) {
        storeConfig.setUserInfo({ userName: res.body.data.uname });
    } else {
        console.log('cookie 过期!');
    }
}
