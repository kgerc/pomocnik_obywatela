import React, { useState, useEffect } from 'react';
import { MessageSquare, FileText, TrendingUp, Sparkles, Search, CheckCircle, ArrowRight, Users, Clock, Shield, Mail, X, Menu, ExternalLink, BarChart3, Monitor, Smartphone, Zap } from 'lucide-react';
import aiChatImg from './assets/ai_chat.png';
import aiPismaImg from './assets/ai_pisma.png';
import aiDotacjeImg from './assets/ai_dotacje.png';

const LandingPage = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [openImage, setOpenImage] = useState(null);
  const [analytics, setAnalytics] = useState({
    pageViews: 0,
    clicks: {},
    timeOnPage: 0,
    emailSignups: 0
  });

  const screenshots = [
  {
    title: 'AI Chat',
    icon: <MessageSquare size={24} color="#2c5aa0" />,
    img: aiChatImg,
    description: 'Zadaj pytanie w naturalnym języku, a AI natychmiast znajdzie odpowiednie świadczenia',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    height: '300px'
  },
  {
    title: 'Baza pism i wniosków',
    icon: <FileText size={24} color="#10b981" />,
    img: aiPismaImg,
    description: 'Podaj swoje dane, a otrzymasz spersonalizowane rekomendacje świadczeń',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    height: '300px'
  },
  {
    title: 'Dotacje',
    icon: <TrendingUp size={24} color="#f59e0b" />,
    img: aiDotacjeImg,
    description: 'Ponad 20 gotowych wzorów dokumentów do pobrania w jednym kliknięciu',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    height: '300px'
  }
];

  // Zamknięcie modala po Esc
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setOpenImage(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Intersection Observer do animacji sekcji
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
            
            // Track section view w GA4
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

  // Track scroll depth
  useEffect(() => {
    let maxScroll = 0;
    const trackedDepths = new Set();

    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        
        // Track milestones: 25%, 50%, 75%, 90%
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

  // Analytics tracking
  useEffect(() => {
    // Track page view
    trackEvent('page_view', {
      category: 'engagement',
      label: 'landing_page_view'
    });
    
    // Track time on page
    const startTime = Date.now();
    const interval = setInterval(() => {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      setAnalytics(prev => ({ ...prev, timeOnPage: timeSpent }));
      
      // Track milestone времени
      if (timeSpent === 30 || timeSpent === 60 || timeSpent === 120) {
        trackEvent('time_on_page', {
          category: 'engagement',
          label: `${timeSpent}_seconds`,
          value: timeSpent
        });
      }
    }, 1000);

    // Show email modal after 30 seconds
    const modalTimer = setTimeout(() => {
      if (!isSubmitted && !localStorage.getItem('emailSubmitted')) {
        setShowEmailModal(true);
        trackEvent('email_modal_shown', {
          category: 'engagement',
          label: 'auto_popup_30s'
        });
      }
    }, 30000);

    return () => {
      clearInterval(interval);
      clearTimeout(modalTimer);
      
      // Track session end
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
    // Zapisz lokalnie
    setAnalytics(prev => {
      const newAnalytics = { ...prev };
      
      if (eventName === 'page_view') {
        newAnalytics.pageViews = (prev.pageViews || 0) + 1;
      } else if (eventName.startsWith('click_')) {
        newAnalytics.clicks = {
          ...prev.clicks,
          [eventName]: (prev.clicks[eventName] || 0) + 1
        };
      } else if (eventName === 'email_signup') {
        newAnalytics.emailSignups = (prev.emailSignups || 0) + 1;
      }
      
      return newAnalytics;
    });

    // Wyślij do Google Analytics (jeśli zainstalowany)
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', eventName, {
        ...metadata,
        timestamp: new Date().toISOString()
      });
    }

    // Log do konsoli (development)
    console.log('📊 Analytics Event:', eventName, metadata, {
      timestamp: new Date().toISOString(),
      currentAnalytics: analytics
    });
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (email) {
      const emailData = {
        email,
        timestamp: new Date().toISOString(),
        source: showEmailModal ? 'modal' : 'hero',
        userAgent: navigator.userAgent,
        page: window.location.href
      };

      // Zapisz lokalnie (dla użytkownika)
      const existingEmails = JSON.parse(localStorage.getItem('emailList') || '[]');
      existingEmails.push(emailData);
      localStorage.setItem('emailList', JSON.stringify(existingEmails));
      localStorage.setItem('emailSubmitted', 'true');
      
      // Wyślij do Google Sheets (dla Ciebie)
      try {
        await fetch('TU_WKLEJ_URL_Z_GOOGLE_APPS_SCRIPT', {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(emailData)
        });
        console.log('✅ Email zapisany w Google Sheets');
      } catch (error) {
        console.error('❌ Błąd zapisu do Google Sheets:', error);
      }
      
      setIsSubmitted(true);
      setShowEmailModal(false);
      trackEvent('email_signup', { email, source: showEmailModal ? 'modal' : 'hero' });
      
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
      }, 3000);
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
      benefits: ['Odpowiedzi w sekundach', 'Język naturalny', 'Spersonalizowane wyniki'],
      color: '#2c5aa0'
    },
    {
      icon: <FileText size={32} />,
      title: 'Baza Pism i Wniosków',
      description: 'Gotowe wzory dokumentów do pobrania. Reklamacje, odwołania, wnioski - wszystko w jednym miejscu.',
      benefits: ['Ponad 20 wzorów', 'Gotowe do wypełnienia', 'Aktualne przepisy'],
      color: '#10b981'
    },
    {
      icon: <TrendingUp size={32} />,
      title: 'Dotacje i Granty 2024-2025',
      description: 'Aktywne programy dotacyjne dla firm, NGO, samorządów. Znajdź finansowanie na swój projekt.',
      benefits: ['25+ programów', 'Filtry inteligentne', 'Terminy naborów'],
      color: '#f59e0b'
    }
  ];

  const stats = [
    { number: '30+', label: 'Świadczeń w bazie', icon: <CheckCircle size={24} /> },
    { number: '20+', label: 'Wzorów dokumentów', icon: <FileText size={24} /> },
    { number: '25+', label: 'Programów dotacyjnych', icon: <TrendingUp size={24} /> },
    { number: '24/7', label: 'Dostępność AI', icon: <Clock size={24} /> }
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
      a: 'Tak, podstawowe funkcje są całkowicie bezpłatne. Chcemy, aby każdy obywatel miał dostęp do rzetelnych informacji o świadczeniach.'
    },
    {
      q: 'Czy informacje są aktualne?',
      a: 'Regularnie aktualizujemy bazę danych, śledząc zmiany w przepisach. Ostatnia aktualizacja: marzec 2024.'
    },
    {
      q: 'Czy mogę zaufać informacjom od AI?',
      a: 'AI korzysta wyłącznie z oficjalnych źródeł (gov.pl, ZUS, PFRON). Zawsze linkujemy do źródeł, abyś mógł zweryfikować informacje.'
    },
    {
      q: 'Czy moje dane są bezpieczne?',
      a: 'Nie zbieramy danych osobowych. Pytania są anonimowe, a historia rozmów przechowywana lokalnie w Twojej przeglądarce.'
    }
  ];

  return (
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
      <nav style={{
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
          maxWidth: '1400px',
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
            marginLeft: '100px'
          }}>
            📋 Pomocnik Obywatela
          </div>
          
          <div style={{
            display: 'flex',
            gap: '30px',
            alignItems: 'center',
            marginRight: '115px'
          }}>
            <a href="#funkcje" onClick={() => trackEvent('click_nav_funkcje', { category: 'navigation', label: 'funkcje' })} style={{ color: '#2c3e50', textDecoration: 'none', fontWeight: '600' }}>Funkcje</a>
            <a href="#screenshots" onClick={() => trackEvent('click_nav_screenshots', { category: 'navigation', label: 'screenshots' })} style={{ color: '#2c3e50', textDecoration: 'none', fontWeight: '600' }}>Screenshots</a>
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

          {!isSubmitted ? (
            <form onSubmit={handleEmailSubmit} style={{
              display: 'flex',
              gap: '10px',
              maxWidth: '500px',
              margin: '0 auto 30px',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}>
              <input
                type="email"
                placeholder="Twój email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  flex: '1',
                  minWidth: '250px',
                  padding: '15px 20px',
                  fontSize: '16px',
                  background: 'rgba(255, 255, 255, 0.87)',
                  border: '2px solid #e1e8ed',
                  borderRadius: '8px',
                  outline: 'none'
                }}
              />
              <button
                type="submit"
                onClick={() => handleCtaClick('hero_email')}
                style={{
                  background: 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '15px 30px',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                Dołącz do listy <ArrowRight size={20} />
              </button>
            </form>
          ) : (
            <div style={{
              background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
              padding: '15px 30px',
              borderRadius: '8px',
              maxWidth: '500px',
              margin: '0 auto 30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              color: '#059669',
              fontWeight: '600'
            }}>
              <CheckCircle size={24} />
              Dziękujemy! Powiadomimy Cię o nowościach.
            </div>
          )}

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

      {/* Stats Section */}
      <section 
        id="stats-section"
        data-animate
        style={{
          padding: '60px 5%',
          background: 'white',
          width: '100%',
          boxSizing: 'border-box',
          opacity: visibleSections.has('stats-section') ? 1 : 0,
          transform: visibleSections.has('stats-section') ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
        }}
      >
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '30px'
        }}>
          {stats.map((stat, idx) => (
            <div key={idx} style={{
              textAlign: 'center',
              padding: '30px',
              background: '#f8f9fb',
              borderRadius: '12px',
              border: '2px solid #e1e8ed'
            }}>
              <div style={{
                color: '#2c5aa0',
                marginBottom: '15px',
                display: 'flex',
                justifyContent: 'center'
              }}>
                {stat.icon}
              </div>
              <div style={{
                fontSize: '36px',
                fontWeight: '900',
                color: '#2c3e50',
                marginBottom: '8px'
              }}>
                {stat.number}
              </div>
              <div style={{
                fontSize: '16px',
                color: '#5a6c7d',
                fontWeight: '600'
              }}>
                {stat.label}
              </div>
            </div>
          ))}
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
                  cursor: 'pointer'
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
                  marginBottom: '20px'
                }}>
                  {feature.description}
                </p>
                <div style={{
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
                      {/* Ikona lupy */}
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

      {/* How It Works */}
      <section 
        id="jak-dziala"
        data-animate
        style={{
          padding: '80px 5%',
          background: 'linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%)',
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

      {/* FAQ Section */}
      <section 
        id="faq"
        data-animate
        style={{
          padding: '80px 5%',
          background: 'white',
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
            Gotowy, aby zacząć?
          </h2>
          <p style={{
            fontSize: '20px',
            marginBottom: '40px',
            opacity: 0.9
          }}>
            Dołącz do listy i bądź na bieżąco z nowościami
          </p>
          
          {!isSubmitted ? (
            <form onSubmit={handleEmailSubmit} style={{
              display: 'flex',
              gap: '10px',
              maxWidth: '500px',
              margin: '0 auto',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}>
              <input
                type="email"
                placeholder="Twój email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  flex: '1',
                  minWidth: '250px',
                  padding: '15px 20px',
                  fontSize: '16px',
                  border: '2px solid white',
                  background: 'rgba(255, 255, 255, 0.87)',
                  borderRadius: '8px',
                  outline: 'none'
                }}
              />
              <button
                type="submit"
                onClick={() => handleCtaClick('final_email')}
                style={{
                  background: 'white',
                  color: '#2c5aa0',
                  border: 'none',
                  padding: '15px 30px',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                }}
              >
                Zapisz się <ArrowRight size={20} />
              </button>
            </form>
          ) : (
            <div style={{
              background: 'rgba(255, 255, 255, 0.2)',
              padding: '15px 30px',
              borderRadius: '8px',
              maxWidth: '500px',
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              fontWeight: '600',
              backdropFilter: 'blur(10px)'
            }}>
              <CheckCircle size={24} />
              Dziękujemy za zapis!
            </div>
          )}
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
              <a href="#screenshots" style={{ color: 'white', textDecoration: 'none', opacity: 0.8 }}>Screenshots</a>
              <a href="#jak-dziala" style={{ color: 'white', textDecoration: 'none', opacity: 0.8 }}>Jak działa</a>
              <a href="#faq" style={{ color: 'white', textDecoration: 'none', opacity: 0.8 }}>FAQ</a>
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
              © 2024 Pomocnik Obywatela. Projekt edukacyjny powered by AI.
            </p>
            <p style={{ margin: '10px 0' }}>
              Źródła informacji: Gov.pl, ZUS, PFRON, NFOŚiGW
            </p>
            <p style={{ margin: '10px 0', fontSize: '12px' }}>
              Zawsze weryfikuj informacje na oficjalnych stronach instytucji. To narzędzie nie zastępuje profesjonalnej porady prawnej.
            </p>
          </div>
        </div>
      </footer>

      {/* Email Modal */}
      {showEmailModal && !localStorage.getItem('emailSubmitted') && (
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
          padding: '20px'
        }}>
          <div style={{
            background: 'white',
            padding: '40px',
            borderRadius: '16px',
            maxWidth: '500px',
            width: '100%',
            position: 'relative',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
          }}>
            <button
              onClick={() => {
                setShowEmailModal(false);
                trackEvent('click_modal_close', {
                  category: 'engagement',
                  label: 'email_modal_dismissed'
                });
              }}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#5a6c7d'
              }}
            >
              <X size={24} />
            </button>
            
            <div style={{
              textAlign: 'center',
              marginBottom: '25px'
            }}>
              <div style={{
                fontSize: '48px',
                marginBottom: '15px'
              }}>
                🎉
              </div>
              <h3 style={{
                fontSize: '28px',
                fontWeight: '800',
                color: '#2c3e50',
                marginBottom: '12px'
              }}>
                Nie przegap nowości!
              </h3>
              <p style={{
                fontSize: '16px',
                color: '#5a6c7d',
                lineHeight: '1.6'
              }}>
                Dołącz do ekskluzywnej listy i dowiedz się pierwszy o nowych funkcjach, świadczeniach i aktualizacjach.
              </p>
            </div>

            <form onSubmit={handleEmailSubmit} style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '15px'
            }}>
              <input
                type="email"
                placeholder="Twój adres email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  padding: '15px 20px',
                  fontSize: '16px',
                  border: '2px solid #e1e8ed',
                  background: 'rgba(255, 255, 255, 0.87)',
                  borderRadius: '8px',
                  outline: 'none'
                }}
              />
              <button
                type="submit"
                onClick={() => handleCtaClick('modal_email')}
                style={{
                  background: 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '15px 30px',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px'
                }}
              >
                <Mail size={20} />
                Zapisz mnie
              </button>
            </form>

            <p style={{
              fontSize: '12px',
              color: '#999',
              textAlign: 'center',
              marginTop: '15px'
            }}>
              Nie wysyłamy spamu. Możesz zrezygnować w każdej chwili.
            </p>
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
          {/* Przycisk zamykania */}
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
        `}
      </style>
    </div>
  );
};

export default LandingPage;