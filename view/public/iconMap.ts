import type { ComponentType } from "react";
import { BookOpen, Calculator, ExternalLink, Globe2, Heart, HelpCircle, Layers, Map, MessageCircle, Users } from "lucide-react";
import { SiDiscord, SiFacebook, SiReddit, SiYoutube } from "react-icons/si";
import { ShowChart, TravelExplore } from "@mui/icons-material";

export const iconMap: Record<string, ComponentType<{ size?: number }>> = {
    BookOpen,
    Calculator,
    ExternalLink,
    Globe2,
    Heart, HelpCircle,
    Layers,
    Map, MessageCircle,
    ShowChart, SiReddit, SiDiscord, SiFacebook, SiYoutube,
    TravelExplore,
    Users
};