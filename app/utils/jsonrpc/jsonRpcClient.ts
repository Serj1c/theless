import { IS_SERVER_ENV } from '../env'
import JsonRpc from './jsonrpc';

const BASE_URL = IS_SERVER_ENV ? 'http://api:3000' : '';
const jsonRpcClient = new JsonRpc({ server: `${BASE_URL}/api` });

export {
    jsonRpcClient,
}
