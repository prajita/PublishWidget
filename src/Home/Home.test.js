import { mount , configure} from "enzyme";
import Adapter from "@cfaester/enzyme-adapter-react-18";
import Home from "./home";
import persistedReducer from "../reducers";
import { configureStore } from '@reduxjs/toolkit';

import { Provider } from "react-redux";

const configureStores = () => {
    return configureStore(
        {
            reducer: persistedReducer

        });
}

const store = configureStores();
describe('renders App', () => {
    configure({ adapter: new Adapter() })   
    
  const wrapper = mount(
        <Provider store={store}>
            <Home isApprover={false}/>
        </Provider>);

  it('render Home page', () => {
    //expect(wrapper).toMatchSnapshot();
  })
  //expect(wrapper).toMatchSnapshot();
  //expect().toBe();
});

