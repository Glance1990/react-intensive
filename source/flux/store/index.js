// Core
import { EventEmitter } from 'events';

// Instruments
import dispatcher from 'flux/dispatcher';
import {
    FETCH_POSTS,
    START_SPINNING,
    STOP_SPINNING
} from 'flux/actions/types';

export default new class PostsStore extends EventEmitter {
    constructor () {
        super();

        this.store = {
            posts: [],
        };

        dispatcher.register((action) => {
            console.log(action);
            switch (action.type) {
                case FETCH_POSTS: {
                    this.fetchPosts(action.payload);
                    break;
                }
                case START_SPINNING:
                case STOP_SPINNING: {
                    this.setSpinningState(action.payload);
                    break;
                }
                default:
                    return false;
            }
        });
    }

    subscribe (callback) {
        console.log('change', callback);
        this.on('change', callback);
    }

    unsubscribe (callback) {
        this.removeListener('change', callback);
    }

    update () {
        console.log(`store: ${JSON.stringify(this.store)}`);
        this.emit('change');
    }

    getStore () {
        return this.store;
    }

    getPosts () {
        return this.store.posts;
    }

    getSpinningStatus () {
        return this.store.isSpinning;
    }

    fetchPosts (posts) {
        this.store.posts = posts;
        this.update();
    }

    setSpinningState (status) {
        this.store.isSpinning = status;
        this.update();
    }
}();
