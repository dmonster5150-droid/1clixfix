import React from 'react';
import { Outlet, Link } from 'react-router-dom';
export default function App(){
  return (
    <div className="min-h-screen font-sans">
      <header className="bg-gradient-to-r from-blue-400 to-cyan-400 text-white p-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="text-2xl font-bold">1ClikFixx</div>
          <nav className="space-x-4">
            <Link to="/" className="underline">Book</Link>
            <Link to="/subscribe" className="underline">Subscribe</Link>
            <Link to="/calendar" className="underline">Calendar</Link>
            <Link to="/login" className="underline">Login</Link>
          </nav>
        </div>
      </header>
      <main className="p-6 max-w-5xl mx-auto">
        <Outlet />
      </main>
      <footer className="bg-red-600 text-white p-4 text-center">© 2025 1ClikFixx</footer>
    </div>
  )
}
