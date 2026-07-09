import React from 'react';
import { 
  MdPool, MdFitnessCenter, MdSpa, MdOutlineTheaterComedy, 
  MdGames, MdLocalDining, MdElderly, MdNaturePeople,
  MdVideocam, MdElectricBolt, MdLocalFireDepartment,
  MdCheckCircle, MdOutlineLocalParking, MdOutlineElevator,
  MdSecurity, MdWifi, MdChildCare
} from 'react-icons/md';

const AMENITY_MAP = [
  { keywords: ['pool', 'swimming'], icon: MdPool, color: 'text-cyan-500', bg: 'bg-cyan-50' },
  { keywords: ['gym', 'fitness', 'health', 'exercise'], icon: MdFitnessCenter, color: 'text-rose-500', bg: 'bg-rose-50' },
  { keywords: ['yoga', 'meditation', 'spa', 'wellness'], icon: MdSpa, color: 'text-orange-500', bg: 'bg-orange-50' },
  { keywords: ['amphitheatre', 'theater', 'cinema'], icon: MdOutlineTheaterComedy, color: 'text-violet-500', bg: 'bg-violet-50' },
  { keywords: ['game', 'indoor', 'sport', 'tennis', 'badminton'], icon: MdGames, color: 'text-blue-500', bg: 'bg-blue-50' },
  { keywords: ['banquet', 'party', 'celebration', 'hall', 'club'], icon: MdLocalDining, color: 'text-amber-500', bg: 'bg-amber-50' },
  { keywords: ['senior', 'elder', 'citizen'], icon: MdElderly, color: 'text-teal-600', bg: 'bg-teal-50' },
  { keywords: ['garden', 'landscape', 'park', 'nature', 'green'], icon: MdNaturePeople, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { keywords: ['cctv', 'camera', 'video', 'surveillance'], icon: MdVideocam, color: 'text-slate-600', bg: 'bg-slate-100' },
  { keywords: ['power', 'backup', 'electricity', 'generator'], icon: MdElectricBolt, color: 'text-yellow-500', bg: 'bg-yellow-50' },
  { keywords: ['fire', 'extinguisher', 'safety'], icon: MdLocalFireDepartment, color: 'text-red-500', bg: 'bg-red-50' },
  { keywords: ['parking', 'garage', 'car'], icon: MdOutlineLocalParking, color: 'text-indigo-500', bg: 'bg-indigo-50' },
  { keywords: ['elevator', 'lift'], icon: MdOutlineElevator, color: 'text-gray-500', bg: 'bg-gray-100' },
  { keywords: ['security', 'guard'], icon: MdSecurity, color: 'text-sky-500', bg: 'bg-sky-50' },
  { keywords: ['wifi', 'internet', 'broadband'], icon: MdWifi, color: 'text-blue-400', bg: 'bg-blue-50' },
  { keywords: ['child', 'kid', 'play', 'toddler'], icon: MdChildCare, color: 'text-fuchsia-500', bg: 'bg-fuchsia-50' },
];

interface FacilityIconProps {
  name: string;
}

const FacilityIcon: React.FC<FacilityIconProps> = ({ name }) => {
  const normalized = name.toLowerCase();
  const matched = AMENITY_MAP.find(item => item.keywords.some(kw => normalized.includes(kw)));
  
  const Icon = matched ? matched.icon : MdCheckCircle;
  const color = matched ? matched.color : 'text-primary';
  const bg = matched ? matched.bg : 'bg-gray-100';

  return (
    <div className="flex flex-col items-center justify-start text-center gap-3 p-2 group">
      {/* Icon Container */}
      <div className={`relative w-20 h-20 rounded-2xl flex items-center justify-center ${bg} shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-md`}>
        {/* Subtle decorative inner shape for "modern logo" feel */}
        <div className="absolute inset-0 opacity-20 rounded-2xl bg-gradient-to-br from-white/60 to-transparent mix-blend-overlay"></div>
        <Icon size={40} className={`${color} drop-shadow-sm transition-transform duration-300 group-hover:scale-110`} />
      </div>
      
      {/* Label */}
      <span className="text-sm font-medium text-primary max-w-[120px] leading-snug">
        {name}
      </span>
    </div>
  );
};

export default FacilityIcon;
