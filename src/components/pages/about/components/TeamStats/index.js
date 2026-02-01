'use client';

import './index.scss';

const TeamStats = () => {
  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300',
      bio: 'Visionary leader with 15+ years in eCommerce and technology innovation.',
      social: {
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300',
      bio: 'Tech expert driving our platform\'s scalability and performance excellence.',
      social: {
        linkedin: '#',
        github: '#'
      }
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Design',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300',
      bio: 'Creative director ensuring exceptional user experiences across all touchpoints.',
      social: {
        linkedin: '#',
        dribbble: '#'
      }
    },
    {
      name: 'David Thompson',
      role: 'VP of Operations',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300',
      bio: 'Operations expert optimizing our global supply chain and logistics network.',
      social: {
        linkedin: '#',
        twitter: '#'
      }
    }
  ];

  const companyStats = [
    {
      number: '200+',
      label: 'Team Members',
      description: 'Talented professionals across 15 countries'
    },
    {
      number: '50+',
      label: 'Countries',
      description: 'Global presence with local expertise'
    },
    {
      number: '99.9%',
      label: 'Uptime',
      description: 'Reliable platform you can count on'
    },
    {
      number: '4.9/5',
      label: 'Customer Rating',
      description: 'Consistently high satisfaction scores'
    }
  ];

  return (
    <section className="team-stats section">
      <div className="container">
        <div className="section-title">
          <h2>Meet Our Team</h2>
          <p>The passionate people behind ModernShop's success</p>
        </div>

        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div key={index} className={`team-card animate-scale-in stagger-${index + 1}`}>
              <div className="team-card__image">
                <img src={member.image} alt={member.name} />
                <div className="team-card__overlay">
                  <div className="social-links">
                    {Object.entries(member.social).map(([platform, url]) => (
                      <a key={platform} href={url} className="social-link" aria-label={platform}>
                        {platform === 'linkedin' && (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                        )}
                        {platform === 'twitter' && (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                          </svg>
                        )}
                        {platform === 'github' && (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                        )}
                        {platform === 'dribbble' && (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0C5.374 0 0 5.374 0 12s5.374 12 12 12 12-5.374 12-12S18.626 0 12 0zm9.568 7.375c.53 1.104.846 2.343.846 3.625 0 .211-.008.42-.024.625-.793-.175-1.728-.35-2.846-.35-1.154 0-2.376.175-3.6.525-.105-.24-.195-.48-.3-.705-.3-.705-.645-1.41-1.005-2.1 1.65-.705 3.3-1.665 4.8-2.775 1.275.855 2.175 2.1 2.129 1.155zm-2.85-2.325c-1.425 1.05-2.925 1.95-4.425 2.55-.75-1.35-1.575-2.625-2.475-3.825C13.05 2.7 14.55 2.25 16.125 2.25c1.05 0 2.025.3 2.85.825-.225.225-.45.45-.675.675-.375.375-.75.75-1.125 1.125-.375.375-.75.75-1.125 1.125zm-7.425.675c.9 1.2 1.725 2.475 2.475 3.825-1.5.6-3 1.5-4.425 2.55-.825-.825-1.35-1.95-1.35-3.225 0-1.575.45-3.075 1.275-4.275 1.05.375 2.025.75 2.025 1.125zm-2.025 6.075c1.425-1.05 2.925-1.95 4.425-2.55.75 1.35 1.575 2.625 2.475 3.825-1.275.975-2.775 1.425-4.35 1.425-1.05 0-2.025-.3-2.85-.825.225-.225.45-.45.675-.675.375-.375.75-.75 1.125-1.125.375-.375.75-.75 1.125-1.125zm7.425-.675c-.9-1.2-1.725-2.475-2.475-3.825 1.5-.6 3-1.5 4.425-2.55.825.825 1.35 1.95 1.35 3.225 0 1.575-.45 3.075-1.275 4.275-1.05-.375-2.025-.75-2.025-1.125z"/>
                          </svg>
                        )}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="team-card__content">
                <h3 className="team-card__name">{member.name}</h3>
                <p className="team-card__role">{member.role}</p>
                <p className="team-card__bio">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="company-stats">
          <h3 className="stats-title">By the Numbers</h3>
          <div className="stats-grid">
            {companyStats.map((stat, index) => (
              <div key={index} className={`stat-item animate-fade-in stagger-${index + 1}`}>
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
                <div className="stat-description">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamStats;