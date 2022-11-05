import { TextField } from "@mui/material"
import { Button } from "@mui/material"
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#F2A8A4',
      darker: '#242424',
    },
    neutral: {
      main: '#F2A8A4',
      contrastText: '#242424',
    },
  },
});


const Login = ()=>{
    return(
        <ThemeProvider theme={theme}>
        
        <div className="m-auto text-white text-xl h-fit flex justify-center">Hello</div>
        
        <div className="m-auto p-20 bg-white rounded flex flex-col">
            <h1 className=" text-peach text-xl w-fit">Login</h1>
            <TextField margin="normal" label="Email Address" size="small"/>
            <TextField label="Password" size="small"/>
            <br/>
            <Button variant="contained" margin="normal" size="small" className="w-1/3">Text</Button>
        </div>
 
        </ThemeProvider>
    )
}

export default Login