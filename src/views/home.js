import { html } from '//unpkg.com/lit-html/lit-html?module';

const homeTemplate = (user) => html`
<img class="home-picture" src="../../images/home-image.jpg" alt="home picture">`;

export async function homePage(ctx) {
    ctx.spinner();
    await loadHomePage();

    async function loadHomePage() {
        try {
            ctx.render(homeTemplate(ctx.user()));
        } catch (error) {
            alert(error.message);
        }
    }
}