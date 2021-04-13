import { html } from '../../node_modules/lit-html/lit-html.js';

const registerTemplate = (onSubmit, errorMessage) => html`
<section class="login-register">
    <form @submit=${onSubmit} class="text-center border border-light p-5">
        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" class="form-control" placeholder="Email" name="email">
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" placeholder="Password" name="password">
        </div>
        <div class="form-group">
            <label for="repeatPassword">Repeat Password</label>
            <input type="password" class="form-control" placeholder="Repeat-Password" name="repeatPassword">
        </div>

        <button type="submit" class="primary-button">Register</button>
        <div class="registered-question">
            <label>Already have an account?</label>
            <a href="/login">Login</a>
        </div>
        ${errorMessage ? html`<p class="errorMessage">${errorMessage}</p>` : ''}
    </form>
</section>`;

export async function registerPage(ctx) {
    ctx.spinner();
    ctx.render(registerTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const email = formData.get('email').trim();
        const password = formData.get('password').trim();
        const repass = formData.get('repeatPassword').trim();
        if (!email || !password || !repass) {
            ctx.render(registerTemplate(onSubmit, 'All the fields are required.'));
        } else if (password.length < 6) {
            ctx.render(registerTemplate(onSubmit, 'Password must be at least 6 characters long.'));
        } else if (password !== repass) {
            ctx.render(registerTemplate(onSubmit, 'Passwords don\'t match.'));
        } else {
            try {
                await ctx.api.registerUserRequest(email, password);
                event.target.reset();
                ctx.setNav();
                ctx.page.redirect('/');
            } catch (error) {
                ctx.render(registerTemplate(onSubmit, error.message));
            }
        }
    }
}