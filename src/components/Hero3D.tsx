// src/components/Hero3D.tsx
import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Stars } from '@react-three/drei';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import type { Engine } from 'tsparticles-engine';
import { ReactTyped } from 'react-typed';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { 
  Zap, TrendingUp, Shield, Users, ArrowRight, 
  Euro, Sparkles, Activity, ChevronDown, Phone,
  CheckCircle, Star, Clock, Award
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// 3D Energy Sphere Component
const EnergySphere = () => {
  const meshRef = useRef<any>();
  
  return (
    <Float speed={4} rotationIntensity={1} floatIntensity={2}>
      <Sphere args={[1, 100, 200]} scale={2.5}>
        <MeshDistortMaterial
          color="#2563eb"
          attach="material"
          distort={0.5}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
};

// Animated Background Particles
const ParticlesBackground = () => {
  const particlesInit = async (engine: Engine) => {
    await loadFull(engine);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: false,
        background: {
          color: {
            value: "transparent",
          },
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            repulse: {
              distance: 100,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: ["#2563eb", "#7c3aed", "#10b981"],
          },
          links: {
            color: "#ffffff",
            distance: 150,
            enable: true,
            opacity: 0.2,
            width: 1,
          },
          collisions: {
            enable: false,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: false,
            speed: 1,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 80,
          },
          opacity: {
            value: 0.3,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 3 },
          },
        },
        detectRetina: true,
      }}
      className="absolute inset-0 -z-10"
    />
  );
};

// Floating Cards with 3D Transform
const FloatingCard = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -30 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ 
        duration: 0.8, 
        delay,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        scale: 1.05,
        rotateY: 5,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
      }}
      className="transform-gpu"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </motion.div>
  );
};

// Main Hero Component
const Hero3D = () => {
  const { scrollYProgress } = useScroll();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Parallax transforms
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  
  // Smooth spring animations
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const springY = useSpring(y, springConfig);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 20;
      const y = (clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    { icon: Euro, text: "Risparmia €500+/anno", color: "text-green-500" },
    { icon: Shield, text: "100% Gratuito", color: "text-blue-500" },
    { icon: Clock, text: "Attivazione in 24h", color: "text-purple-500" },
    { icon: Award, text: "Partner Certificati", color: "text-yellow-500" }
  ];

  const stats = [
    { value: 15000, suffix: "+", label: "Clienti Soddisfatti" },
    { value: 327, prefix: "€", label: "Risparmio Medio" },
    { value: 4.8, decimals: 1, suffix: "/5", label: "Valutazione" },
    { value: 50, suffix: "+", label: "Fornitori" }
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      {/* Animated Background Layers */}
      <div className="absolute inset-0">
        {/* Particle System */}
        <ParticlesBackground />
        
        {/* 3D Canvas Background */}
        <div className="absolute inset-0 opacity-30">
          <Canvas>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <EnergySphere />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
          </Canvas>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </div>

      {/* Main Content */}
      <motion.div 
        ref={ref}
        style={{ y: springY, opacity, scale }}
        className="relative z-10 container mx-auto px-4 pt-32 pb-20"
      >
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 text-lg">
            <Sparkles className="w-4 h-4 mr-2" />
            Nuova Era del Risparmio Energetico
          </Badge>
        </motion.div>

        {/* Main Title with Typing Effect */}
        <motion.div
          style={{
            transform: `perspective(1000px) rotateY(${mousePosition.x * 0.05}deg) rotateX(${-mousePosition.y * 0.05}deg)`,
          }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Rivoluziona
            </span>
            <br />
            <ReactTyped
              strings={[
                "Le Tue Bollette",
                "Il Tuo Risparmio",
                "La Tua Energia"
              ]}
              typeSpeed={50}
              backSpeed={30}
              loop
              className="text-white"
            />
          </h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto"
          >
            Confronta istantaneamente le migliori offerte luce e gas.
            <br />
            <span className="text-green-400 font-semibold">
              Power Pro: il tuo consulente energetico personale
            </span>
          </motion.p>
        </motion.div>

        {/* Animated Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <FloatingCard key={index} delay={index * 0.1}>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center border border-white/20">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {inView && (
                    <>
                      {stat.prefix}
                      <CountUp
                        end={stat.value}
                        decimals={stat.decimals || 0}
                        duration={2.5}
                        separator=","
                      />
                      {stat.suffix}
                    </>
                  )}
                </div>
                <p className="text-blue-200 text-sm">{stat.label}</p>
              </div>
            </FloatingCard>
          ))}
        </div>

        {/* Feature Cards with 3D Effect */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, rotateY: -180 }}
              animate={{ opacity: 1, rotateY: 0 }}
              transition={{ 
                delay: 0.5 + index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                scale: 1.1,
                rotateY: 10,
                z: 50
              }}
              className="transform-gpu"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/20 hover:border-white/40 transition-all">
                <feature.icon className={`w-8 h-8 ${feature.color} mb-2`} />
                <p className="text-white text-sm font-medium">{feature.text}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Buttons with Glow Effect */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-col md:flex-row gap-6 justify-center items-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
            <Button 
              size="lg"
              className="relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg font-bold"
              onClick={() => document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Zap className="mr-2 h-6 w-6" />
              Analizza Bolletta Gratis
              <ArrowRight className="ml-2 h-5 w-5 animate-bounce-x" />
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              size="lg"
              variant="outline"
              className="bg-white/10 backdrop-blur-md border-2 border-white/30 text-white hover:bg-white/20 px-8 py-6 text-lg font-bold"
            >
              <Phone className="mr-2 h-6 w-6" />
              Chiama Ora: 02 1234 5678
            </Button>
          </motion.div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex flex-wrap justify-center gap-6 mt-12"
        >
          {[
            { icon: Shield, text: "SSL Sicuro" },
            { icon: CheckCircle, text: "GDPR Compliant" },
            { icon: Star, text: "5 Stelle TrustPilot" },
            { icon: Users, text: "15k+ Clienti" }
          ].map((badge, index) => (
            <div key={index} className="flex items-center gap-2 text-white/70">
              <badge.icon className="w-5 h-5" />
              <span className="text-sm">{badge.text}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Animated Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-white/50 text-center cursor-pointer"
          onClick={() => document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <p className="text-sm mb-2">Scopri di più</p>
          <ChevronDown className="w-6 h-6 mx-auto" />
        </motion.div>
      </motion.div>

      {/* CSS for custom animations */}
      <style jsx>{`
        @keyframes bounce-x {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(5px); }
        }
        .animate-bounce-x {
          animation: bounce-x 1s infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero3D;
