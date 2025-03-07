"use client"

import { useState, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Loader2, Activity, AlertCircle, Clock, Database } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import TelemetryChart from "@/components/telemetry-chart"

// Mock data for demonstration
const mockTelemetryData = {
  apiCalls: {
    total: 1254,
    successful: 1203,
    failed: 51,
    byEndpoint: [
      { endpoint: "/run-analysis", count: 532, success: 512, error: 20 },
      { endpoint: "/get-stocks", count: 423, success: 410, error: 13 },
      { endpoint: "/get-detail", count: 299, success: 281, error: 18 },
    ],
    history: [
      { date: "2023-09-13", calls: 120 },
      { date: "2023-09-14", calls: 145 },
      { date: "2023-09-15", calls: 132 },
      { date: "2023-09-16", calls: 165 },
      { date: "2023-09-17", calls: 178 },
      { date: "2023-09-18", calls: 210 },
      { date: "2023-09-19", calls: 304 },
    ],
  },
  tokenUsage: {
    total: 8542367,
    byModel: [
      { model: "gpt-4", tokens: 3245678, cost: 64.91 },
      { model: "gpt-3.5-turbo", tokens: 5296689, cost: 10.59 },
    ],
    history: [
      { date: "2023-09-13", tokens: 754321 },
      { date: "2023-09-14", tokens: 892456 },
      { date: "2023-09-15", tokens: 923567 },
      { date: "2023-09-16", tokens: 1023456 },
      { date: "2023-09-17", tokens: 1245678 },
      { date: "2023-09-18", tokens: 1532456 },
      { date: "2023-09-19", tokens: 2170433 },
    ],
  },
  errors: [
    { id: 1, timestamp: "2023-09-19T14:32:45", endpoint: "/run-analysis", error: "Rate limit exceeded", status: 429 },
    {
      id: 2,
      timestamp: "2023-09-19T12:15:22",
      endpoint: "/get-detail/TSLA",
      error: "Data source unavailable",
      status: 503,
    },
    { id: 3, timestamp: "2023-09-19T10:05:17", endpoint: "/run-analysis", error: "Timeout error", status: 504 },
    { id: 4, timestamp: "2023-09-18T22:45:33", endpoint: "/get-stocks", error: "Authentication failed", status: 401 },
    { id: 5, timestamp: "2023-09-18T16:22:10", endpoint: "/get-detail/AMZN", error: "Resource not found", status: 404 },
  ],
  performance: {
    avgResponseTime: 245, // ms
    p95ResponseTime: 520, // ms
    p99ResponseTime: 890, // ms
    history: [
      { date: "2023-09-13", time: 210 },
      { date: "2023-09-14", time: 225 },
      { date: "2023-09-15", time: 218 },
      { date: "2023-09-16", time: 232 },
      { date: "2023-09-17", time: 245 },
      { date: "2023-09-18", time: 260 },
      { date: "2023-09-19", time: 245 },
    ],
  },
}

export default function Telemetry() {
  const [telemetryData, setTelemetryData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchTelemetryData()
  }, [])

  const fetchTelemetryData = async () => {
    setLoading(true)
    try {
      // In a real app, this would be an API call
      // const response = await axios.get('/api/telemetry')
      // setTelemetryData(response.data)

      // Using mock data for demonstration
      setTimeout(() => {
        setTelemetryData(mockTelemetryData)
        setLoading(false)
      }, 1000)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error fetching telemetry data",
        description: "There was a problem fetching the telemetry data.",
      })
      setLoading(false)
    }
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

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">System Telemetry</h1>
          <p className="text-muted-foreground">Performance metrics and system logs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total API Calls</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{telemetryData.apiCalls.total.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {telemetryData.apiCalls.successful.toLocaleString()} successful (
                {((telemetryData.apiCalls.successful / telemetryData.apiCalls.total) * 100).toFixed(1)}%)
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Token Usage</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{(telemetryData.tokenUsage.total / 1000000).toFixed(2)}M</div>
              <p className="text-xs text-muted-foreground">
                Est. cost: $
                {telemetryData.tokenUsage.byModel.reduce((acc: number, model: any) => acc + model.cost, 0).toFixed(2)}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Response Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{telemetryData.performance.avgResponseTime} ms</div>
              <p className="text-xs text-muted-foreground">
                P95: {telemetryData.performance.p95ResponseTime} ms | P99: {telemetryData.performance.p99ResponseTime}{" "}
                ms
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {((telemetryData.apiCalls.failed / telemetryData.apiCalls.total) * 100).toFixed(1)}%
              </div>
              <p className="text-xs text-muted-foreground">
                {telemetryData.apiCalls.failed} errors in {telemetryData.apiCalls.total} requests
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="api-calls">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="api-calls">API Calls</TabsTrigger>
            <TabsTrigger value="token-usage">Token Usage</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="errors">Errors</TabsTrigger>
          </TabsList>
          <TabsContent value="api-calls" className="mt-6">
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>API Call History</CardTitle>
                  <CardDescription>Number of API calls over the past 7 days</CardDescription>
                </CardHeader>
                <CardContent className="h-[350px]">
                  <TelemetryChart
                    data={telemetryData.apiCalls.history.map((item: any) => ({
                      name: item.date,
                      value: item.calls,
                    }))}
                    dataKey="value"
                    xAxisDataKey="name"
                    color="#3b82f6"
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>API Calls by Endpoint</CardTitle>
                  <CardDescription>Distribution of API calls across endpoints</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Endpoint</TableHead>
                        <TableHead className="text-right">Calls</TableHead>
                        <TableHead className="text-right">Success</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {telemetryData.apiCalls.byEndpoint.map((endpoint: any) => (
                        <TableRow key={endpoint.endpoint}>
                          <TableCell className="font-medium">{endpoint.endpoint}</TableCell>
                          <TableCell className="text-right">{endpoint.count}</TableCell>
                          <TableCell className="text-right">
                            <span className={endpoint.error > 0 ? "text-amber-500" : "text-green-500"}>
                              {((endpoint.success / endpoint.count) * 100).toFixed(1)}%
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="token-usage" className="mt-6">
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Token Usage History</CardTitle>
                  <CardDescription>Number of tokens used over the past 7 days</CardDescription>
                </CardHeader>
                <CardContent className="h-[350px]">
                  <TelemetryChart
                    data={telemetryData.tokenUsage.history.map((item: any) => ({
                      name: item.date,
                      value: item.tokens / 1000, // Convert to K for better display
                    }))}
                    dataKey="value"
                    xAxisDataKey="name"
                    color="#8b5cf6"
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Token Usage by Model</CardTitle>
                  <CardDescription>Distribution of token usage across models</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Model</TableHead>
                        <TableHead className="text-right">Tokens</TableHead>
                        <TableHead className="text-right">Cost</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {telemetryData.tokenUsage.byModel.map((model: any) => (
                        <TableRow key={model.model}>
                          <TableCell className="font-medium">{model.model}</TableCell>
                          <TableCell className="text-right">{(model.tokens / 1000000).toFixed(2)}M</TableCell>
                          <TableCell className="text-right">${model.cost.toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell className="font-bold">Total</TableCell>
                        <TableCell className="text-right font-bold">
                          {(telemetryData.tokenUsage.total / 1000000).toFixed(2)}M
                        </TableCell>
                        <TableCell className="text-right font-bold">
                          $
                          {telemetryData.tokenUsage.byModel
                            .reduce((acc: number, model: any) => acc + model.cost, 0)
                            .toFixed(2)}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="performance" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Response Time History</CardTitle>
                <CardDescription>Average response time over the past 7 days (milliseconds)</CardDescription>
              </CardHeader>
              <CardContent className="h-[350px]">
                <TelemetryChart
                  data={telemetryData.performance.history.map((item: any) => ({
                    name: item.date,
                    value: item.time,
                  }))}
                  dataKey="value"
                  xAxisDataKey="name"
                  color="#10b981"
                />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="errors" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Errors</CardTitle>
                <CardDescription>Latest system errors and exceptions</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Endpoint</TableHead>
                      <TableHead>Error</TableHead>
                      <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {telemetryData.errors.map((error: any) => (
                      <TableRow key={error.id}>
                        <TableCell className="font-medium">{new Date(error.timestamp).toLocaleString()}</TableCell>
                        <TableCell>{error.endpoint}</TableCell>
                        <TableCell>{error.error}</TableCell>
                        <TableCell className="text-right">
                          <Badge
                            variant="outline"
                            className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                          >
                            {error.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

