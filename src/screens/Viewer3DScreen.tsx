import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Viewer3DScreen() {
  const handleStartTour = () => {
    Alert.alert('Virtual Tour', 'Starting 360° virtual experience...\n\nThis would launch the immersive monastery tour.');
  };

  const handleFeature = (featureName: string) => {
    Alert.alert(featureName, `${featureName} feature would be available in the full version.`);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>3D Virtual Experience</Text>
        <Text style={styles.headerSubtitle}>
          Immersive tours of sacred heritage sites
        </Text>
      </View>

      <View style={styles.viewerPlaceholder}>
        <Ionicons name="cube-outline" size={80} color="#d97706" />
        <Text style={styles.placeholderTitle}>3D Monastery Tour</Text>
        <Text style={styles.placeholderSubtitle}>
          Interactive 360° exploration of Rumtek Monastery
        </Text>
        
        <View style={styles.features}>
          <TouchableOpacity 
            style={styles.feature}
            onPress={() => handleFeature('360° Photography')}
          >
            <Ionicons name="camera" size={24} color="#059669" />
            <Text style={styles.featureTitle}>360° Photography</Text>
            <Text style={styles.featureDescription}>
              High-resolution panoramic views of sacred spaces
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.feature}
            onPress={() => handleFeature('VR Compatible')}
          >
            <Ionicons name="glasses" size={24} color="#3b82f6" />
            <Text style={styles.featureTitle}>VR Compatible</Text>
            <Text style={styles.featureDescription}>
              Virtual reality experience with compatible headsets
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.feature}
            onPress={() => handleFeature('Audio Guides')}
          >
            <Ionicons name="volume-high" size={24} color="#7c3aed" />
            <Text style={styles.featureTitle}>Audio Guides</Text>
            <Text style={styles.featureDescription}>
              Narrated cultural insights and historical context
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.startButton} onPress={handleStartTour}>
          <Text style={styles.startButtonText}>Start Virtual Tour</Text>
          <Ionicons name="play" size={16} color="white" />
        </TouchableOpacity>
      </View>

      {/* Additional Info */}
      <View style={styles.infoSection}>
        <View style={styles.infoCard}>
          <Ionicons name="information-circle" size={24} color="#d97706" />
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>Immersive Experience</Text>
            <Text style={styles.infoDescription}>
              Explore the sacred halls, prayer wheels, and meditation spaces of Rumtek Monastery 
              through our cutting-edge virtual reality technology.
            </Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <Ionicons name="headset" size={24} color="#3b82f6" />
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>VR Ready</Text>
            <Text style={styles.infoDescription}>
              Compatible with major VR headsets including Oculus, HTC Vive, and mobile VR solutions.
            </Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <Ionicons name="school" size={24} color="#059669" />
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>Educational Content</Text>
            <Text style={styles.infoDescription}>
              Learn about Tibetan Buddhism, monastery architecture, and cultural significance 
              through interactive hotspots and guided narration.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  viewerPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fef3c7',
    margin: 16,
    borderRadius: 16,
    padding: 32,
  },
  placeholderTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#92400e',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  placeholderSubtitle: {
    fontSize: 16,
    color: '#a16207',
    textAlign: 'center',
    marginBottom: 32,
  },
  features: {
    width: '100%',
    gap: 20,
    marginBottom: 32,
  },
  feature: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginTop: 8,
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 18,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d97706',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  startButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  infoSection: {
    padding: 16,
    gap: 16,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    alignItems: 'flex-start',
    gap: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  infoDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 18,
  },
});
