import React, { useState, useRef, useEffect } from 'react';
import './ServiceSection.css';

// --- Icons (Keep your existing icon components here) ---
const ShieldIcon = () => (<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>);
const ExchangeIcon = () => (<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 4v6h-6"></path><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>);
const SupportIcon = () => (<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>);
const GuaranteeIcon = () => (<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path></svg>);
const DocumentIcon = () => (<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><path d="M9 15l2 2 4-4"></path></svg>);
const ChecklistIcon = () => (<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"></path><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>);
const CableIcon = () => (<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M11 7l9 10"></path><path d="M5 7l9 10"></path></svg>);
const TruckIcon = () => (<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>);
const HeadsetIcon = () => (<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>);
const DesktopIcon = () => (<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>);
const ToolsIcon = () => (<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>);
const BadgeIcon = () => (<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>);
const CleaningIcon = () => (<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3L2 13l3 3 8-8-1-1"></path><path d="M14 15l7 7-3-3"></path><path d="M14 11l3-3 4 4-3 3"></path><path d="M8 17l3 3"></path></svg>);

const ServiceSection = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Use a ref to get the exact height of the hidden content for smooth animation
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState('0px');

  const allServices = [
    { icon: <ShieldIcon />, title: ["Lifetime", "Free Labor Charges"] },
    { icon: <ExchangeIcon />, title: ["90 days", "One to One Exchange"] },
    { icon: <SupportIcon />, title: ["Free On-Site", "within Penang"] },
    { icon: <GuaranteeIcon />, title: ["Full Years", "Warranty Covered"] },
    { icon: <DocumentIcon />, title: ["Free Warranty", "Pick-up"] },
    { icon: <ChecklistIcon />, title: ["Professional", "Performance Test"] },
    { icon: <CableIcon />, title: ["Professional", "Cable Management"] },
    { icon: <TruckIcon />, title: ["Lifetime", "Technical Support"] },
    { icon: <HeadsetIcon />, title: ["Free", "Assembly & Installation"] },
    { icon: <DesktopIcon />, title: ["Delivery to", "Whole Malaysia"] },
    { icon: <ToolsIcon />, title: ["Latest Firmwares", "& Drivers"] },
    { icon: <BadgeIcon />, title: ["All Name", "Brand Components"] },
    { icon: <CleaningIcon />, title: ["Lifetime", "Free Dust Cleaning"], isLast: true }
  ];

  // Split into fixed (top) and expandable (bottom) lists
  const initialServices = allServices.slice(0, 8);
  const expandableServices = allServices.slice(8);

  // Update height calculation for the animation
  useEffect(() => {
    if (isExpanded) {
      // Calculate the scroll height of the inner content
      setContentHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setContentHeight('0px');
    }
  }, [isExpanded]);

  return (
    <section className="service-container">
      <div className="service-header">
        <h2>We Care for You</h2>
        <p>
          By securing lifetime of Free After Sale Services ready on-call to ensure your
          convenience is steady from the start.
        </p>
      </div>

      {/* Grid 1: Always Visible (Static) */}
      <div className="service-grid">
        {initialServices.map((service, index) => (
          <div key={index} className="service-item">
            <div className="icon-box">{service.icon}</div>
            <div className="service-text">
              {service.title.map((line, i) => <span key={i}>{line}</span>)}
            </div>
          </div>
        ))}
      </div>

      {/* Animation Wrapper for Extra Items */}
      <div 
        className="expandable-wrapper" 
        style={{ height: contentHeight }}
      >
        <div ref={contentRef} className="expandable-content">
          {/* Grid 2: Hidden items (matches columns of Grid 1) */}
          <div className="service-grid" style={{ marginBottom: 0 }}>
            {expandableServices.map((service, index) => (
              <div 
                key={index} 
                className={`service-item ${service.isLast ? 'service-item-centered' : ''}`}
              >
                <div className="icon-box">{service.icon}</div>
                <div className="service-text">
                  {service.title.map((line, i) => <span key={i}>{line}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="service-footer">
        <button onClick={() => setIsExpanded(!isExpanded)} className="see-more-btn">
          {isExpanded ? "See Less" : "See More"}
        </button>
      </div>
    </section>
  );
};

export default ServiceSection;