export interface Saint {
  id: string;
  name: string;
  feastDate: string;
  type: 'Martyr' | 'Confessor' | 'Virgin' | 'Pope' | 'Doctor' | 'Other';
  title?: string;
  shortBio: string;
  life: string;
  legacy: string;
  patronOf: string[];
  prayers: {
    title: string;
    text: string;
  }[];
  quotes: {
    text: string;
    source?: string;
  }[];
  readings: {
    title: string;
    citation: string;
    text: string;
  }[];
  imageUrl?: string;
  born?: string;
  died?: string;
  canonizedDate?: string;
  liturgicalColor: 'Red' | 'White' | 'Green' | 'Purple' | 'Rose';
}

// Sample data - would be replaced by API or database lookup
export const saintsData: Saint[] = [
  {
    id: "thomas-aquinas",
    name: "St. Thomas Aquinas",
    feastDate: "January 28",
    type: "Doctor",
    title: "Doctor of the Church, Angelic Doctor",
    shortBio: "Dominican friar, philosopher, and theologian who harmonized faith and reason.",
    life: "Thomas Aquinas was born in 1225 to a noble family in Italy. Against his family's wishes, he joined the Dominican Order. He studied under Albert the Great and became a renowned scholar, producing works like the Summa Theologiae that systematically presented Catholic theology using Aristotelian methods.",
    legacy: "Thomas Aquinas' integration of Aristotelian philosophy with Christian theology created a comprehensive system that continues to influence Catholic thought. His work demonstrates how faith and reason are complementary paths to truth. Pope Leo XIII recommended his work as a model for Catholic philosophy and theology.",
    patronOf: ["Students", "Universities", "Philosophers", "Theologians", "Booksellers"],
    prayers: [
      {
        title: "Prayer for Students",
        text: "Creator of all things, true source of light and wisdom, origin of all being, graciously let a ray of your light penetrate the darkness of my understanding. Take from me the double darkness in which I have been born, an obscurity of sin and ignorance. Through Saint Thomas Aquinas, guide my studies and help me embrace the values of truth, goodness, and love. Amen."
      }
    ],
    quotes: [
      {
        text: "The things that we love tell us what we are.",
        source: "Commentary on the Divine Names"
      },
      {
        text: "To one who has faith, no explanation is necessary. To one without faith, no explanation is possible.",
        source: "Attributed"
      }
    ],
    readings: [
      {
        title: "On Wisdom",
        citation: "Summa Contra Gentiles, Book I, Chapter 2",
        text: "The office of the wise man is to order. For all things ought to be ordered to the end of the good; and the good itself is that which is chief in any order. But a twofold order is found in things..."
      }
    ],
    imageUrl: "/images/saints/thomas-aquinas.jpg",
    born: "1225",
    died: "March 7, 1274",
    canonizedDate: "July 18, 1323",
    liturgicalColor: "White"
  },
  {
    id: "teresa-avila",
    name: "St. Teresa of Ávila",
    feastDate: "October 15",
    type: "Doctor",
    title: "Doctor of the Church, The Mystic",
    shortBio: "Spanish mystic, Carmelite nun, author, and theologian of contemplative life through mental prayer.",
    life: "Teresa was born in Ávila, Spain, in 1515. At age 20, she entered the Carmelite Monastery of the Incarnation. After a serious illness and periods of spiritual dryness, she experienced profound mystical encounters with Christ. She reformed the Carmelite Order, founding the Discalced Carmelites with St. John of the Cross.",
    legacy: "St. Teresa's writings, especially 'The Interior Castle' and her autobiography, are masterpieces of Spanish literature and Christian mysticism. Her practical approach to mystical theology made contemplation accessible to ordinary people. She was the first woman declared a Doctor of the Church in 1970.",
    patronOf: ["Spain", "Religious", "Headache sufferers", "Writers"],
    prayers: [
      {
        title: "Prayer for Trust",
        text: "Let nothing disturb you, Let nothing frighten you, All things are passing away: God never changes. Patience obtains all things. Whoever has God lacks nothing; God alone suffices. Amen."
      }
    ],
    quotes: [
      {
        text: "The important thing is not to think much but to love much; and so do that which best stirs you to love.",
        source: "The Interior Castle"
      },
      {
        text: "Christ has no body now on earth but yours.",
        source: "Attributed"
      }
    ],
    readings: [
      {
        title: "On Prayer",
        citation: "The Way of Perfection, Chapter 21",
        text: "I am not asking you now that you think about Him or that you form many great and subtle conceptions, or that you make long and serious meditations with your understanding. I am asking only that you look at Him."
      }
    ],
    imageUrl: "/images/saints/teresa-avila.jpg",
    born: "March 28, 1515",
    died: "October 4, 1582",
    canonizedDate: "March 12, 1622",
    liturgicalColor: "White"
  }
];

export async function getSaint(id: string): Promise<Saint | null> {
  // In a real app, this would fetch from an API or database
  return saintsData.find(saint => saint.id === id) || null;
}

export async function getAllSaints(): Promise<Saint[]> {
  // In a real app, this would fetch from an API or database
  return saintsData;
}

export async function getSaintOfTheDay(date?: Date): Promise<Saint | null> {
  // Use current date if not provided
  const currentDate = date || new Date();
  
  // For demo purposes, return a sample saint
  // In a real app, this would look up based on the liturgical calendar
  return saintsData[0];
} 