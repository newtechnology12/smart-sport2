"use client"

import { DesktopTopNav } from "./desktop-top-nav"
import { MobileBottomNav } from "./mobile-bottom-nav"
import { MobileSearch } from "./mobile-search"

export function AppNavigation() {
  return (
    <>
      <DesktopTopNav />
      <MobileSearch />
      <MobileBottomNav />
    </>
  )
}
