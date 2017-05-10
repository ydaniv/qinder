let storage = {
    getItem  : function (key) {
        try {
            return localStorage.getItem(key);
        }
        catch (e) {
        }
    },
    setItem: function (key, value) {
        try {
            return localStorage.setItem(key, value);
        }
        catch (e) {
        }
    }
};

try {
    // do a test attempting to set item in localStorage
    localStorage.setItem('test', 'da test');
    localStorage.removeItem('test');
}
catch (e) {
    // if it failed fall back to simple memory storage
    let session_storage = {};
    storage.getItem = function (key) {
        return session_storage[key];
    };
    storage.setItem = function (key, value) {
        session_storage[key] = value;
    };
}

export default storage;
