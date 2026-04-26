import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Upload } from "lucide-react";
import axios from "axios";

export default function ListPiece() {
  const { user, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/sign-in");
    }
  }, [user, navigate]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Dress");
  const [occasion, setOccasion] = useState("Wedding");
  const [size, setSize] = useState("M");
  const [brand, setBrand] = useState("");
  const [color, setColor] = useState("");
  const [rentalPrice, setRentalPrice] = useState("");
  const [isRent, setIsRent] = useState(true);
  const [isBuy, setIsBuy] = useState(false);
  const [buyPrice, setBuyPrice] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !brand) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      await axios.post(
        "/api/listings",
        {
          title,
          description,
          category,
          occasion,
          size,
          brand,
          color,
          rentalPrice: Number(rentalPrice) || 0,
          buyPrice: Number(buyPrice) || 0,
          image:
            "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=2670&auto=format&fit=crop", // placeholder
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.error || err.message);
    }
  };

  const categories = ["Dress", "Suit", "Traditional", "Outerwear", "Accessory"];
  const occasions = ["Wedding", "Party", "Formal", "Casual"];
  const sizes = ["XS", "S", "M", "L", "XL"];

  if (!user) return null;

  return (
    <div className="bg-[#fcfbf8] border-t thin-border min-h-screen">
      <div className="max-w-[1000px] mx-auto px-6 py-20 lg:py-24">
        <div className="mb-16">
          <div className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#7a7a7a] mb-4">
            New Listing
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-[#2c2c2c] mb-4">
            Lend a piece.{" "}
            <span className="italic text-[#2a3d32]">Make it travel.</span>
          </h1>
          <p className="text-sm text-[#7a7a7a]">
            We dry-clean and deliver each booking. You earn 80% of every
            transaction.
          </p>
        </div>

        {error && (
          <div className="text-red-500 mb-8 p-4 border border-red-200 bg-red-50 text-sm">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row gap-16"
        >
          {/* Left Column: Photos */}
          <div className="md:w-1/3">
            <div className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#7a7a7a] mb-4">
              Photos
            </div>
            <div className="aspect-square border border-dashed border-[#e6e4dc] flex flex-col items-center justify-center text-center p-6 text-[#7a7a7a] hover:bg-black/5 hover:border-[#7a7a7a] cursor-pointer transition-colors">
              <Upload className="w-6 h-6 mb-4 opacity-50" />
              <div className="text-[11px] uppercase tracking-[0.1em] font-semibold">
                Add Photo
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="md:w-2/3 space-y-10 border-t thin-border md:border-t-0 md:pl-8 pt-8 md:pt-0">
            {/* Title / Desc */}
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] font-semibold text-[#7a7a7a] mb-3">
                  Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Emerald silk evening gown"
                  className="w-full bg-transparent border thin-border px-4 py-4 text-sm focus:outline-none focus:border-[#2a3d32] transition-colors"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] font-semibold text-[#7a7a7a] mb-3">
                  Description
                </label>
                <textarea
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Fabric, fit, when you wore it last..."
                  className="w-full bg-transparent border thin-border px-4 py-4 text-sm focus:outline-none focus:border-[#2a3d32] transition-colors resize-none h-32"
                />
              </div>
            </div>

            {/* Selectors */}
            <div className="grid grid-cols-2 gap-8">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] font-semibold text-[#7a7a7a] mb-3">
                  Category
                </label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((c) => (
                    <button
                      type="button"
                      key={c}
                      onClick={() => setCategory(c)}
                      className={`border thin-border px-3 py-2 text-xs transition-colors ${category === c ? "bg-[#2a3d32] text-white border-[#2a3d32]" : "hover:bg-black/5 bg-white/50 text-[#7a7a7a]"}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] font-semibold text-[#7a7a7a] mb-3">
                  Occasion
                </label>
                <div className="flex flex-wrap gap-2">
                  {occasions.map((c) => (
                    <button
                      type="button"
                      key={c}
                      onClick={() => setOccasion(c)}
                      className={`border thin-border px-3 py-2 text-xs transition-colors ${occasion === c ? "bg-[#2a3d32] text-white border-[#2a3d32]" : "hover:bg-black/5 bg-white/50 text-[#7a7a7a]"}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Size / Brand / Color */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <div className="col-span-full md:col-span-1 border-t thin-border pt-8 md:border-none md:pt-0">
                <label className="block text-[10px] uppercase tracking-[0.2em] font-semibold text-[#7a7a7a] mb-3">
                  Size
                </label>
                <div className="flex gap-2">
                  {sizes.map((c) => (
                    <button
                      type="button"
                      key={c}
                      onClick={() => setSize(c)}
                      className={`border thin-border w-10 h-10 flex items-center justify-center text-xs transition-colors ${size === c ? "bg-[#2a3d32] text-white border-[#2a3d32]" : "hover:bg-black/5 bg-white/50 text-[#7a7a7a]"}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] font-semibold text-[#7a7a7a] mb-3">
                  Brand
                </label>
                <input
                  type="text"
                  required
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full bg-transparent border thin-border px-4 py-3.5 text-sm focus:outline-none focus:border-[#2a3d32] transition-colors"
                />
              </div>
            </div>

            {/* Color / Retail */}
            <div className="grid grid-cols-2 gap-8">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] font-semibold text-[#7a7a7a] mb-3">
                  Color
                </label>
                <input
                  type="text"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-full bg-transparent border thin-border px-4 py-3.5 text-sm focus:outline-none focus:border-[#2a3d32] transition-colors"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] font-semibold text-[#7a7a7a] mb-3">
                  Original Retail (Optional)
                </label>
                <input
                  type="number"
                  className="w-full bg-transparent border thin-border px-4 py-3.5 text-sm focus:outline-none focus:border-[#2a3d32] transition-colors"
                />
              </div>
            </div>

            {/* Pricing */}
            <div className="border thin-border p-8 bg-white/40 mt-8">
              <div className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#7a7a7a] mb-6">
                Availability & Pricing
              </div>

              <div className="flex items-center justify-between mb-8">
                <label className="flex items-center gap-3 text-sm text-[#2c2c2c] font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isRent}
                    onChange={(e) => setIsRent(e.target.checked)}
                    className="w-5 h-5 accent-[#2a3d32]"
                  />
                  Available to rent
                </label>
                <div className="relative w-32">
                  <input
                    type="number"
                    value={rentalPrice}
                    onChange={(e) => setRentalPrice(e.target.value)}
                    disabled={!isRent}
                    placeholder="₹/day"
                    className="w-full bg-transparent border thin-border px-4 py-2 text-sm focus:outline-none focus:border-[#2a3d32] transition-colors text-right placeholder-gray-300 disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-3 text-sm text-[#2c2c2c] font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isBuy}
                    onChange={(e) => setIsBuy(e.target.checked)}
                    className="w-5 h-5 accent-[#2a3d32]"
                  />
                  Available to buy
                </label>
                <div className="relative w-32">
                  <input
                    type="number"
                    value={buyPrice}
                    onChange={(e) => setBuyPrice(e.target.value)}
                    disabled={!isBuy}
                    placeholder="₹"
                    className="w-full bg-transparent border thin-border px-4 py-2 text-sm focus:outline-none focus:border-[#2a3d32] transition-colors text-right placeholder-gray-300 disabled:opacity-50"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#2a3d32] text-white py-4 text-[11px] uppercase tracking-[0.2em] font-semibold hover:bg-[#1f2d25] transition-colors rounded-[2px]"
            >
              Publish Listing
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
