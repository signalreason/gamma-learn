import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowUp, ArrowDown, TrendingUp, TrendingDown, Minus } from "lucide-react";

const scenarios = [
  {
    id: "negative",
    label: "Negative GEX",
    description: "Market makers are net short gamma",
    icon: TrendingDown,
    color: "destructive",
    effects: [
      { label: "Price rises", action: "MM buys more stock", result: "Amplifies upward move" },
      { label: "Price falls", action: "MM sells stock", result: "Amplifies downward move" },
    ],
    insight: "Expect higher volatility and larger price swings",
  },
  {
    id: "neutral",
    label: "Neutral GEX",
    description: "Market makers are gamma neutral",
    icon: Minus,
    color: "warning",
    effects: [
      { label: "Price rises", action: "Minimal hedging", result: "Normal price action" },
      { label: "Price falls", action: "Minimal hedging", result: "Normal price action" },
    ],
    insight: "Price moves naturally based on supply/demand",
  },
  {
    id: "positive",
    label: "Positive GEX",
    description: "Market makers are net long gamma",
    icon: TrendingUp,
    color: "success",
    effects: [
      { label: "Price rises", action: "MM sells stock", result: "Dampens upward move" },
      { label: "Price falls", action: "MM buys stock", result: "Dampens downward move" },
    ],
    insight: "Expect lower volatility and mean reversion",
  },
];

const GammaVisualization = () => {
  const [activeScenario, setActiveScenario] = useState("negative");
  const scenario = scenarios.find((s) => s.id === activeScenario)!;

  return (
    <section className="py-24 px-4">
      <div className="container max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
            GEX <span className="gradient-text">Scenarios</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            See how different gamma exposure environments affect market behavior
          </p>
        </motion.div>

        {/* Scenario Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {scenarios.map((s) => (
            <motion.button
              key={s.id}
              onClick={() => setActiveScenario(s.id)}
              className={`px-6 py-4 rounded-xl flex items-center gap-3 transition-all ${
                activeScenario === s.id
                  ? `bg-${s.color}/20 border-2 border-${s.color}`
                  : "glass hover:bg-secondary"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <s.icon className={`w-5 h-5 ${activeScenario === s.id ? `text-${s.color}` : ""}`} />
              <div className="text-left">
                <p className="font-semibold">{s.label}</p>
                <p className="text-xs text-muted-foreground">{s.description}</p>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Visualization */}
        <motion.div
          key={activeScenario}
          className="rounded-2xl glass p-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="grid md:grid-cols-2 gap-8">
            {scenario.effects.map((effect, index) => (
              <motion.div
                key={effect.label}
                className="relative"
                initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className={`p-3 rounded-full ${
                      effect.label.includes("rises") ? "bg-success/20" : "bg-destructive/20"
                    }`}
                  >
                    {effect.label.includes("rises") ? (
                      <ArrowUp className="w-6 h-6 text-success" />
                    ) : (
                      <ArrowDown className="w-6 h-6 text-destructive" />
                    )}
                  </div>
                  <h3 className="text-xl font-bold font-display">{effect.label}</h3>
                </div>

                {/* Flow visualization */}
                <div className="relative pl-8 border-l-2 border-dashed border-muted-foreground/30 space-y-6">
                  <motion.div
                    className="relative"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="absolute -left-[25px] w-4 h-4 rounded-full bg-primary" />
                    <div className="p-4 rounded-xl bg-secondary/50">
                      <p className="text-sm text-muted-foreground mb-1">Market Maker Action</p>
                      <p className="font-semibold">{effect.action}</p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="relative"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="absolute -left-[25px] w-4 h-4 rounded-full bg-accent" />
                    <div
                      className={`p-4 rounded-xl ${
                        scenario.id === "negative"
                          ? "bg-destructive/10 border border-destructive/30"
                          : scenario.id === "positive"
                          ? "bg-success/10 border border-success/30"
                          : "bg-warning/10 border border-warning/30"
                      }`}
                    >
                      <p className="text-sm text-muted-foreground mb-1">Result</p>
                      <p className="font-semibold">{effect.result}</p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Insight */}
          <motion.div
            className={`mt-8 p-6 rounded-xl text-center ${
              scenario.id === "negative"
                ? "bg-destructive/10"
                : scenario.id === "positive"
                ? "bg-success/10"
                : "bg-warning/10"
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <p className="text-lg">
              <span className="font-semibold font-display">Key Insight: </span>
              {scenario.insight}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default GammaVisualization;
