import React from "react";
import { render, mount } from 'enzyme';
import {Composer} from './'

const mocks = {
    _createPostAsyncMock: jest.fn(() => Promise.resolve()),
    preventDefaultMock: jest.fn(),
};

const avatar = 'http://www.avatar.com/';
const currentUserFirstName = 'Pavel';
const props = {
    _createPostAsync: mocks._createPostAsyncMock,
    currentUserFirstName,
    avatar,
};

const testComment = "Hello Lectrum!";
const initialState = {
    comment: '',
};

const updatedState = {
    comment: testComment,
};

const result = mount(<Composer {...props} />);
const markup = render(<Composer {...props} />);

// Spies
const spies = {
    _updateCommentSpy: jest.spyOn(result.instance(), '_updateComment'),
    _submitCommentSpy: jest.spyOn(result.instance(), '_submitComment'),
    _handleFormCommentSpy: jest.spyOn(result.instance(), '_handleFormSubmit'),
    _submitCommentEnterSpy: jest.spyOn(result.instance(), '_submitCommentEnter'),
}

describe('Composer component', () => {

    describe('Shoul have valid markup elements', () => {
        test('core JSX', () => {
            expect(result.find('section.composer')).toHaveLength(1);
            expect(result.find('form')).toHaveLength(1);
            expect(result.find('textarea')).toHaveLength(1);
            expect(result.find('input')).toHaveLength(1);
            expect(result.find('img')).toHaveLength(1);
        });
    });

    describe('should have valid props', () => {
        test('_createPostAsync should be an async function', async () => {
          await expect(
              result.prop('_createPostAsync')(),
          ).resolves.toBeUndefined();
        });

        test('currentUserFirstName should be a string', () => {
            expect(typeof result.prop('currentUserFirstName')).toBe('string');
        });

        test('avatar should be a string', () => {
            expect(typeof result.prop('avatar')).toBe('string');
        });
    });

    describe('should have valid atate', () => {
        test('comment should be an emptyy string', () => {
            expect(result.state('comment')).toBe('');
        });
    });

    describe('should have core class methods, defined, as class arrow function properties', () => {
        describe('_handleFormSubmit', () => {
            test('should call preventDefault when invoked as onSubmit event handler', () => {
                result.instance()._handleFormSubmit({
                    preventDefault: mocks.preventDefaultMock,
                });

                expect(mocks.preventDefaultMock).toHaveBeenCalledTimes(1);
            });

            // Check this method before starting!!!!!!
            test('should call this._submitComment class method', () => {
                expect(spies._handleFormCommentSpy).toHaveBeenCalledTimes(1);
                jest.clearAllMocks();
            });
        });

        describe('_submitComment', () => {
            afterEach(() => {
                result.setState(initialState);
                jest.clearAllMocks();
            });

            test('should do nothing if state.comment property is an empty string', () => {
                result.instance()._submitComment();

                expect(spies._submitCommentSpy).toHaveReturnedWith(null);
                expect(mocks._createPostAsyncMock).not.toHaveBeenCalled();
                expect(result.state()).toEqual(initialState);

            });

            test('should call this._createPostAsync with a comment as an argument and reset state.comment', () => {
                result.setState({
                    comment: testComment,
                });
                result.instance()._submitComment();

                expect(mocks._createPostAsyncMock).toHaveBeenNthCalledWith(
                    1,
                    testComment,
                );
                expect(result.state()).toEqual(initialState);
            })
        })
    })
});