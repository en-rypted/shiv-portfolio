import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useAlert } from '../../context/AlertContext';
import { FaUpload, FaTimes } from 'react-icons/fa';

export const AboutForm = ({ onClose, onSuccess }) => {
    const { showAlert } = useAlert();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [aboutId, setAboutId] = useState('');
    const [formData, setFormData] = useState({
        profile: { url: '', public_id: '' },
        resume: { url: '', public_id: '' },
        description: ''
    });

    useEffect(() => {
        const fetchAbout = async () => {
            try {
                const data = await getDocs(collection(db, 'about'));
                if (data.docs.length > 0) {
                    setAboutId(data.docs[0].id);
                    setFormData(data.docs[0].data());
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchAbout();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const uploadImage = async (file, customPublicId = null) => {
        const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
        const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

        if (!cloudName || !uploadPreset) {
            showAlert('Cloudinary credentials not configured in .env file', 'error');
            return null;
        }

        setUploading(true);
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', uploadPreset);
        data.append('folder', 'shiv-portfolio/about'); // Keep default folder
        data.append('cloud_name', cloudName);

        if (customPublicId) {
            data.append('public_id', customPublicId);
        }

        try {
            // Using 'image/upload' which handles PDFs as images/documents and is safer for standard presets
            const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                method: 'POST',
                body: data
            });
            const result = await res.json();
            setUploading(false);
            if (result.error) {
                console.error(result.error);
                throw new Error(result.error.message);
            }
            return { url: result.secure_url, public_id: result.public_id };
        } catch (error) {
            console.error(error);
            setUploading(false);
            showAlert('Upload failed: ' + error.message, 'error');
            return null;
        }
    };



    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const { url, public_id } = await uploadImage(file);
        if (url) {
            setFormData(prev => ({ ...prev, profile: { url, public_id } }));
            showAlert('Profile image uploaded successfully!', 'success');
        }
    };

    const handleResumeUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Force the public_id to be 'resume' so it overwrites or keeps a consistent name
        const { url, public_id } = await uploadImage(file);
        if (url) {
            setFormData(prev => ({ ...prev, resume: { url, public_id } }));
            showAlert('Resume uploaded successfully!', 'success');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (aboutId) {
                const docRef = doc(db, 'about', aboutId);
                await updateDoc(docRef, formData);
                showAlert('About section updated successfully!', 'success');
            } else {
                showAlert('No about document found', 'error');
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
                    <h2 className="text-xl font-bold text-primary font-mono">Edit About Section</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white">
                        <FaTimes />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-mono text-slate-300 mb-2">Profile Image</label>
                        {formData.profile.url && (
                            <div className="mb-2">
                                <img src={formData.profile.url} alt="Profile" className="h-32 w-32 rounded-full border border-primary/20" />
                            </div>
                        )}
                        <div className="flex gap-2">
                            <input
                                type="text"
                                name="profile"
                                value={formData.profile.url}
                                onChange={handleChange}
                                placeholder="Image URL or upload below"
                                className="flex-1 bg-navy border border-primary/30 rounded px-3 py-2 text-slate-300 focus:border-primary outline-none text-sm"
                            />
                            <label className="px-4 py-2 bg-primary/20 border border-primary text-primary rounded cursor-pointer hover:bg-primary/30 flex items-center gap-2">
                                <FaUpload />
                                Upload
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                    disabled={uploading}
                                />
                            </label>
                        </div>
                        {uploading && <p className="text-xs text-primary mt-1">Uploading...</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-mono text-slate-300 mb-2">Resume (PDF)</label>
                        <div className="flex gap-2 items-center">
                            <div className="flex-1 bg-navy border border-primary/30 rounded px-3 py-2 text-slate-300 text-sm truncate">
                                {formData.resume?.url ? (
                                    <a href={formData.resume.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                        {formData.resume.url}
                                    </a>
                                ) : (
                                    <span className="text-slate-500">No resume uploaded</span>
                                )}
                            </div>
                            <label className="px-4 py-2 bg-primary/20 border border-primary text-primary rounded cursor-pointer hover:bg-primary/30 flex items-center gap-2">
                                <FaUpload />
                                Upload PDF
                                <input
                                    type="file"
                                    accept="application/pdf"
                                    onChange={handleResumeUpload}
                                    className="hidden"
                                    disabled={uploading}
                                />
                            </label>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-mono text-slate-300 mb-2">Description *</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            rows={10}
                            className="w-full bg-navy border border-primary/30 rounded px-3 py-2 text-slate-300 focus:border-primary outline-none resize-none"
                        />
                    </div>

                    <div className="flex gap-2 pt-4">
                        <button
                            type="submit"
                            disabled={loading || uploading}
                            className="flex-1 bg-primary text-navy font-bold py-3 rounded hover:bg-primary/80 disabled:opacity-50"
                        >
                            {loading ? 'Saving...' : 'Update About'}
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
