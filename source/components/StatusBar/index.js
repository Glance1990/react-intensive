import React, { Component } from 'react';
import cx from 'classnames';
import { string  } from 'prop-types';
import { bool } from 'prop-types';

// Instruments
import Styles from './style.m.css';
//import { Consumer } from "../HOC/withProfile";

// Components
import { withProfile } from "../HOC/withProfile";

export class StatusBar extends Component {
    static propTypes = {
        avatar: string.isRequired,
        currentUserFirstName: string.isRequired,
        currentUserLastName: string.isRequired,
        online: bool.isRequired,
    }

    render () {
        const { online, avatar,  currentUserFirstName, currentUserLastName } = this.props;
        const status = cx({
            [Styles.status]: true,
            [Styles.offline]: !online,
            [Styles.online]: online,
        });

        const statusString = online ? 'Online' : 'Offline';

        return (
                <section className = { Styles.statusBar }>
                    <div className = { status }>
                        <div>{ statusString }</div>
                        <span />
                    </div>
                    <button>
                        <img src = { avatar } />
                        <span>{ currentUserFirstName }</span>
                        &nbsp;
                        <span>{ currentUserLastName }</span>
                    </button>
                </section>
        );
    }
}

export default withProfile(StatusBar);