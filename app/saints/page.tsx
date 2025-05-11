import { Metadata } from "next"
import { getAllSaints } from "@/lib/saints-data"
import Link from "next/link"
import { ChiRho } from "@/components/chi-rho"

export const metadata: Metadata = {
  title: "Saints Directory - Ex314.ai",
  description: "Explore the lives, teachings, and legacy of Catholic saints.",
}

export default async function SaintsDirectoryPage() {
  const saints = await getAllSaints()
  
  return (
    <main className="min-h-screen bg-white">
      <header className="w-full py-4 md:py-6 px-4 md:px-8 flex justify-between items-center border-b sticky top-0 bg-white z-10 shadow-sm">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <ChiRho className="h-6 w-6 md:h-8 md:w-8" />
            <h1 className="text-xl md:text-2xl font-bold">Ex314.ai</h1>
          </Link>
        </div>

        <nav className="flex items-center gap-4">
          <Link href="/resources" className="text-sm font-medium hover:underline">
            Resources
          </Link>
          <Link href="/calendar" className="text-sm font-medium hover:underline">
            Liturgical Calendar
          </Link>
          <Link href="/prayers" className="text-sm font-medium hover:underline">
            Prayers
          </Link>
          <Link href="/about" className="text-sm font-medium hover:underline">
            About
          </Link>
        </nav>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Saints Directory</h1>
        <p className="text-gray-600 mb-8">
          Explore the lives, teachings, and legacy of Catholic saints.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {saints.map((saint) => (
            <Link 
              key={saint.id} 
              href={`/saints/${saint.id}`}
              className="block group"
            >
              <div className="border border-gray-200 rounded-lg overflow-hidden transition-shadow hover:shadow-md">
                <div className="aspect-w-16 aspect-h-9 bg-gray-100 flex items-center justify-center">
                  {saint.imageUrl ? (
                    <img 
                      src={saint.imageUrl} 
                      alt={saint.name} 
                      className="object-cover h-full w-full" 
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <span className="text-5xl font-bold text-gray-300">{saint.name[0]}</span>
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <h2 className="text-lg font-bold mb-1 group-hover:text-blue-600">
                    {saint.name}
                  </h2>
                  
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="px-2 py-1 bg-gray-100 rounded text-xs">
                      {saint.feastDate}
                    </span>
                    
                    <span className="px-2 py-1 bg-gray-100 rounded text-xs">
                      {saint.type}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {saint.shortBio}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      <footer className="bg-gray-100 py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <ChiRho className="h-6 w-6 mr-2" />
            <span className="font-semibold">Ex314.ai</span>
          </div>
          
          <div className="flex gap-4">
            <Link href="/about" className="text-sm text-gray-600 hover:text-gray-900">
              About
            </Link>
            <Link href="/contact" className="text-sm text-gray-600 hover:text-gray-900">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </main>
  )
} 