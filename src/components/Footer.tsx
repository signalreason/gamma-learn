import { motion } from "framer-motion";
import { Github, Twitter, BookOpen } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-16 px-4 border-t border-border">
      <div className="container max-w-6xl mx-auto">
        <motion.div
          className="grid md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <h3 className="text-xl font-bold font-display gradient-text mb-4">
              GammaLearn
            </h3>
            <p className="text-muted-foreground text-sm">
              Making complex financial concepts accessible to everyone through
              interactive learning experiences.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#learn" className="hover:text-primary transition-colors">
                  Core Concepts
                </a>
              </li>
              <li>
                <a href="#simulator" className="hover:text-primary transition-colors">
                  Interactive Simulator
                </a>
              </li>
              <li>
                <a href="#quiz" className="hover:text-primary transition-colors">
                  Take the Quiz
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="p-2 rounded-lg glass hover:bg-secondary transition-colors"
              >
                <BookOpen className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg glass hover:bg-secondary transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg glass hover:bg-secondary transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </motion.div>

        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>
            Built for educational purposes. This is not financial advice.
            Always do your own research before trading.
          </p>
          <p className="mt-2">© 2024 GammaLearn. Learn Markets, Learn Freedom.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
