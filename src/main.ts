import { CoinSpotRESTService } from "./CoinSpotRESTService";

let restClient = new CoinSpotRESTService('', '');

restClient.getMarketPrices().then(marketTable => {
    console.log(marketTable);
});

