import Link from "next/link"
import { ChiRho } from "@/components/chi-rho"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ResourcesPage() {
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

      {/* Resources Hero */}
      <section className="bg-blue-50 py-12 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Catholic Resources</h1>
          <p className="text-lg text-gray-600 mb-6">
            Explore our collection of Catholic resources, including Church documents, catechism references, and
            theological writings.
          </p>
          <div className="flex gap-4 max-w-md">
            <Input placeholder="Search resources..." className="flex-1" />
            <Button>Search</Button>
          </div>
        </div>
      </section>

      {/* Resources Content */}
      <section className="py-12 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <Tabs defaultValue="documents" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="documents">Church Documents</TabsTrigger>
              <TabsTrigger value="catechism">Catechism</TabsTrigger>
              <TabsTrigger value="theology">Theology</TabsTrigger>
              <TabsTrigger value="saints">Saints</TabsTrigger>
            </TabsList>
            <TabsContent value="documents" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ResourceCard
                  title="Lumen Gentium"
                  description="Dogmatic Constitution on the Church, Second Vatican Council"
                  category="Vatican II"
                  year="1964"
                />
                <ResourceCard
                  title="Dei Verbum"
                  description="Dogmatic Constitution on Divine Revelation, Second Vatican Council"
                  category="Vatican II"
                  year="1965"
                />
                <ResourceCard
                  title="Gaudium et Spes"
                  description="Pastoral Constitution on the Church in the Modern World"
                  category="Vatican II"
                  year="1965"
                />
                <ResourceCard
                  title="Sacrosanctum Concilium"
                  description="Constitution on the Sacred Liturgy, Second Vatican Council"
                  category="Vatican II"
                  year="1963"
                />
                <ResourceCard
                  title="Evangelii Gaudium"
                  description="Apostolic Exhortation on the Proclamation of the Gospel"
                  category="Pope Francis"
                  year="2013"
                />
                <ResourceCard
                  title="Laudato Si'"
                  description="Encyclical on Care for Our Common Home"
                  category="Pope Francis"
                  year="2015"
                />
              </div>
            </TabsContent>
            <TabsContent value="catechism" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ResourceCard
                  title="The Profession of Faith"
                  description="Part One of the Catechism of the Catholic Church"
                  category="Catechism"
                  year="1992"
                />
                <ResourceCard
                  title="The Celebration of the Christian Mystery"
                  description="Part Two of the Catechism of the Catholic Church"
                  category="Catechism"
                  year="1992"
                />
                <ResourceCard
                  title="Life in Christ"
                  description="Part Three of the Catechism of the Catholic Church"
                  category="Catechism"
                  year="1992"
                />
                <ResourceCard
                  title="Christian Prayer"
                  description="Part Four of the Catechism of the Catholic Church"
                  category="Catechism"
                  year="1992"
                />
              </div>
            </TabsContent>
            <TabsContent value="theology" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ResourceCard
                  title="Summa Theologica"
                  description="Classic work of theology by St. Thomas Aquinas"
                  category="Scholastic"
                  year="1265-1274"
                />
                <ResourceCard
                  title="Introduction to the Devout Life"
                  description="Spiritual classic by St. Francis de Sales"
                  category="Spiritual"
                  year="1609"
                />
                <ResourceCard
                  title="The Interior Castle"
                  description="Spiritual classic by St. Teresa of Ávila"
                  category="Mystical"
                  year="1577"
                />
                <ResourceCard
                  title="Mere Christianity"
                  description="Classic apologetic work by C.S. Lewis"
                  category="Apologetics"
                  year="1952"
                />
              </div>
            </TabsContent>
            <TabsContent value="saints" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ResourceCard
                  title="St. Augustine of Hippo"
                  description="Early Church Father and Doctor of the Church"
                  category="Doctor of the Church"
                  year="354-430"
                />
                <ResourceCard
                  title="St. Thomas Aquinas"
                  description="Medieval theologian and Doctor of the Church"
                  category="Doctor of the Church"
                  year="1225-1274"
                />
                <ResourceCard
                  title="St. Thérèse of Lisieux"
                  description="The Little Flower, Doctor of the Church"
                  category="Doctor of the Church"
                  year="1873-1897"
                />
                <ResourceCard
                  title="St. John Paul II"
                  description="Pope and influential Church leader"
                  category="Pope"
                  year="1920-2005"
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

function ResourceCard({ title, description, category, year }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between text-sm text-gray-500">
          <span>{category}</span>
          <span>{year}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full">
          View Resource
        </Button>
      </CardFooter>
    </Card>
  )
}
