import React, { Component, createContext } from "react";

const { Provider, Consumer } = createContext();

const withProfile = (Enhancebale) =>
    class WithProfile extends Component {
        render () {
            return (
                <Consumer>
                    {(context) => <Enhancebale { ...context } { ...this.props } />}
                </Consumer>
            );
        }
    };

export { Provider, Consumer, withProfile };
