import { Metadata } from "next"
import { ChiRho } from "@/components/chi-rho"
import { notFound } from "next/navigation"
import { getSaint } from "@/lib/saints-data"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { ArrowLeft, Quote, BookOpen, Bookmark } from "lucide-react"

type SaintPageProps = {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: SaintPageProps): Promise<Metadata> {
  const saint = await getSaint(params.id)
  
  if (!saint) {
    return {
      title: "Saint Not Found",
    }
  }
  
  return {
    title: `${saint.name} - Ex314.ai`,
    description: saint.shortBio,
  }
}

export default async function SaintPage({ params }: SaintPageProps) {
  const saint = await getSaint(params.id)
  
  if (!saint) {
    notFound()
  }
  
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
          <Link href="/saints" className="text-sm font-medium hover:underline">
            Saints
          </Link>
          <Link href="/prayers" className="text-sm font-medium hover:underline">
            Prayers
          </Link>
        </nav>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link 
          href="/saints" 
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to All Saints
        </Link>
        
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          <div className="flex-shrink-0 flex items-start justify-center">
            {saint.imageUrl ? (
              <img 
                src={saint.imageUrl} 
                alt={saint.name} 
                className="rounded-lg shadow-md w-full max-w-[300px] h-auto object-cover" 
              />
            ) : (
              <div className="bg-gray-100 rounded-lg flex items-center justify-center w-[300px] h-[300px]">
                <ChiRho className="h-32 w-32 text-gray-400" />
              </div>
            )}
          </div>
          
          <div className="flex-grow">
            <h1 className="text-3xl font-bold mb-2">{saint.name}</h1>
            
            {saint.title && (
              <p className="text-lg text-gray-600 mb-4">{saint.title}</p>
            )}
            
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                Feast: {saint.feastDate}
              </span>
              
              <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                Type: {saint.type}
              </span>
              
              <span 
                className={`px-3 py-1 rounded-full text-sm text-white ${
                  saint.liturgicalColor === 'Red' ? 'bg-red-600' :
                  saint.liturgicalColor === 'White' ? 'bg-gray-600' :
                  saint.liturgicalColor === 'Green' ? 'bg-green-600' :
                  saint.liturgicalColor === 'Purple' ? 'bg-purple-600' :
                  'bg-pink-600' // Rose
                }`}
              >
                {saint.liturgicalColor}
              </span>
            </div>
            
            <p className="text-lg font-medium mb-4">{saint.shortBio}</p>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              {saint.born && (
                <div>
                  <span className="font-medium">Born:</span> {saint.born}
                </div>
              )}
              
              {saint.died && (
                <div>
                  <span className="font-medium">Died:</span> {saint.died}
                </div>
              )}
              
              {saint.canonizedDate && (
                <div>
                  <span className="font-medium">Canonized:</span> {saint.canonizedDate}
                </div>
              )}
              
              {saint.patronOf.length > 0 && (
                <div className="col-span-2">
                  <span className="font-medium">Patron of:</span>{" "}
                  {saint.patronOf.join(", ")}
                </div>
              )}
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="life" className="w-full">
          <TabsList className="w-full justify-start mb-6">
            <TabsTrigger value="life">Life & Legacy</TabsTrigger>
            <TabsTrigger value="quotes">
              <Quote className="h-4 w-4 mr-1" />
              Quotes
            </TabsTrigger>
            <TabsTrigger value="prayers">
              <Bookmark className="h-4 w-4 mr-1" />
              Prayers
            </TabsTrigger>
            <TabsTrigger value="readings">
              <BookOpen className="h-4 w-4 mr-1" />
              Readings
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="life" className="space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-3">Life</h2>
              <div className="prose max-w-none">
                <p>{saint.life}</p>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-3">Legacy</h2>
              <div className="prose max-w-none">
                <p>{saint.legacy}</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="quotes">
            <div className="space-y-6">
              <h2 className="text-xl font-bold mb-3">Notable Quotes</h2>
              
              {saint.quotes.length === 0 ? (
                <p>No quotes available for this saint.</p>
              ) : (
                <div className="space-y-4">
                  {saint.quotes.map((quote, index) => (
                    <div key={index} className="border-l-4 border-gray-300 pl-4 py-2">
                      <blockquote className="italic text-lg mb-2">
                        "{quote.text}"
                      </blockquote>
                      {quote.source && (
                        <cite className="text-sm text-gray-600">— {quote.source}</cite>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="prayers">
            <div className="space-y-6">
              <h2 className="text-xl font-bold mb-3">Prayers to {saint.name}</h2>
              
              {saint.prayers.length === 0 ? (
                <p>No prayers available for this saint.</p>
              ) : (
                <div className="space-y-8">
                  {saint.prayers.map((prayer, index) => (
                    <div key={index} className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-lg font-medium mb-3">{prayer.title}</h3>
                      <p className="italic">{prayer.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="readings">
            <div className="space-y-6">
              <h2 className="text-xl font-bold mb-3">Recommended Readings</h2>
              
              {saint.readings.length === 0 ? (
                <p>No readings available for this saint.</p>
              ) : (
                <div className="space-y-8">
                  {saint.readings.map((reading, index) => (
                    <div key={index} className="border border-gray-200 p-6 rounded-lg">
                      <h3 className="text-lg font-medium mb-1">{reading.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{reading.citation}</p>
                      <div className="prose max-w-none">
                        <p>{reading.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <footer className="bg-gray-100 py-8 px-4 mt-12">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center">
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