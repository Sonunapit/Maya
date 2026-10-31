import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import MobileSidebar from "./MobileSidebar.jsx";
import Header from "./Header.jsx";

export default function MainLayout() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex h-full bg-app text-ink">
      <aside className="hidden w-72 shrink-0 border-r border-line md:block"><Sidebar /></aside>
      <MobileSidebar open={open} onClose={() => setOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header onMenu={() => setOpen(true)} />
        <main className="min-h-0 flex-1"><Outlet /></main>
      </div>
    </div>
  );
}
