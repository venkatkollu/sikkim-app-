import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, RotateCcw, Maximize, Camera, Layers, Info, Navigation, Compass, Move3D, Zap, HeadphonesIcon, Users, Star, BookOpen, Hand, Eye, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Slider } from './ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

const sikkimMonasteries = {
  rumtek: {
    id: 'rumtek',
    name: 'Rumtek Monastery',
    location: 'Gangtok, Sikkim',
    founded: '1966',
    significance: 'Seat of the 16th Karmapa',
    image: 'https://images.unsplash.com/photo-1621496770858-d9aacf27f513?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydW10ZWslMjBtb25hc3RlcnklMjBzaWtraW18ZW58MXx8fHwxNzU4MTc2NTI1fDA&ixlib=rb-4.1.0&q=80&w=800',
    scenes: [
      { id: 1, name: 'Main Assembly Hall', timestamp: '0:00', description: 'Golden Buddha and ancient murals' },
      { id: 2, name: 'Golden Stupa', timestamp: '3:15', description: 'Sacred relics of the 16th Karmapa' },
      { id: 3, name: 'Prayer Wheel Courtyard', timestamp: '6:30', description: 'Traditional spinning prayer wheels' },
      { id: 4, name: 'Monks Quarters', timestamp: '9:45', description: 'Daily life of resident monks' },
      { id: 5, name: 'Mountain Sanctuary', timestamp: '12:30', description: 'Himalayan meditation retreat' }
    ]
  },
  pemayangtse: {
    id: 'pemayangtse',
    name: 'Pemayangtse Monastery',
    location: 'Pelling, Sikkim',
    founded: '1705',
    significance: 'Premier monastery of Sikkim',
    image: 'https://images.unsplash.com/photo-1665730365086-244792392a21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZW1heWFuZ3RzZSUyMG1vbmFzdGVyeSUyMHNpa2tpbXxlbnwxfHx8fDE3NTgxNzcwNjh8MA&ixlib=rb-4.1.0&q=80&w=800',
    scenes: [
      { id: 1, name: 'Three-Story Temple', timestamp: '0:00', description: 'Architectural marvel with wooden carvings' },
      { id: 2, name: 'Rabdentse Palace View', timestamp: '4:20', description: 'Ancient royal capital ruins' },
      { id: 3, name: 'Sacred Library', timestamp: '7:40', description: 'Rare Buddhist manuscripts' },
      { id: 4, name: 'Khangchendzonga View', timestamp: '11:15', description: 'Sacred mountain panorama' },
      { id: 5, name: 'Meditation Gardens', timestamp: '14:50', description: 'Peaceful contemplation spaces' }
    ]
  },
  enchey: {
    id: 'enchey',
    name: 'Enchey Monastery',
    location: 'Gangtok, Sikkim',
    founded: '1909',
    significance: 'Tantric worship center',
    image: 'https://images.unsplash.com/photo-1717738979582-aa23dd492fbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmNoZXklMjBtb25hc3RlcnklMjBnYW5ndG9rfGVufDF8fHx8MTc1ODA2ODg3M3ww&ixlib=rb-4.1.0&q=80&w=800',
    scenes: [
      { id: 1, name: 'Tantric Hall', timestamp: '0:00', description: 'Sacred tantric practice space' },
      { id: 2, name: 'Guardian Deities', timestamp: '2:45', description: 'Protective deity statues' },
      { id: 3, name: 'Cham Dance Ground', timestamp: '5:30', description: 'Ritual dance performance area' },
      { id: 4, name: 'Prayer Flag Valley', timestamp: '8:20', description: 'Colorful prayer flags in wind' },
      { id: 5, name: 'City Overlook', timestamp: '11:00', description: 'Panoramic Gangtok cityscape' }
    ]
  }
};

const culturalElements = {
  prayerWheels: {
    name: 'Prayer Wheels',
    description: 'Each spin sends mantras to the heavens. Contains sacred Om Mani Padme Hum inscriptions.',
    interaction: 'Touch and drag to spin',
    sound: 'wheel-spinning',
    blessing: 'May all beings be free from suffering'
  },
  butterLamps: {
    name: 'Butter Lamps',
    description: 'Traditional offerings that symbolize the light of wisdom dispelling ignorance.',
    interaction: 'Tap to light a lamp',
    sound: 'flame-flickering',
    blessing: 'May the light of wisdom illuminate all paths'
  },
  thangka: {
    name: 'Thangka Paintings',
    description: 'Sacred scroll paintings depicting Buddhist deities, mandalas, and teachings.',
    interaction: 'Zoom to explore details',
    sound: 'gentle-chant',
    blessing: 'May these teachings guide your journey'
  },
  stupa: {
    name: 'Sacred Stupa',
    description: 'Monument representing Buddha\'s enlightened mind, containing holy relics.',
    interaction: 'Walk around clockwise',
    sound: 'deep-bell',
    blessing: 'May your merit accumulate with each circumambulation'
  },
  singingBowls: {
    name: 'Singing Bowls',
    description: 'Tibetan meditation bowls that produce healing frequencies for mind and body.',
    interaction: 'Strike to create sound',
    sound: 'singing-bowl',
    blessing: 'May these vibrations bring inner peace'
  },
  prayerFlags: {
    name: 'Prayer Flags',
    description: 'Colorful flags carrying prayers and mantras, spread by mountain winds.',
    interaction: 'Touch to see prayers',
    sound: 'wind-chimes',
    blessing: 'May your prayers reach all corners of the world'
  }
};

const virtualGuides = [
  {
    id: 'lama-tenzin',
    name: 'Lama Tenzin',
    role: 'Head Monk',
    specialty: 'Buddhist Philosophy',
    avatar: '🧘‍♂️',
    greeting: 'Tashi Delek! Welcome to our sacred monastery.',
    languages: ['English', 'Tibetan', 'Hindi', 'Nepali']
  },
  {
    id: 'ani-pema',
    name: 'Ani Pema',
    role: 'Meditation Teacher',
    specialty: 'Mindfulness Practice',
    avatar: '👩‍🦳',
    greeting: 'May peace and compassion fill your heart.',
    languages: ['English', 'Tibetan']
  },
  {
    id: 'novice-lobsang',
    name: 'Novice Lobsang',
    role: 'Young Monk',
    specialty: 'Daily Monastery Life',
    avatar: '👦',
    greeting: 'Let me show you how we live and practice here!',
    languages: ['English', 'Tibetan', 'Hindi']
  }
];

export function Viewer3DScreen() {
  const [selectedMonastery, setSelectedMonastery] = useState('rumtek');
  const [selectedScene, setSelectedScene] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showInfo, setShowInfo] = useState(true);
  const [arMode, setArMode] = useState(false);
  const [vrMode, setVRMode] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [selectedInteraction, setSelectedInteraction] = useState(null);
  const [viewMode, setViewMode] = useState('guided');
  const [compassHeading, setCompassHeading] = useState(45);
  const [selectedGuide, setSelectedGuide] = useState(virtualGuides[0]);
  const [activeTab, setActiveTab] = useState('explore');
  const [audioNarration, setAudioNarration] = useState(true);
  const [interactionCount, setInteractionCount] = useState(0);
  const [collectedBlessings, setCollectedBlessings] = useState([]);
  const [meditationMode, setMeditationMode] = useState(false);
  const viewerRef = useRef(null);

  const currentMonastery = sikkimMonasteries[selectedMonastery];
  const currentScene = currentMonastery.scenes[selectedScene - 1];

  // Interactive elements for each monastery
  const getInteractiveElements = (monasteryId) => {
    const baseElements = [
      { id: 1, name: 'Prayer Wheels', x: 25, y: 60, type: 'prayerWheels', monastery: monasteryId },
      { id: 2, name: 'Butter Lamps', x: 70, y: 45, type: 'butterLamps', monastery: monasteryId },
      { id: 3, name: 'Thangka Painting', x: 50, y: 30, type: 'thangka', monastery: monasteryId },
      { id: 4, name: 'Sacred Stupa', x: 45, y: 75, type: 'stupa', monastery: monasteryId }
    ];

    // Add monastery-specific elements
    if (monasteryId === 'rumtek') {
      baseElements.push(
        { id: 5, name: 'Golden Buddha', x: 50, y: 40, type: 'buddha', monastery: monasteryId },
        { id: 6, name: 'Meditation Cushions', x: 35, y: 55, type: 'meditation', monastery: monasteryId }
      );
    } else if (monasteryId === 'pemayangtse') {
      baseElements.push(
        { id: 5, name: 'Ancient Manuscripts', x: 60, y: 35, type: 'manuscripts', monastery: monasteryId },
        { id: 6, name: 'Wooden Carvings', x: 40, y: 65, type: 'carvings', monastery: monasteryId }
      );
    } else if (monasteryId === 'enchey') {
      baseElements.push(
        { id: 5, name: 'Tantric Symbols', x: 55, y: 50, type: 'tantric', monastery: monasteryId },
        { id: 6, name: 'Guardian Statues', x: 30, y: 40, type: 'guardians', monastery: monasteryId }
      );
    }

    return baseElements;
  };

  // Simulate tour progress
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentProgress(prev => {
          const newProgress = prev + 0.8;
          return newProgress > 100 ? 0 : newProgress;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Update compass
  useEffect(() => {
    const interval = setInterval(() => {
      setCompassHeading(prev => (prev + Math.random() * 8 - 4 + 360) % 360);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleInteractionClick = (element) => {
    setSelectedInteraction(element);
    setInteractionCount(prev => prev + 1);
    
    // Add blessing to collection
    const culturalElement = culturalElements[element.type];
    if (culturalElement && !collectedBlessings.includes(culturalElement.blessing)) {
      setCollectedBlessings(prev => [...prev, culturalElement.blessing]);
    }
    
    // Simulate audio feedback
    console.log(`Playing sound: ${culturalElement?.sound}`);
  };

  const handleSceneChange = (sceneId) => {
    setSelectedScene(sceneId);
    const progressPercent = (sceneId - 1) * 20;
    setCurrentProgress(progressPercent);
  };

  const toggleMeditationMode = () => {
    setMeditationMode(!meditationMode);
    if (!meditationMode) {
      setArMode(false);
      setVrMode(false);
      setShowInfo(false);
    }
  };

  return (
    <div className="h-full bg-black relative overflow-hidden">
      {/* Meditation Mode Overlay */}
      {meditationMode && (
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/50 via-purple-900/30 to-black/60 z-50">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="w-20 h-20 border-2 border-amber-400 rounded-full mx-auto mb-4 animate-pulse"></div>
              <h3 className="text-xl mb-2">Meditation in Progress</h3>
              <p className="text-amber-200 text-sm mb-4">Breathe deeply and find your inner peace</p>
              <Button 
                onClick={toggleMeditationMode}
                className="bg-amber-600/80 hover:bg-amber-700/80 text-white"
              >
                Exit Meditation
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced 3D Environment */}
      <div className="absolute inset-0" ref={viewerRef}>
        <div className="w-full h-full relative">
          {/* Main Scene Background */}
          <div className="absolute inset-0">
            <img
              src={currentMonastery.image}
              alt={currentMonastery.name}
              className={`w-full h-full object-cover transition-all duration-1000 ${
                vrMode ? 'scale-110 blur-sm' : arMode ? 'opacity-60' : 'opacity-90'
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>

          {/* VR Mode Effect */}
          {vrMode && (
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-blue-900/20 to-black/40">
              <div className="absolute inset-0" style={{
                background: `
                  radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                  radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                  radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px, 80px 80px, 30px 30px'
              }}></div>
            </div>
          )}

          {/* Interactive Elements */}
          {getInteractiveElements(selectedMonastery).map((element) => (
            <div
              key={element.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group transition-all duration-300 ${
                selectedInteraction?.id === element.id ? 'scale-125 z-30' : 'hover:scale-110 z-20'
              }`}
              style={{
                left: `${element.x}%`,
                top: `${element.y}%`
              }}
              onClick={() => handleInteractionClick(element)}
            >
              <div className={`w-6 h-6 rounded-full border-3 border-white shadow-lg flex items-center justify-center animate-pulse ${
                element.type === 'prayerWheels' ? 'bg-blue-500' :
                element.type === 'butterLamps' ? 'bg-orange-500' :
                element.type === 'thangka' ? 'bg-purple-500' :
                element.type === 'stupa' ? 'bg-yellow-500' :
                element.type === 'buddha' ? 'bg-gold-500' :
                'bg-green-500'
              }`}>
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              
              {/* Enhanced tooltip */}
              <div className={`absolute -top-16 left-1/2 transform -translate-x-1/2 transition-all duration-200 ${
                selectedInteraction?.id === element.id ? 'opacity-100 scale-100' : 'opacity-0 group-hover:opacity-100 scale-95'
              }`}>
                <div className="bg-black/95 text-white rounded-xl px-4 py-3 text-xs whitespace-nowrap border border-amber-400/30">
                  <div className="font-medium text-amber-300">{element.name}</div>
                  <div className="text-xs opacity-75 mt-1">
                    {culturalElements[element.type]?.interaction || 'Click to explore'}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* AR Mode Overlay */}
          {arMode && (
            <div className="absolute inset-0 border-4 border-amber-400/50 rounded-lg">
              <div className="absolute top-4 left-4 bg-amber-400/90 text-black px-4 py-2 rounded-xl font-medium flex items-center gap-2">
                <Zap className="w-4 h-4" />
                AR Enhanced View
              </div>
              
              {/* AR Grid */}
              <div className="absolute inset-0 opacity-20">
                <div className="w-full h-full" style={{
                  backgroundImage: `
                    linear-gradient(to right, rgba(251, 191, 36, 0.4) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(251, 191, 36, 0.4) 1px, transparent 1px)
                  `,
                  backgroundSize: '40px 40px'
                }}></div>
              </div>

              {/* AR Info Panels */}
              <div className="absolute top-20 left-4 bg-black/80 rounded-xl p-3 max-w-xs">
                <h4 className="text-amber-400 font-medium mb-1">AR Information</h4>
                <p className="text-white text-xs">
                  Point your device to explore interactive elements in augmented reality
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Top Controls - Enhanced */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-40">
        <div className="bg-black/90 backdrop-blur-sm rounded-xl p-4 max-w-sm">
          <h2 className="text-white font-medium mb-2">{currentMonastery.name}</h2>
          <div className="flex items-center gap-2 mb-2">
            <Badge className="bg-amber-600 text-white text-xs">
              Scene {selectedScene}/{currentMonastery.scenes.length}
            </Badge>
            <Badge className="bg-blue-600 text-white text-xs">
              {currentScene?.name}
            </Badge>
          </div>
          <p className="text-amber-200 text-xs">{currentScene?.description}</p>
          
          {/* Virtual Guide */}
          <div className="flex items-center gap-2 mt-3 pt-2 border-t border-white/10">
            <span className="text-lg">{selectedGuide.avatar}</span>
            <div>
              <p className="text-white text-xs font-medium">{selectedGuide.name}</p>
              <p className="text-amber-200 text-xs">{selectedGuide.role}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          {/* Stats */}
          <div className="bg-black/80 backdrop-blur-sm rounded-xl p-3 text-center">
            <div className="text-amber-400 text-lg font-bold">{interactionCount}</div>
            <div className="text-white text-xs">Interactions</div>
          </div>

          <div className="flex flex-col gap-2">
            <Button
              size="icon"
              variant="secondary"
              onClick={() => setShowInfo(!showInfo)}
              className="bg-black/80 backdrop-blur-sm hover:bg-black/90 border-white/20 text-white rounded-xl"
            >
              <Info className="w-4 h-4" />
            </Button>
            
            <Button
              size="icon"
              variant="secondary"
              onClick={toggleMeditationMode}
              className="bg-black/80 backdrop-blur-sm hover:bg-black/90 border-white/20 text-white rounded-xl"
            >
              <Heart className={`w-4 h-4 ${meditationMode ? 'text-pink-400' : ''}`} />
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced Side Panel */}
      <div className="absolute top-24 right-4 z-30">
        <Tabs value={activeTab} onValueChange={setActiveTab} orientation="vertical">
          <TabsList className="bg-black/80 backdrop-blur-sm border-white/20 rounded-xl flex-col h-auto">
            <TabsTrigger value="explore" className="text-white data-[state=active]:bg-amber-600 rounded-lg">
              <Eye className="w-4 h-4" />
            </TabsTrigger>
            <TabsTrigger value="monasteries" className="text-white data-[state=active]:bg-amber-600 rounded-lg">
              <Layers className="w-4 h-4" />
            </TabsTrigger>
            <TabsTrigger value="culture" className="text-white data-[state=active]:bg-amber-600 rounded-lg">
              <BookOpen className="w-4 h-4" />
            </TabsTrigger>
            <TabsTrigger value="guides" className="text-white data-[state=active]:bg-amber-600 rounded-lg">
              <Users className="w-4 h-4" />
            </TabsTrigger>
          </TabsList>

          <div className="ml-3">
            <TabsContent value="explore" className="mt-0">
              <Card className="bg-black/80 backdrop-blur-sm border-white/20 rounded-xl w-64">
                <CardContent className="p-4">
                  <h3 className="text-amber-400 font-medium mb-3">Scenes</h3>
                  <div className="space-y-2">
                    {currentMonastery.scenes.map((scene) => (
                      <button
                        key={scene.id}
                        onClick={() => handleSceneChange(scene.id)}
                        className={`w-full text-left p-3 rounded-lg text-xs transition-all ${
                          scene.id === selectedScene
                            ? 'bg-amber-600 text-white'
                            : 'bg-white/10 text-white hover:bg-white/20'
                        }`}
                      >
                        <div className="font-medium">{scene.name}</div>
                        <div className="opacity-75 mt-1">{scene.description}</div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="monasteries" className="mt-0">
              <Card className="bg-black/80 backdrop-blur-sm border-white/20 rounded-xl w-64">
                <CardContent className="p-4">
                  <h3 className="text-amber-400 font-medium mb-3">Sikkim Monasteries</h3>
                  <div className="space-y-3">
                    {Object.entries(sikkimMonasteries).map(([key, monastery]) => (
                      <button
                        key={key}
                        onClick={() => setSelectedMonastery(key)}
                        className={`w-full text-left p-3 rounded-lg transition-all ${
                          key === selectedMonastery
                            ? 'bg-amber-600 text-white'
                            : 'bg-white/10 text-white hover:bg-white/20'
                        }`}
                      >
                        <div className="font-medium text-sm">{monastery.name}</div>
                        <div className="text-xs opacity-75 mt-1">{monastery.location}</div>
                        <div className="text-xs text-amber-300 mt-1">{monastery.significance}</div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="culture" className="mt-0">
              <Card className="bg-black/80 backdrop-blur-sm border-white/20 rounded-xl w-64">
                <CardContent className="p-4">
                  <h3 className="text-amber-400 font-medium mb-3">Cultural Elements</h3>
                  <div className="space-y-3">
                    {Object.entries(culturalElements).map(([key, element]) => (
                      <div key={key} className="bg-white/5 rounded-lg p-3">
                        <div className="font-medium text-white text-sm">{element.name}</div>
                        <div className="text-xs text-amber-200 mt-1">{element.description}</div>
                        <div className="text-xs text-white/60 mt-2 italic">"{element.blessing}"</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="guides" className="mt-0">
              <Card className="bg-black/80 backdrop-blur-sm border-white/20 rounded-xl w-64">
                <CardContent className="p-4">
                  <h3 className="text-amber-400 font-medium mb-3">Virtual Guides</h3>
                  <div className="space-y-3">
                    {virtualGuides.map((guide) => (
                      <button
                        key={guide.id}
                        onClick={() => setSelectedGuide(guide)}
                        className={`w-full text-left p-3 rounded-lg transition-all ${
                          guide.id === selectedGuide.id
                            ? 'bg-amber-600 text-white'
                            : 'bg-white/10 text-white hover:bg-white/20'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-lg">{guide.avatar}</span>
                          <div>
                            <div className="font-medium text-sm">{guide.name}</div>
                            <div className="text-xs opacity-75">{guide.role}</div>
                          </div>
                        </div>
                        <div className="text-xs text-amber-200">"{guide.greeting}"</div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Enhanced Information Panel */}
      {showInfo && selectedInteraction && (
        <div className="absolute bottom-32 left-4 right-4 z-30">
          <Card className="bg-black/95 backdrop-blur-sm border-amber-400/30 rounded-xl">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-amber-400 font-medium text-lg">{selectedInteraction.name}</h3>
                  <Badge className="bg-amber-600/20 text-amber-300 text-xs mt-1">
                    Interactive Element
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="text-white text-sm">{currentMonastery.name}</div>
                  <div className="text-amber-200 text-xs">{currentScene?.name}</div>
                </div>
              </div>
              
              <div className="space-y-3">
                <p className="text-white text-sm leading-relaxed">
                  {culturalElements[selectedInteraction.type]?.description}
                </p>
                
                <div className="bg-amber-600/10 rounded-lg p-3">
                  <p className="text-amber-200 text-sm italic">
                    "{culturalElements[selectedInteraction.type]?.blessing}"
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white">
                    <HeadphonesIcon className="w-4 h-4 mr-1" />
                    Listen to Chant
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-white/20 text-white hover:bg-white/10"
                    onClick={() => setSelectedInteraction(null)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Enhanced Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/90 to-transparent p-4 z-30">
        {/* Progress and Time */}
        <div className="mb-4">
          <div className="flex justify-between text-white text-xs mb-2">
            <span>{Math.floor(currentProgress * 18 / 100)}:{String(Math.floor((currentProgress * 18 / 100 % 1) * 60)).padStart(2, '0')}</span>
            <span>18:00</span>
          </div>
          <Progress value={currentProgress} className="h-2 bg-white/20" />
        </div>

        {/* Enhanced Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              size="icon"
              onClick={() => setIsPlaying(!isPlaying)}
              className="bg-amber-600 hover:bg-amber-700 text-white rounded-xl"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
            
            <Button
              size="icon"
              variant="secondary"
              onClick={() => setCurrentProgress(0)}
              className="bg-white/20 hover:bg-white/30 text-white rounded-xl border-white/20"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>

            <Button
              size="icon"
              variant="secondary"
              onClick={() => setArMode(!arMode)}
              className="bg-white/20 hover:bg-white/30 text-white rounded-xl border-white/20"
            >
              <Camera className={`w-4 h-4 ${arMode ? 'text-amber-400' : ''}`} />
            </Button>

            <Button
              size="icon"
              variant="secondary"
              onClick={() => setVrMode(!vrMode)}
              className="bg-white/20 hover:bg-white/30 text-white rounded-xl border-white/20"
            >
              <Eye className={`w-4 h-4 ${vrMode ? 'text-blue-400' : ''}`} />
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <Button
              size="icon"
              onClick={() => setIsMuted(!isMuted)}
              variant="secondary"
              className="bg-white/20 hover:bg-white/30 text-white rounded-xl border-white/20"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </Button>
            
            <div className="w-20">
              <Slider
                defaultValue={[70]}
                max={100}
                step={1}
                className="text-white"
              />
            </div>

            <Button
              size="icon"
              variant="secondary"
              className="bg-white/20 hover:bg-white/30 text-white rounded-xl border-white/20"
            >
              <Maximize className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Blessings Counter */}
        {collectedBlessings.length > 0 && (
          <div className="mt-3 pt-3 border-t border-white/10">
            <div className="flex items-center justify-between">
              <span className="text-amber-400 text-sm">Collected Blessings: {collectedBlessings.length}</span>
              <Badge className="bg-amber-600/20 text-amber-300 text-xs">
                <Star className="w-3 h-3 mr-1" />
                Spiritual Journey
              </Badge>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}