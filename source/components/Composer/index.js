// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.m.css';

// Components
import { withProfile } from "../HOC/withProfile";
import Counter from 'components/Counter'


export class Composer extends Component {

    state = {
        comment: '',
    };

    _handleFormSubmit = (e) => {
        e.preventDefault();
        this._submitComment();
    }

    _updateComment = (e) => {
        const { value: comment } = e.target;
        this.setState({ comment });
    }

    _submitComment = () => {
        const { comment } = this.state;

        if (!comment) {
            return null;
        }

        const { _createPostAsync } = this.props;

        _createPostAsync(comment);
        this.setState({
            comment : ""
        });

    }

    render () {
        const { comment } = this.state;
        const { avatar,  currentUserFirstName } = this.props;
        return (
                <section className = { Styles.composer }>
                    <img src = { avatar } />
                    <form
                        onSubmit = { this._handleFormSubmit } >
                        <textarea
                            placeholder = { `What is in your mind, ${currentUserFirstName}` }
                            value = { comment }
                            onChange = { this._updateComment }
                        />
                        <input type = 'submit' value = 'Post' />
                    </form>
                </section>
        );
    }
}

export default withProfile(Composer);