import React, { Component, createContext } from "react";
import postsStore from 'flux/store';

const { Provider, Consumer } = createContext();

const withStore = (Enhancebale) =>
    class withStore extends Component {
        state = postsStore.getStore();

        componentDidMount () {
            postsStore.subscribe(this._onStoreChange);
        }
        componentWillMount () {
            postsStore.unsubscribe(this._onStoreChange);
        }

        _onStoreChange = () => {
            const store = postsStore.getStore();

            this.setState({
                ...store,
            });
        }

        render () {
            return (
                <Enhancebale { ...this.state } { ...this.props } />
            );
        }
    };

export { withStore };
