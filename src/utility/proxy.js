import { performGetRequest, performPostRequest, performPutRequest, performDeleteRequest } from './requests.js';

export {
    logUserRequest,
    logoutUserRequest,
    registerUserRequest,
    getMoviesRequest,
    getMovieDetailsRequest,
    getMovieLikesRequest,
    createMovieRequest,
    editMovieRequest,
    deleteMovieRequest,
    getGetMovieLikesFromUserRequest,
    alreadyLikedRequest,
    addLikeToMovieRequest,
    revokeALikeFromMovieRequest
}

const host = 'https://parseapi.back4app.com';
const appId = 'gog7258ODmftOaMjroCSU9wa6beKCXE44xuBDFNT';
const apiKey = '4crFsXkhi1WXnCXqNYE5QBDOjbq1uZ7PGzNsN7XD';

//User requests
async function logUserRequest(email, password) {
    const data = await performPostRequest(host + '/users/login', {}, { email, password });
    sessionStorage.setItem('accessToken', data.accessToken);
    sessionStorage.setItem('userId', data._id);
    sessionStorage.setItem('email', data.email);
}

async function logoutUserRequest() {
    const token = { 'X-Authorization': sessionStorage.getItem('sessionToken') };
    sessionStorage.removeItem('sessionToken');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('email');
    await performDeleteRequest(host + '/users/logout', token);
}

async function registerUserRequest(username, email, password) {
    const data = await performPostRequest(host + '/users',
        {
            'X-Parse-Application-Id': appId,
            'X-Parse-REST-API-Key': apiKey,
            'X-Parse-Revocable-Session': '1'
        },
        { username, email, password });
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('email', email);
    sessionStorage.setItem('userId', data.objectId);
    sessionStorage.setItem('sessionToken', data.sessionToken);
}

//Movie requests
async function getMoviesRequest() {
    return await performGetRequest(host + '/data/movies');
}

async function getMovieDetailsRequest(id) {
    return await performGetRequest(host + '/data/movies/' + id);
}

async function getMovieLikesRequest(id) {
    return await performGetRequest(host + `/data/likes?where=movieId%3D%22${id}%22&distinct=_ownerId&count`);
}

async function createMovieRequest(movie) {
    const token = { 'X-Authorization': sessionStorage.getItem('accessToken') };
    return await performPostRequest(host + '/data/movies', token, movie);
}

async function editMovieRequest(id, movie) {
    const token = { 'X-Authorization': sessionStorage.getItem('accessToken') };
    return await performPutRequest(host + '/data/movies/' + id, token, movie);
}

async function deleteMovieRequest(id) {
    const token = { 'X-Authorization': sessionStorage.getItem('accessToken') };
    return await performDeleteRequest(host + '/data/movies/' + id, token);
}

//Like requests
async function getGetMovieLikesFromUserRequest(movieId) {
    const token = { 'X-Authorization': sessionStorage.getItem('accessToken') };
    const userId = sessionStorage.getItem('userId');
    return await performGetRequest(host + `/data/likes?where=movieId%3D%22${movieId}%22%20and%20_ownerId%3D%22${userId}%22`, token);
}

async function alreadyLikedRequest(movieId, userId) {
    return await performGetRequest(host + `/data/likes?where=movieId%3D%22${movieId}%22%20and%20_ownerId%3D%22${userId}%22`);
}

async function addLikeToMovieRequest(id) {
    const token = { 'X-Authorization': sessionStorage.getItem('accessToken') };
    return await performPostRequest(host + '/data/likes', token, id);
}

async function revokeALikeFromMovieRequest(id) {
    const token = { 'X-Authorization': sessionStorage.getItem('accessToken') };
    return await performDeleteRequest(host + '/data/likes/' + id, token);
}