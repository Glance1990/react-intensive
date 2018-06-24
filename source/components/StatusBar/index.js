import React, { Component } from 'react';
import cx from 'classnames';

// Instruments
import Styles from './style.m.css';
import { Consumer } from "../HOC/withProfile";

export default class StatusBar extends Component {
    render () {
        const status = cx({
            [Styles.status]: true,
            [Styles.offline]: true,
        });


        return (
            <Consumer>
                {
                    (context) => (
                        <section className = { Styles.statusBar }>
                            <div className = { status }>
                                <div>Offline</div>
                                <span />
                            </div>
                            <button>
                                <img src = { context.avatar } />
                                <span>{ context.currentUserFirstName }</span>
                                &nbsp;
                                <span>{ context.currentUserLastName }</span>
                            </button>
                        </section>
                    )
                }
            </Consumer>
        );
    }
}
