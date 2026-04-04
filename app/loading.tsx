export default function Loading() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          {/* A sleek, modern spinner */}
          <div className="w-12 h-12 border-4 border-gray-100 border-t-[#FF8C00] rounded-full animate-spin"></div>
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest animate-pulse">
            Loading...
          </p>
        </div>
      </div>
    );
  }