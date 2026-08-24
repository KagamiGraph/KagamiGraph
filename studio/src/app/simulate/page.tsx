import Sidebar from "@/components/Sidebar";
import PersonaSelector from "@/components/PersonaSelector";
import ChatLog from "@/components/ChatLog";
import ChatInput from "@/components/ChatInput";

export default function SimulatePage() {
  return (
    <div className="flex h-screen bg-neutral-950 text-neutral-50 overflow-hidden font-sans">
      <Sidebar />
      
      <main className="flex-1 flex h-screen overflow-hidden">
        <PersonaSelector />
        
        <div className="flex-1 flex flex-col relative bg-[#050505]">
          <header className="h-16 border-b border-neutral-800 px-8 flex items-center justify-between bg-neutral-950 shrink-0">
            <h2 className="text-lg font-medium">Simulation Environment</h2>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Session Active</span>
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            </div>
          </header>

          <ChatLog />
          <ChatInput />
        </div>
      </main>
    </div>
  );
}
