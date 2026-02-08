import { Link } from 'react-router-dom';
import { MapPinIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { Business } from '../../types/business';
import RatingStars from './RatingStars';

interface BusinessCardProps {
  business: Business;
}

export default function BusinessCard({ business }: BusinessCardProps) {
  const priceRangeDisplay = '$'.repeat(business.price_range);

  return (
    <Link
      to={`/business/${business.slug}`}
      className="block bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
    >
      <div className="aspect-video bg-gray-200 overflow-hidden">
        {business.logo_url ? (
          <img
            src={business.logo_url}
            alt={business.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
            <span className="text-4xl font-bold text-blue-600">
              {business.name.charAt(0)}
            </span>
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {business.name}
        </h3>

        <div className="flex items-center mb-2">
          <RatingStars rating={business.average_rating || 0} size="sm" />
          <span className="ml-2 text-sm text-gray-600">
            ({business.review_count || 0} reviews)
          </span>
        </div>

        <div className="flex items-center text-gray-600 text-sm mb-2">
          <MapPinIcon className="h-4 w-4 mr-1" />
          <span>{business.address || business.city}</span>
        </div>

        <div className="flex items-center text-gray-600 text-sm">
          <CurrencyDollarIcon className="h-4 w-4 mr-1" />
          <span className="font-medium">{priceRangeDisplay}</span>
          <span className="ml-2 text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-full">
            {business.category}
          </span>
        </div>
      </div>
    </Link>
  );
}
