import React, { useState, useEffect } from 'react';
import { MessageSquare, FileText, TrendingUp, Sparkles, Search, CheckCircle, ArrowRight, Users, Clock, Shield, Mail, X, Menu, ExternalLink, BarChart3 } from 'lucide-react';

const LandingPage = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [analytics, setAnalytics] = useState({
    pageViews: 0,
    clicks: {},
    timeOnPage: 0,
    emailSignups: 0
  });

  // Analytics tracking
  useEffect(() => {
    // Track page view
    trackEvent('page_view');
    
    // Track time on page
    const startTime = Date.now();
    const interval = setInterval(() => {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      setAnalytics(prev => ({ ...prev, timeOnPage: timeSpent }));
    }, 1000);

    // Show email modal after 30 seconds
    const modalTimer = setTimeout(() => {
      if (!isSubmitted && !localStorage.getItem('emailSubmitted')) {
        setShowEmailModal(true);
        trackEvent('email_modal_shown');
      }
    }, 30000);

    return () => {
      clearInterval(interval);
      clearTimeout(modalTimer);
    };
  }, []);

  // Load analytics from localStorage
  useEffect(() => {
    const savedAnalytics = localStorage.getItem('analytics');
    if (savedAnalytics) {
      setAnalytics(JSON.parse(savedAnalytics));
    }
  }, []);

  // Save analytics to localStorage
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
      } else if (eventName === 'email_signup') {
        newAnalytics.emailSignups = (prev.emailSignups || 0) + 1;
      }
      
      return newAnalytics;
    });

    // Log to console for demonstration (in production, send to analytics service)
    console.log('📊 Analytics Event:', eventName, metadata, {
      timestamp: new Date().toISOString(),
      currentAnalytics: analytics
    });
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email) {
      // Save to localStorage (in production, send to backend)
      const existingEmails = JSON.parse(localStorage.getItem('emailList') || '[]');
      existingEmails.push({
        email,
        timestamp: new Date().toISOString(),
        source: showEmailModal ? 'modal' : 'hero'
      });
      localStorage.setItem('emailList', JSON.stringify(existingEmails));
      localStorage.setItem('emailSubmitted', 'true');
      
      setIsSubmitted(true);
      setShowEmailModal(false);
      trackEvent('email_signup', { email, source: showEmailModal ? 'modal' : 'hero' });
      
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }
  };

  const handleCtaClick = (ctaName) => {
    trackEvent(`click_cta_${ctaName}`);
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
      background: '#ffffff',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Navigation */}
      <nav style={{
        position: 'sticky',
        top: 0,
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid #e1e8ed',
        padding: '15px 20px',
        zIndex: 1000,
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '24px',
            fontWeight: '800',
            color: '#2c5aa0'
          }}>
            📋 Pomocnik Obywatela
          </div>
          
          {/* Desktop Menu */}
          <div style={{
            display: 'flex',
            gap: '30px',
            alignItems: 'center'
          }}>
            <a href="#funkcje" onClick={() => trackEvent('click_nav_funkcje')} style={{ color: '#2c3e50', textDecoration: 'none', fontWeight: '600' }}>Funkcje</a>
            <a href="#jak-dziala" onClick={() => trackEvent('click_nav_jakdziala')} style={{ color: '#2c3e50', textDecoration: 'none', fontWeight: '600' }}>Jak działa</a>
            <a href="#faq" onClick={() => trackEvent('click_nav_faq')} style={{ color: '#2c3e50', textDecoration: 'none', fontWeight: '600' }}>FAQ</a>
            <button
              onClick={() => {
                handleCtaClick('nav');
                window.location.href = '/app';
              }}
              style={{
                background: 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)',
                color: 'white',
                border: 'none',
                padding: '10px 25px',
                borderRadius: '8px',
                fontWeight: '700',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              Otwórz aplikację
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%)',
        padding: '80px 20px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
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
            🚀 Powered by AI - Darmowe dla wszystkich
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
            AI-powered asystent, który w sekundach znajdzie dla Ciebie odpowiednie świadczenia, dotacje i dokumenty. Bez skomplikowanych formularzy, bez biurokracji.
          </p>

          {/* Email Signup Form */}
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
            gap: '15px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '40px'
          }}>
            <button
              onClick={() => {
                handleCtaClick('hero_start');
                window.location.href = '/app';
              }}
              style={{
                background: 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)',
                color: 'white',
                border: 'none',
                padding: '18px 40px',
                borderRadius: '12px',
                fontSize: '18px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: '0 10px 30px rgba(44, 90, 160, 0.3)'
              }}
            >
              <Sparkles size={24} />
              Rozpocznij za darmo
            </button>
            
            <button
              onClick={() => {
                handleCtaClick('hero_demo');
                document.getElementById('jak-dziala').scrollIntoView({ behavior: 'smooth' });
              }}
              style={{
                background: 'white',
                color: '#2c5aa0',
                border: '2px solid #2c5aa0',
                padding: '18px 40px',
                borderRadius: '12px',
                fontSize: '18px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              Zobacz jak działa
            </button>
          </div>

          {/* Trust Indicators */}
          <div style={{
            display: 'flex',
            gap: '30px',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            color: '#5a6c7d',
            fontSize: '14px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Shield size={20} color="#10b981" />
              <span>100% bezpłatne</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle size={20} color="#10b981" />
              <span>Oficjalne źródła</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Users size={20} color="#10b981" />
              <span>Dla wszystkich obywateli</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{
        padding: '60px 20px',
        background: 'white'
      }}>
        <div style={{
          maxWidth: '1000px',
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
      <section id="funkcje" style={{
        padding: '80px 20px',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%)'
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
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
                onClick={() => trackEvent(`click_feature_${idx}`)}
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

      {/* How It Works */}
      <section id="jak-dziala" style={{
        padding: '80px 20px',
        background: 'white'
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
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
      <section id="faq" style={{
        padding: '80px 20px',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%)'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
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
                onClick={() => trackEvent(`click_faq_${idx}`)}
                style={{
                  background: 'white',
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
      <section style={{
        padding: '80px 20px',
        background: 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)',
        textAlign: 'center',
        color: 'white'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
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
            Dołącz do tysięcy obywateli, którzy już korzystają z Pomocnika
          </p>
          <button
            onClick={() => {
              handleCtaClick('final');
              window.location.href = '/app';
            }}
            style={{
              background: 'white',
              color: '#2c5aa0',
              border: 'none',
              padding: '18px 50px',
              borderRadius: '12px',
              fontSize: '20px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
            }}
          >
            Otwórz aplikację bezpłatnie <ArrowRight size={24} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: '#2c3e50',
        color: 'white',
        padding: '40px 20px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
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
                trackEvent('click_modal_close');
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

      {/* Analytics Dashboard (visible only in dev mode - remove in production) */}
      {window.location.hostname === 'localhost' && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          background: 'white',
          padding: '15px',
          borderRadius: '8px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
          fontSize: '12px',
          maxWidth: '250px',
          zIndex: 1000
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '10px',
            fontWeight: '700',
            color: '#2c5aa0'
          }}>
            <BarChart3 size={16} />
            Analytics Dashboard
          </div>
          <div style={{ color: '#5a6c7d', lineHeight: '1.8' }}>
            <div>👁️ Page views: {analytics.pageViews}</div>
            <div>⏱️ Time on page: {analytics.timeOnPage}s</div>
            <div>📧 Email signups: {analytics.emailSignups}</div>
            <div>🖱️ Total clicks: {Object.values(analytics.clicks).reduce((a, b) => a + b, 0)}</div>
          </div>
          <button
            onClick={() => {
              const emails = JSON.parse(localStorage.getItem('emailList') || '[]');
              console.log('📧 Collected emails:', emails);
              console.log('📊 Full analytics:', analytics);
              alert(`Emails collected: ${emails.length}\nCheck console for details`);
            }}
            style={{
              marginTop: '10px',
              width: '100%',
              padding: '8px',
              background: '#2c5aa0',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '11px'
            }}
          >
            View Full Data
          </button>
        </div>
      )}
    </div>
  );
};

export default LandingPage;