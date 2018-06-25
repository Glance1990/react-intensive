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
    };

    componentDidMount () {
        console.log('componentDidMount');
    }

    componentWillMount () {
        console.log('componentWillMount');
    }

    _createPostAsync = (comment) => {

        this.setState(( prevState ) => ({
            posts: [{ comment, _id: getUniqueID()  }, ...prevState.posts],
        }));

        // this.setState(({ posts }) => ({
        //     posts: [{ comment }, ...posts],
        // }));
    }

    render () {
        console.log('render');
        const { avatar, currentUserFirstName } = this.props;
        const { posts: userPosts } = this.state;

        const posts = userPosts.map((post, index) => (
            <Catcher key = {post._id}>
                <Post {...post}/>
            </Catcher>
        ))

        return (
            <section className = { Styles.feed } >
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
