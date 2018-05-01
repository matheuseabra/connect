import { database } from '../config/Config';
import { 
  RETRIEVE_LOCAIS, 
  RETRIVING_LOCAIS,
  SEARCHING_LOCAL, 
  SEARCHED_LOCAL, 
  MARK_LOCAL, 
  SEARCHING_USER_LOCALIZATION,
  SEARCHED_USER_LOCALIZATION,
} from './types';

export const saveLocais = (locais) => {
  for(var i = 0; i < locais.local.length; i++){
    database().ref(`local/`).push({
      nome: locais.local[i].nome,
      coords: {
        lat: locais.local[i].coords.lat,
        lng: locais.local[i].coords.lng
      }
    });
  }
};

export const verifyLocais = () => { 
  return (dispatch) => {    
    dispatch({ type: RETRIVING_LOCAIS });
    
    database().ref("local/")
      .on('value', snap => {
        retriveLocaisSuccess(dispatch, snap.val());
    });
  };
};

export const searchLocal = (localPesquisado, locais) => {
  return (dispatch) => {
    dispatch({ type: SEARCHING_LOCAL, payload: localPesquisado });

    let locaisAchados = [];

    if(localPesquisado !== "") {
      locais.map((localVerificado) => {
        if (localVerificado['nome'].includes(localPesquisado)) {
          locaisAchados.push(localVerificado);
        }
      });
      searchedLocaisSuccess(dispatch, locaisAchados);
    }
  }
}

export const markLocal = (local) => {
  return (dispatch) => {
    dispatch({ type: MARK_LOCAL, payload: local });
  }
}

export const searchLocalizacaoUsuario = () => {
  return (dispatch) => {
    dispatch({ type: SEARCHING_USER_LOCALIZATION });

    navigator.geolocation.getCurrentPosition((localizacao) => {
      searchLocalizacaoUsuarioSuccess(dispatch, localizacao);
    });
  }
}

const searchLocalizacaoUsuarioSuccess = (dispatch, localizacao) => {
  dispatch({
    type: SEARCHED_USER_LOCALIZATION,
    payload: localizacao
  })
};

const retriveLocaisSuccess = (dispatch, locais) => {
  dispatch({
    type: RETRIEVE_LOCAIS,
    payload: locais
  })
};

const searchedLocaisSuccess = (dispatch, locais) => {
  dispatch({
    type: SEARCHED_LOCAL,
    payload: locais
  })
}