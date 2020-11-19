type UserInfoType = {
    userName?: string;
}

export type AcfunCookiesType = {
    acPasstoken: string;
    auth_key: string;
}

type StoreConfigResult = {
    setCookies: (opt: AcfunCookiesType) => void;
    getCookies: () => string;
    setUserInfo: (userData: UserInfoType) => void;
    getUserInfo: () => UserInfoType;

}

type StoreConfigType = () => StoreConfigResult;

const storeConfigFn: StoreConfigType = function () {
    let cookies = undefined;
    let userInfo: UserInfoType = {};

    return {
        setCookies: (opt) => {
            const { acPasstoken, auth_key } = opt;
            cookies = `acPasstoken=${acPasstoken}; auth_key=${auth_key};`
        },
        getCookies: () => {
            return cookies;
        },

        setUserInfo: (userData) => {
            userInfo = userData;
        },
        getUserInfo: (): UserInfoType => {
            return userInfo;
        },
    };
};

const storeConfig = storeConfigFn();

export { storeConfig };