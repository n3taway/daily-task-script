import Superagent from 'superagent';
import getSecretConfig from '../secret';

const serverJiangApi = (key) => `https://sc.ftqq.com/${key}.send`;

class Notification {
    async push(msg) {
    const secret = getSecretConfig();
        const response = await Superagent
            .get(serverJiangApi(secret.server_jiang.SCKEY))
            .query({
                text: msg.text,
                desp: msg.desp,
            });
        const res = JSON.parse(response.text) as any;

        console.log('res: ', res);
        
        if (res.errno !== 0) {
            console.log('res: ', res);
        }
    }
}

export default Notification;