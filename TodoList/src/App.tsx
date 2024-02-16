import { ThemeProvider } from 'styled-components';
import { darkTheme } from './theme';

function App() {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <div>test</div>
      </ThemeProvider>
    </>
  );
}

export default App;
