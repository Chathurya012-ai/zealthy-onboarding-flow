import React, { useEffect, useState } from 'react';
import { apiService, type ConfigResponse, type UserData } from '../Services/api';

const OnboardingWizard: React.FC = () => {
    const [step, setStep] = useState(1);
    const [config, setConfig] = useState<ConfigResponse>({
        page1Components: [],
        page2Components: [],
    });

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

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const data = await apiService.getConfig();
                setConfig(data);
            } catch (err) {
                console.error('Failed to load config', err);
            }
        };
        fetchConfig();
    }, []);

    const validate = () => {
        const e: Record<string, string> = {};
        if (step === 1) {
            if (!userData.email) e.email = 'Email is required';
            else if (!/\S+@\S+\.\S+/.test(userData.email)) e.email = 'Invalid email';
            if (!userData.password) e.password = 'Password is required';
        }
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setUserData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleNext = () => validate() && setStep(s => s + 1);
    const handleBack = () => setStep(s => s - 1);

    const handleSubmit = async () => {
        if (!validate()) return;
        setSubmitting(true);
        try {
            await apiService.saveUser(userData);
            alert('✅ Submitted successfully!');
            setUserData({
                email: '',
                password: '',
                aboutMe: '',
                street: '',
                city: '',
                state: '',
                zip: '',
                birthdate: '',
            });
            setStep(1);
        } catch (err) {
            console.error('Submit failed:', err);
            alert('❌ Failed to submit. Try again.');
        } finally {
            setSubmitting(false);
        }
    };

    const renderFields = (components: string[]) => (
        <div className="space-y-4 mt-4">
            {components.includes('aboutMe') && (
                <textarea
                    name="aboutMe"
                    value={userData.aboutMe}
                    onChange={handleChange}
                    placeholder="Tell us about yourself..."
                    rows={4}
                    className="w-full border p-2 rounded"
                />
            )}
            {components.includes('address') && (
                <input
                    name="street"
                    value={userData.street}
                    onChange={handleChange}
                    placeholder="Street"
                    className="w-full border p-2 rounded"
                />
            )}
            {components.includes('birthdate') && (
                <input
                    type="date"
                    name="birthdate"
                    value={userData.birthdate}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />
            )}
        </div>
    );

    return (
        <div className="max-w-xl mx-auto bg-white p-6 mt-10 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-center mb-6">Step {step} of 3</h2>

            {step === 1 && (
                <div className="space-y-4">
                    <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="w-full border p-2 rounded"
                    />
                    {errors.email && <p className="text-red-500">{errors.email}</p>}

                    <input
                        type="password"
                        name="password"
                        value={userData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        className="w-full border p-2 rounded"
                    />
                    {errors.password && <p className="text-red-500">{errors.password}</p>}
                </div>
            )}

            {step === 2 && renderFields(config.page1Components)}
            {step === 3 && renderFields(config.page2Components)}

            <div className="flex justify-between mt-6">
                {step > 1 && (
                    <button onClick={handleBack} className="px-4 py-2 bg-gray-300 rounded">
                        Back
                    </button>
                )}
                {step < 3 ? (
                    <button
                        onClick={handleNext}
                        className="px-4 py-2 bg-blue-600 text-white rounded"
                    >
                        Next
                    </button>
                ) : (
                    <button
                        onClick={handleSubmit}
                        disabled={submitting}
                        className="px-4 py-2 bg-green-600 text-white rounded"
                    >
                        {submitting ? 'Saving…' : 'Submit'}
                    </button>
                )}
            </div>
        </div>
    );
};

export default OnboardingWizard;
