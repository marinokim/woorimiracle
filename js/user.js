const userAuth = {
    getAllUsers: () => {
        return JSON.parse(localStorage.getItem('wm_users')) || [];
    },
    signup: (username, password, name) => {
        const users = userAuth.getAllUsers();
        if (users.find(u => u.username === username)) {
            return { success: false, message: 'Username already exists' };
        }
        users.push({ username, password, name });
        localStorage.setItem('wm_users', JSON.stringify(users));
        return { success: true };
    },
    login: (username, password) => {
        const users = userAuth.getAllUsers();
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
            // Store only necessary info in session
            const sessionUser = { username: user.username, name: user.name };
            sessionStorage.setItem('wm_user_session', JSON.stringify(sessionUser));
            return { success: true };
        }
        return { success: false, message: 'Invalid credentials' };
    },
    logout: () => {
        sessionStorage.removeItem('wm_user_session');
        sessionStorage.removeItem('wm_cart'); // Clear cart on logout
        window.location.reload();
    },
    getCurrentUser: () => {
        return JSON.parse(sessionStorage.getItem('wm_user_session'));
    }
};
