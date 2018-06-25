 // Core
import React, { Component } from 'react';
import moment from 'moment';
import string from 'prop-types';

// Instruments
import Styles from './styles.m.css';

// Components
import { withProfile } from '../HOC/withProfile';



export class Post extends Component {
    // static propTypes = {
    //     avatar:               string.isRequired,
    //     comment:              string.isRequired,
    //     currentUserFirstName: string.isRequired,
    //     currentUserLastName:  string.isRequired,
    // };
    _getCross = () => {
        const {
            currentUserFirstName,
            currentUserLastName,
            firstName,
            lastName,
        } = this.props;

        return `${firstName} ${lastName}` === `${currentUserFirstName} ${currentUserLastName}`
        ? <span className = { Styles.cross } />
        : null;
    }
    render () {
        const {
            avatar,
            comment,
            created,
            firstName,
            lastName,
        } = this.props;

        const cross = this._getCross();

        return (
                <section className = { Styles.post }>
                    { cross }
                    <img src = { avatar } />
                    <a href = '#'>{`${firstName} ${lastName}`}</a>
                    <time>{moment.unix(created).format('MMMMM D h:mm:ss a')}</time>
                    <p>{ this.props.comment }</p>
                </section>
        );
    }
}

export default withProfile(Post);