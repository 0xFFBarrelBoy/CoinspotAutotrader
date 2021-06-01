import { CoinSpotRESTService } from "./CoinSpotRESTService";
import { CoinHoldings } from './CoinHoldings';
import { MetricsHandler } from './MetricsHandler';
import { MarketQuery } from './JsonTemplates';
import cron from 'node-cron';

let restClient = new CoinSpotRESTService('', '');
let currentHoldings = new Map<String, CoinHoldings>();
let marketData = new Map<String, MetricsHandler>();


cron.schedule('* * * * *', () => {
    restClient.getMarketPrices().then(marketTable => {
        for (let key in marketTable) {
            let prices: MarketQuery = marketTable[key];
            if (marketData.has(key) === false) {
                marketData.set(key, new MetricsHandler(10));
                console.log('added ' + key + ' ' + prices.last);
            }
            else {
                let metricsHandler = marketData.get(key);
                if (metricsHandler) {
                    metricsHandler.addPrice(prices.last);
                    console.log(key + ' avg: ' + metricsHandler.getAverage());
                }
            }
        }
    });
})