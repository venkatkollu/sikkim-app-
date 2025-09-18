import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Switch,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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

export default function ProfileScreen() {
  const [offlineMode, setOfflineMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('English');

  const handleSettings = () => {
    Alert.alert('Settings', 'Opening settings menu...');
  };

  const handleLanguageChange = () => {
    Alert.alert(
      'Language',
      'Select your preferred language:',
      [
        { text: 'English', onPress: () => setLanguage('English') },
        { text: 'Hindi', onPress: () => setLanguage('Hindi') },
        { text: 'Tibetan', onPress: () => setLanguage('Tibetan') },
        { text: 'Nepali', onPress: () => setLanguage('Nepali') },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'visit':
        return 'location';
      case 'photo':
        return 'camera';
      case 'review':
        return 'star';
      default:
        return 'help-circle';
    }
  };

  const getActivityIconColor = (type: string) => {
    switch (type) {
      case 'visit':
        return '#059669';
      case 'photo':
        return '#3b82f6';
      case 'review':
        return '#7c3aed';
      default:
        return '#6b7280';
    }
  };

  const getActivityBackgroundColor = (type: string) => {
    switch (type) {
      case 'visit':
        return '#dcfce7';
      case 'photo':
        return '#dbeafe';
      case 'review':
        return '#ede9fe';
      default:
        return '#f3f4f6';
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.settingsButton} onPress={handleSettings}>
          <Ionicons name="settings-outline" size={20} color="#6b7280" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* User Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <Image source={{ uri: userData.avatar }} style={styles.avatar} />
            <View style={styles.profileInfo}>
              <Text style={styles.userName}>{userData.name}</Text>
              <Text style={styles.userEmail}>{userData.email}</Text>
              <Text style={styles.joinDate}>{userData.joinDate}</Text>
            </View>
          </View>
          
          <View style={styles.badgesContainer}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{userData.badgeLevel}</Text>
            </View>
            <View style={styles.regionBadge}>
              <Text style={styles.regionBadgeText}>{userData.favoriteRegion}</Text>
            </View>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userData.visitedMonasteries}</Text>
              <Text style={styles.statLabel}>Visited</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userData.photosShared}</Text>
              <Text style={styles.statLabel}>Photos</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userData.reviewsWritten}</Text>
              <Text style={styles.statLabel}>Reviews</Text>
            </View>
          </View>
        </View>

        {/* Achievements Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Achievements</Text>
          <View style={styles.achievementsContainer}>
            {achievements.map((achievement) => (
              <View
                key={achievement.id}
                style={[
                  styles.achievementItem,
                  achievement.earned ? styles.earnedAchievement : styles.unearnedAchievement
                ]}
              >
                <Text style={styles.achievementIcon}>{achievement.icon}</Text>
                <View style={styles.achievementInfo}>
                  <Text style={styles.achievementTitle}>{achievement.title}</Text>
                  <Text style={styles.achievementDescription}>{achievement.description}</Text>
                </View>
                {achievement.earned && (
                  <View style={styles.achievementCheck}>
                    <Text style={styles.checkMark}>✓</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Recent Activity Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Recent Activity</Text>
          <View style={styles.activityContainer}>
            {recentActivity.map((activity, index) => (
              <View key={activity.id}>
                <View style={styles.activityItem}>
                  <View style={[
                    styles.activityIcon,
                    { backgroundColor: getActivityBackgroundColor(activity.type) }
                  ]}>
                    <Ionicons 
                      name={getActivityIcon(activity.type) as any} 
                      size={16} 
                      color={getActivityIconColor(activity.type)} 
                    />
                  </View>
                  <View style={styles.activityInfo}>
                    <Text style={styles.activityTitle}>{activity.title}</Text>
                    <View style={styles.activityMeta}>
                      <Text style={styles.activityDate}>{activity.date}</Text>
                      <Text style={styles.activitySeparator}>•</Text>
                      <Text style={styles.activityLocation}>{activity.location}</Text>
                    </View>
                  </View>
                </View>
                {index < recentActivity.length - 1 && <View style={styles.separator} />}
              </View>
            ))}
          </View>
        </View>

        {/* Settings Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Settings</Text>
          <View style={styles.settingsContainer}>
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Ionicons name="download-outline" size={20} color="#6b7280" />
                <View style={styles.settingText}>
                  <Text style={styles.settingTitle}>Offline Mode</Text>
                  <Text style={styles.settingDescription}>Download content for offline use</Text>
                </View>
              </View>
              <Switch
                value={offlineMode}
                onValueChange={setOfflineMode}
                trackColor={{ false: '#f3f4f6', true: '#fef3c7' }}
                thumbColor={offlineMode ? '#d97706' : '#9ca3af'}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Ionicons name="globe-outline" size={20} color="#6b7280" />
                <View style={styles.settingText}>
                  <Text style={styles.settingTitle}>Language</Text>
                  <Text style={styles.settingDescription}>English, Hindi, Tibetan, Nepali</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.languageButton} onPress={handleLanguageChange}>
                <Text style={styles.languageButtonText}>{language}</Text>
                <Ionicons name="chevron-forward" size={16} color="#6b7280" />
              </TouchableOpacity>
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Ionicons name="people-outline" size={20} color="#6b7280" />
                <View style={styles.settingText}>
                  <Text style={styles.settingTitle}>Community Contributions</Text>
                  <Text style={styles.settingDescription}>Share photos and reviews</Text>
                </View>
              </View>
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: '#f3f4f6', true: '#fef3c7' }}
                thumbColor={notifications ? '#d97706' : '#9ca3af'}
              />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fef7ed',
  },
  header: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#374151',
  },
  settingsButton: {
    padding: 8,
    borderRadius: 12,
  },
  content: {
    padding: 16,
    gap: 24,
  },
  profileCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 4,
    borderColor: '#fef3c7',
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 2,
  },
  joinDate: {
    fontSize: 14,
    color: '#9ca3af',
  },
  badgesContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  badge: {
    backgroundColor: '#d97706',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  regionBadge: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  regionBadgeText: {
    color: '#374151',
    fontSize: 12,
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 16,
  },
  achievementsContainer: {
    gap: 12,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 12,
  },
  earnedAchievement: {
    backgroundColor: '#fef3c7',
    borderWidth: 1,
    borderColor: '#fbbf24',
  },
  unearnedAchievement: {
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    opacity: 0.6,
  },
  achievementIcon: {
    fontSize: 24,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 2,
  },
  achievementDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  achievementCheck: {
    width: 24,
    height: 24,
    backgroundColor: '#d97706',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkMark: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  activityContainer: {
    gap: 12,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 4,
  },
  activityMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  activityDate: {
    fontSize: 14,
    color: '#6b7280',
  },
  activitySeparator: {
    fontSize: 14,
    color: '#9ca3af',
  },
  activityLocation: {
    fontSize: 14,
    color: '#6b7280',
  },
  separator: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 8,
  },
  settingsContainer: {
    gap: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 4,
  },
  languageButtonText: {
    fontSize: 14,
    color: '#6b7280',
  },
});
