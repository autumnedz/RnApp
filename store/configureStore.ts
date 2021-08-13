
import { createStore, combineReducers } from 'redux';
import { pinReducer } from './reducers/pinReducer';
import { PinState } from './reducers/pinReducer';

// a static way of defining the RootState type
// export interface RootState {
//     pin: PinState;
// }

const rootReducer = combineReducers({
    pin: pinReducer 
});

// a dynamic way of defining the root state type
export type RootState = ReturnType<typeof rootReducer>


const configureStore = () => {
    return createStore(rootReducer);
}

export default configureStore;