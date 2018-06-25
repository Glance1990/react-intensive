import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

// Instruments
import avatar from 'theme/assets/homer.png';

// Components
import Feed from 'components/Feed';
import { Provider } from 'components/HOC/withProfile';
import Catcher from 'components/Catcher';

const options = {
    avatar,
    currentUserFirstName: 'Paul',
    currentUserLastName:  'Kadysh',
};


@hot(module)
export class App extends Component {
    render () {
        return (
            <Catcher>
                <Provider value = { options }>
                    <Feed { ...options } />
                </Provider>
            </Catcher>
        );
    }
}
