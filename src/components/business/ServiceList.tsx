import { ClockIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { Service } from '../../types/service';

interface ServiceListProps {
  services: Service[];
}

export default function ServiceList({ services }: ServiceListProps) {
  if (services.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-8 text-center text-gray-500">
        No services available
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Services</h2>

      <div className="space-y-4">
        {services.map((service) => (
          <div
            key={service.id}
            className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition-all"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
              <span className="text-xl font-bold text-blue-600">${service.price}</span>
            </div>

            {service.description && (
              <p className="text-gray-600 mb-3">{service.description}</p>
            )}

            <div className="flex items-center text-sm text-gray-500">
              <ClockIcon className="h-4 w-4 mr-1" />
              <span>{service.duration_minutes} minutes</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
