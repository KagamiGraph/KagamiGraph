import { UploadCloud } from "lucide-react";

export default function DataUploader() {
  return (
    <div className="border-2 border-dashed border-neutral-800 hover:border-neutral-700 transition-colors bg-neutral-950/50 p-8 flex flex-col items-center justify-center text-center cursor-pointer group">
      <div className="w-12 h-12 bg-neutral-900 border border-neutral-800 flex items-center justify-center mb-4 group-hover:border-neutral-700 transition-colors">
        <UploadCloud className="w-6 h-6 text-neutral-400 group-hover:text-neutral-300 transition-colors" />
      </div>
      <h3 className="text-lg font-medium text-neutral-50">Upload Training Data</h3>
      <p className="text-sm text-neutral-400 mt-2 max-w-sm">
        Drag and drop your raw CSV files (e.g. Zendesk tickets, survey responses, or Mixpanel events) to automatically cluster and generate synthetic personas.
      </p>
      
      <button className="mt-6 px-4 py-2 bg-neutral-900 border border-neutral-700 text-neutral-50 text-sm font-semibold hover:bg-neutral-800 transition-colors">
        Select Files
      </button>
    </div>
  );
}
