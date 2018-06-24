// Core
import React, { Component } from 'react';
import moment from 'moment';

// Instruments
import Styles from './styles.m.css';

export default class Post extends Component {
    render () {
        const { avatar, currentUserFirstName, currentUserLastName } = this.props;

        return (
            <section className = { Styles.post }>
                <img src = { avatar } />
                <a href = '#'>{`${currentUserFirstName} ${currentUserLastName}`}</a>
                <time>{moment().format('MMMMM D h:mm:ss a')}</time>
                <p>Hi lectrum</p>
            </section>
        );
    }
}
