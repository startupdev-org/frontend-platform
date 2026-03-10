import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import BusinessHeader from '../../components/business/BusinessHeader';
import ServiceList from '../../components/business/ServiceList';
import EmployeeCard from '../../components/business/EmployeeCard';
import ReviewList from '../../components/business/ReviewList';
import Spinner from '../../components/ui/Spinner';
import Button from '../../components/ui/Button';
import { reviewService } from '../../services/review.service';
import { Service } from '../../types/service';
import { Employee } from '../../types/employee';
import { Review, RatingBreakdown } from '../../types/review';
import { useBusiness, useBusinesses } from '../../hooks/useBusiness';

export default function BusinessDetailsPage() {
    const { slug } = useParams<{ slug: string }>();
    const [reviews, setReviews] = useState<Review[]>([]);
    const [ratingBreakdown, setRatingBreakdown] = useState<RatingBreakdown>({
        overall: 0,
        cleanliness: 0,
        service: 0,
        price: 0,
    });

    const { business, isLoading, error } = useBusiness(slug);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Spinner size="lg" />
            </div>
        );
    }

    if (!business) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Business not found</h1>
                    <Link to="/" className="text-blue-600 hover:text-blue-700">
                        Return to marketplace
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>{business.name} - BookBeauty</title>
                <meta name="description" content={business.description || `Book appointments at ${business.name}`} />
            </Helmet>

            <div className="min-h-screen flex flex-col bg-gray-50">
                <Navbar />

                <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
                    <BusinessHeader business={business} />

                    <div className="mb-6">
                        <Link to={`/book/${business.slug}`}>
                            <Button size="lg" className="w-full md:w-auto">
                                Book Now
                            </Button>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        <ServiceList services={business.providedServices} />

                        <div className="bg-white rounded-xl shadow-md p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Team</h2>
                            {business.employeeList.length === 0 ? (
                                <p className="text-center text-gray-500 py-8">No team members listed</p>
                            ) : (
                                <div className="space-y-4">
                                    {business.employeeList.map((employee) => (
                                        <EmployeeCard key={employee.id} employee={employee} />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* <ReviewList reviews={reviews} ratingBreakdown={ratingBreakdown} /> */}
                </div>

                <Footer />
            </div>
        </>
    );
}
