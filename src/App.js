import './App.css';
import CreateProduct from './Components/AddToCard/CreateProduct';
import Carts from './Pages/Carts';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Carts />} />
          <Route path="/add-new" element={<CreateProduct />} />
          <Route path="/add-new/:productId" element={<CreateProduct />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
