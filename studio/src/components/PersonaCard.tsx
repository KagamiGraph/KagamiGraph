import { Users, FileText } from "lucide-react";

interface PersonaCardProps {
  id: str;
  name: str;
  clusterSize: number;
}

export default function PersonaCard({ id, name, clusterSize }: PersonaCardProps) {
  return (
    <div className="border border-neutral-800 bg-neutral-950 p-5 hover:border-neutral-700 hover:bg-neutral-900/50 transition-colors cursor-pointer group">
      <div className="flex items-start justify-between mb-4">
        <div>
          <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider">{id}</span>
          <h4 className="text-base font-semibold text-neutral-50 mt-1">{name}</h4>
        </div>
        <div className="w-8 h-8 bg-neutral-900 border border-neutral-800 flex items-center justify-center group-hover:bg-neutral-800 transition-colors">
          <Users className="w-4 h-4 text-neutral-400 group-hover:text-neutral-50" />
        </div>
      </div>
      
      <div className="flex items-center gap-4 text-xs font-mono text-neutral-400 pt-4 border-t border-neutral-800/50">
        <div className="flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5" />
          {clusterSize} DATA POINTS
        </div>
        <div className="flex items-center gap-1.5 text-green-500">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
          ACTIVE
        </div>
      </div>
    </div>
  );
}
