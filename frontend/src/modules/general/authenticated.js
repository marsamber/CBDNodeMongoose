const authenticated = {
    isLogged() {
        const token = this.getStorage("token");
        if (token) return true;
        return false;
    },
    setStorage(key, value = '', expires) {
        if (expires === undefined || expires === null) {
            // Por defecto: segundos por 1 día
            expires = (24 * 60 * 60);
        }
        else {
            expires = Math.abs(expires);
        }

        let now = Date.now();
        let schedule = now + expires * 1000;
        try {
            localStorage.setItem("expiration", schedule);
            localStorage.setItem(key, value);
        }
        catch (e) {
            console.log('setStorage: Error setting key [' + key + '] in localStorage: ' + JSON.stringify(e));
            return false;
        }
        return true;
    },
    removeStorage(key) {
        try {
            localStorage.removeItem(key);
            localStorage.removeItem("expiration");
        }
        catch (e) {
            console.log('removeStorage: Error removing key [' + key + '] from localStorage: ' + JSON.stringify(e));
            return false;
        }
        return true;
    },
    getStorage(key) {
        let now = Date.now();
        let expiresIn = localStorage.getItem("expiration");

        if (expiresIn === undefined || expiresIn === null) {
            expiresIn = '0';
        }
        // Si esta caducado eliminamos
        if (parseInt(expiresIn) < now) {
            this.removeStorage(key);
            this.removeStorage("expiration");
            return null;
        }
        else {
            try {
                return localStorage.getItem(key);
            }
            catch (e) {
                console.log('getStorage: Error reading key [' + key + '] from localStorage: ' + JSON.stringify(e));
                return null;
            }
        }
    },
    
}

export default authenticated;