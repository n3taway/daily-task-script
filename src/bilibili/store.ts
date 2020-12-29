interface UserInfoType {
  userName?: string;
}

export interface SetCookiesType {
  DedeUserID: string;
  SESSDATA: string;
  bili_jct: string;
}

interface StoreConfigResult {
  setCookies: (opt: SetCookiesType) => void;
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
      const { DedeUserID, SESSDATA, bili_jct } = opt;
      cookies = `DedeUserID=${DedeUserID}; SESSDATA=${SESSDATA}; bili_jct=${bili_jct};`;
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
