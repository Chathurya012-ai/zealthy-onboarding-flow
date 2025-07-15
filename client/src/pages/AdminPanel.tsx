import React, { useState, useEffect } from 'react';
import { Settings, Save } from 'lucide-react';
import { apiService, type ConfigResponse } from '../Services/api';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

/* ───────────── component ───────────── */
const AdminPanel: React.FC = () => {
    const [config, setConfig] = useState<ConfigResponse>({
        page2Components: [],
        page3Components: [],
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    const available = [
        { id: 'aboutMe', label: 'About Me (Textarea)' },
        { id: 'address', label: 'Address' },
        { id: 'birthdate', label: 'Birthdate' },
    ];

    /* ---------- load config ---------- */
    useEffect(() => {
        async function fetchConfig() {
            try {
                const data = await apiService.getConfig();
                setConfig({
                    page2Components: data.page2Components ?? [],
                    page3Components: data.page3Components ?? [],
                });
            } catch (err) {
                console.error('Failed to fetch config:', err);
            } finally {
                setIsLoading(false);
            }
        }

        fetchConfig(); // <-- call it, don’t return it
    }, []);


    /* ---------- toggle checkbox ---------- */
    const toggle = (
        page: 'page2Components' | 'page3Components',
        id: string
    ) => {
        setConfig((prev) => ({
            ...prev,
            [page]: prev[page].includes(id)
                ? prev[page].filter((x) => x !== id)
                : [...prev[page], id],
        }));
    };

    /* ---------- save ---------- */
    const save = async () => {
        setIsSaving(true);
        try {
            await apiService.updateConfig(config);
            alert('Configuration saved 🎉');
        } catch (err) {
            console.error(err);
            alert('Save failed, try again.');
        } finally {
            setIsSaving(false);
        }
    };

    /* ---------- loading UI ---------- */
    if (isLoading) {
        return (
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
                    <p className="mt-2 text-gray-600">Loading configuration…</p>
                </div>
            </div>
        );
    }

    /* ---------- checkbox list helper ---------- */
    const CheckboxGroup = (page: 'page2Components' | 'page3Components') => (
        <>
            {available.map((c) => (
                <div key={c.id} className="flex items-center">
                    <input
                        id={`${page}-${c.id}`}
                        type="checkbox"
                        checked={(config[page] ?? []).includes(c.id)}
                        onChange={() => toggle(page, c.id)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor={`${page}-${c.id}`} className="ml-2 text-sm">
                        {c.label}
                    </label>
                </div>
            ))}
        </>
    );

    /* ---------- preview helper ---------- */
    const Preview = ({ title, list }: { title: string; list: string[] }) => (
        <div>
            <h4 className="font-medium mb-2">{title}</h4>
            {list.length ? (
                <ul className="space-y-1">
                    {list.map((id) => (
                        <li key={id} className="text-sm flex items-center text-gray-600">
                            <span className="w-2 h-2 bg-blue-600 rounded-full mr-2" />
                            {available.find((c) => c.id === id)?.label ?? id}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-sm italic text-gray-500">No components selected</p>
            )}
        </div>
    );

    /* ---------- JSX ---------- */
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <header className="mb-8">
                <div className="flex items-center space-x-3 mb-4">
                    <Settings className="h-8 w-8 text-blue-600" />
                    <h1 className="text-3xl font-bold">Admin Panel</h1>
                </div>
                <p className="text-gray-600">
                    Configure which components appear on each onboarding step
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card title="Step 2 Components">
                    <p className="text-sm mb-4">
                        Select which components should appear on onboarding step 2
                    </p>
                    {CheckboxGroup('page2Components')}
                </Card>

                <Card title="Step 3 Components">
                    <p className="text-sm mb-4">
                        Select which components should appear on onboarding step 3
                    </p>
                    {CheckboxGroup('page3Components')}
                </Card>
            </div>

            <Card title="Configuration Preview" className="mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Preview title="Step 2 will show:" list={config.page2Components} />
                    <Preview title="Step 3 will show:" list={config.page3Components} />
                </div>
            </Card>

            <div className="mt-8 flex justify-end">
                <Button onClick={save} disabled={isSaving} className="flex items-center space-x-2">
                    {isSaving ? (
                        <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                            <span>Saving…</span>
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
