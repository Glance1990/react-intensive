// Core
import React, { Component } from 'react';
import moment from 'moment';

// Instruments
import avatar from 'theme/assets/homer.png';

export default class Post extends Component {
    render () {
        return (
            <section>
                <img src= { avatar } />
                <a href="#">Paul</a>
                <time>{moment().format('MMMMM D h:mm:ss a')}</time>
                <p>Hi lectrum</p>
            </section>
        )
    }
}

