import React, { useState } from 'react'
import { Navbar } from './Navbar'
import DockNavBar from './DockNavBar'
import SignIn from './SignIn'
import UnifiedChatBot from './UnifiedChatBot'
import Console from './Console'
import { About } from './About'
import { Projects } from './Projects'
import { Skills } from './Skills'
import { Experience } from './Experience'
import { ContactUs } from './ContactUs'

export const Home = () => {
    const [showLogin, setShowLogin] = useState(false)

    return (
        <div className="min-h-screen bg-navy text-secondary selection:bg-primary selection:text-navy">
            {showLogin && <SignIn onClose={() => { setShowLogin(false) }}></SignIn>}

            <Navbar />

            <main className="relative z-10">
                <section id="home">
                    <Console />
                </section>

                <section id="about" className="py-20 px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto">
                    <About />
                </section>

                <section id="skills" className="py-20 px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto">
                    <Skills />
                </section>

                <section id="projects" className="py-20 px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto">
                    <Projects />
                </section>

                <section id="experience" className="py-20 px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto">
                    <Experience />
                </section>

                <section id="contact" className="py-20 px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto">
                    <ContactUs />
                </section>
            </main>

            <DockNavBar />

            <UnifiedChatBot />

            {/* Admin Login Trigger (Hidden) */}
            <div className="fixed top-0 left-0 w-4 h-4 z-[9999]" onDoubleClick={() => { setShowLogin(true) }}></div>
        </div>
    )
}
