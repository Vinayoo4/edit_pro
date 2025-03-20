import { useState } from 'react';
import { 
  Layers, Video, Music, Mic, Settings, Upload, Play, Download,
  Wand2, Type, Captions as Transition, ImagePlus, Sparkles, Palette,
  SplitSquareVertical, Move3D, Sun, Moon
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { useTheme } from '@/components/theme-provider';
import './App.css';

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [timeline, setTimeline] = useState<number[]>([0]);
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      toast({
        title: "Video uploaded",
        description: `${file.name} has been added to your project`,
      });
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-container">
          <div className="brand">
            <div className="brand-logo">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h1v2c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-1h2v1c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-2h1c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7z" />
                <defs>
                  <linearGradient id="skull-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#DAA520' }} />
                    <stop offset="100%" style={{ stopColor: '#000000' }} />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h1 className="brand-name">ProEdit Studio</h1>
          </div>
          
          <div className="header-actions">
            <Button variant="outline" onClick={() => toast({ title: "Project saved" })}>
              Save Project
            </Button>
            <Button>
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="preview-section">
          <Card className="preview-card">
            {selectedFile ? (
              <video 
                className="preview-video"
                controls
                src={URL.createObjectURL(selectedFile)}
              />
            ) : (
              <div className="upload-zone">
                <Input
                  type="file"
                  accept="video/*"
                  className="hidden"
                  id="video-upload"
                  onChange={handleFileUpload}
                />
                <Label htmlFor="video-upload">
                  <div className="cursor-pointer">
                    <Upload className="upload-icon" />
                    <p className="text-muted-foreground">Drop video files here or click to upload</p>
                  </div>
                </Label>
              </div>
            )}
          </Card>

          <Card className="timeline-container">
            <CardContent>
              <div className="timeline-controls">
                <Button size="icon" variant="outline">
                  <Play className="h-4 w-4" />
                </Button>
                <Slider
                  value={timeline}
                  onValueChange={setTimeline}
                  max={100}
                  step={1}
                  className="flex-1"
                />
              </div>
              <ScrollArea className="timeline-track">
                <div className="flex gap-2">
                  {selectedFile && (
                    <div className="timeline-clip">
                      <Video className="h-8 w-8 text-muted-foreground" />
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        <div className="tools-section">
          <Tabs defaultValue="edit">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="edit">Edit</TabsTrigger>
              <TabsTrigger value="audio">Audio</TabsTrigger>
              <TabsTrigger value="effects">Effects</TabsTrigger>
            </TabsList>
            
            <TabsContent value="edit">
              <Card>
                <CardContent className="tool-card">
                  <div className="tool-grid">
                    <Button variant="outline" className="tool-button">
                      <Layers className="mr-2 h-4 w-4" /> Add Layer
                    </Button>
                    <Button variant="outline" className="tool-button">
                      <Settings className="mr-2 h-4 w-4" /> Adjust
                    </Button>
                    <Button variant="outline" className="tool-button">
                      <SplitSquareVertical className="mr-2 h-4 w-4" /> Split
                    </Button>
                    <Button variant="outline" className="tool-button">
                      <Move3D className="mr-2 h-4 w-4" /> Transform
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="audio">
              <Card>
                <CardContent className="tool-card">
                  <div className="tool-grid">
                    <Button variant="outline" className="tool-button">
                      <Music className="mr-2 h-4 w-4" /> Add Music
                    </Button>
                    <Button variant="outline" className="tool-button">
                      <Mic className="mr-2 h-4 w-4" /> Record Voice
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="effects">
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Transition className="h-4 w-4" /> Transitions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="effects-grid">
                    <Button variant="outline" size="sm">Fade</Button>
                    <Button variant="outline" size="sm">Dissolve</Button>
                    <Button variant="outline" size="sm">Slide</Button>
                    <Button variant="outline" size="sm">Wipe</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Wand2 className="h-4 w-4" /> Visual Effects
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="effects-grid">
                      <Button variant="outline" size="sm">Blur</Button>
                      <Button variant="outline" size="sm">Glow</Button>
                      <Button variant="outline" size="sm">Sharpen</Button>
                      <Button variant="outline" size="sm">Vignette</Button>
                    </div>
                    <Separator />
                    <div className="slider-group">
                      <Label>Effect Intensity</Label>
                      <Slider defaultValue={[50]} max={100} step={1} />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Palette className="h-4 w-4" /> Color Correction
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="slider-group">
                      <Label>Brightness</Label>
                      <Slider defaultValue={[50]} max={100} step={1} />
                    </div>
                    <div className="slider-group">
                      <Label>Contrast</Label>
                      <Slider defaultValue={[50]} max={100} step={1} />
                    </div>
                    <div className="slider-group">
                      <Label>Saturation</Label>
                      <Slider defaultValue={[50]} max={100} step={1} />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Type className="h-4 w-4" /> Text & Overlays
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="tool-button">
                      <Type className="mr-2 h-4 w-4" /> Add Text
                    </Button>
                    <Button variant="outline" className="tool-button">
                      <ImagePlus className="mr-2 h-4 w-4" /> Add Overlay
                    </Button>
                    <Button variant="outline" className="tool-button">
                      <Sparkles className="mr-2 h-4 w-4" /> Add Animation
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Button
        variant="outline"
        size="icon"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="theme-toggle"
      >
        <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  );
}

export default App;