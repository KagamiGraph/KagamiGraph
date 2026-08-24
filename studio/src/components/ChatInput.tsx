import { SendHorizontal } from "lucide-react";

export default function ChatInput() {
  return (
    <div className="p-6 border-t border-neutral-800 bg-neutral-950">
      <div className="max-w-4xl mx-auto relative flex items-center">
        <span className="absolute left-4 text-green-500 font-mono font-bold text-lg">{">"}</span>
        <input 
          type="text" 
          placeholder="Ask the focus group a question..."
          className="w-full bg-neutral-900 border border-neutral-700 text-neutral-50 px-12 py-4 text-sm font-mono focus:outline-none focus:border-neutral-500 transition-colors"
        />
        <button className="absolute right-4 text-neutral-500 hover:text-neutral-50 transition-colors">
          <SendHorizontal className="w-5 h-5" />
        </button>
      </div>
      <div className="max-w-4xl mx-auto mt-2 text-xs text-neutral-600 font-mono text-center">
        Powered by KagamiGraph LangGraph Engine
      </div>
    </div>
  );
}
