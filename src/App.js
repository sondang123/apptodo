import logo from "./logo.svg";
import "./App.css";
import Header from "./Components/Header.js";
import Content from "./Components/Content";
import "./scss/global.scss";

function App() {
  return (
    <div className="App">
      <div className="content-app">
        <Header />
        <Content />
      </div>
    </div>
  );
}

export default App;
