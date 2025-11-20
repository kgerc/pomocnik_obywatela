# ✅ Checklist testowania SEO - Pomocnik Obywatela

## 🔍 Po wdrożeniu - Quick Check

### 1. Podstawowe pliki
- [ ] https://pomocnikobywatela.pl/ - strona ładuje się poprawnie
- [ ] https://pomocnikobywatela.pl/robots.txt - plik istnieje i jest dostępny
- [ ] https://pomocnikobywatela.pl/sitemap.xml - sitemap jest dostępna
- [ ] https://pomocnikobywatela.pl/manifest.json - manifest dla PWA działa

### 2. Meta tagi w `<head>`
Otwórz DevTools → Elements → sprawdź `<head>`:

- [ ] `<title>` - zawiera "Pomocnik Obywatela - Wszystkie świadczenia publiczne..."
- [ ] `<meta name="description">` - opis jest widoczny i ma ~160 znaków
- [ ] `<meta name="keywords">` - zawiera odpowiednie słowa kluczowe
- [ ] `<link rel="canonical">` - wskazuje na https://pomocnikobywatela.pl/
- [ ] `<meta property="og:title">` - Open Graph title
- [ ] `<meta property="og:image">` - obrazek OG (logo.png)
- [ ] `<meta name="twitter:card">` - Twitter Card meta tag
- [ ] `<link rel="manifest">` - link do manifest.json

### 3. Structured Data (JSON-LD)
Sprawdź w kodzie źródłowym czy są widoczne bloki `<script type="application/ld+json">`:

- [ ] WebSite schema
- [ ] Organization schema
- [ ] SoftwareApplication schema
- [ ] FAQPage schema
- [ ] BreadcrumbList schema

## 🧪 Narzędzia online do testowania

### Test 1: Google Rich Results Test
**URL:** https://search.google.com/test/rich-results

1. Wklej URL: `https://pomocnikobywatela.pl/`
2. Kliknij "Test URL"
3. **Oczekiwany rezultat:**
   - ✅ Valid structured data detected
   - ✅ FAQPage
   - ✅ Organization
   - ✅ BreadcrumbList
   - ⚠️ Warning dla SoftwareApplication (opcjonalne)

**Screenshot lokalizacja:** Zapisz jako `test-results/google-rich-results.png`

---

### Test 2: Schema Markup Validator
**URL:** https://validator.schema.org/

1. Wklej URL: `https://pomocnikobywatela.pl/`
2. Kliknij "Run Test"
3. **Oczekiwany rezultat:**
   - ✅ 0 Errors
   - ⚠️ Możliwe ostrzeżenia o opcjonalnych polach

**Screenshot lokalizacja:** Zapisz jako `test-results/schema-validator.png`

---

### Test 3: Facebook Sharing Debugger
**URL:** https://developers.facebook.com/tools/debug/

1. Wklej URL: `https://pomocnikobywatela.pl/`
2. Kliknij "Debug"
3. **Oczekiwany rezultat:**
   - ✅ Title: "Pomocnik Obywatela - Wszystkie świadczenia publiczne..."
   - ✅ Description jest widoczny
   - ✅ Image: logo.png wyświetla się poprawnie (1200x630px zalecane)
   - ✅ Type: website

**Akcje:**
- [ ] Kliknij "Scrape Again" jeśli cache jest stary
- [ ] Sprawdź preview jak wygląda post na Facebooku

**Screenshot lokalizacja:** Zapisz jako `test-results/facebook-og.png`

---

### Test 4: Twitter Card Validator
**URL:** https://cards-dev.twitter.com/validator

1. Wklej URL: `https://pomocnikobywatela.pl/`
2. Kliknij "Preview card"
3. **Oczekiwany rezultat:**
   - ✅ Card type: summary_large_image
   - ✅ Title wyświetla się
   - ✅ Description wyświetla się
   - ✅ Image (logo.png) jest widoczny

**Screenshot lokalizacja:** Zapisz jako `test-results/twitter-card.png`

---

### Test 5: Google Mobile-Friendly Test
**URL:** https://search.google.com/test/mobile-friendly

1. Wklej URL: `https://pomocnikobywatela.pl/`
2. Kliknij "Test URL"
3. **Oczekiwany rezultat:**
   - ✅ "Page is mobile-friendly"
   - ✅ Brak błędów usability
   - ✅ Text jest czytelny bez zoomowania
   - ✅ Linki nie są zbyt blisko siebie

**Screenshot lokalizacja:** Zapisz jako `test-results/mobile-friendly.png`

---

### Test 6: PageSpeed Insights
**URL:** https://pagespeed.web.dev/

1. Wklej URL: `https://pomocnikobywatela.pl/`
2. Kliknij "Analyze"
3. **Oczekiwane wyniki (cel):**

**Mobile:**
- [ ] Performance: 80+ (idealne: 90+)
- [ ] Accessibility: 90+
- [ ] Best Practices: 90+
- [ ] **SEO: 95+** ⭐ (to najważniejsze!)

**Desktop:**
- [ ] Performance: 90+ (idealne: 95+)
- [ ] Accessibility: 90+
- [ ] Best Practices: 90+
- [ ] **SEO: 100** ⭐

**Core Web Vitals:**
- [ ] LCP (Largest Contentful Paint): < 2.5s ✅
- [ ] FID (First Input Delay): < 100ms ✅
- [ ] CLS (Cumulative Layout Shift): < 0.1 ✅

**Potencjalne problemy do naprawy:**
- ⚠️ Image optimization (kompresja PNG → WebP)
- ⚠️ Unused JavaScript (może być OK jeśli < 20%)
- ⚠️ Cache policy (ustaw w hosting)

**Screenshot lokalizacja:** Zapisz jako `test-results/pagespeed-mobile.png` i `test-results/pagespeed-desktop.png`

---

### Test 7: Lighthouse (Chrome DevTools)
**Lokalne testowanie:**

1. Otwórz stronę: https://pomocnikobywatela.pl/
2. Kliknij F12 (DevTools)
3. Zakładka "Lighthouse"
4. Wybierz:
   - ✅ Performance
   - ✅ Accessibility
   - ✅ Best Practices
   - ✅ SEO
   - Device: Mobile
5. Kliknij "Analyze page load"

**Oczekiwany wynik SEO:**
```
SEO: 95-100 ✅

✅ Document has a <title> element
✅ Document has a meta description
✅ Page has successful HTTP status code
✅ Links have descriptive text
✅ Page is mobile friendly
✅ Document has a valid hreflang
✅ Document avoids plugins
✅ Document has a valid rel=canonical
✅ Robots.txt is valid
✅ Image elements have [alt] attributes
✅ Structured data is valid
```

**Screenshot lokalizacja:** Zapisz jako `test-results/lighthouse-mobile.png`

6. Powtórz dla Desktop
**Screenshot lokalizacja:** Zapisz jako `test-results/lighthouse-desktop.png`

---

## 🔧 Testowanie robots.txt

### Online
**URL:** https://support.google.com/webmasters/answer/6062598

lub bezpośrednio:

```bash
curl https://pomocnikobywatela.pl/robots.txt
```

**Oczekiwany output:**
```
# robots.txt for Pomocnik Obywatela

User-agent: *
Allow: /

Sitemap: https://pomocnikobywatela.pl/sitemap.xml
Crawl-delay: 1
```

- [ ] Plik zwraca status 200
- [ ] Zawiera link do sitemap
- [ ] Allow: / jest obecne

---

## 🗺️ Testowanie sitemap.xml

```bash
curl https://pomocnikobywatela.pl/sitemap.xml
```

**Oczekiwany rezultat:**
- [ ] XML jest valid (bez błędów parsowania)
- [ ] Zawiera 5 URL-i:
  - https://pomocnikobywatela.pl/
  - https://pomocnikobywatela.pl/#funkcje
  - https://pomocnikobywatela.pl/#screenshots
  - https://pomocnikobywatela.pl/#jak-dziala
  - https://pomocnikobywatela.pl/#faq
- [ ] Każdy URL ma `<lastmod>`, `<changefreq>`, `<priority>`
- [ ] Obrazy są załączone w `<image:image>`

**Walidacja:**
https://www.xml-sitemaps.com/validate-xml-sitemap.html

---

## 📊 Google Search Console - Setup (po wdrożeniu)

### Krok 1: Dodaj domenę
1. Przejdź do: https://search.google.com/search-console
2. Kliknij "Dodaj zasób"
3. Wybierz "Prefiks URL": `https://pomocnikobywatela.pl`
4. Zweryfikuj własność (meta tag lub plik HTML)

### Krok 2: Zgłoś Sitemap
1. W menu bocznym → Sitemaps
2. Wklej URL: `https://pomocnikobywatela.pl/sitemap.xml`
3. Kliknij "Prześlij"
4. **Status powinien być:** "Success" ✅

### Krok 3: Request Indexing
1. Wklej URL w górnym pasku Search Console
2. Kliknij "Request indexing"
3. Poczekaj 1-3 dni na indeksację

### Krok 4: Monitoruj
Sprawdzaj co tydzień:
- [ ] Coverage (Pokrycie indeksem)
- [ ] Performance (Wyświetlenia, kliknięcia, CTR)
- [ ] Mobile Usability
- [ ] Core Web Vitals

---

## 📱 Testowanie PWA Manifest

```bash
curl https://pomocnikobywatela.pl/manifest.json
```

**Oczekiwany output (JSON):**
```json
{
  "name": "Pomocnik Obywatela - Asystent AI",
  "short_name": "Pomocnik Obywatela",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#2c5aa0",
  ...
}
```

**Test w DevTools:**
1. F12 → Application → Manifest
2. **Sprawdź:**
   - [ ] Manifest wczytuje się bez błędów
   - [ ] Ikony są widoczne
   - [ ] "Install app" button działa (opcjonalne)

---

## 🎨 Open Graph Image Test

**Najważniejsze:**
- [ ] Logo.png ma wymiary 1200x630px (proporcje 1.91:1)
- [ ] Rozmiar < 1MB
- [ ] Format: PNG lub JPG
- [ ] Bez tekstu (lub z minimem tekstu)

**Test:**
1. Skopiuj link: https://pomocnikobywatela.pl/
2. Wklej na Facebooku lub LinkedIn (bez publikowania)
3. Zobacz preview

**Jeśli nie widać obrazka:**
- Wymiary są nieprawidłowe → zmień na 1200x630px
- Cache FB → użyj Facebook Debugger i kliknij "Scrape Again"

---

## ✅ Finalny Checklist przed produkcją

### Pre-deployment
- [x] Meta tagi dodane w index.html
- [x] robots.txt utworzony
- [x] sitemap.xml utworzony
- [x] manifest.json utworzony
- [x] Structured data (JSON-LD) dodane
- [x] SEO komponent zintegrowany
- [x] Build działa bez błędów (`npm run build`)

### Post-deployment
- [ ] Wszystkie pliki SEO dostępne publicznie
- [ ] Meta tagi widoczne w source code
- [ ] Google Rich Results Test - PASS
- [ ] Schema Validator - 0 Errors
- [ ] Facebook OG - preview OK
- [ ] Twitter Card - preview OK
- [ ] PageSpeed SEO score: 95+
- [ ] Lighthouse SEO score: 95+
- [ ] Mobile-Friendly Test - PASS
- [ ] Sitemap zgłoszona w Search Console
- [ ] Request indexing wykonane

### Po 7 dniach
- [ ] Sprawdź Google Search Console → Coverage
- [ ] Sprawdź pierwsze wyświetlenia w Search Console
- [ ] Monitoruj pozycje dla kluczowych fraz

### Po 30 dniach
- [ ] Analiza ruchu organicznego w GA4
- [ ] Sprawdź top queries w Search Console
- [ ] Optymalizuj content na podstawie danych

---

## 🐛 Troubleshooting

### Problem: "Page not indexed"
**Rozwiązanie:**
1. Sprawdź robots.txt - czy nie blokuje
2. Request indexing w Search Console
3. Sprawdź czy sitemap jest zgłoszona
4. Poczekaj 3-7 dni

### Problem: "Structured data not detected"
**Rozwiązanie:**
1. Sprawdź source code czy JSON-LD jest w `<body>`
2. Waliduj JSON w Schema Validator
3. Usuń zbędne przecinki lub błędy składni

### Problem: "Open Graph image not showing"
**Rozwiązanie:**
1. Sprawdź wymiary (muszą być 1200x630px)
2. Facebook Debugger → Scrape Again
3. Sprawdź czy URL jest HTTPS (nie HTTP)

### Problem: "Low SEO score in Lighthouse"
**Najczęstsze przyczyny:**
- Brak meta description
- Brak alt text w obrazkach
- Niepoprawne nagłówki (H1, H2)
- Broken links

---

## 📈 Monitoring długoterminowy

### Narzędzia do używania co tydzień:
1. **Google Search Console** - Performance, Coverage
2. **Google Analytics 4** - Organic traffic
3. **PageSpeed Insights** - Core Web Vitals

### Narzędzia do używania co miesiąc:
1. **SEMrush/Ahrefs** (opcjonalnie) - pozycje słów kluczowych
2. **GTmetrix** - wydajność strony
3. **Screaming Frog** (darmowa wersja) - technical SEO audit

---

## 🎯 Success Metrics

### Po 1 miesiącu:
- [ ] Strona widoczna w Google Search (search: `site:pomocnikobywatela.pl`)
- [ ] 10+ impressions dziennie w Search Console
- [ ] SEO score Lighthouse: 95+

### Po 3 miesiącach:
- [ ] 100+ impressions dziennie
- [ ] 5+ kliknięć dziennie
- [ ] Widoczność na 1+ frazy kluczowe

### Po 6 miesiącach:
- [ ] 500+ impressions dziennie
- [ ] 20+ kliknięć dziennie
- [ ] Top 10 pozycji dla głównych fraz

---

**Powodzenia! 🚀**

Zapisz wyniki testów w folderze `test-results/` i porównuj je co miesiąc!
