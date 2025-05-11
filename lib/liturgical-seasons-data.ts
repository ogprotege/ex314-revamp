export type LiturgicalSeasonDetail = {
  id: string
  name: string
  color: string
  timeframe: string
  description: string
  history: string
  significance: string
  practices: string
  scriptureEmphasis: string
  prayers: string[]
  keyDates: {
    name: string
    description: string
  }[]
}

export const liturgicalSeasons: LiturgicalSeasonDetail[] = [
  {
    id: "advent",
    name: "Advent",
    color: "Purple",
    timeframe: "Four Sundays before Christmas through December 24",
    description:
      "Advent is a season of preparation and anticipation for the coming of Christ, both in celebration of His birth and in anticipation of His second coming.",
    history:
      "The word 'Advent' comes from the Latin 'adventus,' meaning 'coming' or 'arrival.' The season emerged in the Church around the 4th-5th centuries, initially as a time of preparation for the baptism of new Christians at Epiphany. By the 6th century, it had become linked to the anticipation of Christ's coming. The current form of Advent, with its four Sundays, was established by Pope Gregory VII in the 11th century.",
    significance:
      "Advent has a twofold character: it is a time of preparation for Christmas, when Christ's first coming is remembered, and it is also a time when minds are directed to anticipate Christ's Second Coming at the end of time. Advent is thus a period of devout and expectant delight, balancing the joy of the Incarnation with the solemnity of anticipating the final judgment.",
    practices:
      "Common Advent practices include lighting candles on an Advent wreath (three purple, one rose), daily Advent calendars, special hymns like 'O Come, O Come Emmanuel,' and increased prayer and almsgiving. Many parishes hold special reconciliation services, and families may set up Jesse Trees that trace Jesus's genealogy. The liturgy during Advent is marked by restraint—the Gloria is omitted, and the sanctuary is decorated simply, with violet vestments used except on the third Sunday (Gaudete Sunday), when rose vestments may be worn to symbolize joy.",
    scriptureEmphasis:
      "Readings focus on the prophets, particularly Isaiah, who foretold the coming of the Messiah; John the Baptist, who prepared the way for Jesus; and Mary, whose 'yes' to God made the Incarnation possible. The Gospel readings progress from an eschatological focus on Christ's second coming in the first weeks to the events preceding Christ's birth in the final days.",
    prayers: ["O Come, O Come Emmanuel", "Alma Redemptoris Mater (Loving Mother of the Redeemer)", "The Angelus"],
    keyDates: [
      {
        name: "First Sunday of Advent",
        description: "Marks the beginning of the liturgical year and the Advent season",
      },
      {
        name: "Feast of St. Nicholas (December 6)",
        description: "Commemorates the generous bishop who inspired the Santa Claus tradition",
      },
      {
        name: "Solemnity of the Immaculate Conception (December 8)",
        description: "Celebrates Mary's conception without original sin",
      },
      {
        name: "Feast of Our Lady of Guadalupe (December 12)",
        description: "Honors the apparition of Mary to Juan Diego in Mexico",
      },
      {
        name: "Gaudete Sunday (Third Sunday of Advent)",
        description: "A day of rejoicing as Christmas draws near, marked by rose vestments",
      },
    ],
  },
  {
    id: "christmas",
    name: "Christmas",
    color: "White",
    timeframe: "December 25 through the Feast of the Baptism of the Lord (typically early January)",
    description:
      "The Christmas season celebrates the Nativity of Jesus Christ and the mystery of the Incarnation—God becoming human in the person of Jesus.",
    history:
      "While the exact date of Jesus's birth is unknown, the Church began celebrating Christmas on December 25 in the 4th century. This date may have been chosen to coincide with the Roman winter solstice festival or the feast of the Unconquered Sun, allowing the Church to transform a pagan celebration into a Christian one. By the Middle Ages, Christmas had become one of the most important feasts in the Christian calendar, celebrated with elaborate liturgies, music, and traditions.",
    significance:
      "Christmas celebrates the central mystery of the Incarnation—that God loved humanity so much that He sent His Son to become one of us. This feast reveals God's desire for intimate communion with humanity and marks the beginning of our redemption. The Christmas season extends beyond December 25, encompassing several important feasts that further illuminate the meaning of the Incarnation.",
    practices:
      "Christmas is celebrated with festive Masses, including the traditional Midnight Mass. Churches are decorated with nativity scenes (crèches), Christmas trees, lights, and greenery. The liturgical color is white or gold, symbolizing joy and purity. Christmas carols, which tell the story of Christ's birth, are sung throughout the season. In many cultures, gift-giving recalls the gifts of the Magi and God's gift of His Son.",
    scriptureEmphasis:
      "The Gospel readings focus on the infancy narratives from Matthew and Luke, including the Annunciation, the Nativity, the visit of the shepherds, the presentation in the Temple, the visit of the Magi, and the Holy Family's flight to Egypt. These readings reveal different aspects of who Jesus is and the significance of His birth.",
    prayers: [
      "Gloria in Excelsis Deo (Glory to God in the Highest)",
      "Adeste Fideles (O Come, All Ye Faithful)",
      "Alma Redemptoris Mater (Loving Mother of the Redeemer)",
    ],
    keyDates: [
      {
        name: "Christmas Day (December 25)",
        description: "Celebrates the birth of Jesus Christ",
      },
      {
        name: "Feast of the Holy Family (Sunday after Christmas)",
        description: "Honors Jesus, Mary, and Joseph as the model for all families",
      },
      {
        name: "Solemnity of Mary, Mother of God (January 1)",
        description: "Celebrates Mary's divine motherhood and her role in salvation history",
      },
      {
        name: "Epiphany (traditionally January 6, often celebrated on the nearest Sunday)",
        description: "Commemorates the visit of the Magi, revealing Christ to the Gentiles",
      },
      {
        name: "Feast of the Baptism of the Lord (Sunday after Epiphany)",
        description: "Marks Jesus's baptism in the Jordan River and the end of the Christmas season",
      },
    ],
  },
  {
    id: "ordinary-time-1",
    name: "Ordinary Time (First Part)",
    color: "Green",
    timeframe: "From the day after the Feast of the Baptism of the Lord until Ash Wednesday",
    description:
      "Ordinary Time is a period of growth and maturation in the faith, focusing on Christ's public ministry and teachings.",
    history:
      "The term 'Ordinary Time' comes from the Latin 'tempus ordinarium,' meaning 'ordered time' or 'numbered time,' not 'ordinary' in the sense of commonplace. This season was formalized in the liturgical calendar after the Second Vatican Council (1962-1965), though the concept of a period between the major liturgical seasons existed earlier. The reforms sought to emphasize the importance of Christ's entire life and ministry, not just the major events celebrated in the special seasons.",
    significance:
      "During Ordinary Time, the Church celebrates the fullness of Christ's life and teachings. Rather than focusing on a particular aspect of the mystery of Christ, as in the special seasons, Ordinary Time invites us to reflect on the entirety of Christ's life and mission. It is a time to grow in our understanding of the Gospel and to mature in our discipleship.",
    practices:
      "The liturgical color of Ordinary Time is green, symbolizing growth and hope. The Gloria is sung at Sunday Masses, and the liturgy generally has a less penitential or festive character than the special seasons. This is a time for steady spiritual growth through regular participation in the sacraments, Scripture study, and works of charity.",
    scriptureEmphasis:
      "The readings during Ordinary Time follow a semi-continuous reading of the Gospels (Matthew in Year A, Mark in Year B, and Luke in Year C, with John's Gospel read during Easter and interspersed throughout). The first readings, usually from the Old Testament, are chosen to complement the Gospel. The second readings provide a semi-continuous reading of the New Testament epistles.",
    prayers: ["Te Deum (You are God)", "Prayer of St. Francis", "Anima Christi (Soul of Christ)"],
    keyDates: [
      {
        name: "Week of Prayer for Christian Unity (January 18-25)",
        description: "A period of prayer for the unity of all Christians",
      },
      {
        name: "Feast of the Presentation of the Lord (February 2)",
        description: "Commemorates the presentation of Jesus in the Temple and the purification of Mary",
      },
      {
        name: "Feast of the Chair of St. Peter (February 22)",
        description: "Celebrates the teaching authority of the Pope as successor to St. Peter",
      },
    ],
  },
  {
    id: "lent",
    name: "Lent",
    color: "Purple",
    timeframe: "From Ash Wednesday to the Mass of the Lord's Supper on Holy Thursday",
    description:
      "Lent is a solemn 40-day period of prayer, fasting, and almsgiving in preparation for Easter, recalling Jesus's 40 days in the desert.",
    history:
      "The word 'Lent' comes from the Old English 'lencten,' meaning 'spring.' The 40-day period of preparation for Easter has roots in the early Church, where it was primarily a time of final preparation for catechumens who would be baptized at Easter. By the 4th century, it had developed into a period of penance and renewal for all Christians. The number 40 has biblical significance, recalling the 40 days Jesus spent fasting in the desert, the 40 years the Israelites wandered in the wilderness, and the 40 days Moses spent on Mount Sinai.",
    significance:
      "Lent is a time of spiritual renewal through repentance, conversion, and returning to God. It invites Christians to imitate Christ's withdrawal into the desert through practices of self-denial and spiritual discipline. Lent prepares us to celebrate the Paschal Mystery—Christ's passion, death, and resurrection—with purified hearts. It is also a time when catechumens prepare intensely for baptism at Easter.",
    practices:
      "Traditional Lenten practices include fasting (reducing food intake), abstinence (refraining from meat on Fridays), and almsgiving (charitable giving). Many Catholics also take on additional prayer commitments or give up certain pleasures. The liturgical color is violet, symbolizing penance and preparation. Churches are decorated simply, with no flowers on the altar. The Gloria and Alleluia are omitted from the Mass. Stations of the Cross, a devotional practice tracing Jesus's path to Calvary, are commonly prayed on Fridays.",
    scriptureEmphasis:
      "The readings focus on themes of covenant, conversion, and baptism. The first readings trace salvation history from creation through the covenants with Noah, Abraham, and Moses. The Gospels include Jesus's temptation in the desert, the Transfiguration, and, in the later weeks, events leading to His passion. The scrutinies for the elect (those preparing for baptism) feature powerful Gospel readings about the Samaritan woman, the man born blind, and the raising of Lazarus.",
    prayers: [
      "Stations of the Cross",
      "The Penitential Psalms (especially Psalm 51)",
      "Prayer of St. Ephrem",
      "Stabat Mater (The Mother Stood)",
    ],
    keyDates: [
      {
        name: "Ash Wednesday",
        description: "Marks the beginning of Lent with the imposition of ashes",
      },
      {
        name: "First Sunday of Lent",
        description: "Features the Gospel of Jesus's temptation in the desert",
      },
      {
        name: "Solemnity of St. Joseph (March 19)",
        description: "Honors the foster father of Jesus",
      },
      {
        name: "Solemnity of the Annunciation (March 25)",
        description: "Celebrates the angel Gabriel's announcement to Mary and her acceptance",
      },
      {
        name: "Laetare Sunday (Fourth Sunday of Lent)",
        description: "A day of rejoicing amid the penitential season, marked by rose vestments",
      },
      {
        name: "Holy Week",
        description:
          "The final week of Lent, commemorating Christ's triumphant entry into Jerusalem, the Last Supper, and His passion and death",
      },
    ],
  },
  {
    id: "easter",
    name: "Easter",
    color: "White",
    timeframe: "From Easter Sunday through Pentecost Sunday (50 days)",
    description:
      "The Easter season celebrates Christ's resurrection from the dead and the outpouring of the Holy Spirit, marking the birth of the Church.",
    history:
      "Easter has been celebrated since apostolic times as the central feast of Christianity. The Council of Nicaea (325 AD) established that Easter would be celebrated on the first Sunday after the first full moon following the spring equinox. The 50-day celebration from Easter to Pentecost was established early in Church history, reflecting the 50 days that Christ spent with His disciples between His resurrection and ascension, plus the 10 days until the descent of the Holy Spirit at Pentecost.",
    significance:
      "Easter is the most important and joyful season in the liturgical year, celebrating Christ's victory over sin and death. The resurrection validates Jesus's teachings and sacrificial death, confirming His divinity and offering the promise of eternal life to believers. The season culminates in Pentecost, celebrating the gift of the Holy Spirit and the birth of the Church. Easter is not merely a historical commemoration but a present reality—Christ is risen and alive today, continuing His work through the Church.",
    practices:
      "The liturgical color is white or gold, symbolizing joy, purity, and the glory of the resurrection. Churches are decorated with flowers, especially Easter lilies. The Paschal candle, lit at the Easter Vigil, remains prominently displayed throughout the season. The Gloria and Alleluia return to the liturgy with special emphasis. The Easter sequence, 'Victimae Paschali Laudes,' is sung on Easter Sunday. The 'Regina Caeli' (Queen of Heaven) replaces the Angelus prayer during this season. Many Catholics renew their baptismal promises during Easter, and holy water is blessed anew at the Easter Vigil.",
    scriptureEmphasis:
      "The readings focus on the resurrection appearances of Jesus, the early Church as described in the Acts of the Apostles, and the Book of Revelation. The Gospel of John features prominently, with its rich theological reflections on Christ as the Good Shepherd, the True Vine, and the source of living water. These readings emphasize the new life of the baptized and the mission of the Church.",
    prayers: [
      "Regina Caeli (Queen of Heaven, Rejoice)",
      "Victimae Paschali Laudes (To the Paschal Victim)",
      "Veni Creator Spiritus (Come, Creator Spirit)",
    ],
    keyDates: [
      {
        name: "Easter Sunday",
        description: "Celebrates Christ's resurrection from the dead",
      },
      {
        name: "Divine Mercy Sunday (Second Sunday of Easter)",
        description: "Emphasizes God's mercy, based on the revelations to St. Faustina Kowalska",
      },
      {
        name: "Ascension Thursday (40 days after Easter, sometimes moved to the following Sunday)",
        description: "Commemorates Christ's ascension into heaven",
      },
      {
        name: "Pentecost Sunday (50 days after Easter)",
        description: "Celebrates the descent of the Holy Spirit upon the apostles and the birth of the Church",
      },
    ],
  },
  {
    id: "ordinary-time-2",
    name: "Ordinary Time (Second Part)",
    color: "Green",
    timeframe: "From the day after Pentecost until the First Sunday of Advent",
    description:
      "The second and longer part of Ordinary Time focuses on living out the faith in daily life and growing in discipleship.",
    history:
      "This extended period of Ordinary Time was formalized after the Second Vatican Council to emphasize the importance of Christ's entire ministry and the ongoing life of the Church. It encompasses much of what was traditionally called the 'Time after Pentecost' in the pre-Vatican II calendar.",
    significance:
      "This portion of Ordinary Time invites Christians to live out the mysteries celebrated during the Easter season. Having received the gift of the Holy Spirit at Pentecost, the Church now focuses on its mission in the world. The many Sundays of this season allow for a comprehensive exploration of Christ's teachings and their application to daily life. As the season progresses toward Advent, the readings increasingly focus on eschatological themes—the end times and Christ's second coming.",
    practices:
      "As in the first part of Ordinary Time, the liturgical color is green, symbolizing growth and hope. The liturgy follows the regular pattern for Ordinary Time, with the Gloria sung on Sundays and solemnities. This extended period allows for deeper exploration of the Christian life through ongoing catechesis, Scripture study, and works of charity.",
    scriptureEmphasis:
      "The readings continue the semi-continuous reading of the Gospels and epistles. As the liturgical year draws to a close, the readings focus increasingly on the end times and final judgment, preparing for the themes of Advent.",
    prayers: [
      "Prayer for the Faithful Departed",
      "Prayer of St. Francis",
      "Memorare",
      "Prayer to St. Michael the Archangel",
    ],
    keyDates: [
      {
        name: "Solemnity of the Most Holy Trinity (Sunday after Pentecost)",
        description: "Celebrates the mystery of one God in three divine persons",
      },
      {
        name: "Solemnity of the Most Holy Body and Blood of Christ (Corpus Christi, Sunday after Trinity Sunday)",
        description: "Honors the real presence of Christ in the Eucharist",
      },
      {
        name: "Solemnity of the Sacred Heart of Jesus (Friday after Corpus Christi)",
        description: "Venerates Christ's heart as the symbol of divine love",
      },
      {
        name: "Solemnity of Sts. Peter and Paul (June 29)",
        description: "Honors the two great apostles who founded the Church in Rome",
      },
      {
        name: "Solemnity of the Assumption of Mary (August 15)",
        description: "Celebrates Mary's bodily assumption into heaven",
      },
      {
        name: "Solemnity of All Saints (November 1)",
        description: "Honors all saints, known and unknown",
      },
      {
        name: "Commemoration of All the Faithful Departed (All Souls' Day, November 2)",
        description: "Remembers and prays for all who have died",
      },
      {
        name: "Solemnity of Our Lord Jesus Christ, King of the Universe (Last Sunday of Ordinary Time)",
        description: "Celebrates Christ's sovereignty over all creation and marks the end of the liturgical year",
      },
    ],
  },
]
