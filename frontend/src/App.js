import "./App.css";
import Sidenav from "./Sidenav";
import { BrowserRouter } from "react-router-dom";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Sidenav />
      </BrowserRouter>
    </div>
  );
}

export default App;
