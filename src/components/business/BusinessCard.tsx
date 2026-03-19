import { useNavigate } from 'react-router-dom';
import { FaLocationDot } from 'react-icons/fa6';
import { Business } from '../../types/business';
import type { Service } from '../../types/service';
import './BusinessCard.css';

interface BusinessCardProps {
  business: Business;
}

function formatPriceMDL(price: number) {
  const value = Number.isFinite(price) ? price : 0;
  return `${value.toLocaleString('ro-RO')} MDL`;
}

function getActiveServices(services: Service[]) {
  return services.filter((s) => s.is_active);
}

function normalizeImageUrl(url: string | null | undefined) {
  if (!url) return undefined;
  return url.replace(/\$\d+(?=([?#]|$))/, '');
}

export default function BusinessCard({ business }: BusinessCardProps) {
  const navigate = useNavigate();

  const activeServices = getActiveServices(business.providedServices);
  const topServices = activeServices.slice(0, 3);
  const minPrice = activeServices.length ? Math.min(...activeServices.map((s) => s.price)) : null;

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
            <p className="business-address">
              <FaLocationDot className="business-address-icon" />
              <span>{business.address || business.city || ''}</span>
            </p>
          </div>
        </div>

        <p className="starting">Starting from {minPrice != null ? formatPriceMDL(minPrice) : '—'}</p>

        <div className="card-expand">
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
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
}
