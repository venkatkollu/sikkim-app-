import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

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

export default function DashboardScreen({ monastery }: DashboardScreenProps) {
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

  const handleShare = () => {
    Alert.alert('Share', 'Sharing functionality would be implemented here');
  };

  const handleLike = () => {
    setLiked(!liked);
  };

  const handlePlanVisit = () => {
    Alert.alert('Plan Visit', 'Opening directions and visit planning...');
  };

  const handleJoinEvent = (eventTitle: string) => {
    Alert.alert('Join Event', `Joining ${eventTitle}...`);
  };

  const handleVirtualTour = () => {
    Alert.alert('Virtual Tour', 'Starting 360° virtual experience...');
  };

  const renderTabButton = (tabId: string, title: string) => (
    <TouchableOpacity
      key={tabId}
      style={[
        styles.tabButton,
        activeTab === tabId && styles.activeTabButton
      ]}
      onPress={() => setActiveTab(tabId)}
    >
      <Text style={[
        styles.tabButtonText,
        activeTab === tabId && styles.activeTabButtonText
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  const renderOverviewTab = () => (
    <View style={styles.tabContent}>
      {/* Description Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>About Rumtek Monastery</Text>
        <Text style={styles.cardDescription}>{currentMonastery.description}</Text>
      </View>

      {/* Interactive Stats Grid */}
      <View style={styles.statsGrid}>
        <TouchableOpacity style={[styles.statCard, styles.trendingCard]}>
          <View style={styles.statIconContainer}>
            <Ionicons name="trending-up" size={20} color="#d97706" />
          </View>
          <View style={styles.statContent}>
            <Text style={styles.statNumber}>{currentMonastery.totalVisitors.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Annual Visitors</Text>
            <View style={styles.statGrowthContainer}>
              <View style={styles.growthDot} />
              <Text style={styles.statGrowth}>+12% this year</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.statCard, styles.awardCard]}>
          <View style={[styles.statIconContainer, styles.greenIconContainer]}>
            <Ionicons name="trophy" size={20} color="#059669" />
          </View>
          <View style={styles.statContent}>
            <Text style={styles.statNumber}>{currentMonastery.founded}</Text>
            <Text style={styles.statLabel}>Established</Text>
            <Text style={styles.statSubtext}>58 years of heritage</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Cultural Importance Progress */}
      <View style={styles.card}>
        <View style={styles.importanceHeader}>
          <Text style={styles.cardTitle}>Cultural Significance</Text>
          <Text style={styles.importancePercentage}>{currentMonastery.importanceLevel}%</Text>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${currentMonastery.importanceLevel}%` }]} />
        </View>
        <View style={styles.progressLabels}>
          <Text style={styles.progressLabel}>UNESCO Heritage Site</Text>
          <Text style={styles.progressLabel}>International Recognition</Text>
        </View>
        <Text style={styles.importanceDescription}>
          Recognized for architectural excellence and spiritual significance
        </Text>
      </View>

      {/* Visiting Information */}
      <View style={styles.card}>
        <View style={styles.visitingInfo}>
          <View style={styles.visitingInfoLeft}>
            <Ionicons name="time" size={20} color="#d97706" />
            <View style={styles.visitingInfoText}>
              <Text style={styles.cardTitle}>Visiting Hours</Text>
              <Text style={styles.cardDescription}>{currentMonastery.openingHours}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.planVisitButton} onPress={handlePlanVisit}>
            <Text style={styles.planVisitButtonText}>Plan Visit</Text>
            <Ionicons name="chevron-forward" size={16} color="#d97706" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderEventsTab = () => (
    <View style={styles.tabContent}>
      {currentMonastery.events.map((event: any, index: number) => (
        <TouchableOpacity key={index} style={styles.eventCard}>
          <View style={styles.eventHeader}>
            <View style={styles.eventInfo}>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <View style={styles.eventDetails}>
                <Text style={styles.eventDate}>{event.date}</Text>
                <Text style={styles.eventTime}>{event.time}</Text>
              </View>
            </View>
            <View style={styles.eventTypeBadge}>
              <Text style={styles.eventTypeText}>{event.type}</Text>
            </View>
          </View>
          <Text style={styles.eventDescription}>{event.description}</Text>
          <View style={styles.eventFooter}>
            <View style={styles.eventAttendees}>
              <Ionicons name="people" size={14} color="#6b7280" />
              <Text style={styles.eventAttendeesText}>{event.attendees} expected</Text>
            </View>
            <TouchableOpacity 
              style={styles.joinEventButton}
              onPress={() => handleJoinEvent(event.title)}
            >
              <Text style={styles.joinEventButtonText}>Join Event</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderGalleryTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.galleryGrid}>
        {currentMonastery.gallery.map((image: string, index: number) => (
          <TouchableOpacity key={index} style={styles.galleryItem}>
            <Image source={{ uri: image }} style={styles.galleryImage} />
            <View style={styles.galleryOverlay}>
              <Ionicons name="camera" size={20} color="white" />
            </View>
            <View style={styles.galleryBadge}>
              <Text style={styles.galleryBadgeText}>
                {index === 0 ? 'Main Hall' : index === 1 ? 'Prayer Wheels' : index === 2 ? 'Mountain View' : 'Exterior'}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      
      {/* Virtual Tour Card */}
      <View style={styles.virtualTourCard}>
        <View style={styles.virtualTourHeader}>
          <Ionicons name="videocam" size={20} color="#d97706" />
          <Text style={styles.virtualTourTitle}>360° Virtual Experience</Text>
        </View>
        <Text style={styles.virtualTourDescription}>
          Immerse yourself in the sacred spaces through our interactive virtual tours
        </Text>
        <TouchableOpacity style={styles.virtualTourButton} onPress={handleVirtualTour}>
          <Text style={styles.virtualTourButtonText}>Start Virtual Tour</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Inspirational Quote Header */}
      <View style={styles.quoteHeader}>
        <Text style={styles.quoteText}>
          "In the silence of the mountains, wisdom whispers through ancient walls"
        </Text>
        <Text style={styles.quoteAuthor}>- Sikkim Sacred Heritage</Text>
      </View>

      {/* Hero Section */}
      <View style={styles.heroSection}>
        <Image source={{ uri: currentMonastery.image }} style={styles.heroImage} />
        <View style={styles.heroOverlay} />
        
        {/* Header Actions */}
        <View style={styles.heroActions}>
          <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
            <Ionicons 
              name={liked ? "heart" : "heart-outline"} 
              size={20} 
              color={liked ? "#ef4444" : "#374151"} 
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
            <Ionicons name="share-outline" size={20} color="#374151" />
          </TouchableOpacity>
        </View>

        {/* Live Status */}
        <View style={styles.liveStatus}>
          <View style={styles.liveDot} />
          <Text style={styles.liveText}>Live</Text>
        </View>

        {/* Title Overlay */}
        <View style={styles.heroTitleContainer}>
          <Text style={styles.heroTitle}>{currentMonastery.name}</Text>
          <View style={styles.heroInfo}>
            <View style={styles.heroInfoBadge}>
              <Ionicons name="location" size={12} color="white" />
              <Text style={styles.heroInfoText}>{currentMonastery.region}</Text>
            </View>
            <View style={styles.heroInfoBadge}>
              <Ionicons name="star" size={12} color="#fbbf24" />
              <Text style={styles.heroInfoText}>{currentMonastery.rating}</Text>
            </View>
            <View style={styles.centuryBadge}>
              <Text style={styles.centuryText}>{currentMonastery.century}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Live Stats Bar */}
      <View style={styles.liveStatsBar}>
        <View style={styles.statItem}>
          <View style={styles.statIcon}>
            <Ionicons name="eye" size={16} color="#059669" />
            <Text style={styles.statValue}>{todaysVisitors}</Text>
          </View>
          <Text style={styles.statLabelSmall}>Today's Visitors</Text>
        </View>
        <View style={styles.statItem}>
          <View style={styles.statIcon}>
            <Ionicons name="people" size={16} color="#d97706" />
            <Text style={styles.statValue}>{liveData.currentMonks}</Text>
          </View>
          <Text style={styles.statLabelSmall}>Resident Monks</Text>
        </View>
        <View style={styles.statItem}>
          <View style={styles.statIcon}>
            <Ionicons name="time" size={16} color="#3b82f6" />
            <Text style={styles.statValue}>{liveData.nextPrayer}</Text>
          </View>
          <Text style={styles.statLabelSmall}>Next Prayer</Text>
        </View>
      </View>

      {/* Content Tabs */}
      <View style={styles.tabContainer}>
        <View style={styles.tabButtons}>
          {renderTabButton('overview', 'Overview')}
          {renderTabButton('events', 'Events')}
          {renderTabButton('gallery', 'Gallery')}
        </View>

        {activeTab === 'overview' && renderOverviewTab()}
        {activeTab === 'events' && renderEventsTab()}
        {activeTab === 'gallery' && renderGalleryTab()}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fef7ed',
  },
  quoteHeader: {
    backgroundColor: '#d97706',
    padding: 16,
    alignItems: 'center',
  },
  quoteText: {
    color: 'white',
    fontSize: 14,
    fontStyle: 'italic',
    fontWeight: '500',
    textAlign: 'center',
  },
  quoteAuthor: {
    color: '#fbbf24',
    fontSize: 12,
    marginTop: 4,
  },
  heroSection: {
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  heroActions: {
    position: 'absolute',
    top: 16,
    right: 16,
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 8,
    borderRadius: 12,
  },
  liveStatus: {
    position: 'absolute',
    top: 16,
    left: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#059669',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  liveDot: {
    width: 8,
    height: 8,
    backgroundColor: 'white',
    borderRadius: 4,
    marginRight: 8,
  },
  liveText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  heroTitleContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
  heroTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  heroInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  heroInfoBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  heroInfoText: {
    color: 'white',
    fontSize: 12,
  },
  centuryBadge: {
    backgroundColor: '#d97706',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  centuryText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  liveStatsBar: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#374151',
  },
  statLabelSmall: {
    fontSize: 12,
    color: '#6b7280',
  },
  tabContainer: {
    padding: 16,
  },
  tabButtons: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 16,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTabButton: {
    backgroundColor: '#fef3c7',
  },
  tabButtonText: {
    fontSize: 14,
    color: '#6b7280',
  },
  activeTabButtonText: {
    color: '#92400e',
    fontWeight: '500',
  },
  tabContent: {
    gap: 12,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  trendingCard: {
    // Additional styling for trending card
  },
  awardCard: {
    // Additional styling for award card
  },
  statIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#fef3c7',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  greenIconContainer: {
    backgroundColor: '#dcfce7',
  },
  statContent: {
    flex: 1,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  statGrowthContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  growthDot: {
    width: 8,
    height: 8,
    backgroundColor: '#059669',
    borderRadius: 4,
  },
  statGrowth: {
    fontSize: 10,
    color: '#059669',
  },
  statSubtext: {
    fontSize: 10,
    color: '#9ca3af',
  },
  importanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  importancePercentage: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  progressBar: {
    height: 12,
    backgroundColor: '#f3f4f6',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#d97706',
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  importanceDescription: {
    fontSize: 12,
    color: '#6b7280',
  },
  visitingInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  visitingInfoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  visitingInfoText: {
    flex: 1,
  },
  planVisitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef3c7',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 4,
  },
  planVisitButtonText: {
    fontSize: 12,
    color: '#92400e',
    fontWeight: '500',
  },
  eventCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 4,
  },
  eventDetails: {
    flexDirection: 'row',
    gap: 16,
  },
  eventDate: {
    fontSize: 12,
    color: '#d97706',
    fontWeight: '500',
  },
  eventTime: {
    fontSize: 12,
    color: '#6b7280',
  },
  eventTypeBadge: {
    backgroundColor: '#fef3c7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  eventTypeText: {
    fontSize: 10,
    color: '#92400e',
    fontWeight: '500',
  },
  eventDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
    lineHeight: 18,
  },
  eventFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eventAttendees: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  eventAttendeesText: {
    fontSize: 12,
    color: '#6b7280',
  },
  joinEventButton: {
    backgroundColor: '#fef3c7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  joinEventButtonText: {
    fontSize: 12,
    color: '#d97706',
    fontWeight: '500',
  },
  galleryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  galleryItem: {
    width: (width - 44) / 2,
    position: 'relative',
  },
  galleryImage: {
    width: '100%',
    height: 120,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  galleryOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
  },
  galleryBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  galleryBadgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '500',
  },
  virtualTourCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  virtualTourHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  virtualTourTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
  },
  virtualTourDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
    lineHeight: 18,
  },
  virtualTourButton: {
    backgroundColor: '#d97706',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  virtualTourButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});
