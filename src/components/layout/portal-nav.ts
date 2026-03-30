import {
  Bell,
  BookOpen,
  CheckSquare,
  Clock,
  FileText,
  LayoutDashboard,
  Mail,
  MessageSquare,
  Settings,
  User,
  type LucideIcon,
} from 'lucide-react'

export interface PortalNavItem {
  label: string
  href: string
  icon: LucideIcon
  badge?: string
  key: string
}

export interface PortalNavSection {
  label: string
  items: PortalNavItem[]
}

export const portalNavSections: PortalNavSection[] = [
  {
    label: 'Learn',
    items: [
      { key: 'dashboard', label: 'Home / Dashboard', href: '/dashboard', icon: LayoutDashboard },
      { key: 'course', label: 'My Course', href: '/courses/basic-esthetics/chapters/3', icon: BookOpen },
      { key: 'hours', label: 'Hours', href: '/hours', icon: Clock },
      { key: 'skills', label: 'Skills', href: '/skills', icon: CheckSquare },
    ],
  },
  {
    label: 'Connect',
    items: [
      { key: 'forums', label: 'Forums', href: '/forums', icon: MessageSquare },
      { key: 'messages', label: 'Messages', href: '/messages', icon: Mail },
      { key: 'assessments', label: 'Assessments', href: '/assessments', icon: FileText },
    ],
  },
  {
    label: 'Account',
    items: [
      { key: 'notifications', label: 'Notifications', href: '/notifications', icon: Bell, badge: '3' },
      { key: 'settings', label: 'Settings', href: '/settings', icon: Settings },
    ],
  },
]

export const mobileTabs: Array<{ label: string; href: string; icon: LucideIcon; key: string }> = [
  { key: 'home', label: 'Home', href: '/dashboard', icon: LayoutDashboard },
  { key: 'learn', label: 'Learn', href: '/courses/basic-esthetics/chapters/3', icon: BookOpen },
  { key: 'hours', label: 'Hours', href: '/hours', icon: Clock },
  { key: 'community', label: 'Community', href: '/forums', icon: MessageSquare },
  { key: 'profile', label: 'Profile', href: '/settings', icon: User },
]
