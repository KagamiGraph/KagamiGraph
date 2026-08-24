import { CheckSquare, Square } from "lucide-react";

export default function PersonaSelector() {
  const personas = [
    { id: "PR-A12", name: "Frustrated Enterprise Admins", active: true },
    { id: "PR-B45", name: "Confused Onboarding Users", active: false },
    { id: "PR-C99", name: "Power Users Req. Features", active: true },
  ];

  return (
    <aside className="w-72 border-r border-neutral-800 bg-neutral-950 h-full flex flex-col">
      <div className="p-4 border-b border-neutral-800">
        <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Active Focus Group</h3>
      </div>
      <div className="p-4 space-y-3 flex-1 overflow-y-auto">
        {personas.map(p => (
          <div key={p.id} className="flex items-start gap-3 p-3 border border-neutral-800 hover:border-neutral-700 cursor-pointer transition-colors bg-neutral-900/30">
            {p.active ? <CheckSquare className="w-4 h-4 text-green-500 mt-0.5 shrink-0" /> : <Square className="w-4 h-4 text-neutral-600 mt-0.5 shrink-0" />}
            <div>
              <div className="text-xs font-mono text-neutral-500">{p.id}</div>
              <div className={`text-sm mt-1 ${p.active ? 'text-neutral-50' : 'text-neutral-400'}`}>{p.name}</div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
