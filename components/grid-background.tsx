"use client"

export function GridBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <div className="absolute inset-0 cyber-grid opacity-30"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"></div>
    </div>
  )
}
