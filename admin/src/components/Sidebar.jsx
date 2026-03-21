import React from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, PlusSquare, ListTodo, PackageSearch, Users, TicketPercent, BarChart4, ShieldCheck } from 'lucide-react'

const Sidebar = () => {
  const routes = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Add Items', path: '/add', icon: PlusSquare },
    { name: 'List Items', path: '/list', icon: ListTodo },
    { name: 'Orders', path: '/orders', icon: PackageSearch },
    { name: 'User Control', path: '/users', icon: Users },
    { name: 'Coupons', path: '/coupons', icon: TicketPercent },
    { name: 'Analytics', path: '/analytics', icon: BarChart4 },
    { name: 'Admin Roles', path: '/admins', icon: ShieldCheck },
  ];

  return (
    <div className='w-[20%] lg:w-[15%] min-h-screen border-r border-gray-200 bg-white flex flex-col'>
      {/* Spacer matching navbar */}
      <div className="h-[20px]"></div>

      <nav className='flex flex-col gap-2 pt-6 px-4 xl:pl-6 text-[14px] xl:text-[15px] font-medium text-gray-600'>
        <p className="text-xs uppercase tracking-wider font-bold text-gray-400 mb-2 pl-2">Menu</p>
        
        {routes.map((route) => (
          <NavLink 
            key={route.path} 
            to={route.path} 
            className={({ isActive }) => 
              `flex items-center gap-3 px-4 py-3 rounded-xl tracking-wide transition-all duration-300
               ${isActive 
                 ? 'bg-[#6B4E2E] text-white shadow-md shadow-[#6B4E2E]/20 font-bold translate-x-1' 
                 : 'hover:bg-gray-50 hover:text-gray-900 border border-transparent'
               }`
            }
          >
             <route.icon size={20} strokeWidth={1.5} />
             <p className='hidden md:block truncate'>{route.name}</p>
          </NavLink>
        ))}
      </nav>
    </div>
  )
}

export default Sidebar
