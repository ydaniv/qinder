if ( typeof Object.entries != 'string' ) {
    Object.entries = function (o) {
        return Object.keys(o).map(k => [k, o[k]]);
    }
}

/**
 * Base files backend client.
 *
 * @class BaseBackend
 */
export default class BaseBackend {
    constructor (config) {
        this.files = [];
    }

    parseFile (file) {
        let parsed = {};
        Object.entries(this.KEY_MAP).forEach(([key, value]) => {
            parsed[key] = typeof value == 'string' ? file[value] : value(file)
        });
        return parsed;
    }

    parseList (list) {
        return list.map(f => this.parseFile(f));
    }
}
