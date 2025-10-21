import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { allProducts } from '@/data/products';
import { Product } from '@/types/product';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectProduct: (product: Product) => void;
}

export const SearchDialog = ({ open, onOpenChange, onSelectProduct }: SearchDialogProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = searchQuery.trim()
    ? allProducts.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleProductClick = (product: Product) => {
    onSelectProduct(product);
    onOpenChange(false);
    setSearchQuery('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Search Products</DialogTitle>
        </DialogHeader>
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            autoFocus
          />
        </div>

        {searchQuery.trim() && (
          <ScrollArea className="max-h-[400px] mt-4">
            {filteredProducts.length > 0 ? (
              <div className="space-y-2">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted cursor-pointer transition-colors"
                    onClick={() => handleProductClick(product)}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">{product.name}</h4>
                      <p className="text-sm text-muted-foreground">{product.category}</p>
                    </div>
                    <span className="font-bold text-primary">${product.price}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">
                No products found matching "{searchQuery}"
              </p>
            )}
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  );
};
