import { mount , configure} from "enzyme";
import Adapter from "@cfaester/enzyme-adapter-react-18";
import App from './App';

test('renders App', () => {
  configure({ adapter: new Adapter() })

  // const wrapper = mount(<App isApprover={false}/>);

  // wrapper.toMatchSnapshot();
  //expect().toBe();
});
