import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

// Instruments
import avatar from 'theme/assets/homer.png';

// Components
import Composer from 'components/Composer';
import Feed from 'components/Feed';

const options = {
    avatar,
    currentUserFirstName: 'Paul',
    currentUserLastName:  'Kadysh',
};


@hot(module)
export class App extends Component {
    render () {
        return (
            <section>
                <Feed {...options } />
            </section>
        );
    }
}
