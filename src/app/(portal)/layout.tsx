import { AppSidebar } from '@/components/layout/app-sidebar'
import { MobileBottomNav } from '@/components/layout/mobile-bottom-nav'
import { MobileHeader } from '@/components/layout/mobile-header'

export default function PortalLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <AppSidebar />
      <div className="ml-0 md:ml-60">
        <MobileHeader />
        <main className="min-h-screen bg-[#FBFBFD] pt-[52px] pb-[calc(56px+env(safe-area-inset-bottom))] md:pt-0 md:pb-0">
          {children}
        </main>
        <MobileBottomNav />
      </div>
    </>
  )
}
