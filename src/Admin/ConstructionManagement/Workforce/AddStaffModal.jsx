import { useState } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { FiUsers, FiMonitor } from 'react-icons/fi';
import SiteStaffForm from './SiteStaffForm';
import OfficeStaffForm from './OfficeStaffForm';

const AddStaffModal = ({ onClose, onSuccess, editData }) => {
    const { theme } = useTheme();
    const [step, setStep] = useState(editData ? (editData.type?.toLowerCase() === 'site' ? 'site' : 'office') : 'select');
    const [selection, setSelection] = useState(editData ? editData.type?.toLowerCase() : null);

    const handleSelection = (type) => {
        setSelection(type);
        setStep(type);
    };

    const handleBack = () => {
        setStep('select');
        setSelection(null);
    };

    const handleSubmit = async (data) => {
        try {
            const url = editData ? `http://localhost:5000/api/workers/${editData._id}` : 'http://localhost:5000/api/workers';
            const method = editData ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            if (result.success) {
                onSuccess(result.data);
            } else {
                alert('Error: ' + result.error);
            }
        } catch (error) {
            console.error(error);
            alert('Failed to submit');
        }
    };

    return (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-[100] p-4" style={{ backgroundColor: `${theme.textPrimary}40` }}>
            <div className="bg-white rounded-[2.5rem] shadow-premium w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-300" style={{ backgroundColor: theme.cardBg }}>

                {/* Header is handled inside forms for steps, or common header for select */}
                {step === 'select' && (
                    <>
                        <div className="table-header-premium p-6 text-white relative" style={{ background: theme.gradients.primary }}>
                            <h3 className="text-xl font-black">{editData ? 'Edit Staff' : 'Add New Staff'}</h3>
                            <button onClick={onClose} className="absolute top-6 right-6 text-white text-xl">×</button>
                        </div>
                        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <button
                                onClick={() => handleSelection('site')}
                                className="group p-8 rounded-3xl border-2 transition-all hover:-translate-y-1 hover:shadow-xl text-left"
                                style={{ borderColor: theme.cardBorder, backgroundColor: theme.background }}
                            >
                                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 transition-colors group-hover:bg-blue-500 group-hover:text-white" style={{ backgroundColor: theme.secondary, color: theme.primary }}>
                                    <FiUsers />
                                </div>
                                <h4 className="text-xl font-black mb-2" style={{ color: theme.textPrimary }}>Site Staff</h4>
                                <p className="text-xs font-medium opacity-60" style={{ color: theme.textSecondary }}>Register workers, contractors, and site personnel.</p>
                            </button>

                            <button
                                onClick={() => handleSelection('office')}
                                className="group p-8 rounded-3xl border-2 transition-all hover:-translate-y-1 hover:shadow-xl text-left"
                                style={{ borderColor: theme.cardBorder, backgroundColor: theme.background }}
                            >
                                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 transition-colors group-hover:bg-purple-500 group-hover:text-white" style={{ backgroundColor: theme.secondary, color: theme.primary }}>
                                    <FiMonitor />
                                </div>
                                <h4 className="text-xl font-black mb-2" style={{ color: theme.textPrimary }}>Office Staff</h4>
                                <p className="text-xs font-medium opacity-60" style={{ color: theme.textSecondary }}>Register managers, admins, and office employees.</p>
                            </button>
                        </div>
                    </>
                )}

                {step === 'site' && (
                    <div className="p-8 max-h-[85vh] overflow-y-auto">
                        <SiteStaffForm editData={editData} onBack={handleBack} onSubmit={handleSubmit} />
                    </div>
                )}

                {step === 'office' && (
                    <div className="p-8 max-h-[85vh] overflow-y-auto">
                        <OfficeStaffForm editData={editData} onBack={handleBack} onSubmit={handleSubmit} />
                    </div>
                )}

            </div>
        </div>
    );
};

export default AddStaffModal;
