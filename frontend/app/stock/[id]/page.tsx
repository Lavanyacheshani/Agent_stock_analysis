"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Loader2,
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart3,
  Newspaper,
  AlertTriangle,
} from "lucide-react"
import Link from "next/link"
import DashboardLayout from "@/components/dashboard-layout"
import StockChart from "@/components/stock-chart"

// Mock data for demonstration
const mockStockDetails = {
  id: 1,
  name: "AAPL",
  fullName: "Apple Inc.",
  price: 182.52,
  change: 1.23,
  sentiment: 0.82,
  recommendation: "Buy",
  marketCap: "2.85T",
  volume: "58.7M",
  pe: 30.25,
  dividend: 0.92,
  yearHigh: 198.23,
  yearLow: 124.17,
  rsi: 62,
  macd: 1.45,
  movingAvg50: 175.34,
  movingAvg200: 168.92,
  news: [
    {
      id: 1,
      title: "Apple announces new iPhone model with AI features",
      source: "Tech News",
      date: "2023-09-15",
      sentiment: 0.85,
    },
    {
      id: 2,
      title: "Apple's services revenue hits all-time high",
      source: "Financial Times",
      date: "2023-09-10",
      sentiment: 0.92,
    },
    {
      id: 3,
      title: "Supply chain issues may impact Apple's holiday quarter",
      source: "Market Watch",
      date: "2023-09-05",
      sentiment: 0.35,
    },
  ],
  analysisPoints: [
    "Strong financial performance with growing services revenue",
    "Positive consumer sentiment around upcoming product launches",
    "Technical indicators suggest upward momentum",
    "Potential supply chain risks in the short term",
    "Valuation remains reasonable compared to sector peers",
  ],
  historicalData: [
    { date: "2023-08-01", price: 165.23 },
    { date: "2023-08-08", price: 168.45 },
    { date: "2023-08-15", price: 172.31 },
    { date: "2023-08-22", price: 175.84 },
    { date: "2023-08-29", price: 178.56 },
    { date: "2023-09-05", price: 176.32 },
    { date: "2023-09-12", price: 180.45 },
    { date: "2023-09-19", price: 182.52 },
  ],
}

export default function StockDetail() {
  const params = useParams()
  const { id } = params
  const [stock, setStock] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchStockDetails()
  }, [id])

  const fetchStockDetails = async () => {
    setLoading(true)
    try {
      // In a real app, this would be an API call
      // const response = await axios.get(`/api/get-detail/${id}`)
      // setStock(response.data)

      // Using mock data for demonstration
      setTimeout(() => {
        setStock(mockStockDetails)
        setLoading(false)
      }, 1000)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error fetching stock details",
        description: "There was a problem fetching the stock details.",
      })
      setLoading(false)
    }
  }

  const getSentimentColor = (sentiment: number) => {
    if (sentiment >= 0.7) return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    if (sentiment >= 0.4) return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
    return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
  }

  const getRecommendationColor = (recommendation: string) => {
    if (recommendation === "Buy") return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    if (recommendation === "Hold") return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
    return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-[calc(100vh-200px)]">
          <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
        </div>
      </DashboardLayout>
    )
  }

  if (!stock) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)]">
          <AlertTriangle className="h-12 w-12 text-yellow-500 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Stock Not Found</h2>
          <p className="text-muted-foreground mb-4">The requested stock could not be found.</p>
          <Button asChild>
            <Link href="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" size="sm" className="p-0 h-8 w-8">
                <Link href="/dashboard">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <h1 className="text-2xl font-bold tracking-tight">
                {stock.name} - {stock.fullName}
              </h1>
            </div>
            <p className="text-muted-foreground">Detailed analysis and recommendations</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-2xl font-bold">${stock.price.toFixed(2)}</div>
            <div className="flex items-center">
              {stock.change > 0 ? (
                <TrendingUp className="mr-1 h-5 w-5 text-green-500" />
              ) : (
                <TrendingDown className="mr-1 h-5 w-5 text-red-500" />
              )}
              <span className={`text-lg ${stock.change > 0 ? "text-green-500" : "text-red-500"}`}>
                {stock.change > 0 ? "+" : ""}
                {stock.change.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Price History</CardTitle>
              <CardDescription>Historical price data with technical indicators</CardDescription>
            </CardHeader>
            <CardContent className="h-[350px]">
              <StockChart data={stock.historicalData} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>AI Recommendation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center justify-center py-4">
                <Badge className={`text-lg px-4 py-2 mb-4 ${getRecommendationColor(stock.recommendation)}`}>
                  {stock.recommendation}
                </Badge>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">Sentiment Score</p>
                  <div className="flex items-center justify-center">
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${stock.sentiment * 100}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-sm font-medium">{(stock.sentiment * 100).toFixed(0)}%</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Key Analysis Points</h3>
                <ul className="space-y-2">
                  {stock.analysisPoints.map((point: string, index: number) => (
                    <li key={index} className="text-sm flex">
                      <span className="text-blue-500 mr-2">•</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="market-data">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="market-data">
              <DollarSign className="h-4 w-4 mr-2" />
              Market Data
            </TabsTrigger>
            <TabsTrigger value="technical">
              <BarChart3 className="h-4 w-4 mr-2" />
              Technical Indicators
            </TabsTrigger>
            <TabsTrigger value="news">
              <Newspaper className="h-4 w-4 mr-2" />
              News Sentiment
            </TabsTrigger>
          </TabsList>
          <TabsContent value="market-data" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Market Data</CardTitle>
                <CardDescription>Key financial metrics and market information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Market Cap", value: `$${stock.marketCap}` },
                    { label: "Volume", value: stock.volume },
                    { label: "P/E Ratio", value: stock.pe.toFixed(2) },
                    { label: "Dividend Yield", value: `${stock.dividend}%` },
                    { label: "52-Week High", value: `$${stock.yearHigh.toFixed(2)}` },
                    { label: "52-Week Low", value: `$${stock.yearLow.toFixed(2)}` },
                    { label: "Avg. Volume", value: "62.3M" },
                    { label: "Beta", value: "1.28" },
                  ].map((item, index) => (
                    <div key={index} className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
                      <p className="text-lg font-medium">{item.value}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="technical" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Technical Indicators</CardTitle>
                <CardDescription>Analysis of price movements and technical patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-4">Momentum Indicators</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">RSI (14)</span>
                          <span className="text-sm font-medium">{stock.rsi}</span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
                          <div
                            className={`h-2.5 rounded-full ${
                              stock.rsi > 70 ? "bg-red-500" : stock.rsi < 30 ? "bg-green-500" : "bg-blue-500"
                            }`}
                            style={{ width: `${stock.rsi}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs mt-1">
                          <span>Oversold</span>
                          <span>Neutral</span>
                          <span>Overbought</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">MACD</span>
                          <span className={`text-sm font-medium ${stock.macd > 0 ? "text-green-500" : "text-red-500"}`}>
                            {stock.macd > 0 ? "+" : ""}
                            {stock.macd.toFixed(2)}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {stock.macd > 0
                            ? "Bullish momentum: MACD above signal line"
                            : "Bearish momentum: MACD below signal line"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-4">Moving Averages</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>50-Day MA</span>
                        <div className="flex items-center">
                          <span className="mr-2">${stock.movingAvg50.toFixed(2)}</span>
                          {stock.price > stock.movingAvg50 ? (
                            <Badge
                              variant="outline"
                              className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            >
                              Above
                            </Badge>
                          ) : (
                            <Badge
                              variant="outline"
                              className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                            >
                              Below
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>200-Day MA</span>
                        <div className="flex items-center">
                          <span className="mr-2">${stock.movingAvg200.toFixed(2)}</span>
                          {stock.price > stock.movingAvg200 ? (
                            <Badge
                              variant="outline"
                              className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            >
                              Above
                            </Badge>
                          ) : (
                            <Badge
                              variant="outline"
                              className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                            >
                              Below
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="pt-2">
                        <h4 className="text-sm font-medium mb-2">Support & Resistance</h4>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-slate-50 dark:bg-slate-800 p-2 rounded">
                            <p className="text-xs text-muted-foreground">Support</p>
                            <p className="font-medium">${(stock.price * 0.95).toFixed(2)}</p>
                          </div>
                          <div className="bg-slate-50 dark:bg-slate-800 p-2 rounded">
                            <p className="text-xs text-muted-foreground">Resistance</p>
                            <p className="font-medium">${(stock.price * 1.05).toFixed(2)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="news" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>News Sentiment Analysis</CardTitle>
                <CardDescription>AI analysis of recent news and market sentiment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {stock.news.map((item: any) => (
                    <div key={item.id} className="border-b pb-4 last:border-0">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{item.title}</h3>
                        <Badge variant="outline" className={getSentimentColor(item.sentiment)}>
                          {(item.sentiment * 100).toFixed(0)}%
                        </Badge>
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{item.source}</span>
                        <span>{item.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-muted-foreground">
                  Overall news sentiment: <span className="font-medium text-green-500">Positive</span>
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

