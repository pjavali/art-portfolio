"use client";

import { useMemo, useState } from "react";
import { Search, Heart, ShoppingBag, Menu, ArrowUpRight, ChevronDown, SlidersHorizontal, Sparkles, Palette, Image as ImageIcon, UserRound, X } from "lucide-react";

const artworks = [
  { id: 1, title: "Sunlit Stillness", artist: "Maya Chen", category: "Paintings", price: 185, type: "Original", image: "photo-1541961017774-22349e4a1262", shape: "portrait" },
  { id: 2, title: "Blue Hour No. 4", artist: "Theo Martin", category: "Abstract", price: 68, type: "Print", image: "photo-1579783902614-a3fb3927b6a5", shape: "landscape" },
  { id: 3, title: "A Little Wild", artist: "Nina Flores", category: "Illustration", price: 42, type: "Digital", image: "photo-1577083552431-6e5fd01aa342", shape: "square" },
  { id: 4, title: "Quiet Coastline", artist: "Oliver James", category: "Photography", price: 120, type: "Print", image: "photo-1470770841072-f978cf4d019e", shape: "landscape" },
  { id: 5, title: "Garden in Bloom", artist: "Amara Okafor", category: "Paintings", price: 240, type: "Original", image: "photo-1578301978693-85fa9c0320b9", shape: "portrait" },
  { id: 6, title: "Forms of Joy", artist: "Leo Anders", category: "Abstract", price: 55, type: "Print", image: "photo-1549490349-8643362247b5", shape: "square" },
  { id: 7, title: "Golden Afternoon", artist: "Priya Rao", category: "Photography", price: 95, type: "Print", image: "photo-1500530855697-b586d89ba3ee", shape: "landscape" },
  { id: 8, title: "The Inner Garden", artist: "Sofia Bell", category: "Illustration", price: 36, type: "Digital", image: "photo-1513364776144-60967b0f800f", shape: "portrait" },
];

const categories = ["All art", "Paintings", "Photography", "Abstract", "Illustration", "Digital art"];

function artworkImage(id: string) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=85`;
}

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All art");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [cart, setCart] = useState<number[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notice, setNotice] = useState("");

  const filtered = useMemo(() => artworks.filter((art) => {
    const matchesCategory = category === "All art" || art.category === category || (category === "Digital art" && art.type === "Digital");
    const matchesQuery = `${art.title} ${art.artist} ${art.category}`.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  }), [category, query]);

  function toggleFavorite(id: number) {
    setFavorites((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  function addToCart(id: number) {
    setCart((current) => [...current, id]);
    setNotice("Added to your bag");
    window.setTimeout(() => setNotice(""), 1800);
  }

  return (
    <main>
      <div className="announcement">A little more art, a little more joy. Discover your next favourite. <span>Explore the collection ↗</span></div>
      <header className="site-header">
        <a className="wordmark" href="#" aria-label="Artfolio home">artfolio<span>®</span></a>
        <nav className={menuOpen ? "main-nav nav-open" : "main-nav"}>
          <a href="#discover" onClick={() => setMenuOpen(false)}>Discover art</a>
          <a href="#artists" onClick={() => setMenuOpen(false)}>Artists</a>
          <a href="#categories" onClick={() => setMenuOpen(false)}>Collections</a>
          <a href="#sell" onClick={() => setMenuOpen(false)}>Sell your art</a>
        </nav>
        <div className="header-actions">
          <button className="icon-button search-toggle" aria-label="Focus search" onClick={() => document.getElementById("art-search")?.focus()}><Search size={20}/></button>
          <button className="icon-button" aria-label="Your favourites" onClick={() => setNotice(favorites.length ? `You saved ${favorites.length} artwork(s)` : "Save artwork you love with the heart button.")}><Heart size={20}/></button>
          <button className="bag-button" aria-label="Shopping bag" onClick={() => setNotice(cart.length ? `${cart.length} item(s) in your bag — checkout coming soon.` : "Your bag is empty.")}><ShoppingBag size={19}/><span>{cart.length}</span></button>
          <button className="mobile-menu icon-button" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={21}/> : <Menu size={21}/>}</button>
          <a className="sign-in" href="#sell">Join / Sign in</a>
        </div>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line"/> A home for original creativity</div>
          <h1>Art that makes<br/>you <em>feel something.</em></h1>
          <p>Find pieces with a story. Meet the independent artists behind them. Bring a little more you into your space.</p>
          <a className="button button-dark" href="#discover">Explore the art <ArrowUpRight size={17}/></a>
          <div className="hero-note"><div className="avatar-stack"><span>M</span><span>A</span><span>J</span></div><span><strong>Made by people,</strong> not mass-produced.</span></div>
        </div>
        <div className="hero-art">
          <div className="hero-image-main" role="img" aria-label="Colourful abstract painting" style={{ backgroundImage: `url(${artworkImage("photo-1579783902614-a3fb3927b6a5")})` }} />
          <div className="hero-image-small" role="img" aria-label="Framed artwork in a bright interior" style={{ backgroundImage: `url(${artworkImage("photo-1577083552431-6e5fd01aa342")})` }} />
          <div className="floating-label"><Sparkles size={15}/><span>One of a kind<br/><strong>Just like you.</strong></span></div>
          <div className="art-index">01 — 04 <span>● ○ ○ ○</span></div>
        </div>
      </section>

      <section className="trust-strip" aria-label="Marketplace benefits">
        <div><Palette size={21}/><span>Discover independent artists</span></div>
        <div><ImageIcon size={21}/><span>Originals, prints & digital art</span></div>
        <div><Heart size={21}/><span>Find art that feels like you</span></div>
      </section>

      <section className="discover section-wrap" id="discover">
        <div className="section-heading">
          <div><div className="eyebrow"><span className="eyebrow-line"/> The good stuff</div><h2>Art worth <em>looking at.</em></h2></div>
          <a className="text-link" href="#categories">Browse all art <ArrowUpRight size={16}/></a>
        </div>
        <div className="search-row">
          <div className="search-field"><Search size={19}/><input id="art-search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search artwork, artists, styles..." aria-label="Search artwork"/></div>
          <button className="filter-button" onClick={() => { setCategory("All art"); setQuery(""); }}><SlidersHorizontal size={17}/> Clear filters</button>
        </div>
        <div className="category-tabs" id="categories">
          {categories.map((item) => <button key={item} className={category === item ? "category-tab active" : "category-tab"} onClick={() => setCategory(item)}>{item}</button>)}
        </div>
        <div className="results-meta"><span>{filtered.length} pieces to fall for</span><button onClick={() => setNotice("Sorting options will be available when the product catalogue is connected.")}>Featured <ChevronDown size={15}/></button></div>
        <div className="art-grid">
          {filtered.map((art, index) => <article className="art-card" key={art.id}>
            <div className={`art-image ${art.shape}`} style={{ backgroundImage: `url(${artworkImage(art.image)})` }}>
              <span className="art-type">{art.type}</span>
              <button className={favorites.includes(art.id) ? "favorite-button favorited" : "favorite-button"} onClick={() => toggleFavorite(art.id)} aria-label={favorites.includes(art.id) ? "Remove from favourites" : "Add to favourites"}><Heart size={18} fill={favorites.includes(art.id) ? "currentColor" : "none"}/></button>
              <button className="quick-add" onClick={() => addToCart(art.id)}>Add to bag <ArrowUpRight size={15}/></button>
            </div>
            <div className="art-info"><div><h3>{art.title}</h3><p>by {art.artist}</p></div><strong>${art.price}</strong></div>
            <div className="art-category">{art.category}</div>
          </article>)}
          {filtered.length === 0 && <div className="empty-state"><Search size={25}/><h3>No art found just yet</h3><p>Try another search or choose a different category.</p><button className="button button-dark" onClick={() => {setQuery(""); setCategory("All art");}}>Show all art</button></div>}
        </div>
      </section>

      <section className="artist-banner" id="artists">
        <div className="artist-banner-image" role="img" aria-label="Artist painting in a studio" style={{ backgroundImage: `url(${artworkImage("photo-1460661419201-fd4cecdf8a8b")})` }}/>
        <div className="artist-banner-copy"><div className="eyebrow"><span className="eyebrow-line"/> Behind every piece</div><h2>Good art has a<br/><em>human story.</em></h2><p>Meet the makers, explore their worlds, and find something that speaks your language.</p><a className="button button-light" href="#sell">Meet our artists <ArrowUpRight size={17}/></a></div>
      </section>

      <section className="sell-section section-wrap" id="sell">
        <div><div className="eyebrow"><span className="eyebrow-line"/> For the makers</div><h2>Your art deserves<br/>a place <em>out there.</em></h2></div>
        <div className="sell-copy"><p>Build your own gallery, share your creative journey, and connect your work with people who will love it. Your next collector could be just around the corner.</p><a className="button button-dark" href="mailto:hello@artfolio.example?subject=Artist%20signup">Start your artist journey <ArrowUpRight size={17}/></a><span className="small-note">Independent artists welcome. Always.</span></div>
      </section>

      <footer className="site-footer">
        <div className="footer-top"><a className="wordmark footer-wordmark" href="#">artfolio<span>®</span></a><p>A little corner of the internet<br/>for people who love art.</p><div className="footer-links"><a href="#discover">Explore</a><a href="#artists">Our artists</a><a href="#sell">Sell with us</a><a href="mailto:hello@artfolio.example">Contact</a></div></div>
        <div className="footer-bottom"><span>© 2026 Artfolio. Made for art lovers.</span><span>Independent art. Infinite ways to feel.</span></div>
      </footer>
      {notice && <div className="toast" role="status">{notice}<button onClick={() => setNotice("")} aria-label="Dismiss"><X size={15}/></button></div>}
    </main>
  );
}