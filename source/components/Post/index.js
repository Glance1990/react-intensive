// Core
import React, { Component } from 'react';
import moment from 'moment';

// Instruments
import avatar from 'theme/assets/homer.png';
import Styles from './styles.m.css';

export default class Post extends Component {
    render () {
        const avatar = this.props.avatar;
        const firstName = this.props.currentUserFirstName;
        return (
            <section className = { Styles.post }>
                <img src = { avatar } />
                <a href ="#">{ firstName }</a>
                <time>{moment().format('MMMMM D h:mm:ss a')}</time>
                <p>Hi lectrum</p>
            </section>
        )
    }
}

