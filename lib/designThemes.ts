export type ThemeLayout = 
  | "minimalist" 
  | "bento" 
  | "brutalist" 
  | "retro" 
  | "3d" 
  | "glassmorphism" 
  | "apple" 
  | "material" 
  | "neumorphism" 
  | "micro-animations";

export type DesignTheme = {
  id: string;
  name: string;
  layout: ThemeLayout;
  
  // Global
  pageBg: string;
  textPrimary: string;
  textSecondary: string;
  accentColor: string;
  borderStyle: string;
  
  // Hero
  heroBg: string;
  heroGlow: string;
  heroAccent: string;
  heroButton: string;
  heroPanel: string;
  heroDot: string;
  
  // Cards
  cardBg: string;
  cardBorder: string;
  cardShadow: string;
  cardHover: string;
  
  // Tags
  tagBg: string;
  tagText: string;
  tagBorder: string;
  
  // Buttons
  btnPrimary: string;
  btnSecondary: string;
  
  // Navbar
  navBg: string;
  navText: string;
  navActive: string;
  navCta: string;
  
  // Footer
  footerBg: string;
  footerText: string;
  footerBorder: string;
  
  // Inputs
  inputBg: string;
  inputBorder: string;
  inputFocus: string;
};

export const themes: DesignTheme[] = [
  {
    id: "glassmorphism",
    name: "Cosmic Glassmorphism",
    layout: "glassmorphism",
    pageBg: "bg-gradient-to-br from-purple-900 via-blue-900 via-indigo-900 to-black dark:from-purple-950 dark:via-blue-950 dark:via-indigo-950 dark:to-black",
    textPrimary: "text-white drop-shadow-lg",
    textSecondary: "text-blue-100/80 drop-shadow-md",
    accentColor: "text-cyan-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]",
    borderStyle: "border border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.1)]",
    
    heroBg: "from-purple-950 via-blue-900 via-indigo-900 to-black",
    heroGlow: "bg-gradient-to-r from-purple-500/40 via-cyan-500/40 to-blue-500/40 blur-3xl",
    heroAccent: "text-cyan-300 drop-shadow-[0_0_20px_rgba(34,211,238,1)] animate-pulse",
    heroButton: "bg-white/20 backdrop-blur-xl text-white hover:bg-white/30 border border-white/40 shadow-[0_0_30px_rgba(34,211,238,0.5)] hover:shadow-[0_0_40px_rgba(34,211,238,0.8)] transition-all duration-500",
    heroPanel: "bg-white/5 backdrop-blur-2xl border-white/30 shadow-[0_20px_60px_rgba(255,255,255,0.1)]",
    heroDot: "bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.8)] animate-pulse",
    
    cardBg: "bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.3)]",
    cardBorder: "border border-white/30 shadow-[0_0_30px_rgba(255,255,255,0.1)]",
    cardShadow: "shadow-[0_25px_80px_rgba(31,38,135,0.5)]",
    cardHover: "hover:bg-white/20 hover:border-cyan-300/50 hover:shadow-[0_30px_100px_rgba(34,211,238,0.3)] hover:scale-105 transition-all duration-700",
    
    tagBg: "bg-white/15 backdrop-blur-lg border border-cyan-300/30",
    tagText: "text-cyan-200 drop-shadow-md",
    tagBorder: "border border-white/30 shadow-[0_0_15px_rgba(34,211,238,0.3)]",
    
    btnPrimary: "bg-white/20 backdrop-blur-xl text-white hover:bg-cyan-300/30 border border-white/40 shadow-[0_10px_40px_rgba(31,38,135,0.5)] hover:shadow-[0_15px_60px_rgba(34,211,238,0.6)] hover:scale-110 transition-all duration-500",
    btnSecondary: "bg-transparent text-cyan-100 border border-white/40 hover:bg-white/15 hover:border-cyan-300/60 hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] transition-all duration-500",
    
    navBg: "bg-black/20 backdrop-blur-2xl border-b border-white/20 shadow-[0_10px_40px_rgba(0,0,0,0.3)]",
    navText: "text-white/90 hover:text-cyan-300 hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.8)] transition-all duration-300",
    navActive: "text-cyan-300 drop-shadow-[0_0_15px_rgba(34,211,238,1)] font-bold",
    navCta: "bg-white/20 text-white border border-white/40 hover:bg-cyan-300/30 hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] transition-all duration-500",
    
    footerBg: "bg-black/30 backdrop-blur-xl border-t border-white/20",
    footerText: "text-blue-100/70",
    footerBorder: "border-t border-white/20 shadow-[0_-10px_40px_rgba(255,255,255,0.1)]",
    
    inputBg: "bg-white/10 backdrop-blur-xl text-white placeholder-blue-200/60 border border-white/30",
    inputBorder: "border border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.1)]",
    inputFocus: "focus:ring-4 focus:ring-cyan-400/50 focus:border-cyan-300 focus:shadow-[0_0_30px_rgba(34,211,238,0.5)] transition-all duration-500",
  },
  {
    id: "bento",
    name: "Neon Bento Grid",
    layout: "bento",
    pageBg: "bg-black dark:bg-black",
    textPrimary: "text-white drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]",
    textSecondary: "text-gray-300",
    accentColor: "text-cyan-400 drop-shadow-[0_0_15px_rgba(0,255,255,0.8)]",
    borderStyle: "border border-cyan-400/50 shadow-[0_0_20px_rgba(0,255,255,0.3)]",
    
    heroBg: "bg-black",
    heroGlow: "bg-gradient-to-r from-cyan-500/30 via-purple-500/30 to-pink-500/30 blur-2xl",
    heroAccent: "text-cyan-400 drop-shadow-[0_0_20px_rgba(0,255,255,1)] animate-pulse",
    heroButton: "bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:from-cyan-400 hover:to-purple-500 border border-cyan-400 shadow-[0_0_40px_rgba(0,255,255,0.5)] hover:shadow-[0_0_60px_rgba(0,255,255,0.8)] transition-all duration-500",
    heroPanel: "bg-gray-900/80 border-2 border-cyan-400/50 shadow-[0_0_40px_rgba(0,255,255,0.2)]",
    heroDot: "bg-cyan-400 shadow-[0_0_20px_rgba(0,255,255,1)] animate-pulse",
    
    cardBg: "bg-gray-900/90 backdrop-blur-sm border-2 border-cyan-400/30 rounded-3xl",
    cardBorder: "border-2 border-cyan-400/30 shadow-[0_0_30px_rgba(0,255,255,0.2)]",
    cardShadow: "shadow-[0_20px_60px_rgba(0,255,255,0.1)]",
    cardHover: "hover:border-cyan-400/70 hover:shadow-[0_30px_80px_rgba(0,255,255,0.4)] hover:bg-gray-800/90 hover:-translate-y-2 transition-all duration-500",
    
    tagBg: "bg-cyan-900/50 backdrop-blur-lg border border-cyan-400/40 rounded-xl",
    tagText: "text-cyan-300 drop-shadow-md font-bold",
    tagBorder: "border border-cyan-400/40 shadow-[0_0_15px_rgba(0,255,255,0.3)]",
    
    btnPrimary: "bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:from-cyan-400 hover:to-purple-500 font-bold rounded-xl border border-cyan-400 shadow-[0_10px_40px_rgba(0,255,255,0.3)] hover:shadow-[0_15px_60px_rgba(0,255,255,0.6)] hover:scale-110 transition-all duration-500",
    btnSecondary: "bg-transparent text-cyan-400 border-2 border-cyan-400/60 hover:bg-cyan-400/20 hover:border-cyan-300 hover:shadow-[0_0_30px_rgba(0,255,255,0.4)] rounded-xl transition-all duration-500",
    
    navBg: "bg-black/95 backdrop-blur-xl border-b-2 border-cyan-400/30 shadow-[0_10px_40px_rgba(0,0,0,0.8)]",
    navText: "text-gray-300 hover:text-cyan-400 hover:drop-shadow-[0_0_10px_rgba(0,255,255,0.8)] transition-all duration-300",
    navActive: "text-cyan-400 drop-shadow-[0_0_15px_rgba(0,255,255,1)] font-bold",
    navCta: "bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:from-cyan-400 hover:to-purple-500 rounded-xl border border-cyan-400 shadow-[0_0_30px_rgba(0,255,255,0.5)] transition-all duration-500",
    
    footerBg: "bg-black/95 border-t-2 border-cyan-400/30",
    footerText: "text-gray-400",
    footerBorder: "border-t-2 border-cyan-400/30 shadow-[0_-10px_40px_rgba(0,255,255,0.1)]",
    
    inputBg: "bg-gray-900/90 text-white placeholder-gray-500 border-2 border-cyan-400/40 rounded-xl",
    inputBorder: "border-2 border-cyan-400/40 shadow-[0_0_20px_rgba(0,255,255,0.1)]",
    inputFocus: "focus:ring-4 focus:ring-cyan-400/50 focus:border-cyan-400 focus:shadow-[0_0_40px_rgba(0,255,255,0.4)] transition-all duration-500",
  },
  {
    id: "minimalist",
    name: "Ultra Minimalist",
    layout: "minimalist",
    pageBg: "bg-gradient-to-b from-gray-50 to-white dark:from-neutral-950 dark:to-black",
    textPrimary: "text-neutral-900 dark:text-neutral-50 font-light tracking-wide",
    textSecondary: "text-neutral-400 dark:text-neutral-500 font-light",
    accentColor: "text-neutral-900 dark:text-white font-extralight",
    borderStyle: "border border-neutral-100 dark:border-neutral-900",
    
    heroBg: "from-gray-50 via-white to-gray-50 dark:from-neutral-950 dark:via-black dark:to-neutral-950",
    heroGlow: "bg-transparent",
    heroAccent: "text-neutral-900 dark:text-white font-thin tracking-widest",
    heroButton: "bg-neutral-900 text-white dark:bg-white dark:text-black hover:bg-neutral-700 dark:hover:bg-neutral-200 font-light tracking-wider transition-all duration-700 hover:tracking-widest",
    heroPanel: "bg-white/90 dark:bg-neutral-950/90 backdrop-blur-sm border border-neutral-100 dark:border-neutral-900",
    heroDot: "bg-neutral-900 dark:bg-white",
    
    cardBg: "bg-white/95 dark:bg-neutral-950/95 backdrop-blur-sm",
    cardBorder: "border border-neutral-100 dark:border-neutral-900",
    cardShadow: "shadow-sm shadow-neutral-100/50 dark:shadow-black/20",
    cardHover: "hover:shadow-lg hover:shadow-neutral-200/30 dark:hover:shadow-black/40 hover:border-neutral-200 dark:hover:border-neutral-800 hover:-translate-y-1 transition-all duration-700",
    
    tagBg: "bg-neutral-50 dark:bg-neutral-900/50 backdrop-blur-sm",
    tagText: "text-neutral-600 dark:text-neutral-400 font-light text-xs tracking-wider",
    tagBorder: "border-transparent",
    
    btnPrimary: "bg-neutral-900 text-white dark:bg-white dark:text-black hover:bg-neutral-700 dark:hover:bg-neutral-200 font-light tracking-wide hover:tracking-widest transition-all duration-700 rounded-none border-none",
    btnSecondary: "bg-transparent text-neutral-900 dark:text-white border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 font-light tracking-wide hover:tracking-widest transition-all duration-700 rounded-none",
    
    navBg: "bg-white/80 dark:bg-neutral-950/80 backdrop-blur-xl border-b border-neutral-100 dark:border-neutral-900",
    navText: "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white font-light tracking-wide hover:tracking-wider transition-all duration-500",
    navActive: "text-neutral-900 dark:text-white font-light tracking-widest",
    navCta: "bg-neutral-900 text-white dark:bg-white dark:text-black font-light tracking-wide hover:tracking-widest rounded-none hover:bg-neutral-700 dark:hover:bg-neutral-200 transition-all duration-700",
    
    footerBg: "bg-neutral-50/80 dark:bg-neutral-900/80 backdrop-blur-xl",
    footerText: "text-neutral-400 dark:text-neutral-500 font-light",
    footerBorder: "border-t border-neutral-100 dark:border-neutral-900",
    
    inputBg: "bg-transparent text-neutral-900 dark:text-white placeholder-neutral-300 dark:placeholder-neutral-600 font-light tracking-wide",
    inputBorder: "border-b border-neutral-200 dark:border-neutral-800 rounded-none border-l-0 border-r-0 border-t-0",
    inputFocus: "focus:ring-0 focus:outline-none focus:border-b-2 focus:border-neutral-900 dark:focus:border-white transition-all duration-700",
  },
  {
    id: "3d",
    name: "Cyberpunk 3D",
    layout: "3d",
    pageBg: "bg-gradient-to-br from-purple-900 via-black via-red-900 to-black dark:bg-gradient-to-br dark:from-purple-950 dark:via-black dark:via-red-950 dark:to-black",
    textPrimary: "text-green-300 drop-shadow-[0_0_15px_rgba(34,197,94,0.8)] font-mono",
    textSecondary: "text-green-100/80 font-mono",
    accentColor: "text-cyan-300 drop-shadow-[0_0_20px_rgba(34,211,238,1)] animate-pulse font-mono",
    borderStyle: "border-2 border-green-400/60 shadow-[0_0_30px_rgba(34,197,94,0.4)]",
    
    heroBg: "from-purple-950 via-black via-red-950 to-black",
    heroGlow: "bg-gradient-to-r from-green-500/40 via-cyan-500/40 via-purple-500/40 to-red-500/40 blur-3xl",
    heroAccent: "text-cyan-300 drop-shadow-[0_0_25px_rgba(34,211,238,1)] animate-pulse font-mono font-bold",
    heroButton: "bg-gradient-to-r from-green-500 via-cyan-500 to-purple-600 text-black font-black border-4 border-green-400 shadow-[6px_6px_0_0_rgba(34,197,94,0.8)] hover:shadow-[10px_10px_0_0_rgba(34,197,94,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all duration-300 transform perspective-1000 hover:rotateX-5 hover:rotateY-5",
    heroPanel: "bg-black/90 backdrop-blur-sm border-2 border-green-400/50 shadow-[10px_10px_30px_rgba(34,197,94,0.3)] transform perspective-1000 rotateX-2 rotateY-2",
    heroDot: "bg-green-400 shadow-[0_0_25px_rgba(34,197,94,1)] animate-pulse",
    
    cardBg: "bg-black/95 backdrop-blur-lg border-2 border-green-400/40 transform perspective-1000",
    cardBorder: "border-2 border-green-400/40 shadow-[8px_8px_20px_rgba(34,197,94,0.2)]",
    cardShadow: "shadow-[12px_12px_40px_rgba(34,197,94,0.3)]",
    cardHover: "hover:border-green-300/70 hover:shadow-[15px_15px_60px_rgba(34,197,94,0.5)] hover:translate-x-[-3px] hover:translate-y-[-3px] hover:rotateX-3 hover:rotateY-3 hover:bg-green-900/20 transition-all duration-500 transform perspective-1000",
    
    tagBg: "bg-green-900/60 backdrop-blur-md border border-green-400/50 shadow-[4px_4px_0_0_rgba(34,197,94,0.6)]",
    tagText: "text-green-200 font-mono font-bold drop-shadow-md",
    tagBorder: "border border-green-400/50 shadow-[0_0_15px_rgba(34,197,94,0.3)]",
    
    btnPrimary: "bg-gradient-to-r from-green-500 to-cyan-500 text-black font-mono font-black border-2 border-green-400 shadow-[6px_6px_0_0_rgba(34,197,94,0.8)] hover:shadow-[10px_10px_0_0_rgba(34,197,94,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] hover:scale-105 transition-all duration-300 transform perspective-1000",
    btnSecondary: "bg-black/80 text-green-300 border-2 border-green-400/60 font-mono font-bold shadow-[6px_6px_0_0_rgba(34,197,94,0.4)] hover:bg-green-900/40 hover:border-green-300 hover:shadow-[8px_8px_0_0_rgba(34,197,94,0.6)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-300",
    
    navBg: "bg-black/90 backdrop-blur-xl border-b-2 border-green-400/40 shadow-[0_10px_40px_rgba(0,0,0,0.8)]",
    navText: "text-green-300 font-mono hover:text-green-100 hover:drop-shadow-[0_0_15px_rgba(34,197,94,0.8)] transition-all duration-300",
    navActive: "text-cyan-300 drop-shadow-[0_0_20px_rgba(34,211,238,1)] font-mono font-bold",
    navCta: "bg-gradient-to-r from-green-500 to-cyan-500 text-black font-mono font-bold border border-green-400 shadow-[4px_4px_0_0_rgba(34,197,94,0.8)] hover:shadow-[6px_6px_0_0_rgba(34,197,94,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-300",
    
    footerBg: "bg-black/95 border-t-2 border-green-400/40 shadow-[inset_0_10px_40px_rgba(34,197,94,0.1)]",
    footerText: "text-green-200/80 font-mono",
    footerBorder: "border-t-2 border-green-400/40 shadow-[0_-10px_40px_rgba(34,197,94,0.2)]",
    
    inputBg: "bg-black/90 text-green-300 placeholder-green-600 font-mono border-2 border-green-400/60 shadow-[inset_4px_4px_8px_rgba(0,0,0,0.8)]",
    inputBorder: "border-2 border-green-400/60 shadow-[0_0_20px_rgba(34,197,94,0.2)]",
    inputFocus: "focus:outline-none focus:ring-4 focus:ring-green-400/50 focus:border-green-300 focus:shadow-[0_0_40px_rgba(34,197,94,0.6)] focus:bg-green-900/20 transition-all duration-500",
  },
  {
    id: "brutalist",
    name: "Nuclear Brutalist",
    layout: "brutalist",
    pageBg: "bg-gradient-to-br from-lime-400 via-yellow-400 via-orange-400 to-red-500 dark:bg-gradient-to-br dark:from-lime-600 dark:via-yellow-600 dark:via-orange-600 dark:to-red-700",
    textPrimary: "text-black dark:text-white font-black tracking-tight drop-shadow-[4px_4px_0_rgba(0,0,0,1)] dark:drop-shadow-[4px_4px_0_rgba(255,255,255,1)]",
    textSecondary: "text-black/90 dark:text-white/90 font-bold tracking-wide drop-shadow-[2px_2px_0_rgba(0,0,0,0.8)] dark:drop-shadow-[2px_2px_0_rgba(255,255,255,0.8)]",
    accentColor: "text-red-600 dark:text-lime-400 font-black drop-shadow-[6px_6px_0_rgba(0,0,0,1)] dark:drop-shadow-[6px_6px_0_rgba(255,255,255,1)] animate-pulse",
    borderStyle: "border-8 border-black dark:border-white shadow-[12px_12px_0_0_rgba(0,0,0,1)] dark:shadow-[12px_12px_0_0_rgba(255,255,255,1)]",
    
    heroBg: "from-lime-400 via-yellow-400 via-orange-400 to-red-500 dark:from-lime-600 dark:via-yellow-600 dark:via-orange-600 dark:to-red-700",
    heroGlow: "bg-transparent",
    heroAccent: "text-red-600 dark:text-lime-400 bg-white dark:bg-black px-4 py-2 border-6 border-black dark:border-white shadow-[8px_8px_0_0_rgba(0,0,0,1)] dark:shadow-[8px_8px_0_0_rgba(255,255,255,1)] font-black uppercase tracking-widest transform -rotate-2 animate-pulse",
    heroButton: "bg-red-600 dark:bg-lime-400 text-white dark:text-black border-8 border-black dark:border-white font-black uppercase rounded-none shadow-[12px_12px_0_0_rgba(0,0,0,1)] dark:shadow-[12px_12px_0_0_rgba(255,255,255,1)] hover:translate-x-[-6px] hover:translate-y-[-6px] hover:shadow-[18px_18px_0_0_rgba(0,0,0,1)] dark:hover:shadow-[18px_18px_0_0_rgba(255,255,255,1)] transition-all duration-200 transform hover:scale-110 hover:rotate-1",
    heroPanel: "bg-white dark:bg-black border-8 border-black dark:border-white shadow-[15px_15px_0_0_rgba(0,0,0,1)] dark:shadow-[15px_15px_0_0_rgba(255,255,255,1)] rounded-none transform rotate-1",
    heroDot: "bg-red-600 dark:bg-lime-400 border-4 border-black dark:border-white rounded-none shadow-[4px_4px_0_0_rgba(0,0,0,1)] dark:shadow-[4px_4px_0_0_rgba(255,255,255,1)] animate-pulse",
    
    cardBg: "bg-white dark:bg-black border-6 border-black dark:border-white rounded-none transform",
    cardBorder: "border-6 border-black dark:border-white",
    cardShadow: "shadow-[12px_12px_0_0_rgba(0,0,0,1)] dark:shadow-[12px_12px_0_0_rgba(255,255,255,1)] rounded-none",
    cardHover: "hover:translate-x-[-6px] hover:translate-y-[-6px] hover:shadow-[18px_18px_0_0_rgba(0,0,0,1)] dark:hover:shadow-[18px_18px_0_0_rgba(255,255,255,1)] hover:rotate-1 hover:scale-105 transition-all duration-300",
    
    tagBg: "bg-orange-300 dark:bg-orange-700 border-4 border-black dark:border-white rounded-none",
    tagText: "text-black dark:text-white font-black uppercase text-xs tracking-widest drop-shadow-[2px_2px_0_rgba(255,255,255,1)] dark:drop-shadow-[2px_2px_0_rgba(0,0,0,1)]",
    tagBorder: "border-4 border-black dark:border-white rounded-none shadow-[4px_4px_0_0_rgba(0,0,0,1)] dark:shadow-[4px_4px_0_0_rgba(255,255,255,1)]",
    
    btnPrimary: "bg-red-600 dark:bg-lime-400 text-white dark:text-black border-6 border-black dark:border-white font-black uppercase rounded-none shadow-[10px_10px_0_0_rgba(0,0,0,1)] dark:shadow-[10px_10px_0_0_rgba(255,255,255,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[14px_14px_0_0_rgba(0,0,0,1)] dark:hover:shadow-[14px_14px_0_0_rgba(255,255,255,1)] hover:scale-110 transition-all duration-200",
    btnSecondary: "bg-white dark:bg-black text-black dark:text-white border-6 border-black dark:border-white font-black uppercase rounded-none shadow-[10px_10px_0_0_rgba(0,0,0,1)] dark:shadow-[10px_10px_0_0_rgba(255,255,255,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[14px_14px_0_0_rgba(0,0,0,1)] dark:hover:shadow-[14px_14px_0_0_rgba(255,255,255,1)] hover:scale-105 transition-all duration-200",
    
    navBg: "bg-lime-400 dark:bg-lime-600 border-b-8 border-black dark:border-white shadow-[0_8px_0_0_rgba(0,0,0,1)] dark:shadow-[0_8px_0_0_rgba(255,255,255,1)]",
    navText: "text-black dark:text-white font-black uppercase tracking-wide drop-shadow-[2px_2px_0_rgba(255,255,255,1)] dark:drop-shadow-[2px_2px_0_rgba(0,0,0,1)] hover:text-red-600 dark:hover:text-lime-200 transition-colors duration-200",
    navActive: "text-red-600 dark:text-lime-200 bg-white dark:bg-black px-4 py-2 border-4 border-black dark:border-white shadow-[6px_6px_0_0_rgba(0,0,0,1)] dark:shadow-[6px_6px_0_0_rgba(255,255,255,1)] font-black uppercase transform -rotate-1",
    navCta: "bg-black dark:bg-white text-white dark:text-black border-4 border-black dark:border-white font-black uppercase rounded-none shadow-[8px_8px_0_0_rgba(255,255,255,1)] dark:shadow-[8px_8px_0_0_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[10px_10px_0_0_rgba(255,255,255,1)] dark:hover:shadow-[10px_10px_0_0_rgba(0,0,0,1)] transition-all duration-200 hover:rotate-1",
    
    footerBg: "bg-white dark:bg-black border-t-8 border-black dark:border-white",
    footerText: "text-black dark:text-white font-bold tracking-wide drop-shadow-[2px_2px_0_rgba(255,255,255,1)] dark:drop-shadow-[2px_2px_0_rgba(0,0,0,1)]",
    footerBorder: "border-t-8 border-black dark:border-white shadow-[inset_0_8px_0_0_rgba(0,0,0,0.2)] dark:shadow-[inset_0_8px_0_0_rgba(255,255,255,0.2)]",
    
    inputBg: "bg-white dark:bg-black text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-600 font-bold border-6 border-black dark:border-white rounded-none",
    inputBorder: "border-6 border-black dark:border-white rounded-none shadow-[8px_8px_0_0_rgba(0,0,0,1)] dark:shadow-[8px_8px_0_0_rgba(255,255,255,1)]",
    inputFocus: "focus:ring-0 focus:outline-none focus:shadow-[12px_12px_0_0_rgba(0,0,0,1)] dark:focus:shadow-[12px_12px_0_0_rgba(255,255,255,1)] focus:translate-x-[-2px] focus:translate-y-[-2px] transition-all duration-200",
  },
  {
    id: "retro-y2k",
    name: "Vaporwave Y2K",
    layout: "retro",
    pageBg: "bg-gradient-to-br from-pink-300 via-purple-400 via-blue-400 to-cyan-300 dark:bg-gradient-to-br dark:from-pink-900 dark:via-purple-900 dark:via-blue-900 dark:to-cyan-900",
    textPrimary: "text-purple-900 dark:text-pink-200 font-mono font-bold drop-shadow-[2px_2px_0px_#fff] dark:drop-shadow-[2px_2px_0px_#ff00ff]",
    textSecondary: "text-purple-700 dark:text-cyan-300 font-mono",
    accentColor: "text-fuchsia-600 dark:text-cyan-300 font-black drop-shadow-[3px_3px_0px_#00ffff] dark:drop-shadow-[3px_3px_0px_#ff00ff] animate-pulse",
    borderStyle: "border-4 border-dashed border-fuchsia-500 dark:border-cyan-400 shadow-[0_0_30px_rgba(255,0,255,0.5)] dark:shadow-[0_0_30px_rgba(0,255,255,0.5)]",
    
    heroBg: "from-pink-300 via-purple-400 via-blue-400 to-cyan-300 dark:from-pink-900 dark:via-purple-900 dark:via-blue-900 dark:to-cyan-900",
    heroGlow: "bg-gradient-to-r from-fuchsia-500/60 via-purple-500/60 to-cyan-500/60 blur-3xl",
    heroAccent: "text-fuchsia-600 dark:text-cyan-300 font-black drop-shadow-[4px_4px_0px_#00ffff] dark:drop-shadow-[4px_4px_0px_#ff00ff] animate-pulse text-shadow-glow",
    heroButton: "bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 text-white dark:text-black font-black uppercase rounded-full border-4 border-white dark:border-cyan-200 shadow-[0_0_40px_rgba(255,0,255,0.8)] hover:shadow-[0_0_60px_rgba(255,0,255,1)] hover:scale-110 hover:rotate-3 transition-all duration-500 animate-pulse",
    heroPanel: "bg-white/90 dark:bg-black/90 backdrop-blur-xl border-4 border-dashed border-fuchsia-500 dark:border-cyan-500 rounded-3xl shadow-[10px_10px_0_0_rgba(255,0,255,0.5)] dark:shadow-[10px_10px_0_0_rgba(0,255,255,0.5)]",
    heroDot: "bg-fuchsia-500 dark:bg-cyan-400 border-2 border-white dark:border-black rounded-sm shadow-[0_0_20px_currentColor] animate-pulse",
    
    cardBg: "bg-gradient-to-b from-white/95 to-pink-100/90 dark:from-purple-900/95 dark:to-black/90 backdrop-blur-lg rounded-3xl border-2 border-fuchsia-300 dark:border-cyan-600",
    cardBorder: "border-2 border-solid border-fuchsia-300 dark:border-cyan-600 shadow-[0_0_25px_rgba(255,0,255,0.3)] dark:shadow-[0_0_25px_rgba(0,255,255,0.3)]",
    cardShadow: "shadow-[8px_8px_0_0_rgba(255,153,255,1)] dark:shadow-[8px_8px_0_0_rgba(0,255,255,0.6)]",
    cardHover: "hover:-translate-y-4 hover:translate-x-2 hover:shadow-[15px_15px_0_0_rgba(0,255,255,0.8)] dark:hover:shadow-[15px_15px_0_0_rgba(255,0,255,0.8)] hover:border-cyan-400 dark:hover:border-fuchsia-400 hover:rotate-2 hover:scale-105 transition-all duration-500",
    
    tagBg: "bg-gradient-to-r from-cyan-200 to-fuchsia-200 dark:from-fuchsia-800 to-cyan-800 rounded-full border-2 border-fuchsia-400 dark:border-cyan-400",
    tagText: "text-purple-900 dark:text-cyan-100 font-bold font-mono text-xs uppercase tracking-widest drop-shadow-md",
    tagBorder: "border-2 border-fuchsia-400 dark:border-cyan-400 shadow-[0_0_15px_rgba(255,0,255,0.4)] dark:shadow-[0_0_15px_rgba(0,255,255,0.4)]",
    
    btnPrimary: "bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 text-white dark:text-black font-black uppercase rounded-full border-3 border-white dark:border-cyan-200 shadow-[0_0_30px_rgba(255,0,255,0.7)] hover:shadow-[0_0_50px_rgba(255,0,255,1)] hover:scale-110 hover:rotate-2 transition-all duration-500 animate-pulse",
    btnSecondary: "bg-transparent text-purple-800 dark:text-cyan-200 font-bold uppercase rounded-full border-3 border-fuchsia-500 dark:border-cyan-500 hover:bg-fuchsia-100/50 dark:hover:bg-cyan-900/50 hover:shadow-[0_0_25px_rgba(255,0,255,0.5)] dark:hover:shadow-[0_0_25px_rgba(0,255,255,0.5)] transition-all duration-500",
    
    navBg: "bg-pink-200/90 dark:bg-purple-900/90 backdrop-blur-xl border-b-3 border-fuchsia-300 dark:border-cyan-600 shadow-[0_5px_30px_rgba(255,0,255,0.2)] dark:shadow-[0_5px_30px_rgba(0,255,255,0.2)]",
    navText: "text-purple-800 dark:text-cyan-200 font-mono hover:text-fuchsia-600 dark:hover:text-cyan-100 hover:drop-shadow-[0_0_15px_rgba(255,0,255,0.8)] dark:hover:drop-shadow-[0_0_15px_rgba(0,255,255,0.8)] transition-all duration-300",
    navActive: "text-fuchsia-600 dark:text-cyan-300 font-bold border-b-2 border-dashed border-current drop-shadow-[0_0_10px_currentColor]",
    navCta: "bg-gradient-to-r from-cyan-400 to-fuchsia-500 dark:from-fuchsia-600 dark:to-cyan-400 text-white dark:text-black font-bold font-mono rounded-full border-2 border-white dark:border-fuchsia-300 shadow-[4px_4px_0_0_rgba(255,0,255,0.6)] dark:shadow-[4px_4px_0_0_rgba(0,255,255,0.6)] hover:shadow-[6px_6px_0_0_rgba(255,0,255,0.8)] dark:hover:shadow-[6px_6px_0_0_rgba(0,255,255,0.8)] transition-all duration-300",
    
    footerBg: "bg-pink-100 dark:bg-purple-950 border-t-3 border-fuchsia-300 dark:border-cyan-600",
    footerText: "text-purple-800 dark:text-cyan-300 font-mono",
    footerBorder: "border-t-3 border-dashed border-fuchsia-400 dark:border-cyan-600 shadow-[0_-5px_30px_rgba(255,0,255,0.2)] dark:shadow-[0_-5px_30px_rgba(0,255,255,0.2)]",
    
    inputBg: "bg-white/90 dark:bg-purple-900/90 text-purple-900 dark:text-cyan-200 font-mono placeholder-purple-400 dark:placeholder-cyan-700 rounded-2xl border-3 border-fuchsia-300 dark:border-cyan-600",
    inputBorder: "border-3 border-solid border-fuchsia-300 dark:border-cyan-600 shadow-[0_0_20px_rgba(255,0,255,0.2)] dark:shadow-[0_0_20px_rgba(0,255,255,0.2)]",
    inputFocus: "focus:ring-4 focus:ring-fuchsia-400/50 dark:focus:ring-cyan-400/50 focus:border-fuchsia-500 dark:focus:border-cyan-400 focus:shadow-[0_0_40px_rgba(255,0,255,0.6)] dark:focus:shadow-[0_0_40px_rgba(0,255,255,0.6)] outline-none transition-all duration-500",
  },
  {
    id: "material-design",
    name: "Material You 3.0",
    layout: "material",
    pageBg: "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:bg-gradient-to-br dark:from-slate-900 dark:via-blue-950 dark:to-indigo-950",
    textPrimary: "text-slate-900 dark:text-blue-50 font-medium",
    textSecondary: "text-slate-600 dark:text-blue-200/80 font-normal",
    accentColor: "text-blue-600 dark:text-blue-300",
    borderStyle: "border border-blue-200/50 dark:border-blue-800/50",
    
    heroBg: "from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-blue-950 dark:to-indigo-950",
    heroGlow: "bg-gradient-to-r from-blue-400/20 via-indigo-400/20 to-purple-400/20 blur-2xl",
    heroAccent: "text-blue-600 dark:text-blue-300 font-semibold",
    heroButton: "bg-blue-600 text-white dark:bg-blue-500 dark:text-slate-900 hover:shadow-xl hover:shadow-blue-500/25 hover:bg-blue-700 dark:hover:bg-blue-400 rounded-full font-medium transition-all duration-500 hover:scale-105",
    heroPanel: "bg-blue-100/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl border border-blue-200/50 dark:border-blue-800/50 shadow-xl shadow-blue-500/10",
    heroDot: "bg-blue-600 dark:bg-blue-400",
    
    cardBg: "bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl border border-blue-100/50 dark:border-blue-900/50",
    cardBorder: "border border-blue-100/50 dark:border-blue-900/50",
    cardShadow: "shadow-lg shadow-blue-500/5 dark:shadow-xl dark:shadow-black/20",
    cardHover: "hover:shadow-2xl hover:shadow-blue-500/20 dark:hover:shadow-black/40 hover:bg-white dark:hover:bg-slate-700/90 hover:-translate-y-2 hover:border-blue-300/50 dark:hover:border-blue-700/50 transition-all duration-500",
    
    tagBg: "bg-blue-100/80 dark:bg-blue-900/50 backdrop-blur-sm rounded-2xl border border-blue-200/50 dark:border-blue-800/50",
    tagText: "text-blue-700 dark:text-blue-200 font-medium text-sm",
    tagBorder: "border border-blue-200/50 dark:border-blue-800/50",
    
    btnPrimary: "bg-blue-600 text-white dark:bg-blue-500 dark:text-slate-900 hover:shadow-xl hover:shadow-blue-500/30 hover:bg-blue-700 dark:hover:bg-blue-400 rounded-full px-8 py-3 font-medium transition-all duration-500 hover:scale-110",
    btnSecondary: "bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-200 border border-blue-200 dark:border-blue-700 rounded-full px-8 py-3 font-medium hover:bg-blue-100 dark:hover:bg-blue-800/50 hover:shadow-lg transition-all duration-500",
    
    navBg: "bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border-b border-blue-100/50 dark:border-blue-900/50 shadow-sm shadow-blue-500/5",
    navText: "text-slate-600 dark:text-blue-200 hover:text-blue-600 dark:hover:text-blue-100 font-medium transition-all duration-300",
    navActive: "text-blue-600 dark:text-blue-300 font-semibold",
    navCta: "bg-blue-600 text-white dark:bg-blue-500 dark:text-slate-900 rounded-full font-medium shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105 transition-all duration-500",
    
    footerBg: "bg-blue-50/80 dark:bg-slate-800/80 backdrop-blur-xl border-t border-blue-100/50 dark:border-blue-900/50",
    footerText: "text-slate-600 dark:text-blue-200/80",
    footerBorder: "border-none",
    
    inputBg: "bg-blue-50/80 dark:bg-slate-800/80 text-slate-900 dark:text-blue-50 placeholder-slate-500/70 dark:placeholder-blue-300/70 rounded-2xl border border-blue-200/50 dark:border-blue-800/50 backdrop-blur-sm",
    inputBorder: "border border-blue-200/50 dark:border-blue-800/50",
    inputFocus: "focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 focus:bg-white dark:focus:bg-slate-700/80 focus:shadow-lg outline-none transition-all duration-500",
  },
  {
    id: "apple-inspired",
    name: "Apple Vision Pro",
    layout: "apple",
    pageBg: "bg-gradient-to-br from-gray-100 via-white to-gray-50 dark:bg-gradient-to-br dark:from-black dark:via-gray-950 dark:to-black",
    textPrimary: "text-gray-900 dark:text-white font-medium tracking-tight",
    textSecondary: "text-gray-600 dark:text-gray-300 font-normal",
    accentColor: "text-blue-600 dark:text-blue-400",
    borderStyle: "border border-gray-200/50 dark:border-gray-800/50",
    
    heroBg: "from-gray-100 via-white to-gray-50 dark:from-black dark:via-gray-950 dark:to-black",
    heroGlow: "bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-3xl",
    heroAccent: "text-blue-600 dark:text-blue-400 font-semibold",
    heroButton: "bg-blue-600 text-white dark:bg-blue-500 dark:text-white hover:bg-blue-700 dark:hover:bg-blue-400 rounded-full font-medium tracking-wide shadow-lg hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-700 hover:scale-105",
    heroPanel: "bg-white/80 dark:bg-gray-900/80 backdrop-blur-3xl rounded-3xl border border-gray-200/30 dark:border-gray-800/30 shadow-2xl shadow-black/5 dark:shadow-black/30",
    heroDot: "bg-blue-600 dark:bg-blue-400 shadow-lg shadow-blue-500/50",
    
    cardBg: "bg-white/90 dark:bg-gray-900/90 backdrop-blur-2xl rounded-3xl border border-gray-200/30 dark:border-gray-800/30",
    cardBorder: "border border-gray-200/30 dark:border-gray-800/30",
    cardShadow: "shadow-xl shadow-black/5 dark:shadow-black/20",
    cardHover: "hover:shadow-2xl hover:shadow-black/10 dark:hover:shadow-black/40 hover:bg-white dark:hover:bg-gray-800/90 hover:-translate-y-2 hover:border-gray-300/50 dark:hover:border-gray-700/50 transition-all duration-700",
    
    tagBg: "bg-gray-100/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full border border-gray-200/50 dark:border-gray-700/50",
    tagText: "text-gray-700 dark:text-gray-200 text-xs font-medium tracking-wide",
    tagBorder: "border border-gray-200/50 dark:border-gray-700/50",
    
    btnPrimary: "bg-blue-600 text-white dark:bg-blue-500 dark:text-white hover:bg-blue-700 dark:hover:bg-blue-400 rounded-full px-8 py-3 font-medium tracking-wide shadow-lg hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-700 hover:scale-110",
    btnSecondary: "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100 rounded-full px-8 py-3 font-medium tracking-wide hover:bg-gray-200 dark:hover:bg-gray-700 hover:shadow-lg transition-all duration-700",
    
    navBg: "bg-white/70 dark:bg-black/70 backdrop-blur-3xl border-b border-gray-200/30 dark:border-gray-800/30 shadow-sm shadow-black/5",
    navText: "text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white text-sm font-medium tracking-wide transition-all duration-500",
    navActive: "text-gray-900 dark:text-white font-semibold",
    navCta: "bg-blue-600 text-white dark:bg-blue-500 dark:text-white rounded-full font-medium shadow-md hover:shadow-lg hover:shadow-blue-500/30 hover:bg-blue-700 dark:hover:bg-blue-400 transition-all duration-700",
    
    footerBg: "bg-gray-100/80 dark:bg-gray-900/80 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-800/50",
    footerText: "text-gray-600 dark:text-gray-400",
    footerBorder: "border-t border-gray-200/50 dark:border-gray-800/50",
    
    inputBg: "bg-white/90 dark:bg-gray-900/90 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-2xl border border-gray-200/50 dark:border-gray-800/50 backdrop-blur-xl",
    inputBorder: "border border-gray-200/50 dark:border-gray-800/50",
    inputFocus: "focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 focus:bg-white dark:focus:bg-gray-800/90 focus:shadow-xl outline-none transition-all duration-700",
  },
  {
    id: "neumorphism",
    name: "Soft Neumorphism 2.0",
    layout: "neumorphism",
    pageBg: "bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100 dark:bg-gradient-to-br dark:from-slate-800 dark:via-slate-900 dark:to-slate-800",
    textPrimary: "text-slate-800 dark:text-slate-100 font-medium",
    textSecondary: "text-slate-600 dark:text-slate-300",
    accentColor: "text-indigo-600 dark:text-indigo-400",
    borderStyle: "border border-transparent",
    
    heroBg: "from-blue-100 via-indigo-50 to-purple-100 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800",
    heroGlow: "bg-gradient-to-r from-indigo-400/20 via-purple-400/20 to-blue-400/20 blur-2xl",
    heroAccent: "text-indigo-600 dark:text-indigo-400 font-semibold",
    heroButton: "bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-slate-800 dark:to-slate-700 text-indigo-700 dark:text-indigo-300 font-semibold rounded-2xl border border-transparent shadow-[12px_12px_24px_rgba(79,70,229,0.15),-12px_-12px_24px_rgba(255,255,255,0.8)] dark:shadow-[8px_8px_16px_#1e293b,-8px_-8px_16px_#475569] hover:shadow-[inset_8px_8px_16px_rgba(79,70,229,0.2),inset_-8px_-8px_16px_rgba(255,255,255,0.9)] dark:hover:shadow-[inset_6px_6px_12px_#1e293b,inset_-6px_-6px_12px_#475569] transition-all duration-500 hover:scale-105",
    heroPanel: "bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-800 dark:to-slate-700 rounded-3xl border border-transparent shadow-[15px_15px_30px_rgba(79,70,229,0.15),-15px_-15px_30px_rgba(255,255,255,0.9)] dark:shadow-[10px_10px_20px_#1e293b,-10px_-10px_20px_#475569]",
    heroDot: "bg-indigo-500 dark:bg-indigo-400 shadow-lg shadow-indigo-500/50",
    
    cardBg: "bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-800 dark:to-slate-700 rounded-3xl",
    cardBorder: "border border-transparent",
    cardShadow: "shadow-[12px_12px_24px_rgba(79,70,229,0.1),-12px_-12px_24px_rgba(255,255,255,0.8)] dark:shadow-[8px_8px_16px_#1e293b,-8px_-8px_16px_#475569]",
    cardHover: "hover:shadow-[6px_6px_12px_rgba(79,70,229,0.15),-6px_-6px_12px_rgba(255,255,255,0.9)] dark:hover:shadow-[4px_4px_8px_#1e293b,-4px_-4px_8px_#475569] hover:-translate-y-2 hover:bg-gradient-to-br hover:from-indigo-50 hover:to-blue-100 dark:hover:from-slate-700 dark:hover:to-slate-600 transition-all duration-500",
    
    tagBg: "bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-slate-800 dark:to-slate-700 rounded-full shadow-[inset_6px_6px_12px_rgba(79,70,229,0.1),inset_-6px_-6px_12px_rgba(255,255,255,0.8)] dark:shadow-[inset_4px_4px_8px_#1e293b,inset_-4px_-4px_8px_#475569]",
    tagText: "text-indigo-700 dark:text-indigo-300 font-medium text-sm",
    tagBorder: "border border-transparent",
    
    btnPrimary: "bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-slate-800 dark:to-slate-700 text-indigo-700 dark:text-indigo-300 font-semibold border border-transparent rounded-2xl shadow-[12px_12px_24px_rgba(79,70,229,0.15),-12px_-12px_24px_rgba(255,255,255,0.8)] dark:shadow-[8px_8px_16px_#1e293b,-8px_-8px_16px_#475569] hover:shadow-[inset_8px_8px_16px_rgba(79,70,229,0.2),inset_-8px_-8px_16px_rgba(255,255,255,0.9)] dark:hover:shadow-[inset_6px_6px_12px_#1e293b,inset_-6px_-6px_12px_#475569] transition-all duration-500 hover:scale-105",
    btnSecondary: "bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-slate-700 dark:to-slate-800 text-slate-700 dark:text-slate-200 font-semibold border border-transparent rounded-2xl shadow-[8px_8px_16px_rgba(79,70,229,0.1),-8px_-8px_16px_rgba(255,255,255,0.8)] dark:shadow-[6px_6px_12px_#1e293b,-6px_-6px_12px_#475569] hover:shadow-[inset_6px_6px_12px_rgba(79,70,229,0.15),inset_-6px_-6px_12px_rgba(255,255,255,0.9)] dark:hover:shadow-[inset_4px_4px_8px_#1e293b,inset_-4px_-4px_8px_#475569] transition-all duration-500",
    
    navBg: "bg-gradient-to-r from-blue-100/90 to-indigo-100/90 dark:from-slate-800/90 dark:to-slate-700/90 backdrop-blur-xl shadow-[0_6px_20px_rgba(79,70,229,0.1)] dark:shadow-[0_6px_20px_rgba(0,0,0,0.3)] border-b border-transparent",
    navText: "text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-all duration-300",
    navActive: "text-indigo-600 dark:text-indigo-400 font-bold shadow-[inset_4px_4px_8px_rgba(79,70,229,0.1),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] dark:shadow-[inset_3px_3px_6px_#1e293b,inset_-3px_-3px_6px_#475569] px-4 py-2 rounded-xl",
    navCta: "bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-slate-800 dark:to-slate-700 text-indigo-700 dark:text-indigo-300 font-bold rounded-xl border border-transparent shadow-[6px_6px_12px_rgba(79,70,229,0.15),-6px_-6px_12px_rgba(255,255,255,0.8)] dark:shadow-[4px_4px_8px_#1e293b,-4px_-4px_8px_#475569] hover:shadow-[inset_4px_4px_8px_rgba(79,70,229,0.1),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] dark:hover:shadow-[inset_3px_3px_6px_#1e293b,inset_-3px_-3px_6px_#475569] transition-all duration-500",
    
    footerBg: "bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-slate-800 dark:to-slate-700 shadow-[inset_0_6px_20px_rgba(79,70,229,0.1)] dark:shadow-[inset_0_6px_20px_rgba(0,0,0,0.2)]",
    footerText: "text-slate-600 dark:text-slate-300",
    footerBorder: "border border-transparent",
    
    inputBg: "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 text-slate-700 dark:text-slate-200 placeholder-slate-500 dark:placeholder-slate-400 rounded-2xl shadow-[inset_8px_8px_16px_rgba(79,70,229,0.1),inset_-8px_-8px_16px_rgba(255,255,255,0.8)] dark:shadow-[inset_6px_6px_12px_#1e293b,inset_-6px_-6px_12px_#475569]",
    inputBorder: "border border-transparent",
    inputFocus: "focus:outline-none focus:ring-4 focus:ring-indigo-400/30 dark:focus:ring-indigo-500/30 focus:shadow-[inset_10px_10px_20px_rgba(79,70,229,0.15),inset_-10px_-10px_20px_rgba(255,255,255,0.9)] dark:focus:shadow-[inset_8px_8px_16px_#1e293b,inset_-8px_-8px_16px_#475569] transition-all duration-500",
  },
  {
    id: "micro-animations",
    name: "Animated Elegance",
    layout: "micro-animations",
    pageBg: "bg-gradient-to-br from-slate-50 via-white to-gray-50 dark:bg-gradient-to-br dark:from-gray-950 dark:via-black dark:to-slate-950",
    textPrimary: "text-gray-900 dark:text-gray-50 font-medium",
    textSecondary: "text-gray-600 dark:text-gray-400",
    accentColor: "text-indigo-600 dark:text-indigo-400",
    borderStyle: "border border-gray-200/50 dark:border-gray-800/50",
    
    heroBg: "bg-gradient-to-br from-slate-50 via-white to-gray-50 dark:from-gray-950 dark:via-black dark:to-slate-950",
    heroGlow: "bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 blur-3xl animate-pulse",
    heroAccent: "text-indigo-600 dark:text-indigo-400 transition-all duration-500 hover:scale-105 hover:text-indigo-500 dark:hover:text-indigo-300",
    heroButton: "bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400 transition-all duration-500 rounded-full shadow-lg hover:shadow-xl hover:shadow-indigo-500/25 hover:scale-110 hover:-translate-y-1 active:scale-95",
    heroPanel: "bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl border border-gray-200/30 dark:border-gray-800/30 shadow-xl transition-all duration-700 hover:shadow-2xl hover:-translate-y-2 hover:border-indigo-300/50 dark:hover:border-indigo-700/50",
    heroDot: "bg-indigo-500 dark:bg-indigo-400 animate-pulse shadow-lg shadow-indigo-500/50",
    
    cardBg: "bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-3xl border border-gray-200/30 dark:border-gray-800/30 transition-all duration-500",
    cardBorder: "border border-gray-200/30 dark:border-gray-800/30 transition-all duration-500",
    cardShadow: "shadow-lg shadow-gray-200/50 dark:shadow-black/20 transition-all duration-500",
    cardHover: "hover:border-indigo-300/50 dark:hover:border-indigo-700/50 hover:shadow-xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-500/5 hover:-translate-y-3 hover:scale-105 hover:bg-white dark:hover:bg-gray-800/95 transition-all duration-700 group-hover:animate-pulse",
    
    tagBg: "bg-indigo-50/80 dark:bg-indigo-500/10 backdrop-blur-sm rounded-full border border-indigo-200/50 dark:border-indigo-800/50 transition-all duration-300",
    tagText: "text-indigo-700 dark:text-indigo-300 font-medium text-sm transition-all duration-300",
    tagBorder: "border-indigo-200/50 dark:border-indigo-800/50 transition-all duration-300",
    
    btnPrimary: "bg-indigo-600 text-white font-medium rounded-full hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400 transition-all duration-500 shadow-lg hover:shadow-xl hover:shadow-indigo-500/30 hover:scale-110 hover:-translate-y-1 active:scale-95 active:translate-y-0",
    btnSecondary: "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-medium rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-500 hover:scale-105 hover:-translate-y-0.5 active:scale-95 shadow-md hover:shadow-lg",
    
    navBg: "bg-white/70 dark:bg-gray-950/70 backdrop-blur-2xl border-b border-gray-200/30 dark:border-gray-800/30 transition-all duration-300",
    navText: "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-all duration-300 hover:scale-105 hover:-translate-y-0.5",
    navActive: "text-indigo-600 dark:text-indigo-400 font-medium transition-all duration-300 scale-105",
    navCta: "bg-indigo-600 text-white rounded-full font-medium shadow-md hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-500 hover:scale-110 hover:-translate-y-1 active:scale-95",
    
    footerBg: "bg-white/90 dark:bg-gray-950/90 backdrop-blur-xl border-t border-gray-200/30 dark:border-gray-800/30",
    footerText: "text-gray-600 dark:text-gray-400 transition-all duration-300",
    footerBorder: "border-t border-gray-200/30 dark:border-gray-800/30",
    
    inputBg: "bg-gray-100/80 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm transition-all duration-500",
    inputBorder: "border-gray-200/50 dark:border-gray-700/50 transition-all duration-500",
    inputFocus: "focus:bg-white dark:focus:bg-gray-700/80 focus:ring-4 focus:ring-indigo-500/20 dark:focus:ring-indigo-400/20 focus:border-indigo-500/50 dark:focus:border-indigo-400/50 focus:shadow-lg focus:scale-105 outline-none transition-all duration-700",
  }
];

export const getTheme = (index: number): DesignTheme => {
  return themes[index % themes.length];
};
