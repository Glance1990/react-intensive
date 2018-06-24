// Core
import React, { Component } from 'react';

// Instruments
import avatar from 'theme/assets/homer.png';
import Styles from './styles.m.css';


export default class Composer extends Component {
    render () {
        const avatar = this.props.avatar;
        const firstName = this.props.currentUserFirstName;
        return (
            <section className = { Styles.composer }>
                <img src = { avatar } />
                <form>
                    <textarea placeholder = { `What is in your mind, ${firstName}` } />
                    <input type = 'submit' value = 'Post' />
                </form>
            </section>
        );
    }
}
