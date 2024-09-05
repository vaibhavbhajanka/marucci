import { useEffect } from 'react';

// Spotify Auth constants
const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const redirectUri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;
const authorizationEndpoint = "https://accounts.spotify.com/authorize";
const tokenEndpoint = "https://accounts.spotify.com/api/token";
const scope = process.env.NEXT_PUBLIC_SPOTIFY_SCOPE;

// Data structure to manage tokens (only in client-side)
export const currentToken = {
    access_token: null,
    refresh_token: null,
    expires_in: null,
    expires: null,

    save(response) {
        // Only run this on the client side (in the browser)
        if (typeof window !== 'undefined' && window.localStorage) {
            const { access_token, refresh_token, expires_in } = response;
            localStorage.setItem('access_token', access_token);
            localStorage.setItem('refresh_token', refresh_token);
            localStorage.setItem('expires_in', expires_in);

            const now = new Date();
            const expiry = new Date(now.getTime() + expires_in * 1000);
            localStorage.setItem('expires', expiry);
        }
    },

    isExpired() {
        if (typeof window !== 'undefined' && window.localStorage) {
            const expiry = new Date(localStorage.getItem('expires'));
            return new Date() > expiry;
        }
        return true;
    },

    load() {
        if (typeof window !== 'undefined' && window.localStorage) {
            this.access_token = localStorage.getItem('access_token');
            this.refresh_token = localStorage.getItem('refresh_token');
            this.expires_in = localStorage.getItem('expires_in');
            this.expires = localStorage.getItem('expires');
        }
    },
};

// Function to get a new token
export async function getToken(code) {
    if (typeof window !== 'undefined' && window.localStorage) {
        const codeVerifier = localStorage.getItem('code_verifier');

        const response = await fetch(tokenEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                client_id: clientId,
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: redirectUri,
                code_verifier: codeVerifier,
            }),
        });

        return await response.json();
    }
}

// Function to refresh the token
export async function refreshToken() {
    if (typeof window !== 'undefined' && window.localStorage) {
        const refreshToken = localStorage.getItem('refresh_token');

        const response = await fetch(tokenEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                client_id: clientId,
                grant_type: 'refresh_token',
                refresh_token: refreshToken,
            }),
        });

        return await response.json();
    }
}

// Function to redirect the user to Spotify's authorization page
export async function redirectToSpotifyAuthorize() {
    if (typeof window !== 'undefined' && window.localStorage) {
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const randomValues = crypto.getRandomValues(new Uint8Array(64));
        const codeVerifier = Array.from(randomValues).map((x) => possible[x % possible.length]).join('');

        const data = new TextEncoder().encode(codeVerifier);
        const hashed = await crypto.subtle.digest('SHA-256', data);

        const codeChallenge = btoa(String.fromCharCode(...new Uint8Array(hashed)))
            .replace(/=/g, '')
            .replace(/\+/g, '-')
            .replace(/\//g, '_');

        localStorage.setItem('code_verifier', codeVerifier);

        const authUrl = new URL(authorizationEndpoint);
        authUrl.search = new URLSearchParams({
            response_type: 'code',
            client_id: clientId,
            scope: scope,
            code_challenge_method: 'S256',
            code_challenge: codeChallenge,
            redirect_uri: redirectUri,
        }).toString();

        window.location.href = authUrl.toString();
    }
}

// Hook to manage Spotify authentication
export function useSpotifyAuth() {
    useEffect(() => {
        console.log(typeof window)
        if (typeof window !== 'undefined') {
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get('code');

            if (code) {
                getToken(code).then((token) => {
                    currentToken.save(token);
                    console.log('token:', token);
                    // Clean the URL after getting the token
                    window.history.replaceState({}, document.title, window.location.pathname);
                });
            } else if (currentToken.isExpired()) {
                redirectToSpotifyAuthorize();
            }
        }
    }, []); // Empty dependency array to run once on mount
}
