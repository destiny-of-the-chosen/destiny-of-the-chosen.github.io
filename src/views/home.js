import { html } from '../../node_modules/lit-html/lit-html.js';

const homeTemplate = (isUser) => html`
<h1>home</h1>`;

export async function homePage(ctx) {
    ctx.spinner();
    await getAllMovies();

    async function getAllMovies() {
        try {
            ctx.render(homeTemplate(ctx.isUser()));
        } catch (error) {
            alert(error.message);
        }
    }
}