'use client';

import { useSelector } from 'react-redux';
import ProductCard from '../../../../../components/product/ProductCard';
import { selectProductsList } from '../../../../../redux/productSlice';
import './index.scss';

const BestSellingProducts = () => {
  const products = useSelector(selectProductsList);
  const bestSellingProducts = products.filter(product => product.isBestSeller).slice(0, 8);

  return (
    <section className="best-selling-products section">
      <div className="container">
        <div className="section-title">
          <h2>Best Selling Products</h2>
          <p>Discover what everyone is buying</p>
        </div>

        <div className="best-selling-products__grid">
          {bestSellingProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              className={`animate-fade-in stagger-${(index % 4) + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellingProducts;