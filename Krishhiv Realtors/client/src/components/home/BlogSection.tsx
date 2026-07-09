import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from '../../hooks';
import { SectionHeader } from '../ui/SectionHeader';
import { staggerContainer, staggerItem } from '../../animations/variants';
import { formatDate } from '../../utils';

const MOCK_BLOGS = [
  {
    _id: '1',
    title: 'Top 10 Luxury Residential Projects in Mumbai 2025',
    slug: 'top-10-luxury-projects-mumbai-2025',
    excerpt: 'Discover the most sought-after luxury residential developments transforming Mumbai\'s skyline this year.',
    coverImage: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600',
    author: { name: 'Arjun Sharma', avatar: '' },
    category: 'Market Trends',
    tags: ['Mumbai', 'Luxury', '2025'],
    readTime: 5,
    views: 3200,
    publishedAt: '2025-01-15T00:00:00Z',
  },
  {
    _id: '2',
    title: 'NRI Investment Guide: Best Cities for Real Estate in India',
    slug: 'nri-investment-guide-india',
    excerpt: 'A comprehensive guide for NRIs looking to invest in Indian real estate with maximum returns.',
    coverImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600',
    author: { name: 'Priya Mehta', avatar: '' },
    category: 'NRI Corner',
    tags: ['NRI', 'Investment', 'Guide'],
    readTime: 8,
    views: 5100,
    publishedAt: '2025-01-10T00:00:00Z',
  },
  {
    _id: '3',
    title: 'Understanding RERA: A Buyer\'s Complete Guide',
    slug: 'understanding-rera-buyers-guide',
    excerpt: 'Everything you need to know about RERA regulations and how they protect your property investment.',
    coverImage: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600',
    author: { name: 'Vikram Nair', avatar: '' },
    category: 'Legal & Finance',
    tags: ['RERA', 'Legal', 'Buyers'],
    readTime: 6,
    views: 2800,
    publishedAt: '2025-01-05T00:00:00Z',
  },
];

export const BlogSection: React.FC = () => {
  const { ref, inView } = useInView();

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <SectionHeader
          tag="Latest Insights"
          title="Real Estate"
          titleHighlight="Knowledge Hub"
          subtitle="Stay informed with expert analysis, market trends, and investment strategies."
        />

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {MOCK_BLOGS.map((blog, _i) => (
            <motion.article
              key={blog._id}
              variants={staggerItem}
              whileHover={{ y: -6 }}
              className="group bg-surface rounded-xl overflow-hidden shadow-card hover:shadow-luxury transition-all duration-400"
            >
              <Link to={`/blog/${blog.slug}`} className="block overflow-hidden h-48">
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </Link>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="badge-gold text-[10px]">{blog.category}</span>
                  <span className="text-textMuted text-xs">{blog.readTime} min read</span>
                </div>
                <Link to={`/blog/${blog.slug}`}>
                  <h3 className="font-heading font-semibold text-primary text-lg leading-snug hover:text-secondary transition-colors mb-2 line-clamp-2">
                    {blog.title}
                  </h3>
                </Link>
                <p className="text-textMuted text-sm leading-relaxed line-clamp-2 mb-4">
                  {blog.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-textMuted border-t border-gray-100 pt-4">
                  <span>{blog.author.name}</span>
                  <span>{formatDate(blog.publishedAt)}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <div className="text-center mt-10">
          <Link to="/blog" className="btn-secondary inline-flex items-center gap-2">
            Read All Articles
          </Link>
        </div>
      </div>
    </section>
  );
};
