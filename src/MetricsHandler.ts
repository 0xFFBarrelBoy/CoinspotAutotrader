export class MetricsHandler {
    private latestPrice: number;
    private percentDelta: number;

    private scale: number;
    private prices: Array<number>;

    private iter: number;
    private leadingIter: number;

    constructor(scale: number) {
        this.scale = scale;
        this.prices = Array<number>(scale).fill(0);
        this.iter = 0;
        this.leadingIter = 1;

        this.percentDelta = 0;
    }

    addPrice(currentPrice: number): void {
        this.percentDelta = (1 - currentPrice / this.prices[this.leadingIter]);
        this.prices[this.iter] = currentPrice;
        this.latestPrice = currentPrice;
        this.iter = this.leadingIter;
        this.leadingIter += 1;
        if (this.leadingIter == this.scale) {
            this.leadingIter = 0;
        }
    }

    getAverage(): number {
        let count = 0;
        let total: number = 0;
        this.prices.forEach(value => {
            if (value != 0) {
                total += +value;
                count++;
            }
        })
        return MetricsHandler.precisionRound(total / count, 3)

    }

    getLatestPrice(): number {
        return MetricsHandler.precisionRound(this.latestPrice, 3)
    }

    getDelta(): number {
        return MetricsHandler.precisionRound(this.percentDelta, 3);
    }

    private static precisionRound(number: number, precision: number) {
        if (precision < 0) {
            let factor = Math.pow(10, precision);
            return Math.round(number * factor) / factor;
        }
        else
            return +(Math.round(Number(number + "e+" + precision)) +
                "e-" + precision);
    }
}