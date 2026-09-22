import './PageHero.css';

const PageHero = ({ title, subtitle, stats, children }) => {
  return (
    <section className="page-hero" aria-label="عنوان الصفحة">
      <div className="page-hero__graphics" aria-hidden="true">
        <div className="page-hero__grid" />
      </div>

      <div className="page-hero__container">
        <h1 className="page-hero__title">{title}</h1>
        {subtitle && <p className="page-hero__subtitle">{subtitle}</p>}

        {stats && stats.length > 0 && (
          <div className="page-hero__stats">
            {stats.map((stat, i) => (
              <div key={i} className="page-hero__stat-item">
                <span className="page-hero__stat-value">{stat.value}</span>
                <span className="page-hero__stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        )}

        {children && (
          <div className="page-hero__extra">{children}</div>
        )}
      </div>
    </section>
  );
};

export default PageHero;
