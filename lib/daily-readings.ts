export type Reading = {
  reference: string;
  text: string;
  type: 'first' | 'psalm' | 'second' | 'gospel' | 'acclamation';
};

export type DailyReadings = {
  date: string; // Format: YYYY-MM-DD
  liturgicalDay: string;
  season: string;
  readings: Reading[];
};

// Sample readings for May 2025
const readingsData: Record<string, DailyReadings> = {
  // May 10, 2025 - Saturday of the 5th Week of Easter
  "2025-05-10": {
    date: "2025-05-10",
    liturgicalDay: "Saturday of the 5th Week of Easter",
    season: "Easter",
    readings: [
      {
        type: "first",
        reference: "Acts 16:1-10",
        text: `Paul reached also Derbe and Lystra where there was a disciple named Timothy, the son of a Jewish woman who was a believer, but his father was a Greek. The brothers in Lystra and Iconium spoke highly of him, and Paul wanted him to come along with him. On account of the Jews of that region, Paul had him circumcised, for they all knew that his father was a Greek. As they traveled from city to city, they handed on to the people for observance the decisions reached by the Apostles and presbyters in Jerusalem. Day after day the churches grew stronger in faith and increased in number.

They traveled through the Phrygian and Galatian territory because they had been prevented by the Holy Spirit from preaching the message in the province of Asia. When they came to Mysia, they tried to go on into Bithynia, but the Spirit of Jesus did not allow them, so they crossed through Mysia and came down to Troas.

During the night Paul had a vision. A Macedonian stood before him and implored him with these words, "Come over to Macedonia and help us." When he had seen the vision, we sought passage to Macedonia at once, concluding that God had called us to proclaim the Good News to them.`
      },
      {
        type: "psalm",
        reference: "Psalm 100:1b-2, 3, 5",
        text: `R. (2a) Let all the earth cry out to God with joy.
or:
R. Alleluia.

Sing joyfully to the LORD, all you lands;
serve the LORD with gladness;
come before him with joyful song.
R. Let all the earth cry out to God with joy.
or:
R. Alleluia.

Know that the LORD is God;
he made us, his we are;
his people, the flock he tends.
R. Let all the earth cry out to God with joy.
or:
R. Alleluia.

The LORD is good:
his kindness endures forever,
and his faithfulness, to all generations.
R. Let all the earth cry out to God with joy.
or:
R. Alleluia.`
      },
      {
        type: "acclamation",
        reference: "Colossians 3:1",
        text: `R. Alleluia, alleluia.
If then you were raised with Christ,
seek what is above,
where Christ is seated at the right hand of God.
R. Alleluia, alleluia.`
      },
      {
        type: "gospel",
        reference: "John 15:18-21",
        text: `Jesus said to his disciples: "If the world hates you, realize that it hated me first. If you belonged to the world, the world would love its own; but because you do not belong to the world, and I have chosen you out of the world, the world hates you. Remember the word I spoke to you, 'No slave is greater than his master.' If they persecuted me, they will also persecute you. If they kept my word, they will also keep yours. And they will do all these things to you on account of my name, because they do not know the one who sent me."`
      }
    ]
  },
  // May 11, 2025 - Ascension of the Lord
  "2025-05-11": {
    date: "2025-05-11",
    liturgicalDay: "Solemnity of the Ascension of the Lord",
    season: "Easter",
    readings: [
      {
        type: "first",
        reference: "Acts 1:1-11",
        text: `In the first book, Theophilus, I dealt with all that Jesus did and taught until the day he was taken up, after giving instructions through the Holy Spirit to the apostles whom he had chosen. He presented himself alive to them by many proofs after he had suffered, appearing to them during forty days and speaking about the kingdom of God. While meeting with them, he enjoined them not to depart from Jerusalem, but to wait for "the promise of the Father about which you have heard me speak; for John baptized with water, but in a few days you will be baptized with the Holy Spirit."

When they had gathered together they asked him, "Lord, are you at this time going to restore the kingdom to Israel?" He answered them, "It is not for you to know the times or seasons that the Father has established by his own authority. But you will receive power when the Holy Spirit comes upon you, and you will be my witnesses in Jerusalem, throughout Judea and Samaria, and to the ends of the earth." When he had said this, as they were looking on, he was lifted up, and a cloud took him from their sight. While they were looking intently at the sky as he was going, suddenly two men dressed in white garments stood beside them. They said, "Men of Galilee, why are you standing there looking at the sky? This Jesus who has been taken up from you into heaven will return in the same way as you have seen him going into heaven."`
      },
      {
        type: "psalm",
        reference: "Psalm 47:2-3, 6-7, 8-9",
        text: `R. (6) God mounts his throne to shouts of joy: a blare of trumpets for the Lord.
or:
R. Alleluia.

All you peoples, clap your hands,
shout to God with cries of gladness,
For the LORD, the Most High, the awesome,
is the great king over all the earth.
R. God mounts his throne to shouts of joy: a blare of trumpets for the Lord.
or:
R. Alleluia.

God mounts his throne amid shouts of joy;
the LORD, amid trumpet blasts.
Sing praise to God, sing praise;
sing praise to our king, sing praise.
R. God mounts his throne to shouts of joy: a blare of trumpets for the Lord.
or:
R. Alleluia.

For king of all the earth is God;
sing hymns of praise.
God reigns over the nations,
God sits upon his holy throne.
R. God mounts his throne to shouts of joy: a blare of trumpets for the Lord.
or:
R. Alleluia.`
      },
      {
        type: "second",
        reference: "Ephesians 1:17-23",
        text: `Brothers and sisters: May the God of our Lord Jesus Christ, the Father of glory, give you a Spirit of wisdom and revelation resulting in knowledge of him. May the eyes of your hearts be enlightened, that you may know what is the hope that belongs to his call, what are the riches of glory in his inheritance among the holy ones, and what is the surpassing greatness of his power for us who believe, in accord with the exercise of his great might, which he worked in Christ, raising him from the dead and seating him at his right hand in the heavens, far above every principality, authority, power, and dominion, and every name that is named not only in this age but also in the one to come. And he put all things beneath his feet and gave him as head over all things to the church, which is his body, the fullness of the one who fills all things in every way.`
      },
      {
        type: "acclamation",
        reference: "Matthew 28:19a, 20b",
        text: `R. Alleluia, alleluia.
Go and teach all nations, says the Lord;
I am with you always, until the end of the world.
R. Alleluia, alleluia.`
      },
      {
        type: "gospel",
        reference: "Mark 16:15-20",
        text: `Jesus said to his disciples: "Go into the whole world and proclaim the gospel to every creature. Whoever believes and is baptized will be saved; whoever does not believe will be condemned. These signs will accompany those who believe: in my name they will drive out demons, they will speak new languages. They will pick up serpents with their hands, and if they drink any deadly thing, it will not harm them. They will lay hands on the sick, and they will recover."

So then the Lord Jesus, after he spoke to them, was taken up into heaven and took his seat at the right hand of God. But they went forth and preached everywhere, while the Lord worked with them and confirmed the word through accompanying signs.`
      }
    ]
  },
  // May 12, 2025 - Monday of the 6th Week of Easter
  "2025-05-12": {
    date: "2025-05-12",
    liturgicalDay: "Monday of the 6th Week of Easter",
    season: "Easter",
    readings: [
      {
        type: "first",
        reference: "Acts 16:11-15",
        text: `We set sail from Troas, making a straight run for Samothrace, and on the next day to Neapolis, and from there to Philippi, a leading city in that district of Macedonia and a Roman colony. We spent some time in that city. On the sabbath we went outside the city gate along the river where we thought there would be a place of prayer. We sat and spoke with the women who had gathered there. One of them, a woman named Lydia, a dealer in purple cloth, from the city of Thyatira, a worshiper of God, listened, and the Lord opened her heart to pay attention to what Paul was saying. After she and her household had been baptized, she offered us an invitation, "If you consider me a believer in the Lord, come and stay at my home," and she prevailed on us.`
      },
      {
        type: "psalm",
        reference: "Psalm 149:1b-2, 3-4, 5-6a and 9b",
        text: `R. (see 4a) The Lord takes delight in his people.
or:
R. Alleluia.

Sing to the LORD a new song
of praise in the assembly of the faithful.
Let Israel be glad in their maker,
let the children of Zion rejoice in their king.
R. The Lord takes delight in his people.
or:
R. Alleluia.

Let them praise his name in the festive dance,
let them sing praise to him with timbrel and harp.
For the LORD loves his people,
and he adorns the lowly with victory.
R. The Lord takes delight in his people.
or:
R. Alleluia.

Let the faithful exult in glory;
let them sing for joy upon their couches.
Let the high praises of God be in their throats.
This is the glory of all his faithful. Alleluia.
R. The Lord takes delight in his people.
or:
R. Alleluia.`
      },
      {
        type: "acclamation",
        reference: "John 15:26b, 27a",
        text: `R. Alleluia, alleluia.
The Spirit of truth will testify to me, says the Lord,
and you also will testify.
R. Alleluia, alleluia.`
      },
      {
        type: "gospel",
        reference: "John 15:26—16:4a",
        text: `Jesus said to his disciples: "When the Advocate comes whom I will send you from the Father, the Spirit of truth who proceeds from the Father, he will testify to me. And you also testify, because you have been with me from the beginning.

"I have told you this so that you may not fall away. They will expel you from the synagogues; in fact, the hour is coming when everyone who kills you will think he is offering worship to God. They will do this because they have not known either the Father or me. I have told you this so that when their hour comes you may remember that I told you."`
      }
    ]
  },
  // Add more days as needed...
};

export function getReadingsForDate(date: Date): DailyReadings | null {
  const dateString = date.toISOString().split('T')[0];
  return readingsData[dateString] || null;
}

export function getReadingsByDateString(dateString: string): DailyReadings | null {
  return readingsData[dateString] || null;
}
