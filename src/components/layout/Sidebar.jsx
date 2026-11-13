
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  FilePlus,
  ClipboardList,
  Map,
  Settings,
  Menu,
  X,
  FolderKanban,
} from 'lucide-react'

function Sidebar({ role = 'student' }) {
  const [isOpen, setIsOpen] = useState(false)

  const studentLinks = [
    {
      name: 'Dashboard',
      path: '/student/dashboard',
      icon: LayoutDashboard,
      available: true,
    },
    {
  name: 'Report an Issue',
  path: '/student/report',
  icon: FilePlus,
  available: true,
},
    {
  name: 'My Reports',
  path: '/student/reports',
  icon: ClipboardList,
  available: true,
},
    {
      name: 'Map View',
      path: '#',
      icon: Map,
      available: false,
    },
    {
      name: 'Settings',
      path: '#',
      icon: Settings,
      available: false,
    },
  ]

  const adminLinks = [
    {
      name: 'Dashboard',
      path: '/admin/dashboard',
      icon: LayoutDashboard,
      available: true,
    },
    {
      name: 'Manage Reports',
      path: '#',
      icon: FolderKanban,
      available: false,
    },
    {
      name: 'Map View',
      path: '#',
      icon: Map,
      available: false,
    },
    {
      name: 'Settings',
      path: '#',
      icon: Settings,
      available: false,
    },
  ]

  const links = role === 'admin' ? adminLinks : studentLinks

  return (
    <>
      {/* Mobile menu button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="m-4 flex items-center gap-2 rounded-lg border border-border bg-surface p-2 text-text-primary md:hidden"
        aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
        <span className="text-sm font-medium">
          {isOpen ? 'Close Menu' : 'Open Menu'}
        </span>
      </button>

      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? 'block' : 'hidden'
        } w-full border-r border-border bg-surface md:block md:min-h-full md:w-64 md:shrink-0`}
      >
        <div className="p-5">
          <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-text-secondary">
            {role === 'admin' ? 'Administration' : 'Student Menu'}
          </p>

          <nav className="flex flex-col gap-2">
            {links.map((link) => {
              const Icon = link.icon

              if (!link.available) {
                return (
                  <div
                    key={link.name}
                    title="Coming soon"
                    className="flex cursor-not-allowed items-center justify-between rounded-lg px-4 py-3 text-sm text-text-secondary opacity-60"
                  >
                    <span className="flex items-center gap-3">
                      <Icon size={19} />
                      {link.name}
                    </span>

                    <span className="text-xs">Soon</span>
                  </div>
                )
              }

              return (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-primary/10 text-primary'
                        : 'text-text-secondary hover:bg-background hover:text-primary'
                    }`
                  }
                >
                  <Icon size={19} />
                  {link.name}
                </NavLink>
              )
            })}
          </nav>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
