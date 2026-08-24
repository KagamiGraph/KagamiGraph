import { SquareTerminal } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "persona";
  personaId?: string;
  text: string;
  timestamp: string;
}

export default function ChatLog() {
  const messages: Message[] = [
    {
      id: "msg-1",
      sender: "user",
      text: "If we changed our core navigation to be entirely search-based instead of using a sidebar, how would that affect your daily workflow?",
      timestamp: "10:41:22 AM"
    },
    {
      id: "msg-2",
      sender: "persona",
      personaId: "PR-A12",
      text: "I would likely hate it. As an Enterprise Admin, I have muscle memory for where the billing and user-management tabs are. If I have to search 'billing' every time I need to revoke a license, it slows me down. I need a structural hierarchy, not just a search bar.",
      timestamp: "10:41:25 AM"
    }
  ];

  return (
    <div className="flex-1 overflow-y-auto p-8 font-mono text-sm space-y-6">
      {messages.map((msg) => (
        <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
          <div className="flex items-center gap-2 mb-1 opacity-50 text-xs">
            {msg.sender === 'persona' && <span className="font-bold text-green-500">[{msg.personaId}]</span>}
            <span>{msg.timestamp}</span>
          </div>
          <div className={`max-w-2xl p-4 border ${msg.sender === 'user' ? 'bg-neutral-900 border-neutral-700 text-neutral-50' : 'bg-neutral-950 border-neutral-800 text-neutral-300'}`}>
            {msg.sender === 'persona' && <SquareTerminal className="w-4 h-4 mb-2 text-neutral-500" />}
            {msg.text}
          </div>
        </div>
      ))}
    </div>
  );
}
