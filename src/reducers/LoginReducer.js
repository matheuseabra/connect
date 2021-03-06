import {
    VALID_EMAIL_LOGIN,
    INVALID_EMAIL_LOGIN,
    VALID_PASSWORD_LOGIN,
    INVALID_PASSWORD_LOGIN,
    CREDENTIAL_INVALID,
    CREDENTIAL_VALID,
    CHECKING_CREDENTIAL
} from '../actions/types';

const INITIAL_STATE = {
    email: '',
    password: '',
    loading: false,
    errorMessageEmail: '',
    errorMessagePassword: '',
    errorMessageLogin: '',
    error: true
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case VALID_EMAIL_LOGIN:
            return { ...state, email: action.payload, errorMessageEmail: '', error: false };
        case INVALID_EMAIL_LOGIN:
            return { ...state, email: action.payload, errorMessageEmail: 'Digite um e-mail válido!', error: true };
        case VALID_PASSWORD_LOGIN:
            return { ...state, password: action.payload, errorMessagePassword: '', error: false };
        case INVALID_PASSWORD_LOGIN:
            return { ...state, password: action.payload, errorMessagePassword: 'Senha deve ter no mínimo seis caracteres!', error: true };
        case CREDENTIAL_VALID:
            return INITIAL_STATE;
        case CHECKING_CREDENTIAL:
            return {... state, loading: true };
        case CREDENTIAL_INVALID:
            return { ...state, loading: false, errorMessageLogin: 'E-mail ou senha inválido!', error: true }
        default:
            return state;
    }
};
