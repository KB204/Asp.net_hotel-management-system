
const AuthService = {
    login: async (email, password) => {
        try {
            const response = await fetch('https://localhost:7120/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ Email: email, Password: password }),
            });

            if (response.ok) {
                const data = await response.json();
               
                const token = data.token;

                localStorage.setItem('token', token);
                return true;
            } else if (response.status === 401) {
                throw new Error('Les informations d identification invalides.Veuillez réessayer');
            } else {
                throw new Error(`Une erreur s'est produite lors de la connexion: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Login error:', error.message);
            throw new Error('Une erreur s est produite lors de la connexion');
        }
    },


    register: async (name, email, password, role) => {
        const response = await fetch('https://localhost:7120/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Name: name, Email: email, Password: password, Role: role }),
        });

        if (!response.ok) {
            throw new Error('Registration failed');
        }
    },

    getUserData: async () => {
        try {
            const token = AuthService.getToken();
          
            const response = await fetch('https://localhost:7120/api/auth/current-user', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                return await response.json();
            } else {
                throw new Error('Failed to fetch user data');
            }
        } catch (error) {
            console.error('Fetch user data error:', error.message);
            throw new Error('An error occurred while fetching user data');
        }
    },

    updateUserInfo: async (userData) => {
        try {
            const token = AuthService.getToken();

            const response = await fetch('https://localhost:7120/api/auth/update-user', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                throw new Error(`Failed to update user info: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Update user info error:', error.message);
            throw new Error('An error occurred while updating user info');
        }
    },

    logout: () => {
       
        localStorage.removeItem('token');
    },

    getToken: () => {
        const token = localStorage.getItem('token');
        return token;
    },

};

export default AuthService;
