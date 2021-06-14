import { CoinSpotRESTService } from "./CoinSpotRESTService";
import { CoinHoldings } from './CoinHoldings';
import { MetricsHandler } from './MetricsHandler';
import { MarketQuery } from './JsonTemplates';
import cron from 'node-cron';

let restClient = new CoinSpotRESTService('', '');
let currentHoldings = new Map<String, CoinHoldings>();
let marketData = new Map<String, MetricsHandler>();

let tableLog = {};
restClient.getMarketPrices().then(marketTable => {
    for (let key in marketTable) {
        let prices: MarketQuery = marketTable[key];
        marketData.set(key, new MetricsHandler(24));
        if (marketData.has(key))
            marketData.get(key).addPrice(prices.last);
        tableLog[key] = { 'Last Price': marketData.get(key).getLatestPrice() };
    };
    console.table(tableLog);

});


cron.schedule('0 * * * *', () => {
    restClient.getMarketPrices().then(marketTable => {
        for (let key in marketTable) {
            let prices: MarketQuery = marketTable[key];
            let metricsHandler = marketData.get(key);
            if (metricsHandler) {
                metricsHandler.addPrice(prices.last);
                tableLog[key] = { 'Last Price': metricsHandler.getLatestPrice(), 'Average': metricsHandler.getAverage(), 'Percent Change': metricsHandler.getDelta() };
            }
        }
        console.table(tableLog);
    });
})