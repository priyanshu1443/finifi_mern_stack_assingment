
import "./globals.css";

import Sidebar from "@/components/Sidebar";

import { config } from "@fortawesome/fontawesome-svg-core";
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="flex bg-slate-100">
          <div className="bg-blue-50 w-52 h-[100vh] pl-6 pt-8">
            <Sidebar />
          </div>
          <div className="w-full relative">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
