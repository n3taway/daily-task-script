import Superagent from 'superagent';
import { getServerJiangSCKEY } from '../secret';

const serverJiangApi = (key) => `https://sc.ftqq.com/${key}.send`;

type msgType = {
    title: string,
    content: string,
    callStack?: string,
    api?: string,
}
class Notification {
    async push(msg: msgType) {
        const response = await Superagent
            .post(serverJiangApi(getServerJiangSCKEY()))
            .type('form')
            .send(
                {
                    text: msg.title,
                    desp: `####-------------------\n${msg.content}\n####time\nlocaleTime: ${new Date().toLocaleTimeString()}\n####api\n${msg.api || '空'}\n####callStack\n${msg.callStack || '空'} \n ####runTimeEnv\n ${process.env.RUNTIME_ENV || 'development'}`,
                }
            );

        const res = JSON.parse(response.text) as any;
        console.log('notification push res: ', res);
    }
}

export default Notification;