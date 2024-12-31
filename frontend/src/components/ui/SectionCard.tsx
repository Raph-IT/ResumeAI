export const SectionCard = ({ 
  title, 
  icon, 
  completion, 
  children 
}: SectionCardProps) => {
  return (
    <div className="group relative">
      {/* Effet de brillance au survol */}
      <div className="absolute -inset-px opacity-0 group-hover:opacity-100 
        bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 
        rounded-xl blur-sm transition-opacity" />
      
      <div className="relative bg-gray-900/50 rounded-xl p-6 border border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              {icon}
            </div>
            <h3 className="text-lg font-medium text-white">{title}</h3>
          </div>
          
          {/* Indicateur de progression */}
          <div className="w-24 h-1 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 
              transition-all duration-500"
              style={{ width: `${completion}%` }} 
            />
          </div>
        </div>
        
        {children}
      </div>
    </div>
  );
}; 