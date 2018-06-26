// Core
import React, { Component } from 'react';
import { string, func, arrayOf, shape } from 'prop-types';
import cx from 'classnames';

// Instruments
import Styles from './style.m.css';
import { withProfile } from 'components/HOC/withProfile';

class Like extends Component {
    static propType = {
        _likePostAsync: func.isRequired,
        id: string.isRequired,
        likes: arrayOf(
            shape({
                firstName: string.isRequired,
                lastName: string.isRequired,
            })
        ).isRequired,
    }

    static defaultProps = {
        likes: [],
    }

    state = {
        showLikers: false,
    }

    _showLikers = () => {
        this.setState({
            showLikers: true,
        })
    }

    _hideLikers = () => {
        this.setState({
            showLikers: false,
        })
    }

    _likePost = () => {
        const { _likePostAsync, id } = this.props;
        _likePostAsync(id);
    }

    _getLikedByMe = () => {
        const { currentUserFirstName, currentUserLastName, likes } = this.props;

        return likes.some((firstName, lastName) => {
            `${firstName} ${lastName}` ===
            `${currentUserFirstName} ${currentUserLastName}`
        })
    }

    _getLikeStyles = () => {
        const likedByMe = this._getLikedByMe();

        return cx(Styles.icon, {
            [Styles.liked]: likedByMe,
        })
    }

    _getLikersList = () => {
        const { showLikers } = this.state;
        const { likes, id } = this.props;

        const likesJSX = likes.map(({firstName, lastName}) => (
            <li key={ id }>{`${firstName} ${lastName}`}</li>
        ));

        return likes.length && showLikers ? <ul>{ likesJSX }</ul> : null;
    }

    _getLikesDescription = () => {

        const {
            likes,
            currentUserFirstName,
            currentUserLastName,
        } = this.props;

        let result = likes.length;

        const likedByMe = this._getLikedByMe();

        if (likes.length === 1 && likedByMe) {
            `${currentUserFirstName} ${currentUserLastName}`
        } else if (likes.length === 2 && likedByMe) {
            result = `You and ${likes.length - 1} others`;
        } else if (likedByMe) {
            result = `You and ${likes.length - 1} others`;
        }
        return result;
    }

    render () {
        const likes = this._getLikersList();
        const likeStyles = this._getLikeStyles();
        const likesDescription = this._getLikesDescription();

        return (
            <section className= { Styles.like } >
                <span className= { likeStyles } onClick = { this._likePost }>
                    Like
                </span>
                <div>
                    { likes }
                    <span
                        onMouseEnter={ this._showLikers }
                        onMouseLeave={ this._hideLikers }
                    >
                        { likesDescription }
                    </span>
                </div>
            </section>

        );
    }
}

export default withProfile(Like);
