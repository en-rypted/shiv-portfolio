import React, { useState, useEffect, useContext } from 'react'
import authContext from '../../context/authContext'
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { db, auth } from '../../config/firebase'
import SignIn from '../SignIn'
import { ProjectForm } from './ProjectForm'
import { ExperienceForm } from './ExperienceForm'
import { SkillForm } from './SkillForm'
import { AboutForm } from './AboutForm'
import { FaEdit, FaTrash, FaPlus, FaSignOutAlt, FaLayerGroup, FaCode, FaBriefcase, FaUser, FaBars, FaTimes } from 'react-icons/fa'
import { signOut } from 'firebase/auth'

export const AdminDashboard = () => {
    const { user } = useContext(authContext);
    const [activeTab, setActiveTab] = useState('projects');
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Show login when not authenticated
    useEffect(() => {
        if (!user) {
            setShowLogin(true);
        } else {
            setShowLogin(false);
        }
    }, [user]);

    // Fetch Data based on active tab
    useEffect(() => {
        if (!user) return;
        if (activeTab === 'about') return; // About is handled differently

        const collectionName = activeTab === 'skills' ? 'skills' : activeTab === 'projects' ? 'projects' : 'experiences';

        const fetchData = async () => {
            setIsLoading(true);
            try {
                const querySnapshot = await getDocs(collection(db, collectionName));
                const items = querySnapshot.docs.map(doc => ({ id: doc.id, data: doc.data() }));
                items.sort((a, b) => (a.data.order || 0) - (b.data.order || 0));
                setData(items);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
            setIsLoading(false);
        };

        fetchData();
    }, [activeTab, user, showForm]);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            try {
                const collectionName = activeTab === 'skills' ? 'skills' : activeTab === 'projects' ? 'projects' : 'experiences';
                await deleteDoc(doc(db, collectionName, id));
                setData(data.filter(item => item.id !== id));
            } catch (error) {
                console.error("Error deleting document: ", error);
                alert("Delete failed!");
            }
        }
    };

    const handleLogout = async () => {
        await signOut(auth);
        window.location.href = '/';
    };

    const handleAdd = () => {
        setSelectedItem(null);
        setShowForm(true);
    };

    const handleEdit = (item) => {
        setSelectedItem(item);
        setShowForm(true);
    };

    const handleFormClose = () => {
        setShowForm(false);
        setSelectedItem(null);
    };

    const handleFormSuccess = () => {
        // Refresh will happen via useEffect dependency on showForm
    };

    // Show login if not authenticated
    if (!user) {
        return (
            <div className="min-h-screen bg-navy flex items-center justify-center">
                {showLogin && <SignIn onClose={() => window.location.href = '/'} />}
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-navy flex flex-col md:flex-row text-slate-300 font-sans relative">
            {/* Mobile Header */}
            <div className="md:hidden p-4 bg-light-navy border-b border-primary/20 flex justify-between items-center sticky top-0 z-40 w-full">
                <h1 className="text-lg font-bold text-primary font-mono">ADMIN_PANEL</h1>
                <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="text-primary text-xl p-2 hover:bg-white/5 rounded transition-colors"
                >
                    <FaBars />
                </button>
            </div>

            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 z-50 w-64 bg-light-navy border-r border-primary/20 flex flex-col 
                transform transition-transform duration-300 ease-in-out
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                md:relative md:translate-x-0 md:static md:inset-auto md:h-screen
            `}>
                <div className="p-6 border-b border-primary/20 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-primary font-mono">ADMIN_PANEL</h1>
                        <p className="text-xs text-slate-500 mt-1">Welcome, {user.email}</p>
                    </div>
                    {/* Close button for mobile */}
                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="md:hidden text-slate-400 hover:text-white transition-colors"
                    >
                        <FaTimes />
                    </button>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    <SidebarItem
                        icon={<FaUser />}
                        label="About"
                        active={activeTab === 'about'}
                        onClick={() => { setActiveTab('about'); setIsSidebarOpen(false); }}
                    />
                    <SidebarItem
                        icon={<FaLayerGroup />}
                        label="Skills"
                        active={activeTab === 'skills'}
                        onClick={() => { setActiveTab('skills'); setIsSidebarOpen(false); }}
                    />
                    <SidebarItem
                        icon={<FaCode />}
                        label="Projects"
                        active={activeTab === 'projects'}
                        onClick={() => { setActiveTab('projects'); setIsSidebarOpen(false); }}
                    />
                    <SidebarItem
                        icon={<FaBriefcase />}
                        label="Experience"
                        active={activeTab === 'experience'}
                        onClick={() => { setActiveTab('experience'); setIsSidebarOpen(false); }}
                    />
                </nav>

                <div className="p-4 border-t border-primary/20">
                    <button onClick={handleLogout} className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors w-full px-4 py-2 rounded hover:bg-red-500/10">
                        <FaSignOutAlt /> Logout
                    </button>
                </div>
            </aside>

            <main className="flex-1 p-4 md:p-8 overflow-y-auto h-[calc(100vh-64px)] md:h-screen">
                <div className="max-w-5xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-bold text-slate-100 font-mono capitalize">
                            $ manage --{activeTab}
                        </h2>
                        <button
                            onClick={handleAdd}
                            className="flex items-center gap-2 bg-primary text-navy px-4 py-2 rounded font-bold hover:bg-primary/80 transition-colors"
                        >
                            <FaPlus /> {activeTab === 'about' ? 'Edit About' : 'Add New'}
                        </button>
                    </div>

                    {activeTab === 'about' ? (
                        <div className="bg-light-navy/30 border border-primary/10 rounded-lg p-6">
                            <p className="text-slate-400 mb-4">Click "Edit About" to update your profile information.</p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4 w-full min-w-0">
                            {isLoading ? (
                                <p className="text-primary font-mono">Loading data...</p>
                            ) : (
                                data.map((item) => (
                                    <div key={item.id} className="bg-light-navy/50 border border-primary/10 p-4 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4 group hover:border-primary/30 transition-all w-full">
                                        <div className="w-full md:w-auto overflow-hidden min-w-0">
                                            <h3 className="font-bold text-lg text-slate-200 truncate">
                                                {item.data.title || item.data.name || item.data.companyName || "Untitled"}
                                            </h3>
                                            <p className="text-sm text-slate-500 font-mono truncate max-w-full md:max-w-md">
                                                {item.data.description || item.data.category || item.data.role || ''}
                                            </p>
                                        </div>
                                        <div className="flex gap-2 w-full md:w-auto justify-end opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => handleEdit(item)}
                                                className="p-2 bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500/40 transition-colors"
                                                title="Edit"
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="p-2 bg-red-500/20 text-red-400 rounded hover:bg-red-500/40 transition-colors"
                                                title="Delete"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                            {data.length === 0 && !isLoading && (
                                <p className="text-slate-500 italic">No items found. Click "Add New" to create one.</p>
                            )}
                        </div>
                    )}
                </div>
            </main>

            {/* Forms */}
            {showForm && activeTab === 'projects' && (
                <ProjectForm
                    project={selectedItem}
                    onClose={handleFormClose}
                    onSuccess={handleFormSuccess}
                />
            )}

            {showForm && activeTab === 'experience' && (
                <ExperienceForm
                    experience={selectedItem}
                    onClose={handleFormClose}
                    onSuccess={handleFormSuccess}
                />
            )}

            {showForm && activeTab === 'skills' && (
                <SkillForm
                    skill={selectedItem}
                    onClose={handleFormClose}
                    onSuccess={handleFormSuccess}
                />
            )}

            {showForm && activeTab === 'about' && (
                <AboutForm
                    onClose={handleFormClose}
                    onSuccess={handleFormSuccess}
                />
            )}
        </div>
    );
};

const SidebarItem = ({ icon, label, active, onClick }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-all ${active ? 'bg-primary/10 text-primary border-r-2 border-primary' : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
            }`}
    >
        {icon}
        <span className="font-mono text-sm">{label}</span>
    </button>
);
