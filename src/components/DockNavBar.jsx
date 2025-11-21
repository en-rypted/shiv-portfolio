import React, { useContext } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
    IoHomeOutline,
    IoPersonOutline,
    IoCodeSlashOutline,
    IoAppsOutline,
    IoBriefcaseOutline,
    IoMailOutline
} from 'react-icons/io5';
import isMobileContext from '../context/isMobileContext';

const DockNavBar = () => {
    const mouseX = useMotionValue(Infinity);
    const isMobile = useContext(isMobileContext);

    const links = [
        { id: 'home', icon: <IoHomeOutline />, label: 'Home' },
        { id: 'about', icon: <IoPersonOutline />, label: 'About' },
        { id: 'skills', icon: <IoCodeSlashOutline />, label: 'Skills' },
        { id: 'projects', icon: <IoAppsOutline />, label: 'Projects' },
        { id: 'experience', icon: <IoBriefcaseOutline />, label: 'Experience' },
        { id: 'contact', icon: <IoMailOutline />, label: 'Contact' },
    ];

    return (
        <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-end ${isMobile ? 'gap-2 px-4 py-2 bottom-4' : 'gap-4 px-6 py-3 bottom-8'} bg-light-navy/40 backdrop-blur-xl border border-lightest-navy/30 rounded-full shadow-2xl`}>
            {links.map((link) => (
                <DockIcon key={link.id} mouseX={mouseX} link={link} isMobile={isMobile} />
            ))}
        </div>
    );
};

const DockIcon = ({ mouseX, link, isMobile }) => {
    const ref = React.useRef(null);

    const distance = useTransform(mouseX, (val) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    const baseWidth = isMobile ? 35 : 40;
    const hoverWidth = isMobile ? 50 : 80;
    const distanceRange = isMobile ? [-100, 0, 100] : [-150, 0, 150];

    const widthSync = useTransform(distance, distanceRange, [baseWidth, hoverWidth, baseWidth]);
    const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <motion.div
            ref={ref}
            style={{ width, height: width }}
            className="aspect-square rounded-full bg-lightest-navy/20 border border-lightest-navy/30 flex items-center justify-center relative group cursor-pointer hover:bg-primary/20 transition-colors"
            onClick={() => scrollToSection(link.id)}
            onMouseMove={(e) => !isMobile && mouseX.set(e.pageX)}
            onMouseLeave={() => !isMobile && mouseX.set(Infinity)}
        >
            <motion.div
                className="text-slate-300 group-hover:text-primary transition-colors"
                style={{ fontSize: useTransform(width, [baseWidth, hoverWidth], isMobile ? [18, 24] : [20, 40]) }}
            >
                {link.icon}
            </motion.div>

            {/* Tooltip - Hide on mobile */}
            {!isMobile && (
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-navy/90 text-primary text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-primary/20">
                    {link.label}
                </div>
            )}
        </motion.div>
    );
};

export default DockNavBar;
