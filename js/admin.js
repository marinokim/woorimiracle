// Admin Logic

// Check Auth
const checkAuth = () => {
    if (!sessionStorage.getItem('wm_admin_auth')) {
        window.location.href = 'login.html';
    }
};

// Login
const login = (username, password) => {
    if (username === 'admin' && password === '1234') {
        sessionStorage.setItem('wm_admin_auth', 'true');
        window.location.href = 'dashboard.html';
        return true;
    }
    return false;
};

// Logout
const logout = () => {
    sessionStorage.removeItem('wm_admin_auth');
    window.location.href = 'login.html';
};

// Product Management
const adminProducts = {
    getAll: () => {
        return JSON.parse(localStorage.getItem('wm_products')) || [];
    },
    add: (product) => {
        const products = adminProducts.getAll();
        products.push(product);
        localStorage.setItem('wm_products', JSON.stringify(products));
    },
    update: (id, updatedProduct) => {
        const products = adminProducts.getAll();
        const index = products.findIndex(p => p.id === id);
        if (index !== -1) {
            products[index] = updatedProduct;
            localStorage.setItem('wm_products', JSON.stringify(products));
        }
    },
    delete: (id) => {
        const products = adminProducts.getAll();
        const filtered = products.filter(p => p.id !== id);
        localStorage.setItem('wm_products', JSON.stringify(filtered));
    }
};

// Notice Management
const adminNotices = {
    getAll: () => {
        return JSON.parse(localStorage.getItem('wm_notices')) || [];
    },
    add: (notice) => {
        const notices = adminNotices.getAll();
        notices.push(notice);
        localStorage.setItem('wm_notices', JSON.stringify(notices));
    },
    update: (id, updatedNotice) => {
        const notices = adminNotices.getAll();
        const index = notices.findIndex(n => n.id === id);
        if (index !== -1) {
            notices[index] = updatedNotice;
            localStorage.setItem('wm_notices', JSON.stringify(notices));
        }
    },
    delete: (id) => {
        const notices = adminNotices.getAll();
        const filtered = notices.filter(n => n.id !== id);
        localStorage.setItem('wm_notices', JSON.stringify(filtered));
    }
};
