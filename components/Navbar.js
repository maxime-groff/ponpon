import React from "react";
import { useTheme } from "next-themes";

export default function Navbar({ user }) {
  const { theme, setTheme } = useTheme();
  const switchTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <div className="container mx-auto px-4">
      <nav className="flex justify-between items-center py-4">
        <p className="text-2xl font-bold text-grey-800">Ponpon</p>
        <div className="flex">
          {user && (
            <a
              href="/api/logout/"
              className="rounded bg-red-500 hover:bg-red-600 text-white py-2 px-4 mr-4"
            >
              Logout
            </a>
          )}
          {!user && (
            <a
              href="/api/login/"
              className="rounded bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 mr-4"
            >
              Login
            </a>
          )}
          <button
            type="button"
            className="text-sm bg-blue-800 hover:bg-blue-900 text-white py-1 px-2 rounded"
            onClick={switchTheme}
          >
            Change theme
          </button>
        </div>
      </nav>
    </div>
  );
}
