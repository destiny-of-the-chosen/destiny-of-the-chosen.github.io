import { html, render } from '//unpkg.com/lit-html/lit-html?module';
import page from '//unpkg.com/page/page.mjs';

import * as api from './utility/proxy.js';
import { getUser, spinner } from './utility/helpers.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';

window.api = api;
window.user = getUser;

page('/', middleware, homePage);
page('/home', middleware, homePage);
page('/404', middleware, homePage);
page('/login', middleware, loginPage);
page('/register', middleware, registerPage);

page();

function middleware(ctx, next) {
    setNav();

    const main = document.querySelector('main');

    ctx.render = (context) => render(context, main);
    ctx.spinner = () => render(spinner(), main);
    ctx.setNav = setNav;
    ctx.api = api;
    ctx.user = getUser;

    function setNav() {
        const email = sessionStorage.getItem('email');
        render(bodyTemplate(logout, getUser()), document.body);
    }

    async function logout() {
        try {
            ctx.spinner();
            await api.logoutUserRequest();
            setNav();
            ctx.page.redirect('/')
        } catch (error) {
            alert(error.message);
        }
    }

    next();
}

function bodyTemplate(logout, user) {
    return html`
        ${headerTemplate(logout, user)}
        <main></main>
        ${footerTemplate()}`;
}

function headerTemplate(logout, user) {
    return html`
    <nav class="nav">
        <div class="header-home-button">
            <a class="nav-link" href="/home">Destiny Of The Chosen</a>
        </div>
        <div class="header-links">
            ${user ? html`
            <div class="nav-item">
                <a @click=${logout} class="nav-link" href="javascript:void(0)">Logout</a>
            </div>
            <div class="nav-item">
                <a class="nav-link">Welcome: ${user.username}</a>
            </div>` : html`
            <div class="nav-item">
                <a class="nav-link" href="/register">Register</a>
            </div>
            <div class="nav-item">
                <a class="nav-link" href="/login">Login</a>
            </div>
            `}
        </div>
    </nav>`;
}

function footerTemplate() {
    return html`
    <footer class="page-footer">
        <div class="page-footer-text">© 2021 made by Simeon Balabanov</div>
    </footer>`;
}