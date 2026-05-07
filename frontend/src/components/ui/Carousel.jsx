import { useEffect, useRef, useState } from "react";
import "./Carousel.css";

export default function Carousel({ slides = [], interval = 5000 }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const startX = useRef(0);
  const isDragging = useRef(false);

  // autoplay
  useEffect(() => {
    if (paused) return;

    const timer = setInterval(() => {
      next();
    }, interval);

    return () => clearInterval(timer);
  }, [index, paused]);

  function next() {
    setIndex((prev) => (prev + 1) % slides.length);
  }

  function prev() {
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }

  // drag (mouse + touch)
  function handleStart(e) {
    isDragging.current = true;
    startX.current = e.touches ? e.touches[0].clientX : e.clientX;
  }

  function handleEnd(e) {
    if (!isDragging.current) return;

    const endX = e.changedTouches
      ? e.changedTouches[0].clientX
      : e.clientX;

    const diff = startX.current - endX;

    if (diff > 50) next();
    if (diff < -50) prev();

    isDragging.current = false;
  }

  return (
    <div
      className="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onMouseDown={handleStart}
      onMouseUp={handleEnd}
      onTouchStart={handleStart}
      onTouchEnd={handleEnd}
    >
      <div
        className="carousel-track"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="carousel-slide">
            <img src={slide.image} alt={slide.title} />

            <div className="carousel-overlay">
              <h2>{slide.title}</h2>
              <p>{slide.subtitle}</p>

              {slide.cta && (
                <button onClick={slide.onClick}>
                  {slide.cta}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* botões */}
      <button className="carousel-btn left" onClick={prev}>‹</button>
      <button className="carousel-btn right" onClick={next}>›</button>

      {/* dots */}
      <div className="carousel-dots">
        {slides.map((_, i) => (
          <span
            key={i}
            className={i === index ? "active" : ""}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}