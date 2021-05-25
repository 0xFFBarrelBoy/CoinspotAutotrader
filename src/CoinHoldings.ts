export class CoinHoldings {
    private averageBuy: number;
    private units: number;
    private cost: number;

    constructor() {
        this.averageBuy = 0;
        this.units = 0;
        this.cost = 0;
    }

    addPurchase(buyPrice: number, parcelUnits: number): number {
        this.averageBuy = ((buyPrice * parcelUnits) + (this.units * this.averageBuy)) / (this.units + parcelUnits);
        this.cost += buyPrice * parcelUnits;
        this.units += parcelUnits;
        return this.units;
    }

    sellHoldings(sellPrice: number, sellUnits: number): number {
        this.cost -= sellPrice * sellUnits;
        this.units -= sellUnits;
        return this.units;
    }

    getHeldUnits(): number {
        return this.units;
    }

    getCost(): number {
        return this.cost;
    }

    getAvgBuy(): number {
        return this.averageBuy
    }

}