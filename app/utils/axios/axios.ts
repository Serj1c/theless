import axiosGlobal from 'axios';
import { IS_SERVER_ENV } from '../env';

const BASE_URL = IS_SERVER_ENV ? 'http://api:3000' : '/api';

export const axios = axiosGlobal.create({
  baseURL: `${BASE_URL}`,
});
