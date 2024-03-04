import Header from './Routes/Components/Header/Header';
import { Outlet } from 'react-router-dom';
function App() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
