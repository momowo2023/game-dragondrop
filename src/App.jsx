import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";

import { Header } from './components/Header'
import { Footer } from "./components/Footer";
import GamePage from "./pages/GamePage";
import routes from './routes/routes';


function App() {
  return (
    <>
      <Router>
        <Header />
        {routes}
        <GamePage />
        <Footer />
      </Router>


    </>
  );
}

export default App;
