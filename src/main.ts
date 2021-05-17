import { CoinSpotRESTService } from "./coinspot-rest-api";

let restClient = new CoinSpotRESTService('','');

restClient.getCoinPrice('DOGE').then((value) => {
    console.log(value);
})
