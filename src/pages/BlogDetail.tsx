import { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, ArrowLeft, ArrowRight } from "lucide-react";
import { blogPosts, getBlogPostBySlug, formatDate } from "@/data/blog";
import SEO from "@/components/SEO";
import OptimizedImage from "@/components/OptimizedImage";

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPostBySlug(slug) : undefined;

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  // Get related posts (same category, excluding current)
  const relatedPosts = blogPosts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  // Get previous and next posts
  const currentIndex = blogPosts.findIndex((p) => p.id === post.id);
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  return (
    <main className="min-h-screen pt-20 md:pt-24 lg:pt-28">
      <SEO
        title={post.meta.title}
        description={post.meta.description}
        keywords={post.meta.keywords}
        url={`https://nelimuhendislik.com/blog/${post.slug}`}
        type="article"
      />

      {/* Article Header + Cover Image */}
      <section className="relative py-12 md:py-16 lg:py-20 bg-cream-100">
        <div className="container-padding">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
              {/* Cover Image */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="order-2 lg:order-1"
              >
                <div className="relative aspect-[1/1] rounded-2xl overflow-hidden">
                  <OptimizedImage
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full"
                    aspectRatio="1/1"
                    priority
                  />
                </div>
              </motion.div>

              {/* Text Content */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="order-1 lg:order-2"
              >
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-foreground/50 mb-6">
                  <Link
                    to="/"
                    className="hover:text-neli-600 transition-colors"
                  >
                    Anasayfa
                  </Link>
                  <span>/</span>
                  <Link
                    to="/blog"
                    className="hover:text-neli-600 transition-colors"
                  >
                    Blog
                  </Link>
                  <span>/</span>
                  <span className="text-neli-600">{post.category}</span>
                </div>

                {/* Category */}
                <Link
                  to={`/blog?category=${post.category}`}
                  className="inline-block px-4 py-1.5 bg-neli-600 text-white text-sm font-medium rounded-full mb-4"
                >
                  {post.category}
                </Link>

                {/* Title */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-foreground leading-tight mb-6">
                  {post.title}
                </h1>

                {/* Excerpt */}
                <p className="text-base md:text-lg text-foreground/70 leading-relaxed mb-6">
                  {post.excerpt}
                </p>

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-foreground/60">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-cream-200 overflow-hidden">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {post.author.name}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-neli-600" />
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="section-padding bg-white">
        <div className="container-padding">
          <div className="max-w-3xl mx-auto">
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            <div className="mt-10 md:mt-12 pt-6 md:pt-8 border-t border-cream-300">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-foreground/50 mr-2">
                  Etiketler:
                </span>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-cream-100 text-foreground/70 text-sm rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Post Navigation */}
      <section className="py-6 md:py-8 bg-cream-100 border-y border-cream-300">
        <div className="container-padding">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-4 md:gap-8">
              {/* Previous Post */}
              <div>
                {prevPost ? (
                  <Link
                    to={`/blog/${prevPost.slug}`}
                    className="group flex items-start gap-4 p-4 md:p-6 rounded-xl hover:bg-white transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5 text-neli-600 mt-1 flex-shrink-0 group-hover:-translate-x-1 transition-transform" />
                    <div>
                      <span className="text-xs text-foreground/50 uppercase tracking-wider mb-1 block">
                        Önceki Yazı
                      </span>
                      <h3 className="text-base md:text-lg font-serif font-medium text-foreground group-hover:text-neli-600 transition-colors line-clamp-2">
                        {prevPost.title}
                      </h3>
                    </div>
                  </Link>
                ) : (
                  <div />
                )}
              </div>

              {/* Next Post */}
              <div>
                {nextPost ? (
                  <Link
                    to={`/blog/${nextPost.slug}`}
                    className="group flex items-start gap-4 p-4 md:p-6 rounded-xl hover:bg-white transition-colors text-right md:flex-row-reverse"
                  >
                    <ArrowRight className="w-5 h-5 text-neli-600 mt-1 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                    <div>
                      <span className="text-xs text-foreground/50 uppercase tracking-wider mb-1 block">
                        Sonraki Yazı
                      </span>
                      <h3 className="text-base md:text-lg font-serif font-medium text-foreground group-hover:text-neli-600 transition-colors line-clamp-2">
                        {nextPost.title}
                      </h3>
                    </div>
                  </Link>
                ) : (
                  <div />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container-padding">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-8 md:mb-12"
              >
                <h2 className="text-xl md:text-2xl font-serif font-medium text-foreground">
                  İlgili <span className="text-neli-600">Yazılar</span>
                </h2>
              </motion.div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {relatedPosts.map((relatedPost, index) => (
                  <motion.article
                    key={relatedPost.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <Link to={`/blog/${relatedPost.slug}`} className="block">
                      <div className="relative aspect-[1/1] rounded-xl overflow-hidden mb-4">
                        <OptimizedImage
                          src={relatedPost.coverImage}
                          alt={relatedPost.title}
                          className="w-full h-full transition-transform duration-700 group-hover:scale-105"
                          aspectRatio="1/1"
                        />
                      </div>

                      <div className="flex items-center gap-2 text-foreground/50 text-xs mb-2">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(relatedPost.publishedAt)}</span>
                      </div>

                      <h3 className="text-base md:text-lg font-serif font-medium text-foreground group-hover:text-neli-600 transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                    </Link>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Back to Blog CTA */}
      <section className="py-12 md:py-16 bg-cream-100">
        <div className="container-padding">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-xl md:text-2xl font-serif font-medium text-foreground mb-4">
                Daha Fazla İçerik Keşfedin
              </h2>
              <p className="text-foreground/60 mb-6 max-w-lg mx-auto">
                İnşaat, mimari ve konut projeleri hakkında daha fazla bilgi için
                blog sayfamızı ziyaret edin.
              </p>
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 bg-neli-600 hover:bg-neli-700 text-white font-medium rounded-full transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Tüm Yazılar
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
