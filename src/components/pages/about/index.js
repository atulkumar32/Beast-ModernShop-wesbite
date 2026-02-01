'use client';

import Layout from '../../../components/layout/Layout';
import CompanyIntro from './components/CompanyIntro';
import MissionVision from './components/MissionVision';
import WhyChooseUs from './components/WhyChooseUs';
import OurJourney from './components/OurJourney';
import TeamStats from './components/TeamStats';
import './index.scss';

const About = () => {
  return (
    <Layout>
      <div className="about-page">
        {/* Company Introduction */}
        <CompanyIntro />
        
        {/* Mission & Vision */}
        <MissionVision />
        
        {/* Why Choose Us */}
        <WhyChooseUs />
        
        {/* Our Journey */}
        <OurJourney />
        
        {/* Team & Stats */}
        <TeamStats />
      </div>
    </Layout>
  );
};

export default About;