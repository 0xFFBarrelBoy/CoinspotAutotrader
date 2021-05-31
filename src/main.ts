import { CoinSpotRESTService } from "./CoinSpotRESTService";
import { CoinHoldings } from './CoinHoldings';
import { MetricsHandler } from './MetricsHandler';

let restClient = new CoinSpotRESTService('', '');
let currentHoldings = new Map<String, CoinHoldings>();
let marketData = new Map<String, MetricsHandler>();

restClient.getMarketPrices().then(marketTable => {
    for (let key in marketTable) {
        currentHoldings.set(key, new CoinHoldings());
    }
    console.log(marketTable.btc)
    currentHoldings.get('btc')?.addPurchase(marketTable.btc.bid, 1);
    console.log(currentHoldings.get('btc')?.getCost());
});

