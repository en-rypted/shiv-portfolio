import React, { useState, useEffect } from 'react';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useAlert } from '../../context/AlertContext';
import { FaUpload, FaTimes } from 'react-icons/fa';

export const ProjectForm = ({ project, onClose, onSuccess }) => {
    const { showAlert } = useAlert();
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null); // Store file temporarily
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: '',
        link: '',
        order: 0
    });

    useEffect(() => {
        if (project) {
            setFormData(project.data);
        }
    }, [project]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'order' ? parseInt(value) || 0 : value
        }));
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            // Show preview using local URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, image: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const uploadImage = async (file, projectTitle) => {
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

        const baseName = sanitizeFilename(projectTitle);

        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', uploadPreset);
        data.append('cloud_name', cloudName);
        data.append('folder', 'shiv-portfolio/projects'); // Organize in projects folder
        data.append('public_id', baseName); // Use sanitized project name

        try {
            const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                method: 'POST',
                body: data
            });
            const result = await res.json();
            return result.secure_url;
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
                const uploadedUrl = await uploadImage(selectedFile, formData.title || 'untitled');
                if (uploadedUrl) {
                    finalImageUrl = uploadedUrl;
                } else {
                    setLoading(false);
                    return; // Stop if upload failed
                }
            }

            // Prepare final data
            const finalData = { ...formData, image: finalImageUrl };

            if (project) {
                // Update existing
                const docRef = doc(db, 'projects', project.id);
                await updateDoc(docRef, finalData);
                showAlert('Project updated successfully!', 'success');
            } else {
                // Add new
                await addDoc(collection(db, 'projects'), finalData);
                showAlert('Project added successfully!', 'success');
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
                        {project ? 'Edit Project' : 'Add New Project'}
                    </h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white">
                        <FaTimes />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-mono text-slate-300 mb-2">Title *</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full bg-navy border border-primary/30 rounded px-3 py-2 text-slate-300 focus:border-primary outline-none"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-mono text-slate-300 mb-2">Description *</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            rows={4}
                            className="w-full bg-navy border border-primary/30 rounded px-3 py-2 text-slate-300 focus:border-primary outline-none resize-none"
                        />
                    </div>

                    {/* Link */}
                    <div>
                        <label className="block text-sm font-mono text-slate-300 mb-2">Project Link *</label>
                        <input
                            type="url"
                            name="link"
                            value={formData.link}
                            onChange={handleChange}
                            required
                            className="w-full bg-navy border border-primary/30 rounded px-3 py-2 text-slate-300 focus:border-primary outline-none"
                        />
                    </div>

                    {/* Order */}
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

                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-mono text-slate-300 mb-2">Project Image</label>
                        {formData.image && (
                            <div className="mb-2">
                                <img src={formData.image} alt="Preview" className="h-32 w-auto rounded border border-primary/20" />
                            </div>
                        )}
                        <div className="flex gap-2">
                            <input
                                type="text"
                                name="image"
                                value={selectedFile ? selectedFile.name : formData.image}
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
                                ✓ Will upload to: shiv-portfolio/projects/{formData.title ? formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') : 'untitled'}
                            </p>
                        )}
                    </div>

                    {/* Submit */}
                    <div className="flex gap-2 pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 bg-primary text-navy font-bold py-3 rounded hover:bg-primary/80 disabled:opacity-50"
                        >
                            {loading ? 'Saving...' : project ? 'Update Project' : 'Add Project'}
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
