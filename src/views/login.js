import { html } from '../../node_modules/lit-html/lit-html.js';

const loginTemplate = (onSubmit, errorMessage) => html`
<section class="login-register">
    <form @submit=${onSubmit}>
        <div>
            <label for="email">Email</label>
            <input type="email" placeholder="Email" name="email">
        </div>
        <div>
            <label for="password">Password</label>
            <input type="password" placeholder="Password" name="password">
        </div>

        <button type="submit" class="primary-button">Login</button>
        <div class="button registered-question">
            <label>Don't have an account?</label>
            <a href="/register">Register</a>
        </div>
        ${errorMessage ? html`<p class="errorMessage">${errorMessage}</p>` : ''}
    </form>
</section>`;

export async function loginPage(ctx) {
    ctx.spinner();
    ctx.render(loginTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const email = formData.get('email').trim();
        const password = formData.get('password').trim();
        if (!email || !password) {
            ctx.render(loginTemplate(onSubmit, 'All the fields are required.'));
        } else {
            try {
                await ctx.api.logUserRequest(email, password);
                event.target.reset();
                ctx.setNav();
                ctx.page.redirect('/');
            } catch (error) {
                ctx.render(loginTemplate(onSubmit, error.message));
            }
        }
    }
}