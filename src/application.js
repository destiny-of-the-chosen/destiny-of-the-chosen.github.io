import { html, render } from '../node_modules/lit-html/lit-html.js';
import page from '//unpkg.com/page/page.mjs';

import * as api from './utility/proxy.js';
import { isUser, spinner } from './utility/helpers.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';

api.setHost('http://localhost:3030');

page('/', middleware, homePage);
page('/home', middleware, homePage);
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
    ctx.isUser = isUser;

    function setNav() {
        const email = sessionStorage.getItem('email');
        render(bodyTemplate(logout, isUser(), email), document.body);
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

function bodyTemplate(logout, isUser, email) {
    return html`
        ${headerTemplate(logout, isUser, email)}
        <main></main>
        ${footerTemplate()}`;
}

function headerTemplate(logout, isUser, email) {
    return html`
    <nav class="nav">
        <div class="header-home-button">
            <a class="nav-link" href="/home">Destiny Of The Chosen</a>
        </div>
        <div class="header-links">
            <ul class="nav-item">
                ${isUser ? html`
                <li class="nav-item">
                    <a class="nav-link">Welcome, email: ${email}</a>
                </li>
                <li class="nav-item">
                    <a @click=${logout} class="nav-link" href="javascript:void(0)">Logout</a>
                </li>` : html`
                <li class="nav-item">
                    <a class="nav-link" href="/login">Login</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/register">Register</a>
                </li>`}
            </ul>
        </div>
    </nav>`;
}

function footerTemplate() {
    return html`
    <footer class="page-footer">
        <div class="page-footer-text">© 2021 made by Simeon Balabanov</div>
    </footer>`;
}