import {
    server_jiang,
    acfun_secret,
    bilibili_secret
} from './secret';

type ServerJiangType = {
    SCKEY: string,
}
type AcfunCookiesType = {
    acPasstoken: string;
    auth_key: string;
    _did: string;
}
type SecretType = {
    acfun: AcfunCookiesType,
    // TODO
    bilibili: any,
    server_jiang: ServerJiangType,
}


function secretConfig() {
    let secret: SecretType = {} as SecretType;
    if (process.env.RUNTIME_ENV === 'scf') {
        secret = {
            acfun: {
                acPasstoken: process.env.AC_ACPASSTOKEN,
                auth_key: process.env.AC_AUTH_KEY,
                _did: process.env.AC__DID,
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

export function getAcfunCookies() {
    const secret = secretConfig();
    const { acfun: { acPasstoken, auth_key, _did } } = secret;
    const acfunCookies = `acPasstoken=${acPasstoken}; auth_key=${auth_key};_did=${_did};`
    return acfunCookies;
}


export function getServerJiangSCKEY() {
    const secret = secretConfig();
    return secret.server_jiang.SCKEY;
}
