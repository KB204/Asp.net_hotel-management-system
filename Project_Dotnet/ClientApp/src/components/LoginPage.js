import React from 'react';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';


const defaultTheme = createTheme();

export default function SignIn(props) {
    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        const email = data.get('email');
        const password = data.get('password');

        try {
            // Make an API request to your login endpoint
            const response = await axios.post('https://localhost:7120/api/auth/login', {
                email: email,
                password: password,
            });

            // Handle the response from the server
            console.log('Login successful:');
            props.onLoginSuccess();

            // You may want to redirect the user or perform other actions here

        } catch (error) {
            // Handle any errors that occurred during the login request
            console.error('Login failed:', error);

            // You can also display an error message to the user if needed
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography variant="h6" mb={2} sx={{ color: 'white' }}>
                        Log in
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{
                            mt: 1,
                            backgroundColor: 'rgba(255, 255, 255, 0.1)', // Semi-transparent white background
                            padding: 2,
                            borderRadius: 8,
                            backdropFilter: 'blur(8px)', // Add blur effect with a radius of 10px
                        }}
                    >
                        <TextField sx={{ input: { color: 'white' } }}
                            margin="dense"
                            variant="filled"
                            color="warning"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField sx={{ input: { color: 'white' } }}
                            margin="dense"
                            variant="filled"
                            color="warning"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="warning" />}
                            label="Remember me"
                        />
                        <Button
                            color="warning"
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}