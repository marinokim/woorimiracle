const cart = {
    get: () => {
        return JSON.parse(sessionStorage.getItem('wm_cart')) || [];
    },
    add: (product, quantity) => {
        const currentCart = cart.get();
        const existingItemIndex = currentCart.findIndex(item => item.id === product.id);

        if (existingItemIndex > -1) {
            currentCart[existingItemIndex].quantity += quantity;
        } else {
            currentCart.push({ ...product, quantity });
        }

        sessionStorage.setItem('wm_cart', JSON.stringify(currentCart));
        updateCartCount();
    },
    remove: (index) => {
        const currentCart = cart.get();
        currentCart.splice(index, 1);
        sessionStorage.setItem('wm_cart', JSON.stringify(currentCart));
        updateCartCount();
        // If we are on the cart page, re-render
        if (typeof renderCartItems === 'function') {
            renderCartItems();
        }
    },
    clear: () => {
        sessionStorage.removeItem('wm_cart');
        updateCartCount();
    },
    getCount: () => {
        const currentCart = cart.get();
        return currentCart.reduce((sum, item) => sum + item.quantity, 0);
    }
};

// Helper to update header badge
const updateCartCount = () => {
    const count = cart.getCount();
    const countElement = document.getElementById('cart-count');
    const countElementDesktop = document.querySelector('.cart-count-desktop');

    if (countElement) {
        countElement.innerText = count;
    }
    if (countElementDesktop) {
        countElementDesktop.innerText = count;
    }
};
