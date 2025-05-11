# ex314-revamp #

# Ex314.ai - Catholic Theological AI Assistant

Ex314.ai is a web application that provides a Catholic theological AI assistant, offering resources, prayers, and guidance to users seeking to deepen their faith.

## Features

- **AI-Powered Theological Assistant**: Engage in conversations about Catholic theology, doctrine, and teachings.
- **Resource Library**: Access Church documents, catechism references, and theological writings.
- **Liturgical Calendar**: Stay connected to the Church's liturgical year with feast days, solemnities, and seasons.
- **Prayer Repository**: Discover traditional prayers, novenas, and devotions.
- **Saint of the Day**: Learn about the saints celebrated in the Catholic Church.

## Technical Architecture

### Frontend

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React Hooks and Context API
- **Animations**: Canvas-based animations for the Chi-Rho symbol

### Backend

- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **API Routes**: Next.js API routes for server-side operations
- **Analytics**: Custom privacy-focused analytics solution

### AI Integration

- **LLM Provider**: Integration with AI models for theological conversations
- **Content Filtering**: Ensures responses align with Catholic teaching
- **Citation System**: References authoritative Catholic sources

## Privacy

Ex314.ai is committed to user privacy:

- No third-party analytics or tracking
- Self-hosted analytics solution with minimal data collection
- No personal data shared with external services
- Transparent data usage policies

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
   \`\`\`
   git clone https://github.com/yourusername/ex314-ai.git
   cd ex314-ai
   \`\`\`

2. Install dependencies:
   \`\`\`
   npm install
   \`\`\`

3. Set up environment variables:
   Create a `.env.local` file with the following variables:
   \`\`\`
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   \`\`\`

4. Run the development server:
   \`\`\`
   npm run dev
   \`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

The application is deployed on Vercel. Automatic deployments are triggered when changes are pushed to the main branch.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- The Catholic Church for its rich theological tradition
- The open-source community for the tools and libraries used in this project
\`\`\`


