'use client';

import { useSelector } from 'react-redux';
import ProductCard from '../../../../../components/product/ProductCard';
import { selectProductsList } from '../../../../../redux/productSlice';
import './index.scss';

const NewArrivals = () => {
  const products = useSelector(selectProductsList);
  const newProducts = products.filter(product => product.isNew).slice(0, 4);

  return (
    <section className="new-arrivals section">
      <div className="container">
        <div className="section-title">
          <h2>New Arrivals</h2>
          <p>Check out our latest products</p>
        </div>

        <div className="new-arrivals__grid">
          {newProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              className={`animate-slide-in-up stagger-${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;