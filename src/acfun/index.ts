import Superagent from 'superagent';
import { storeConfig, AcfunCookiesType } from './store';
import Notification from '../notification';
import getSecretConfig from '../secret';
import { acfunApi } from './constant';

async function initUserInfo(opt: AcfunCookiesType) {
    storeConfig.setCookies(opt);
    const cookie = storeConfig.getCookies();
    const res = await Superagent.get(acfunApi.userInfo).set('Cookie', cookie);
    if (res.body.result === 0) {
        storeConfig.setUserInfo({ userName: res.body.info.userName });
        const userData = storeConfig.getUserInfo();
        new Notification().push({ text: 'initUserInfo_haha', desp: userData.userName })
    } else {
        console.log('cookie 过期!');
    }
}


export default function acfunMain() {
    const secret = getSecretConfig();
    initUserInfo(secret.acfun);
}
