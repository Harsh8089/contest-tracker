import {
  Calendar,
  House,
  Moon,
  RefreshCcw,
  Settings,
  Sun
} from "lucide-react"
import { Button } from "./ui/button";
import {
  Link,
  useLocation
} from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@radix-ui/react-tooltip";
import { useTheme } from "next-themes";

const navItems = [
  {
    title: "Dashboard",
    icon: <House />,
    link: "/"
  },
  {
    title: "Calendar",
    icon: <Calendar />,
    link: "/calendar"
  },
  {
    title: "Admin",
    icon: <Settings />,
    link: "/admin"
  }
];

export default function Navbar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const { theme, setTheme } = useTheme();

  return <header className="sticky top-0 z-10 border-b border-border px-22 bg-white dark:bg-black dark:text-white">
    <div className="w-full flex items-center justify-between py-4">
      <h1 className="text-xl font-bold">
        Contest Tracker
      </h1>
      <div className="flex items-center gap-2">
        {navItems.map((item, index) => {
          return <Button
            key={index}
            variant={currentPath === item.link ? "secondary" : "ghost"}
            size={"default"}
            children={
              <Link
                to={item.link}
                className="flex items-center gap-2"
              >
                {item.icon}
                {item.title}
              </Link>
            }
          />
        })}
      </div>
      <div className="flex items-center gap-4">
        <Button
          onClick={() => window.location.reload()}
          variant={"outline"}
        >
          <RefreshCcw />
          {/* className="animate-spin" */}
          {"Refresh"}
        </Button>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => {
                  theme === 'dark' ? setTheme('light') : setTheme('dark');
                }}
                variant={"ghost"}
                size={"icon"}
                className="p-2"
              >
                {theme === 'dark' ?
                  <Moon className="w-5 h-5" /> :
                  <Sun className="w-5 h-5" />
                }
              </Button>
            </TooltipTrigger>
            <TooltipContent
              side="bottom"
              align="start"
              className="bg-black text-white px-3 py-1 text-sm rounded shadow-md"
            >
              <p>Toggle Theme</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  </header>
};
