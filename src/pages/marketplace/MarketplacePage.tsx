import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import BusinessCard from '../../components/business/BusinessCard';
import CategoryFilter from '../../components/filters/CategoryFilter';
import PriceFilter from '../../components/filters/PriceFilter';
import RatingFilter from '../../components/filters/RatingFilter';
import Spinner from '../../components/ui/Spinner';
import { useBusinesses } from '../../hooks/useBusiness';
import { BusinessFilters } from '../../types/business';

export default function MarketplacePage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState(1);
  const [maxPrice, setMaxPrice] = useState(4);
  const [minRating, setMinRating] = useState(0);

  const filters: BusinessFilters = {
    search,
    category: category || undefined,
    minPrice,
    maxPrice,
    minRating: minRating || undefined,
  };

  const { businesses, isLoading } = useBusinesses(filters);

  return (
    <>
      <Helmet>
        <title>Marketplace - BookBeauty</title>
        <meta
          name="description"
          content="Discover and book the best beauty salons, barbershops, and spas in your area."
        />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />

        <div className="flex-1">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Find Your Perfect Beauty Experience
              </h1>
              <p className="text-xl text-blue-100">
                Book appointments at the best salons and barbershops
              </p>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-6">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search businesses..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <aside className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-md p-6 space-y-6 sticky top-20">
                  <h2 className="text-lg font-semibold text-gray-900">Filters</h2>

                  <CategoryFilter value={category} onChange={setCategory} />

                  <PriceFilter
                    minPrice={minPrice}
                    maxPrice={maxPrice}
                    onMinChange={setMinPrice}
                    onMaxChange={setMaxPrice}
                  />

                  <RatingFilter value={minRating} onChange={setMinRating} />

                  <button
                    onClick={() => {
                      setSearch('');
                      setCategory('');
                      setMinPrice(1);
                      setMaxPrice(4);
                      setMinRating(0);
                    }}
                    className="w-full px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
                  >
                    Clear Filters
                  </button>
                </div>
              </aside>

              <main className="lg:col-span-3">
                {isLoading ? (
                  <div className="flex justify-center py-16">
                    <Spinner size="lg" />
                  </div>
                ) : businesses.length === 0 ? (
                  <div className="text-center py-16">
                    <p className="text-xl text-gray-600">No businesses found</p>
                    <p className="text-gray-500 mt-2">Try adjusting your filters</p>
                  </div>
                ) : (
                  <>
                    <div className="mb-4">
                      <p className="text-gray-600">
                        Found <span className="font-semibold">{businesses.length}</span>{' '}
                        {businesses.length === 1 ? 'business' : 'businesses'}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {businesses.map((business) => (
                        <BusinessCard key={business.id} business={business} />
                      ))}
                    </div>
                  </>
                )}
              </main>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
