import { HiOutlineAcademicCap } from 'react-icons/hi2';
import './HeroBanner.css';

const HeroBanner = ({ title, subtitle, logoIcon }) => {
  const IconComponent = logoIcon || HiOutlineAcademicCap;

  return (
    <section className="hero-banner" aria-label="البانر الرئيسي">
      <div className="hero-banner__graphics" aria-hidden="true">
        <div className="hero-banner__glow hero-banner__glow--top" />
        <div className="hero-banner__glow hero-banner__glow--bottom" />
        <div className="hero-banner__shape hero-banner__shape--1" />
        <div className="hero-banner__shape hero-banner__shape--2" />
        <div className="hero-banner__grid" />
      </div>

      <div className="hero-banner__container">
        <div className="hero-banner__content">

          <div className="hero-banner__logo-wrapper">
            <div className="hero-banner__logo-ring">
              <IconComponent className="hero-banner__logo-icon" size={64} />
            </div>
          </div>

          <div className="hero-banner__text">
            <h1 className="hero-banner__title">{title}</h1>
            <p className="hero-banner__subtitle">{subtitle}</p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
