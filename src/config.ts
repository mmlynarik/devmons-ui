import "server-only";

export const BACKEND_API_URI = process.env.BACKEND_API_URI;

export const JWT_SESSION_EXP_SECONDS = 7 * 24 * 60 * 60;
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

export const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
export const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET
export const GITHUB_REDIRECT_URI = process.env.GITHUB_REDIRECT_URI
export const GITHUB_TOKEN_URI = "https://github.com/login/oauth/access_token"
export const GITHUB_USER_URI = "https://api.github.com/user"

export const GITHUB_AUTHORIZE_URL = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_url=${GITHUB_REDIRECT_URI}&scope=user:email`;
