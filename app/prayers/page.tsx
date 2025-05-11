"use client"

import type React from "react"

import { useState } from "react"
import { SiteFooter } from "../../components/site-footer"

// Language options
const languages = [
  { code: "en", name: "English" },
  { code: "la", name: "Latin" },
  { code: "el", name: "Greek" },
  { code: "it", name: "Italian" },
  { code: "es", name: "Spanish" },
  { code: "arc", name: "Aramaic" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "ru", name: "Russian" },
  { code: "pl", name: "Polish" },
  { code: "nl", name: "Dutch" },
]

// Prayer data with translations
const prayers = [
  {
    id: "our-father",
    title: "Our Father",
    description: "The Lord's Prayer taught by Jesus to his disciples",
    category: "Basic Prayer",
    translations: {
      en: "Our Father, who art in heaven, hallowed be thy name; thy kingdom come; thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen.",
      la: "Pater noster, qui es in caelis, sanctificetur nomen tuum. Adveniat regnum tuum. Fiat voluntas tua, sicut in caelo et in terra. Panem nostrum quotidianum da nobis hodie, et dimitte nobis debita nostra sicut et nos dimittimus debitoribus nostris. Et ne nos inducas in tentationem, sed libera nos a malo. Amen.",
      el: "Πάτερ ἡμῶν ὁ ἐν τοῖς οὐρανοῖς· ἁγιασθήτω τὸ ὄνομά σου· ἐλθέτω ἡ βασιλεία σου· γενηθήτω τὸ θέλημά σου, ὡς ἐν οὐρανῷ καὶ ἐπὶ τῆς γῆς· τὸν ἄρτον ἡμῶν τὸν ἐπιούσιον δὸς ἡμῖν σήμερον· καὶ ἄφες ἡμῖν τὰ ὀφειλήματα ἡμῶν, ὡς καὶ ἡμεῖς ἀφίεμεν τοῖς ὀφειλέταις ἡμῶν· καὶ μὴ εἰσενέγκῃς ἡμᾶς εἰς πειρασμόν, ἀλλὰ ῥῦσαι ἡμᾶς ἀπὸ τοῦ πονηροῦ. Ἀμήν.",
      it: "Padre nostro che sei nei cieli, sia santificato il tuo nome, venga il tuo regno, sia fatta la tua volontà come in cielo così in terra. Dacci oggi il nostro pane quotidiano, e rimetti a noi i nostri debiti come anche noi li rimettiamo ai nostri debitori, e non abbandonarci alla tentazione, ma liberaci dal male. Amen.",
      es: "Padre nuestro, que estás en el cielo, santificado sea tu Nombre; venga a nosotros tu reino; hágase tu voluntad en la tierra como en el cielo. Danos hoy nuestro pan de cada día; perdona nuestras ofensas, como también nosotros perdonamos a los que nos ofenden; no nos dejes caer en la tentación, y líbranos del mal. Amén.",
      arc: "ܐܒܘܢ ܕܒܫܡܝܐ ܢܬܩܕܫ ܫܡܟ. ܬܐܬܐ ܡܠܟܘܬܟ. ܢܗܘܐ ܨܒܝܢܟ ܐܝܟܢܐ ܕܒܫܡܝܐ ܐܦ ܒܐܪܥܐ. ܗܒ ܠܢ ܠܚܡܐ ܕܣܘܢܩܢܢ ܝܘܡܢܐ. ܘܫܒܘܩ ܠܢ ܚܘܒܝܢ ܐܝܟܢܐ ܕܐܦ ܚܢܢ ܫܒܩܢ ܠܚܝܒܝܢ. ܘܠܐ ܬܥܠܢ ܠܢܣܝܘܢܐ. ܐܠܐ ܦܨܢ ܡܢ ܒܝܫܐ. ܡܛܠ ܕܕܝܠܟ ܗܝ ܡܠܟܘܬܐ ܘܚܝܠܐ ܘܬܫܒܘܚܬܐ ܠܥܠܡ ܥܠܡܝܢ. ܐܡܝܢ.",
      fr: "Notre Père, qui es aux cieux, que ton nom soit sanctifié, que ton règne vienne, que ta volonté soit faite sur la terre comme au ciel. Donne-nous aujourd'hui notre pain de ce jour. Pardonne-nous nos offenses, comme nous pardonnons aussi à ceux qui nous ont offensés. Et ne nous laisse pas entrer en tentation, mais délivre-nous du Mal. Amen.",
      de: "Vater unser im Himmel, geheiligt werde dein Name; dein Reich komme; dein Wille geschehe, wie im Himmel so auf Erden. Unser tägliches Brot gib uns heute. Und vergib uns unsere Schuld, wie auch wir vergeben unsern Schuldigern; und führe uns nicht in Versuchung, sondern erlöse uns von dem Bösen. Amen.",
      ru: "Отче наш, сущий на небесах! да святится имя Твое; да приидет Царствие Твое; да будет воля Твоя и на земле, как на небе; хлеб наш насущный дай нам на сей день; и прости нам долги наши, как и мы прощаем должникам нашим; и не введи нас в искушение, но избавь нас от лукавого. Аминь.",
      pl: "Ojcze nasz, któryś jest w niebie, święć się imię Twoje; przyjdź królestwo Twoje; bądź wola Twoja jako w niebie, tak i na ziemi. Chleba naszego powszedniego daj nam dzisiaj; i odpuść nam nasze winy, jako i my odpuszczamy naszym winowajcom; i nie wódź nas na pokuszenie, ale nas zbaw ode złego. Amen.",
      nl: "Onze Vader, die in de hemelen zijt, uw naam worde geheiligd, uw rijk kome, uw wil geschiede op aarde zoals in de hemel. Geef ons heden ons dagelijks brood en vergeef ons onze schulden, zoals ook wij vergeven aan onze schuldenaren, en breng ons niet in beproeving maar verlos ons van het kwade. Amen.",
    },
  },
  {
    id: "hail-mary",
    title: "Hail Mary",
    description: "A traditional Catholic prayer asking for the intercession of the Blessed Virgin Mary",
    category: "Marian Prayer",
    translations: {
      en: "Hail Mary, full of grace, the Lord is with thee; blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.",
      la: "Ave Maria, gratia plena, Dominus tecum. Benedicta tu in mulieribus, et benedictus fructus ventris tui, Iesus. Sancta Maria, Mater Dei, ora pro nobis peccatoribus, nunc, et in hora mortis nostrae. Amen.",
      el: "Χαῖρε Μαρία, κεχαριτωμένη, ὁ Κύριος μετὰ σοῦ. Εὐλογημένη σὺ ἐν γυναιξί, καὶ εὐλογημένος ὁ καρπὸς τῆς κοιλίας σου, Ἰησοῦς. Ἁγία Μαρία, Θεοτόκε, πρέσβευε ὑπὲρ ἡμῶν τῶν ἁμαρτωλῶν, νῦν καὶ ἐν τῇ ὥρᾳ τοῦ θανάτου ἡμῶν. Ἀμήν.",
      it: "Ave Maria, piena di grazia, il Signore è con te. Tu sei benedetta fra le donne e benedetto è il frutto del tuo seno, Gesù. Santa Maria, Madre di Dio, prega per noi peccatori, adesso e nell'ora della nostra morte. Amen.",
      es: "Dios te salve, María, llena eres de gracia, el Señor es contigo. Bendita tú eres entre todas las mujeres, y bendito es el fruto de tu vientre, Jesús. Santa María, Madre de Dios, ruega por nosotros, pecadores, ahora y en la hora de nuestra muerte. Amén.",
      arc: "ܫܠܡ ܠܟܝ ܡܪܝܡ ܡܠܝܬ ܛܝܒܘܬܐ ܡܪܢ ܥܡܟܝ ܡܒܪܟܬܐ ܐܢܬܝ ܒܢܫ̈ܐ ܘܡܒܪܟܐ ܗܘ ܦܐܪܐ ܕܒܟܪܣܟܝ ܝܫܘܥ܂ ܩܕܝܫܬܐ ܡܪܝܡ ܝܠܕܬ ܐܠܗܐ ܨܠܝ ܚܠܦܝܢ ܚܛܝ̈ܐ ܗܫܐ ܘܒܫܥܬܐ ܕܡܘܬܢ܂ ܐܡܝܢ܂",
      fr: "Je vous salue Marie, pleine de grâce ; le Seigneur est avec vous. Vous êtes bénie entre toutes les femmes et Jésus, le fruit de vos entrailles, est béni. Sainte Marie, Mère de Dieu, priez pour nous pauvres pécheurs, maintenant et à l'heure de notre mort. Amen.",
      de: "Gegrüßet seist du, Maria, voll der Gnade, der Herr ist mit dir. Du bist gebenedeit unter den Frauen, und gebenedeit ist die Frucht deines Leibes, Jesus. Heilige Maria, Mutter Gottes, bitte für uns Sünder jetzt und in der Stunde unseres Todes. Amen.",
      ru: "Радуйся, Мария, благодати полная, Господь с Тобою; благословенна Ты между женами, и благословен плод чрева Твоего, Иисус. Святая Мария, Матерь Божия, молись о нас, грешных, ныне и в час смерти нашей. Аминь.",
      pl: "Zdrowaś Maryjo, łaski pełna, Pan z Tobą, błogosławionaś Ty między niewiastami i błogosławiony owoc żywota Twojego, Jezus. Święta Maryjo, Matko Boża, módl się za nami grzesznymi teraz i w godzinę śmierci naszej. Amen.",
      nl: "Wees gegroet, Maria, vol van genade, de Heer is met u, gij zijt de gezegende onder de vrouwen, en gezegend is Jezus, de vrucht van uw schoot. Heilige Maria, Moeder van God, bid voor ons, zondaars, nu en in het uur van onze dood. Amen.",
    },
  },
  {
    id: "glory-be",
    title: "Glory Be",
    description: "A doxology, a short hymn of praise to the Trinity",
    category: "Basic Prayer",
    translations: {
      en: "Glory be to the Father, and to the Son, and to the Holy Spirit. As it was in the beginning, is now, and ever shall be, world without end. Amen.",
      la: "Gloria Patri, et Filio, et Spiritui Sancto. Sicut erat in principio, et nunc, et semper, et in saecula saeculorum. Amen.",
      el: "Δόξα Πατρὶ καὶ Υἱῷ καὶ Ἁγίῳ Πνεύματι, καὶ νῦν καὶ ἀεὶ καὶ εἰς τοὺς αἰῶνας τῶν αἰώνων. Ἀμήν.",
      it: "Gloria al Padre e al Figlio e allo Spirito Santo. Come era nel principio, e ora e sempre nei secoli dei secoli. Amen.",
      es: "Gloria al Padre, y al Hijo, y al Espíritu Santo. Como era en el principio, ahora y siempre, por los siglos de los siglos. Amén.",
      arc: "ܫܘܒܚܐ ܠܐܒܐ ܘܠܒܪܐ ܘܠܪܘܚܐ ܕܩܘܕܫܐ܂ ܐܝܟܢܐ ܕܐܝܬܘܗܝ ܗܘܐ ܡܢ ܒܪܫܝܬ ܘܗܫܐ ܘܒܟܠܙܒܢ ܘܠܥܠܡ ܥܠܡܝܢ܂ ܐܡܝܢ܂",
      fr: "Gloire au Père, et au Fils, et au Saint-Esprit. Comme il était au commencement, maintenant et toujours, pour les siècles des siècles. Amen.",
      de: "Ehre sei dem Vater und dem Sohn und dem Heiligen Geist, wie im Anfang, so auch jetzt und alle Zeit und in Ewigkeit. Amen.",
      ru: "Слава Отцу и Сыну и Святому Духу, и ныне и присно и во веки веков. Аминь.",
      pl: "Chwała Ojcu i Synowi, i Duchowi Świętemu. Jak była na początku, teraz i zawsze, i na wieki wieków. Amen.",
      nl: "Eer aan de Vader en de Zoon en de Heilige Geest. Zoals het was in het begin, nu en altijd, en in de eeuwen der eeuwen. Amen.",
    },
  },
  {
    id: "apostles-creed",
    title: "Apostles' Creed",
    description: "A statement of Christian belief, a profession of faith",
    category: "Creed",
    translations: {
      en: "I believe in God, the Father almighty, Creator of heaven and earth, and in Jesus Christ, his only Son, our Lord, who was conceived by the Holy Spirit, born of the Virgin Mary, suffered under Pontius Pilate, was crucified, died and was buried; he descended into hell; on the third day he rose again from the dead; he ascended into heaven, and is seated at the right hand of God the Father almighty; from there he will come to judge the living and the dead. I believe in the Holy Spirit, the holy catholic Church, the communion of saints, the forgiveness of sins, the resurrection of the body, and life everlasting. Amen.",
      la: "Credo in Deum Patrem omnipotentem, Creatorem caeli et terrae, et in Iesum Christum, Filium Eius unicum, Dominum nostrum, qui conceptus est de Spiritu Sancto, natus ex Maria Virgine, passus sub Pontio Pilato, crucifixus, mortuus, et sepultus, descendit ad inferos, tertia die resurrexit a mortuis, ascendit ad caelos, sedet ad dexteram Dei Patris omnipotentis, inde venturus est iudicare vivos et mortuos. Credo in Spiritum Sanctum, sanctam Ecclesiam catholicam, sanctorum communionem, remissionem peccatorum, carnis resurrectionem, vitam aeternam. Amen.",
      // Additional translations would be included for all languages
      // Abbreviated for brevity in this example
    },
  },
  {
    id: "act-of-contrition",
    title: "Act of Contrition",
    description: "A prayer expressing sorrow for sins",
    category: "Penitential Prayer",
    translations: {
      en: "O my God, I am heartily sorry for having offended Thee, and I detest all my sins because of thy just punishments, but most of all because they offend Thee, my God, who art all good and deserving of all my love. I firmly resolve with the help of Thy grace to sin no more and to avoid the near occasion of sin. Amen.",
      la: "Deus meus, ex toto corde poenitet me omnium meorum peccatorum, eaque detestor, quia peccando, non solum poenas a Te iuste statutas promeritus sum, sed praesertim quia offendi Te, summum bonum, ac dignum qui super omnia diligaris. Ideo firmiter propono, adiuvante gratia Tua, de cetero me non peccaturum peccandique occasiones proximas fugiturum. Amen.",
      // Additional translations would be included for all languages
      // Abbreviated for brevity in this example
    },
  },
  {
    id: "memorare",
    title: "Memorare",
    description: "A prayer seeking the intercession of the Blessed Virgin Mary",
    category: "Marian Prayer",
    translations: {
      en: "Remember, O most gracious Virgin Mary, that never was it known that anyone who fled to thy protection, implored thy help, or sought thine intercession was left unaided. Inspired by this confidence, I fly unto thee, O Virgin of virgins, my mother; to thee do I come, before thee I stand, sinful and sorrowful. O Mother of the Word Incarnate, despise not my petitions, but in thy mercy hear and answer me. Amen.",
      la: "Memorare, O piissima Virgo Maria, non esse auditum a saeculo, quemquam ad tua currentem praesidia, tua implorantem auxilia, tua petentem suffragia, esse derelictum. Ego tali animatus confidentia, ad te, Virgo Virginum, Mater, curro, ad te venio, coram te gemens peccator assisto. Noli, Mater Verbi, verba mea despicere; sed audi propitia et exaudi. Amen.",
      // Additional translations would be included for all languages
      // Abbreviated for brevity in this example
    },
  },
]

// Rosary mysteries data
const rosaryMysteries = [
  {
    id: "joyful",
    title: "Joyful Mysteries",
    description: "Traditionally prayed on Mondays and Saturdays",
    mysteries: [
      {
        title: "The Annunciation",
        scripture: "Luke 1:26-38",
        reflection: "The angel Gabriel announces to Mary that she will conceive and bear a son to be named Jesus.",
      },
      {
        title: "The Visitation",
        scripture: "Luke 1:39-56",
        reflection: "Mary visits her cousin Elizabeth, who is pregnant with John the Baptist.",
      },
      {
        title: "The Nativity",
        scripture: "Luke 2:1-21",
        reflection: "Jesus is born in Bethlehem.",
      },
      {
        title: "The Presentation",
        scripture: "Luke 2:22-38",
        reflection: "Mary and Joseph present Jesus in the Temple.",
      },
      {
        title: "The Finding of Jesus in the Temple",
        scripture: "Luke 2:41-52",
        reflection: "After being lost for three days, Jesus is found in the Temple.",
      },
    ],
  },
  {
    id: "sorrowful",
    title: "Sorrowful Mysteries",
    description: "Traditionally prayed on Tuesdays and Fridays",
    mysteries: [
      {
        title: "The Agony in the Garden",
        scripture: "Matthew 26:36-46",
        reflection: "Jesus prays in the Garden of Gethsemane on the night before His death.",
      },
      {
        title: "The Scourging at the Pillar",
        scripture: "Matthew 27:26",
        reflection: "Jesus is scourged at the pillar.",
      },
      {
        title: "The Crowning with Thorns",
        scripture: "Matthew 27:27-31",
        reflection: "Jesus is crowned with thorns.",
      },
      {
        title: "The Carrying of the Cross",
        scripture: "Matthew 27:32",
        reflection: "Jesus carries the cross to Calvary.",
      },
      {
        title: "The Crucifixion",
        scripture: "Matthew 27:33-56",
        reflection: "Jesus is crucified and dies on the cross.",
      },
    ],
  },
  {
    id: "glorious",
    title: "Glorious Mysteries",
    description: "Traditionally prayed on Wednesdays and Sundays",
    mysteries: [
      {
        title: "The Resurrection",
        scripture: "Matthew 28:1-10",
        reflection: "Jesus rises from the dead.",
      },
      {
        title: "The Ascension",
        scripture: "Acts 1:6-12",
        reflection: "Jesus ascends into Heaven.",
      },
      {
        title: "The Descent of the Holy Spirit",
        scripture: "Acts 2:1-13",
        reflection: "The Holy Spirit descends upon the Apostles.",
      },
      {
        title: "The Assumption",
        scripture: "Revelation 12:1",
        reflection: "Mary is assumed into Heaven, body and soul.",
      },
      {
        title: "The Coronation",
        scripture: "Revelation 12:1",
        reflection: "Mary is crowned Queen of Heaven and Earth.",
      },
    ],
  },
  {
    id: "luminous",
    title: "Luminous Mysteries",
    description: "Traditionally prayed on Thursdays",
    mysteries: [
      {
        title: "The Baptism in the Jordan",
        scripture: "Matthew 3:13-17",
        reflection: "Jesus is baptized in the Jordan River by John the Baptist.",
      },
      {
        title: "The Wedding at Cana",
        scripture: "John 2:1-12",
        reflection: "Jesus performs His first miracle at the wedding feast in Cana.",
      },
      {
        title: "The Proclamation of the Kingdom",
        scripture: "Mark 1:14-15",
        reflection: "Jesus proclaims the Kingdom of God.",
      },
      {
        title: "The Transfiguration",
        scripture: "Matthew 17:1-8",
        reflection: "Jesus is transfigured on Mount Tabor.",
      },
      {
        title: "The Institution of the Eucharist",
        scripture: "Matthew 26:26-28",
        reflection: "Jesus institutes the Eucharist at the Last Supper.",
      },
    ],
  },
]

export default function PrayersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("common")
  const [expandedPrayer, setExpandedPrayer] = useState<string | null>(null)
  const [expandedMystery, setExpandedMystery] = useState<string | null>(null)
  const [selectedLanguage, setSelectedLanguage] = useState("en")

  // Filter prayers based on search query
  const filteredPrayers = prayers.filter(
    (prayer) =>
      prayer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prayer.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Search functionality is already implemented through the filter above
  }

  // Toggle prayer expansion
  const togglePrayer = (id: string) => {
    setExpandedPrayer(expandedPrayer === id ? null : id)
  }

  // Toggle mystery expansion
  const toggleMystery = (id: string) => {
    setExpandedMystery(expandedMystery === id ? null : id)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-2 text-4xl font-bold text-center">Catholic Prayers</h1>
        <p className="mb-8 text-center text-gray-600">
          Discover traditional Catholic prayers, novenas, and devotions to enrich your spiritual life.
        </p>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="mb-8 flex justify-center">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search prayers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200"
            />
          </div>
          <button
            type="submit"
            className="ml-2 rounded-lg bg-purple-600 px-4 py-2 text-white transition-all duration-200 hover:bg-purple-700 hover:scale-105"
          >
            Search
          </button>
        </form>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex overflow-x-auto rounded-lg border border-gray-200 bg-white">
            <button
              onClick={() => setActiveTab("common")}
              className={`flex-1 px-4 py-3 text-center font-medium transition-all duration-200 hover:bg-gray-100 ${
                activeTab === "common" ? "bg-gray-100 text-purple-600" : "text-gray-600"
              }`}
            >
              Common Prayers
            </button>
            <button
              onClick={() => setActiveTab("rosary")}
              className={`flex-1 px-4 py-3 text-center font-medium transition-all duration-200 hover:bg-gray-100 ${
                activeTab === "rosary" ? "bg-gray-100 text-purple-600" : "text-gray-600"
              }`}
            >
              Rosary
            </button>
            <button
              onClick={() => setActiveTab("novenas")}
              className={`flex-1 px-4 py-3 text-center font-medium transition-all duration-200 hover:bg-gray-100 ${
                activeTab === "novenas" ? "bg-gray-100 text-purple-600" : "text-gray-600"
              }`}
            >
              Novenas
            </button>
            <button
              onClick={() => setActiveTab("litanies")}
              className={`flex-1 px-4 py-3 text-center font-medium transition-all duration-200 hover:bg-gray-100 ${
                activeTab === "litanies" ? "bg-gray-100 text-purple-600" : "text-gray-600"
              }`}
            >
              Litanies
            </button>
            <button
              onClick={() => setActiveTab("saints")}
              className={`flex-1 px-4 py-3 text-center font-medium transition-all duration-200 hover:bg-gray-100 ${
                activeTab === "saints" ? "bg-gray-100 text-purple-600" : "text-gray-600"
              }`}
            >
              Saints
            </button>
          </div>
        </div>

        {/* Common Prayers Content */}
        {activeTab === "common" && (
          <div className="grid gap-6 md:grid-cols-2">
            {filteredPrayers.map((prayer) => (
              <div key={prayer.id} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="mb-2 text-2xl font-bold">{prayer.title}</h2>
                <p className="mb-4 text-gray-600">{prayer.description}</p>
                <p className="mb-4 text-sm text-gray-500">{prayer.category}</p>

                {expandedPrayer === prayer.id && (
                  <div className="mb-4">
                    {/* Language selector */}
                    <div className="mb-4 flex flex-wrap gap-2">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => setSelectedLanguage(lang.code)}
                          className={`rounded-full px-3 py-1 text-xs font-medium transition-all duration-200 hover:scale-105 ${
                            selectedLanguage === lang.code
                              ? "bg-purple-600 text-white"
                              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                          }`}
                        >
                          {lang.name}
                        </button>
                      ))}
                    </div>

                    {/* Prayer text */}
                    <div className="rounded-lg bg-gray-50 p-4">
                      <p className="text-gray-800">
                        {prayer.translations[selectedLanguage as keyof typeof prayer.translations] ||
                          prayer.translations.en}
                      </p>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => togglePrayer(prayer.id)}
                  className="mt-2 w-full rounded-lg bg-white px-4 py-2 text-center text-purple-600 transition-all duration-200 hover:bg-purple-50 hover:scale-105 border border-purple-200"
                >
                  {expandedPrayer === prayer.id ? "Hide Prayer" : "View Prayer"}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Rosary Content */}
        {activeTab === "rosary" && (
          <div className="grid gap-6 md:grid-cols-2">
            {rosaryMysteries.map((mystery) => (
              <div key={mystery.id} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="mb-2 text-2xl font-bold">{mystery.title}</h2>
                <p className="mb-4 text-gray-600">{mystery.description}</p>
                <p className="mb-4 text-sm text-gray-500">Rosary</p>

                {expandedMystery === mystery.id && (
                  <div className="mb-4">
                    <div className="space-y-4">
                      {mystery.mysteries.map((m, index) => (
                        <div key={index} className="rounded-lg bg-gray-50 p-4">
                          <h3 className="mb-2 font-bold">
                            {index + 1}. {m.title}
                          </h3>
                          <p className="mb-2 text-sm text-purple-600">{m.scripture}</p>
                          <p className="text-gray-700">{m.reflection}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  onClick={() => toggleMystery(mystery.id)}
                  className="mt-2 w-full rounded-lg bg-white px-4 py-2 text-center text-purple-600 transition-all duration-200 hover:bg-purple-50 hover:scale-105 border border-purple-200"
                >
                  {expandedMystery === mystery.id ? "Hide Mysteries" : "View Mysteries"}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Placeholder for other tabs */}
        {activeTab === "novenas" && (
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Novenas</h2>
            <p className="mt-2 text-gray-600">Novena content will be added soon.</p>
          </div>
        )}

        {activeTab === "litanies" && (
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Litanies</h2>
            <p className="mt-2 text-gray-600">Litany content will be added soon.</p>
          </div>
        )}

        {activeTab === "saints" && (
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Saints</h2>
            <p className="mt-2 text-gray-600">Saint prayers will be added soon.</p>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  )
}
