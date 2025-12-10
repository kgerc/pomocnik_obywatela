import { useState, useEffect } from 'react';
import { MessageSquare, FileText, TrendingUp, Sparkles, Search, CheckCircle, ArrowRight, Users, User, Database, Bell, Shield, X } from 'lucide-react';
import SEO from './components/SEO';
import aiChatImg from './assets/ai_chat.png';
import aiPismaImg from './assets/ai_pisma.png';
import aiDotacjeImg from './assets/ai_dotacje.png';
import personalizacjaImg from './assets/personalizacja.png';
import powiadomieniaImg from './assets/powiadomienia.png';
import bazaDanychImg from './assets/baza_danych.png';

const LandingPage = () => {
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [openImage, setOpenImage] = useState(null);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [analytics, setAnalytics] = useState({
    pageViews: 0,
    clicks: {},
    timeOnPage: 0
  });

  const screenshots = [
  {
    title: 'Znajdź świadczenia',
    icon: <MessageSquare size={24} color="#2c5aa0" />,
    img: aiChatImg,
    description: 'Zadaj pytanie w naturalnym języku, a sztuczna inteligencja natychmiast znajdzie odpowiednie świadczenia',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    height: '300px'
  },
  {
    title: 'Znajdź pisma i wnioski',
    icon: <FileText size={24} color="#10b981" />,
    img: aiPismaImg,
    description: 'Zapytaj o dokumenty związane z Twoją sprawą, a sztuczna inteligencja natychmiast znajdzie odpowiednie pisma i wnioski',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    height: '300px'
  },
  {
    title: 'Znajdź dotacje',
    icon: <TrendingUp size={24} color="#f59e0b" />,
    img: aiDotacjeImg,
    description: 'Wpisz temat którego dotyczy dofinansowanie, a sztuczna inteligencja natychmiast znajdzie odpowiednie dotacje',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    height: '300px'
  },
  {
    title: 'Personalizacja',
    icon: <User size={24} color="#2c5aa0" />,
    img: personalizacjaImg,
    description: 'Podaj swoje dane, a otrzymasz spersonalizowane rekomendacje świadczeń',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    height: '300px'
  },
    {
    title: 'Baza pism i dotacji',
    icon: <Database size={24} color="#10b981" />,
    img: bazaDanychImg,
    description: 'Wyszukaj gotowe wzory dokumentów do pobrania',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    height: '300px'
  },
    {
    title: 'Powiadomienia',
    icon: <Bell size={24} color="#f59e0b" />,
    img: powiadomieniaImg,
    description: 'Otrzymuj powiadomienia o nowych programach publicznych',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    height: '300px'
  }
];

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setOpenImage(null);
        setShowPrivacyPolicy(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
            
            trackEvent('section_view', {
              category: 'engagement',
              label: entry.target.id,
              section_name: entry.target.id
            });
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let maxScroll = 0;
    const trackedDepths = new Set();

    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        
        [25, 50, 75, 90].forEach(milestone => {
          if (scrollPercent >= milestone && !trackedDepths.has(milestone)) {
            trackedDepths.add(milestone);
            trackEvent('scroll_depth', {
              category: 'engagement',
              label: `${milestone}%`,
              value: milestone
            });
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    trackEvent('page_view', {
      category: 'engagement',
      label: 'landing_page_view'
    });
    
    const startTime = Date.now();
    const interval = setInterval(() => {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      setAnalytics(prev => ({ ...prev, timeOnPage: timeSpent }));
      
      if (timeSpent === 30 || timeSpent === 60 || timeSpent === 120) {
        trackEvent('time_on_page', {
          category: 'engagement',
          label: `${timeSpent}_seconds`,
          value: timeSpent
        });
      }
    }, 1000);

    return () => {
      clearInterval(interval);

      const finalTime = Math.floor((Date.now() - startTime) / 1000);
      trackEvent('session_end', {
        category: 'engagement',
        label: 'page_exit',
        value: finalTime
      });
    };
  }, []);

  useEffect(() => {
    const savedAnalytics = localStorage.getItem('analytics');
    if (savedAnalytics) {
      setAnalytics(JSON.parse(savedAnalytics));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('analytics', JSON.stringify(analytics));
  }, [analytics]);

  const trackEvent = (eventName, metadata = {}) => {
    setAnalytics(prev => {
      const newAnalytics = { ...prev };
      
      if (eventName === 'page_view') {
        newAnalytics.pageViews = (prev.pageViews || 0) + 1;
      } else if (eventName.startsWith('click_')) {
        newAnalytics.clicks = {
          ...prev.clicks,
          [eventName]: (prev.clicks[eventName] || 0) + 1
        };
      }

      return newAnalytics;
    });

    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', eventName, {
        ...metadata,
        timestamp: new Date().toISOString()
      });
    }
  };

  const handleCtaClick = (ctaName) => {
    trackEvent(`click_cta_${ctaName}`, {
      category: 'cta',
      label: ctaName,
      value: 1
    });
  };

  const features = [
    {
      icon: <MessageSquare size={32} />,
      title: 'AI Chat - Inteligentny Asystent',
      description: 'Zapytaj o dowolne świadczenie w naturalnym języku. AI natychmiast znajdzie odpowiedź i pokaże Ci dostępne opcje.',
      benefits: ['Odpowiedzi w sekundach', 'Zrozumiałe wyjaśnienia', 'Dokładne dopasowanie do Twojej sytuacji'],
      color: '#2c5aa0'
    },
    {
      icon: <FileText size={32} />,
      title: 'Baza Pism i Wniosków',
      description: 'Gotowe wzory dokumentów do pobrania. Reklamacje, odwołania, wnioski - wszystko w jednym miejscu.',
      benefits: ['Wyszukiwanie pism za pomocą AI', 'Gotowe wzory do pobrania (PDF/DOC)', 'Aktualne dokumenty zgodne z przepisami'],
      color: '#10b981'
    },
    {
      icon: <TrendingUp size={32} />,
      title: 'Dotacje i Granty 2024-2025',
      description: 'Aktywne programy dotacyjne dla firm, NGO, samorządów. Znajdź finansowanie na swój projekt.',
      benefits: ['Aktualne kwoty wsparcia', 'Warunki kwalifikacji', 'Terminy naborów'],
      color: '#f59e0b'
    }
  ];

  const howItWorks = [
    {
      step: '1',
      title: 'Zadaj pytanie',
      description: 'Opisz swoją sytuację w naturalnym języku - tak jak rozmawiałbyś z przyjacielem.',
      icon: <Search size={32} />
    },
    {
      step: '2',
      title: 'AI analizuje',
      description: 'Nasz inteligentny asystent przeszukuje bazę i znajduje najlepsze dopasowanie.',
      icon: <Sparkles size={32} />
    },
    {
      step: '3',
      title: 'Otrzymujesz odpowiedź',
      description: 'Dostajesz konkretną informację, linki do oficjalnych stron i dokumenty do pobrania.',
      icon: <CheckCircle size={32} />
    }
  ];

  const faqs = [
    {
      q: 'Czy korzystanie z Pomocnika Obywatela jest darmowe?',
      a: 'Tak — dostęp do bazy oficjalnych pism, wniosków i instrukcji jest całkowicie bezpłatny. Użytkownik może przeglądać dokumenty oraz podstawowe informacje bez żadnych opłat. Funkcje premium, takie jak inteligentne rekomendacje świadczeń i dotacji oraz personalizowane powiadomienia, wymagają opłaty.'
    },
    {
      q: 'Czy informacje są aktualne?',
      a: 'Regularnie aktualizujemy bazę danych, śledząc zmiany w przepisach.'
    },
    {
      q: 'Czy mogę zaufać informacjom od AI?',
      a: 'AI korzysta wyłącznie z oficjalnych źródeł (gov.pl, ZUS, PARP, itd.). Zawsze linkujemy do źródeł, abyś mógł zweryfikować informacje.'
    },
    {
      q: 'Czy moje dane są bezpieczne?',
      a: 'Nie zbieramy danych osobowych. Pytania są anonimowe, a historia rozmów przechowywana lokalnie w Twojej przeglądarce.'
    }
  ];

  return (
    <>
      {/* SEO Component */}
      <SEO
        title="Pomocnik Obywatela - Świadczenia, Dotacje i Dokumenty | AI"
        description="AI asystent znajdzie świadczenia, dotacje i dokumenty urzędowe w sekundach. 50+ świadczeń (800+, ZUS, MOPS), 150+ wzorów pism, 70+ dotacji. Bez biurokracji!"
        keywords="świadczenia publiczne, dotacje, asystent AI, pomoc obywatelska, wnioski urzędowe, dokumenty urzędowe, ZUS, 800+, MOPS, ulga podatkowa, wsparcie rodzin, program dotacyjny, reklamacje, odwołania"
        ogImage="https://pomocnikobywatela.pl/logo.png"
        canonicalUrl="https://pomocnikobywatela.pl/"
      />

      <div style={{
        minHeight: '100vh',
        minWidth: '100%',
        width: '100%',
        background: '#ffffff',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        margin: 0,
        padding: 0,
        overflowX: 'hidden'
      }}>
        {/* Navigation */}
      <nav role="navigation" aria-label="Główna nawigacja" style={{
        position: 'sticky',
        top: 0,
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid #e1e8ed',
        padding: '15px 5%',
        zIndex: 1000,
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '24px',
            fontWeight: '800',
            color: '#2c5aa0',
          }}>
            📋 Pomocnik Obywatela
          </div>
          
          <div style={{
            gap: '30px',
            alignItems: 'center',
          }} className="mobile-menu">
            <a href="#funkcje" onClick={() => trackEvent('click_nav_funkcje', { category: 'navigation', label: 'funkcje' })} style={{ color: '#2c3e50', textDecoration: 'none', fontWeight: '600' }}>Funkcje</a>
            <a href="#screenshots" onClick={() => trackEvent('click_nav_screenshots', { category: 'navigation', label: 'screenshots' })} style={{ color: '#2c3e50', textDecoration: 'none', fontWeight: '600' }}>Aplikacja</a>
            <a href="https://pisma.pomocnikobywatela.pl" target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('click_nav_generator', { category: 'navigation', label: 'generator' })} style={{ color: '#10b981', textDecoration: 'none', fontWeight: '600' }}>Generator AI</a>
            <a href="#jak-dziala" onClick={() => trackEvent('click_nav_jakdziala', { category: 'navigation', label: 'jak_dziala' })} style={{ color: '#2c3e50', textDecoration: 'none', fontWeight: '600' }}>Jak działa</a>
            <a href="#faq" onClick={() => trackEvent('click_nav_faq', { category: 'navigation', label: 'faq' })} style={{ color: '#2c3e50', textDecoration: 'none', fontWeight: '600' }}>FAQ</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%)',
        padding: '80px 5%',
        textAlign: 'center',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <div style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, #e8f4f8 0%, #d6ebf5 100%)',
            color: '#2c5aa0',
            padding: '8px 20px',
            borderRadius: '30px',
            fontSize: '14px',
            fontWeight: '700',
            marginBottom: '25px',
            border: '2px solid #2c5aa0'
          }}>
            🚀 Asystent AI dla Obywateli
          </div>
          
          <h1 style={{
            fontSize: '52px',
            fontWeight: '900',
            color: '#2c3e50',
            marginBottom: '25px',
            lineHeight: '1.2'
          }}>
            Wszystkie świadczenia publiczne<br/>
            <span style={{
              background: 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              w jednym miejscu
            </span>
          </h1>
          
          <p style={{
            fontSize: '20px',
            color: '#5a6c7d',
            marginBottom: '40px',
            maxWidth: '700px',
            margin: '0 auto 40px',
            lineHeight: '1.6'
          }}>
            Asystent ze sztuczną inteligencją, który w sekundach znajdzie dla Ciebie odpowiednie świadczenia, dotacje i dokumenty. Bez skomplikowanych formularzy, bez biurokracji.
          </p>

          <div style={{
            display: 'flex',
            gap: '20px',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            marginBottom: '30px'
          }}>
            <a
              href="https://app.pomocnikobywatela.pl"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleCtaClick('hero_app_launch')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                background: 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)',
                color: 'white',
                padding: '18px 40px',
                borderRadius: '12px',
                fontSize: '18px',
                fontWeight: '700',
                textDecoration: 'none',
                boxShadow: '0 10px 30px rgba(44, 90, 160, 0.3)',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(44, 90, 160, 0.4)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(44, 90, 160, 0.3)';
              }}
            >
              Otwórz Aplikację <ArrowRight size={24} />
            </a>

            <a
              href="https://pisma.pomocnikobywatela.pl"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleCtaClick('hero_pisma_generator')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                background: 'white',
                color: '#2c5aa0',
                padding: '18px 40px',
                borderRadius: '12px',
                fontSize: '18px',
                fontWeight: '700',
                textDecoration: 'none',
                border: '3px solid #2c5aa0',
                boxShadow: '0 10px 30px rgba(44, 90, 160, 0.15)',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(44, 90, 160, 0.25)';
                e.currentTarget.style.background = '#f8fafc';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(44, 90, 160, 0.15)';
                e.currentTarget.style.background = 'white';
              }}
            >
              <FileText size={24} />
              Generator Pism AI
            </a>
          </div>

          <div style={{
            display: 'flex',
            gap: '30px',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            color: '#5a6c7d',
            fontSize: '14px',
            marginTop: '40px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Shield size={20} color="#10b981" />
              <span>Oficjalne źródła</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle size={20} color="#10b981" />
              <span>Aktualne przepisy</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Users size={20} color="#10b981" />
              <span>Dla wszystkich obywateli</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section 
        id="jak-dziala"
        data-animate
        style={{
          padding: '80px 5%',
          background: 'white',
          width: '100%',
          boxSizing: 'border-box',
          opacity: visibleSections.has('jak-dziala') ? 1 : 0,
          transform: visibleSections.has('jak-dziala') ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s'
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{
              fontSize: '42px',
              fontWeight: '900',
              color: '#2c3e50',
              marginBottom: '15px'
            }}>
              Jak to działa?
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#5a6c7d',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Trzy proste kroki do uzyskania pomocy
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '40px'
          }}>
            {howItWorks.map((step, idx) => (
              <div key={idx} style={{
                position: 'relative',
                textAlign: 'center',
                padding: '30px'
              }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  color: 'white',
                  fontSize: '32px',
                  fontWeight: '900'
                }}>
                  {step.step}
                </div>
                <div style={{
                  color: '#2c5aa0',
                  marginBottom: '15px',
                  display: 'flex',
                  justifyContent: 'center'
                }}>
                  {step.icon}
                </div>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: '800',
                  color: '#2c3e50',
                  marginBottom: '12px'
                }}>
                  {step.title}
                </h3>
                <p style={{
                  fontSize: '16px',
                  color: '#5a6c7d',
                  lineHeight: '1.6'
                }}>
                  {step.description}
                </p>
                {idx < howItWorks.length - 1 && (
                  <div style={{
                    position: 'absolute',
                    right: '-20px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#2c5aa0',
                    display: window.innerWidth > 768 ? 'block' : 'none'
                  }}>
                    <ArrowRight size={32} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
<section 
  id="funkcje"
  data-animate
  style={{
    padding: '80px 5%',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%)',
    width: '100%',
    boxSizing: 'border-box',
    opacity: visibleSections.has('funkcje') ? 1 : 0,
    transform: visibleSections.has('funkcje') ? 'translateY(0)' : 'translateY(30px)',
    transition: 'opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s'
  }}
>
  <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
      <h2 style={{
        fontSize: '42px',
        fontWeight: '900',
        color: '#2c3e50',
        marginBottom: '15px'
      }}>
        Wszystko czego potrzebujesz
      </h2>
      <p style={{
        fontSize: '18px',
        color: '#5a6c7d',
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        Kompleksowe narzędzie do zarządzania sprawami urzędowymi
      </p>
    </div>

    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '30px'
    }}>
      {features.map((feature, idx) => (
        <div
          key={idx}
          onClick={() => trackEvent(`click_feature_${idx}`, {
            category: 'features',
            label: feature.title,
            feature_name: feature.title
          })}
          style={{
            background: 'white',
            padding: '40px',
            borderRadius: '16px',
            border: '2px solid #e1e8ed',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
            e.currentTarget.style.borderColor = feature.color;
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.borderColor = '#e1e8ed';
          }}
        >
          <div>
            <div style={{
              color: feature.color,
              marginBottom: '20px'
            }}>
              {feature.icon}
            </div>

            <h3 style={{
              fontSize: '24px',
              fontWeight: '800',
              color: '#2c3e50',
              marginBottom: '15px'
            }}>
              {feature.title}
            </h3>

            <p style={{
              fontSize: '16px',
              color: '#5a6c7d',
              lineHeight: '1.6',
              marginBottom: '25px'
            }}>
              {feature.description}
            </p>
          </div>

          <div style={{
            marginTop: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            {feature.benefits.map((benefit, bIdx) => (
              <div key={bIdx} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '14px',
                color: '#5a6c7d'
              }}>
                <CheckCircle size={16} color={feature.color} />
                {benefit}
              </div>
            ))}

            {/* Add Generator Link for "Baza Pism" feature */}
            {idx === 1 && (
              <a
                href="https://pisma.pomocnikobywatela.pl"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCtaClick('feature_pisma_generator');
                }}
                style={{
                  marginTop: '15px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 20px',
                  background: feature.color,
                  color: 'white',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontSize: '15px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  alignSelf: 'flex-start'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(16, 185, 129, 0.3)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Generuj Pismo AI <ArrowRight size={18} />
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Screenshots Section */}
      <section 
        id="screenshots"
        data-animate
        style={{
          padding: '80px 5%',
          background: 'white',
          width: '100%',
          boxSizing: 'border-box',
          opacity: visibleSections.has('screenshots') ? 1 : 0,
          transform: visibleSections.has('screenshots') ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s'
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{
              fontSize: '42px',
              fontWeight: '900',
              color: '#2c3e50',
              marginBottom: '15px'
            }}>
              Zobacz aplikację w akcji
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#5a6c7d',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Intuicyjny interfejs zaprojektowany z myślą o prostocie użytkowania
            </p>
          </div>

        <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                gap: '30px'
              }}>
                {screenshots.map((s, i) => (
                  <div
                    key={i}
                    style={{
                      background: '#f8f9fb',
                      borderRadius: '16px',
                      padding: '20px',
                      border: '2px solid #e1e8ed',
                      overflow: 'hidden',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onMouseOver={e => {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                    }}
                    onMouseOut={e => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      marginBottom: '15px'
                    }}>
                      {s.icon}
                      <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#2c3e50', margin: 0 }}>
                        {s.title}
                      </h3>
                    </div>

                    <div style={{
                      position: 'relative',
                      background: s.gradient,
                      borderRadius: '12px',
                      height: s.height,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '14px',
                      textAlign: 'center',
                      overflow: 'hidden'
                    }}>
                      <img
                        src={s.img}
                        alt={s.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }}
                      />
                      <button
                        onClick={() => setOpenImage(s.img)}
                        style={{
                          position: 'absolute',
                          bottom: '12px',
                          right: '12px',
                          background: 'rgba(0,0,0,0.6)',
                          border: 'none',
                          borderRadius: '50%',
                          padding: '10px',
                          cursor: 'pointer',
                          color: 'white',
                          fontSize: '18px',
                          transition: 'background 0.3s'
                        }}
                        onMouseOver={e => e.currentTarget.style.background = 'rgba(0,0,0,0.8)'}
                        onMouseOut={e => e.currentTarget.style.background = 'rgba(0,0,0,0.6)'}
                        title="Powiększ"
                      >
                        🔍
                      </button>
                    </div>

                    <p style={{ marginTop: '15px', color: '#5a6c7d', fontSize: '14px', lineHeight: '1.6' }}>
                      {s.description}
                    </p>
                  </div>
                ))}
              </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section 
        id="faq"
        data-animate
        style={{
          padding: '80px 5%',
          background: 'linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%)',
          width: '100%',
          boxSizing: 'border-box',
          opacity: visibleSections.has('faq') ? 1 : 0,
          transform: visibleSections.has('faq') ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s'
        }}
      >
        <div style={{ maxWidth: '900px', margin: '0 auto', width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{
              fontSize: '42px',
              fontWeight: '900',
              color: '#2c3e50',
              marginBottom: '15px'
            }}>
              Najczęściej zadawane pytania
            </h2>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                onClick={() => trackEvent(`click_faq_${idx}`, {
                  category: 'faq',
                  label: faq.q,
                  question: faq.q
                })}
                style={{
                  background: '#f8f9fb',
                  padding: '30px',
                  borderRadius: '12px',
                  border: '2px solid #e1e8ed',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = '#2c5aa0';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.08)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = '#e1e8ed';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  color: '#2c3e50',
                  marginBottom: '12px'
                }}>
                  {faq.q}
                </h3>
                <p style={{
                  fontSize: '16px',
                  color: '#5a6c7d',
                  lineHeight: '1.6'
                }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        data-animate
        style={{
          padding: '80px 5%',
          background: 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)',
          textAlign: 'center',
          color: 'white',
          width: '100%',
          boxSizing: 'border-box',
          opacity: visibleSections.has('faq') ? 1 : 0,
          transform: visibleSections.has('faq') ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.8s ease-out 0.4s, transform 0.8s ease-out 0.4s'
        }}
      >
        <div style={{ maxWidth: '900px', margin: '0 auto', width: '100%' }}>
          <h2 style={{
            fontSize: '42px',
            fontWeight: '900',
            marginBottom: '20px'
          }}>
            Zacznij już teraz!
          </h2>
          <p style={{
            fontSize: '20px',
            marginBottom: '40px',
            opacity: 0.9
          }}>
            Znajdź świadczenia, dotacje i dokumenty w kilka sekund
          </p>

          <a
            href="https://app.pomocnikobywatela.pl"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleCtaClick('final_app_launch')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              background: 'white',
              color: '#2c5aa0',
              padding: '20px 50px',
              borderRadius: '12px',
              fontSize: '20px',
              fontWeight: '700',
              textDecoration: 'none',
              boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 15px 50px rgba(0,0,0,0.4)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.3)';
            }}
          >
            Otwórz Aplikację <ArrowRight size={26} />
          </a>

          <p style={{
            fontSize: '16px',
            marginTop: '25px',
            opacity: 0.9
          }}>
            lub skorzystaj z{' '}
            <a
              href="https://pisma.pomocnikobywatela.pl"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleCtaClick('final_pisma_generator')}
              style={{
                color: 'white',
                textDecoration: 'underline',
                fontWeight: '700',
                transition: 'opacity 0.3s'
              }}
              onMouseOver={(e) => e.currentTarget.style.opacity = '0.8'}
              onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
            >
              Generatora Pism AI
            </a>
            {' '}(bez rejestracji)
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: '#2c3e50',
        color: 'white',
        padding: '40px 5%',
        textAlign: 'center',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '20px',
            marginBottom: '30px'
          }}>
            <div style={{
              fontSize: '24px',
              fontWeight: '800'
            }}>
              📋 Pomocnik Obywatela
            </div>
            <div style={{
              display: 'flex',
              gap: '30px',
              flexWrap: 'wrap'
            }}>
              <a href="#funkcje" style={{ color: 'white', textDecoration: 'none', opacity: 0.8 }}>Funkcje</a>
              <a href="#screenshots" style={{ color: 'white', textDecoration: 'none', opacity: 0.8 }}>Aplikacja</a>
              <a href="https://pisma.pomocnikobywatela.pl" target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'none', opacity: 0.8 }}>Generator Pism AI</a>
              <a href="#jak-dziala" style={{ color: 'white', textDecoration: 'none', opacity: 0.8 }}>Jak działa</a>
              <a href="#faq" style={{ color: 'white', textDecoration: 'none', opacity: 0.8 }}>FAQ</a>
              <a href="#" onClick={(e) => { e.preventDefault(); setShowPrivacyPolicy(true); }} style={{ color: 'white', textDecoration: 'none', opacity: 0.8, transition: 'background 0.3s' }}>Polityka prywatności</a>
              <a href="https://www.gov.pl" target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'none', opacity: 0.8 }}>Gov.pl</a>
            </div>
          </div>
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.2)',
            paddingTop: '20px',
            fontSize: '14px',
            opacity: 0.7
          }}>
            <p style={{ margin: '10px 0' }}>
              © 2025 Pomocnik Obywatela.
            </p>
            <p style={{ margin: '10px 0', fontSize: '12px' }}>
              Zawsze weryfikuj informacje na oficjalnych stronach instytucji. To narzędzie nie zastępuje profesjonalnej porady prawnej.
            </p>
          </div>
        </div>
      </footer>


      {/* Privacy Policy Modal */}
      {showPrivacyPolicy && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000,
          padding: '20px',
          animation: 'fadeIn 0.3s ease'
        }}>
          <div style={{
            background: 'white',
            padding: '40px',
            borderRadius: '16px',
            maxWidth: '800px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            position: 'relative',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
          }}>
            <button
              onClick={() => setShowPrivacyPolicy(false)}
              style={{
                top: '0',
                float: 'right',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#5a6c7d',
                fontSize: '24px',
                padding: '5px',
                transition: 'background 0.3s'
              }}
            >
              <X size={24} />
            </button>
            
            <h2 style={{
              fontSize: '32px',
              fontWeight: '900',
              color: '#2c3e50',
              marginBottom: '20px'
            }}>
              Polityka Prywatności
            </h2>

            <div style={{
              fontSize: '15px',
              color: '#5a6c7d',
              lineHeight: '1.8',
            }}>
              <p style={{ marginBottom: '15px' }}>
                <strong>Data ostatniej aktualizacji:</strong> {new Date().toLocaleDateString('pl-PL')}
              </p>

              <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#2c3e50', marginTop: '25px', marginBottom: '12px' }}>
                1. Administrator Danych
              </h3>
              <p style={{ marginBottom: '15px' }}>
                Administratorem Twoich danych osobowych jest właściciel serwisu "Pomocnik Obywatela". 
                Kontakt w sprawach związanych z ochroną danych osobowych: pomocnikobywatela@gmail.com.
              </p>

              <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#2c3e50', marginTop: '25px', marginBottom: '12px' }}>
                2. Jakie dane zbieramy?
              </h3>
              <p style={{ marginBottom: '15px' }}>
                Zbieramy wyłącznie Twój adres e-mail, który podajesz dobrowolnie poprzez formularze zapisu na stronie. 
                Nie zbieramy żadnych innych danych osobowych.
              </p>

              <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#2c3e50', marginTop: '25px', marginBottom: '12px' }}>
                3. Cel przetwarzania danych
              </h3>
              <p style={{ marginBottom: '10px' }}>
                Twój adres e-mail wykorzystujemy wyłącznie w celu:
              </p>
              <ul style={{ marginBottom: '15px', paddingLeft: '25px' }}>
                <li>wysyłania powiadomień o uruchomieniu serwisu,</li>
                <li>informowania o nowych funkcjach i aktualizacjach,</li>
                <li>przesyłania newslettera z informacjami o świadczeniach publicznych (za Twoją zgodą).</li>
              </ul>

              <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#2c3e50', marginTop: '25px', marginBottom: '12px' }}>
                4. Podstawa prawna przetwarzania
              </h3>
              <p style={{ marginBottom: '15px' }}>
                Przetwarzamy Twoje dane na podstawie:
              </p>
              <ul style={{ marginBottom: '15px', paddingLeft: '25px' }}>
                <li><strong>Art. 6 ust. 1 lit. a RODO</strong> – Twoja dobrowolna zgoda wyrażona poprzez zaznaczenie checkboxa przy zapisie na listę mailingową.</li>
                <li><strong>Art. 6 ust. 1 lit. f RODO</strong> – nasz prawnie uzasadniony interes w postaci komunikacji z zainteresowanymi użytkownikami.</li>
              </ul>

              <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#2c3e50', marginTop: '25px', marginBottom: '12px' }}>
                5. Jak długo przechowujemy dane?
              </h3>
              <p style={{ marginBottom: '15px' }}>
                Twój adres e-mail będzie przechowywany do momentu:
              </p>
              <ul style={{ marginBottom: '15px', paddingLeft: '25px' }}>
                <li>wycofania zgody na przetwarzanie danych,</li>
                <li>zgłoszenia sprzeciwu wobec przetwarzania,</li>
                <li>zrealizowania celu, w jakim zostały zebrane (maksymalnie do 3 lat od ostatniej interakcji).</li>
              </ul>

              <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#2c3e50', marginTop: '25px', marginBottom: '12px' }}>
                6. Udostępnianie danych
              </h3>
              <p style={{ marginBottom: '15px' }}>
                Twoje dane mogą być udostępniane wyłącznie:
              </p>
              <ul style={{ marginBottom: '15px', paddingLeft: '25px' }}>
                <li>dostawcom usług IT wspierających działanie serwisu (np. Google Sheets, hosting),</li>
                <li>dostawcom usług mailowych (jeśli wdrożymy system mailingowy).</li>
              </ul>
              <p style={{ marginBottom: '15px' }}>
                <strong>Nie sprzedajemy, nie udostępniamy ani nie przekazujemy Twoich danych osobowych stronom trzecim w celach marketingowych.</strong>
              </p>

              <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#2c3e50', marginTop: '25px', marginBottom: '12px' }}>
                7. Twoje prawa
              </h3>
              <p style={{ marginBottom: '10px' }}>
                Masz prawo do:
              </p>
              <ul style={{ marginBottom: '15px', paddingLeft: '25px' }}>
                <li><strong>dostępu</strong> do swoich danych osobowych,</li>
                <li><strong>sprostowania</strong> nieprawidłowych danych,</li>
                <li><strong>usunięcia</strong> danych ("prawo do bycia zapomnianym"),</li>
                <li><strong>ograniczenia przetwarzania</strong> danych,</li>
                <li><strong>przenoszenia</strong> danych,</li>
                <li><strong>wniesienia sprzeciwu</strong> wobec przetwarzania,</li>
                <li><strong>wycofania zgody</strong> w dowolnym momencie (bez wpływu na zgodność z prawem przetwarzania dokonanego przed jej wycofaniem).</li>
              </ul>
              <p style={{ marginBottom: '15px' }}>
                Aby skorzystać z tych praw, skontaktuj się z nami pod adresem: pomocnikobywatela@gmail.com.
              </p>

              <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#2c3e50', marginTop: '25px', marginBottom: '12px' }}>
                8. Bezpieczeństwo danych
              </h3>
              <p style={{ marginBottom: '15px' }}>
                Stosujemy odpowiednie środki techniczne i organizacyjne w celu zapewnienia bezpieczeństwa Twoich danych osobowych, 
                w tym szyfrowanie połączeń HTTPS oraz bezpieczne przechowywanie danych.
              </p>

              <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#2c3e50', marginTop: '25px', marginBottom: '12px' }}>
                9. Pliki cookies i analityka
              </h3>
              <p style={{ marginBottom: '15px' }}>
                Serwis może wykorzystywać pliki cookies oraz narzędzia analityczne (Google Analytics) w celu analizy ruchu i ulepszania usług. 
                Dane analityczne są przetwarzane w sposób zanonimizowany i nie są łączone z Twoim adresem e-mail.
              </p>

              <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#2c3e50', marginTop: '25px', marginBottom: '12px' }}>
                10. Prawo do skargi
              </h3>
              <p style={{ marginBottom: '15px' }}>
                Jeśli uważasz, że przetwarzanie Twoich danych osobowych narusza przepisy RODO, masz prawo wnieść skargę do organu nadzorczego – 
                Prezesa Urzędu Ochrony Danych Osobowych (PUODO).
              </p>

              <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#2c3e50', marginTop: '25px', marginBottom: '12px' }}>
                11. Zmiany w Polityce Prywatności
              </h3>
              <p style={{ marginBottom: '15px' }}>
                Zastrzegamy sobie prawo do wprowadzania zmian w niniejszej Polityce Prywatności. 
                Wszelkie zmiany będą publikowane na tej stronie wraz z datą ostatniej aktualizacji.
              </p>

              <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#2c3e50', marginTop: '25px', marginBottom: '12px' }}>
                12. Kontakt
              </h3>
              <p style={{ marginBottom: '15px' }}>
                W razie pytań dotyczących ochrony danych osobowych, skontaktuj się z nami:<br />
                <strong>E-mail:</strong> pomocnikobywatela@gmail.com
              </p>
            </div>

            <button
              onClick={() => setShowPrivacyPolicy(false)}
              style={{
                marginTop: '30px',
                background: 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)',
                color: 'white',
                border: 'none',
                padding: '12px 30px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '700',
                cursor: 'pointer',
                width: '100%'
              }}
            >
              Zamknij
            </button>
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {openImage && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            cursor: 'pointer',
            opacity: 1,
            animation: 'fadeIn 0.3s ease'
          }}
          onClick={() => setOpenImage(null)}
        >
          <button
            onClick={() => setOpenImage(null)}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'rgba(0,0,0,0.6)',
              border: 'none',
              borderRadius: '50%',
              padding: '10px',
              cursor: 'pointer',
              color: 'white',
              fontSize: '20px',
              zIndex: 10001,
              transition: 'background 0.3s'
            }}
            onMouseOver={e => e.currentTarget.style.background = 'rgba(0,0,0,0.8)'}
            onMouseOut={e => e.currentTarget.style.background = 'rgba(0,0,0,0.6)'}
            title="Zamknij"
          >
            <X size={20} />
          </button>

          <img
            src={openImage}
            alt="Enlarged"
            style={{
              maxWidth: '90%',
              maxHeight: '90%',
              borderRadius: '12px',
              transform: 'scale(1)',
              transition: 'transform 0.3s',
              cursor: 'default',
              animation: 'scaleIn 0.3s ease'
            }}
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}

      {/* Animacje CSS */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes scaleIn {
            from { transform: scale(0.8); }
            to { transform: scale(1); }
          }
          .mobile-menu {
            display: flex;
          }
          @media (max-width: 768px) {
            .mobile-menu {
              display: none;
            }
          }
        `}
      </style>
    </div>
    </>
  );
};

export default LandingPage;