import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, AlertTriangle, Info } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

const GammaSimulator = () => {
  const [stockPrice, setStockPrice] = useState(100);
  const [previousPrice, setPreviousPrice] = useState(100);
  const [strikePrice] = useState(100);
  const [isShortGamma, setIsShortGamma] = useState(true);
  const [showExplanation, setShowExplanation] = useState(false);

  // Calculate delta and gamma based on price distance from strike
  const distanceFromStrike = stockPrice - strikePrice;
  const delta = Math.min(1, Math.max(0, 0.5 + distanceFromStrike * 0.02));
  const gamma = Math.exp(-Math.pow(distanceFromStrike / 10, 2)) * 0.1;

  // Market maker's hedging action
  const priceChange = stockPrice - previousPrice;
  const hedgingAction = isShortGamma
    ? priceChange > 0
      ? "BUYING"
      : priceChange < 0
      ? "SELLING"
      : "HOLDING"
    : priceChange > 0
    ? "SELLING"
    : priceChange < 0
    ? "BUYING"
    : "HOLDING";

  const sharesNeeded = Math.round(delta * 100);
  const previousShares = Math.round(
    Math.min(1, Math.max(0, 0.5 + (previousPrice - strikePrice) * 0.02)) * 100
  );
  const shareChange = sharesNeeded - previousShares;

  useEffect(() => {
    const timer = setTimeout(() => setPreviousPrice(stockPrice), 300);
    return () => clearTimeout(timer);
  }, [stockPrice]);

  return (
    <section id="simulator" className="py-24 px-4 bg-gradient-to-b from-background via-secondary/10 to-background">
      <div className="container max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
            Interactive <span className="gradient-text">Simulator</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Move the stock price and watch how market makers react in real-time
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Control Panel */}
          <motion.div
            className="rounded-2xl glass p-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold font-display mb-6">Control Panel</h3>

            {/* Stock Price Slider */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <label className="text-sm font-medium text-muted-foreground">Stock Price</label>
                <span className="text-2xl font-bold font-display">${stockPrice.toFixed(2)}</span>
              </div>
              <Slider
                value={[stockPrice]}
                onValueChange={(v) => setStockPrice(v[0])}
                min={80}
                max={120}
                step={0.5}
                className="w-full"
              />
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>$80</span>
                <span className="text-primary">Strike: $100</span>
                <span>$120</span>
              </div>
            </div>

            {/* Gamma Position Toggle */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 mb-6">
              <div>
                <p className="font-medium">Market Maker Position</p>
                <p className="text-sm text-muted-foreground">
                  {isShortGamma ? "Short Gamma (sold options)" : "Long Gamma (bought options)"}
                </p>
              </div>
              <Switch checked={isShortGamma} onCheckedChange={setIsShortGamma} />
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setStockPrice(90)}
                className="p-3 rounded-xl bg-destructive/20 hover:bg-destructive/30 transition-colors text-center"
              >
                <TrendingDown className="w-5 h-5 mx-auto mb-1 text-destructive" />
                <span className="text-xs">Drop to $90</span>
              </button>
              <button
                onClick={() => setStockPrice(100)}
                className="p-3 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors text-center"
              >
                <span className="text-lg mb-1 block">⚡</span>
                <span className="text-xs">At Strike</span>
              </button>
              <button
                onClick={() => setStockPrice(110)}
                className="p-3 rounded-xl bg-success/20 hover:bg-success/30 transition-colors text-center"
              >
                <TrendingUp className="w-5 h-5 mx-auto mb-1 text-success" />
                <span className="text-xs">Rally to $110</span>
              </button>
            </div>
          </motion.div>

          {/* Visualization Panel */}
          <motion.div
            className="rounded-2xl glass p-8"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold font-display mb-6">Market Maker Response</h3>

            {/* Delta & Gamma Meters */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-secondary/50">
                <p className="text-sm text-muted-foreground mb-2">Delta</p>
                <div className="relative h-4 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-primary/70 rounded-full"
                    animate={{ width: `${delta * 100}%` }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                </div>
                <p className="text-right text-lg font-bold mt-2">{delta.toFixed(2)}</p>
              </div>
              <div className="p-4 rounded-xl bg-secondary/50">
                <p className="text-sm text-muted-foreground mb-2">Gamma</p>
                <div className="relative h-4 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-warning to-warning/70 rounded-full"
                    animate={{ width: `${gamma * 1000}%` }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                </div>
                <p className="text-right text-lg font-bold mt-2">{gamma.toFixed(3)}</p>
              </div>
            </div>

            {/* Hedging Action */}
            <motion.div
              className={`p-6 rounded-xl mb-6 ${
                hedgingAction === "BUYING"
                  ? "bg-success/20 border border-success/30"
                  : hedgingAction === "SELLING"
                  ? "bg-destructive/20 border border-destructive/30"
                  : "bg-secondary/50 border border-border"
              }`}
              animate={{
                scale: hedgingAction !== "HOLDING" ? [1, 1.02, 1] : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-4">
                {hedgingAction === "BUYING" && <TrendingUp className="w-10 h-10 text-success" />}
                {hedgingAction === "SELLING" && <TrendingDown className="w-10 h-10 text-destructive" />}
                {hedgingAction === "HOLDING" && <span className="text-4xl">⏸️</span>}
                <div>
                  <p className="text-2xl font-bold font-display">{hedgingAction}</p>
                  <p className="text-muted-foreground">
                    {hedgingAction !== "HOLDING"
                      ? `${Math.abs(shareChange)} shares to rebalance`
                      : "No action needed"}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Current Position */}
            <div className="p-4 rounded-xl bg-secondary/50">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Shares Held for Hedge:</span>
                <span className="text-2xl font-bold font-display">{sharesNeeded}</span>
              </div>
            </div>

            {/* Info Toggle */}
            <button
              onClick={() => setShowExplanation(!showExplanation)}
              className="flex items-center gap-2 mt-4 text-sm text-primary hover:underline"
            >
              <Info className="w-4 h-4" />
              {showExplanation ? "Hide" : "Show"} explanation
            </button>

            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-4 p-4 rounded-xl bg-primary/10 border border-primary/20"
              >
                <p className="text-sm leading-relaxed">
                  {isShortGamma ? (
                    <>
                      <strong>Short Gamma:</strong> When the market maker has sold options, they must
                      buy shares as the price rises (increasing delta) and sell shares as it falls.
                      This <em>amplifies</em> price movements!
                    </>
                  ) : (
                    <>
                      <strong>Long Gamma:</strong> When the market maker owns options, they can sell
                      into rallies and buy dips. This <em>dampens</em> price movements and provides
                      natural resistance.
                    </>
                  )}
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Warning callout */}
        <motion.div
          className="mt-8 p-6 rounded-2xl bg-warning/10 border border-warning/30 flex items-start gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <AlertTriangle className="w-6 h-6 text-warning flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-semibold font-display mb-1">The Gamma Squeeze Effect</h4>
            <p className="text-muted-foreground text-sm">
              When many traders buy call options near a strike price, market makers become heavily
              short gamma. If the stock price starts rising toward that strike, the forced buying
              to hedge can create a powerful feedback loop – a "gamma squeeze" that sends prices
              rocketing higher!
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GammaSimulator;
