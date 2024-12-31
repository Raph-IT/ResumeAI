export const ImportCV = () => {
  return (
    <div className="relative group cursor-pointer">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 
        rounded-xl blur-xl transition-opacity opacity-0 group-hover:opacity-100" />
      
      <div className="relative p-8 border-2 border-dashed border-gray-700 rounded-xl 
        hover:border-blue-500/50 transition-all">
        <div className="flex items-center gap-6">
          <div className="p-4 bg-blue-500/10 rounded-xl">
            <Upload className="w-8 h-8 text-blue-400" />
          </div>
          
          <div className="flex-grow">
            <h3 className="text-lg font-medium text-white mb-1">
              Démarrez avec votre CV
            </h3>
            <p className="text-gray-400">
              Importez votre CV pour remplir automatiquement votre profil
            </p>
          </div>
          
          <div className="flex items-center gap-2 text-blue-400">
            <span>Importer</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}; 