import { Link } from "react-router-dom";
import { ShoppingBag, Search, User, PlusCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-[#fcfbf8]/80 backdrop-blur-lg border-b thin-border">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-10 h-24 flex items-center justify-between gap-8">
        <div className="flex-none">
          <Link
            to="/"
            className="font-serif text-[2.25rem] leading-none italic tracking-tight text-[#32453a] group flex items-baseline gap-5"
          >
            ReWear
            <span className="hidden xl:inline-block not-italic text-[11px] uppercase tracking-[0.25em] font-sans text-[#7a7a7a] font-medium">
              / BORROW · BUY · BELONG
            </span>
          </Link>
        </div>

        <div className="hidden lg:flex flex-1 items-center justify-start xl:justify-center gap-10 xl:gap-14 text-[11px] uppercase tracking-[0.2em] font-medium text-[#7a7a7a] pl-4 xl:pl-0">
          <Link to="/shop" className="hover:text-[#2a3d32] transition-colors">
            Shop
          </Link>
          <Link to="/list" className="hover:text-[#2a3d32] transition-colors">
            List a piece
          </Link>
          <Link
            to="/how-it-works"
            className="hover:text-[#2a3d32] transition-colors"
          >
            How it works
          </Link>
          {user && (
            <Link
              to="/dashboard"
              className="hover:text-[#2a3d32] transition-colors"
            >
              Dashboard
            </Link>
          )}
        </div>

        <div className="flex flex-none justify-end items-center gap-8 text-[11px] uppercase tracking-[0.2em] font-medium text-[#7a7a7a]">
          <Link
            to="/list"
            className="hidden sm:flex items-center gap-1.5 hover:text-[#2a3d32] transition-colors"
          >
            <PlusCircle className="w-4 h-4 stroke-[1.5]" /> List
          </Link>

          {!user ? (
            <>
              <Link
                to="/sign-in"
                className="hover:text-[#2a3d32] transition-colors"
              >
                Sign in
              </Link>
              <Link
                to="/sign-in"
                className="bg-[#2a3d32] text-white px-7 py-3 flex items-center gap-2 hover:bg-[#1f2d25] transition-colors rounded-[2px] leading-none font-medium"
              >
                JOIN <ShoppingBag className="w-4 h-4 stroke-[2]" />
              </Link>
            </>
          ) : (
            <Link
              to="/dashboard"
              className="border border-[#2a3d32]/20 px-5 py-2.5 hover:bg-[#2a3d32]/5 text-[#2a3d32] transition-colors flex items-center gap-2 rounded-[2px]"
            >
              <User className="w-3.5 h-3.5" />
              {user.name}
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
