"use client"

import { DesktopTopNav } from "./desktop-top-nav"
import { MobileBottomNav } from "./mobile-bottom-nav"

export function AppNavigation() {
  return (
    <>
      <DesktopTopNav />
      <MobileBottomNav />
    </>
  )
}
