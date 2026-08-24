import { Database, Users, LineChart, Settings, HardDriveUpload } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 border-r border-neutral-800 bg-neutral-950 h-screen flex flex-col">
      <div className="p-6 border-b border-neutral-800">
        <h1 className="text-xl font-bold tracking-tight flex items-center gap-2">
          <Database className="w-5 h-5 text-neutral-400" />
          KagamiGraph
        </h1>
        <p className="text-xs text-neutral-500 mt-1 uppercase tracking-wider font-mono">
          BYOD Persona Engine
        </p>
      </div>

      <nav className="flex-1 py-6 px-4 space-y-1">
        <a href="/" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-neutral-400 hover:text-neutral-50 hover:bg-neutral-900/50 transition-colors">
          <HardDriveUpload className="w-4 h-4 text-neutral-400" />
          Data Ingestion
        </a>
        <a href="/" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-neutral-400 hover:text-neutral-50 hover:bg-neutral-900/50 transition-colors">
          <Users className="w-4 h-4" />
          Discovered Personas
        </a>
        <a href="/simulate" className="flex items-center gap-3 px-3 py-2 text-sm font-medium bg-neutral-900 border border-neutral-800 text-neutral-50">
          <LineChart className="w-4 h-4" />
          Simulations
        </a>
      </nav>

      <div className="p-4 border-t border-neutral-800">
        <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-neutral-400 hover:text-neutral-50 hover:bg-neutral-900/50 transition-colors">
          <Settings className="w-4 h-4" />
          Settings
        </a>
      </div>
    </aside>
  );
}
