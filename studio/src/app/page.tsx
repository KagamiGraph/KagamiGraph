import Sidebar from "@/components/Sidebar";
import DataUploader from "@/components/DataUploader";
import PersonaCard from "@/components/PersonaCard";

export default function Home() {
  return (
    <div className="flex h-screen bg-neutral-950 text-neutral-50 overflow-hidden font-sans">
      <Sidebar />
      
      <main className="flex-1 flex flex-col h-screen overflow-y-auto">
        <header className="h-16 border-b border-neutral-800 px-8 flex items-center justify-between sticky top-0 bg-neutral-950 z-10">
          <h2 className="text-lg font-medium">Data Ingestion Overview</h2>
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <span className="text-sm font-mono text-neutral-400 uppercase tracking-wider">Engine: Connected</span>
          </div>
        </header>
        
        <div className="p-8 max-w-6xl w-full mx-auto space-y-8">
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-neutral-400 uppercase tracking-widest">New Source</h3>
            </div>
            <DataUploader />
          </section>

          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-neutral-400 uppercase tracking-widest">Recently Discovered Personas</h3>
              <button className="text-xs text-neutral-500 hover:text-neutral-50 transition-colors font-mono">View All</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <PersonaCard 
                id="PR-A12" 
                name="Frustrated Enterprise Admins" 
                clusterSize={1432} 
              />
              <PersonaCard 
                id="PR-B45" 
                name="Confused Onboarding Users" 
                clusterSize={892} 
              />
              <PersonaCard 
                id="PR-C99" 
                name="Power Users Req. Features" 
                clusterSize={341} 
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
