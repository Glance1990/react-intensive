import React, { Component } from 'react';
import { string } from 'prop-types';
import gsap from 'gsap';
import { Transition, CSSTransition, TransitionGroup } from 'react-transition-group';

// Instruments
import Styles from './styles.m.css';
import { api } from '../../REST/api';
import { GROUP_ID } from '../../REST/config';
import { socket } from '../../socket/init';

// Compoonents
import Composer from 'components/Composer';
import Post from 'components/Post';
import StatusBar from "../StatusBar";
import Catcher from 'components/Catcher';
import Counter from 'components/Counter';
import Postman from 'components/Postman';

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
        online: false,
        isAppear: true,
    };

    componentDidMount () {
        const { currentUserFirstName, currentUserLastName } = this.props;
        this._fetchPostAsync();

        socket.on('connect', () => {
            this.setState({
                online: true,
            });
        });

        socket.on('disconnect', () => {
            this.setState({
                online: false,
            });
        });

        socket.emit('join', GROUP_ID);

        // event on creating posts
        socket.on('create', (postJSON) => {
            const { data: createdPost, meta } = JSON.parse(postJSON);

            if (`${currentUserFirstName} ${currentUserLastName}`
                !==
                `${meta.authorFirstName} ${meta.authorLastName}`

            ) {
                this.setState(({ posts }) => ({
                    posts: [createdPost, ...posts],
                }));
            }
            console.log(createdPost, meta);
        })

        socket.on('like', (postJSON) => {
            const { data: likedPost, meta } = JSON.parse(postJSON);

            if (`${currentUserFirstName} ${currentUserLastName}`
                !==
                `${meta.authorFirstName} ${meta.authorLastName}`

            ) {
                this.setState(({ posts }) => ({
                    posts: posts.map((post) => post.id === likedPost.id ? likedPost : post),
                }));
            }
        })
        socket.on('remove', (postJSON) => {
            const { data: removePost, meta } = JSON.parse(postJSON);

            if (`${currentUserFirstName} ${currentUserLastName}`
                !==
                `${meta.authorFirstName} ${meta.authorLastName}`

            ) {
                this.setState(({ posts }) => ({
                    posts: posts.filter((post) => post.id !== removePost.id),
                }));
            }
        })
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

    _likePostAsync = async (id) => {
        try {
            this._setPostsFetchingState(true);

            const likedPost = await api.likePost(id);

            this.setState(({ posts }) => ({
                posts: posts.map((post) => post.id === id ? likedPost : post),
            }));
        } catch ({ message }) {
            console.error(message);
        } finally {
            this._setPostsFetchingState(false);
        }
    }
    _removePostAsync = async (id) => {
        try {
            this._setPostsFetchingState(true);

            const likedPost = await api.removePost(id);

            this.setState(({ posts }) => ({
                posts: posts.filter((post) => post.id !== id ),
            }));
        } catch ({ message }) {
            console.error(message);
        } finally {
            this._setPostsFetchingState(false);
        }
    }

    _animateComposerAppear = (composer) => {
        gsap.fromTo(composer, 2, {opacity: 0, y: -150, x: -150}, {opacity: 1, y: 0, x: 0})
    }
    _animatePostmanAppearEnter = (postman) => {
        gsap.fromTo(postman, 2, {opacity: 0, x: 450}, {opacity: 1, x: 0,
            onComplete: () => {
                setTimeout(() => {
                    this.setState({
                        isAppear: false
                    })
                }, 5000)
            }});
    }
    _animatePostmanAppearExit = (postman) => {
        console.log(postman);
        //gsap.fromTo(postman, 3, {opacity: 0, x: 450}, {opacity: 1, y: 0, x: 0});
        gsap.fromTo(postman, 5, {x: 0}, {x: 450});

    }

    render () {
        const { posts: userPosts, isSpinning, online, isAppear } = this.state;
        const { avatar, currentUserFirstName } = this.props;

        const posts = userPosts.map((post, index) => (
            <CSSTransition
                classNames = { {
                    enter: Styles.postInStart,
                    enterActive: Styles.postInEnd,
                    exit: Styles.postOutStart,
                    exitActive: Styles.postOutEnd,
                } }
                key = {post.id}
                timeout = { {enter: 500, exit: 400} }>
                <Catcher>
                    <Post
                        {...post}
                        _likePostAsync = { this._likePostAsync }
                        _removePostAsync = { this._removePostAsync }
                    />
                </Catcher>
            </CSSTransition>
        ))

        return (
            <section className = { Styles.feed } >
                <Spinner isSpinning = { isSpinning } />
                <StatusBar online = { online } />
                <Transition
                    appear
                    in
                    timeout={ 2000 }
                    onEnter={this._animateComposerAppear }
                    >
                    <Composer
                        _createPostAsync = { this._createPostAsync }
                        avatar = { avatar }
                        currentUserFirstName = { currentUserFirstName }
                    />
                </Transition>
                <Counter count = { posts.length } />
                <TransitionGroup>
                    { posts }
                </TransitionGroup>
                <Transition
                    appear
                    in = { isAppear }
                    timeout = { 5000 }
                    onEnter = {this._animatePostmanAppearEnter }
                    onExit = {this._animatePostmanAppearExit }
                    >
                    <Postman />
                </Transition>
            </section>
        );
    }
}
