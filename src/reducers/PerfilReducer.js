import { firebaseAuth, database } from '../config/Config';
import { dataPerfil } from '../actions';

import {
    VALID_NAME,
    INVALID_NAME,
    VALID_REGISTRATION,
    INVALID_REGISTRATION,
    VALID_BIRTHDAY,
    INVALID_BIRTHDAY,
    VALID_AREA_TEMATICA,
    INVALID_AREA_TEMATICA,
    VALID_EMAIL,
    INVALID_EMAIL,
    VALID_PERFIL,
    UPDATE_DATA_USER_SUCESS,
    UPDATE_DATA_USER_ERROR
} from '../actions/types';


const INITIAL_STATE = {
    namePerfil: '',
    cpfPerfil: '',
    birthdayPerfil: '',
    area_tematicaPerfil: '',
    emailPerfil: '',
    idadePerfil: '24',
    errorMessageNamePerfil: '',
    errorMessageCpfPerfil: '',
    errorMessageBirthdayPerfil: '',
};

export default (state = INITIAL_STATE, action) => {
    
    console.log(action.payload);
    switch (action.type) {
        case VALID_PERFIL:
            return { ...state, namePerfil: action.payload.nome, cpfPerfil: action.payload.cpf, birthdayPerfil: action.payload.nascimento, emailPerfil: action.payload.email}
        case VALID_NAME:
            return { ...state, namePerfil: action.payload, errorMessageNamePerfil: '', error: false };
        case INVALID_NAME:
            return { ...state, namePerfil: '', errorMessageNamePerfil: 'Digite um nome válido!', error: true };
        case VALID_REGISTRATION:
            return { ...state, cpfPerfil: action.payload, errorMessageCpfPerfil: '', error: false };
        case INVALID_REGISTRATION:
            return { ...state, cpfPerfil: '', errorMessageCpfPerfil: 'CPF deve conter apenas números!', error: true };
        case VALID_AREA_TEMATICA:
            return { ...state, area_tematicaPerfil: action.payload, errorMessageAreaTematicaPerfil: '', error: false };
        case INVALID_AREA_TEMATICA:
            return {state, area_tematicaPerfil: action.payload, errorMessageAreaTematicaPerfil: 'Escolha uma área temática', error: true };
        case VALID_BIRTHDAY:
            return { ...state, birthdayPerfil: action.payload, errorMessageBirthdayPerfil: '', error: false };
        case INVALID_BIRTHDAY:
            return { ...state, birthdayPerfil: action.payload, errorMessageBirthdayPerfil: 'Digite um formato de data válido!', error: true };
        case UPDATE_DATA_USER_SUCESS:
            return { ...state }
        case UPDATE_DATA_USER_ERROR:
            return { ...state }
        default:
            return state;
    }
}