import { Users } from 'lucide-react';

export function LoadingScreen() {
  return (
    <div className="min-h-screen bg-[#0f1214] flex items-center justify-center">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 mb-4 animate-pulse">
          <Users className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-xl text-white mb-2">PeopleHub</h2>
        <div className="flex items-center justify-center gap-1">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
}
