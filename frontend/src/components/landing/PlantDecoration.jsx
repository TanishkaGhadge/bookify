export default function PlantDecoration() {
  return (
    <div className="flex items-center justify-center relative">
      <div className="w-96 h-96 rounded-[2rem] overflow-hidden shadow-[0_20px_40px_rgba(60,40,25,0.15)] transform transition-transform duration-700 hover:scale-[1.02] hover:-rotate-1">
        <img 
          src="/cozy_cafe.png" 
          alt="Cozy Cafe Reading" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-[2rem]"></div>
      </div>
    </div>
  );
}