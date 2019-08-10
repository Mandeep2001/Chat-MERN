import { combineReducers } from "redux"; // Importo la funzione che permette la connessione dei vari reducers
import authReducer from "./authReducer";

const rootReducer = combineReducers({ authReducer });

export default rootReducer;
