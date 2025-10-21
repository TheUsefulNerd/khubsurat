import { useState } from 'react';
import { Product, CartItem } from '@/types/product';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, ShoppingCart, Check } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addToCart } from '@/store/slices/cartSlice';
import { toggleWishlist } from '@/store/slices/wishlistSlice';
import { useToast } from '@/hooks/use-toast';

interface ProductDetailDialogProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ProductDetailDialog = ({ product, open, onOpenChange }: ProductDetailDialogProps) => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  const isInWishlist = product ? wishlistItems.some(item => item.id === product.id) : false;

  if (!product) return null;

  const handleAddToCart = () => {
    if (product.sizes && !selectedSize) {
      toast({
        title: "Please select a size",
        variant: "destructive",
      });
      return;
    }

    const cartItem: CartItem = {
      ...product,
      quantity,
      selectedSize: selectedSize || undefined,
      selectedColor: selectedColor || product.colors?.[0],
    };

    dispatch(addToCart(cartItem));
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleToggleWishlist = () => {
    dispatch(toggleWishlist(product));
    toast({
      title: isInWishlist ? "Removed from wishlist" : "Added to wishlist",
      description: isInWishlist 
        ? `${product.name} has been removed from your wishlist.`
        : `${product.name} has been added to your wishlist.`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">{product.name}</DialogTitle>
        </DialogHeader>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <Badge className="absolute top-4 left-4">{product.category}</Badge>
          </div>

          {/* Product Details */}
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">{product.name}</h2>
              <p className="text-3xl font-bold text-primary">${product.price}</p>
            </div>

            {product.description && (
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            )}

            {/* Size Selection */}
            {product.sizes && (
              <div>
                <label className="text-sm font-semibold text-foreground mb-3 block">
                  Select Size
                </label>
                <div className="flex gap-2 flex-wrap">
                  {product.sizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedSize(size)}
                      className="min-w-[60px]"
                    >
                      {size}
                      {selectedSize === size && <Check className="ml-1 h-3 w-3" />}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {product.colors && (
              <div>
                <label className="text-sm font-semibold text-foreground mb-3 block">
                  Select Color
                </label>
                <div className="flex gap-2 flex-wrap">
                  {product.colors.map((color) => (
                    <Button
                      key={color}
                      variant={selectedColor === color ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedColor(color)}
                      className="min-w-[80px]"
                    >
                      {color}
                      {selectedColor === color && <Check className="ml-1 h-3 w-3" />}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <label className="text-sm font-semibold text-foreground mb-3 block">
                Quantity
              </label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </Button>
                <span className="text-lg font-semibold w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleAddToCart}
                className="flex-1"
                size="lg"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button
                variant={isInWishlist ? "default" : "outline"}
                size="lg"
                onClick={handleToggleWishlist}
              >
                <Heart className={`h-5 w-5 ${isInWishlist ? 'fill-current' : ''}`} />
              </Button>
            </div>

            {product.inStock && (
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500"></span>
                In Stock
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
