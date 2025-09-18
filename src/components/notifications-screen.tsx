import React, { useState } from 'react';
import { Bell, Calendar, MapPin, Camera, Users, Star, Clock, ChevronRight } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

const notifications = [
  {
    id: 1,
    type: 'event',
    title: 'Butter Lamp Festival Tomorrow',
    description: 'Join the traditional ceremony at Tashilhunpo Monastery',
    time: '2 hours ago',
    location: 'Tashilhunpo Monastery',
    isNew: true,
    priority: 'high'
  },
  {
    id: 2,
    type: 'community',
    title: 'New Photos Shared',
    description: 'Maya shared 5 new photos from Hemis Monastery',
    time: '4 hours ago',
    location: 'Hemis Monastery',
    isNew: true,
    priority: 'medium'
  },
  {
    id: 3,
    type: 'update',
    title: 'Opening Hours Changed',
    description: 'Rongbuk Monastery now opens at 7:00 AM',
    time: '1 day ago',
    location: 'Rongbuk Monastery',
    isNew: false,
    priority: 'medium'
  },
  {
    id: 4,
    type: 'achievement',
    title: 'Achievement Unlocked!',
    description: 'You earned the "Cultural Ambassador" badge',
    time: '2 days ago',
    location: null,
    isNew: false,
    priority: 'low'
  },
  {
    id: 5,
    type: 'event',
    title: 'Morning Chanting Session',
    description: 'Daily meditation starts in 30 minutes',
    time: '3 days ago',
    location: 'Tashilhunpo Monastery',
    isNew: false,
    priority: 'medium'
  }
];

const upcomingEvents = [
  {
    id: 1,
    title: 'Butter Lamp Festival',
    date: 'March 15, 2025',
    time: '6:00 AM',
    location: 'Tashilhunpo Monastery',
    type: 'Festival'
  },
  {
    id: 2,
    title: 'Heritage Conservation Workshop',
    date: 'March 22, 2025',
    time: '10:00 AM',
    location: 'Hemis Monastery',
    type: 'Workshop'
  },
  {
    id: 3,
    title: 'Photography Exhibition',
    date: 'April 5, 2025',
    time: '2:00 PM',
    location: 'Virtual Event',
    type: 'Exhibition'
  }
];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'event': return <Calendar className="w-5 h-5 text-amber-600" />;
    case 'community': return <Users className="w-5 h-5 text-blue-600" />;
    case 'update': return <Bell className="w-5 h-5 text-green-600" />;
    case 'achievement': return <Star className="w-5 h-5 text-purple-600" />;
    default: return <Bell className="w-5 h-5 text-stone-600" />;
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high': return 'border-l-red-500 bg-red-50';
    case 'medium': return 'border-l-amber-500 bg-amber-50';
    case 'low': return 'border-l-green-500 bg-green-50';
    default: return 'border-l-stone-500 bg-stone-50';
  }
};

export function NotificationsScreen() {
  const [activeTab, setActiveTab] = useState('all');
  const [unreadCount, setUnreadCount] = useState(2);

  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return notification.isNew;
    return notification.type === activeTab;
  });

  return (
    <div className="h-full bg-gradient-to-b from-amber-50 to-stone-100 overflow-y-auto">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-stone-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-stone-800">Notifications</h1>
            {unreadCount > 0 && (
              <p className="text-sm text-stone-600">{unreadCount} new updates</p>
            )}
          </div>
          <div className="relative">
            <Bell className="w-6 h-6 text-stone-600" />
            {unreadCount > 0 && (
              <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-medium">{unreadCount}</span>
              </div>
            )}
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white rounded-xl border border-stone-200">
            <TabsTrigger value="all" className="rounded-lg data-[state=active]:bg-amber-100 data-[state=active]:text-amber-800 text-xs">
              All
            </TabsTrigger>
            <TabsTrigger value="unread" className="rounded-lg data-[state=active]:bg-amber-100 data-[state=active]:text-amber-800 text-xs">
              Unread
            </TabsTrigger>
            <TabsTrigger value="event" className="rounded-lg data-[state=active]:bg-amber-100 data-[state=active]:text-amber-800 text-xs">
              Events
            </TabsTrigger>
            <TabsTrigger value="community" className="rounded-lg data-[state=active]:bg-amber-100 data-[state=active]:text-amber-800 text-xs">
              Community
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="p-4 space-y-6">
        {/* Upcoming Events */}
        {activeTab === 'all' && (
          <div>
            <h3 className="font-semibold text-stone-800 mb-3 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-600" />
              Upcoming Events
            </h3>
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="border-stone-200 rounded-xl bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-stone-800 mb-1">{event.title}</h4>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-stone-600">
                            <Clock className="w-3 h-3" />
                            <span>{event.date} at {event.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-stone-600">
                            <MapPin className="w-3 h-3" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge variant="secondary" className="bg-amber-100 text-amber-700 rounded-md text-xs">
                          {event.type}
                        </Badge>
                        <Button size="sm" variant="ghost" className="text-amber-600 hover:bg-amber-50 p-1">
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Notifications List */}
        <div>
          <h3 className="font-semibold text-stone-800 mb-3">Recent Notifications</h3>
          <div className="space-y-3">
            {filteredNotifications.map((notification) => (
              <Card
                key={notification.id}
                className={`border-stone-200 rounded-xl bg-white/80 backdrop-blur-sm border-l-4 ${
                  notification.isNew ? getPriorityColor(notification.priority) : 'border-l-stone-200 bg-white'
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <h4 className="font-medium text-stone-800">{notification.title}</h4>
                        {notification.isNew && (
                          <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0 mt-2"></div>
                        )}
                      </div>
                      <p className="text-sm text-stone-600 mb-2">{notification.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-stone-500">
                          <Clock className="w-3 h-3" />
                          <span>{notification.time}</span>
                          {notification.location && (
                            <>
                              <span>•</span>
                              <span>{notification.location}</span>
                            </>
                          )}
                        </div>
                        {notification.type === 'event' && (
                          <Button size="sm" variant="ghost" className="text-amber-600 hover:bg-amber-50 text-xs">
                            View Event
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {filteredNotifications.length === 0 && (
          <div className="text-center py-12">
            <Bell className="w-16 h-16 text-stone-300 mx-auto mb-4" />
            <h3 className="font-medium text-stone-600 mb-2">No notifications</h3>
            <p className="text-sm text-stone-500">
              {activeTab === 'unread' 
                ? "You're all caught up!" 
                : "Check back later for updates"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}