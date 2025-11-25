// import { products, categories } from './data.js'; // Removed for local file compatibility

// Helper to format currency
const formatPrice = (price) => {
    return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(price);
};

// Render Header
const renderHeader = () => {
    const header = document.querySelector('header');
    if (!header) return;

    const user = userAuth.getCurrentUser();
    const authLink = user
        ? `<a href="#" onclick="userAuth.logout()" class="btn btn-outline" style="padding: 6px 16px; font-size: 0.9rem; white-space: nowrap;">로그아웃</a>`
        : `<a href="login.html" class="btn btn-primary" style="padding: 6px 16px; font-size: 0.9rem; white-space: nowrap;">로그인</a>`;

    const welcomeMsg = user ? `<span style="margin-right: 10px; font-weight: 600; max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; display: inline-block;">${user.name}님 환영합니다!</span>` : '';

    header.innerHTML = `
        <div class="container" style="height: 100%; display: grid; grid-template-columns: 1fr auto 1fr; align-items: center;">
            <a href="index.html" class="logo" style="display: flex; align-items: center; gap: 10px; justify-self: start;">
                <img src="assets/images/logo/logo.gif" alt="Woori Miracle" style="height: 32px;" loading="lazy">
            </a>
            
            <button class="mobile-menu-btn" onclick="toggleMenu()" style="grid-column: 3; justify-self: end;">
                <span></span>
                <span></span>
                <span></span>
            </button>

            <div class="nav-wrapper" id="nav-wrapper" style="align-items: center; justify-self: center;">
                <nav style="display: flex; align-items: center;">
                    <ul class="flex gap-8 mobile-nav-list" style="align-items: center; margin: 0;">
                        <li><a href="index.html" class="nav-link">HOME</a></li>
                        <li><a href="company.html" class="nav-link">회사소개</a></li>
                        <li><a href="products.html" class="nav-link">제품소개</a></li>
                        <li><a href="inquiry.html" class="nav-link">온라인상담</a></li>
                        <li><a href="notice.html" class="nav-link">고객센터</a></li>
                        ${user ? '<li><a href="quotation-history.html" class="nav-link" style="color: var(--primary-color);">📋 내 견적</a></li>' : ''}
                    </ul>
                </nav>
            </div>
            
            <div class="flex gap-4 items-center mobile-auth-actions" style="justify-self: end;">
                ${welcomeMsg}
                <a href="cart.html" style="position: relative; padding: 8px;">
                    <span style="font-size: 1.2rem;">🛒</span>
                    <span id="cart-count" style="position: absolute; top: -5px; right: -5px; background: var(--primary-color); color: white; font-size: 0.7rem; padding: 2px 6px; border-radius: 10px;">0</span>
                </a>
                ${authLink}
            </div>
        </div>
    `;
    updateCartCount();
};

const toggleMenu = () => {
    const navWrapper = document.getElementById('nav-wrapper');
    navWrapper.classList.toggle('active');
};

// Render Footer
const renderFooter = () => {
    const footer = document.querySelector('footer');
    if (!footer) return;

    footer.innerHTML = `
        <div class="container">
            <div class="flex justify-between">
                <div>
                    <h4>(주)우리미라클</h4>
                    <p>대표: 김병철 | 사업자등록번호: 204-86-35352</p>
                    <p>주소: 서울시 동대문구 장안동 347-8 정은스카이빌 201동 B101호</p>
                    <p>Tel: 070-4659-0674 | Fax: 02-2212-1473</p>
                </div>
                <div>
                    <h4>고객센터</h4>
                    <p class="text-2xl font-bold">070-4659-0674</p>
                    <p>평일 09:00 - 18:00 (점심시간 12:00 - 13:00)</p>
                </div>
            </div>
            <div style="margin-top: 40px; border-top: 1px solid #333; padding-top: 20px; text-align: center; font-size: 0.9rem;">
                Copyright © Woori Miracle. All rights reserved.
                <br>
                <a href="admin/login.html" style="color: #666; font-size: 0.8rem; text-decoration: none; margin-top: 10px; display: inline-block;">Admin Login</a>
            </div>
        </div>
    `;
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderHeader();
    renderFooter();
});
