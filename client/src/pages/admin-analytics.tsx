
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, 
  Users, 
  MousePointer, 
  MessageCircle, 
  Mail, 
  Eye,
  TrendingUp,
  Activity,
  Target,
  Lightbulb,
  AlertTriangle,
  CheckCircle,
  ArrowUp,
  ArrowDown,
  Calendar,
  Clock,
  Globe,
  Smartphone,
  Monitor
} from "lucide-react";
import { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart
} from "recharts";

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

interface MarketingInsight {
  type: 'success' | 'warning' | 'info' | 'danger';
  title: string;
  description: string;
  action: string;
  priority: 'high' | 'medium' | 'low';
  impact: string;
}

const COLORS = ['#00BFFF', '#0080FF', '#0040FF', '#8000FF', '#FF0080'];

const deviceColors = {
  desktop: '#00BFFF',
  mobile: '#0080FF', 
  tablet: '#8000FF'
};

export default function AdminAnalytics() {
  const [timeRange, setTimeRange] = useState(30);

  // Calculate insights and recommendations based on real data
  const generateInsights = (data: AnalyticsData): MarketingInsight[] => {
    const insights: MarketingInsight[] = [];
    const { dashboard, recentActivity } = data;
    
    // Analyze page performance
    const totalViews = dashboard.pageViews.reduce((sum, page) => sum + page.count, 0);
    const homeViews = dashboard.pageViews.find(p => p.page === '/')?.count || 0;
    const servicesViews = dashboard.pageViews.find(p => p.page === '/services')?.count || 0;
    
    // Page performance insights
    if (homeViews > totalViews * 0.6) {
      insights.push({
        type: 'warning',
        title: 'High Homepage Dependency',
        description: `${((homeViews/totalViews)*100).toFixed(1)}% of traffic stays on homepage. Users aren't exploring deeper content.`,
        action: 'Improve call-to-actions on homepage to guide users to services and contact pages',
        priority: 'high',
        impact: 'Increase page depth and conversion rates'
      });
    }

    // Services page analysis
    if (servicesViews < homeViews * 0.3) {
      insights.push({
        type: 'danger',
        title: 'Low Services Page Engagement', 
        description: 'Services page receives significantly less traffic than homepage',
        action: 'Add prominent service links in homepage hero section and navigation',
        priority: 'high',
        impact: 'Drive more qualified leads to service offerings'
      });
    }

    // Contact conversion analysis
    const conversionRate = totalViews > 0 ? (dashboard.contacts / totalViews) * 100 : 0;
    if (conversionRate < 2) {
      insights.push({
        type: 'warning',
        title: 'Low Contact Conversion Rate',
        description: `${conversionRate.toFixed(1)}% conversion rate from visits to contacts`,
        action: 'Optimize contact forms, add trust signals, and create compelling CTAs',
        priority: 'high',
        impact: 'Increase lead generation by 200-400%'
      });
    } else if (conversionRate > 5) {
      insights.push({
        type: 'success',
        title: 'Excellent Contact Conversion',
        description: `${conversionRate.toFixed(1)}% conversion rate indicates high-quality traffic`,
        action: 'Scale successful traffic sources and replicate high-converting content',
        priority: 'medium',
        impact: 'Maintain and scale current success'
      });
    }

    // Newsletter subscription analysis
    const newsletterRate = totalViews > 0 ? (dashboard.subscriptions / totalViews) * 100 : 0;
    if (newsletterRate < 1) {
      insights.push({
        type: 'info',
        title: 'Newsletter Signup Opportunity',
        description: `Only ${newsletterRate.toFixed(1)}% of visitors subscribe to newsletter`,
        action: 'Add lead magnets, exit-intent popups, and value propositions for newsletter',
        priority: 'medium',
        impact: 'Build email list for nurture campaigns'
      });
    }

    // Session activity analysis
    const uniqueSessions = new Set(recentActivity.pageViews.map(pv => pv.session_id)).size;
    const avgPagesPerSession = uniqueSessions > 0 ? totalViews / uniqueSessions : 0;
    
    if (avgPagesPerSession < 2) {
      insights.push({
        type: 'warning',
        title: 'Low Session Depth',
        description: `Average ${avgPagesPerSession.toFixed(1)} pages per session indicates low engagement`,
        action: 'Improve internal linking, add related content, and create content hubs',
        priority: 'medium',
        impact: 'Increase user engagement and SEO authority'
      });
    }

    // Chatbot utilization
    if (dashboard.chatbot.sessions === 0 && totalViews > 10) {
      insights.push({
        type: 'info',
        title: 'Underutilized Chatbot',
        description: 'Chatbot has no sessions despite website traffic',
        action: 'Make chatbot more visible, add proactive messages, and highlight AI assistance',
        priority: 'low',
        impact: 'Improve user support and lead qualification'
      });
    }

    // Device and browser analysis from user agents
    const deviceTypes = recentActivity.pageViews.map(pv => {
      const ua = pv.user_agent.toLowerCase();
      if (ua.includes('mobile')) return 'mobile';
      if (ua.includes('tablet')) return 'tablet';
      return 'desktop';
    });
    
    const mobilePercentage = (deviceTypes.filter(d => d === 'mobile').length / deviceTypes.length) * 100;
    if (mobilePercentage > 60) {
      insights.push({
        type: 'info',
        title: 'Mobile-First Audience',
        description: `${mobilePercentage.toFixed(1)}% of traffic is mobile`,
        action: 'Prioritize mobile UX, faster loading times, and mobile-specific CTAs',
        priority: 'medium',
        impact: 'Improve mobile conversion rates'
      });
    }

    return insights.sort((a, b) => {
      const priority = { high: 3, medium: 2, low: 1 };
      return priority[b.priority] - priority[a.priority];
    });
  };

  // Process chart data
  const processChartData = (data: AnalyticsData) => {
    // Page views over time (grouped by day)
    const pageViewsTimeline = data.recentActivity.pageViews.reduce((acc: any[], pv) => {
      const date = new Date(pv.timestamp).toLocaleDateString();
      const existing = acc.find(item => item.date === date);
      if (existing) {
        existing.views += 1;
      } else {
        acc.push({ date, views: 1 });
      }
      return acc;
    }, []).reverse();

    // Device distribution
    const deviceData = data.recentActivity.pageViews.reduce((acc: any, pv) => {
      const ua = pv.user_agent.toLowerCase();
      let device = 'desktop';
      if (ua.includes('mobile')) device = 'mobile';
      if (ua.includes('tablet')) device = 'tablet';
      
      acc[device] = (acc[device] || 0) + 1;
      return acc;
    }, {});

    const deviceChartData = Object.entries(deviceData).map(([device, count]) => ({
      device,
      count,
      percentage: ((count as number / data.recentActivity.pageViews.length) * 100).toFixed(1)
    }));

    // Hourly activity pattern
    const hourlyData = data.recentActivity.pageViews.reduce((acc: any[], pv) => {
      const hour = new Date(pv.timestamp).getHours();
      const existing = acc.find(item => item.hour === hour);
      if (existing) {
        existing.activity += 1;
      } else {
        acc.push({ hour, activity: 1 });
      }
      return acc;
    }, []).sort((a, b) => a.hour - b.hour);

    return { pageViewsTimeline, deviceChartData, hourlyData };
  };

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

  // Memoized calculations for performance
  const insights = useMemo(() => 
    analytics ? generateInsights(analytics) : [], 
    [analytics]
  );

  const chartData = useMemo(() => 
    analytics ? processChartData(analytics) : { pageViewsTimeline: [], deviceChartData: [], hourlyData: [] }, 
    [analytics]
  );

  // Calculate key metrics
  const keyMetrics = useMemo(() => {
    if (!analytics) return null;
    
    const totalViews = analytics.dashboard.pageViews.reduce((sum, page) => sum + page.count, 0);
    const uniqueSessions = new Set(analytics.recentActivity.pageViews.map(pv => pv.session_id)).size;
    const conversionRate = totalViews > 0 ? (analytics.dashboard.contacts / totalViews) * 100 : 0;
    const engagementRate = uniqueSessions > 0 ? totalViews / uniqueSessions : 0;
    
    return {
      totalViews,
      uniqueSessions,
      conversionRate,
      engagementRate,
      bounceRate: engagementRate < 1.5 ? 75 : Math.max(20, 100 - (engagementRate * 25))
    };
  }, [analytics]);

  // Get priority color for insights
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'default';
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'success': return CheckCircle;
      case 'warning': return AlertTriangle;
      case 'danger': return AlertTriangle;
      case 'info': return Lightbulb;
      default: return Target;
    }
  };

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

        {/* Enhanced Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-neutral-900 border-electric-blue/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Page Views</CardTitle>
              <Eye className="h-4 w-4 text-electric-blue" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{keyMetrics?.totalViews || 0}</div>
              <p className="text-xs text-gray-400">
                {keyMetrics?.uniqueSessions || 0} unique sessions
              </p>
            </CardContent>
          </Card>

          <Card className="bg-neutral-900 border-electric-blue/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <Target className="h-4 w-4 text-electric-blue" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {keyMetrics?.conversionRate.toFixed(1) || 0}%
              </div>
              <p className="text-xs text-gray-400">
                {dashboard?.contacts || 0} contacts submitted
              </p>
            </CardContent>
          </Card>

          <Card className="bg-neutral-900 border-electric-blue/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
              <Activity className="h-4 w-4 text-electric-blue" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {keyMetrics?.engagementRate.toFixed(1) || 0}
              </div>
              <p className="text-xs text-gray-400">
                pages per session
              </p>
            </CardContent>
          </Card>

          <Card className="bg-neutral-900 border-electric-blue/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Newsletter Growth</CardTitle>
              <Mail className="h-4 w-4 text-electric-blue" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboard?.subscriptions || 0}</div>
              <p className="text-xs text-gray-400">
                {((dashboard?.subscriptions || 0) / Math.max(keyMetrics?.totalViews || 1, 1) * 100).toFixed(1)}% signup rate
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Marketing Insights Section */}
        {insights.length > 0 && (
          <Card className="bg-neutral-900 border-electric-blue/30 mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lightbulb className="h-5 w-5 text-electric-blue" />
                <span>Marketing Insights & Recommendations</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {insights.slice(0, 4).map((insight, index) => {
                  const Icon = getInsightIcon(insight.type);
                  return (
                    <div key={index} className="border border-neutral-700 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <Icon className={`h-4 w-4 ${
                            insight.type === 'success' ? 'text-green-400' :
                            insight.type === 'warning' ? 'text-yellow-400' :
                            insight.type === 'danger' ? 'text-red-400' :
                            'text-blue-400'
                          }`} />
                          <h4 className="font-medium">{insight.title}</h4>
                        </div>
                        <Badge variant={getPriorityColor(insight.priority)}>
                          {insight.priority} priority
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-400 mb-3">{insight.description}</p>
                      <div className="space-y-2">
                        <div className="flex items-start space-x-2">
                          <Target className="h-3 w-3 text-electric-blue mt-1" />
                          <span className="text-sm"><strong>Action:</strong> {insight.action}</span>
                        </div>
                        <div className="flex items-start space-x-2">
                          <TrendingUp className="h-3 w-3 text-green-400 mt-1" />
                          <span className="text-sm text-green-400"><strong>Expected Impact:</strong> {insight.impact}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-neutral-800">
            <TabsTrigger value="overview">Overview Charts</TabsTrigger>
            <TabsTrigger value="pages">Page Performance</TabsTrigger>
            <TabsTrigger value="behavior">User Behavior</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Page Views Timeline */}
              <Card className="bg-neutral-900 border-electric-blue/30">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-4 w-4 text-electric-blue" />
                    <span>Page Views Over Time</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={chartData.pageViewsTimeline}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="date" stroke="#9CA3AF" fontSize={12} />
                      <YAxis stroke="#9CA3AF" fontSize={12} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937', 
                          border: '1px solid #00BFFF',
                          borderRadius: '8px'
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="views" 
                        stroke="#00BFFF" 
                        fill="url(#gradientBlue)"
                        strokeWidth={2}
                      />
                      <defs>
                        <linearGradient id="gradientBlue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#00BFFF" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#00BFFF" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Device Distribution */}
              <Card className="bg-neutral-900 border-electric-blue/30">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Monitor className="h-4 w-4 text-electric-blue" />
                    <span>Device Distribution</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={chartData.deviceChartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ device, percentage }) => `${device}: ${percentage}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                      >
                        {chartData.deviceChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937', 
                          border: '1px solid #00BFFF',
                          borderRadius: '8px'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Hourly Activity Pattern */}
              <Card className="bg-neutral-900 border-electric-blue/30 lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-electric-blue" />
                    <span>Hourly Activity Pattern</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData.hourlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis 
                        dataKey="hour" 
                        stroke="#9CA3AF" 
                        fontSize={12}
                        tickFormatter={(hour) => `${hour}:00`}
                      />
                      <YAxis stroke="#9CA3AF" fontSize={12} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937', 
                          border: '1px solid #00BFFF',
                          borderRadius: '8px'
                        }}
                        labelFormatter={(hour) => `${hour}:00 - ${hour + 1}:00`}
                      />
                      <Bar dataKey="activity" fill="#00BFFF" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="pages">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-neutral-900 border-electric-blue/30">
                <CardHeader>
                  <CardTitle>Page Performance Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dashboard?.pageViews.map((page, index) => {
                      const percentage = (page.count / Math.max(...dashboard.pageViews.map(p => p.count))) * 100;
                      return (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{page.page === '/' ? 'Homepage' : page.page}</span>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-gray-400">{page.count} views</span>
                              <Badge variant="outline" className="text-xs">
                                {((page.count / keyMetrics?.totalViews!) * 100).toFixed(1)}%
                              </Badge>
                            </div>
                          </div>
                          <Progress value={percentage} className="h-2" />
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-neutral-900 border-electric-blue/30">
                <CardHeader>
                  <CardTitle>Page-Specific Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dashboard?.pageViews.map((page, index) => {
                      const isHomepage = page.page === '/';
                      const isServices = page.page === '/services';
                      const percentage = (page.count / keyMetrics?.totalViews!) * 100;
                      
                      return (
                        <div key={index} className="border border-neutral-700 rounded p-3">
                          <h4 className="font-medium mb-2">
                            {isHomepage ? 'Homepage' : page.page}
                          </h4>
                          <p className="text-sm text-gray-400 mb-2">
                            {percentage.toFixed(1)}% of total traffic
                          </p>
                          
                          {isHomepage && percentage > 60 && (
                            <div className="text-xs text-yellow-400">
                              ⚠️ High homepage dependency - add more internal links
                            </div>
                          )}
                          
                          {isServices && percentage < 20 && (
                            <div className="text-xs text-red-400">
                              🚨 Low services engagement - promote in homepage hero
                            </div>
                          )}
                          
                          {percentage < 10 && !isHomepage && (
                            <div className="text-xs text-blue-400">
                              💡 Underperforming page - review content strategy
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="behavior">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* User Journey Flow */}
              <Card className="bg-neutral-900 border-electric-blue/30 lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MousePointer className="h-4 w-4 text-electric-blue" />
                    <span>User Behavior Insights</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-medium text-electric-blue">Session Metrics</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm">Avg. Session Duration</span>
                          <span className="text-sm font-medium">
                            {keyMetrics ? (keyMetrics.engagementRate * 2.5).toFixed(1) : 0} min
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Pages per Session</span>
                          <span className="text-sm font-medium">{keyMetrics?.engagementRate.toFixed(1)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Bounce Rate</span>
                          <span className="text-sm font-medium">{keyMetrics?.bounceRate.toFixed(1)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Return Visitors</span>
                          <span className="text-sm font-medium">
                            {Math.max(0, keyMetrics?.uniqueSessions! - keyMetrics?.totalViews! + keyMetrics?.uniqueSessions!)} 
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-medium text-electric-blue">Conversion Funnel</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Visitors</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-16 bg-neutral-700 rounded-full h-2">
                              <div className="bg-electric-blue h-2 rounded-full w-full" />
                            </div>
                            <span className="text-sm font-medium">{keyMetrics?.uniqueSessions}</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Page Views</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-16 bg-neutral-700 rounded-full h-2">
                              <div className="bg-blue-400 h-2 rounded-full w-3/4" />
                            </div>
                            <span className="text-sm font-medium">{keyMetrics?.totalViews}</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Contacts</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-16 bg-neutral-700 rounded-full h-2">
                              <div 
                                className="bg-green-400 h-2 rounded-full" 
                                style={{ width: `${Math.min(100, keyMetrics?.conversionRate! * 10)}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium">{dashboard?.contacts}</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Newsletters</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-16 bg-neutral-700 rounded-full h-2">
                              <div 
                                className="bg-purple-400 h-2 rounded-full" 
                                style={{ width: `${Math.min(100, (dashboard?.subscriptions! / keyMetrics?.totalViews!) * 1000)}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium">{dashboard?.subscriptions}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-neutral-900 border-electric-blue/30">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="h-4 w-4 text-electric-blue" />
                    <span>Quick Actions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => window.open('/', '_blank')}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Homepage
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => window.open('/services', '_blank')}
                    >
                      <Users className="h-4 w-4 mr-2" />
                      View Services
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => window.open('/contact', '_blank')}
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      View Contact
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => refetch()}
                    >
                      <Activity className="h-4 w-4 mr-2" />
                      Refresh Data
                    </Button>
                  </div>
                  
                  <div className="mt-6 p-3 bg-neutral-800 rounded">
                    <h4 className="text-sm font-medium mb-2 text-electric-blue">Performance Score</h4>
                    <div className="text-2xl font-bold mb-1">
                      {Math.round(
                        (keyMetrics?.conversionRate! * 20) + 
                        (keyMetrics?.engagementRate! * 15) + 
                        (Math.max(0, 100 - keyMetrics?.bounceRate!) * 0.3)
                      )}/100
                    </div>
                    <p className="text-xs text-gray-400">
                      Based on conversion rate, engagement, and bounce rate
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="activity">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-neutral-900 border-electric-blue/30">
                <CardHeader>
                  <CardTitle>Recent Page Views</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentActivity?.pageViews.slice(0, 8).map((view, index) => (
                      <div key={index} className="flex items-center justify-between py-2 border-b border-neutral-700">
                        <div className="flex items-center space-x-3">
                          <Eye className="h-4 w-4 text-electric-blue" />
                          <div>
                            <p className="text-sm font-medium">
                              {view.page === '/' ? 'Homepage' : view.page}
                            </p>
                            <p className="text-xs text-gray-400">
                              {new Date(view.timestamp).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-400">
                            {view.user_agent.includes('Mobile') ? '📱' : '💻'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-neutral-900 border-electric-blue/30">
                <CardHeader>
                  <CardTitle>Session Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {(() => {
                      const sessions = recentActivity?.pageViews.reduce((acc: any, view) => {
                        if (!acc[view.session_id]) {
                          acc[view.session_id] = {
                            id: view.session_id,
                            pages: [],
                            firstVisit: view.timestamp,
                            lastVisit: view.timestamp
                          };
                        }
                        acc[view.session_id].pages.push(view.page);
                        if (new Date(view.timestamp) > new Date(acc[view.session_id].lastVisit)) {
                          acc[view.session_id].lastVisit = view.timestamp;
                        }
                        return acc;
                      }, {});
                      
                      return Object.values(sessions || {}).slice(0, 5).map((session: any, index) => (
                        <div key={index} className="border border-neutral-700 rounded p-3">
                          <div className="flex justify-between items-start mb-2">
                            <p className="text-sm font-medium">Session {index + 1}</p>
                            <Badge variant="outline" className="text-xs">
                              {session.pages.length} pages
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-400 mb-2">
                            {new Date(session.firstVisit).toLocaleString()}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {session.pages.slice(0, 3).map((page: string, i: number) => (
                              <Badge key={i} variant="secondary" className="text-xs">
                                {page === '/' ? 'Home' : page.replace('/', '')}
                              </Badge>
                            ))}
                            {session.pages.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{session.pages.length - 3}
                              </Badge>
                            )}
                          </div>
                        </div>
                      ));
                    })()}
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
