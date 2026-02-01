'use client';

import Layout from '../../../components/layout/Layout';
import ContactForm from './components/ContactForm';
import ContactInfo from './components/ContactInfo';
import DeveloperInfo from './components/DeveloperInfo';
import './index.scss';

const Contact = () => {
  return (
    <Layout>
      <div className="contact-page">
        <div className="container">
          <div className="contact-header">
            <h1 className="contact-title">Get in Touch</h1>
            <p className="contact-subtitle">
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <div className="contact-content">
            <div className="contact-form-section">
              <ContactForm />
            </div>
            <div className="contact-info-section">
              <ContactInfo />
              <DeveloperInfo />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;