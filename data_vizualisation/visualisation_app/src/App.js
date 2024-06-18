import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Accueil from './pages/Accueil';
import Visualisation from './pages/Visualisation';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@devexpress/dx-react-chart-bootstrap4/dist/dx-react-chart-bootstrap4.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' exact element = {<Accueil/>}/>
          <Route path='/Visualisation' exact element = {<Visualisation/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
