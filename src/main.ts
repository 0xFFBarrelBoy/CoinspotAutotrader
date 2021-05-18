import { CoinSpotRESTService } from "./coinspot-rest-api";

let restClient = new CoinSpotRESTService('ACCESS KEY','SECRET KEY');

restClient.getCoinPrice('DOGE').then((value) => {
    console.log(value);
})
