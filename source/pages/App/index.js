import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

// Components
import Composer from 'components/Composer';
import Feed from 'components/Feed';

@hot(module)

export class App extends Component {
    render () {
        return (
            <section>
                <Feed />
            </section>
        );
    }
}
