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
import { BusinessFilters } from '../../types/business';
import { useBusinesses } from '../../hooks/useBusiness';

export default function MarketplacePage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState(1);
  const [maxPrice, setMaxPrice] = useState(4);
  const [minRating, setMinRating] = useState(0);
  const [page, setPage] = useState(0);
  const [size] = useState(10);

  const filters: BusinessFilters = {
    page,
    size,
    search: search || undefined,
    category: category || undefined,
    minPrice,
    maxPrice,
    minRating: minRating || undefined,
  };

  const { businesses, totalElements, totalPages, isLoading, error } = useBusinesses(filters);

  const handleClearFilters = () => {
    setSearch('');
    setCategory('');
    setMinPrice(1);
    setMaxPrice(4);
    setMinRating(0);
    setPage(0);
  };

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
            {/* Search bar */}
            <div className="mb-6">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search businesses..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(0); // reset to first page on new search
                  }}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Filters sidebar */}
              <aside className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-md p-6 space-y-6 sticky top-20">
                  <h2 className="text-lg font-semibold text-gray-900">Filters</h2>

                  <CategoryFilter value={category} onChange={(val) => { setCategory(val); setPage(0); }} />

                  <PriceFilter
                    minPrice={minPrice}
                    maxPrice={maxPrice}
                    onMinChange={(val) => { setMinPrice(val); setPage(0); }}
                    onMaxChange={(val) => { setMaxPrice(val); setPage(0); }}
                  />

                  <RatingFilter value={minRating} onChange={(val) => { setMinRating(val); setPage(0); }} />

                  <button
                    onClick={handleClearFilters}
                    className="w-full px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
                  >
                    Clear Filters
                  </button>
                </div>
              </aside>

              {/* Main content */}
              <main className="lg:col-span-3">
                {isLoading ? (
                  <div className="flex justify-center py-16">
                    <Spinner size="lg" />
                  </div>
                ) : error ? (
                  <div className="text-center py-16">
                    <p className="text-xl text-gray-600">Something went wrong</p>
                    <p className="text-gray-500 mt-2">{error}</p>
                  </div>
                ) : businesses.length === 0 ? (
                  <div className="text-center py-16">
                    <p className="text-xl text-gray-600">No businesses found</p>
                    <p className="text-gray-500 mt-2">Try adjusting your filters</p>
                  </div>
                ) : (
                  <>
                    {/* Results count */}
                    <div className="mb-4">
                      <p className="text-gray-600">
                        Found <span className="font-semibold">{totalElements}</span>{' '}
                        {totalElements === 1 ? 'business' : 'businesses'}
                      </p>
                    </div>

                    {/* Business grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {businesses.map((business) => (
                        <BusinessCard key={business.id} business={business} />
                      ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="mt-8 flex justify-center items-center gap-2">
                        <button
                          onClick={() => setPage((p) => Math.max(0, p - 1))}
                          disabled={page === 0}
                          className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                        >
                          Previous
                        </button>

                        <div className="flex items-center gap-1">
                          {Array.from({ length: totalPages }).map((_, i) => (
                            <button
                              key={i}
                              onClick={() => setPage(i)}
                              className={[
                                'w-9 h-9 rounded-lg text-sm font-medium transition-all',
                                i === page
                                  ? 'bg-blue-600 text-white'
                                  : 'border border-gray-300 text-gray-700 hover:bg-gray-50',
                              ].join(' ')}
                            >
                              {i + 1}
                            </button>
                          ))}
                        </div>

                        <button
                          onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                          disabled={page === totalPages - 1}
                          className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                        >
                          Next
                        </button>
                      </div>
                    )}
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