import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Trophy, Lightbulb } from "lucide-react";

const questions = [
  {
    question: "What is a market maker's primary job?",
    options: [
      "To predict which way stocks will move",
      "To provide liquidity by buying and selling securities",
      "To manipulate stock prices",
      "To invest in companies long-term",
    ],
    correct: 1,
    explanation:
      "Market makers provide liquidity by continuously offering to buy (bid) and sell (ask) securities, earning the spread between the two prices.",
  },
  {
    question: "If a market maker is 'short gamma' and the stock price rises, what do they do?",
    options: [
      "Sell shares to hedge",
      "Do nothing",
      "Buy shares to hedge",
      "Close their position entirely",
    ],
    correct: 2,
    explanation:
      "When short gamma, rising prices increase delta, forcing market makers to BUY more shares to maintain their hedge. This amplifies the upward move!",
  },
  {
    question: "What does high gamma near a strike price indicate?",
    options: [
      "The option is worthless",
      "Delta will change rapidly with small price moves",
      "The stock is very stable",
      "Market makers don't need to hedge",
    ],
    correct: 1,
    explanation:
      "Gamma is highest at-the-money. This means delta (and hedging needs) change rapidly as the stock price moves, potentially causing large swings.",
  },
  {
    question: "During a 'gamma squeeze', what happens?",
    options: [
      "Stock prices become very stable",
      "Market makers stop trading",
      "Forced hedging creates a feedback loop amplifying price moves",
      "Options become worthless",
    ],
    correct: 2,
    explanation:
      "A gamma squeeze occurs when market maker hedging activity amplifies price movements, creating a powerful feedback loop that can send prices soaring!",
  },
  {
    question: "When is market volatility typically LOWER?",
    options: [
      "When GEX (Gamma Exposure) is negative",
      "When GEX is positive",
      "When there are no options trading",
      "On earnings days",
    ],
    correct: 1,
    explanation:
      "Positive GEX means market makers are long gamma and will SELL into rallies and BUY dips, naturally dampening price swings and reducing volatility.",
  },
];

const InteractiveQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const handleAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);
    if (index === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizComplete(false);
  };

  const progress = ((currentQuestion + (showResult ? 1 : 0)) / questions.length) * 100;

  return (
    <section id="quiz" className="py-24 px-4 bg-gradient-to-b from-background via-secondary/10 to-background">
      <div className="container max-w-3xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
            Test Your <span className="gradient-text">Knowledge</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Put what you've learned to the test with this quick quiz
          </p>
        </motion.div>

        <motion.div
          className="rounded-2xl glass p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <AnimatePresence mode="wait">
            {!quizComplete ? (
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                {/* Progress bar */}
                <div className="mb-8">
                  <div className="flex justify-between text-sm text-muted-foreground mb-2">
                    <span>Question {currentQuestion + 1} of {questions.length}</span>
                    <span>{score} correct</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary rounded-full"
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                {/* Question */}
                <h3 className="text-xl font-semibold font-display mb-6">
                  {questions[currentQuestion].question}
                </h3>

                {/* Options */}
                <div className="space-y-3 mb-6">
                  {questions[currentQuestion].options.map((option, index) => {
                    const isCorrect = index === questions[currentQuestion].correct;
                    const isSelected = index === selectedAnswer;
                    let optionClass = "glass hover:bg-secondary";

                    if (showResult) {
                      if (isCorrect) {
                        optionClass = "bg-success/20 border-success";
                      } else if (isSelected && !isCorrect) {
                        optionClass = "bg-destructive/20 border-destructive";
                      } else {
                        optionClass = "opacity-50";
                      }
                    }

                    return (
                      <motion.button
                        key={index}
                        onClick={() => handleAnswer(index)}
                        className={`w-full p-4 rounded-xl text-left transition-all flex items-center gap-4 border ${optionClass}`}
                        whileHover={!showResult ? { scale: 1.01 } : {}}
                        whileTap={!showResult ? { scale: 0.99 } : {}}
                        disabled={showResult}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                            showResult && isCorrect
                              ? "bg-success text-success-foreground"
                              : showResult && isSelected
                              ? "bg-destructive text-destructive-foreground"
                              : "bg-secondary"
                          }`}
                        >
                          {showResult && isCorrect ? (
                            <CheckCircle2 className="w-5 h-5" />
                          ) : showResult && isSelected ? (
                            <XCircle className="w-5 h-5" />
                          ) : (
                            String.fromCharCode(65 + index)
                          )}
                        </div>
                        <span>{option}</span>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Explanation */}
                <AnimatePresence>
                  {showResult && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-6"
                    >
                      <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 flex items-start gap-3">
                        <Lightbulb className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <p className="text-sm">{questions[currentQuestion].explanation}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Next button */}
                {showResult && (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={nextQuestion}
                    className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                  >
                    {currentQuestion < questions.length - 1 ? (
                      <>
                        Next Question <ArrowRight className="w-5 h-5" />
                      </>
                    ) : (
                      <>
                        See Results <Trophy className="w-5 h-5" />
                      </>
                    )}
                  </motion.button>
                )}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <motion.div
                  className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                >
                  <Trophy className="w-12 h-12 text-primary" />
                </motion.div>

                <h3 className="text-3xl font-bold font-display mb-2">Quiz Complete!</h3>
                <p className="text-muted-foreground mb-8">
                  You scored{" "}
                  <span className="text-primary font-bold">{score}</span> out of{" "}
                  <span className="font-bold">{questions.length}</span>
                </p>

                <div className="grid grid-cols-5 gap-2 mb-8">
                  {questions.map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 rounded-full ${
                        index < score ? "bg-success" : "bg-destructive"
                      }`}
                    />
                  ))}
                </div>

                <p className="text-lg mb-8">
                  {score === questions.length
                    ? "🎉 Perfect score! You're a gamma expert!"
                    : score >= questions.length * 0.8
                    ? "🌟 Great job! You've got a solid understanding!"
                    : score >= questions.length * 0.6
                    ? "👍 Good effort! Review the concepts above to improve."
                    : "📚 Keep learning! Try the interactive tutorials above."}
                </p>

                <button
                  onClick={resetQuiz}
                  className="px-8 py-4 rounded-xl glass hover:bg-secondary transition-colors flex items-center gap-2 mx-auto"
                >
                  <RotateCcw className="w-5 h-5" />
                  Try Again
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default InteractiveQuiz;
