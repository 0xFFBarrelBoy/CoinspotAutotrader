export class CoinHoldings {
    public coinTicker: string;
    public averageBuy: number | undefined;
    public units: number | undefined;

    constructor(coinTicker: string) {
        this.coinTicker = coinTicker;
    }

    addPurchase(averageBuy: number, units: number) {
        this.averageBuy = averageBuy;
        this.units = units;
    }

    //TODO: Add in ability to have multiple purchases 

}