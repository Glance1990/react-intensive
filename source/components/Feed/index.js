import React, { Component } from 'react';

// Instruments
import Styles from './styles.m.css';

// Compoonents
import Composer from 'components/Composer';
import Post from 'components/Post';

export default class Feed extends Component {


    render () {
        const options = this.props;
        console.log(this.props);


        return (
            <section className = { Styles.feed } >
                <Composer {...options} />
                <Post {...options} />
            </section>
        );
    }
}
