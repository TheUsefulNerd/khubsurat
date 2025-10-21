import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import fashionImage from '@/assets/fashion-category.jpg';
import decorImage from '@/assets/decor-category.jpg';

export const Categories = () => {
  const categories = [
    {
      id: 1,
      title: 'Fashion',
      description: 'Timeless pieces for every season',
      image: fashionImage,
      href: '/fashion',
    },
    {
      id: 2,
      title: 'Home Decor',
      description: 'Curate your perfect sanctuary',
      image: decorImage,
      href: '/home-decor',
    },
  ];

  return (
    <section id="shop" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Shop by Category
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our carefully selected collections designed to elevate your lifestyle
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={category.href}
              className="group relative overflow-hidden rounded-lg shadow-card hover:shadow-soft transition-all duration-300"
            >
              <div className="aspect-square relative">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-3xl font-bold text-foreground mb-2">
                  {category.title}
                </h3>
                <p className="text-foreground/80 mb-4">{category.description}</p>
                <Button
                  variant="ghost"
                  className="group/btn p-0 h-auto hover:bg-transparent text-primary"
                >
                  Explore Collection
                  <ArrowRight className="ml-2 h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
