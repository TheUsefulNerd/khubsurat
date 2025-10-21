import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Products } from '@/components/Products';
import fashionImage from '@/assets/fashion-category.jpg';

const Fashion = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="relative pt-24 pb-16">
        <div className="absolute inset-0 h-[400px]">
          <img
            src={fashionImage}
            alt="Fashion"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/80 to-background" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32">
          <h1 className="text-5xl sm:text-6xl font-bold text-foreground mb-4">
            Fashion Collection
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Discover timeless fashion pieces that elevate your wardrobe for every season.
          </p>
        </div>
      </div>
      <Products category="Fashion" />
      <Footer />
    </div>
  );
};

export default Fashion;