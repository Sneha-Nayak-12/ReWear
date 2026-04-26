export default function Footer() {
  return (
    <footer className="border-t thin-border bg-[#fcfbf8] pt-20 pb-8 mt-20">
      <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 text-[#2c2c2c]">
        <div className="md:col-span-5">
          <span className="font-serif text-4xl italic tracking-tight mb-4 inline-block">
            ReWear
          </span>
          <p className="max-w-xs leading-relaxed text-sm text-[#7a7a7a]">
            A circular wardrobe. Lend the pieces hibernating in your closet,
            borrow what you need for a night, and let great clothing live many
            lives.
          </p>
        </div>

        <div className="md:col-start-7 md:col-span-2">
          <h4 className="font-semibold mb-6 text-[11px] uppercase tracking-[0.2em] text-[#2c2c2c]">
            Shop
          </h4>
          <ul className="space-y-4 text-sm text-[#7a7a7a]">
            <li>
              <a href="#" className="hover:text-[#2c2c2c] transition-colors">
                Dresses
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#2c2c2c] transition-colors">
                Suits
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#2c2c2c] transition-colors">
                Traditional
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#2c2c2c] transition-colors">
                Outerwear
              </a>
            </li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <h4 className="font-semibold mb-6 text-[11px] uppercase tracking-[0.2em] text-[#2c2c2c]">
            Lend
          </h4>
          <ul className="space-y-4 text-sm text-[#7a7a7a]">
            <li>
              <a href="#" className="hover:text-[#2c2c2c] transition-colors">
                How it works
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#2c2c2c] transition-colors">
                Earnings
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#2c2c2c] transition-colors">
                Care promise
              </a>
            </li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <h4 className="font-semibold mb-6 text-[11px] uppercase tracking-[0.2em] text-[#2c2c2c]">
            Studio
          </h4>
          <p className="text-sm text-[#7a7a7a] leading-relaxed">
            Hand-curated weekly. We pickup, dry-clean and deliver — so you never
            lift a hanger.
          </p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 mt-20 pt-8 border-t thin-border text-[10px] uppercase tracking-[0.2em] text-[#7a7a7a] flex flex-col sm:flex-row justify-between items-center gap-6">
        <p>&copy; {new Date().getFullYear()} ReWear Studio</p>
        <div className="flex items-center gap-2">
          <span>Made with Sinchu</span>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2LakYZ5mUXjXVrYnpLFP8WfxQmeGU93Li8Q&s"
            alt="Shinchan"
            className="w-10 h-10 object-contain"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </footer>
  );
}
