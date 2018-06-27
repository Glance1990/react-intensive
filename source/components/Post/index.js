// Core
import React, { Component } from "react";
import moment from "moment";
import string from "prop-types";
import func from "prop-types";

// Instruments
import Styles from "./styles.m.css";

// Components
import { withProfile } from "../HOC/withProfile";
import Like from "components/Like";

export class Post extends Component {
    // static propTypes = {
    //     avatar:               string.isRequired,
    //     comment:              string.isRequired,
    //     currentUserFirstName: string.isRequired,
    //     currentUserLastName:  string.isRequired,
    //     _likePostAsync:  func.isRequired,
    // };

    _removePost = () => {
        const { _removePostAsync, id } = this.props;

        _removePostAsync(id);
    };
    _getCross = () => {
        const {
            currentUserFirstName,
            currentUserLastName,
            firstName,
            lastName,
        } = this.props;

        return `${firstName} ${lastName}` ===
            `${currentUserFirstName} ${currentUserLastName}` ? (
                <span className = { Styles.cross } onClick = { this._removePost } />
            ) : null;
    };
    render () {
        const {
            _likePostAsync,
            avatar,
            comment,
            created,
            firstName,
            lastName,
            id,
            likes,
        } = this.props;

        const cross = this._getCross();

        return (
            <section className = { Styles.post }>
                {cross}
                <img src = { avatar } />
                <a href = '#'>{`${firstName} ${lastName}`}</a>
                <time>{moment.unix(created).format("MMMMM D h:mm:ss a")}</time>
                <pre>{comment}</pre>
                <Like _likePostAsync = { _likePostAsync } id = { id } likes = { likes } />
            </section>
        );
    }
}

export default withProfile(Post);
