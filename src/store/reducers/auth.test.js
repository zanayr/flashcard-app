import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe ('auth reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            error: null,
            isLoading: false,
            token: null,
            user: null,
        });
    });

    it('should store the token upon login', () => {
        expect(reducer({
            error: null,
            isLoading: false,
            token: null,
            user: null,
        }, {
            type: actionTypes.AUTH_SUCC,
            payload: {
                token: 'some-token',
                user: 'some-user-id'
            }
        })).toEqual({
            error: null,
            isLoading: false,
            token: 'some-token',
            user: 'some-user-id'
        });
    });
});