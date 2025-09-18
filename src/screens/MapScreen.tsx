import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
  TextInput,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

interface MapScreenProps {
  onMonasterySelect?: (monastery: any) => void;
}

const monasteries = [
  {
    id: 1,
    name: "Tashilhunpo Monastery",
    region: "Tibet",
    century: "15th",
    rating: 4.8,
    visitors: 12500,
    lat: 29.2635,
    lng: 88.8567,
    image: "https://images.unsplash.com/photo-1681118143208-51c6ad98eff6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwbW9uYXN0ZXJ5JTIwbW91bnRhaW58ZW58MXx8fHwxNzU4MTc1NTQwfDA&ixlib=rb-4.1.0&q=80&w=400"
  },
  {
    id: 2,
    name: "Hemis Monastery",
    region: "Ladakh",
    century: "17th",
    rating: 4.6,
    visitors: 8200,
    lat: 34.1358,
    lng: 77.6203,
    image: "https://images.unsplash.com/photo-1756005913783-8339e559c406?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aWJldGFuJTIwbW9uYXN0ZXJ5JTIwaGVyaXRhZ2V8ZW58MXx8fHwxNzU4MTc1NTQyfDA&ixlib=rb-4.1.0&q=80&w=400"
  },
  {
    id: 3,
    name: "Rongbuk Monastery",
    region: "Nepal",
    century: "20th",
    rating: 4.9,
    visitors: 15300,
    lat: 28.1516,
    lng: 86.8560,
    image: "https://images.unsplash.com/photo-1677672691642-4d9757116df8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidWRkaGElMjBzdGF0dWUlMjBtZWRpdGF0aW9ufGVufDF8fHx8MTc1ODE3NTU0NXww&ixlib=rb-4.1.0&q=80&w=400"
  },
  {
    id: 4,
    name: "Rumtek Monastery",
    region: "Sikkim",
    century: "20th",
    rating: 4.9,
    visitors: 8500,
    lat: 27.3389,
    lng: 88.5353,
    image: "https://images.unsplash.com/photo-1621496770858-d9aacf27f513?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydW10ZWslMjBtb25hc3RlcnklMjBzaWtraW18ZW58MXx8fHwxNzU4MTc2NTI1fDA&ixlib=rb-4.1.0&q=80&w=800"
  }
];

export default function MapScreen({ onMonasterySelect }: MapScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    region: '',
    century: '',
    popularity: ''
  });
  const [selectedMonastery, setSelectedMonastery] = useState<any>(null);

  const filteredMonasteries = monasteries.filter(monastery => {
    return monastery.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           monastery.region.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleMonasterySelect = (monastery: any) => {
    setSelectedMonastery(monastery);
    if (onMonasterySelect) {
      onMonasterySelect(monastery);
    }
    Alert.alert(
      monastery.name,
      `${monastery.region} • ${monastery.century} Century\nRating: ${monastery.rating} • ${monastery.visitors.toLocaleString()} visitors`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'View Details', onPress: () => console.log('Navigate to details') }
      ]
    );
  };

  const handleNavigation = () => {
    Alert.alert('Navigation', 'Opening GPS navigation...');
  };

  const MonasteryPin = ({ monastery, index }: { monastery: any, index: number }) => {
    const pinStyle = {
      position: 'absolute' as const,
      left: `${30 + index * 25}%`,
      top: `${40 + index * 15}%`,
      transform: [{ translateX: -16 }, { translateY: -16 }],
    };

    return (
      <TouchableOpacity
        style={[styles.monasteryPin, pinStyle]}
        onPress={() => handleMonasterySelect(monastery)}
      >
        <View style={styles.pinContainer}>
          <View style={styles.pinCircle}>
            <Ionicons name="location" size={16} color="white" />
          </View>
          {selectedMonastery?.id === monastery.id && (
            <View style={styles.pinTooltip}>
              <Text style={styles.pinTooltipName}>{monastery.name}</Text>
              <View style={styles.pinTooltipRating}>
                <Ionicons name="star" size={12} color="#fbbf24" />
                <Text style={styles.pinTooltipRatingText}>{monastery.rating}</Text>
              </View>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header with Search */}
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Ionicons name="search" size={16} color="#9ca3af" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search monasteries..."
              placeholderTextColor="#9ca3af"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setShowFilters(!showFilters)}
          >
            <Ionicons name="options" size={16} color="#374151" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navigationButton} onPress={handleNavigation}>
            <Ionicons name="navigate" size={16} color="white" />
          </TouchableOpacity>
        </View>
        
        {showFilters && (
          <View style={styles.filtersContainer}>
            <View style={styles.filterChip}>
              <Text style={styles.filterChipText}>Tibet</Text>
            </View>
            <View style={styles.filterChip}>
              <Text style={styles.filterChipText}>15th Century</Text>
            </View>
            <View style={styles.filterChip}>
              <Text style={styles.filterChipText}>Popular</Text>
            </View>
          </View>
        )}
      </View>

      {/* Map Area */}
      <View style={styles.mapContainer}>
        {/* Simulated Map Background */}
        <View style={styles.mapBackground}>
          <View style={styles.topographicPattern} />
          <View style={styles.mountainPath1} />
          <View style={styles.mountainPath2} />
        </View>

        {/* Monastery Pins */}
        {filteredMonasteries.map((monastery, index) => (
          <MonasteryPin key={monastery.id} monastery={monastery} index={index} />
        ))}

        {/* Map Legend */}
        <View style={styles.mapLegend}>
          <Text style={styles.legendTitle}>Himalayan Heritage Trail</Text>
          <View style={styles.legendItems}>
            <View style={styles.legendItem}>
              <View style={styles.legendDot} />
              <Text style={styles.legendText}>Active Monasteries</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Bottom Sheet with Monastery List */}
      <View style={styles.bottomSheet}>
        <View style={styles.bottomSheetHandle} />
        <ScrollView style={styles.bottomSheetContent}>
          <Text style={styles.bottomSheetTitle}>Nearby Monasteries</Text>
          <View style={styles.monasteryList}>
            {filteredMonasteries.map((monastery) => (
              <TouchableOpacity
                key={monastery.id}
                style={[
                  styles.monasteryCard,
                  selectedMonastery?.id === monastery.id && styles.selectedMonasteryCard
                ]}
                onPress={() => handleMonasterySelect(monastery)}
              >
                <Image source={{ uri: monastery.image }} style={styles.monasteryImage} />
                <View style={styles.monasteryInfo}>
                  <Text style={styles.monasteryName}>{monastery.name}</Text>
                  <View style={styles.monasteryMeta}>
                    <View style={styles.monasteryRegionBadge}>
                      <Text style={styles.monasteryRegionText}>{monastery.region}</Text>
                    </View>
                    <View style={styles.monasteryRating}>
                      <Ionicons name="star" size={12} color="#fbbf24" />
                      <Text style={styles.monasteryRatingText}>{monastery.rating}</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.monasteryStats}>
                  <Text style={styles.monasteryVisitors}>{monastery.visitors.toLocaleString()}</Text>
                  <Text style={styles.monasteryVisitorsLabel}>visitors</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fef7ed',
  },
  header: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  searchContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 14,
    color: '#374151',
  },
  filterButton: {
    width: 44,
    height: 44,
    backgroundColor: 'white',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  navigationButton: {
    width: 44,
    height: 44,
    backgroundColor: '#d97706',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filtersContainer: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  filterChip: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  filterChipText: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '500',
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#dcfce7',
  },
  mapBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.3,
  },
  topographicPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
  },
  mountainPath1: {
    position: 'absolute',
    top: '20%',
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#6b7280',
    opacity: 0.4,
    borderRadius: 1,
  },
  mountainPath2: {
    position: 'absolute',
    top: '60%',
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#6b7280',
    opacity: 0.4,
    borderRadius: 1,
  },
  monasteryPin: {
    zIndex: 10,
  },
  pinContainer: {
    alignItems: 'center',
  },
  pinCircle: {
    width: 32,
    height: 32,
    backgroundColor: '#d97706',
    borderRadius: 16,
    borderWidth: 4,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  pinTooltip: {
    position: 'absolute',
    top: 40,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    minWidth: 120,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pinTooltipName: {
    fontSize: 12,
    fontWeight: '500',
    color: '#374151',
  },
  pinTooltipRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  pinTooltipRatingText: {
    fontSize: 10,
    color: '#6b7280',
  },
  mapLegend: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  legendTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  legendItems: {
    gap: 4,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 8,
    height: 8,
    backgroundColor: '#d97706',
    borderRadius: 4,
  },
  legendText: {
    fontSize: 10,
    color: '#6b7280',
  },
  bottomSheet: {
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    maxHeight: height * 0.4,
  },
  bottomSheetHandle: {
    width: 48,
    height: 4,
    backgroundColor: '#d1d5db',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 16,
  },
  bottomSheetContent: {
    paddingHorizontal: 16,
  },
  bottomSheetTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  monasteryList: {
    gap: 12,
    paddingBottom: 20,
  },
  monasteryCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    alignItems: 'center',
  },
  selectedMonasteryCard: {
    borderColor: '#d97706',
    backgroundColor: '#fffbeb',
  },
  monasteryImage: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginRight: 12,
  },
  monasteryInfo: {
    flex: 1,
  },
  monasteryName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 4,
  },
  monasteryMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  monasteryRegionBadge: {
    backgroundColor: '#fef3c7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  monasteryRegionText: {
    fontSize: 10,
    color: '#92400e',
    fontWeight: '500',
  },
  monasteryRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  monasteryRatingText: {
    fontSize: 10,
    color: '#6b7280',
  },
  monasteryStats: {
    alignItems: 'flex-end',
  },
  monasteryVisitors: {
    fontSize: 12,
    color: '#6b7280',
  },
  monasteryVisitorsLabel: {
    fontSize: 10,
    color: '#9ca3af',
  },
});
