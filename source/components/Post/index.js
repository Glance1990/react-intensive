// Core
import React, { Component } from 'react';
import moment from 'moment';
import string from 'prop-types';

// Instruments
import Styles from './styles.m.css';

// Components
import { Consumer } from "../HOC/withProfile";

export default class Post extends Component {
    static propTypes = {
        avatar:               string.isRequired,
        currentUserFirstName: string.isRequired,
        currentUserLastName:  string.isRequired,
    };

    render () {
        return (
            <Consumer>
                {
                    (context) => (
                        <section className = { Styles.post }>
                            <span className = { Styles.cross } />
                            <img src = { context.avatar } />
                            <a href = '#'>{`${context.currentUserFirstName} ${context.currentUserLastName}`}</a>
                            <time>{moment().format('MMMMM D h:mm:ss a')}</time>
                            <p>Hi lectrum</p>
                        </section>
                    )
                }
            </Consumer>
        );
    }
}
