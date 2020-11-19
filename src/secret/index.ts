import { AcfunCookiesType } from '../acfun/store';
import {
    server_jiang,
    acfun_secret,
    bilibili_secret
} from './secret';

type ServerJiangType = {
    SCKEY: string,
}
type SecretType = {
    acfun: AcfunCookiesType,
    // TODO
    bilibili: any,
    server_jiang: ServerJiangType,
}


function getSecretConfig() {
    let secret: SecretType = {} as SecretType;
    if (process.env.RUNTIME_ENV === 'scf') {
        secret = {
            acfun: {
                acPasstoken: process.env.AC_ACPASSTOKEN,
                auth_key: process.env.AC_AUTH_KEY,
            },
            bilibili: {
                DedeUserID: process.env.BI_DEDEUSERID,
                SESSDATA: process.env.BI_SESSDATA,
                bili_jct: process.env.BI_BILI_JCT,
            },
            server_jiang: {
                SCKEY: process.env.SERVER_JIANG_SCKEY,
            }
        }
    } else {
        secret = {
            acfun: acfun_secret,
            bilibili: bilibili_secret,
            server_jiang: server_jiang
        }
    }
    return secret;
}

export default getSecretConfig;