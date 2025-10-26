import './App.css';
import EmployeeCrud from "./components/EmployeeCrud";
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Create a theme
const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
          main: '#d32f2f',
        },
    },
});
function App() {
  return (
    <ThemeProvider theme={theme}>
            <EmployeeCrud />
        </ThemeProvider>
  );
}

export default App;
