import axios from 'axios';
import { AxiosInstance } from 'axios';
import { createHmac } from 'crypto';

const fetch = require('node-fetch');

interface coinspotPayload {
    'coin'?: string;
    'amount'?: number;
    'rate'?: number;
    'nonce'?: number;
}

export class CoinSpotRESTService {
    private fullAccessKey: string;
    private secretKey: string;

    private privateClient = axios.create({
        baseURL: 'https://www.coinspot.com.au/api/v2',
        timeout: 1000
    });

    private marketStateClient = axios.create({
        baseURL: 'https://www.coinspot.com.au/pubapi/v2/latest',
        timeout: 10000
    });

    constructor(fullAccessKey: string, secretKey: string) {
        this.fullAccessKey = fullAccessKey;
        this.secretKey = secretKey;
    }

    private async sendRequest(client: AxiosInstance, apiPath: string, postData?: coinspotPayload) {
        let nonce = new Date().getTime();

        let payload;
        if (!postData) {
            payload = { 'nonce': nonce };
        } else {
            payload = postData;
            payload['nonce'] = nonce;
        }

        let encrPayload = createHmac('sha512', this.secretKey);
        encrPayload.update(JSON.stringify(payload));

        let sign = encrPayload.digest('hex');

        client.defaults.headers = {
            'key': this.fullAccessKey,
            'sign': sign,
            'Content-Type': 'application/json',
            'User-Agent': 'Axios'
        };
        return client.post(apiPath, { 'nonce': nonce });
    }

    async getCoinPrice(coinTicker: string) {
        return this.sendRequest(this.marketStateClient, "/latest/${coinTicker}", {});
    };

}