import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes,
} from "react-router-dom";
import FileArea from "./components/fileArea";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/*" element={<FileArea />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
