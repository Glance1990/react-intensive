import React from "react";
import { render, mount } from 'enzyme';
import { Post } from './';

const currentUserFirstName = 'Paul';
const currentUserLastName = 'Kadysh';
const firstName = 'Paul';
const lastName = 'Kadysh';


const props = {
    currentUserFirstName,
    currentUserLastName,
    firstName,
    lastName,
};

const result = mount(<Post { ...props } />);

// describe('Post component', () => {
//     describe('Should have valid markup elements', () => {
        test('core JSX', () => {
            expect(result.find('img')).toHaveLength(1);
        });
//     });
// });
