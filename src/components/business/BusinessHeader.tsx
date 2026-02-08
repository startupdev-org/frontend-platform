import { MapPinIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { Business } from '../../types/business';
import RatingStars from './RatingStars';

interface BusinessHeaderProps {
  business: Business;
}

export default function BusinessHeader({ business }: BusinessHeaderProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-8 mb-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0">
          {business.logo_url ? (
            <img
              src={business.logo_url}
              alt={business.name}
              className="w-32 h-32 rounded-xl object-cover"
            />
          ) : (
            <div className="w-32 h-32 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
              <span className="text-5xl font-bold text-blue-600">
                {business.name.charAt(0)}
              </span>
            </div>
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {business.name}
              </h1>
              <div className="flex items-center">
                <RatingStars rating={business.average_rating || 0} size="md" showNumber />
                <span className="ml-2 text-gray-600">
                  ({business.review_count || 0} reviews)
                </span>
              </div>
            </div>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              {business.category}
            </span>
          </div>

          <div className="space-y-2 text-gray-600">
            {business.address && (
              <div className="flex items-center">
                <MapPinIcon className="h-5 w-5 mr-2 flex-shrink-0" />
                <span>{business.address}, {business.city}</span>
              </div>
            )}
            {business.phone && (
              <div className="flex items-center">
                <PhoneIcon className="h-5 w-5 mr-2 flex-shrink-0" />
                <a href={`tel:${business.phone}`} className="hover:text-blue-600">
                  {business.phone}
                </a>
              </div>
            )}
            {business.email && (
              <div className="flex items-center">
                <EnvelopeIcon className="h-5 w-5 mr-2 flex-shrink-0" />
                <a href={`mailto:${business.email}`} className="hover:text-blue-600">
                  {business.email}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {business.description && (
        <div className="mt-6 pt-6 border-t">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">About</h2>
          <p className="text-gray-600 leading-relaxed">{business.description}</p>
        </div>
      )}
    </div>
  );
}
