export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="relative h-16 w-16">
        <div className="absolute top-0 left-0 h-full w-full rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
        <div className="absolute top-2 left-2 h-12 w-12 rounded-full border-4 border-t-transparent border-r-primary border-b-transparent border-l-transparent animate-spin"></div>
        <div className="absolute top-4 left-4 h-8 w-8 rounded-full border-4 border-t-transparent border-r-transparent border-b-primary border-l-transparent animate-spin"></div>
      </div>
    </div>
  )
}
