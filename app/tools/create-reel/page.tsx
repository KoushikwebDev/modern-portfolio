"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  Image as ImageIcon,
  Video,
  Music,
  Clock,
  Play,
  Pause,
  Download,
  Edit3,
  Sparkles,
  Check,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Volume2,
  VolumeX,
  Instagram,
  Facebook,
  Share2,
  Trash2,
  Loader2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

// Aspect ratios for different platforms
const ASPECT_RATIOS = {
  instagram: { width: 1080, height: 1920, label: "Instagram Reels", ratio: "9:16" },
  facebook: { width: 1080, height: 1920, label: "Facebook Reels", ratio: "9:16" },
  whatsapp: { width: 1080, height: 1920, label: "WhatsApp Status", ratio: "9:16" },
  square: { width: 1080, height: 1080, label: "Square", ratio: "1:1" },
  landscape: { width: 1920, height: 1080, label: "Landscape", ratio: "16:9" },
};

// Sample songs data - using actual files from public/sample-songs (duration is auto-detected)
const SAMPLE_SONGS = [
  { id: 1, name: "Rolex BGM", artist: "Vikram", genre: "BGM", file: "/sample-songs/rolex_bgm.mp3" },
  { id: 2, name: "Rehman Dakait Entry", artist: "Film Score", genre: "BGM", file: "/sample-songs/rehman_dakait_entry.mp3" },
  { id: 3, name: "Sanam Teri Kasam", artist: "Romantic", genre: "Romantic", file: "/sample-songs/sanam_teri_kasam.mp3" },
  { id: 4, name: "Yung DSA Instrumental", artist: "Hip Hop", genre: "Hip Hop", file: "/sample-songs/yung_dsa_instrumental.mp3" },
  { id: 5, name: "Animal BGM", artist: "Animal", genre: "Animal", file: "/sample-songs/animal_bgm.mp3" },
];

const REEL_DURATIONS = [
  { value: 15, label: "15 seconds" },
  { value: 30, label: "30 seconds" },
  { value: 60, label: "60 seconds" },
  { value: 90, label: "90 seconds" },
];

type MediaType = "image" | "video" | null;
type Step = "upload" | "configure" | "preview";

interface MediaFile {
  file: File;
  url: string;
  type: MediaType;
}

export default function CreateReelPage() {
  const [currentStep, setCurrentStep] = useState<Step>("upload");
  const [mediaFile, setMediaFile] = useState<MediaFile | null>(null);
  const [selectedSong, setSelectedSong] = useState<typeof SAMPLE_SONGS[0] | null>(null);
  const [duration, setDuration] = useState(30);
  const [platform, setPlatform] = useState<keyof typeof ASPECT_RATIOS>("instagram");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isReelReady, setIsReelReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  
  // Audio states
  const [customAudio, setCustomAudio] = useState<{ file: File; url: string; name: string } | null>(null);
  const [audioDuration, setAudioDuration] = useState(0);
  const [audioStartTime, setAudioStartTime] = useState(0);
  const [audioTab, setAudioTab] = useState<"samples" | "upload">("samples");
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  const audioPreviewTimeout = useRef<NodeJS.Timeout | null>(null);

  // Handle file upload
  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const isVideo = file.type.startsWith("video/");
    const isImage = file.type.startsWith("image/");

    if (!isVideo && !isImage) {
      alert("Please upload a valid image or video file");
      return;
    }

    const url = URL.createObjectURL(file);
    setMediaFile({
      file,
      url,
      type: isVideo ? "video" : "image",
    });
    setCurrentStep("configure");
    setIsReelReady(false);
    setIsPlaying(false);
    setProgress(0);
  }, []);

  // Handle drag and drop
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    const isVideo = file.type.startsWith("video/");
    const isImage = file.type.startsWith("image/");

    if (!isVideo && !isImage) {
      alert("Please upload a valid image or video file");
      return;
    }

    const url = URL.createObjectURL(file);
    setMediaFile({
      file,
      url,
      type: isVideo ? "video" : "image",
    });
    setCurrentStep("configure");
    setIsReelReady(false);
    setIsPlaying(false);
    setProgress(0);
  }, []);

  // Handle audio file upload
  const handleAudioUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("audio/")) {
      alert("Please upload a valid audio file");
      return;
    }

    // Clear any existing preview timeout
    if (audioPreviewTimeout.current) {
      clearTimeout(audioPreviewTimeout.current);
      audioPreviewTimeout.current = null;
    }
    // Stop current playback when uploading new audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsAudioPlaying(false);

    const url = URL.createObjectURL(file);
    
    // Get audio duration
    const audio = new Audio(url);
    audio.addEventListener("loadedmetadata", () => {
      const songDuration = Math.floor(audio.duration);
      setAudioDuration(songDuration);
      setAudioStartTime(0);
      // Auto-adjust reel duration if song is shorter
      if (songDuration < duration) {
        setDuration(songDuration);
      }
    });

    setCustomAudio({
      file,
      url,
      name: file.name.replace(/\.[^/.]+$/, ""),
    });
    setSelectedSong(null);
    setAudioTab("upload");
  }, [duration]);

  // Preview audio portion
  const handlePreviewAudio = useCallback(() => {
    if (!audioRef.current) return;
    
    // Clear any existing timeout
    if (audioPreviewTimeout.current) {
      clearTimeout(audioPreviewTimeout.current);
      audioPreviewTimeout.current = null;
    }
    
    if (isAudioPlaying) {
      audioRef.current.pause();
      setIsAudioPlaying(false);
    } else {
      // Reload the audio to ensure we have the latest source
      audioRef.current.load();
      audioRef.current.currentTime = audioStartTime;
      audioRef.current.play().catch(console.error);
      setIsAudioPlaying(true);
      
      // Stop after duration
      audioPreviewTimeout.current = setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.pause();
          setIsAudioPlaying(false);
        }
        audioPreviewTimeout.current = null;
      }, duration * 1000);
    }
  }, [isAudioPlaying, audioStartTime, duration]);

  // Format time display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Apply reel creation
  const handleApply = useCallback(async () => {
    if (!mediaFile || (!selectedSong && !customAudio)) return;

    // Stop any audio playing in configure and reset state
    if (audioPreviewTimeout.current) {
      clearTimeout(audioPreviewTimeout.current);
      audioPreviewTimeout.current = null;
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsAudioPlaying(false);

    setIsProcessing(true);

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsProcessing(false);
    setIsReelReady(true);
    setCurrentStep("preview");
  }, [mediaFile, selectedSong, customAudio]);

  // Play/Pause toggle
  const togglePlay = useCallback(() => {
    if (!isReelReady) return;

    if (isPlaying) {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
      if (videoRef.current) {
        videoRef.current.pause();
      }
      // Pause audio
      if (audioRef.current) {
        audioRef.current.pause();
      }
    } else {
      if (mediaFile?.type === "video" && videoRef.current) {
        videoRef.current.play();
      }
      // Play audio from selected portion (works for both sample and custom audio)
      if (audioRef.current) {
        audioRef.current.currentTime = audioStartTime;
        audioRef.current.play();
      }
      setProgress(0);
      progressInterval.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval.current!);
            setIsPlaying(false);
            if (audioRef.current) {
              audioRef.current.pause();
            }
            return 0;
          }
          return prev + 100 / (duration * 10);
        });
      }, 100);
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying, isReelReady, duration, mediaFile?.type, audioStartTime]);

  // Stop playback when unmounting
  useEffect(() => {
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, []);

  // Sync audio muted state
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Download reel - Creates video with audio using MediaRecorder
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);

  const handleDownload = useCallback(async () => {
    if (!mediaFile) return;

    setIsExporting(true);
    setExportProgress(0);

    try {
      const aspectRatio = ASPECT_RATIOS[platform];
      const canvas = document.createElement("canvas");
      canvas.width = aspectRatio.width;
      canvas.height = aspectRatio.height;
      const ctx = canvas.getContext("2d")!;

      // Create audio context for mixing
      const audioContext = new AudioContext();
      let audioSource: AudioBufferSourceNode | null = null;
      let audioBuffer: AudioBuffer | null = null;

      // Load audio if available (custom audio or sample song)
      const audioUrl = customAudio?.url || selectedSong?.file;
      if (audioUrl) {
        try {
          const response = await fetch(audioUrl);
          const arrayBuffer = await response.arrayBuffer();
          audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        } catch (e) {
          console.log("Audio loading failed, continuing without audio");
        }
      }

      // Setup media streams
      const canvasStream = canvas.captureStream(30);
      
      // Create destination for audio
      const dest = audioContext.createMediaStreamDestination();
      
      // Combine streams
      const combinedStream = new MediaStream([
        ...canvasStream.getVideoTracks(),
        ...dest.stream.getAudioTracks(),
      ]);

      // Setup MediaRecorder
      const chunks: Blob[] = [];
      const mediaRecorder = new MediaRecorder(combinedStream, {
        mimeType: "video/webm;codecs=vp9",
        videoBitsPerSecond: 5000000,
      });

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      const recordingPromise = new Promise<Blob>((resolve) => {
        mediaRecorder.onstop = () => {
          const blob = new Blob(chunks, { type: "video/webm" });
          resolve(blob);
        };
      });

      mediaRecorder.start();

      // Start audio playback at selected portion
      if (audioBuffer) {
        audioSource = audioContext.createBufferSource();
        audioSource.buffer = audioBuffer;
        audioSource.connect(dest);
        audioSource.start(0, audioStartTime, duration);
      }

      // Render frames
      const startTime = performance.now();
      const totalFrames = duration * 30;
      let frameCount = 0;

      const renderFrame = () => {
        const elapsed = (performance.now() - startTime) / 1000;
        const progress = Math.min(elapsed / duration, 1);
        setExportProgress(Math.floor(progress * 100));

        // Apply filters
        ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;

        if (mediaFile.type === "image") {
          const img = new Image();
          img.src = mediaFile.url;
          // Draw image to fill canvas while maintaining aspect ratio
          const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
          const x = (canvas.width - img.width * scale) / 2;
          const y = (canvas.height - img.height * scale) / 2;
          ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
        } else if (mediaFile.type === "video" && videoRef.current) {
          const video = videoRef.current;
          const scale = Math.max(canvas.width / video.videoWidth, canvas.height / video.videoHeight);
          const x = (canvas.width - video.videoWidth * scale) / 2;
          const y = (canvas.height - video.videoHeight * scale) / 2;
          ctx.drawImage(video, x, y, video.videoWidth * scale, video.videoHeight * scale);
        }

        frameCount++;

        if (elapsed < duration) {
          requestAnimationFrame(renderFrame);
        } else {
          mediaRecorder.stop();
          if (audioSource) {
            audioSource.stop();
          }
          audioContext.close();
        }
      };

      // Load image before starting recording
      if (mediaFile.type === "image") {
        const img = new Image();
        img.src = mediaFile.url;
        await new Promise((resolve) => {
          img.onload = resolve;
        });
      }

      renderFrame();

      // Wait for recording to complete
      const videoBlob = await recordingPromise;

      // Download the video
      const url = URL.createObjectURL(videoBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `reel-${platform}-${Date.now()}.webm`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setExportProgress(100);
      setTimeout(() => {
        setIsExporting(false);
        setExportProgress(0);
      }, 1000);
    } catch (error) {
      console.error("Export failed:", error);
      // Fallback to simple download
      const link = document.createElement("a");
      link.href = mediaFile.url;
      link.download = `reel-${platform}-${Date.now()}.${mediaFile.type === "video" ? "mp4" : "jpg"}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setIsExporting(false);
    }
  }, [mediaFile, platform, customAudio, selectedSong, audioStartTime, duration, brightness, contrast, saturation]);

  // Reset everything
  const handleReset = useCallback(() => {
    setMediaFile(null);
    setSelectedSong(null);
    setCustomAudio(null);
    setAudioDuration(0);
    setAudioStartTime(0);
    setAudioTab("samples");
    setIsAudioPlaying(false);
    setCurrentStep("upload");
    setIsReelReady(false);
    setIsPlaying(false);
    setProgress(0);
    setBrightness(100);
    setContrast(100);
    setSaturation(100);
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }
  }, []);

  // Get aspect ratio styles
  const getPreviewStyles = () => {
    const aspectRatio = ASPECT_RATIOS[platform];
    const isPortrait = aspectRatio.height > aspectRatio.width;
    return {
      aspectRatio: `${aspectRatio.width} / ${aspectRatio.height}`,
      maxHeight: isPortrait ? "500px" : "300px",
      width: "auto",
    };
  };

  // Filter styles for preview
  const filterStyle = {
    filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`,
  };

  return (
    <div className="relative min-h-screen py-24 sm:py-32 px-4">
      {/* Background gradient effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-pink-600/10 to-orange-600/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20 mb-4 sm:mb-6">
            <Sparkles className="w-4 h-4 text-violet-500" />
            <span className="text-sm font-medium bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
              Professional Reel Creator
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-violet-600 bg-clip-text text-transparent">
              Create Stunning Reels
            </span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Transform your images and videos into engaging reels for Instagram, Facebook & WhatsApp
          </p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center mb-8 sm:mb-12 px-2"
        >
          <div className="flex items-center gap-2 sm:gap-4 p-1.5 sm:p-2 rounded-xl sm:rounded-2xl bg-gradient-to-r from-violet-500/5 to-fuchsia-500/5 border border-violet-500/10">
            {[
              { step: "upload", label: "Upload", icon: Upload },
              { step: "configure", label: "Configure", icon: Music },
              { step: "preview", label: "Preview", icon: Play },
            ].map((item, index) => (
              <React.Fragment key={item.step}>
                <button
                  onClick={() => {
                    if (item.step === "upload") setCurrentStep("upload");
                    else if (item.step === "configure" && mediaFile) setCurrentStep("configure");
                    else if (item.step === "preview" && isReelReady) setCurrentStep("preview");
                  }}
                  className={cn(
                    "flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl transition-all duration-300",
                    currentStep === item.step
                      ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/25"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="font-medium text-xs sm:text-sm hidden xs:inline">{item.label}</span>
                  {(item.step === "upload" && mediaFile) ||
                  (item.step === "configure" && selectedSong) ||
                  (item.step === "preview" && isReelReady) ? (
                    <Check className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-emerald-400" />
                  ) : null}
                </button>
                {index < 2 && (
                  <ChevronRight className="w-3 sm:w-4 h-3 sm:h-4 text-muted-foreground/50" />
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.div>

        {/* Main Content */}
        <AnimatePresence mode="wait">
          {/* Step 1: Upload */}
          {currentStep === "upload" && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
            >
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className="relative cursor-pointer group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-3xl opacity-20 blur group-hover:opacity-40 transition-opacity duration-500" />
                <div className="relative p-12 md:p-20 rounded-3xl border-2 border-dashed border-violet-500/30 bg-gradient-to-br from-violet-500/5 via-transparent to-fuchsia-500/5 backdrop-blur-sm hover:border-violet-500/50 transition-all duration-300">
                  <div className="text-center">
                    <div className="relative inline-flex mb-6">
                      <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full blur-xl opacity-50 animate-pulse" />
                      <div className="relative p-6 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600">
                        <Upload className="w-10 h-10 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-3">
                      Upload Your Media
                    </h3>
                    <p className="text-muted-foreground mb-6 max-w-md mx-auto text-sm sm:text-base">
                      Drag and drop your image or video here, or click to browse
                    </p>
                    <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                      <div className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-violet-500/10 border border-violet-500/20">
                        <ImageIcon className="w-4 h-4 text-violet-500" />
                        <span className="text-sm text-violet-600 dark:text-violet-300">Images</span>
                      </div>
                      <div className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/20">
                        <Video className="w-4 h-4 text-fuchsia-500" />
                        <span className="text-sm text-fuchsia-600 dark:text-fuchsia-300">Videos</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-4">
                      Supports: JPG, PNG, GIF, MP4, MOV, WEBM • Max 100MB
                    </p>
                  </div>
                </div>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </motion.div>
          )}

          {/* Step 2: Configure */}
          {currentStep === "configure" && mediaFile && (
            <motion.div
              key="configure"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8"
            >
              {/* Preview Panel */}
              <div className="relative">
                <div className="sticky top-24">
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-500/5 to-fuchsia-500/5 border border-violet-500/20 p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-foreground">Preview</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleReset}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                    <div className="flex justify-center">
                      <div
                        className="relative overflow-hidden rounded-xl bg-black/50"
                        style={getPreviewStyles()}
                      >
                        {mediaFile.type === "video" ? (
                          <video
                            src={mediaFile.url}
                            className="w-full h-full object-cover"
                            style={filterStyle}
                            muted
                          />
                        ) : (
                          <img
                            src={mediaFile.url}
                            alt="Preview"
                            className="w-full h-full object-cover"
                            style={filterStyle}
                          />
                        )}
                        {/* Platform Badge */}
                        <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/10">
                          <span className="text-xs font-medium text-white">
                            {ASPECT_RATIOS[platform].ratio}
                          </span>
                        </div>
                        {/* Duration Badge */}
                        <div className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/10">
                          <span className="text-xs font-medium text-white">
                            {duration}s
                          </span>
                        </div>
                        
                        {/* Play/Pause Button Overlay */}
                        {(selectedSong || customAudio) && (
                          <button
                            onClick={handlePreviewAudio}
                            className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors"
                          >
                            <div className={cn(
                              "w-14 h-14 rounded-full flex items-center justify-center transition-all",
                              isAudioPlaying 
                                ? "bg-violet-600 shadow-lg shadow-violet-500/50" 
                                : "bg-white/20 backdrop-blur-sm hover:bg-white/30"
                            )}>
                              {isAudioPlaying ? (
                                <Pause className="w-7 h-7 text-white" />
                              ) : (
                                <Play className="w-7 h-7 text-white ml-1" />
                              )}
                            </div>
                          </button>
                        )}
                        
                        {/* Audio Waveform Animation */}
                        {(selectedSong || customAudio) && (
                          <div className="absolute bottom-3 left-3 right-3 flex items-center gap-1 px-3 py-2 rounded-lg bg-black/60 backdrop-blur-sm border border-white/10">
                            <Music className="w-3 h-3 text-violet-400 shrink-0" />
                            <span className="text-xs text-white truncate">
                              {selectedSong?.name || customAudio?.name}
                            </span>
                            {isAudioPlaying && (
                              <div className="flex items-end gap-0.5 ml-auto">
                                {[...Array(5)].map((_, i) => (
                                  <motion.div
                                    key={i}
                                    className="w-0.5 bg-violet-400 rounded-full"
                                    animate={{
                                      height: [4, 8 + Math.random() * 8, 4],
                                    }}
                                    transition={{
                                      duration: 0.5,
                                      repeat: Infinity,
                                      delay: i * 0.1,
                                    }}
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Hidden Audio Element for Configure Preview */}
                    {(customAudio || selectedSong) && (
                      <audio 
                        ref={audioRef} 
                        src={customAudio?.url || selectedSong?.file} 
                        className="hidden" 
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Configuration Panel */}
              <div className="space-y-6">
                {/* Platform Selection */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-violet-500/5 to-fuchsia-500/5 border border-violet-500/20">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Share2 className="w-5 h-5 text-violet-400" />
                    Platform & Aspect Ratio
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {Object.entries(ASPECT_RATIOS).map(([key, value]) => (
                      <button
                        key={key}
                        onClick={() => setPlatform(key as keyof typeof ASPECT_RATIOS)}
                        className={cn(
                          "relative p-4 rounded-xl border transition-all duration-300",
                          platform === key
                            ? "bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 border-violet-500/50 shadow-lg shadow-violet-500/10"
                            : "bg-background/50 border-border hover:border-violet-500/30"
                        )}
                      >
                        {platform === key && (
                          <div className="absolute top-2 right-2">
                            <Check className="w-4 h-4 text-violet-400" />
                          </div>
                        )}
                        <div className="flex flex-col items-center gap-2">
                          {key === "instagram" && <Instagram className="w-5 h-5 text-pink-400" />}
                          {key === "facebook" && <Facebook className="w-5 h-5 text-blue-400" />}
                          {key === "whatsapp" && (
                            <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                              <span className="text-xs text-white font-bold">W</span>
                            </div>
                          )}
                          {key === "square" && (
                            <div className="w-5 h-5 border-2 border-violet-400 rounded" />
                          )}
                          {key === "landscape" && (
                            <div className="w-6 h-4 border-2 border-violet-400 rounded" />
                          )}
                          <span className="text-xs font-medium text-foreground whitespace-nowrap">
                            {value.ratio}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Duration Selection */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-violet-500/5 to-fuchsia-500/5 border border-violet-500/20">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                      <Clock className="w-5 h-5 text-violet-400" />
                      Reel Duration
                    </h3>
                    {audioDuration > 0 && (
                      <span className="text-xs text-muted-foreground bg-violet-500/10 px-2 py-1 rounded-full">
                        Max: {audioDuration}s (audio length)
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {REEL_DURATIONS.map((dur) => {
                      const isDisabled = audioDuration > 0 && dur.value > audioDuration;
                      return (
                        <button
                          key={dur.value}
                          onClick={() => {
                            if (!isDisabled) {
                              setDuration(dur.value);
                              // Reset audio start time if it would exceed bounds
                              if (audioStartTime > audioDuration - dur.value) {
                                setAudioStartTime(Math.max(0, audioDuration - dur.value));
                              }
                            }
                          }}
                          disabled={isDisabled}
                          className={cn(
                            "relative py-3 px-4 rounded-xl border transition-all duration-300",
                            duration === dur.value
                              ? "bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 border-violet-500/50 shadow-lg shadow-violet-500/10"
                              : "bg-background/50 border-border hover:border-violet-500/30",
                            isDisabled && "opacity-40 cursor-not-allowed"
                          )}
                        >
                          {duration === dur.value && (
                            <div className="absolute top-2 right-2">
                              <Check className="w-4 h-4 text-violet-400" />
                            </div>
                          )}
                          <span className="text-sm font-medium text-foreground">
                            {dur.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  
                  {/* Custom Duration Input */}
                  <div className="mt-4 flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">Custom:</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min={1}
                        max={audioDuration > 0 ? audioDuration : 300}
                        value={duration}
                        onChange={(e) => {
                          const val = parseInt(e.target.value) || 1;
                          const maxDur = audioDuration > 0 ? audioDuration : 300;
                          const newDuration = Math.min(Math.max(1, val), maxDur);
                          setDuration(newDuration);
                          if (audioStartTime > audioDuration - newDuration) {
                            setAudioStartTime(Math.max(0, audioDuration - newDuration));
                          }
                        }}
                        className="w-20 px-3 py-2 text-sm font-medium text-foreground bg-background/50 border border-violet-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500"
                      />
                      <span className="text-sm text-muted-foreground">seconds</span>
                    </div>
                  </div>
                </div>

                {/* Audio Selection with Tabs */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-violet-500/5 to-fuchsia-500/5 border border-violet-500/20">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Music className="w-5 h-5 text-violet-400" />
                    Audio Track
                  </h3>
                  
                  {/* Audio Tabs */}
                  <div className="flex gap-2 mb-4 p-1 rounded-xl bg-background/50 border border-border">
                    <button
                      onClick={() => setAudioTab("samples")}
                      className={cn(
                        "flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-300",
                        audioTab === "samples"
                          ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      Sample Songs
                    </button>
                    <button
                      onClick={() => setAudioTab("upload")}
                      className={cn(
                        "flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-300",
                        audioTab === "upload"
                          ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      Upload Song
                    </button>
                  </div>

                  {/* Sample Songs Tab */}
                  {audioTab === "samples" && (
                    <div className="space-y-4">
                      <div className="space-y-2 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                        {SAMPLE_SONGS.map((song) => (
                          <button
                            key={song.id}
                            onClick={() => {
                              // Clear any existing preview timeout
                              if (audioPreviewTimeout.current) {
                                clearTimeout(audioPreviewTimeout.current);
                                audioPreviewTimeout.current = null;
                              }
                              // Stop current playback when changing songs
                              if (audioRef.current) {
                                audioRef.current.pause();
                                audioRef.current.currentTime = 0;
                              }
                              setIsAudioPlaying(false);
                              
                              setSelectedSong(song);
                              setCustomAudio(null);
                              setAudioStartTime(0);
                              
                              // Auto-detect duration from audio file
                              const audio = new Audio(song.file);
                              audio.addEventListener("loadedmetadata", () => {
                                const songDuration = Math.floor(audio.duration);
                                setAudioDuration(songDuration);
                                // Auto-adjust reel duration if song is shorter
                                if (songDuration < duration) {
                                  setDuration(songDuration);
                                }
                              });
                            }}
                            className={cn(
                              "w-full flex items-center gap-3 p-3 rounded-xl border transition-all duration-300",
                              selectedSong?.id === song.id
                                ? "bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 border-violet-500/50 shadow-lg shadow-violet-500/10"
                                : "bg-background/50 border-border hover:border-violet-500/30"
                            )}
                          >
                            <div className="relative w-10 h-10 rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center shrink-0">
                              <Music className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1 text-left">
                              <p className="text-sm font-medium text-foreground">{song.name}</p>
                              <p className="text-xs text-muted-foreground">{song.artist}</p>
                            </div>
                            <span className="text-xs text-muted-foreground px-2 py-0.5 rounded bg-violet-500/10">{song.genre}</span>
                            {selectedSong?.id === song.id && (
                              <Check className="w-5 h-5 text-violet-400 shrink-0" />
                            )}
                          </button>
                        ))}
                      </div>
                      
                      {/* Audio Trimming Slider for Sample Songs */}
                      {selectedSong && audioDuration > duration && (
                        <div className="p-4 rounded-xl bg-background/50 border border-border space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-foreground">Select Portion</span>
                            <span className="text-xs text-muted-foreground">
                              Using {duration}s starting at {formatTime(audioStartTime)}
                            </span>
                          </div>
                          
                          {/* Waveform Visualization */}
                          <div className="relative h-12 rounded-lg bg-violet-500/10 overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-around px-2">
                              {[...Array(40)].map((_, i) => (
                                <div
                                  key={i}
                                  className="w-1 rounded-full bg-violet-500/30"
                                  style={{
                                    height: `${20 + Math.sin(i * 0.5) * 30 + Math.random() * 20}%`,
                                  }}
                                />
                              ))}
                            </div>
                            <div
                              className="absolute top-0 bottom-0 bg-gradient-to-r from-violet-500/40 to-fuchsia-500/40 border-l-2 border-r-2 border-violet-400"
                              style={{
                                left: `${(audioStartTime / audioDuration) * 100}%`,
                                width: `${Math.min((duration / audioDuration) * 100, 100 - (audioStartTime / audioDuration) * 100)}%`,
                              }}
                            />
                          </div>

                          {/* Time Slider */}
                          <div className="space-y-2">
                            <Slider
                              value={[audioStartTime]}
                              onValueChange={([val]) => setAudioStartTime(val)}
                              min={0}
                              max={Math.max(0, audioDuration - duration)}
                              step={1}
                              className="w-full"
                            />
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>{formatTime(0)}</span>
                              <span className="text-violet-400 font-medium">
                                {formatTime(audioStartTime)} - {formatTime(Math.min(audioStartTime + duration, audioDuration))}
                              </span>
                              <span>{formatTime(audioDuration)}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Upload Audio Tab */}
                  {audioTab === "upload" && (
                    <div className="space-y-4">
                      {!customAudio ? (
                        <div
                          onClick={() => audioInputRef.current?.click()}
                          className="cursor-pointer p-8 rounded-xl border-2 border-dashed border-violet-500/30 bg-violet-500/5 hover:border-violet-500/50 transition-all duration-300"
                        >
                          <div className="text-center">
                            <div className="inline-flex p-3 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 mb-3">
                              <Upload className="w-6 h-6 text-white" />
                            </div>
                            <p className="text-sm font-medium text-foreground mb-1">Upload Your Song</p>
                            <p className="text-xs text-muted-foreground">MP3, WAV, AAC • Max 50MB</p>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {/* Uploaded Audio Card */}
                          <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 border border-violet-500/50">
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center">
                              <Music className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-foreground truncate">{customAudio.name}</p>
                              <p className="text-xs text-muted-foreground">Duration: {formatTime(audioDuration)}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setCustomAudio(null);
                                setAudioDuration(0);
                                setAudioStartTime(0);
                              }}
                              className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>

                          {/* Audio Trimming Slider */}
                          <div className="p-4 rounded-xl bg-background/50 border border-border space-y-4">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-foreground">Select Portion</span>
                              <span className="text-xs text-muted-foreground">
                                Using {duration}s starting at {formatTime(audioStartTime)}
                              </span>
                            </div>
                            
                            {/* Waveform Visualization */}
                            <div className="relative h-16 rounded-lg bg-violet-500/10 overflow-hidden">
                              {/* Fake waveform bars */}
                              <div className="absolute inset-0 flex items-center justify-around px-2">
                                {[...Array(50)].map((_, i) => (
                                  <div
                                    key={i}
                                    className="w-1 rounded-full bg-violet-500/30"
                                    style={{
                                      height: `${20 + Math.sin(i * 0.5) * 30 + Math.random() * 20}%`,
                                    }}
                                  />
                                ))}
                              </div>
                              {/* Selected portion highlight */}
                              <div
                                className="absolute top-0 bottom-0 bg-gradient-to-r from-violet-500/40 to-fuchsia-500/40 border-l-2 border-r-2 border-violet-400"
                                style={{
                                  left: `${(audioStartTime / audioDuration) * 100}%`,
                                  width: `${Math.min((duration / audioDuration) * 100, 100 - (audioStartTime / audioDuration) * 100)}%`,
                                }}
                              />
                            </div>

                            {/* Time Slider */}
                            <div className="space-y-2">
                              <Slider
                                value={[audioStartTime]}
                                onValueChange={([val]) => setAudioStartTime(val)}
                                min={0}
                                max={Math.max(0, audioDuration - duration)}
                                step={1}
                                className="w-full"
                              />
                              <div className="flex justify-between text-xs text-muted-foreground">
                                <span>{formatTime(0)}</span>
                                <span className="text-violet-400 font-medium">
                                  {formatTime(audioStartTime)} - {formatTime(Math.min(audioStartTime + duration, audioDuration))}
                                </span>
                                <span>{formatTime(audioDuration)}</span>
                              </div>
                            </div>

                            {/* Preview Button */}
                            <Button
                              onClick={handlePreviewAudio}
                              variant="outline"
                              className="w-full border-violet-500/30 hover:bg-violet-500/10"
                            >
                              {isAudioPlaying ? (
                                <>
                                  <Pause className="w-4 h-4 mr-2" />
                                  Stop Preview
                                </>
                              ) : (
                                <>
                                  <Play className="w-4 h-4 mr-2" />
                                  Preview Selection
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      )}
                      <input
                        ref={audioInputRef}
                        type="file"
                        accept="audio/*"
                        onChange={handleAudioUpload}
                        className="hidden"
                      />
                      {/* Hidden audio element for preview */}
                      {customAudio && (
                        <audio ref={audioRef} src={customAudio.url} className="hidden" />
                      )}
                    </div>
                  )}
                </div>

                {/* Apply Button */}
                <Button
                  onClick={handleApply}
                  disabled={(!selectedSong && !customAudio) || isProcessing}
                  className={cn(
                    "w-full h-14 text-lg font-semibold rounded-xl transition-all duration-300",
                    "bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500",
                    "shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40",
                    "disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                  )}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Create Reel
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Preview & Actions */}
          {currentStep === "preview" && isReelReady && mediaFile && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8"
            >
              {/* Reel Preview */}
              <div className="relative">
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20 p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                      <Check className="w-5 h-5 text-emerald-400" />
                      Reel Ready!
                    </h3>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsMuted(!isMuted)}
                        className="h-9 w-9 rounded-full hover:bg-violet-500/10"
                      >
                        {isMuted ? (
                          <VolumeX className="w-4 h-4" />
                        ) : (
                          <Volume2 className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex justify-center">
                    <div
                      className="relative overflow-hidden rounded-xl bg-black shadow-2xl shadow-violet-500/20"
                      style={getPreviewStyles()}
                    >
                      {mediaFile.type === "video" ? (
                        <video
                          ref={videoRef}
                          src={mediaFile.url}
                          className="w-full h-full object-cover"
                          style={filterStyle}
                          muted={isMuted}
                          loop
                        />
                      ) : (
                        <img
                          src={mediaFile.url}
                          alt="Reel Preview"
                          className="w-full h-full object-cover"
                          style={filterStyle}
                        />
                      )}
                      
                      {/* Play/Pause Overlay */}
                      <button
                        onClick={togglePlay}
                        className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity"
                      >
                        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          {isPlaying ? (
                            <Pause className="w-8 h-8 text-white" />
                          ) : (
                            <Play className="w-8 h-8 text-white ml-1" />
                          )}
                        </div>
                      </button>

                      {/* Progress Bar */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                        <motion.div
                          className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
                          style={{ width: `${progress}%` }}
                        />
                      </div>

                      {/* Audio Badge */}
                      {(selectedSong || customAudio) && (
                        <div className="absolute bottom-4 left-3 right-3 flex items-center gap-2 px-3 py-2 rounded-lg bg-black/60 backdrop-blur-sm border border-white/10">
                          <Music className="w-4 h-4 text-violet-400 shrink-0" />
                          <span className="text-sm text-white truncate">
                            {selectedSong ? `${selectedSong.name} - ${selectedSong.artist}` : customAudio?.name}
                          </span>
                          {isPlaying && (
                            <div className="flex items-end gap-0.5 ml-auto">
                              {[...Array(4)].map((_, i) => (
                                <motion.div
                                  key={i}
                                  className="w-0.5 bg-violet-400 rounded-full"
                                  animate={{
                                    height: [3, 8 + Math.random() * 6, 3],
                                  }}
                                  transition={{
                                    duration: 0.4,
                                    repeat: Infinity,
                                    delay: i * 0.1,
                                  }}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Playback Controls */}
                  <div className="flex items-center justify-center gap-4 mt-6">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        setProgress(0);
                        setIsPlaying(false);
                        if (audioRef.current) {
                          audioRef.current.pause();
                          audioRef.current.currentTime = audioStartTime;
                        }
                      }}
                      className="h-10 w-10 rounded-full border-violet-500/30 hover:bg-violet-500/10"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={togglePlay}
                      className={cn(
                        "h-14 w-14 rounded-full",
                        "bg-gradient-to-r from-violet-600 to-fuchsia-600",
                        "shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40"
                      )}
                    >
                      {isPlaying ? (
                        <Pause className="w-6 h-6" />
                      ) : (
                        <Play className="w-6 h-6 ml-0.5" />
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setIsEditing(!isEditing)}
                      className={cn(
                        "h-10 w-10 rounded-full border-violet-500/30",
                        isEditing ? "bg-violet-500/20" : "hover:bg-violet-500/10"
                      )}
                    >
                      <Edit3 className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  {/* Hidden Audio Element for Preview Playback */}
                  {(customAudio || selectedSong) && (
                    <audio 
                      ref={audioRef} 
                      src={customAudio?.url || selectedSong?.file} 
                      muted={isMuted}
                      className="hidden" 
                    />
                  )}
                </div>
              </div>

              {/* Actions Panel */}
              <div className="space-y-6">
                {/* Edit Panel */}
                <AnimatePresence>
                  {isEditing && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 rounded-2xl bg-gradient-to-br from-violet-500/5 to-fuchsia-500/5 border border-violet-500/20">
                        <div className="flex items-center justify-between mb-6">
                          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                            <Edit3 className="w-5 h-5 text-violet-400" />
                            Edit Adjustments
                          </h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setBrightness(100);
                              setContrast(100);
                              setSaturation(100);
                            }}
                            className="text-muted-foreground hover:text-foreground"
                          >
                            Reset
                          </Button>
                        </div>
                        <div className="space-y-6">
                          <div>
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-sm font-medium text-foreground">Brightness</span>
                              <span className="text-sm text-muted-foreground">{brightness}%</span>
                            </div>
                            <Slider
                              value={[brightness]}
                              onValueChange={([val]) => setBrightness(val)}
                              min={50}
                              max={150}
                              step={1}
                              className="w-full"
                            />
                          </div>
                          <div>
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-sm font-medium text-foreground">Contrast</span>
                              <span className="text-sm text-muted-foreground">{contrast}%</span>
                            </div>
                            <Slider
                              value={[contrast]}
                              onValueChange={([val]) => setContrast(val)}
                              min={50}
                              max={150}
                              step={1}
                              className="w-full"
                            />
                          </div>
                          <div>
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-sm font-medium text-foreground">Saturation</span>
                              <span className="text-sm text-muted-foreground">{saturation}%</span>
                            </div>
                            <Slider
                              value={[saturation]}
                              onValueChange={([val]) => setSaturation(val)}
                              min={0}
                              max={200}
                              step={1}
                              className="w-full"
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Share Platforms */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-violet-500/5 to-fuchsia-500/5 border border-violet-500/20">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Share2 className="w-5 h-5 text-violet-400" />
                    Optimized For
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30">
                      <Instagram className="w-5 h-5 text-pink-400" />
                      <span className="text-sm font-medium text-foreground">Instagram Reels</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border border-blue-500/30">
                      <Facebook className="w-5 h-5 text-blue-400" />
                      <span className="text-sm font-medium text-foreground">Facebook Reels</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-emerald-500/30">
                      <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                        <span className="text-xs text-white font-bold">W</span>
                      </div>
                      <span className="text-sm font-medium text-foreground">WhatsApp Status</span>
                    </div>
                  </div>
                </div>

                {/* Reel Details */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-violet-500/5 to-fuchsia-500/5 border border-violet-500/20">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Reel Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-background/50 border border-border">
                      <p className="text-xs text-muted-foreground mb-1">Duration</p>
                      <p className="text-lg font-semibold text-foreground">{duration} seconds</p>
                    </div>
                    <div className="p-4 rounded-xl bg-background/50 border border-border">
                      <p className="text-xs text-muted-foreground mb-1">Aspect Ratio</p>
                      <p className="text-lg font-semibold text-foreground">{ASPECT_RATIOS[platform].ratio}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-background/50 border border-border">
                      <p className="text-xs text-muted-foreground mb-1">Resolution</p>
                      <p className="text-lg font-semibold text-foreground">
                        {ASPECT_RATIOS[platform].width}×{ASPECT_RATIOS[platform].height}
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-background/50 border border-border">
                      <p className="text-xs text-muted-foreground mb-1">Audio Track</p>
                      <p className="text-lg font-semibold text-foreground truncate" title={selectedSong?.name || customAudio?.name}>
                        {selectedSong?.name || customAudio?.name}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    onClick={handleDownload}
                    disabled={isExporting}
                    className={cn(
                      "h-14 text-lg font-semibold rounded-xl relative overflow-hidden",
                      "bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500",
                      "shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40",
                      "disabled:opacity-80"
                    )}
                  >
                    {isExporting && (
                      <div 
                        className="absolute inset-0 bg-white/20"
                        style={{ width: `${exportProgress}%`, transition: "width 0.3s" }}
                      />
                    )}
                    <span className="relative flex items-center">
                      {isExporting ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Exporting {exportProgress}%
                        </>
                      ) : (
                        <>
                          <Download className="w-5 h-5 mr-2" />
                          Download Video
                        </>
                      )}
                    </span>
                  </Button>
                  <Button
                    onClick={() => setCurrentStep("configure")}
                    variant="outline"
                    className="h-14 text-lg font-semibold rounded-xl border-violet-500/30 hover:bg-violet-500/10"
                  >
                    <Edit3 className="w-5 h-5 mr-2" />
                    Edit More
                  </Button>
                </div>

                {/* Create New Button */}
                <Button
                  onClick={handleReset}
                  variant="ghost"
                  className="w-full h-12 text-muted-foreground hover:text-foreground hover:bg-violet-500/10 rounded-xl"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Create New Reel
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            {
              icon: ImageIcon,
              title: "Image & Video",
              description: "Upload any image or video to create stunning reels",
              color: "from-violet-500 to-purple-500",
            },
            {
              icon: Music,
              title: "Audio Tracks",
              description: "Choose from curated audio tracks for your reels",
              color: "from-fuchsia-500 to-pink-500",
            },
            {
              icon: Share2,
              title: "Multi-Platform",
              description: "Optimized for Instagram, Facebook & WhatsApp",
              color: "from-cyan-500 to-blue-500",
            },
            {
              icon: Download,
              title: "Easy Download",
              description: "Download your reels instantly in HD quality",
              color: "from-emerald-500 to-teal-500",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="group relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r opacity-0 group-hover:opacity-20 rounded-2xl blur transition-opacity duration-500" />
              <div className="relative p-6 rounded-2xl bg-gradient-to-br from-violet-500/5 to-transparent border border-violet-500/10 hover:border-violet-500/30 transition-all duration-300">
                <div className={cn("inline-flex p-3 rounded-xl bg-gradient-to-r mb-4", feature.color)}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h4>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Custom scrollbar styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #8b5cf6, #d946ef);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #7c3aed, #c026d3);
        }
      `}</style>
    </div>
  );
}
