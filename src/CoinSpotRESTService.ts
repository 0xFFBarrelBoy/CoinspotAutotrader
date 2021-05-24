import axios from 'axios';
import { createHmac } from 'crypto';

interface coinspotPayload {
    'cointype'?: string;
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
        baseURL: 'https://www.coinspot.com.au/pubapi/v2',
        timeout: 10000
    });

    constructor(fullAccessKey: string, secretKey: string) {
        this.fullAccessKey = fullAccessKey;
        this.secretKey = secretKey;
    }

    private async sendPostRequest(apiPath: string, postData?: coinspotPayload) {
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

        this.privateClient.defaults.headers = {
            'key': this.fullAccessKey,
            'sign': sign,
            'Content-Type': 'application/json',
            'User-Agent': 'Axios'
        };
        return this.privateClient.post(apiPath, postData);
    }

    private async sendGetRequest(apiPath: string) {

        this.marketStateClient.defaults.headers = {
            'Content-Type': 'application/json',
            'User-Agent': 'Axios'
        };

        return await this.marketStateClient.get(apiPath);
    }

    async getCoinPrice(coinTicker: string) {
        let res = await this.sendGetRequest('/latest/' + coinTicker);
        return res.data.last;
    };

    async getCoinLatestBuyPrice(coinTicker: string) {
        return this.sendGetRequest('/latest/buyprice/' + coinTicker);
    };

    async getCoinLatestSellPrice(coinTicker: string) {
        return this.sendGetRequest('/latest/sellprice/' + coinTicker);
    };

    async getMarketPrices() {
        let res = await this.sendGetRequest('/latest');
        return res.data.prices;
    };

}