import type { Conversation, ChatMessage  } from "../pages/Message";

export const swapUsers = [
  { id: 1, name: 'Alishba Zulfiqar', verified: true, rating: 4.9, offered: 'Python Basics', needed: 'AI', initials: 'AZ', color: '#8B5CF6', available: '1 hour ago' },
  { id: 2, name: 'Airah Lirn', verified: true, rating: 4.8, offered: 'React Native', needed: 'UI/UX Design', initials: 'AL', color: '#e159a0b6', available: '2 hours ago' },
  { id: 3, name: 'Sarah Ashfaq', verified: true, rating: 4.9, offered: 'Data Science', needed: 'Product Manager', initials: 'SA', color: '#F59E0B', available: '30 min ago' },
   { id: 4, name: 'Saira Noreen', verified: true, rating: 4.9, offered: 'AI', needed: 'Graphic Design', initials: 'SN', color: '#c724a1', available: '1 hour ago' },
  { id: 5, name: 'Amina Ali', verified: true, rating: 4.8, offered: 'QA', needed: 'UI/UX Design', initials: 'AA', color: '#19d093', available: '2 hours ago' },
  { id: 6, name: 'Kashaf Fatima', verified: true, rating: 4.9, offered: 'Product Manager', needed: 'Architecture', initials: 'KF', color: '#0bcef5', available: '30 min ago' },
   { id: 7, name: 'Nimra Yousuf', verified: true, rating: 4.8, offered: 'Architecture', needed: 'UI/UX Design', initials: 'NY', color: '#10B981', available: '1 hours ago' },
  { id: 8, name: 'Aliza Khadim', verified: true, rating: 4.9, offered: 'UI/UX Designer', needed: 'Data Science', initials: 'AK', color: '#f50b2e', available: '30 min ago' },
  { id: 9, name: ' Misbah Muneer', verified: true, rating: 4.9, offered: 'UI/UX Designer', needed: 'Data Science', initials: 'MM', color: '#5abd08', available: '1 min ago' },
]

 export const topTutors = [
  { name: 'Aina Dun', rating: 4.8, badge: 'Top Rated', initials: 'AD', color: '#3B82F6' },
  { name: 'Aroohi Danyal.', rating: 4.8, badge: 'Rising', initials: 'AD', color: '#8B5CF6' },
  { name: 'Solivoarina', rating: 4.7, badge: 'Expert', initials: 'SO', color: '#10B981' },
  { name: 'Kartik Bhupaish', rating: 4.9, badge: 'Top Rated', initials: 'KB', color: '#F59E0B' },
  { name: 'Jacky Chen', rating: 4.8, badge: 'Expert', initials: 'JC', color: '#EF4444' },
 { name: 'Olivia', rating: 4.6, badge: 'Expert', initials: 'OL', color: '#3B82F6' },
  { name: 'Mukaish Ambani', rating: 4.4, badge: 'Top Rated', initials: 'MA', color: '#8B5CF6' },
  { name: 'Arpita Lokhande', rating: 4.1, badge: 'Expert', initials: 'AL', color: '#EF4444' },
   { name: 'Mariya Wasti', rating: 4.4, badge: 'Top Rated', initials: 'MW', color: '#8B5CF6' },
  { name: 'Vishwas Singh', rating: 4.1, badge: 'Expert', initials: 'VS', color: '#EF4444' },
 ]
export const workshops = [
  { id: 1, title: 'Live Income Streams Issue with Taopica', topic: 'Finance', time: '12:00 pm', color: '#8B5CF6' },
  { id: 2, title: 'React Native Mentoring in Graphict Workshop', topic: 'Development', time: '12:00 pm', color: '#10B981' },
  { id: 3, title: 'React Native Mentoring Workshop Sharing', topic: 'Development', time: '2:00 pm', color: '#F59E0B' },
  { id: 4, title: 'Advanced CSS Grid & Flexbox Mastery', topic: 'Design', time: '3:30 pm', color: '#EF4444' },
]

export const messages = [
  { name: 'Adah kahan', status: 'Pending', message: 'Hello, Ale today?', initials: 'AC', color: '#3B82F6', time: '2m' },
  { name: 'Marlew S.', status: 'Pending', message: 'Why do you want to learn lane?', initials: 'MS', color: '#8B5CF6', time: '15m' },
]

export const ledgerItems = [
  { label: '+1.5 hrs from React Prep (Jane D.)', amount: '+1.5', positive: true },
  { label: '-1.0 hr for UI Review (Mark L.)', amount: '-1.0', positive: false },
]

export const currentSessions = [
  { title: 'Pending Swaps', sub: 'Pending Sessions', status: 'Pending' },
  { title: 'Pending Sessions', sub: 'Pending Swap', status: 'Pending' },
  { title: 'Pending Swap', sub: 'Pending Sessions', status: 'Pending' },
   { title: 'Pending Sessions', sub: 'Pending Swap', status: 'Pending' },
  { title: 'Pending Swap', sub: 'Pending Sessions', status: 'Pending' },
]
 export const ALL_CATEGORIES = ['Design', 'Development', 'Design & Review', 'Marketing', 'Finance', 'Language', 'Maintainance', 'Others']
export const DURATION_OPTIONS = ['~0.5 hrs', '~1.0 hrs', '~1.5 hrs', '~2.0 hrs', '~3.0 hrs']
 export const conversations: Conversation[] = [
  { id: 1, name: 'Alishba Zulfiqar', initials: 'AZ', color: '#8B5CF6', online: true, time: '2m ago', preview: 'Hi Alex, I can do React Native!', unread: 2 },
  { id: 2, name: 'Airah liran', initials: 'AL', color: '#F59E0B', online: true, time: '1h ago', preview: 'Python Basics: Python Basing Needed tennong nore?', unread: 0 },
  { id: 3, name: 'Sana', initials: 'SK', color: '#3B82F6', online: true, time: '1h ago', preview: 'Python Basics: Graphic Design Needed Nesign', unread: 0, rating: 4.8, verified: true },
  { id: 4, name: 'Aryan khan', initials: 'AK', color: '#10B981', online: false, time: '3h ago', preview: 'When are you available for the session?', unread: 1 },
  { id: 5, name: 'Max Dun', initials: 'MD', color: '#1E293B', online: true, time: '5h ago', preview: 'That workshop was incredible, thanks!', unread: 0 },
  { id: 6, name: 'Lasa Amas', initials: 'LA', color: '#EF4444', online: false, time: 'Yesterday', preview: 'Can we reschedule to next week?', unread: 3 },
  { id: 7, name: 'Mark Chen', initials: 'MC', color: '#6366F1', online: true, time: 'Yesterday', preview: 'Sure, I can help with the UI review!', unread: 0 },
]

 export const chatsByConversation: Record<number, ChatMessage[]> = {
  3: [
    { id: 1, from: 'other', text: 'Hey, there are oytherate about graphic design Needed Needed and Python Basics are any having?', time: '7:37 ago' },
    { id: 2, from: 'me', text: 'Hi, Alishba, I comrroising also make a skills: Graphic Design?', time: '7:38 ago' },
    { id: 3, from: 'other', text: 'Well, you are looking graphic design new skills as my new Python?', time: '7:38 ago' },
    { id: 4, from: 'me', text: "Great, let's schedule a time!", time: '7:30 ago' },
    { id: 5, from: 'other', text: 'Python skills, no wob: lan?', time: '7:38 ago', hasActions: true },
    { id: 6, from: 'me', text: "Great, let's schedule a time!", time: '1:10 ago' },
    { id: 7, from: 'other', text: 'Hey, !itanes is graphic design', time: '1:15 ago' },
  ],
  1: [
    { id: 1, from: 'other', text: 'Hi Alishba, I can do React Native! Would love to swap for Graphic Design.', time: '2m ago' },
    { id: 2, from: 'me', text: 'That sounds perfect! When are you free this week?', time: '1m ago' },
  ],
  2: [
    { id: 1, from: 'other', text: 'Python Basics: Python Basing Needed tennong nore?', time: '1h ago' },
  ],
}
