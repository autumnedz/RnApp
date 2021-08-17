
import { createStore, combineReducers } from 'redux';
import { authReducer } from './reducers/AuthReducer';
import { AuthState } from './reducers/AuthReducer';

// a static way of defining the RootState type
// export interface RootState {
//    auth: authReducer;
// }

const rootReducer = combineReducers({
    auth: authReducer
});

// a dynamic way of defining the root state type
export type RootState = ReturnType<typeof rootReducer>


const configureStore = () => {
    return createStore(rootReducer);
}

export default configureStore;