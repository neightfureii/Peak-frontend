import peakLogo from "../../../../public/images/Peak_logo.png";

export const CustomLogo = () => {
  return (
    <div className="flex items-center gap-2 overflow-hidden">
      <img 
        src={peakLogo} 
        alt="peak-logo" 
        className="size-8 shrink-0" 
      />
    </div>
  );
};

export const CustomTitle = () => {
  return (
    <div className="flex items-center gap-2 overflow-hidden">
      <span className="font-bold text-3xl text-[oklch(0.3651_0.0325_287.0807)] whitespace-nowrap transition-all duration-200">
        PEAK
      </span>
    </div>
  );
};
