import { html } from '../../node_modules/lit-html/lit-html.js';

export {
    isUser,
    spinner
}

function isUser() {
    const token = sessionStorage.getItem('accessToken');
    return token !== null;
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