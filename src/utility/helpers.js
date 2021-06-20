import { html } from '//unpkg.com/lit-html/lit-html?module';

export {
    getUser,
    spinner
}

function getUser() {
    const username = sessionStorage.getItem('username');
    const email = sessionStorage.getItem('email');
    const userId = sessionStorage.getItem('userId');
    const sessionToken = sessionStorage.getItem('sessionToken');

    if (userId == null) return null;

    return { username, email, userId, sessionToken };
}

const spinner = () => html`
<div class="spinner">
    <h4>Loading&hellip;</h4>
    <div class="spring-spinner">
        <div class="spring-spinner-part top">
            <div class="spring-spinner-rotator"></div>
        </div>
        <div class="spring-spinner-part bottom">
            <div class="spring-spinner-rotator"></div>
        </div>
    </div>
</div>`;