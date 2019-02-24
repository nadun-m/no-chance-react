import { HTTP_ERR } from './Constants';
import Util from './Util';

class AjaxHelper {
    static call(request) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        if (Util.isLogged()) {
            headers.append('X-Token', Util.getLocals('token'));
        }

        const settings = {
            method: request.method,
            headers: headers 
        };
        
        if (request.method === 'POST') {
            settings.body = JSON.stringify(request.param);
        }

        return new Promise((resolve, reject) => {
            fetch(request.url, settings)
            .then(response => response.json())
            .then(res => {
                if (res.ok) {
                    resolve(res)
                } else {
                    reject(HTTP_ERR[res.error])
                }

            }).catch(err => {
                reject(HTTP_ERR[err.error])
            })
        });
    }
}

export default AjaxHelper;