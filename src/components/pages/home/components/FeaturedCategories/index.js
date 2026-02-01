'use client';

import { useSelector } from 'react-redux';
import Link from 'next/link';
import { selectCategories } from '../../../../../redux/productSlice';
import { ROUTES } from '../../../../../constants/routes';
import './index.scss';

const FeaturedCategories = () => {
  const categories = useSelector(selectCategories);
  const featuredCategories = categories.filter(category => category.featured).slice(0, 4);

  return (
    <section className="featured-categories section">
      <div className="container">
        <div className="section-title">
          <h2>Shop by Category</h2>
          <p>Discover our wide range of product categories</p>
        </div>

        <div className="featured-categories__grid">
          {featuredCategories.map((category, index) => (
            <Link
              key={category.id}
              href={`${ROUTES.PRODUCTS}?category=${category.slug}`}
              className={`featured-categories__card animate-scale-in stagger-${index + 1}`}
            >
              <div className="featured-categories__image">
                <img src={category.image} alt={category.name} />
                <div className="featured-categories__overlay"></div>
              </div>
              <div className="featured-categories__content">
                <h3 className="featured-categories__title">{category.name}</h3>
                <p className="featured-categories__description">{category.description}</p>
                <span className="featured-categories__count">{category.productCount} Products</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="featured-categories__cta">
          <Link href={ROUTES.PRODUCTS} className="btn btn-outline">
            View All Categories
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;