import { useNavigate } from 'react-router-dom';
import { FaLocationDot } from 'react-icons/fa6';
import { CalendarDaysIcon } from '@heroicons/react/24/outline';
import { Business } from '../../types/business';
import type { Service } from '../../types/service';
import type { WorkingHours } from '../../types/business';
import RatingStars from './RatingStars';
import './BusinessCard.css';

const WEEKDAY_KEYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] as const;

interface BusinessCardProps {
  business: Business;
}

function formatPriceMDL(price: number) {
  const value = Number.isFinite(price) ? price : 0;
  return `${value.toLocaleString('ro-RO')} MDL`;
}

function getActiveServices(services: Service[]) {
  return services.filter((s) => {
    const service = s as Service & { active?: boolean; is_active?: boolean };
    if (typeof service.active === 'boolean') return service.active;
    if (typeof service.is_active === 'boolean') return service.is_active;
    return true;
  });
}

function normalizeImageUrl(url: string | null | undefined) {
  if (!url) return undefined;
  return url.replace(/\$\d+(?=([?#]|$))/, '');
}

function getTodayClosingTime(workingHours: WorkingHours | undefined, date: Date): string | null {
  if (!workingHours) return null;
  const todayKey = WEEKDAY_KEYS[date.getDay() as number];
  const hoursToday = workingHours[todayKey];
  return hoursToday?.close || null;
}

function formatPhoneNumber(phone: string | null): { formatted: string; callable: string } {
  if (!phone) return { formatted: 'Telefon indisponibil', callable: '' };
  
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '');
  
  // Handle Moldova numbers (+373)
  if (digits.startsWith('373') && digits.length === 11) {
    const number = digits.slice(3); // Remove 373
    return {
      formatted: `+373 (${number.slice(0, 2)}) ${number.slice(2, 5)} ${number.slice(5)}`,
      callable: `+${digits}`
    };
  }
  
  // Handle local Moldova numbers (starting with 0)
  if (digits.startsWith('0') && digits.length === 9) {
    const number = digits.slice(1); // Remove leading 0
    return {
      formatted: `+373 (${number.slice(0, 2)}) ${number.slice(2, 5)} ${number.slice(5)}`,
      callable: `+373${number}`
    };
  }
  
  // Return original if format doesn't match
  return { formatted: phone, callable: phone };
}

export default function BusinessCard({ business }: BusinessCardProps) {
  const navigate = useNavigate();

  const activeServices = getActiveServices((business.providedServices ?? []) as Service[]);
  const topServices = activeServices.slice(0, 3);
  
  const today = new Date();
  const closingTime = getTodayClosingTime(business.working_hours, today);
  const phoneInfo = formatPhoneNumber(business.phone);

  const rawLogoUrl = business.logo_url ?? (business as any).logoUrl;
  const rawCoverUrl = business.cover_image_url ?? (business as any).coverImageUrl;
  const logoUrl = normalizeImageUrl(rawLogoUrl) ?? normalizeImageUrl(rawCoverUrl);

  return (
    <div
      className="card marketplace-equal-height-card"
      role="link"
      tabIndex={0}
      onClick={() => navigate(`/${business.slug}`)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') navigate(`/${business.slug}`);
      }}
    >
      <div
        className="card-image"
        style={{
          backgroundImage: logoUrl ? `url("${logoUrl}")` : undefined,
        }}
      />

      <div className="card-content">
        <div className="card-header">
          <div>
            <h3>{business.name}</h3>
            <div className="business-meta">
              <div className="business-address-row">
                <p className="business-address">
                  <FaLocationDot className="business-address-icon" />
                  <span>{business.address || business.city || ''}</span>
                </p>
                <RatingStars 
                  rating={business.average_rating || 0} 
                  size="sm" 
                  showNumber 
                  className="business-rating"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="card-expand">
          <div className="business-info-row">
            {phoneInfo.callable ? (
              <a 
                href={`tel:${phoneInfo.callable}`} 
                className="phone-number phone-link"
                onClick={(e) => e.stopPropagation()}
              >
                {phoneInfo.formatted}
              </a>
            ) : (
              <p className="phone-number">{phoneInfo.formatted}</p>
            )}
            <p className="closing-time">
              {closingTime ? `Închide la ${closingTime}` : 'Program nedisponibil'}
            </p>
          </div>
          {topServices.map((s) => (
            <div key={s.id} className="service">
              <span>{s.name}</span>
              <strong>{formatPriceMDL(s.price)}</strong>
            </div>
          ))}

          <button
            type="button"
            className="book-button"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/book/${business.slug}`);
            }}
          >
            <CalendarDaysIcon className="book-button__icon h-5 w-5 mr-2" />
            <span className="book-button__text">Programează-te</span>
          </button>
        </div>
      </div>
    </div>
  );
}
