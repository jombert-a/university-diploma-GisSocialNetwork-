import './style/App.css';
import GFooter from "./components/layout/GFooter";
import GMap from "./components/map/GMap";

function App() {
  return (
    <div className="App">
        <GMap />
        <GFooter />
    </div>
  );
}

export default App;
