import React, { useState, useEffect } from 'react';
import { Star, Users, Calendar, Clock, Camera, Video, MapPin, Share, Heart, TrendingUp, Eye, Award, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';

const monasteryData = {
  name: "Rumtek Monastery",
  region: "Sikkim, India", 
  founded: "1966",
  century: "20th Century",
  rating: 4.9,
  totalVisitors: 85000,
  monthlyVisitors: 8500,
  todaysVisitors: 245,
  importanceLevel: 98,
  openingHours: "6:00 AM - 6:00 PM",
  description: "Also known as the Dharmachakra Centre, Rumtek Monastery is the largest monastery in Sikkim and serves as the seat of the Karmapa. Built in traditional Tibetan architecture, it houses sacred relics and ancient manuscripts.",
  image: "https://images.unsplash.com/photo-1621496770858-d9aacf27f513?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydW10ZWslMjBtb25hc3RlcnklMjBzaWtraW18ZW58MXx8fHwxNzU4MTc2NTI1fDA&ixlib=rb-4.1.0&q=80&w=800",
  gallery: [
    "https://images.unsplash.com/photo-1687074106203-f3dad46d9eb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWtraW0lMjBtb25hc3RlcnklMjBoaW1hbGF5YXN8ZW58MXx8fHwxNzU4MTc2NTIyfDA&ixlib=rb-4.1.0&q=80&w=400",
    "https://images.unsplash.com/photo-1634741966820-2dec12e860b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aWJldGFuJTIwbW9uYXN0ZXJ5JTIwcHJheWVyJTIwd2hlZWxzfGVufDF8fHx8MTc1ODE3NjUyOHww&ixlib=rb-4.1.0&q=80&w=400",
    "https://images.unsplash.com/photo-1624725412168-a8e69d4f7b36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWtraW0lMjBsYW5kc2NhcGUlMjBtb3VudGFpbnN8ZW58MXx8fHwxNzU4MTc2NTMyfDA&ixlib=rb-4.1.0&q=80&w=400",
    "https://images.unsplash.com/photo-1621496770858-d9aacf27f513?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydW10ZWslMjBtb25hc3RlcnklMjBzaWtraW18ZW58MXx8fHwxNzU4MTc2NTI1fDA&ixlib=rb-4.1.0&q=80&w=400"
  ],
  events: [
    {
      title: "Losar Festival",
      date: "February 10, 2025",
      time: "6:00 AM",
      type: "Festival",
      description: "Tibetan New Year celebration with traditional dances and prayers",
      attendees: 2500
    },
    {
      title: "Morning Prayers",
      date: "Daily",
      time: "6:00 AM - 8:00 AM",
      type: "Ritual",
      description: "Join monks for traditional morning chanting and meditation",
      attendees: 50
    },
    {
      title: "Cham Dance Festival",
      date: "March 28, 2025", 
      time: "10:00 AM",
      type: "Cultural",
      description: "Sacred masked dance performance by monastery monks",
      attendees: 1800
    }
  ],
  liveStats: {
    currentMonks: 160,
    dailyPrayers: 5,
    nextPrayer: "2:30 PM",
    weeklyEvents: 12
  }
};

interface DashboardScreenProps {
  monastery?: any;
}

export function DashboardScreen({ monastery }: DashboardScreenProps) {
  // Use default data if monastery is null or undefined
  const currentMonastery = monastery || monasteryData;
  
  const [activeTab, setActiveTab] = useState('overview');
  const [liked, setLiked] = useState(false);
  const [todaysVisitors, setTodaysVisitors] = useState(currentMonastery.todaysVisitors);
  const [liveData, setLiveData] = useState(currentMonastery.liveStats);

  // Simulate live data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTodaysVisitors(prev => prev + Math.floor(Math.random() * 3));
      
      // Update live stats occasionally
      if (Math.random() > 0.8) {
        setLiveData(prev => ({
          ...prev,
          weeklyEvents: prev.weeklyEvents + (Math.random() > 0.5 ? 1 : 0)
        }));
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full bg-gradient-to-b from-amber-50 to-stone-100 overflow-y-auto">
      {/* Inspirational Quote Header */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-500 p-4 text-center">
        <p className="text-white text-sm italic font-medium">
          "In the silence of the mountains, wisdom whispers through ancient walls"
        </p>
        <p className="text-amber-100 text-xs mt-1">- Sikkim Sacred Heritage</p>
      </div>

      {/* Hero Section */}
      <div className="relative">
        <img
          src={currentMonastery.image}
          alt={currentMonastery.name}
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Header Actions */}
        <div className="absolute top-4 right-4 flex gap-2">
          <Button
            size="icon"
            variant="secondary"
            className="bg-white/90 backdrop-blur-sm hover:bg-white rounded-xl"
            onClick={() => setLiked(!liked)}
          >
            <Heart className={`w-4 h-4 ${liked ? 'text-red-500 fill-current' : 'text-stone-600'}`} />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="bg-white/90 backdrop-blur-sm hover:bg-white rounded-xl"
          >
            <Share className="w-4 h-4 text-stone-600" />
          </Button>
        </div>

        {/* Live Status Indicator */}
        <div className="absolute top-4 left-4">
          <div className="flex items-center gap-2 bg-green-600 rounded-full px-3 py-1">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span className="text-white text-xs font-medium">Live</span>
          </div>
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <h1 className="text-2xl font-bold text-white mb-2">{currentMonastery.name}</h1>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1 bg-black/30 backdrop-blur-sm rounded-lg px-2 py-1">
              <MapPin className="w-3 h-3 text-white" />
              <span className="text-sm text-white">{currentMonastery.region}</span>
            </div>
            <div className="flex items-center gap-1 bg-black/30 backdrop-blur-sm rounded-lg px-2 py-1">
              <Star className="w-3 h-3 text-amber-400 fill-current" />
              <span className="text-sm text-white">{currentMonastery.rating}</span>
            </div>
            <Badge className="bg-amber-600 text-white rounded-lg">
              {currentMonastery.century}
            </Badge>
          </div>
        </div>
      </div>

      {/* Live Stats Bar */}
      <div className="bg-white border-b border-stone-200 p-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Eye className="w-4 h-4 text-green-600" />
              <span className="text-lg font-bold text-stone-800">{todaysVisitors}</span>
            </div>
            <p className="text-xs text-stone-500">Today's Visitors</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Users className="w-4 h-4 text-amber-600" />
              <span className="text-lg font-bold text-stone-800">{liveData.currentMonks}</span>
            </div>
            <p className="text-xs text-stone-500">Resident Monks</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Clock className="w-4 h-4 text-blue-600" />
              <span className="text-lg font-bold text-stone-800">{liveData.nextPrayer}</span>
            </div>
            <p className="text-xs text-stone-500">Next Prayer</p>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white rounded-xl border border-stone-200">
            <TabsTrigger value="overview" className="rounded-lg data-[state=active]:bg-amber-100 data-[state=active]:text-amber-800">
              Overview
            </TabsTrigger>
            <TabsTrigger value="events" className="rounded-lg data-[state=active]:bg-amber-100 data-[state=active]:text-amber-800">
              Events
            </TabsTrigger>
            <TabsTrigger value="gallery" className="rounded-lg data-[state=active]:bg-amber-100 data-[state=active]:text-amber-800">
              Gallery
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4 mt-4">
            {/* Description */}
            <Card className="border-stone-200 rounded-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <h3 className="font-semibold text-stone-800">About Rumtek Monastery</h3>
              </CardHeader>
              <CardContent>
                <p className="text-stone-700 leading-relaxed">{currentMonastery.description}</p>
              </CardContent>
            </Card>

            {/* Interactive Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              <Card className="border-stone-200 rounded-xl bg-white/80 backdrop-blur-sm cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="pt-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-amber-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-2xl font-bold text-stone-800">
                        {currentMonastery.totalVisitors.toLocaleString()}
                      </p>
                      <p className="text-sm text-stone-500">Annual Visitors</p>
                      <div className="flex items-center gap-1 mt-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-xs text-green-600">+12% this year</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-stone-200 rounded-xl bg-white/80 backdrop-blur-sm cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="pt-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                      <Award className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-2xl font-bold text-stone-800">{currentMonastery.founded}</p>
                      <p className="text-sm text-stone-500">Established</p>
                      <p className="text-xs text-stone-400 mt-1">58 years of heritage</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Cultural Importance with Animation */}
            <Card className="border-stone-200 rounded-xl bg-white/80 backdrop-blur-sm">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-stone-800">Cultural Significance</p>
                  <span className="text-sm font-medium text-stone-600">{currentMonastery.importanceLevel}%</span>
                </div>
                <Progress value={currentMonastery.importanceLevel} className="h-3 mb-2" />
                <div className="flex justify-between text-xs text-stone-500">
                  <span>UNESCO Heritage Site</span>
                  <span>International Recognition</span>
                </div>
                <p className="text-xs text-stone-500 mt-2">Recognized for architectural excellence and spiritual significance</p>
              </CardContent>
            </Card>

            {/* Visiting Information */}
            <Card className="border-stone-200 rounded-xl bg-white/80 backdrop-blur-sm">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-amber-600" />
                    <div>
                      <p className="font-medium text-stone-800">Visiting Hours</p>
                      <p className="text-stone-600">{currentMonastery.openingHours}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="border-amber-200 text-amber-700 hover:bg-amber-50">
                    Plan Visit
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Enhanced Events Tab */}
          <TabsContent value="events" className="space-y-3 mt-4">
            {currentMonastery.events.map((event, index) => (
              <Card key={index} className="border-stone-200 rounded-xl bg-white/80 backdrop-blur-sm cursor-pointer hover:shadow-md transition-all">
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="font-medium text-stone-800">{event.title}</h4>
                      <div className="flex items-center gap-4 mt-1">
                        <p className="text-sm text-amber-600 font-medium">{event.date}</p>
                        <p className="text-sm text-stone-500">{event.time}</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-amber-100 text-amber-700 rounded-md text-xs">
                      {event.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-stone-600 mb-2">{event.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3 text-stone-400" />
                      <span className="text-xs text-stone-500">{event.attendees} expected</span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-amber-600 hover:text-amber-700 hover:bg-amber-50">
                      Join Event
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Enhanced Gallery Tab */}
          <TabsContent value="gallery" className="mt-4">
            <div className="grid grid-cols-2 gap-3 mb-4">
              {currentMonastery.gallery.map((image, index) => (
                <div key={index} className="relative group cursor-pointer">
                  <img
                    src={image}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-32 object-cover rounded-xl border border-stone-200 group-hover:scale-105 transition-transform duration-200"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-black/60 text-white text-xs">
                      {index === 0 ? 'Main Hall' : index === 1 ? 'Prayer Wheels' : index === 2 ? 'Mountain View' : 'Exterior'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            
            <Card className="border-stone-200 rounded-xl bg-white/80 backdrop-blur-sm">
              <CardContent className="pt-4">
                <div className="flex items-center gap-3 mb-3">
                  <Video className="w-5 h-5 text-amber-600" />
                  <h4 className="font-medium text-stone-800">360° Virtual Experience</h4>
                </div>
                <p className="text-sm text-stone-600 mb-3">
                  Immerse yourself in the sacred spaces through our interactive virtual tours
                </p>
                <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white rounded-xl">
                  Start Virtual Tour
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}