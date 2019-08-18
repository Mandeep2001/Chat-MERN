import { combineReducers } from "redux"; // Importo la funzione che permette la connessione dei vari reducers
import authReducer from "./authReducer";
import chatReducer from "./chatReducer";

const rootReducer = combineReducers({ auth: authReducer, chat: chatReducer });

export default rootReducer;
