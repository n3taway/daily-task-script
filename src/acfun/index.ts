import Notification from "../notification";
import followFeed from "./followFeed";
import throwBanana from "./throwBanana";
import personalInfo from "./personalInfo";

export default async function acfunMain() {
  try {
    await personalInfo();
    const feedListResult = await followFeed();
    const throwBananaResult = await throwBanana(feedListResult);
    const personalResult = await personalInfo();
    let contentText = "";
    throwBananaResult.forEach((item: any) => {
      contentText = contentText.concat(
        `\n 蕉易：${item.thrownBanana} \n \n 视频作者：${item.author} \n \n 视频名称：${item.title} \n ----------------- \n`
      );
    });
    contentText = contentText.concat(
      `\n ${personalResult.userName}剩余普通香蕉${personalResult.banana} \n`
    );
    new Notification().push({
      title: "今日蕉易",
      content: contentText,
    });
  } catch (error) {
    new Notification().push({
      title: `${error.title}`,
      content: `${error.content}`,
      api: `${error.api}`,
    });
  }
}
