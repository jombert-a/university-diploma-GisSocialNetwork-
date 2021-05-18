import './style/App.css';
import GMain from "./components/layout/GMain";
import {BrowserRouter} from "react-router-dom";
import { Provider } from 'react-redux'
import store from "./store";


function App() {
  return (
      <Provider store={store}>
          <BrowserRouter>
              <div className="App">
                  <GMain />
              </div>
          </BrowserRouter>
      </Provider>
  );
}

export default App;
