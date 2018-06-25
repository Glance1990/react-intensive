// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.m.css';

// Components
import { Consumer } from "../HOC/withProfile";


export default class Composer extends Component {
    constructor () {
        super();
        this.handleUpdate = ::this._handleUpdate;
        this.handleSubmit = ::this._handleSubmit;
        //this.handleUpdate = this._handleUpdate.bind(this);

    }
    state = {
        comment: '',
    };

    _handleUpdate (e) {
        const { value: comment } = e.target;
        this.setState({ comment });
    }

    _handleSubmit (e) {
        e.preventDefault();
        const { comment } = this.state;

        if (comment) {
            const { createPost } = this.props;
            createPost(comment);
            this.setState({ comment : "" });
        }

    }

    render () {
        const { comment } = this.state;
        return (
            <Consumer>
                {
                    (context) => (
                        <section className = { Styles.composer }>
                            <img src = { context.avatar } />
                            <form
                                onSubmit = { this.handleSubmit } >
                                <textarea
                                    placeholder = { `What is in your mind, ${context.currentUserFirstName}` }
                                    value = { comment }
                                    onChange = { this.handleUpdate }
                                />
                                <input type = 'submit' value = 'Post' />
                            </form>
                        </section>
                    )
                }
            </Consumer>
        );
    }
}
