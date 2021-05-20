import { CoinSpotRESTService } from "./coinspot-rest-api";

let restClient = new CoinSpotRESTService('ACCESS KEY', 'SECRET KEY');


restClient.getMarketPrices().then(marketTable => {
    console.log(marketTable);
})
