/**
 * Created by Igor on 07.07.2018.
 */
import { FETCH_POSTS } from './types';

export const fetchPosts = (posts) => ({
    type:    FETCH_POSTS,
    payload: posts,
});
