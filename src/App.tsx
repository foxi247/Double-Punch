import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import { MapPin, Phone, Clock, Star, Dog, Beer, Music, Heart, Navigation, ChevronDown } from 'lucide-react';

// Animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' as const } }
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1, ease: 'easeOut' as const } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

// Beer taps data
const beerTaps = [
  { name: 'IPA Citra Burst', style: 'American IPA', abv: '6.8%', price: '180 ₽', color: '#D4A574', desc: 'Цитрусовый взрыв с нотками манго и грейпфрута' },
  { name: 'Stout Midnight', style: 'Imperial Stout', abv: '9.2%', price: '200 ₽', color: '#1a0f0a', desc: 'Тёмный как ночь, с оттенками кофе и горького шоколада' },
  { name: 'Wheat Haze', style: 'Hefeweizen', abv: '5.4%', price: '150 ₽', color: '#F4E4C1', desc: 'Пшеничная мутность с банановыми нотками' },
  { name: 'Sour Cherry', style: 'Fruit Sour', abv: '4.8%', price: '170 ₽', color: '#8B3A3A', desc: 'Кислая вишня с освежающим финалом' },
  { name: 'Lager Classic', style: 'Czech Pilsner', abv: '4.5%', price: '120 ₽', color: '#E8C547', desc: 'Чистый, освежающий, классический' },
  { name: 'Amber Ale', style: 'Red Ale', abv: '5.8%', price: '160 ₽', color: '#B87333', desc: 'Карамельная сладость с хмелевой горечью' },
];

// Reviews data
const reviews = [
  { text: 'Ощущение будто пришёл домой к друзьям', author: 'Александр М.', rating: 5 },
  { text: 'Давно с таким удовольствием не пил пиво', author: 'Дмитрий К.', rating: 5 },
  { text: 'Очень уютно, музыка — то что нужно взрослым', author: 'Елена В.', rating: 5 },
];

// Features data
const features = [
  { icon: Dog, text: 'Можно с собакой', desc: 'Ваши пушистые друзья всегда рады здесь' },
  { icon: Beer, text: 'Пиво 75–200 ₽', desc: 'Доступные цены на премиальный крафт' },
  { icon: Heart, text: 'Маленькое уютное помещение', desc: 'Всего 12 мест — камерная атмосфера' },
  { icon: Music, text: 'Взрослая музыка', desc: 'Никакой попсы — только характер' },
];

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden font-sans selection:bg-amber-500/30 selection:text-amber-100">
      {/* Custom Cursor Glow */}
      <div
        className="pointer-events-none fixed inset-0 z-50 opacity-30"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(217, 119, 6, 0.15), transparent 40%)`
        }}
      />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-40 px-6 py-4 backdrop-blur-md bg-black/20 border-b border-white/5"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-xl font-bold tracking-wider text-amber-500">DOUBLE PUNCH</div>
          <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
            <a href="#about" className="hover:text-amber-400 transition-colors">О баре</a>
            <a href="#beer" className="hover:text-amber-400 transition-colors">Пиво</a>
            <a href="#reviews" className="hover:text-amber-400 transition-colors">Отзывы</a>
            <a href="#location" className="hover:text-amber-400 transition-colors">Контакты</a>
          </div>
          <a
            href="tel:+79319510484"
            className="flex items-center gap-2 text-sm text-amber-400 hover:text-amber-300 transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span className="hidden sm:inline">+7 (931) 951-04-84</span>
          </a>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video/Image Effect */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#0a0a0a] z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80 z-10" />
          
          {/* Animated beer pour effect */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full h-full">
              {/* Animated liquid */}
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 top-0 w-[2px] bg-gradient-to-b from-amber-300 via-amber-500 to-amber-700"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: '100%', opacity: [0, 1, 0.8, 1] }}
                transition={{ duration: 3, ease: 'easeOut' }}
              />
              
              {/* Glass effect */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-96 rounded-b-3xl border-2 border-white/10 bg-gradient-to-t from-amber-900/30 via-amber-800/20 to-transparent backdrop-blur-sm overflow-hidden">
                <motion.div
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-amber-600 via-amber-500 to-amber-400"
                  initial={{ height: 0 }}
                  animate={{ height: '75%' }}
                  transition={{ duration: 2.5, delay: 0.5, ease: 'easeOut' }}
                >
                  {/* Bubbles */}
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-white/40 rounded-full"
                      style={{ left: `${Math.random() * 100}%` }}
                      initial={{ bottom: 0, opacity: 0 }}
                      animate={{
                        bottom: ['0%', '100%'],
                        opacity: [0, 1, 0],
                        x: [0, Math.random() * 10 - 5]
                      }}
                      transition={{
                        duration: 2 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                        ease: 'easeOut'
                      }}
                    />
                  ))}
                </motion.div>
                
                {/* Foam */}
                <motion.div
                  className="absolute top-[25%] left-0 right-0 h-8 bg-gradient-to-b from-white/90 to-white/20"
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{ opacity: 1, scaleY: 1 }}
                  transition={{ duration: 1, delay: 2.5 }}
                />
              </div>
              
              {/* Condensation droplets */}
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={`drop-${i}`}
                  className="absolute w-1 h-2 bg-white/30 rounded-full"
                  style={{
                    left: `calc(50% + ${(Math.random() - 0.5) * 200}px)`,
                    top: `${40 + Math.random() * 40}%`
                  }}
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: [0, 0.6, 0], y: [0, 20] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: Math.random() * 3,
                    ease: 'easeIn'
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <motion.div style={{ y, opacity }} className="relative z-20 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.div variants={fadeInUp} className="flex items-center justify-center gap-2 text-amber-400">
              <Star className="w-5 h-5 fill-amber-400" />
              <span className="text-sm tracking-widest uppercase">Рейтинг 4.9 · 96 оценок</span>
            </motion.div>
            
            <motion.h1
              variants={fadeInUp}
              className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #d4a574 50%, #92400e 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              DOUBLE<br />PUNCH
            </motion.h1>
            
            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl text-white/80 font-light tracking-wide"
            >
              Крафтовый бар с характером
            </motion.p>
            
            <motion.p
              variants={fadeInUp}
              className="text-white/50 text-sm md:text-base"
            >
              Маленький бар. Большой вкус.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
            >
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: '#d97706' }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-amber-600 text-white font-medium rounded-full transition-all shadow-lg shadow-amber-600/25"
              >
                Забронировать стол
              </motion.button>
              <motion.a
                href="#location"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border border-white/20 text-white font-medium rounded-full hover:bg-white/5 transition-all flex items-center gap-2"
              >
                <Navigation className="w-4 h-4" />
                Проложить маршрут
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-white/40"
          >
            <span className="text-xs tracking-widest uppercase">Листай</span>
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={fadeInUp} className="space-y-8">
              <div className="space-y-4">
                <span className="text-amber-500 text-sm tracking-widest uppercase">О нас</span>
                <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                  Мы не просто бар.<br />
                  <span className="text-white/60">Мы — место, где пиво — это искусство.</span>
                </h2>
              </div>
              
              <p className="text-lg text-white/70 leading-relaxed">
                Атмосфера как у лучших друзей дома. Здесь нет случайных людей — только те, кто ценит 
                качественный крафт, хорошую музыку и душевные разговоры до рассвета.
              </p>

              <div className="grid grid-cols-2 gap-6 pt-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    whileHover={{ scale: 1.02 }}
                    className="group p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-500/30 transition-all"
                  >
                    <feature.icon className="w-6 h-6 text-amber-500 mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="font-medium text-white mb-1">{feature.text}</h3>
                    <p className="text-sm text-white/50">{feature.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeIn} className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-to-br from-amber-900/20 to-black border border-white/10">
                {/* Abstract bar interior visualization */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full h-full p-8">
                    {/* Bar counter */}
                    <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-amber-950/80 to-transparent" />
                    
                    {/* Neon sign effect */}
                    <motion.div
                      className="absolute top-1/4 left-1/2 -translate-x-1/2 text-4xl font-black tracking-widest"
                      style={{
                        color: '#fbbf24',
                        textShadow: '0 0 20px rgba(251, 191, 36, 0.5), 0 0 40px rgba(251, 191, 36, 0.3)'
                      }}
                      animate={{ opacity: [0.8, 1, 0.8] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      OPEN
                    </motion.div>

                    {/* Tap handles */}
                    <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 flex gap-4">
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-3 h-16 bg-gradient-to-b from-amber-600 to-amber-800 rounded-full"
                          initial={{ y: -20, opacity: 0 }}
                          whileInView={{ y: 0, opacity: 1 }}
                          transition={{ delay: i * 0.1 }}
                        />
                      ))}
                    </div>

                    {/* Warm light glow */}
                    <div className="absolute top-0 left-1/4 w-32 h-32 bg-amber-500/20 rounded-full blur-3xl" />
                    <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl" />
                  </div>
                </div>
              </div>
              
              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-6 -right-6 bg-amber-600 text-white px-6 py-4 rounded-2xl shadow-xl"
              >
                <div className="text-3xl font-bold">4.9</div>
                <div className="text-xs text-amber-100">на Яндекс.Картах</div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Beer Section */}
      <section id="beer" className="relative py-32 px-6 bg-gradient-to-b from-[#0a0a0a] via-[#0f0a0a] to-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              Пиво на кранах
            </motion.div>
            
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-6xl font-bold mb-6">
              Ты не просто пьёшь —<br />
              <span className="text-amber-500">ты проживаешь каждый глоток</span>
            </motion.h2>
            
            <motion.p variants={fadeInUp} className="text-white/50 max-w-2xl mx-auto">
              Шесть кранов, шесть историй. Каждый сорт — это путешествие, которое начинается 
              с первого глотка и заканчивается желанием вернуться.
            </motion.p>
          </motion.div>

          {/* Beer Taps Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {beerTaps.map((beer, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-amber-500/30 transition-all overflow-hidden"
              >
                {/* Beer color indicator */}
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{ backgroundColor: beer.color }}
                />
                
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-xs text-white/40 uppercase tracking-wider">{beer.style}</span>
                    <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                      {beer.name}
                    </h3>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-amber-500">{beer.price}</div>
                    <div className="text-xs text-white/40">0.5л</div>
                  </div>
                </div>
                
                <p className="text-sm text-white/60 mb-4">{beer.desc}</p>
                
                <div className="flex items-center gap-4 text-xs text-white/40">
                  <span className="px-2 py-1 rounded-full bg-white/5">ABV {beer.abv}</span>
                  <span className="px-2 py-1 rounded-full bg-white/5">На кране</span>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div
                    className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full blur-3xl"
                    style={{ backgroundColor: `${beer.color}20` }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Takeaway note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-white/40 text-sm">
              Можно взять с собой · Скидка 10% на навынос
            </p>
          </motion.div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="relative py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span variants={fadeInUp} className="text-amber-500 text-sm tracking-widest uppercase">Отзывы</motion.span>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold mt-4">
              Что говорят наши гости
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                className="relative p-8 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-sm"
              >
                {/* Quote mark */}
                <div className="absolute top-6 right-6 text-6xl text-amber-500/20 font-serif">&ldquo;</div>
                
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                
                <p className="text-lg text-white/90 mb-6 leading-relaxed">{review.text}</p>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-sm font-bold">
                    {review.author[0]}
                  </div>
                  <span className="text-sm text-white/60">{review.author}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Location Section */}
      <section id="location" className="relative py-32 px-6 bg-gradient-to-b from-[#0a0a0a] to-[#0f0505]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={fadeInUp} className="space-y-8">
              <div>
                <span className="text-amber-500 text-sm tracking-widest uppercase">Локация</span>
                <h2 className="text-4xl md:text-5xl font-bold mt-4">Приходи к нам</h2>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-amber-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white mb-1">Адрес</h3>
                    <p className="text-white/60">Санкт-Петербург, Свеаборгская ул., 8</p>
                    <p className="text-sm text-white/40 mt-1">Метро: Электросила (1,11 км)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-amber-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white mb-1">Режим работы</h3>
                    <p className="text-white/60">С 15:00 до позднего вечера</p>
                    <p className="text-sm text-white/40 mt-1">Без выходных</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-amber-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white mb-1">Телефон</h3>
                    <a href="tel:+79319510484" className="text-white/60 hover:text-amber-400 transition-colors">
                      +7 (931) 951-04-84
                    </a>
                  </div>
                </div>
              </div>

              <motion.a
                href="tel:+79319510484"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-amber-600 text-white font-medium rounded-full hover:bg-amber-500 transition-colors shadow-lg shadow-amber-600/25"
              >
                <Phone className="w-5 h-5" />
                Позвонить
              </motion.a>
            </motion.div>

            <motion.div variants={fadeIn} className="relative">
              {/* Map visualization */}
              <div className="aspect-square rounded-3xl overflow-hidden bg-[#1a1a1a] border border-white/10 relative">
                {/* Grid pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="w-full h-full" style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                      linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                  }} />
                </div>
                
                {/* Streets */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
                  <motion.path
                    d="M0 200 Q100 180 200 200 T400 200"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="8"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 2 }}
                  />
                  <motion.path
                    d="M200 0 Q220 100 200 200 T200 400"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="6"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 0.3 }}
                  />
                </svg>

                {/* Location pin */}
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1, type: 'spring' }}
                >
                  <div className="relative">
                    <motion.div
                      className="absolute inset-0 bg-amber-500 rounded-full"
                      animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <div className="relative w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center shadow-lg shadow-amber-600/50">
                      <Beer className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </motion.div>

                {/* Metro indicator */}
                <motion.div
                  className="absolute bottom-1/4 left-1/4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-600/80 text-white text-xs"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.5 }}
                >
                  <span className="font-bold">М</span>
                  <span>Электросила</span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-32 px-6 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-t from-amber-900/20 via-transparent to-transparent" />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(217,119,6,0.15) 0%, transparent 70%)'
            }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="relative z-10 max-w-4xl mx-auto text-center"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-8"
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #fbbf24 50%, #d97706 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Сегодня пьём<br />здесь.
          </motion.h2>
          
          <motion.p variants={fadeInUp} className="text-xl text-white/60 mb-12 max-w-2xl mx-auto">
            Маленький бар с большим характером ждёт тебя. 
            Бронируй стол или просто приходи — мы всегда рады.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(217, 119, 6, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-5 bg-amber-600 text-white text-lg font-medium rounded-full transition-all shadow-xl shadow-amber-600/30"
            >
              Прийти в Double Punch
            </motion.button>
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-16 flex items-center justify-center gap-8 text-white/40 text-sm">
            <span className="flex items-center gap-2">
              <Dog className="w-4 h-4" />
              Pet friendly
            </span>
            <span className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              4.9 рейтинг
            </span>
            <span className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              С 2019 года
            </span>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-2xl font-bold tracking-wider text-amber-500">DOUBLE PUNCH</div>
          <div className="text-white/40 text-sm text-center md:text-right">
            <p>Санкт-Петербург, Свеаборгская ул., 8</p>
            <p className="mt-1">© 2024 Double Punch. Крафтовый бар с характером.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
