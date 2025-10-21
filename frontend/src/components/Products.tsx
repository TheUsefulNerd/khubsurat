import { useState } from 'react';
import { ProductCard } from './ProductCard';
import { ProductDetailDialog } from './ProductDetailDialog';
import { Product } from '@/types/product';
import { allProducts } from '@/data/products';

interface ProductsProps {
  category?: string;
  limit?: number;
}

export const Products = ({ category, limit }: ProductsProps) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredProducts = category 
    ? allProducts.filter(p => p.category === category)
    : allProducts;

  const displayProducts = limit ? filteredProducts.slice(0, limit) : filteredProducts;

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setDialogOpen(true);
  };

  return (
    <>
      <section id="products" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              {category ? `${category} Collection` : 'Featured Products'}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Handpicked selections that bring beauty and function together
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {displayProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        </div>
      </section>

      <ProductDetailDialog
        product={selectedProduct}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </>
  );
};
