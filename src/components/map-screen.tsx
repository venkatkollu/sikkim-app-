import React, { useState } from 'react';
import { Search, Filter, Navigation, MapPin, Star } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';

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
  }
];

interface MapScreenProps {
  onMonasterySelect: (monastery: any) => void;
}

export function MapScreen({ onMonasterySelect }: MapScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    region: '',
    century: '',
    popularity: ''
  });

  const filteredMonasteries = monasteries.filter(monastery => {
    return monastery.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           monastery.region.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-amber-50 to-stone-100">
      {/* Header with Search */}
      <div className="p-4 bg-white/90 backdrop-blur-sm border-b border-stone-200">
        <div className="flex gap-3 mb-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 w-4 h-4" />
            <Input
              placeholder="Search monasteries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-stone-50 border-stone-200 rounded-xl"
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
            className="border-stone-200 rounded-xl bg-white"
          >
            <Filter className="w-4 h-4 text-stone-600" />
          </Button>
          <Button
            size="icon"
            className="bg-amber-600 hover:bg-amber-700 rounded-xl text-white"
          >
            <Navigation className="w-4 h-4" />
          </Button>
        </div>
        
        {showFilters && (
          <div className="flex gap-2 flex-wrap">
            <Badge variant="secondary" className="bg-stone-100 text-stone-700 rounded-lg">Tibet</Badge>
            <Badge variant="secondary" className="bg-stone-100 text-stone-700 rounded-lg">15th Century</Badge>
            <Badge variant="secondary" className="bg-stone-100 text-stone-700 rounded-lg">Popular</Badge>
          </div>
        )}
      </div>

      {/* Map Area */}
      <div className="flex-1 relative bg-gradient-to-br from-green-100 via-amber-50 to-stone-200">
        {/* Simulated Map Background */}
        <div className="absolute inset-0 opacity-30">
          <svg className="w-full h-full" viewBox="0 0 400 600">
            <defs>
              <pattern id="topo" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="1" fill="#8B7355" opacity="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#topo)"/>
            <path d="M50,100 Q150,50 250,150 T350,200" stroke="#6B5B73" strokeWidth="2" fill="none" opacity="0.4"/>
            <path d="M100,200 Q200,150 300,250 T400,300" stroke="#6B5B73" strokeWidth="2" fill="none" opacity="0.4"/>
          </svg>
        </div>

        {/* Monastery Pins */}
        {filteredMonasteries.map((monastery, index) => (
          <div
            key={monastery.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
            style={{
              left: `${30 + index * 25}%`,
              top: `${40 + index * 15}%`
            }}
            onClick={() => onMonasterySelect(monastery)}
          >
            <div className="relative">
              <div className="w-8 h-8 bg-amber-600 rounded-full border-4 border-white shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <MapPin className="w-4 h-4 text-white" />
              </div>
              <div className="absolute top-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="bg-white rounded-lg shadow-lg p-2 min-w-[120px] border border-stone-200">
                  <p className="text-sm font-medium text-stone-800">{monastery.name}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-3 h-3 text-amber-500 fill-current" />
                    <span className="text-xs text-stone-600">{monastery.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Sheet with Monastery List */}
      <div className="bg-white rounded-t-3xl shadow-2xl border-t border-stone-200 max-h-64 overflow-y-auto">
        <div className="p-4">
          <div className="w-12 h-1 bg-stone-300 rounded-full mx-auto mb-4"></div>
          <h3 className="font-semibold text-stone-800 mb-3">Nearby Monasteries</h3>
          <div className="space-y-3">
            {filteredMonasteries.map((monastery) => (
              <Card
                key={monastery.id}
                className="p-3 cursor-pointer hover:bg-stone-50 transition-colors duration-200 border-stone-200 rounded-xl"
                onClick={() => onMonasterySelect(monastery)}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={monastery.image}
                    alt={monastery.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-stone-800">{monastery.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs bg-amber-100 text-amber-700 rounded-md">
                        {monastery.region}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-amber-500 fill-current" />
                        <span className="text-xs text-stone-600">{monastery.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-stone-500">{monastery.visitors.toLocaleString()}</p>
                    <p className="text-xs text-stone-400">visitors</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}