"use client"

import { useState, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Loader2, RefreshCw, TrendingUp, TrendingDown } from "lucide-react"
import Link from "next/link"
import DashboardLayout from "@/components/dashboard-layout"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

const sectors = ["All Sectors", "Technology", "Healthcare", "Finance", "Consumer Goods", "Energy"]

export default function Dashboard() {
  const [stocks, setStocks] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)
  const [selectedSector, setSelectedSector] = useState("All Sectors")
  const { toast } = useToast()

  useEffect(() => {
    fetchStocks()
  }, [])

  const fetchStocks = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${API_URL}/recommendations`)
      if (!response.ok) throw new Error("Failed to fetch recommendations")
      const data = await response.json()
      // Convert backend dict to array and map to UI fields
      const stocksArr = Object.values(data).map((rec: any, idx) => ({
        id: rec.symbol,
        name: rec.symbol,
        price: rec.current_price,
        change: 0, // Placeholder, backend does not provide change
        sentiment: rec.sentiment_summary.toLowerCase().includes("positive") ? 0.8 : rec.sentiment_summary.toLowerCase().includes("neutral") ? 0.5 : 0.2,
        recommendation: rec.recommendation,
        company_name: rec.company_name,
        sector: rec.sector,
        score: rec.score,
      }))
      setStocks(stocksArr)
      setLoading(false)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error fetching stocks",
        description: "There was a problem fetching the stock data.",
      })
      setLoading(false)
    }
  }

  const runAnalysis = async () => {
    setAnalyzing(true)
    try {
      // In a real app, this would be an API call
      // await axios.post('/api/run-analysis')

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Analysis Complete",
        description: "Stock recommendations have been updated.",
      })

      // Refresh stocks after analysis
      fetchStocks()
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: "There was a problem running the analysis.",
      })
    } finally {
      setAnalyzing(false)
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

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Stock Recommendations</h1>
            <p className="text-muted-foreground">AI-powered analysis of top performing stocks</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Select value={selectedSector} onValueChange={setSelectedSector}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Sector" />
              </SelectTrigger>
              <SelectContent>
                {sectors.map((sector) => (
                  <SelectItem key={sector} value={sector}>
                    {sector}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={runAnalysis} disabled={analyzing}>
              {analyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Run Analysis
                </>
              )}
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Top 5 Stocks</CardTitle>
            <CardDescription>Based on market data, sentiment analysis, and technical indicators</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Stock</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Change</TableHead>
                    <TableHead>Sentiment</TableHead>
                    <TableHead>Recommendation</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stocks.map((stock) => (
                    <TableRow key={stock.id}>
                      <TableCell className="font-medium">{stock.name}</TableCell>
                      <TableCell>${stock.price.toFixed(2)}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {stock.change > 0 ? (
                            <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                          ) : (
                            <TrendingDown className="mr-1 h-4 w-4 text-red-500" />
                          )}
                          <span className={stock.change > 0 ? "text-green-500" : "text-red-500"}>
                            {stock.change > 0 ? "+" : ""}
                            {stock.change.toFixed(2)}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getSentimentColor(stock.sentiment)}>
                          {stock.sentiment.toFixed(2)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getRecommendationColor(stock.recommendation)}>
                          {stock.recommendation}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button asChild variant="ghost" size="sm">
                          <Link href={`/stock/${stock.id}`}>Details</Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
          <CardFooter className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleString()}</CardFooter>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Market Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>S&P 500</span>
                  <span className="text-green-500">+0.75%</span>
                </div>
                <div className="flex justify-between">
                  <span>NASDAQ</span>
                  <span className="text-green-500">+1.25%</span>
                </div>
                <div className="flex justify-between">
                  <span>DOW</span>
                  <span className="text-red-500">-0.32%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sentiment Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Overall Market</span>
                  <Badge
                    variant="outline"
                    className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                  >
                    Bullish
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Tech Sector</span>
                  <Badge
                    variant="outline"
                    className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                  >
                    Bullish
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Energy Sector</span>
                  <Badge
                    variant="outline"
                    className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                  >
                    Neutral
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>AI Agents</span>
                  <Badge
                    variant="outline"
                    className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                  >
                    Online
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Data Feeds</span>
                  <Badge
                    variant="outline"
                    className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                  >
                    Connected
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Last Analysis</span>
                  <span className="text-sm">10 minutes ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

