const scopes = "user-read-private+user-read-email+playlist-read-private+user-top-read+user-read-recently-played";
const redirectURI = "http://localhost:3000/";
export const clientID = "cf0b6c249b1d4be1b934e15f4eedfef0";
export const clientSecret = "4efc3d21a0184eef8d692e7f4129b5cd";
export const spotifyWebApiURL = `https://accounts.spotify.com/authorize/?client_id=${clientID
}&response_type=token&redirect_uri=${redirectURI}&scope=${scopes}`;