import React, { useState, useEffect } from 'react';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useAlert } from '../../context/AlertContext';
import { FaTimes } from 'react-icons/fa';

export const ExperienceForm = ({ experience, onClose, onSuccess }) => {
    const { showAlert } = useAlert();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        companyName: '',
        role: '',
        duration: '',
        desc: '',
        order: 0
    });

    useEffect(() => {
        if (experience) {
            setFormData(experience.data);
        }
    }, [experience]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'order' ? parseInt(value) || 0 : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (experience) {
                const docRef = doc(db, 'experiences', experience.id);
                await updateDoc(docRef, formData);
                showAlert('Experience updated successfully!', 'success');
            } else {
                await addDoc(collection(db, 'experiences'), formData);
                showAlert('Experience added successfully!', 'success');
            }
            setLoading(false);
            onSuccess();
            onClose();
        } catch (error) {
            console.error(error);
            setLoading(false);
            showAlert('Error: ' + error.message, 'error');
        }
    };

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 p-4">
            <div className="bg-light-navy border border-primary/30 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-lightest-navy border-b border-primary/20 p-4 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-primary font-mono">
                        {experience ? 'Edit Experience' : 'Add New Experience'}
                    </h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white">
                        <FaTimes />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-mono text-slate-300 mb-2">Company Name *</label>
                        <input
                            type="text"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleChange}
                            required
                            className="w-full bg-navy border border-primary/30 rounded px-3 py-2 text-slate-300 focus:border-primary outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-mono text-slate-300 mb-2">Role *</label>
                        <input
                            type="text"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            required
                            className="w-full bg-navy border border-primary/30 rounded px-3 py-2 text-slate-300 focus:border-primary outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-mono text-slate-300 mb-2">Duration *</label>
                        <input
                            type="text"
                            name="duration"
                            value={formData.duration}
                            onChange={handleChange}
                            required
                            placeholder="e.g., 2022 - Present"
                            className="w-full bg-navy border border-primary/30 rounded px-3 py-2 text-slate-300 focus:border-primary outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-mono text-slate-300 mb-2">Description *</label>
                        <textarea
                            name="desc"
                            value={formData.desc}
                            onChange={handleChange}
                            required
                            rows={6}
                            className="w-full bg-navy border border-primary/30 rounded px-3 py-2 text-slate-300 focus:border-primary outline-none resize-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-mono text-slate-300 mb-2">Display Order</label>
                        <input
                            type="number"
                            name="order"
                            value={formData.order}
                            onChange={handleChange}
                            className="w-full bg-navy border border-primary/30 rounded px-3 py-2 text-slate-300 focus:border-primary outline-none"
                        />
                    </div>

                    <div className="flex gap-2 pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 bg-primary text-navy font-bold py-3 rounded hover:bg-primary/80 disabled:opacity-50"
                        >
                            {loading ? 'Saving...' : experience ? 'Update Experience' : 'Add Experience'}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 bg-slate-700 text-slate-300 font-bold py-3 rounded hover:bg-slate-600"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
