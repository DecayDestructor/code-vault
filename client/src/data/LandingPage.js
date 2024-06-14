import { Lock, PenBox, Search, User } from 'lucide-react'

export const features = [
  'Users can manage code snippets by creating, editing, and deleting them, including title, description, language tag, and code content.',
  'Search functionality enables finding snippets based on keywords, tags, or programming languages. Filters refine search results for better precision.',
  'Display code snippets with syntax highlighting for improved readability and comprehension.',
  'Users can tag snippets with keywords or categorize them into folders for better organization and navigation.',
]
export const header = ['C', 'o', 'd', 'e', ' ', 'V', 'a', 'u', 'l', 't']
export const pointers = [
  {
    header: 'Centralized Platform',
    description:
      'CodeVault serves as a centralized platform for organizing, sharing, and discovering code snippets.',
  },
  {
    header: 'Workflow Simplification',
    description:
      "It simplifies developers' workflows by providing intuitive tools and features tailored to their needs.",
  },
  {
    header: 'Collaboration and Sharing',
    description:
      'CodeVault fosters collaboration and knowledge sharing among developers, enabling them to share code snippets easily with colleagues and the wider community.',
  },
  {
    header: 'Learning and Growth',
    description:
      "It accelerates developers' learning and growth by providing access to a diverse range of code snippets contributed by developers of all skill levels.",
  },
]

export const getStartedFeatures = [
  {
    title: 'Sign Up or Sign In',
    description: 'Create an account or sign in to start using our platform.',
    // icon: <Lock />,
    action: 'Sign Up',
    link: '/signup',
  },
  {
    title: 'Create Your First Snippet',
    description:
      'Start by creating your first code snippet and share it with the community.',
    // icon: <PenBox />,
    action: 'Create Snippet',
    link: '/create-snippet',
  },
  {
    title: 'Explore Popular Snippets',
    description:
      'Discover popular code snippets shared by the community for inspiration.',
    // icon: <Search />,
    action: 'Explore',
    link: '/explore',
  },
  {
    title: 'Get Help & Support',
    description:
      'Need assistance? Get help from our support team or community forum.',
    // icon: <User />,
    action: 'Get Help',
    link: '/support',
  },
]
