import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const formData = {
            Cin: data.get('Cin'),
            Nom: data.get('Nom'),
            Prenom: data.get('Prenom'),
            Email: data.get('Email'),
            Telephone: data.get('Telephone'),
            Addresse: data.get('Addresse'),
            Password: data.get('password'),
        };

        try {
            const response = await fetch('https://localhost:7120/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // Handle successful signup (e.g., redirect, update state)
                console.log('Signup successful!');
            } else {
                // Handle unsuccessful signup (e.g., display error message)
                const errorData = await response.json();
                console.error('Signup failed:', errorData);
            }
        } catch (error) {
            console.error('An error occurred during signup:', error);
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
                    <Typography component="h1" variant="h5" sx={{ color: 'white' }}>
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{
                        mt: 1,
                        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Semi-transparent white background
                        padding: 2,
                        borderRadius: 8,
                        backdropFilter: 'blur(8px)', // Add blur effect with a radius of 10px
                    }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    sx={{ input: { color: 'white' } }}
                                    margin="dense"
                                    variant="filled"
                                    color="warning"
                                    autoComplete="given-name"
                                    name="Cin"
                                    required
                                    fullWidth
                                    id="Cin"
                                    label="Cin"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    sx={{ input: { color: 'white' } }}
                                    margin="dense"
                                    variant="filled"
                                    color="warning"
                                    required
                                    fullWidth
                                    id="Nom"
                                    label="Nom"
                                    name="Nom"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    sx={{ input: { color: 'white' } }}
                                    margin="dense"
                                    variant="filled"
                                    color="warning"
                                    required
                                    fullWidth
                                    id="Prenom"
                                    label="Prenom"
                                    name="Prenom"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    sx={{ input: { color: 'white' } }}
                                    margin="dense"
                                    variant="filled"
                                    color="warning"
                                    required
                                    fullWidth
                                    id="Email"
                                    label="Email Address"
                                    name="Email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    sx={{ input: { color: 'white' } }}
                                    margin="dense"
                                    variant="filled"
                                    color="warning"
                                    required
                                    fullWidth
                                    id="Telephone"
                                    label="Telephone"
                                    name="Telephone"
                                    autoComplete="tel"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    sx={{ input: { color: 'white' } }}
                                    margin="dense"
                                    variant="filled"
                                    color="warning"
                                    required
                                    fullWidth
                                    id="Addresse"
                                    label="Addresse"
                                    name="Addresse"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    sx={{ input: { color: 'white' } }}
                                    margin="dense"
                                    variant="filled"
                                    color="warning"
                                    required
                                    fullWidth
                                    id="password"
                                    label="Password"
                                    type="password"
                                    name="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            color="warning"
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                               
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}