import React, { useState } from 'react';
import { Settings, Globe, Download, Users, Camera, MapPin, Star, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

const userData = {
  name: "Sarah Chen",
  email: "sarah.chen@email.com",
  joinDate: "Member since 2023",
  visitedMonasteries: 12,
  photosShared: 24,
  reviewsWritten: 8,
  badgeLevel: "Heritage Explorer",
  favoriteRegion: "Tibet & Ladakh",
  avatar: "https://images.unsplash.com/photo-1494790108755-2616b332e234?w=150&h=150&fit=crop&crop=face"
};

const achievements = [
  { id: 1, title: "First Visit", description: "Visited your first monastery", earned: true, icon: "🏛️" },
  { id: 2, title: "Photo Enthusiast", description: "Shared 20+ photos", earned: true, icon: "📸" },
  { id: 3, title: "Cultural Ambassador", description: "Wrote 5+ reviews", earned: true, icon: "✍️" },
  { id: 4, title: "Heritage Guardian", description: "Visit 25 monasteries", earned: false, icon: "🛡️" }
];

const recentActivity = [
  { id: 1, type: "visit", title: "Visited Hemis Monastery", date: "2 days ago", location: "Ladakh" },
  { id: 2, type: "photo", title: "Shared 3 photos", date: "1 week ago", location: "Tashilhunpo" },
  { id: 3, type: "review", title: "Wrote a review", date: "2 weeks ago", location: "Rongbuk" }
];

export function ProfileScreen() {
  const [offlineMode, setOfflineMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('English');

  return (
    <div className="h-full bg-gradient-to-b from-amber-50 to-stone-100 overflow-y-auto">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-stone-200 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-stone-800">Profile</h1>
          <Button variant="ghost" size="icon" className="rounded-xl">
            <Settings className="w-5 h-5 text-stone-600" />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* User Profile */}
        <Card className="border-stone-200 rounded-xl bg-white/80 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4 mb-4">
              <Avatar className="w-16 h-16 border-4 border-amber-100">
                <AvatarImage src={userData.avatar} alt={userData.name} />
                <AvatarFallback className="bg-amber-100 text-amber-700">{userData.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-stone-800">{userData.name}</h2>
                <p className="text-stone-600">{userData.email}</p>
                <p className="text-sm text-stone-500">{userData.joinDate}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 mb-4">
              <Badge className="bg-amber-600 text-white rounded-lg">
                {userData.badgeLevel}
              </Badge>
              <Badge variant="secondary" className="bg-stone-100 text-stone-700 rounded-lg">
                {userData.favoriteRegion}
              </Badge>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-stone-800">{userData.visitedMonasteries}</p>
                <p className="text-sm text-stone-600">Visited</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-stone-800">{userData.photosShared}</p>
                <p className="text-sm text-stone-600">Photos</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-stone-800">{userData.reviewsWritten}</p>
                <p className="text-sm text-stone-600">Reviews</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className="border-stone-200 rounded-xl bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <h3 className="font-semibold text-stone-800">Achievements</h3>
          </CardHeader>
          <CardContent className="space-y-3">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  achievement.earned 
                    ? 'bg-amber-50 border border-amber-200' 
                    : 'bg-stone-50 border border-stone-200 opacity-60'
                }`}
              >
                <div className="text-2xl">{achievement.icon}</div>
                <div className="flex-1">
                  <h4 className="font-medium text-stone-800">{achievement.title}</h4>
                  <p className="text-sm text-stone-600">{achievement.description}</p>
                </div>
                {achievement.earned && (
                  <div className="w-6 h-6 bg-amber-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="border-stone-200 rounded-xl bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <h3 className="font-semibold text-stone-800">Recent Activity</h3>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={activity.id}>
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    activity.type === 'visit' ? 'bg-green-100' :
                    activity.type === 'photo' ? 'bg-blue-100' : 'bg-purple-100'
                  }`}>
                    {activity.type === 'visit' && <MapPin className="w-4 h-4 text-green-600" />}
                    {activity.type === 'photo' && <Camera className="w-4 h-4 text-blue-600" />}
                    {activity.type === 'review' && <Star className="w-4 h-4 text-purple-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-stone-800">{activity.title}</p>
                    <div className="flex items-center gap-2 text-sm text-stone-600">
                      <span>{activity.date}</span>
                      <span>•</span>
                      <span>{activity.location}</span>
                    </div>
                  </div>
                </div>
                {index < recentActivity.length - 1 && <Separator className="my-3" />}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Settings */}
        <Card className="border-stone-200 rounded-xl bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <h3 className="font-semibold text-stone-800">Settings</h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Download className="w-5 h-5 text-stone-600" />
                <div>
                  <p className="font-medium text-stone-800">Offline Mode</p>
                  <p className="text-sm text-stone-600">Download content for offline use</p>
                </div>
              </div>
              <Switch checked={offlineMode} onCheckedChange={setOfflineMode} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-stone-600" />
                <div>
                  <p className="font-medium text-stone-800">Language</p>
                  <p className="text-sm text-stone-600">English, Hindi, Tibetan, Nepali</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-stone-600">
                {language} <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-stone-600" />
                <div>
                  <p className="font-medium text-stone-800">Community Contributions</p>
                  <p className="text-sm text-stone-600">Share photos and reviews</p>
                </div>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}