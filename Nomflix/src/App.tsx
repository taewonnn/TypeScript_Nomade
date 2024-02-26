import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/"></Route>
        <Route path="/tv"></Route>
        <Route path="/search"></Route>
      </Routes>
    </Router>
  );
}

export default App;
