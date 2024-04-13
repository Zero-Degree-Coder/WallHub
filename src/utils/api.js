import axios from 'axios';

const baseURL = 'https://wallpaper-xi.vercel.app/';
export const api = axios.create({
  baseURL,
});
