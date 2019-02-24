import _ from 'lodash';

class Util {
    static isLogged() {
        return !_.isEmpty(this.getLocals('token'))
    }

    static setLocals(locals) {
        localStorage.setItem('token', locals.token);
        localStorage.setItem('username', locals.username);
    }

    static getLocals(local) {
        return localStorage.getItem(local);
    }

    static removeLocals(keys) {
        _.each(keys, key => localStorage.removeItem(key));
    }
}

export default Util;