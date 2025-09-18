import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const notifications = [
  {
    id: 1,
    type: 'event',
    icon: 'calendar',
    iconColor: '#d97706',
    title: 'Losar Festival Starting Soon',
    message: 'The Tibetan New Year celebration begins at Rumtek Monastery in 2 hours',
    time: '2 hours ago',
    unread: true,
  },
  {
    id: 2,
    type: 'update',
    icon: 'information-circle',
    iconColor: '#3b82f6',
    title: 'New Virtual Tour Available',
    message: 'Explore Pemayangtse Monastery in 360° virtual reality',
    time: '5 hours ago',
    unread: true,
  },
  {
    id: 3,
    type: 'weather',
    icon: 'cloud-rain',
    iconColor: '#6b7280',
    title: 'Weather Update',
    message: 'Light rain expected at Tashiding Monastery area today',
    time: '1 day ago',
    unread: false,
  },
  {
    id: 4,
    type: 'achievement',
    icon: 'trophy',
    iconColor: '#059669',
    title: 'Achievement Unlocked!',
    message: 'You have visited 5 different monasteries. Keep exploring!',
    time: '2 days ago',
    unread: false,
  },
  {
    id: 5,
    type: 'reminder',
    icon: 'alarm',
    iconColor: '#7c3aed',
    title: 'Morning Prayer Reminder',
    message: 'Morning prayers start at 6:00 AM at Enchey Monastery',
    time: '3 days ago',
    unread: false,
  },
];

export default function NotificationsScreen() {
  const [activeFilter, setActiveFilter] = useState('all');

  const handleMarkAllRead = () => {
    // Mark all notifications as read
  };

  const renderNotification = (notification: any) => (
    <TouchableOpacity key={notification.id} style={[
      styles.notificationCard,
      notification.unread && styles.unreadCard
    ]}>
      <View style={[styles.iconContainer, { backgroundColor: `${notification.iconColor}20` }]}>
        <Ionicons name={notification.icon as any} size={20} color={notification.iconColor} />
      </View>
      
      <View style={styles.notificationContent}>
        <Text style={[
          styles.notificationTitle,
          notification.unread && styles.unreadTitle
        ]}>
          {notification.title}
        </Text>
        <Text style={styles.notificationMessage}>{notification.message}</Text>
        <Text style={styles.notificationTime}>{notification.time}</Text>
      </View>

      {notification.unread && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity style={styles.markAllButton} onPress={handleMarkAllRead}>
          <Text style={styles.markAllText}>Mark all read</Text>
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        <TouchableOpacity style={[styles.filterTab, activeFilter === 'all' && styles.activeFilter]}>
          <Text style={[styles.filterText, activeFilter === 'all' && styles.activeFilterText]}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterTab}>
          <Text style={styles.filterText}>Events</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterTab}>
          <Text style={styles.filterText}>Updates</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterTab}>
          <Text style={styles.filterText}>Weather</Text>
        </TouchableOpacity>
      </View>

      {/* Notifications List */}
      <ScrollView style={styles.notificationsList}>
        {notifications.map(renderNotification)}
        
        {/* Empty State for older notifications */}
        <View style={styles.emptyState}>
          <Ionicons name="checkmark-circle" size={48} color="#9ca3af" />
          <Text style={styles.emptyStateTitle}>You're all caught up!</Text>
          <Text style={styles.emptyStateMessage}>
            No more notifications to show
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#374151',
  },
  markAllButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#fef3c7',
    borderRadius: 8,
  },
  markAllText: {
    fontSize: 12,
    color: '#d97706',
    fontWeight: '500',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    gap: 8,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
  },
  activeFilter: {
    backgroundColor: '#d97706',
  },
  filterText: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  activeFilterText: {
    color: 'white',
  },
  notificationsList: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    alignItems: 'flex-start',
  },
  unreadCard: {
    borderColor: '#d97706',
    backgroundColor: '#fffbeb',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 4,
  },
  unreadTitle: {
    fontWeight: '600',
  },
  notificationMessage: {
    fontSize: 13,
    color: '#6b7280',
    lineHeight: 18,
    marginBottom: 6,
  },
  notificationTime: {
    fontSize: 11,
    color: '#9ca3af',
  },
  unreadDot: {
    width: 8,
    height: 8,
    backgroundColor: '#d97706',
    borderRadius: 4,
    marginTop: 4,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6b7280',
    marginTop: 12,
    marginBottom: 4,
  },
  emptyStateMessage: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
  },
});
