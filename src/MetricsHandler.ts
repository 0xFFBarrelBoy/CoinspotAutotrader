export class MetricsHandler {
    public average: number;
    public percentDelta: number;
    public lastPrice: number;

    private scale: number;
    private prices: Array<number>;
    private iter: number;

    constructor(scale: number) {
        this.scale = scale;
        this.prices = Array<number>(scale).fill(0);
        this.iter = 0;

        this.average = 0;
        this.lastPrice = 0;
        this.percentDelta = 0;

    }

    addPrice(currentPrice: number): void {
        this.percentDelta = currentPrice / this.lastPrice;
        this.prices[this.iter] = currentPrice;
        this.average = this.getAverage();

        this.iter += 1;
        if (this.iter == this.scale) {
            this.iter = 0;
        }
    }

    getAverage(): number {
        const total = this.prices.reduce((runningTotal, price) => runningTotal + price, 0);
        return total / this.scale;
    }

}