"use client"

export function FloatingElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating geometric shapes */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-purple-300 rounded-full opacity-60 float-animation"></div>
      <div
        className="absolute top-40 right-20 w-6 h-6 bg-blue-300 rounded-full opacity-50 float-animation"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute top-60 left-1/4 w-3 h-3 bg-orange-300 rounded-full opacity-70 float-animation"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="absolute bottom-40 right-10 w-5 h-5 bg-green-300 rounded-full opacity-60 float-animation"
        style={{ animationDelay: "0.5s" }}
      ></div>
      <div
        className="absolute bottom-60 left-20 w-4 h-4 bg-pink-300 rounded-full opacity-50 float-animation"
        style={{ animationDelay: "1.5s" }}
      ></div>

      {/* Floating squares */}
      <div
        className="absolute top-32 right-1/4 w-6 h-6 bg-purple-200 opacity-40 float-animation"
        style={{ animationDelay: "3s" }}
      ></div>
      <div
        className="absolute bottom-32 left-1/3 w-4 h-4 bg-blue-200 opacity-50 float-animation"
        style={{ animationDelay: "2.5s" }}
      ></div>

      {/* Large background shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full opacity-20 blob-shape"></div>
      <div
        className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-orange-100 to-pink-100 rounded-full opacity-15 blob-shape"
        style={{ animationDelay: "4s" }}
      ></div>
    </div>
  )
}
