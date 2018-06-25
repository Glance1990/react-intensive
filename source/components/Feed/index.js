import React, { Component } from 'react';
import { string } from 'prop-types';

// Instruments
import Styles from './styles.m.css';
import { getUniqueID } from 'instruments';

// Compoonents
import Composer from 'components/Composer';
import Post from 'components/Post';
import StatusBar from "../StatusBar";
import Catcher from 'components/Catcher';
import Counter from 'components/Counter';
import { api } from '../../REST/api';
import Spinner from 'components/Spinner';



export default class Feed extends Component {
    // static propTypes = {
    //     avatar:               string.isRequired,
    //     currentUserFirstName: string.isRequired,
    //     currentUserLastName:  string.isRequired,
    // };

    static defaultProps = {
        currentUserFirstName: 'Jon',
    };

    state = {
        posts: [],
        isSpinning: false,
    };

    componentDidMount () {
        console.log('componentDidMount');
        this._fetchPostAsync();
    }

    _setPostsFetchingState = (state) => {
        this.setState({
            isSpinning: state,
        })
    }

    _fetchPostAsync = async () => {
        try {
            this._setPostsFetchingState(true);
            const posts = await api.fetchPosts();

            this.setState({
                posts,
                isSpinning: false,
            })
        } catch ({ message }) {
            console.error(message)
        } finally {
            this._setPostsFetchingState(false);
        }

    }

    componentWillMount () {
        console.log('componentWillMount');
    }

    _createPostAsync = async (comment) => {
        try {
            this._setPostsFetchingState(true);

            const post = await api.createPost(comment);

            this.setState(( prevState ) => ({
                posts: [post, ...prevState.posts],
            }));
        } catch ({ message }) {
            console.error(message);
        } finally {
            this._setPostsFetchingState(false);
        }

    }

    render () {
        console.log('render');
        const { avatar, currentUserFirstName } = this.props;
        const { posts: userPosts, isSpinning } = this.state;

        const posts = userPosts.map((post, index) => (
            <Catcher key = {post.id}>
                <Post {...post}/>
            </Catcher>
        ))

        return (
            <section className = { Styles.feed } >
                <Spinner isSpinning = { isSpinning } />
                <StatusBar />
                <Composer
                    _createPostAsync = { this._createPostAsync }
                    avatar = { avatar }
                    currentUserFirstName = { currentUserFirstName }
                />
                <Counter count = { posts.length } />
                { posts }
            </section>
        );
    }
}
