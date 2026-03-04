import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, ChevronDown, ArrowRight } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import { fetchBlogPosts, formatDate } from "@/data/blog";
import type { BlogPost } from "@/data/blog";
import SEO from "@/components/SEO";
import OptimizedImage from "@/components/OptimizedImage";

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("Tümü");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogPosts().then((posts) => {
      setBlogPosts(posts);
      setLoading(false);
    });
  }, []);

  const blogCategories = useMemo(() => {
    const cats = new Set(blogPosts.map((p) => p.category));
    return ["Tümü", ...cats];
  }, [blogPosts]);

  const featuredPosts = useMemo(
    () => blogPosts.filter((p) => p.featured),
    [blogPosts],
  );

  const filteredPosts = useMemo(() => {
    if (activeCategory === "Tümü") return blogPosts;
    return blogPosts.filter((post) => post.category === activeCategory);
  }, [activeCategory, blogPosts]);

  if (loading) {
    return (
      <main className="min-h-screen pt-20 md:pt-24 lg:pt-28 flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-neli-600/20 border-t-neli-600 rounded-full animate-spin" />
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-20 md:pt-24 lg:pt-28">
      <SEO
        title="Blog"
        description="Neli Mühendislik blog. İnşaat, mimari, dekorasyon ve konut projeleri hakkında güncel bilgiler ve uzman görüşleri."
        keywords="neli mühendislik blog, inşaat blogu, mimari yazıları, konut projeleri, izmir inşaat"
        url="https://nelimuhendislik.com/blog"
      />

      <PageHero
        currentPage="Blog"
        title={
          <>
            Güncel Bilgiler ve
            <span className="text-neli-600"> Uzman Görüşleri</span>
          </>
        }
        description="İnşaat, mimari, dekorasyon ve konut projeleri hakkında faydalı bilgiler ve sektörel gelişmeler."
      />

      {featuredPosts.length > 0 && (
        <section className=" bg-cream-100">
          <div className="container-padding">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-8 md:mb-12"
              >
                <span className="text-neli-600 text-sm font-medium tracking-wider uppercase">
                  Öne Çıkanlar
                </span>
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="lg:row-span-2"
                >
                  <Link
                    to={`/blog/${featuredPosts[0].slug}`}
                    className="group block h-full"
                  >
                    <div className="relative aspect-[1/1] rounded-2xl overflow-hidden">
                      <OptimizedImage
                        src={featuredPosts[0].coverImage}
                        alt={featuredPosts[0].coverImageAlt || featuredPosts[0].title}
                        className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-105"
                        aspectRatio="1/1"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                        <span className="inline-block px-3 py-1 bg-neli-600 text-white text-xs font-medium rounded-full mb-3">
                          {featuredPosts[0].category}
                        </span>
                        <h3 className="text-xl md:text-2xl lg:text-3xl font-serif font-medium text-white mb-3 line-clamp-2">
                          {featuredPosts[0].title}
                        </h3>
                        <p className="text-white/80 text-sm md:text-base mb-4 line-clamp-2">
                          {featuredPosts[0].excerpt}
                        </p>
                        <div className="flex items-center gap-2 text-white/70 text-sm">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(featuredPosts[0].publishedAt)}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>

                {featuredPosts.slice(1, 3).map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Link
                      to={`/blog/${post.slug}`}
                      className="group flex gap-4 md:gap-6 h-full"
                    >
                      <div className="relative w-32 md:w-48 flex-shrink-0 rounded-xl overflow-hidden">
                        <OptimizedImage
                          src={post.coverImage}
                          alt={post.coverImageAlt || post.title}
                          className="w-full h-full transition-transform duration-500 group-hover:scale-105"
                          aspectRatio="1/1"
                        />
                      </div>
                      <div className="flex flex-col justify-center">
                        <span className="text-neli-600 text-xs font-medium uppercase mb-2">
                          {post.category}
                        </span>
                        <h3 className="text-base md:text-lg font-serif font-medium text-foreground group-hover:text-neli-600 transition-colors line-clamp-2 mb-2">
                          {post.title}
                        </h3>
                        <p className="text-foreground/60 text-sm line-clamp-2 mb-3">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center gap-2 text-foreground/50 text-xs">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(post.publishedAt)}</span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="sticky top-16 md:top-20 lg:top-24 z-30 bg-white border-b border-cream-300 py-3 md:py-4">
        <div className="container-padding">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between gap-4">
              <div className="hidden md:flex items-center gap-2">
                {blogCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      activeCategory === category
                        ? "bg-neli-600 text-white"
                        : "bg-cream-100 text-foreground/70 hover:bg-cream-200"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <div className="md:hidden relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 px-4 py-2 bg-cream-100 rounded-lg text-sm font-medium"
                >
                  <span>{activeCategory}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-soft-lg border border-cream-300 overflow-hidden z-40">
                    {blogCategories.map((category) => (
                      <button
                        key={category}
                        onClick={() => {
                          setActiveCategory(category);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full px-4 py-2 text-left text-sm hover:bg-cream-100 transition-colors duration-300 ${
                          activeCategory === category
                            ? "bg-neli-600/10 text-neli-600"
                            : "text-foreground/70"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <span className="text-sm text-foreground/50">
                {filteredPosts.length} yazı
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-padding">
          <div className="max-w-7xl mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <Link to={`/blog/${post.slug}`} className="block">
                    <div className="relative aspect-[1/1] rounded-xl overflow-hidden mb-4">
                      <OptimizedImage
                        src={post.coverImage}
                        alt={post.coverImageAlt || post.title}
                        className="w-full h-full transition-transform duration-700 group-hover:scale-105"
                        aspectRatio="1/1"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-foreground text-xs font-medium rounded-full">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-foreground/50 text-xs mb-2">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(post.publishedAt)}</span>
                    </div>
                    <h3 className="text-lg md:text-xl font-serif font-medium text-foreground group-hover:text-neli-600 transition-colors mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-foreground/60 text-sm line-clamp-2 mb-4">
                      {post.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-1 text-neli-600 text-sm font-medium group-hover:gap-2 transition-all">
                      Devamını Oku
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                </motion.article>
              ))}
            </div>
            {filteredPosts.length === 0 && (
              <div className="text-center py-12 md:py-16">
                <p className="text-foreground/50 text-sm md:text-base">
                  Bu kategoride henüz yazı bulunmuyor.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
