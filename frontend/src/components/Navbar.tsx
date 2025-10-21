import { useState } from 'react';
import { Heart, Search, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CartSheet } from './CartSheet';
import { SearchDialog } from './SearchDialog';
import { ProductDetailDialog } from './ProductDetailDialog';
import { Product } from '@/types/product';
import { useAppSelector } from '@/store/hooks';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productDialogOpen, setProductDialogOpen] = useState(false);

  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const wishlistCount = wishlistItems.length;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Home Decor', path: '/home-decor' },
    { name: 'Fashion', path: '/fashion' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setProductDialogOpen(true);
  };

  const handleWishlistProductClick = (product: Product) => {
    setSelectedProduct(product);
    setProductDialogOpen(true);
  };

  return (
    <>
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl">
        <div className="bg-background/80 backdrop-blur-md border border-border rounded-full shadow-lg px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <h1 className="text-xl font-bold text-foreground">KHUBSURAT</h1>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-foreground/80 hover:text-foreground transition-colors font-medium text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setSearchOpen(true)}
              >
                <Search className="h-5 w-5" />
              </Button>
              
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Heart className="h-5 w-5" />
                    {wishlistCount > 0 && (
                      <Badge 
                        className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                      >
                        {wishlistCount}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Wishlist ({wishlistCount})</SheetTitle>
                  </SheetHeader>
                  {wishlistItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-[50vh] gap-4">
                      <Heart className="h-16 w-16 text-muted-foreground" />
                      <p className="text-muted-foreground">Your wishlist is empty</p>
                    </div>
                  ) : (
                    <ScrollArea className="h-[calc(100vh-120px)] mt-6">
                      <div className="space-y-4">
                        {wishlistItems.map((item) => (
                          <div 
                            key={item.id} 
                            className="flex gap-4 cursor-pointer hover:bg-muted/50 p-2 rounded-lg transition-colors"
                            onClick={() => handleWishlistProductClick(item)}
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-20 h-20 object-cover rounded-md"
                            />
                            <div className="flex-1">
                              <h4 className="font-semibold text-sm">{item.name}</h4>
                              <p className="text-sm text-muted-foreground">{item.category}</p>
                              <p className="font-bold text-primary mt-1">${item.price}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  )}
                </SheetContent>
              </Sheet>

              <CartSheet />
              
              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden pt-4 mt-4 border-t border-border">
              <div className="flex flex-col space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="text-foreground/80 hover:text-foreground transition-colors font-medium text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      <SearchDialog
        open={searchOpen}
        onOpenChange={setSearchOpen}
        onSelectProduct={handleProductSelect}
      />

      <ProductDetailDialog
        product={selectedProduct}
        open={productDialogOpen}
        onOpenChange={setProductDialogOpen}
      />
    </>
  );
};
