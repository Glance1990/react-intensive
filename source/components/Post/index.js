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

    render () {
        const {
            avatar,
            comment,
            currentUserFirstName,
            currentUserLastName,
        } = this.props;


        return (
                <section className = { Styles.post }>
                    <span className = { Styles.cross } />
                    <img src = { avatar } />
                    <a href = '#'>{`${currentUserFirstName} ${currentUserLastName}`}</a>
                    <time>{moment().format('MMMMM D h:mm:ss a')}</time>
                    <p>{ this.props.comment }</p>
                </section>
        );
    }
}

export default withProfile(Post);