import React from 'react';
import './ExperienceSection.css';

const ExperienceSection = () => {
  
  const stats = [
    {
      value: "2019",
      label: "Beginnings"
    },
    {
      value: "110,509+",
      label: "PCs Built"
    },
    {
      value: "14",
      label: "States Covered"
    }
  ];

  return (
    <section className="experience-container">
      <div className="experience-header">
        <h2>We Build with Experience</h2>
        <p>
          Over a decade of experience crafting personalised desktop, gaming pcs for 
          gamers, students and professionals to ensure your convenience.
        </p>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <span className="stat-value">{stat.value}</span>
            <span className="stat-label">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExperienceSection;