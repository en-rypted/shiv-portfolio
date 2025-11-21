import React, { useState, useEffect } from 'react';
import { FaCloudUploadAlt, FaCopy, FaCheck } from 'react-icons/fa';

export const ImageUpload = () => {
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [cloudName, setCloudName] = useState("");
    const [uploadPreset, setUploadPreset] = useState("");
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const savedCloudName = localStorage.getItem("cloudinary_cloud_name");
        const savedPreset = localStorage.getItem("cloudinary_upload_preset");
        if (savedCloudName) setCloudName(savedCloudName);
        if (savedPreset) setUploadPreset(savedPreset);
    }, []);

    const handleSaveCredentials = () => {
        localStorage.setItem("cloudinary_cloud_name", cloudName);
        localStorage.setItem("cloudinary_upload_preset", uploadPreset);
        alert("Credentials Saved!");
    };

    const uploadImage = async () => {
        if (!image || !cloudName || !uploadPreset) {
            alert("Please select an image and ensure credentials are set.");
            return;
        }

        // Sanitize filename - remove problematic characters
        const sanitizeFilename = (name) => {
            return name
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
                .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
                .substring(0, 50); // Limit length
        };

        const baseName = sanitizeFilename(image.name.split('.')[0]);

        setLoading(true);
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", uploadPreset);
        data.append("cloud_name", cloudName);
        data.append("folder", "shiv-portfolio/general"); // Default folder
        data.append("public_id", baseName); // Use sanitized filename

        try {
            const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                method: "POST",
                body: data
            });
            const file = await res.json();
            setUrl(file.secure_url);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
            alert("Upload Failed!");
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-navy/50 p-6 rounded-xl border border-primary/20">
            <h3 className="text-xl font-mono text-primary mb-4 border-b border-primary/20 pb-2">
                $ upload --media
            </h3>

            {/* Credentials Section */}
            <div className="mb-6 space-y-3 bg-black/20 p-4 rounded-lg">
                <h4 className="text-sm text-slate-400 font-mono mb-2">// Cloudinary Config</h4>
                <input
                    type="text"
                    placeholder="Cloud Name"
                    value={cloudName}
                    onChange={(e) => setCloudName(e.target.value)}
                    className="w-full bg-navy border border-primary/30 rounded px-3 py-2 text-slate-300 focus:border-primary outline-none font-mono text-sm"
                />
                <input
                    type="text"
                    placeholder="Upload Preset (Unsigned)"
                    value={uploadPreset}
                    onChange={(e) => setUploadPreset(e.target.value)}
                    className="w-full bg-navy border border-primary/30 rounded px-3 py-2 text-slate-300 focus:border-primary outline-none font-mono text-sm"
                />
                <button
                    onClick={handleSaveCredentials}
                    className="text-xs text-primary hover:text-white underline font-mono"
                >
                    [ Save Config ]
                </button>
            </div>

            {/* Upload Section */}
            <div className="space-y-4">
                <div className="border-2 border-dashed border-primary/30 rounded-lg p-8 text-center hover:border-primary/60 transition-colors relative">
                    <input
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <FaCloudUploadAlt className="w-12 h-12 text-primary/50 mx-auto mb-2" />
                    <p className="text-slate-400 font-mono text-sm">
                        {image ? image.name : "Drop image here or click to select"}
                    </p>
                </div>

                <button
                    onClick={uploadImage}
                    disabled={loading || !image}
                    className={`w-full py-2 rounded font-mono font-bold transition-all ${loading || !image
                        ? "bg-slate-700 text-slate-500 cursor-not-allowed"
                        : "bg-primary text-navy hover:bg-primary/80"
                        }`}
                >
                    {loading ? "UPLOADING..." : "[ UPLOAD NOW ]"}
                </button>

                {/* Result Section */}
                {url && (
                    <div className="mt-4 bg-black/30 p-3 rounded border border-green-500/30">
                        <p className="text-xs text-green-400 font-mono mb-1">Upload Successful!</p>
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value={url}
                                readOnly
                                className="flex-1 bg-transparent text-slate-300 text-xs font-mono outline-none"
                            />
                            <button
                                onClick={copyToClipboard}
                                className="text-primary hover:text-white transition-colors"
                                title="Copy URL"
                            >
                                {copied ? <FaCheck /> : <FaCopy />}
                            </button>
                        </div>
                        <div className="mt-2 h-20 w-20 rounded overflow-hidden border border-primary/20">
                            <img src={url} alt="Uploaded" className="w-full h-full object-cover" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
