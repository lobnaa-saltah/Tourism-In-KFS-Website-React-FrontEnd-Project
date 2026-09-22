import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineCheckCircle, HiOutlineArrowRight } from 'react-icons/hi2';
import './ProgramCard.css';

const ProgramCard = ({ program }) => {
  const { title, description, image, available, buttonText } = program;
  const navigate = useNavigate();
  const imgRef = useRef(null);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    if (img.complete) {
      setImgLoaded(true);
    } else {
      const handleLoad = () => setImgLoaded(true);
      img.addEventListener('load', handleLoad);
      return () => img.removeEventListener('load', handleLoad);
    }
  }, []);

  const handleClick = () => navigate('/login');

  return (
    <article className="program-card">
      <div className="program-card__image-wrapper">
        <img
          ref={imgRef}
          src={image}
          alt={title}
          loading="lazy"
          className={`program-card__image ${imgLoaded ? 'program-card__image--loaded' : ''}`}
        />
        {!imgLoaded && <div className="program-card__image-skeleton" />}
        {available && (
          <span className="program-card__badge">
            <HiOutlineCheckCircle size={14} />
            التسجيل متاح
          </span>
        )}
      </div>

      <div className="program-card__body">
        <h3 className="program-card__title">{title}</h3>
        <p className="program-card__desc">{description}</p>
        <button
          onClick={handleClick}
          className={`program-card__btn ${!available ? 'program-card__btn--disabled' : ''}`}
          disabled={!available}
        >
          {buttonText}
          {available && <HiOutlineArrowRight size={16} className="program-card__btn-icon" />}
        </button>
      </div>
    </article>
  );
};

export default ProgramCard;
