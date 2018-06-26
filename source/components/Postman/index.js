// Core
import React, { Component } from 'react';

// Instruments
import Styles from './style.m.css';

// Components
import { withProfile } from "../HOC/withProfile";

export class Postman extends Component {
    static propTypes = {

    }
    render () {
        const { avatar,
                currentUserFirstName,
                } = this.props;
        return (
            <section className = { Styles.postman }>
                <img src = { avatar } />
                <span>Welcomen, <b> {currentUserFirstName}</b></span>
            </section>
        )
    }
}

export default withProfile(Postman);