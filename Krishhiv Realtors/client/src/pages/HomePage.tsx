import React from 'react';
import { Helmet } from 'react-helmet-async';
import { HeroSection } from '../components/home/HeroSection';
import { BannerSlider } from '../components/home/BannerSlider';
import { TrustedBy } from '../components/home/TrustedBy';
import { FeaturedProperties } from '../components/home/FeaturedProperties';
import { PropertyCategories } from '../components/home/PropertyCategories';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { BlogSection } from '../components/home/BlogSection';
import { FAQSection } from '../components/home/FAQSection';
import { ContactCTA } from '../components/home/ContactCTA';
import { APP_NAME, APP_DESCRIPTION } from '../constants';

const HomePage: React.FC = () => (
  <>
    <Helmet>
      <title>{APP_NAME} — Where Luxury Meets Legacy</title>
      <meta name="description" content={APP_DESCRIPTION} />
      <meta property="og:title" content={`${APP_NAME} — Premium Real Estate`} />
      <meta property="og:description" content={APP_DESCRIPTION} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <script type="application/ld+json">{JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'RealEstateAgent',
        name: APP_NAME,
        description: APP_DESCRIPTION,
        url: 'https://krisshivrealtors.com',
        telephone: '+91-98765-43210',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Mumbai',
          addressCountry: 'IN',
        },
      })}</script>
    </Helmet>

    <HeroSection />
    <BannerSlider />
    <TrustedBy />
    <FeaturedProperties />
    <PropertyCategories />
    <WhyChooseUs />
    <TestimonialsSection />
    <BlogSection />
    <FAQSection />
    <ContactCTA />
  </>
);

export default HomePage;
