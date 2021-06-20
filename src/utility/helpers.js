import { html } from '//unpkg.com/lit-html/lit-html?module';

export {
    getUser,
    spinner
}

function getUser() {
    const user = {
        'username': sessionStorage.getItem('username'),
        'email': sessionStorage.getItem('email'),
        'userId': sessionStorage.getItem('userId'),
        'sessionToken': sessionStorage.getItem('sessionToken')
    }
    
    return user;
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