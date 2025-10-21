import { Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product, CartItem } from '@/types/product';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addToCart } from '@/store/slices/cartSlice';
import { toggleWishlist } from '@/store/slices/wishlistSlice';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

export const ProductCard = ({ product, onViewDetails }: ProductCardProps) => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const isInWishlist = wishlistItems.some(item => item.id === product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (product.sizes && product.sizes.length > 0) {
      // If product has sizes, open detail view instead
      onViewDetails(product);
      return;
    }

    const cartItem: CartItem = {
      ...product,
      quantity: 1,
      selectedColor: product.colors?.[0],
    };

    dispatch(addToCart(cartItem));
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleWishlist(product));
    toast({
      title: isInWishlist ? "Removed from wishlist" : "Added to wishlist",
      description: isInWishlist 
        ? `${product.name} has been removed from your wishlist.`
        : `${product.name} has been added to your wishlist.`,
    });
  };

  return (
    <div 
      className="group relative bg-card rounded-lg overflow-hidden shadow-card hover:shadow-soft transition-all duration-300 cursor-pointer"
      onClick={() => onViewDetails(product)}
    >
      <div className="aspect-square relative overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            size="icon"
            variant="secondary"
            className="bg-background/90 backdrop-blur-sm hover:bg-background"
            onClick={handleToggleWishlist}
          >
            <Heart className={`h-4 w-4 ${isInWishlist ? 'fill-current text-red-500' : ''}`} />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="bg-background/90 backdrop-blur-sm hover:bg-background"
            onClick={handleQuickAdd}
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
        <div className="absolute top-4 left-4">
          <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
            {product.category}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-foreground">${product.price}</span>
          <Button
            size="sm"
            variant="ghost"
            className="text-primary hover:bg-primary/10"
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(product);
            }}
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};
