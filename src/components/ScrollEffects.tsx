// src/components/ScrollEffects.tsx
import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import { Parallax } from 'react-parallax';
import ParallaxTilt from 'react-parallax-tilt';
import { useInView } from 'react-intersection-observer';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Initialize AOS
if (typeof window !== 'undefined') {
  AOS.init({
    duration: 1000,
    once: true,
    easing: 'ease-out-cubic',
  });
}

// Parallax Section Wrapper
export const ParallaxSection: React.FC<{
  children: React.ReactNode;
  bgImage?: string;
  strength?: number;
  blur?: number;
  className?: string;
}> = ({ children, bgImage, strength = 300, blur = 0, className = '' }) => {
  if (!bgImage) {
    return <div className={className}>{children}</div>;
  }

  return (
    <Parallax
      bgImage={bgImage}
      strength={strength}
      blur={{ min: -blur, max: blur }}
      bgImageStyle={{
        objectFit: 'cover',
        filter: 'brightness(0.7)'
      }}
    >
      <div className={`min-h-[50vh] flex items-center justify-center ${className}`}>
        {children}
      </div>
    </Parallax>
  );
};

// 3D Tilt Card
export const Card3D: React.FC<{
  children: React.ReactNode;
  className?: string;
  scale?: number;
  perspective?: number;
}> = ({ children, className = '', scale = 1.05, perspective = 1000 }) => {
  return (
    <ParallaxTilt
      scale={scale}
      perspective={perspective}
      glareEnable={true}
      glareMaxOpacity={0.3}
      glareColor="#ffffff"
      glarePosition="all"
      glareBorderRadius="20px"
      className={className}
    >
      {children}
    </ParallaxTilt>
  );
};

// Fade In Animation
export const FadeInWhenVisible: React.FC<{
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}> = ({ children, delay = 0, direction = 'up', className = '' }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const variants = {
    up: { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } },
    down: { hidden: { opacity: 0, y: -50 }, visible: { opacity: 1, y: 0 } },
    left: { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0 } },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants[direction]}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Sticky Parallax Element
export const StickyParallaxElement: React.FC<{
  children: React.ReactNode;
  offset?: number;
  className?: string;
}> = ({ children, offset = 50, className = '' }) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, offset]);
  const springY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      style={{ y: springY }}
      className={`sticky top-0 ${className}`}
    >
      {children}
    </motion.div>
  );
};

// Rotating 3D Element on Scroll
export const Rotate3DOnScroll: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <motion.div
      ref={ref}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Scale on Scroll
export const ScaleOnScroll: React.FC<{
  children: React.ReactNode;
  minScale?: number;
  maxScale?: number;
  className?: string;
}> = ({ children, minScale = 0.5, maxScale = 1, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [minScale, maxScale]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ scale, opacity }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Morphing Shape Background
export const MorphingBackground: React.FC<{
  className?: string;
}> = ({ className = '' }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2">
              <animate attributeName="stop-color" values="#3b82f6;#8b5cf6;#3b82f6" dur="5s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.2">
              <animate attributeName="stop-color" values="#8b5cf6;#3b82f6;#8b5cf6" dur="5s" repeatCount="indefinite" />
            </stop>
          </linearGradient>
        </defs>
        <path
          d="M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z"
          fill="url(#gradient1)"
        >
          <animate
            attributeName="d"
            values="M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z;M0,100 C150,0 350,200 500,100 L500,00 L0,0 Z;M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z"
            dur="10s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    </div>
  );
};

// Hover 3D Card
export const Hover3DCard: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  const [rotateX, setRotateX] = React.useState(0);
  const [rotateY, setRotateY] = React.useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    setRotateY((x - centerX) / 10);
    setRotateX(-(y - centerY) / 10);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      className={`transform-gpu ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        transformPerspective: 1000,
      }}
      animate={{
        rotateX,
        rotateY,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
};

// Text Reveal Animation
export const TextReveal: React.FC<{
  text: string;
  className?: string;
  delay?: number;
}> = ({ text, className = '', delay = 0 }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const words = text.split(' ');

  return (
    <motion.div ref={ref} className={className}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.5,
            delay: delay + index * 0.1,
            ease: "easeOut"
          }}
          className="inline-block mr-2"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

// Floating Element
export const FloatingElement: React.FC<{
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  className?: string;
}> = ({ children, duration = 3, delay = 0, className = '' }) => {
  return (
    <motion.div
      animate={{
        y: [0, -20, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default {
  ParallaxSection,
  Card3D,
  FadeInWhenVisible,
  StickyParallaxElement,
  Rotate3DOnScroll,
  ScaleOnScroll,
  MorphingBackground,
  Hover3DCard,
  TextReveal,
  FloatingElement
};
