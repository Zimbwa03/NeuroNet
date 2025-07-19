import logoImage from "@assets/logo.png";

interface BrainLogoProps {
  className?: string;
}

export default function BrainLogo({ className = "w-10 h-10" }: BrainLogoProps) {
  return (
    <img 
      src={logoImage} 
      alt="NeuroNet AI Solutions Logo" 
      className={`brain-glow ${className} object-contain`}
    />
  );
}
