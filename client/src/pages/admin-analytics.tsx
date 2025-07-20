
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  Users, 
  MousePointer, 
  MessageCircle, 
  Mail, 
  Eye,
  TrendingUp,
  Activity
} from "lucide-react";
import { useState } from "react";

interface AnalyticsData {
  dashboard: {
    pageViews: { page: string; count: number }[];
    interactions: { type: string; count: number }[];
    contacts: number;
    subscriptions: number;
    chatbot: { sessions: number; avgMessages: number };
  };
  recentActivity: {
    pageViews: any[];
    interactions: any[];
  };
}

export default function AdminAnalytics() {
  const [timeRange, setTimeRange] = useState(30);

  const { data: analytics, isLoading, refetch } = useQuery<AnalyticsData>({
    queryKey: ['analytics', timeRange],
    queryFn: async () => {
      const response = await fetch(`/api/admin/analytics?days=${timeRange}`);
      if (!response.ok) {
        throw new Error('Failed to fetch analytics');
      }
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-800 rounded w-64 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-800 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const dashboard = analytics?.dashboard;
  const recentActivity = analytics?.recentActivity;

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">
            Analytics <span className="text-electric-blue">Dashboard</span>
          </h1>
          <div className="flex space-x-4">
            <select 
              value={timeRange} 
              onChange={(e) => setTimeRange(Number(e.target.value))}
              className="bg-neutral-800 border border-electric-blue/30 rounded px-4 py-2"
            >
              <option value={7}>Last 7 days</option>
              <option value={30}>Last 30 days</option>
              <option value={90}>Last 90 days</option>
            </select>
            <Button onClick={() => refetch()} variant="outline">
              Refresh
            </Button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-neutral-900 border-electric-blue/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Page Views</CardTitle>
              <Eye className="h-4 w-4 text-electric-blue" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {dashboard?.pageViews.reduce((sum, pv) => sum + pv.count, 0) || 0}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-neutral-900 border-electric-blue/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Contact Submissions</CardTitle>
              <Users className="h-4 w-4 text-electric-blue" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboard?.contacts || 0}</div>
            </CardContent>
          </Card>

          <Card className="bg-neutral-900 border-electric-blue/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Newsletter Subscriptions</CardTitle>
              <Mail className="h-4 w-4 text-electric-blue" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboard?.subscriptions || 0}</div>
            </CardContent>
          </Card>

          <Card className="bg-neutral-900 border-electric-blue/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Chatbot Sessions</CardTitle>
              <MessageCircle className="h-4 w-4 text-electric-blue" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboard?.chatbot.sessions || 0}</div>
              <p className="text-xs text-gray-400">
                Avg {Number(dashboard?.chatbot.avgMessages || 0).toFixed(1)} messages/session
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="pages" className="space-y-6">
          <TabsList className="bg-neutral-800">
            <TabsTrigger value="pages">Page Views</TabsTrigger>
            <TabsTrigger value="interactions">User Interactions</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="pages">
            <Card className="bg-neutral-900 border-electric-blue/30">
              <CardHeader>
                <CardTitle>Most Visited Pages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboard?.pageViews.map((page, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="font-medium">{page.page}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-neutral-800 rounded-full h-2">
                          <div 
                            className="bg-electric-blue h-2 rounded-full"
                            style={{
                              width: `${(page.count / Math.max(...dashboard.pageViews.map(p => p.count))) * 100}%`
                            }}
                          />
                        </div>
                        <span className="text-sm text-gray-400">{page.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="interactions">
            <Card className="bg-neutral-900 border-electric-blue/30">
              <CardHeader>
                <CardTitle>User Interaction Types</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboard?.interactions.map((interaction, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="font-medium capitalize">{interaction.type.replace('_', ' ')}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-neutral-800 rounded-full h-2">
                          <div 
                            className="bg-electric-blue h-2 rounded-full"
                            style={{
                              width: `${(interaction.count / Math.max(...dashboard.interactions.map(i => i.count))) * 100}%`
                            }}
                          />
                        </div>
                        <span className="text-sm text-gray-400">{interaction.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-neutral-900 border-electric-blue/30">
                <CardHeader>
                  <CardTitle>Recent Page Views</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {recentActivity?.pageViews.slice(0, 10).map((view, index) => (
                      <div key={index} className="text-sm border-b border-neutral-800 pb-1">
                        <span className="font-medium">{view.page}</span>
                        <span className="text-gray-400 ml-2">
                          {new Date(view.timestamp).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-neutral-900 border-electric-blue/30">
                <CardHeader>
                  <CardTitle>Recent Interactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {recentActivity?.interactions.slice(0, 10).map((interaction, index) => (
                      <div key={index} className="text-sm border-b border-neutral-800 pb-1">
                        <span className="font-medium capitalize">{interaction.type}</span>
                        {interaction.element && (
                          <span className="text-electric-blue ml-2">({interaction.element})</span>
                        )}
                        <span className="text-gray-400 ml-2">
                          {new Date(interaction.timestamp).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
