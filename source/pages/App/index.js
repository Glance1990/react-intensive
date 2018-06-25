import React, { Component, StrictMode } from 'react';
import { hot } from 'react-hot-loader';

// Instruments
import avatar from 'theme/assets/homer.png';

// Components
import Feed from 'components/Feed';
import { Provider } from 'components/HOC/withProfile';

const options = {
    avatar,
    currentUserFirstName: 'Paul',
    currentUserLastName:  'Kadysh',
};


@hot(module)
export class App extends Component {
    render () {
        return (
            <StrictMode>
                <Provider value = { options }>
                    <Feed { ...options } />
                </Provider>
            </StrictMode>
        );
    }
}
