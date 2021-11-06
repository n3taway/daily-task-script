import Superagent from "superagent";
import { acfunApi } from "./constant";
import { getAcfunCookies } from "../secret";

export default async function throwBanana(feedList: Array<any>) {
  // case1 一来就没蕉
  // case2 投一半没蕉
  const videoList = feedList.filter((item) => !item.isArticle);
  let throwBananaResult = [];
  for (let videoInfo of videoList) {
    const data = await doThrowBanana(videoInfo);
    if (data.error) {
      break;
    } else {
      throwBananaResult.push(data);
    }
  }
  if (throwBananaResult.length) {
    return Promise.resolve(throwBananaResult);
  }
  return Promise.reject({
    title: "投蕉失败",
    content: "🈚️🍌",
    api: `${acfunApi.throwBanana}`,
  });
}

// 投蕉
async function doThrowBanana(videoInfo): Promise<any> {
  const response = await Superagent.post(acfunApi.throwBanana)
    .set("Cookie", getAcfunCookies())
    // .set('referer', 'https://www.acfun.cn/a/ac<x>') //文章
    .set("referer", `https://www.acfun.cn/v/ac${videoInfo.cid}`)
    .type("form")
    .send({
      resourceId: videoInfo.cid,
      // resourceType: 3, //文章
      resourceType: 2,
      count: Math.floor(Math.random() * 3 + 1),
    });
  if (response.body.result === 0) {
    const result = {
      title: videoInfo.title,
      thrownBanana: response.body.extData.bananaRealCount,
      author: videoInfo.author,
    };
    await new Promise((resolve) => setTimeout(resolve, 5000));
    return Promise.resolve(result);
  } else {
    return Promise.resolve({ error: true });
  }
}
