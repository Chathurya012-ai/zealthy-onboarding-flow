import React, { useState, useEffect } from 'react';
import { Settings, Save } from 'lucide-react';
import { apiService, ConfigResponse } from '../Services/api';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const AdminPanel: React.FC = () => {
    const [config, setConfig] = useState<ConfigResponse>({
        page2Components: [],
        page3Components: []
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    const availableComponents = [
        { id: 'aboutMe', label: 'About Me (Textarea)' },
        { id: 'address', label: 'Address' },
        { id: 'birthdate', label: 'Birthdate' }
    ];

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const configData = await apiService.getConfig();
                setConfig(configData);
            } catch (error) {
                console.error('Failed to fetch config:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchConfig();
    }, []);

    const handleComponentToggle = (page: 'page2Components' | 'page3Components', componentId: string) => {
        setConfig(prev => ({
            ...prev,
            [page]: prev[page].includes(componentId)
                ? prev[page].filter(id => id !== componentId)
                : [...prev[page], componentId]
        }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await apiService.updateConfig(config);
            alert('Configuration saved successfully!');
        } catch (error) {
            console.error('Failed to save config:', error);
            alert('Failed to save configuration. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-2 text-gray-600">Loading configuration...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
                <div className="flex items-center space-x-3 mb-4">
                    <Settings className="h-8 w-8 text-blue-600" />
                    <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
                </div>
                <p className="text-gray-600">Configure which components appear on each onboarding step</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Page 2 Configuration */}
                <Card title="Step 2 Components">
                    <div className="space-y-4">
                        <p className="text-sm text-gray-600 mb-4">
                            Select which components should appear on onboarding step 2
                        </p>

                        {availableComponents.map(component => (
                            <div key={component.id} className="flex items-center">
                                <input
                                    id={`page2-${component.id}`}
                                    type="checkbox"
                                    checked={config.page2Components.includes(component.id)}
                                    onChange={() => handleComponentToggle('page2Components', component.id)}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label
                                    htmlFor={`page2-${component.id}`}
                                    className="ml-2 block text-sm text-gray-900"
                                >
                                    {component.label}
                                </label>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Page 3 Configuration */}
                <Card title="Step 3 Components">
                    <div className="space-y-4">
                        <p className="text-sm text-gray-600 mb-4">
                            Select which components should appear on onboarding step 3
                        </p>

                        {availableComponents.map(component => (
                            <div key={component.id} className="flex items-center">
                                <input
                                    id={`page3-${component.id}`}
                                    type="checkbox"
                                    checked={config.page3Components.includes(component.id)}
                                    onChange={() => handleComponentToggle('page3Components', component.id)}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label
                                    htmlFor={`page3-${component.id}`}
                                    className="ml-2 block text-sm text-gray-900"
                                >
                                    {component.label}
                                </label>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Preview Section */}
            <Card title="Configuration Preview" className="mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                        <h4 className="font-medium text-gray-900 mb-2">Step 2 will show:</h4>
                        {config.page2Components.length > 0 ? (
                            <ul className="space-y-1">
                                {config.page2Components.map(componentId => (
                                    <li key={componentId} className="text-sm text-gray-600 flex items-center">
                                        <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                                        {availableComponents.find(c => c.id === componentId)?.label}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm text-gray-500 italic">No components selected</p>
                        )}
                    </div>

                    <div>
                        <h4 className="font-medium text-gray-900 mb-2">Step 3 will show:</h4>
                        {config.page3Components.length > 0 ? (
                            <ul className="space-y-1">
                                {config.page3Components.map(componentId => (
                                    <li key={componentId} className="text-sm text-gray-600 flex items-center">
                                        <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                                        {availableComponents.find(c => c.id === componentId)?.label}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm text-gray-500 italic">No components selected</p>
                        )}
                    </div>
                </div>
            </Card>

            {/* Save Button */}
            <div className="mt-8 flex justify-end">
                <Button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center space-x-2"
                >
                    {isSaving ? (
                        <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                            <span>Saving...</span>
                        </>
                    ) : (
                        <>
                            <Save className="h-4 w-4" />
                            <span>Save Configuration</span>
                        </>
                    )}
                </Button>
            </div>
        </div>
    );
};

export default AdminPanel;