import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import Navbar from "@/components/navbar"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-blue-100 dark:from-slate-950 dark:to-slate-900">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <section className="relative flex flex-col items-center justify-center px-4 py-24 md:py-32 lg:py-40">
          {/* Background pattern */}
          <div className="absolute inset-0 z-0 opacity-10 dark:opacity-5">
            <svg
              className="h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 100 L100 0 L100 100 Z" fill="url(#gradient)" />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#2563EB" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Hero content */}
          <div className="relative z-10 max-w-5xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                AI-Powered
              </span>{" "}
              Stock Market Analysis
            </h1>
            <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 max-w-3xl mx-auto mb-8">
              Leverage the power of multiple AI agents working together to analyze market trends, sentiment, and
              technical indicators for smarter investment decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
              >
                <Link href="/dashboard">
                  Start Analysis <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="#features">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="features" className="py-16 px-4 bg-white dark:bg-slate-900">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-slate-900 dark:text-white">
              How Our System Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Multi-Agent Analysis",
                  description: "Multiple specialized AI agents work together to analyze different aspects of stocks.",
                  icon: "🤖",
                },
                {
                  title: "Sentiment Analysis",
                  description: "Analyze news, social media, and market sentiment to gauge market perception.",
                  icon: "📊",
                },
                {
                  title: "Technical Indicators",
                  description: "Evaluate price movements, volume, and technical patterns for trading signals.",
                  icon: "📈",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-blue-50 dark:bg-slate-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">{feature.title}</h3>
                  <p className="text-slate-700 dark:text-slate-300">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to make data-driven investment decisions?</h2>
            <p className="text-lg mb-8 text-blue-100">
              Our AI-powered system provides you with actionable insights based on comprehensive market analysis.
            </p>
            <Button asChild size="lg" variant="secondary">
              <Link href="/dashboard">Get Started Now</Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 text-slate-300 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold text-white">StockAI</h3>
              <p className="text-sm">AI-Powered Multi-Agent Stock Market Analysis</p>
            </div>
            <div className="flex gap-6">
              <Link href="/dashboard" className="hover:text-white transition-colors">
                Dashboard
              </Link>
              <Link href="/telemetry" className="hover:text-white transition-colors">
                Telemetry
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                About
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-slate-800 text-center text-sm">
            &copy; {new Date().getFullYear()} StockAI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

