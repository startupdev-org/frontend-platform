import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ServiceList from '../../components/business/ServiceList';
import EmployeeCard from '../../components/business/EmployeeCard';
import ReviewList from '../../components/business/ReviewList';
import { Business } from '../../types/business';
import { Service } from '../../types/service';
import { Employee } from '../../types/employee';
import { Review, RatingBreakdown } from '../../types/review';
import { health } from '../../services/health.service';

const mockBusiness: Business = {
  id: 'luxe-001',
  name: 'Luxe Beauty Studio',
  slug: 'luxe-beauty-studio',
  subdomain: null,
  description:
    'Luxe Beauty Studio is a premium salon located in central Chișinău providing brows, facials and professional styling. We prioritise hygiene, modern techniques and personalised care.',
  logo_url: 'https://images.squarespace-cdn.com/content/v1/54390f2ee4b0a3191f9d5ab8/1574985068143-Y4C7Y4E9X2W1D7EA923S/Eyebrow-Tattoo.jpg?format=2500w',
  phone: '+373 (22) 555-019',
  email: 'hello@luxebeauty.md',
  address: 'Strada 31 August 1989 80',
  city: 'Chișinău, Moldova',
  latitude: 47.0105,
  longitude: 28.8638,
  category: 'Beauty Salon',
  price_range: 3,
  working_hours: {
    monday: { open: '09:00', close: '18:00' },
    tuesday: { open: '09:00', close: '18:00' },
    wednesday: { open: '09:00', close: '18:00' },
    thursday: { open: '10:00', close: '20:00' },
    friday: { open: '10:00', close: '20:00' },
    saturday: { open: '09:00', close: '16:00' },
    sunday: { open: null, close: null },
  },
  is_active: true,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  average_rating: 4.8,
  review_count: 124,
};

const mockServices: Service[] = [
  {
    id: 's1',
    business_id: mockBusiness.id,
    name: 'Signature Facial',
    description: 'Deep-cleansing facial tailored to your skin type',
    price: 85,
    duration_minutes: 60,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 's2',
    business_id: mockBusiness.id,
    name: 'Microblading (Initial)',
    description: 'Semi-permanent eyebrow microblading — initial session',
    price: 350,
    duration_minutes: 150,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 's3',
    business_id: mockBusiness.id,
    name: 'Eyebrow Shaping',
    description: 'Waxing and shaping for a polished brow',
    price: 40,
    duration_minutes: 30,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 's4',
    business_id: mockBusiness.id,
    name: 'Haircut & Style',
    description: 'Precision cut and professional blow-dry',
    price: 65,
    duration_minutes: 60,
    is_active: true,
    created_at: new Date().toISOString(),
  },
];

/* connections removed - replaced by Reviews tab */

/* followers removed */

const mockEmployees: Employee[] = [
  {
    id: 'e1',
    business_id: mockBusiness.id,
    name: 'Maria Popa',
    photo_url: 'https://randomuser.me/api/portraits/women/68.jpg',
    position: 'Senior Aesthetician',
    bio: 'Specialist in microblading and corrective brow shaping with 8 years experience in Chișinău.',
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'e2',
    business_id: mockBusiness.id,
    name: 'Ion Drăgan',
    photo_url: 'https://randomuser.me/api/portraits/men/32.jpg',
    position: 'Lead Stylist',
    bio: 'Experienced stylist focusing on precision cuts and contemporary colour techniques.',
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'e3',
    business_id: mockBusiness.id,
    name: 'Ana Rusu',
    photo_url: 'https://randomuser.me/api/portraits/women/65.jpg',
    position: 'Aesthetician',
    bio: 'Provides restorative facials and skin maintenance plans.',
    is_active: true,
    created_at: new Date().toISOString(),
  },
];

const mockReviews: Review[] = [
  {
    id: 'r1',
    business_id: mockBusiness.id,
    booking_id: null,
    customer_name: 'Mihai C.',
    rating_overall: 5,
    rating_cleanliness: 5,
    rating_service: 5,
    rating_price: 4,
    comment: 'Very professional team and excellent microblading results — highly recommended.',
    reply: 'Mulțumim, Mihai! Ne bucurăm că sunteți mulțumit.',
    is_verified: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'r2',
    business_id: mockBusiness.id,
    booking_id: null,
    customer_name: 'Ana P.',
    rating_overall: 5,
    rating_cleanliness: 5,
    rating_service: 5,
    rating_price: 5,
    comment: 'Excellent haircut and styling — my hair looks beautiful.',
    reply: null,
    is_verified: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'r3',
    business_id: mockBusiness.id,
    booking_id: null,
    customer_name: 'Victor B.',
    rating_overall: 4,
    rating_cleanliness: 4,
    rating_service: 4,
    rating_price: 4,
    comment: 'Relaxing facial — noticeable improvement after the first session.',
    reply: null,
    is_verified: true,
    created_at: new Date().toISOString(),
  },
];

const mockRatingBreakdown: RatingBreakdown = {
  overall: 4.8,
  cleanliness: 4.9,
  service: 4.8,
  price: 4.4,
};

export default function BusinessTestPage() {
  const [activeTab, setActiveTab] = useState<'activity' | 'projects' | 'team' | 'reviews'>('activity');

  console.log('Running the method')
  const reponse = health();



  return (
    <div className="app-content-wrapper py-5 bg-light min-vh-100">

      <div className="container mx-auto max-w-7xl">
        <div className="page-content">
          <div className="profile-header card-bg shadow-custom rounded-custom position-relative overflow-hidden mb-6">
            <div className="profile-cover-wrapper">
              <div
                className="profile-cover-img"
                style={{
                  backgroundImage: `url('https://media.istockphoto.com/id/1856117770/photo/modern-beauty-salon.jpg?s=612x612&w=0&k=20&c=dVZtsePk2pgbqDXwVkMm-yIw5imnZ2rnkAruR7zf8EA=')`,
                }}
              />


              <div className="profile-cover-actions" />
            </div>
            <div className="profile-header-bottom position-relative d-flex justify-content-between align-items-end mx-4 pb-4 flex-wrap gap-3">
              <div className="profile-avatar-wrapper d-flex align-items-end gap-3 flex-wrap">
                <div className="profile-avatar flex-shrink-0">
                  <img src="https://images.squarespace-cdn.com/content/v1/54390f2ee4b0a3191f9d5ab8/1574985068143-Y4C7Y4E9X2W1D7EA923S/Eyebrow-Tattoo.jpg?format=2500w" alt="Profile" />
                </div>
                <div className="profile-info pb-3">
                  <h3 className="h3 fw-semibold mb-1">{mockBusiness.name}</h3>
                  <div className="profile-meta">
                    <span>{mockBusiness.category}</span>
                    <span>{mockBusiness.city}</span>
                    <span>{mockBusiness.review_count} Reviews</span>
                  </div>
                </div>
              </div>

              <div className="profile-avatar-buttons d-flex align-items-center pb-3 gap-2">
                <button className="btn btn-custom-secondary">Send message</button>
                <Link to={`/book/${mockBusiness.slug}`} className="btn btn-primary">Book Now</Link>
              </div>
            </div>

            <div className="profile-nav mx-4">
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <button type="button" className={`nav-link ${activeTab === 'activity' ? 'active' : ''}`} onClick={() => setActiveTab('activity')}>Home</button>
                </li>
                <li className="nav-item">
                  <button type="button" className={`nav-link ${activeTab === 'projects' ? 'active' : ''}`} onClick={() => setActiveTab('projects')}>Services</button>
                </li>
                <li className="nav-item">
                  <button type="button" className={`nav-link ${activeTab === 'team' ? 'active' : ''}`} onClick={() => setActiveTab('team')}>Team</button>
                </li>
                <li className="nav-item">
                  <button type="button" className={`nav-link ${activeTab === 'reviews' ? 'active' : ''}`} onClick={() => setActiveTab('reviews')}>Reviews</button>
                </li>
                {/* Followers tab removed */}
              </ul>
            </div>
          </div>

          <div className="row gy-5">
            <div className="col-lg-4">
              <div className="card shadow-custom rounded-custom mb-5">
                <div className="card-body px-4 pt-4 pb-4">
                  <p className="fw-medium mb-2 text-custom-body">Business Info</p>
                  <div className="profile-info d-flex flex-column gap-3">
                    <div className="profile-info-item d-flex align-items-center">
                      <span className="profile-info-label">Name: </span>
                      <span className="profile-info-content">{mockBusiness.name}</span>
                    </div>
                    <div className="profile-info-item d-flex align-items-center">
                      <span className="profile-info-label">Category: </span>
                      <span className="profile-info-content">{mockBusiness.category}</span>
                    </div>
                    <div className="profile-info-item d-flex align-items-center">
                      <span className="profile-info-label">Address: </span>
                      <span className="profile-info-content">{mockBusiness.address}</span>
                    </div>
                    <div className="profile-info-item d-flex align-items-center">
                      <span className="profile-info-label">Phone: </span>
                      <span className="profile-info-content">{mockBusiness.phone}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card shadow-custom rounded-custom">
                <div className="card-body p-4">
                  <h4 className="fw-semibold mb-3">Contact</h4>
                  <div className="profile-info d-flex flex-column gap-2">
                    <div className="profile-info-item d-flex align-items-center">
                      <span className="profile-info-label">Email: </span>
                      <span className="profile-info-content">{mockBusiness.email}</span>
                    </div>
                    <div className="profile-info-item d-flex align-items-center">
                      <span className="profile-info-label">City: </span>
                      <span className="profile-info-content">{mockBusiness.city}</span>
                    </div>
                    <div className="profile-info-item d-flex flex-column mt-3">
                      <span className="profile-info-label mb-2">Social:</span>
                      <ul className="social default left" aria-label="Business social links">
                        <li data-tooltip="Telegram" style={{ ['--bg' as any]: '#26A5E4' }}>
                          <a href="https://t.me/luxebeauty" target="_blank" rel="noreferrer" aria-label="Telegram">
                            <i className="fa-brands fa-telegram" aria-hidden="true" />
                          </a>
                        </li>

                        <li data-tooltip="Viber" style={{ ['--bg' as any]: '#59267C' }}>
                          <a href="viber://chat?number=%2B37322555019" target="_blank" rel="noreferrer" aria-label="Viber">
                            <i className="fa-brands fa-viber" aria-hidden="true" />
                          </a>
                        </li>

                        <li data-tooltip="Instagram" style={{ ['--bg' as any]: 'linear-gradient(-45deg,#feda75,#fa7e1e,#d62976,#962fbf,#4f5bd5)' }}>
                          <a href="https://instagram.com/luxebeauty.md" aria-label="Instagram" target="_blank" rel="noopener">
                            <i>
                              <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path d="M24 4.32c6.41 0 7.17.03 9.7.14 2.34.1 3.6.5 4.45.83 1.11.43 1.92.95 2.75 1.79a7.38 7.38 0 0 1 1.8 2.75c.32.85.72 2.12.82 4.46.11 2.53.14 3.29.14 9.7 0 6.4-.03 7.16-.14 9.68-.1 2.35-.5 3.61-.83 4.46a7.42 7.42 0 0 1-1.79 2.75 7.38 7.38 0 0 1-2.75 1.8c-.85.32-2.12.72-4.46.82-2.53.11-3.29.14-9.69.14-6.41 0-7.17-.03-9.7-.14-2.34-.1-3.6-.5-4.45-.83a7.42 7.42 0 0 1-2.75-1.79 7.38 7.38 0 0 1-1.8-2.75 13.2 13.2 0 0 1-.82-4.46c-.11-2.53-.14-3.29-.14-9.69 0-6.41.03-7.17.14-9.7.1-2.34.5-3.6.83-4.45A7.42 7.42 0 0 1 7.1 7.08a7.38 7.38 0 0 1 2.75-1.8 13.2 13.2 0 0 1 4.46-.82c2.52-.11 3.28-.14 9.69-.14ZM24 0c-6.52 0-7.33.03-9.9.14-2.54.11-4.3.53-5.81 1.12a11.71 11.71 0 0 0-4.26 2.77 11.76 11.76 0 0 0-2.77 4.25C.66 9.8.26 11.55.14 14.1A176.6 176.6 0 0 0 0 24c0 6.52.03 7.33.14 9.9.11 2.54.53 4.3 1.12 5.81a11.71 11.71 0 0 0 2.77 4.26 11.73 11.73 0 0 0 4.25 2.76c1.53.6 3.27 1 5.82 1.12 2.56.11 3.38.14 9.9.14 6.5 0 7.32-.03 9.88-.14 2.55-.11 4.3-.52 5.82-1.12 1.58-.6 2.92-1.43 4.25-2.76a11.73 11.73 0 0 0 2.77-4.25c.59-1.53 1-3.27 1.11-5.82.11-2.56.14-3.38.14-9.9 0-6.5-.03-7.32-.14-9.88-.11-2.55-.52-4.3-1.11-5.82-.6-1.6-1.41-2.94-2.75-4.27a11.73 11.73 0 0 0-4.25-2.76C38.2.67 36.45.27 33.9.15 31.33.03 30.52 0 24 0Z" fill="currentColor"></path>
                                <path d="M24 11.67a12.33 12.33 0 1 0 0 24.66 12.33 12.33 0 0 0 0-24.66ZM24 32a8 8 0 1 1 0-16 8 8 0 0 1 0 16ZM39.7 11.18a2.88 2.88 0 1 1-5.76 0 2.88 2.88 0 0 1 5.75 0Z" fill="currentColor"></path>
                              </svg>
                            </i>
                          </a>
                        </li>

                        <li data-tooltip="Facebook" style={{ ['--bg' as any]: '#1877F2' }}>
                          <a href="https://facebook.com/luxebeauty.md" target="_blank" rel="noreferrer" aria-label="Facebook">
                            <i>
                              <svg className="h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <title>Facebook</title>
                                <path fill="currentColor" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                              </svg>
                            </i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card shadow-custom rounded-custom mt-4">
                <div className="card-body p-0">
                  <h4 className="fw-semibold mb-3 px-4 pt-3">Location</h4>
                  <div className="px-4 pb-3">
                    <div className="map-embed" style={{ width: '100%', height: 250, overflow: 'hidden', borderRadius: 6 }}>
                      <iframe
                        title="Business location"
                        src={`https://www.google.com/maps?q=${mockBusiness.latitude},${mockBusiness.longitude}&z=15&output=embed`}
                        width="100%"
                        height="250"
                        style={{ border: 0 }}
                        loading="lazy"
                      />
                    </div>
                    <div className="mt-2"><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mockBusiness.address + ', ' + mockBusiness.city)}`} target="_blank" rel="noreferrer">Open in Google Maps</a></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-8">
              <div className="row gy-5">
                {activeTab === 'activity' && (
                  <div className="col-12">
                    <div className="card shadow-custom rounded-custom">
                      <div className="card-body p-4">
                        <h4 className="fw-semibold mb-4">Home</h4>
                        <ReviewList reviews={mockReviews} businessName={mockBusiness.name} businessAvatar={mockBusiness.logo_url} />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'projects' && (
                  <div className="col-12">
                    <div className="card shadow-custom rounded-custom">
                      <div className="card-body p-4">
                        <h4 className="fw-semibold mb-4">Services</h4>
                        <ServiceList services={mockServices} />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'team' && (
                  <div className="col-12">
                    <div className="card shadow-custom rounded-custom">
                      <div className="card-body p-4">
                        <h4 className="fw-semibold mb-4">Team</h4>
                        <div className="d-flex flex-column gap-3">
                          {mockEmployees.map((emp) => (
                            <div key={emp.id} className="d-flex align-items-center">
                              <EmployeeCard employee={emp} />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="col-12">
                    <div className="card shadow-custom rounded-custom">
                      <div className="card-body p-4">
                        <h4 className="fw-semibold mb-4">Reviews</h4>
                        <ReviewList reviews={mockReviews} />
                      </div>
                    </div>
                  </div>
                )}

                {/* followers removed */}
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
