import express from "express";
import { createServer as createViteServer } from "vite";
import jwt from "jsonwebtoken";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SECRET_KEY = "rewear_secret_key_for_jwt_auth_mock";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Mock DB
  let messages: any[] = [];
  let reviews: any[] = [
    {
      id: 1,
      listingId: 1,
      userName: "Aisha",
      rating: 5,
      comment: "Absolutely stunning lehenga. Got so many compliments!",
      date: "2026-03-15T10:00:00Z",
    },
    {
      id: 2,
      listingId: 2,
      userName: "Michael",
      rating: 4,
      comment: "Great fit, but a little snug on the shoulders.",
      date: "2026-02-20T14:30:00Z",
    },
  ];
  let listings = [
    {
      id: 1,
      title: "Ivory Embroidered Lehenga",
      brand: "Saanjh Couture",
      rentalPrice: 110,
      buyPrice: 850,
      image:
        "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&q=80&w=2670",
      images: [
        "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&q=80&w=2670",
        "https://images.unsplash.com/photo-1550639525-c97d455acf70?auto=format&fit=crop&q=80&w=2670",
        "https://images.unsplash.com/photo-1515347619362-ea41b25008f1?auto=format&fit=crop&q=80&w=2670",
      ],
      category: "Traditional",
      occasion: "Wedding",
      size: "M",
      user: "boutique@rewear.com",
    },
    {
      id: 2,
      title: "Charcoal Three-Piece Suit",
      brand: "Sartoria Roma",
      rentalPrice: 55,
      buyPrice: 420,
      image:
        "https://images.unsplash.com/photo-1593030103066-0093718efeb9?auto=format&fit=crop&q=80&w=2670",
      images: [
        "https://images.unsplash.com/photo-1593030103066-0093718efeb9?auto=format&fit=crop&q=80&w=2670",
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=2670",
      ],
      category: "Suit",
      occasion: "Formal",
      size: "L",
      user: "sartoria@rewear.com",
    },
    {
      id: 3,
      title: "Burgundy Velvet Tuxedo",
      brand: "Notch & Co",
      rentalPrice: 60,
      buyPrice: 1100,
      image:
        "https://images.unsplash.com/photo-1598808503746-f34c53b9323e?auto=format&fit=crop&q=80&w=2670",
      images: [
        "https://images.unsplash.com/photo-1598808503746-f34c53b9323e?auto=format&fit=crop&q=80&w=2670",
        "https://images.unsplash.com/photo-1582142407894-ec85a1260a46?auto=format&fit=crop&q=80&w=2670",
      ],
      category: "Suit",
      occasion: "Party",
      size: "M",
      user: "notchandco@rewear.com",
    },
    {
      id: 4,
      title: "Black Crepe Blazer",
      brand: "Linea",
      rentalPrice: 22,
      buyPrice: 140,
      image:
        "https://images.unsplash.com/photo-1591369822096-2241b71d6fbb?auto=format&fit=crop&q=80&w=2670",
      images: [
        "https://images.unsplash.com/photo-1591369822096-2241b71d6fbb?auto=format&fit=crop&q=80&w=2670",
        "https://images.unsplash.com/photo-1551028719-0c1e984b80a4?auto=format&fit=crop&q=80&w=2670",
      ],
      category: "Outerwear",
      occasion: "Casual",
      size: "S",
      user: "linea@rewear.com",
    },
  ];

  app.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email required" });
    }
    const name = email.split("@")[0];
    const token = jwt.sign({ email, name }, SECRET_KEY, { expiresIn: "1d" });
    res.json({ token, user: { name, email } });
  });

  app.get("/api/listings", (req, res) => {
    res.json(listings);
  });

  app.get("/api/listings/:id", (req, res) => {
    const listing = listings.find((l) => l.id === parseInt(req.params.id));
    if (listing) {
      res.json(listing);
    } else {
      res.status(404).json({ error: "Not found" });
    }
  });

  app.get("/api/user/dashboard", (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, SECRET_KEY) as any;
      const userListings = listings.filter((l) => l.user === decoded.email);
      res.json({
        earnings: userListings.length > 0 ? 125.0 : 0,
        listings: userListings,
        pendingOrders: userListings.length > 0 ? 1 : 0,
        completed: userListings.length > 0 ? 3 : 0,
      });
    } catch (err) {
      res.status(401).json({ error: "Invalid token" });
    }
  });

  app.post("/api/listings", (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, SECRET_KEY) as any;
      const newListing = { id: Date.now(), ...req.body, user: decoded.email };
      listings.push(newListing);
      res.json(newListing);
    } catch (err) {
      res.status(401).json({ error: "Invalid token" });
    }
  });

  app.post("/api/messages", (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, SECRET_KEY) as any;
      const { listingId, text } = req.body;
      const listing = listings.find((l) => l.id === parseInt(listingId));

      if (!listing) {
        return res.status(404).json({ error: "Listing not found" });
      }

      const newMessage = {
        id: Date.now(),
        listingId: parseInt(listingId),
        senderEmail: decoded.email,
        ownerEmail: listing.user,
        text,
        timestamp: new Date().toISOString(),
      };

      messages.push(newMessage);
      res.json(newMessage);
    } catch (err) {
      res.status(401).json({ error: "Invalid token" });
    }
  });

  app.get("/api/messages", (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, SECRET_KEY) as any;
      const userMessages = messages.filter(
        (m) =>
          m.senderEmail === decoded.email || m.ownerEmail === decoded.email,
      );
      res.json(userMessages);
    } catch (err) {
      res.status(401).json({ error: "Invalid token" });
    }
  });

  app.get("/api/listings/:id/reviews", (req, res) => {
    const listingId = parseInt(req.params.id);
    const listingReviews = reviews.filter((r) => r.listingId === listingId);
    res.json(listingReviews);
  });

  app.post("/api/listings/:id/reviews", (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, SECRET_KEY) as any;
      const listingId = parseInt(req.params.id);

      const { rating, comment } = req.body;
      if (!rating || rating < 1 || rating > 5) {
        return res
          .status(400)
          .json({ error: "Valid rating (1-5) is required" });
      }

      const newReview = {
        id: Date.now(),
        listingId,
        userName: decoded.name,
        rating,
        comment,
        date: new Date().toISOString(),
      };

      reviews.push(newReview);
      res.json(newReview);
    } catch (err) {
      res.status(401).json({ error: "Invalid token" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
