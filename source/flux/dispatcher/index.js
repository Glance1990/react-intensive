/**
 * Created by Igor on 07.07.2018.
 */
export default new class Dispatcher {
    constructor (){
        this._listeners = [];
    }

    dispatch (action) {
        this._listeners.forEach((listener) => listener(action));
    }

    register (listener) {
        this._listeners.push(listener);
    }
}();