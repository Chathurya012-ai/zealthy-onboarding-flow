import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import { apiService, ConfigResponse, UserData } from '../Services/api';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const OnboardingWizard: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [config, setConfig] = useState<ConfigResponse | null>(null);
    const [userData, setUserData] = useState<UserData>({
        email: '',
        password: '',
        aboutMe: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        birthdate: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const configData = await apiService.getConfig();
                setConfig(configData);
            } catch (error) {
                console.error('Failed to fetch config:', error);
            }
        };
        fetchConfig();
    }, []);

    const validateStep = (step: number): boolean => {
        const newErrors: Record<string, string> = {};

        if (step === 1) {
            if (!userData.email) newErrors.email = 'Email is required';
            if (!userData.password) newErrors.password = 'Password is required';
            if (userData.email && !/\S+@\S+\.\S+/.test(userData.email)) {
                newErrors.email = 'Please enter a valid email';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const handleBack = () => {
        setCurrentStep(prev => prev - 1);
    };

    const handleSubmit = async () => {
        if (!validateStep(currentStep)) return;

        setIsSubmitting(true);
        try {
            await apiService.saveUser(userData);
            alert('User data saved successfully!');
            // Reset form
            setUserData({
                email: '',
                password: '',
                aboutMe: '',
                street: '',
                city: '',
                state: '',
                zip: '',
                birthdate: ''
            });

            setCurrentStep(1);
        } catch (error) {
            console.error('Failed to save user:', error);
            alert('Failed to save user data. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="space-y-6">
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome!</h2>
                            <p className="text-gray-600">Let's start by creating your account</p>
                        </div>

                        <div className="space-y-4">
                            <Input
                                label="Email"
                                type="email"
                                placeholder="Enter your email"
                                value={userData.email}
                                onChange={(value) => setUserData(prev => ({ ...prev, email: value }))}
                                required
                                error={errors.email}
                            />

                            <Input
                                label="Password"
                                type="password"
                                placeholder="Enter your password"
                                value={userData.password}
                                onChange={(value) => setUserData(prev => ({ ...prev, password: value }))}
                                required
                                error={errors.password}
                            />
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div className="space-y-6">
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Tell us about yourself</h2>
                            <p className="text-gray-600">Help us personalize your experience</p>
                        </div>

                        <div className="space-y-4">
                            {config?.page2Components?.includes('aboutMe') && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        About Me
                                    </label>
                                    <textarea
                                        value={userData.aboutMe}
                                        onChange={(e) => setUserData(prev => ({ ...prev, aboutMe: e.target.value }))}
                                        placeholder="Tell us about yourself..."
                                        rows={4}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            )}

                            {config?.page2Components?.includes('address') && (
                                <>
                                    <Input
                                        label="Street"
                                        placeholder="Enter your street"
                                        value={userData.street}
                                        onChange={(value) => setUserData(prev => ({ ...prev, street: value }))}
                                    />
                                    <Input
                                        label="City"
                                        placeholder="Enter your city"
                                        value={userData.city}
                                        onChange={(value) => setUserData(prev => ({ ...prev, city: value }))}
                                    />
                                    <Input
                                        label="State"
                                        placeholder="Enter your state"
                                        value={userData.state}
                                        onChange={(value) => setUserData(prev => ({ ...prev, state: value }))}
                                    />
                                    <Input
                                        label="ZIP Code"
                                        placeholder="Enter your ZIP"
                                        value={userData.zip}
                                        onChange={(value) => setUserData(prev => ({ ...prev, zip: value }))}
                                    />
                                </>
                            )}


                            {config?.page2Components?.includes('birthdate') && (
                                <Input
                                    label="Birthdate"
                                    type="date"
                                    value={userData.birthdate}
                                    onChange={(value) => setUserData(prev => ({ ...prev, birthdate: value }))}
                                />
                            )}
                        </div>
                    </div>
                );

            case 3:
                return (
                    <div className="space-y-6">
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Final step</h2>
                            <p className="text-gray-600">Complete your profile</p>
                        </div>

                        <div className="space-y-4">
                            {config?.page3Components?.includes('aboutMe') && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        About Me
                                    </label>
                                    <textarea
                                        value={userData.aboutMe}
                                        onChange={(e) => setUserData(prev => ({ ...prev, aboutMe: e.target.value }))}
                                        placeholder="Tell us about yourself..."
                                        rows={4}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            )}

                            {config?.page3Components?.includes('address') && (
                                <>
                                    <Input
                                        label="Street"
                                        placeholder="Enter your street"
                                        value={userData.street}
                                        onChange={(value) => setUserData(prev => ({ ...prev, street: value }))}
                                    />
                                    <Input
                                        label="City"
                                        placeholder="Enter your city"
                                        value={userData.city}
                                        onChange={(value) => setUserData(prev => ({ ...prev, city: value }))}
                                    />
                                    <Input
                                        label="State"
                                        placeholder="Enter your state"
                                        value={userData.state}
                                        onChange={(value) => setUserData(prev => ({ ...prev, state: value }))}
                                    />
                                    <Input
                                        label="ZIP Code"
                                        placeholder="Enter your ZIP"
                                        value={userData.zip}
                                        onChange={(value) => setUserData(prev => ({ ...prev, zip: value }))}
                                    />
                                </>
                            )}

                            {config?.page3Components?.includes('birthdate') && (
                                <Input
                                    label="Birthdate"
                                    type="date"
                                    value={userData.birthdate}
                                    onChange={(value) => setUserData(prev => ({ ...prev, birthdate: value }))}
                                />
                            )}
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    const totalSteps = 3;

    return (
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Progress Bar */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Step {currentStep} of {totalSteps}</span>
                    <span className="text-sm text-gray-500">{Math.round((currentStep / totalSteps) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                    />
                </div>
            </div>

            {/* Step Content */}
            <Card className="mb-8">
                {renderStepContent()}
            </Card>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
                <Button
                    variant="outline"
                    onClick={handleBack}
                    disabled={currentStep === 1}
                    className="flex items-center space-x-2"
                >
                    <ChevronLeft className="h-4 w-4" />
                    <span>Back</span>
                </Button>

                {currentStep < totalSteps ? (
                    <Button
                        onClick={handleNext}
                        className="flex items-center space-x-2"
                    >
                        <span>Next</span>
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                ) : (
                    <Button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="flex items-center space-x-2"
                    >
                        {isSubmitting ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                                <span>Saving...</span>
                            </>
                        ) : (
                            <>
                                <CheckCircle className="h-4 w-4" />
                                <span>Complete</span>
                            </>
                        )}
                    </Button>
                )}
            </div>
        </div>
    );
};

export default OnboardingWizard;