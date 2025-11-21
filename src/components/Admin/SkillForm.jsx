import React, { useState, useEffect } from 'react';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useAlert } from '../../context/AlertContext';
import { FaUpload, FaTimes } from 'react-icons/fa';

export const SkillForm = ({ skill, onClose, onSuccess }) => {
    const { showAlert } = useAlert();
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null); // Store file temporarily
    const [formData, setFormData] = useState({
        name: '',
        level: 0,
        category: 'core',
        x: 50,
        y: 50,
        size: 'medium',
        color: '#34d399',
        image: { url: '', public_id: '' }
    });

    useEffect(() => {
        if (skill) {
            setFormData(skill.data);
        }
    }, [skill]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: ['level', 'x', 'y'].includes(name) ? parseInt(value) || 0 : value
        }));
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            // Show preview using local URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, image: { url: reader.result, public_id: '' } }));
            };
            reader.readAsDataURL(file);
        }
    };

    const uploadImage = async (file, skillName) => {
        const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
        const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

        if (!cloudName || !uploadPreset) {
            showAlert('Cloudinary credentials not configured in .env file', 'error');
            return null;
        }

        // Sanitize filename - remove problematic characters
        const sanitizeFilename = (name) => {
            return name
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
                .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
                .substring(0, 50); // Limit length
        };

        const baseName = sanitizeFilename(skillName);

        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', uploadPreset);
        data.append('cloud_name', cloudName);
        data.append('folder', 'shiv-portfolio/skills'); // Organize in skills folder
        data.append('public_id', baseName); // Use sanitized skill name

        try {
            const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                method: 'POST',
                body: data
            });
            const result = await res.json();
            return { url: result.secure_url, public_id: result.public_id };
        } catch (error) {
            console.error(error);
            showAlert('Image upload failed', 'error');
            return null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let finalImageUrl = formData.image;

            // Upload image if a new file was selected
            if (selectedFile) {
                showAlert('Uploading image...', 'info');
                const { url, public_id } = await uploadImage(selectedFile, formData.name);
                if (url) {
                    finalImageUrl = { url, public_id };
                } else {
                    setLoading(false);
                    return; // Stop if upload failed
                }
            }

            // Prepare final data
            const finalData = { ...formData, image: finalImageUrl };

            if (skill) {
                const docRef = doc(db, 'skills', skill.id);
                await updateDoc(docRef, finalData);
                showAlert('Skill updated successfully!', 'success');
            } else {
                await addDoc(collection(db, 'skills'), finalData);
                showAlert('Skill added successfully!', 'success');
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
                        {skill ? 'Edit Skill' : 'Add New Skill'}
                    </h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white">
                        <FaTimes />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-mono text-slate-300 mb-2">Skill Name *</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full bg-navy border border-primary/30 rounded px-3 py-2 text-slate-300 focus:border-primary outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-mono text-slate-300 mb-2">Level (0-100) *</label>
                            <input
                                type="number"
                                name="level"
                                min="0"
                                max="100"
                                value={formData.level}
                                onChange={handleChange}
                                required
                                className="w-full bg-navy border border-primary/30 rounded px-3 py-2 text-slate-300 focus:border-primary outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-mono text-slate-300 mb-2">Category *</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full bg-navy border border-primary/30 rounded px-3 py-2 text-slate-300 focus:border-primary outline-none"
                        >
                            <option value="core">Core</option>
                            <option value="frontend">Frontend</option>
                            <option value="backend">Backend</option>
                            <option value="database">Database</option>
                            <option value="devops">DevOps</option>
                            <option value="tools">Tools</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-mono text-slate-300 mb-2">Color</label>
                        <input
                            type="color"
                            name="color"
                            value={formData.color}
                            onChange={handleChange}
                            className="w-full h-10 bg-navy border border-primary/30 rounded px-1 py-1 cursor-pointer"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-mono text-slate-300 mb-2">Icon/Image (Optional)</label>
                        {formData.image.url && (
                            <div className="mb-2">
                                <img src={formData.image.url} alt="Preview" className="h-16 w-16 rounded border border-primary/20" />
                            </div>
                        )}
                        <div className="flex gap-2">
                            <input
                                type="text"
                                name="image"
                                value={selectedFile ? selectedFile.name : formData.image.url}
                                readOnly={!!selectedFile}
                                onChange={handleChange}
                                placeholder="Image URL or select file below"
                                className="flex-1 bg-navy border border-primary/30 rounded px-3 py-2 text-slate-300 focus:border-primary outline-none text-sm"
                            />
                            <label className="px-4 py-2 bg-primary/20 border border-primary text-primary rounded cursor-pointer hover:bg-primary/30 flex items-center gap-2">
                                <FaUpload />
                                {selectedFile ? 'Change' : 'Select'}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileSelect}
                                    className="hidden"
                                />
                            </label>
                        </div>
                        {selectedFile && (
                            <p className="text-xs text-green-400 mt-1">
                                ✓ Will upload to: shiv-portfolio/skills/{formData.name ? formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') : 'skill'}
                            </p>
                        )}
                    </div>

                    <div className="flex gap-2 pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 bg-primary text-navy font-bold py-3 rounded hover:bg-primary/80 disabled:opacity-50"
                        >
                            {loading ? 'Saving...' : skill ? 'Update Skill' : 'Add Skill'}
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
