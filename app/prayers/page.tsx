import Link from "next/link"
import { ChiRho } from "@/components/chi-rho"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"

export default function PrayersPage() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full py-6 px-4 md:px-8 flex justify-between items-center border-b">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <ChiRho className="h-8 w-8" />
            <h1 className="text-2xl font-bold">Ex314.ai</h1>
          </Link>
        </div>
        <div className="flex items-center gap-4">
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
        </div>
      </header>

      {/* Prayers Hero */}
      <section className="bg-purple-50 py-12 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Catholic Prayers</h1>
          <p className="text-lg text-gray-600 mb-6">
            Discover traditional Catholic prayers, novenas, and devotions to enrich your spiritual life.
          </p>
          <div className="flex gap-4 max-w-md">
            <Input placeholder="Search prayers..." className="flex-1" />
            <Button>Search</Button>
          </div>
        </div>
      </section>

      {/* Prayers Content */}
      <section className="py-12 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <Tabs defaultValue="common" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="common">Common Prayers</TabsTrigger>
              <TabsTrigger value="rosary">Rosary</TabsTrigger>
              <TabsTrigger value="novenas">Novenas</TabsTrigger>
              <TabsTrigger value="litanies">Litanies</TabsTrigger>
              <TabsTrigger value="saints">Saints</TabsTrigger>
            </TabsList>
            <TabsContent value="common" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <PrayerCard
                  title="Our Father"
                  description="The Lord's Prayer taught by Jesus to his disciples"
                  category="Basic Prayer"
                />
                <PrayerCard
                  title="Hail Mary"
                  description="A traditional Catholic prayer asking for the intercession of the Blessed Virgin Mary"
                  category="Marian Prayer"
                />
                <PrayerCard
                  title="Glory Be"
                  description="A doxology, a short hymn of praise to the Trinity"
                  category="Basic Prayer"
                />
                <PrayerCard
                  title="Apostles' Creed"
                  description="A statement of Christian belief, a profession of faith"
                  category="Creed"
                />
                <PrayerCard
                  title="Act of Contrition"
                  description="A prayer expressing sorrow for sins"
                  category="Penitential Prayer"
                />
                <PrayerCard
                  title="Memorare"
                  description="A prayer seeking the intercession of the Blessed Virgin Mary"
                  category="Marian Prayer"
                />
              </div>
            </TabsContent>
            <TabsContent value="rosary" className="mt-6">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>How to Pray the Rosary</CardTitle>
                  <CardDescription>A guide to praying the Holy Rosary</CardDescription>
                </CardHeader>
                <CardContent>
                  <ol className="list-decimal list-inside space-y-2 text-gray-600">
                    <li>Make the Sign of the Cross and say the "Apostles' Creed"</li>
                    <li>Say the "Our Father"</li>
                    <li>Say three "Hail Marys" for Faith, Hope, and Charity</li>
                    <li>Say the "Glory Be"</li>
                    <li>Announce the First Mystery and then say the "Our Father"</li>
                    <li>Say ten "Hail Marys" while meditating on the Mystery</li>
                    <li>Say the "Glory Be" and the "Fatima Prayer"</li>
                    <li>
                      Announce the Next Mystery; then say the "Our Father" and repeat steps 6 and 7, continuing with the
                      remaining Mysteries
                    </li>
                    <li>Say the closing prayers: "Hail Holy Queen" and "Final Prayer"</li>
                    <li>Make the Sign of the Cross</li>
                  </ol>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <PrayerCard
                  title="Joyful Mysteries"
                  description="Traditionally prayed on Mondays and Saturdays"
                  category="Rosary"
                />
                <PrayerCard
                  title="Sorrowful Mysteries"
                  description="Traditionally prayed on Tuesdays and Fridays"
                  category="Rosary"
                />
                <PrayerCard
                  title="Glorious Mysteries"
                  description="Traditionally prayed on Wednesdays and Sundays"
                  category="Rosary"
                />
                <PrayerCard
                  title="Luminous Mysteries"
                  description="Traditionally prayed on Thursdays"
                  category="Rosary"
                />
              </div>
            </TabsContent>
            <TabsContent value="novenas" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <PrayerCard
                  title="Divine Mercy Novena"
                  description="A novena prayed from Good Friday to Divine Mercy Sunday"
                  category="Novena"
                />
                <PrayerCard
                  title="Novena to the Sacred Heart"
                  description="A nine-day prayer to the Sacred Heart of Jesus"
                  category="Novena"
                />
                <PrayerCard
                  title="Novena to St. Joseph"
                  description="A nine-day prayer seeking the intercession of St. Joseph"
                  category="Novena"
                />
                <PrayerCard
                  title="Novena to St. Jude"
                  description="A nine-day prayer to the patron saint of hopeless causes"
                  category="Novena"
                />
              </div>
            </TabsContent>
            <TabsContent value="litanies" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <PrayerCard
                  title="Litany of the Blessed Virgin Mary"
                  description="Also known as the Litany of Loreto"
                  category="Litany"
                />
                <PrayerCard
                  title="Litany of the Sacred Heart"
                  description="A litany honoring the Sacred Heart of Jesus"
                  category="Litany"
                />
                <PrayerCard
                  title="Litany of the Saints"
                  description="A prayer calling upon the saints for their intercession"
                  category="Litany"
                />
                <PrayerCard title="Litany of St. Joseph" description="A litany honoring St. Joseph" category="Litany" />
              </div>
            </TabsContent>
            <TabsContent value="saints" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <PrayerCard
                  title="Prayer to St. Michael"
                  description="A prayer for protection against evil"
                  category="Saint Prayer"
                />
                <PrayerCard
                  title="Prayer to St. Anthony"
                  description="A prayer to find lost items"
                  category="Saint Prayer"
                />
                <PrayerCard title="Prayer to St. Francis" description="A prayer for peace" category="Saint Prayer" />
                <PrayerCard
                  title="Prayer to St. Thérèse"
                  description="A prayer to the Little Flower"
                  category="Saint Prayer"
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-8 px-4 md:px-8 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <ChiRho className="h-6 w-6" />
            <span className="font-semibold">Ex314.ai</span>
          </div>
          <div className="flex flex-wrap gap-6 justify-center">
            <Link href="/about" className="text-sm text-gray-600 hover:text-gray-900">
              About
            </Link>
            <Link href="/privacy" className="text-sm text-gray-600 hover:text-gray-900">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm text-gray-600 hover:text-gray-900">
              Terms
            </Link>
            <Link href="/contact" className="text-sm text-gray-600 hover:text-gray-900">
              Contact
            </Link>
          </div>
          <div className="mt-4 md:mt-0 text-sm text-gray-500">© 2025 Ex314.ai. All rights reserved.</div>
        </div>
      </footer>
    </main>
  )
}

function PrayerCard({ title, description, category }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-gray-500">{category}</div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full">
          View Prayer
        </Button>
      </CardFooter>
    </Card>
  )
}
