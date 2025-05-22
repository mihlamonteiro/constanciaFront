import React from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  ShoppingBag,
  Users,
  Briefcase,
  UserPlus,
  Tag,
  Star,
  ThumbsUp,
  Clock
} from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="fixed top-0 left-0 h-screen bg-white shadow-md border-r border-gray-200 group transition-all duration-300 w-16 hover:w-64 z-50 overflow-hidden">
      {/* LOGO */}
      <div className="p-4 flex justify-center group-hover:justify-start transition-all">
        <img
          src="/logo.png"
          alt="Constância Aromas"
          className="h-10 object-contain"
        />
      </div>

      {/* LINKS */}
      <nav className="p-2">
        <ul className="space-y-1 text-sm font-serif text-gray-800 font-medium">
          <SidebarItem to="/dashboard" icon={<Home size={20} />} label="Dashboard" />
          <SidebarItem to="/produtos" icon={<ShoppingBag size={20} />} label="Produtos" />
          <SidebarItem to="/clientes" icon={<Users size={20} />} label="Clientes" />
          <SidebarItem to="/funcionarios" icon={<Briefcase size={20} />} label="Funcionários" />
          <SidebarItem to="/administradores" icon={<UserPlus size={20} />} label="Administradores" />
          <SidebarItem to="/cupons" icon={<Tag size={20} />} label="Cupons" />
          <SidebarItem to="/compras" icon={<ShoppingBag size={20} />} label="Compras" />
          <SidebarItem to="/avaliacoes" icon={<Star size={20} />} label="Avaliações" />
          <SidebarItem to="/indicacoes" icon={<ThumbsUp size={20} />} label="Indicações" />
          <SidebarItem to="/compras/historico" icon={<Clock size={20} />} label="Histórico de Compras" />
        </ul>
      </nav>
    </aside>
  );
};

const SidebarItem = ({ to, icon, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 rounded-md transition-all ${
          isActive ? "bg-gray-100 font-semibold" : "hover:bg-gray-100"
        }`
      }
    >
      <div className="min-w-[24px] flex justify-center">{icon}</div>
      <span className="hidden group-hover:inline-block transition-all duration-300">
        {label}
      </span>
    </NavLink>
  );
};

export default Sidebar;
