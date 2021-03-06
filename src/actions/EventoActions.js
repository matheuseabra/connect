import { Alert } from 'react-native';
import { firebaseAuth, database } from '../config/Config';
import { validateDates, validateHours, validateEvent } from '../helpers/HandleData';
import {
    MARKER, CLOSE_MODAL, SAVE_EVENT_FIELD_CHANGE, INVALID_START_EVENT_DATE, INVALID_START_EVENT_HOUR,
    INVALID_END_EVENT_DATE, INVALID_END_EVENT_HOUR, LOADING_EVENT, SHOW_HELPER_EVENT, CLOSE_HELPER_EVENT, CREATE_EVENT_SUCCESS, CREATE_EVENT_FAIL, EDIT_EVENT,
    EVENT_EDIT_DATA, EVENT_EDIT_HORA, SAVED_EDITED_EVENT, EVENTS_TO_SHOW_SUCCESS, SEARCHING_EVENT, SEARCHED_EVENTO,
    CLEAR, INICIAL_POSITION, MOVING, CLOSE_LOADING_EVENT_SCREEN
} from './types';

export const showMarkerAndModal = (e) => {
    return { type: MARKER, payload: { coordinate: e.nativeEvent.coordinate } };
};

export const closeModal = () => {
    return { type: CLOSE_MODAL };
};

export const eventFieldChange = ({ prop, value }) => {
    if (prop === 'data_inicio') {
        const validate = validateDates(value);
        if (validate) return { type: SAVE_EVENT_FIELD_CHANGE, payload: { prop, value } };

        return { type: INVALID_START_EVENT_DATE, payload: { prop, value } };
    }
    if (prop === 'hora_inicio') {
        const validate = validateHours(value);
        if (validate) return { type: SAVE_EVENT_FIELD_CHANGE, payload: { prop, value } };

        return { type: INVALID_START_EVENT_HOUR, payload: { prop, value } };
    }
    if (prop === 'data_fim') {
        const validate = validateDates(value);
        if (validate) return { type: SAVE_EVENT_FIELD_CHANGE, payload: { prop, value } };

        return { type: INVALID_END_EVENT_DATE, payload: { prop, value } };
    }
    if (prop === 'hora_fim') {
        const validate = validateHours(value);
        if (validate) return { type: SAVE_EVENT_FIELD_CHANGE, payload: { prop, value } };

        return { type: INVALID_END_EVENT_HOUR, payload: { prop, value } };
    }

    return { type: SAVE_EVENT_FIELD_CHANGE, payload: { prop, value } };
};
export const showHelper = () => {
    return { type: SHOW_HELPER_EVENT };
};

export const closeEventHelper = () => {
    return { type: CLOSE_HELPER_EVENT };
};

export const saveEvent = (evento) => {
    return (dispatch) => {
        dispatch({ type: LOADING_EVENT });
        const validate = validateEvent(evento);
        if (validate) {
            const usuario = firebaseAuth().currentUser;
            database().ref('evento/').push({
                nome: evento.nome,
                descricao: evento.descricao,
                local: evento.local,
                area_tematica: evento.area_tematica,
                coords: evento.coords,
                usuario_id: usuario.uid,
                data_inicio: evento.data_inicio,
                hora_inicio: evento.hora_inicio,
                data_fim: evento.data_fim,
                hora_fim: evento.hora_fim
            }).then((response) => {
                database().ref(`usuario/${usuario.uid}/`).once('value', snap => {
                    const user = snap.val();
                    if (Object.prototype.hasOwnProperty.call(user, 'eventos_criados')) {
                        database().ref().child(`usuario/${usuario.uid}/`).update({ eventos_criados: [...user.eventos_criados, response.path.pieces_[1]] })
                            .then(() => { dispatch({ type: CREATE_EVENT_SUCCESS }); });
                    } else {
                        database().ref().child(`usuario/${usuario.uid}/`).update({ eventos_criados: [response.path.pieces_[1]] })
                            .then(() => { dispatch({ type: CREATE_EVENT_SUCCESS }); });
                    }
                });
            });
        } else {
            dispatch({ type: CREATE_EVENT_FAIL });
        }
    };
};

export const editEvent = ({ prop, value }) => {
    if (prop === 'data') {
        const validate = validateDates(value);
        if (validate) return { type: EDIT_EVENT, payload: { prop, value } };

        return { type: EVENT_EDIT_DATA, payload: { prop, value } };
    } else if (prop === 'hora') {
        const validate = validateHours(value);
        if (validate) return { type: EDIT_EVENT, payload: { prop, value } };

        return { type: EVENT_EDIT_HORA, payload: { prop, value } };
    }
    return { type: EDIT_EVENT, payload: { prop, value } };
};

export const saveNewEventCoords = ({ id, coords }) => {
    return (dispatch) => {
        database().ref(`evento/${id}/coords`).update({
            lat: coords.lat,
            long: coords.long
        }).then(() => {
            const prop = 'coords';
            dispatch({ type: EDIT_EVENT, payload: { prop, coords } });
        });
    };
};

export const saveEditedEvent = (evento) => {
    const validate = validateEvent(evento);
    const id = evento.id;
    if (validate) {
        return (dispatch) => {
            const prop = 'loading';
            const value = true;
            dispatch({ type: EDIT_EVENT, payload: { prop, value } });
            const usuario = firebaseAuth().currentUser;
            database().ref(`evento/${id}/`).update({
                nome: evento.nome,
                descricao: evento.descricao,
                local: evento.local,
                area_tematica: evento.area_tematica,
                coords: evento.coords,
                usuario_id: usuario.uid,
                data_inicio: evento.data_inicio,
                hora_inicio: evento.hora_inicio,
                data_fim: evento.data_fim,
                hora_fim: evento.hora_fim
            }).then(() => {
                dispatch({ type: SAVED_EDITED_EVENT });
                database().ref(`evento/${id}`).on('value', snap => {
                    const evento = snap.val();
                    const key = Object.keys(evento);
                    key.forEach(prop => {
                        const value = evento[prop];
                        dispatch({ type: EDIT_EVENT, payload: { prop, value } });
                    });
                });
            });
        };
    }
};

export const searchEvento = (nomeEvento, eventos) => {
    return (dispatch) => {
        dispatch({ type: SEARCHING_EVENT, payload: nomeEvento });

        const eventosAchados = [];

        if (nomeEvento !== '') {
            eventos.map(eventoVerificado => {
                if (eventoVerificado.nome.includes(nomeEvento)) {
                    eventosAchados.push(eventoVerificado);
                }
                return null;
            });
            searchedEventosSuccess(dispatch, eventosAchados);
        }
    };
};

const searchedEventosSuccess = (dispatch, eventos) => {
    dispatch({ type: SEARCHED_EVENTO, payload: eventos });
};

export const serachEventsToShow = () => {
    return (dispatch) => {
        dispatch({ type: CLEAR });
        database().ref('evento')
            .on('value', snap => {
                if (snap.val() === null) {
                    Alert.alert(
                        'Connect',
                        'Ainda não há eventos cadastrados. Crie um evento clicando no botão abaixo!',
                        [
                            { text: 'OK', onPress: () => console.log('OK Pressed') },
                        ],
                        { cancelable: false }
                    );
                    dispatch({ type: CLOSE_LOADING_EVENT_SCREEN });
                } else {
                    const eventos = snap.val();
                    const key = Object.keys(eventos);
                    key.forEach(id => {
                        const { nome, descricao, local, data_inicio, hora_inicio, coords, hora_fim, data_fim, area_tematica, usuario_id } = eventos[id];
                        dispatch({ type: EVENTS_TO_SHOW_SUCCESS, payload: { id, nome, descricao, local, data_inicio, hora_inicio, coords, hora_fim, data_fim, area_tematica, usuario_id } });
                    });
                    dispatch({ type: CLOSE_LOADING_EVENT_SCREEN });
                }
            });
    };
};


export const getLocation = () => {
    return (dispatch) => {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = parseFloat(position.coords.latitude);
            const long = parseFloat(position.coords.longitude);
            const initialPosition = {
                latitude: lat,
                longitude: long
            };
            dispatch({ type: INICIAL_POSITION, payload: initialPosition });
        },
            (error) => console.log(error.message),
        );
        this.wathID = navigator.geolocation.watchPosition((position) => {
            const movingPosition = {
                latitude: position.coords.loadingData,
                longitude: position.coords.longitude,
            };
            dispatch({ type: MOVING, payload: movingPosition });
        });
    };
};

