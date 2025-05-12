import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Rosary Prayers | Ex314.ai",
  description: "Pray the Rosary with guided meditations on the Mysteries.",
}

export default function RosaryPage() {
  return (
    <main className="container mx-auto py-10 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">The Holy Rosary</h1>
        
        <div className="space-y-8">
          <section className="bg-card rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">Introduction to the Rosary</h2>
            <p className="text-muted-foreground mb-4">
              The Rosary is a Scripture-based prayer centered on the life of Christ. It begins with the Apostles' Creed, followed by the Our Father, three Hail Marys, and the Glory Be. The main part consists of reflecting on the Mysteries while praying the Our Father, ten Hail Marys, and a Glory Be for each Mystery.
            </p>
            <div className="mt-4">
              <Link href="#how-to-pray" className="text-primary hover:underline cursor-pointer">
                How to pray the Rosary →
              </Link>
            </div>
          </section>

          <section id="how-to-pray" className="bg-card rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">How to Pray the Rosary</h2>
            <ol className="list-decimal pl-6 space-y-4">
              <li className="text-muted-foreground">
                <span className="font-medium text-foreground">Begin with the Sign of the Cross</span>
                <br />
                In the name of the Father, and of the Son, and of the Holy Spirit. Amen.
              </li>
              <li className="text-muted-foreground">
                <span className="font-medium text-foreground">Recite the Apostles' Creed</span>
              </li>
              <li className="text-muted-foreground">
                <span className="font-medium text-foreground">Pray the Our Father</span>
              </li>
              <li className="text-muted-foreground">
                <span className="font-medium text-foreground">Pray three Hail Marys</span>
                <br />
                For an increase in Faith, Hope, and Charity
              </li>
              <li className="text-muted-foreground">
                <span className="font-medium text-foreground">Pray the Glory Be</span>
              </li>
              <li className="text-muted-foreground">
                <span className="font-medium text-foreground">Announce the First Mystery and pray the Our Father</span>
              </li>
              <li className="text-muted-foreground">
                <span className="font-medium text-foreground">Pray ten Hail Marys while meditating on the Mystery</span>
              </li>
              <li className="text-muted-foreground">
                <span className="font-medium text-foreground">Pray the Glory Be and the Fatima Prayer</span>
              </li>
              <li className="text-muted-foreground">
                <span className="font-medium text-foreground">Repeat steps 6-8 for the remaining Mysteries</span>
              </li>
              <li className="text-muted-foreground">
                <span className="font-medium text-foreground">Conclude with the Hail Holy Queen and the Final Prayer</span>
              </li>
            </ol>
          </section>
          
          <section className="bg-card rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">The Mysteries of the Rosary</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-muted p-4 rounded-md hover:bg-muted/80 cursor-pointer transition-colors">
                <h3 className="font-semibold text-lg mb-2">Joyful Mysteries</h3>
                <p className="text-sm text-muted-foreground">(Mondays & Saturdays)</p>
                <ul className="mt-2 space-y-1 text-sm">
                  <li>The Annunciation</li>
                  <li>The Visitation</li>
                  <li>The Nativity</li>
                  <li>The Presentation</li>
                  <li>The Finding of Jesus in the Temple</li>
                </ul>
              </div>
              
              <div className="bg-muted p-4 rounded-md hover:bg-muted/80 cursor-pointer transition-colors">
                <h3 className="font-semibold text-lg mb-2">Sorrowful Mysteries</h3>
                <p className="text-sm text-muted-foreground">(Tuesdays & Fridays)</p>
                <ul className="mt-2 space-y-1 text-sm">
                  <li>The Agony in the Garden</li>
                  <li>The Scourging at the Pillar</li>
                  <li>The Crowning with Thorns</li>
                  <li>The Carrying of the Cross</li>
                  <li>The Crucifixion</li>
                </ul>
              </div>
              
              <div className="bg-muted p-4 rounded-md hover:bg-muted/80 cursor-pointer transition-colors">
                <h3 className="font-semibold text-lg mb-2">Glorious Mysteries</h3>
                <p className="text-sm text-muted-foreground">(Wednesdays & Sundays)</p>
                <ul className="mt-2 space-y-1 text-sm">
                  <li>The Resurrection</li>
                  <li>The Ascension</li>
                  <li>The Descent of the Holy Spirit</li>
                  <li>The Assumption of Mary</li>
                  <li>The Coronation of Mary</li>
                </ul>
              </div>
              
              <div className="bg-muted p-4 rounded-md hover:bg-muted/80 cursor-pointer transition-colors">
                <h3 className="font-semibold text-lg mb-2">Luminous Mysteries</h3>
                <p className="text-sm text-muted-foreground">(Thursdays)</p>
                <ul className="mt-2 space-y-1 text-sm">
                  <li>The Baptism in the Jordan</li>
                  <li>The Wedding at Cana</li>
                  <li>The Proclamation of the Kingdom</li>
                  <li>The Transfiguration</li>
                  <li>The Institution of the Eucharist</li>
                </ul>
              </div>
            </div>
          </section>
          
          <section className="bg-card rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">Interactive Rosary Coming Soon</h2>
            <p className="text-muted-foreground">
              We're working on an interactive Rosary prayer feature that will guide you through each prayer and mystery with beautiful imagery and meditations. Check back soon!
            </p>
            <button className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md cursor-pointer transition-colors">
              Get Notified When Available
            </button>
          </section>
        </div>
      </div>
    </main>
  )
}