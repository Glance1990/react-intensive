// Core
import React, { Component } from 'react';

// Instruments
import avatar from 'theme/assets/homer.png';

export default class Composer extends Component {
    render () {
        return (
            <section>
                <img src = { avatar } />
                <form>
                    <textarea placeholder = { `What is in your mind, Andrey` } />
                    <input type = 'submit' value = 'Post' />
                </form>
            </section>
        );
    }
}
