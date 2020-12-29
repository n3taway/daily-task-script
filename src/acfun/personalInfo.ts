import Superagent from "superagent";
import { acfunApi } from "./constant";
import { getAcfunCookies } from "../secret";

export default async function personalInfo() {
  try {
    const res = await Superagent.get(acfunApi.userInfo).set(
      "Cookie",
      getAcfunCookies()
    );
    if (res.body.result === 0) {
      // new Notification().push({
      //     title: '用户信息获取成功',
      //     content: `acfun 用户名称：${res.body.info.userName}`,
      //     api: `${res.req._header}`,
      // });
      // 获取内容推送
      return Promise.resolve(res.body.info);
    } else {
      return Promise.reject({
        title: "用户信息获取失败",
        content: `${res.body.error_msg}`,
        api: `${acfunApi.userInfo}`,
      });
    }
  } catch (error) {
    return Promise.reject({
      title: "用户信息获取失败",
      content: "runTime error",
      api: `${acfunApi.userInfo}`,
    });
  }
}
