import React from "react"
import { Book, Star, Info, Bookmark } from "lucide-react"

interface BookCardProps {
  title: string
  author: string
  coverColor?: string
  available?: boolean
  match?: number
  isbn?: string
  category?: string
  onBorrow?: () => void
  onDetails?: () => void
  onReserve?: () => void
}

export function BookCard({
  title,
  author,
  coverColor = "from-blue-600 to-indigo-600",
  available = true,
  match,
  isbn,
  category,
  onBorrow,
  onDetails,
  onReserve,
}: BookCardProps) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/5 bg-white/5 transition-all duration-300 hover:border-neon/40 hover:shadow-[0_0_20px_rgba(0,255,153,0.1)] hover:-translate-y-1">
      {/* Cover Image Area */}
      <div className={`relative aspect-[2/3] w-full bg-gradient-to-br ${coverColor} flex items-center justify-center overflow-hidden`}>
        {/* Decorative elements to make it look like a book */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-black/20" />
        <Book className="h-16 w-16 text-white/20 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3" />
        
        {/* Match Badge */}
        {match && (
          <div className="absolute top-3 right-3 rounded-full bg-neon/90 px-2 py-1 text-[10px] font-bold text-neon-foreground shadow-lg backdrop-blur-sm">
            {match}% Match
          </div>
        )}

        {/* Category Badge */}
        {category && (
          <div className="absolute bottom-3 left-3 rounded-md bg-black/60 px-2 py-1 text-[10px] font-medium text-white/90 backdrop-blur-md border border-white/10">
            {category}
          </div>
        )}

        {/* Quick Action Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center gap-2">
           <button 
             onClick={onDetails}
             className="h-10 w-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-neon hover:text-black transition-all"
             title="View Details"
           >
             <Info className="h-5 w-5" />
           </button>
           <button 
             onClick={available ? onBorrow : onReserve}
             className="h-10 w-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-neon hover:text-black transition-all"
             title={available ? "Borrow Now" : "Reserve Now"}
           >
             <Bookmark className="h-5 w-5" />
           </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex flex-1 flex-col p-4 bg-gradient-to-b from-transparent to-white/[0.02]">
        <div className="flex-1 min-h-[60px]">
          <h3 className="line-clamp-2 text-sm font-bold text-foreground leading-snug" title={title}>
            {title}
          </h3>
          <p className="mt-1 text-[11px] text-muted-foreground font-medium italic">by {author}</p>
        </div>

        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${
              available 
                ? "text-emerald-400 border-emerald-500/20 bg-emerald-500/5" 
                : "text-amber-400 border-amber-500/20 bg-amber-500/5"
            }`}>
              <span className={`h-1 w-1 rounded-full ${available ? "bg-emerald-400" : "bg-amber-400"}`} />
              {available ? "Available" : "Borrowed"}
            </span>
            <div className="flex gap-0.5">
               {[1, 2, 3, 4].map((i) => (
                 <Star key={i} className="h-2.5 w-2.5 text-neon fill-neon" />
               ))}
               <Star className="h-2.5 w-2.5 text-white/10 fill-white/10" />
            </div>
          </div>
          
          <button
            onClick={available ? onBorrow : onReserve}
            className={`w-full rounded-xl py-2.5 text-xs font-bold transition-all duration-300 ${
              available 
              ? "bg-neon-gradient text-neon-foreground hover:shadow-glow active:scale-[0.98]" 
              : "bg-white/5 border border-white/10 text-neon hover:border-neon/50 active:scale-[0.98]"
            }`}
          >
            {available ? "Borrow" : "Reserve"}
          </button>
        </div>
      </div>
    </div>
  )
}
