import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronRight, DollarSign, BarChart3, Shield, Repeat } from "lucide-react";

const concepts = [
  {
    id: 1,
    icon: DollarSign,
    title: "What is a Market Maker?",
    shortDesc: "The middleman keeping markets liquid",
    fullDesc: `Market makers are financial institutions or individuals who continuously buy and sell securities, providing liquidity to the market. They profit from the spread between buy (bid) and sell (ask) prices.

Think of them like ticket scalpers at a concert – they're always ready to buy tickets from people leaving and sell to people arriving, making money on the difference.`,
    example: "If Stock XYZ has a bid of $99.95 and ask of $100.05, the market maker earns $0.10 per share traded.",
    color: "from-primary/20 to-primary/5",
  },
  {
    id: 2,
    icon: BarChart3,
    title: "Understanding Options",
    shortDesc: "Contracts that give you choices",
    fullDesc: `Options are contracts that give you the right (but not obligation) to buy or sell a stock at a specific price before a certain date.

CALL options: Bet the stock goes UP 📈
PUT options: Bet the stock goes DOWN 📉

When you buy an option, someone (often a market maker) is on the other side of that trade.`,
    example: "You buy a $100 call option on Apple expiring next month. If Apple rises to $110, you profit!",
    color: "from-success/20 to-success/5",
  },
  {
    id: 3,
    icon: Shield,
    title: "Delta Hedging",
    shortDesc: "How market makers stay neutral",
    fullDesc: `Delta measures how much an option's price moves when the stock moves $1. Market makers use delta to hedge their risk.

If a market maker sells you a call option, they're exposed if the stock rises. To stay neutral, they buy shares of the underlying stock proportional to the delta.

Delta ranges from 0 to 1 for calls, and 0 to -1 for puts.`,
    example: "Sold a call with 0.5 delta on 100 shares? Buy 50 shares to hedge. If delta increases to 0.7, buy 20 more.",
    color: "from-warning/20 to-warning/5",
  },
  {
    id: 4,
    icon: Repeat,
    title: "Gamma Exposure (GEX)",
    shortDesc: "The acceleration factor",
    fullDesc: `Gamma measures how fast delta changes. High gamma means delta changes rapidly as the stock price moves.

When market makers are "short gamma" (they've sold options), they must:
• BUY more shares as price rises (chasing the move UP)
• SELL shares as price falls (amplifying the move DOWN)

This creates a feedback loop that can accelerate price movements!`,
    example: "Stock at $100 with huge call open interest at $105. As price approaches $105, market makers scramble to buy shares, pushing it even higher!",
    color: "from-destructive/20 to-destructive/5",
  },
];

const ConceptCards = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <section id="learn" className="py-24 px-4">
      <div className="container max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
            Core <span className="gradient-text">Concepts</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Click each card to dive deeper into the mechanics of market making and gamma exposure
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {concepts.map((concept, index) => (
            <motion.div
              key={concept.id}
              className={`rounded-2xl glass overflow-hidden cursor-pointer transition-all duration-300 ${
                expandedId === concept.id ? "md:col-span-2" : ""
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setExpandedId(expandedId === concept.id ? null : concept.id)}
              layout
            >
              <div className={`h-2 bg-gradient-to-r ${concept.color}`} />
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${concept.color}`}>
                    <concept.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold font-display">{concept.title}</h3>
                      <motion.div
                        animate={{ rotate: expandedId === concept.id ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      </motion.div>
                    </div>
                    <p className="text-muted-foreground mt-1">{concept.shortDesc}</p>
                  </div>
                </div>

                <motion.div
                  initial={false}
                  animate={{
                    height: expandedId === concept.id ? "auto" : 0,
                    opacity: expandedId === concept.id ? 1 : 0,
                  }}
                  className="overflow-hidden"
                >
                  <div className="mt-6 pt-6 border-t border-border">
                    <p className="text-foreground/90 whitespace-pre-line leading-relaxed">
                      {concept.fullDesc}
                    </p>
                    <div className="mt-4 p-4 rounded-xl bg-secondary/50">
                      <p className="text-sm font-medium text-primary mb-1">💡 Example:</p>
                      <p className="text-sm text-muted-foreground">{concept.example}</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConceptCards;
