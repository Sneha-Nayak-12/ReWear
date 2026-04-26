import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Sparkles,
  Truck,
  RefreshCw,
  Infinity as InfinityIcon,
} from "lucide-react";
import axios from "axios";

interface Listing {
  id: number;
  title: string;
  brand: string;
  rentalPrice: number;
  buyPrice: number;
  image: string;
}

export default function Home() {
  const [curated, setCurated] = useState<Listing[]>([]);

  useEffect(() => {
    axios
      .get("/api/listings")
      .then((res) => setCurated(res.data.slice(0, 4)))
      .catch((err) => console.error(err));
  }, []);
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="border-b thin-border sm:border-none">
        <div className="max-w-[1600px] mx-auto grid md:grid-cols-2 min-h-[600px] md:min-h-[700px] xl:min-h-[800px] border-b thin-border overflow-hidden">
          {/* Left Image Area */}
          <div className="relative overflow-hidden bg-[#e6e4dc] aspect-square md:aspect-auto">
            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2670&auto=format&fit=crop"
              alt="Editorial fashion"
              className="w-full h-full object-cover grayscale-[30%] contrast-125 md:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-10 left-10 md:bottom-16 md:left-14 xl:bottom-20 xl:left-20 text-white">
              <div className="text-[10px] xl:text-[10px] uppercase tracking-[0.25em] font-bold mb-3">
                Issue 01 / Spring
              </div>
              <div className="text-2xl xl:text-3xl font-serif italic">
                A wardrobe that travels.
              </div>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="flex flex-col justify-center px-10 py-16 md:p-16 lg:p-24 xl:p-32 bg-[#fcfbf8]">
            <div className="text-[10px] xl:text-[10px] uppercase tracking-[0.25em] text-[#7a7a7a] mb-8 font-semibold">
              ReWear · Est. 2026
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-[72px] xl:text-[88px] 2xl:text-[96px] leading-[1.05] font-serif tracking-tight mb-8">
              The clothes you
              <br />
              don't wear,
              <br />
              deserve a{" "}
              <span className="italic text-[#2a3d32]">
                second
                <br />
                life.
              </span>
            </h1>
            <p className="max-w-md xl:max-w-xl text-base xl:text-lg leading-relaxed text-[#7a7a7a] mb-12">
              Borrow showstoppers for a single night. Buy beloved pieces
              second-hand. Or lend the gowns hibernating in your closet — and
              earn while ReWear handles pickup, cleaning and delivery
              end-to-end.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/shop"
                className="bg-[#2a3d32] text-white px-8 md:px-10 py-4 xl:py-5 text-[11px] xl:text-[10px] uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-3 hover:bg-[#1f2d25] transition-colors rounded-[2px]"
              >
                Browse the closet{" "}
                <ArrowRight className="w-4 h-4 xl:w-5 xl:h-5" />
              </Link>
              <Link
                to="/list"
                className="border thin-border px-8 md:px-10 py-4 xl:py-5 text-[11px] xl:text-[10px] uppercase tracking-[0.2em] font-semibold flex items-center justify-center hover:bg-black/5 transition-colors rounded-[2px] text-[#2c2c2c]"
              >
                Lend a piece
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="border-b thin-border py-4 bg-[#fcfbf8] overflow-hidden flex whitespace-nowrap">
        <div className="animate-[marquee_60s_linear_infinite] flex items-center">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#7a7a7a] mx-8">
                Special-occasion ready wear
              </span>
              <span className="text-[#cebc9a]">♦</span>
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#7a7a7a] mx-8">
                Pickup & delivery, white-glove
              </span>
              <span className="text-[#cebc9a]">♦</span>
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#7a7a7a] mx-8">
                Owners earn 80% of every booking
              </span>
              <span className="text-[#cebc9a]">♦</span>
            </div>
          ))}
        </div>
      </div>

      {/* The Choreography Section */}
      <section className="max-w-[1400px] mx-auto px-6 py-24 md:py-32">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-24 mb-20 text-[#2c2c2c]">
          <div className="lg:w-2/3">
            <div className="text-[10px] uppercase tracking-[0.2em] font-semibold mb-6 text-[#7a7a7a]">
              The Choreography
            </div>
            <h2 className="text-4xl md:text-[56px] leading-[1.1] font-serif tracking-tight">
              We pick up, dry-clean and
              <br />
              deliver. <span className="italic">All you do is wear it.</span>
            </h2>
          </div>
          <div className="lg:w-1/3">
            <p className="text-[#7a7a7a] text-sm leading-relaxed mt-2 lg:mt-12">
              From the moment a piece is listed to the moment it returns home,
              ReWear orchestrates every hand-off. Owners earn passive income,
              customers get magazine-worthy fits, and good clothing stays out of
              landfill.
            </p>
          </div>
        </div>

        {/* Alternating Steps Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Step 01 Text */}
          <div className="border thin-border p-12 lg:p-16 flex flex-col justify-center min-h-[400px]">
            <Sparkles className="w-5 h-5 mb-16 text-[#2c2c2c]" />
            <div className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#7a7a7a] mb-4">
              Step 01
            </div>
            <h3 className="text-3xl font-serif mb-4">List your piece</h3>
            <p className="text-sm text-[#7a7a7a]">
              Snap three photos. Set a daily rate or sale price. We do the rest.
            </p>
          </div>
          {/* Step 01 Image */}
          <div className="min-h-[400px]">
            <img
              src="https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?q=80&w=2670&auto=format&fit=crop"
              alt="Rack of clothes"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Step 02 Image */}
          <div className="min-h-[400px] order-last md:order-none">
            <img
              src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=2670&auto=format&fit=crop"
              alt="High fashion dress"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Step 02 Text */}
          <div className="border thin-border p-12 lg:p-16 flex flex-col justify-center min-h-[400px]">
            <Truck className="w-5 h-5 mb-16 text-[#2c2c2c]" />
            <div className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#7a7a7a] mb-4">
              Step 02
            </div>
            <h3 className="text-3xl font-serif mb-4">We collect & care</h3>
            <p className="text-sm text-[#7a7a7a]">
              Our courier collects the garment, our atelier presses and
              dry-cleans it, then delivers fresh to the customer's door.
            </p>
          </div>
        </div>

        {/* Step 03 Bottom Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 border thin-border">
          <div className="md:col-span-1 p-8 md:p-10 border-b md:border-b-0 md:border-r thin-border">
            <RefreshCw className="w-5 h-5 mb-8 text-[#2c2c2c]" />
            <div className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#7a7a7a] mb-2">
              Step 03
            </div>
            <h3 className="text-xl font-serif">It comes home, like new</h3>
          </div>
          <div className="p-8 md:p-10 border-b md:border-b-0 md:border-r thin-border flex flex-col justify-center">
            <div className="text-4xl font-serif font-light mb-1">80%</div>
            <div className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#7a7a7a]">
              To the owner
            </div>
          </div>
          <div className="p-8 md:p-10 border-b md:border-b-0 md:border-r thin-border flex flex-col justify-center">
            <div className="text-4xl font-serif font-light mb-1">
              48<span className="text-2xl">h</span>
            </div>
            <div className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#7a7a7a]">
              Door to door
            </div>
          </div>
          <div className="p-8 md:p-10 flex flex-col justify-center">
            <InfinityIcon className="w-8 h-8 mb-2 stroke-1 text-[#2c2c2c]" />
            <div className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#7a7a7a]">
              Lives per garment
            </div>
          </div>
        </div>
      </section>

      {/* Curated Section */}
      <section className="border-t thin-border py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] font-semibold mb-4 text-[#7a7a7a]">
                Curated this week
              </div>
              <h2 className="text-4xl md:text-[50px] font-serif tracking-tight text-[#2c2c2c]">
                In rotation now
              </h2>
            </div>
            <Link
              to="/shop"
              className="text-[11px] uppercase tracking-[0.2em] font-semibold flex items-center gap-2 hover:opacity-50 transition-opacity pb-2"
            >
              See the full closet <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
            {curated.map((item) => (
              <Link
                to={`/product/${item.id}`}
                key={item.id}
                className="group block"
              >
                <div className="aspect-[3/4] bg-[#e6e4dc] mb-4 overflow-hidden">
                  <img
                    src={item.image}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    alt={item.title}
                  />
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#7a7a7a] mb-1">
                      {item.brand}
                    </div>
                    <div className="text-sm font-serif text-[#2c2c2c]">
                      {item.title}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm">
                      <span className="font-semibold text-[#2c2c2c]">
                        ₹{item.rentalPrice}
                      </span>
                      <span className="text-xs text-[#7a7a7a]"> /day</span>
                    </div>
                    <div className="text-xs text-[#7a7a7a] mt-0.5">
                      Buy ₹{item.buyPrice}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
