import {RestClient, IRestResponse} from 'typed-rest-client/RestClient';

interface CoinPrice {
    bid: number;
    ask: number;
    last: number;
}

export class CoinSpotRESTService {
    private fullAccessKey: string;
    private readOnlyKey: string; 

    private readOnlyClient: RestClient;
    private privateClient: RestClient;

    constructor( fullAccessKey: string, readOnlyKey: string) {  
        this.fullAccessKey = fullAccessKey;
        this.readOnlyKey = readOnlyKey;
        this.readOnlyClient =  new RestClient(null, 'https://www.coinspot.com.au/pubapi/v2');
        this.privateClient =  new RestClient(null, 'https://www.coinspot.com.au/api/v2');
    }  

    async getCoinPrice(coinTicker : string){
        let res: IRestResponse<CoinPrice> = await this.readOnlyClient.get<CoinPrice>('/latest');
        let value;
        console.log(res);
        if(res.statusCode == 200){
            value = res.statusCode;
        }else{
            value = res;
        }
        return value;
    };

    getMarketValues(){

    }

    sellCoin( coinTicker: string, sellValue: number, sellAmount: number): boolean { 

        return true;
    }

}