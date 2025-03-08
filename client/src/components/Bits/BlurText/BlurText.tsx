import { useRef, useEffect, useState, useCallback } from 'react';
import { useSprings, animated } from '@react-spring/web';

interface BlurTextProps {
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
  threshold?: number;
  rootMargin?: string;
  onAnimationComplete?: () => void;
}

const defaultAnimations = {
  top: {
    from: { filter: 'blur(10px)', opacity: 0, transform: 'translateY(-20px)' },
    to: [
      { filter: 'blur(5px)', opacity: 0.7, transform: 'translateY(5px)' },
      { filter: 'blur(0px)', opacity: 1, transform: 'translateY(0px)' },
    ],
  },
  bottom: {
    from: { filter: 'blur(10px)', opacity: 0, transform: 'translateY(20px)' },
    to: [
      { filter: 'blur(5px)', opacity: 0.7, transform: 'translateY(-5px)' },
      { filter: 'blur(0px)', opacity: 1, transform: 'translateY(0px)' },
    ],
  },
};

const BlurText: React.FC<BlurTextProps> = ({
  text = '',
  delay = 200,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  onAnimationComplete,
}) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);
  const animatedCount = useRef(0);

  const { from, to } = defaultAnimations[direction];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const handleAnimationComplete = useCallback(() => {
    animatedCount.current += 1;
    if (animatedCount.current === elements.length && onAnimationComplete) {
      onAnimationComplete();
    }
  }, [elements.length, onAnimationComplete]);

  const springs = useSprings(
    elements.length,
    elements.map((_, i) => ({
      from,
      to: inView ? async (next: any) => {
        for (const step of to) {
          await next(step);
        }
        handleAnimationComplete();
      } : from,
      delay: i * delay,
    }))
  );

  return (
    <p ref={ref} className={`blur-text ${className} flex flex-wrap`}>
      {springs.map((props, index) => (
        <animated.span
          key={index}
          style={props}
          className="inline-block will-change-transform will-change-opacity will-change-filter"
        >
          {elements[index] === ' ' ? '\u00A0' : elements[index]}
          {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
        </animated.span>
      ))}
    </p>
  );
};

export default BlurText;
