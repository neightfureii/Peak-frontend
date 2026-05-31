export const CustomLogo = () => {
  return (
    <div className="flex items-center gap-2 overflow-hidden">
      <img 
        src="/images/Peak_logo.png" 
        alt="peak-logo" 
        className="size-8 shrink-0" 
      />
    </div>
  );
};

export const CustomTitle = () => {
  return (
    <div className="flex items-center gap-2 overflow-hidden">
      <span className="font-bold text-3xl text-foreground whitespace-nowrap transition-all duration-200">
        PEAK
      </span>
    </div>
  );
};

export const CustomHeader = () => {
  return (
    <><CustomLogo /><CustomTitle /></>
  );
};
