import React, { useState, useEffect } from 'react';
import { Search, FileText, ExternalLink, Download, Loader, CheckCircle, AlertCircle, MessageSquare, Sparkles, Star, User, Bell, History, Trash2, Heart, Settings, Edit, Mail, TrendingUp, Building2, Briefcase } from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";


// Baza danych dotacji (aktywne programy 2024-2025)
const dotacjeDB = [
  {
    id: 'fundusze-europejskie-rozwoj',
    nazwa: 'Fundusze Europejskie dla Rozwoju Społecznego 2021-2027',
    sektor: 'Rozwój społeczny',
    beneficjenci: ['NGO', 'Jednostki samorządu terytorialnego', 'Instytucje pomocy społecznej'],
    kwota_max: '5 000 000 zł',
    opis: 'Wsparcie projektów z zakresu włączenia społecznego, zatrudnienia, edukacji i zdrowia.',
    termin: 'Nabory ciągłe do 2027',
    link: 'https://www.funduszeeuropejskie.gov.pl/fers',
    status: 'aktywna',
    slowa_kluczowe: ['fundusze europejskie', 'rozwój społeczny', 'NGO', 'włączenie', 'edukacja']
  },
  {
    id: 'kpo-energia',
    nazwa: 'KPO - Energia dla Przedsiębiorstw',
    sektor: 'Energia i klimat',
    beneficjenci: ['Przedsiębiorstwa', 'MŚP'],
    kwota_max: '50 000 000 zł',
    opis: 'Dofinansowanie na projekty OZE, magazyny energii, efektywność energetyczną dla firm.',
    termin: 'Nabory do 2026',
    link: 'https://www.gov.pl/web/klimat/kpo-energia',
    status: 'aktywna',
    slowa_kluczowe: ['KPO', 'energia', 'OZE', 'fotowoltaika', 'przedsiębiorstwa', 'efektywność']
  },
  {
    id: 'feng-innowacje',
    nazwa: 'FENG - Wsparcie innowacji w MŚP',
    sektor: 'Innowacje',
    beneficjenci: ['MŚP', 'Startupy'],
    kwota_max: '10 000 000 zł',
    opis: 'Finansowanie projektów B+R, wdrożeń innowacyjnych rozwiązań, cyfryzacji przedsiębiorstw.',
    termin: 'Nabory kwartalne do 2027',
    link: 'https://www.parp.gov.pl/feng',
    status: 'aktywna',
    slowa_kluczowe: ['FENG', 'innowacje', 'B+R', 'badania', 'rozwój', 'MŚP', 'startup']
  },
  {
    id: 'arimr-modernizacja',
    nazwa: 'PROW - Modernizacja gospodarstw rolnych',
    sektor: 'Rolnictwo',
    beneficjenci: ['Rolnicy', 'Młodzi rolnicy'],
    kwota_max: '500 000 zł',
    opis: 'Wsparcie inwestycji w gospodarstwach rolnych, zakup maszyn, budowa budynków.',
    termin: 'Nabory 2x rocznie',
    link: 'https://www.arimr.gov.pl/prow',
    status: 'aktywna',
    slowa_kluczowe: ['rolnictwo', 'PROW', 'ARIMR', 'modernizacja', 'gospodarstwo', 'maszyny']
  },
  {
    id: 'ncbr-strategmed',
    nazwa: 'STRATEGMED - Badania medyczne',
    sektor: 'Nauka i zdrowie',
    beneficjenci: ['Uczelnie', 'Instytuty badawcze', 'Szpitale'],
    kwota_max: '20 000 000 zł',
    opis: 'Finansowanie zaawansowanych badań medycznych i klinicznych.',
    termin: 'Nabór 1x rocznie',
    link: 'https://www.ncbr.gov.pl/strategmed',
    status: 'aktywna',
    slowa_kluczowe: ['medycyna', 'badania', 'NCBR', 'zdrowie', 'kliniczne', 'nauka']
  },
  {
    id: 'nfosigw-cieplo-systemowe',
    nazwa: 'NFOŚiGW - Rozwój ciepłownictwa systemowego',
    sektor: 'Energia i klimat',
    beneficjenci: ['Gminy', 'Przedsiębiorstwa ciepłownicze'],
    kwota_max: '100 000 000 zł',
    opis: 'Modernizacja i rozwój sieci ciepłowniczych, budowa źródeł OZE.',
    termin: 'Nabory ciągłe',
    link: 'https://www.nfosigw.gov.pl/cieplownictwo',
    status: 'aktywna',
    slowa_kluczowe: ['ciepłownictwo', 'ciepło', 'NFOŚiGW', 'OZE', 'gmina', 'sieć']
  },
  {
    id: 'digital-poland',
    nazwa: 'Program Polska Cyfrowa - Gigabit',
    sektor: 'Technologie',
    beneficjenci: ['Gminy', 'Operatorzy telekomunikacyjni'],
    kwota_max: '50 000 000 zł',
    opis: 'Budowa szerokopasmowej infrastruktury internetowej na terenach wykluczonych cyfrowo.',
    termin: 'Nabory do 2026',
    link: 'https://www.gov.pl/web/polskacyfrowa',
    status: 'aktywna',
    slowa_kluczowe: ['cyfryzacja', 'internet', 'szerokopasmowy', 'infrastruktura', 'gmina']
  },
  {
    id: 'parp-innowacje-spoleczne',
    nazwa: 'PARP - Inkubator Innowacyjności',
    sektor: 'Przedsiębiorczość społeczna',
    beneficjenci: ['Przedsiębiorstwa społeczne', 'NGO', 'Spółdzielnie socjalne'],
    kwota_max: '500 000 zł',
    opis: 'Wsparcie przedsiębiorstw społecznych i innowacyjnych projektów społecznych.',
    termin: 'Nabory kwartalne',
    link: 'https://www.parp.gov.pl/inkubator',
    status: 'aktywna',
    slowa_kluczowe: ['przedsiębiorczość społeczna', 'NGO', 'innowacje społeczne', 'PARP']
  },
  {
    id: 'bgk-gwarancje',
    nazwa: 'BGK - Gwarancje de minimis',
    sektor: 'Finansowanie',
    beneficjenci: ['MŚP', 'Przedsiębiorcy'],
    kwota_max: 'Gwarancja do 60% kredytu',
    opis: 'Gwarancje spłaty kredytów dla małych i średnich przedsiębiorstw.',
    termin: 'Dostępne przez cały rok',
    link: 'https://www.bgk.pl/gwarancje',
    status: 'aktywna',
    slowa_kluczowe: ['gwarancje', 'BGK', 'kredyt', 'MŚP', 'finansowanie', 'de minimis']
  },
  {
    id: 'nck-kultura',
    nazwa: 'NCK - Kultura w sieci',
    sektor: 'Kultura',
    beneficjenci: ['Instytucje kultury', 'Artyści', 'NGO'],
    kwota_max: '300 000 zł',
    opis: 'Wsparcie cyfryzacji i promocji kultury online, projekty artystyczne.',
    termin: 'Nabory 2x rocznie',
    link: 'https://www.nck.pl/dotacje',
    status: 'aktywna',
    slowa_kluczowe: ['kultura', 'NCK', 'cyfryzacja', 'sztuka', 'artyści', 'online']
  },
  {
    id: 'ncn-sonata',
    nazwa: 'NCN - SONATA (granty badawcze)',
    sektor: 'Nauka',
    beneficjenci: ['Młodzi naukowcy', 'Doktoranci'],
    kwota_max: '1 500 000 zł',
    opis: 'Granty dla młodych naukowców na samodzielne projekty badawcze.',
    termin: 'Nabór 1x rocznie (wrzesień)',
    link: 'https://www.ncn.gov.pl/sonata',
    status: 'aktywna',
    slowa_kluczowe: ['NCN', 'SONATA', 'nauka', 'granty', 'badania', 'naukowcy', 'doktoranci']
  },
  {
    id: 'poir-automatyzacja',
    nazwa: 'POIR - Automatyzacja i robotyzacja',
    sektor: 'Przemysł 4.0',
    beneficjenci: ['Przedsiębiorstwa produkcyjne', 'MŚP'],
    kwota_max: '20 000 000 zł',
    opis: 'Dofinansowanie wdrożenia rozwiązań automatyki, robotyki, AI w produkcji.',
    termin: 'Nabory do wyczerpania środków',
    link: 'https://www.poir.gov.pl/automatyzacja',
    status: 'aktywna',
    slowa_kluczowe: ['automatyzacja', 'robotyzacja', 'przemysł 4.0', 'AI', 'produkcja']
  },
  {
    id: 'wrpo-transport',
    nazwa: 'WRPOplus - Zrównoważony transport miejski',
    sektor: 'Transport',
    beneficjenci: ['Gminy', 'Związki komunikacyjne'],
    kwota_max: '80 000 000 zł',
    opis: 'Zakup autobusów elektrycznych, rozwój infrastruktury rowerowej, Park&Ride.',
    termin: 'Nabory regionalne',
    link: 'https://www.funduszeeuropejskie.gov.pl/wrpo',
    status: 'aktywna',
    slowa_kluczowe: ['transport', 'autobusy', 'elektryczne', 'rowery', 'gmina', 'park&ride']
  },
  {
    id: 'mnisw-dialog',
    nazwa: 'MNiSW - Dialog',
    sektor: 'Nauka',
    beneficjenci: ['Uczelnie', 'Organizacje pozarządowe'],
    kwota_max: '500 000 zł',
    opis: 'Promocja nauki, organizacja konferencji, popularyzacja badań naukowych.',
    termin: 'Nabory 1x rocznie',
    link: 'https://www.gov.pl/web/nauka/dialog',
    status: 'aktywna',
    slowa_kluczowe: ['nauka', 'dialog', 'konferencje', 'popularyzacja', 'uczelnie']
  },
  {
    id: 'pfron-aktywnosc',
    nazwa: 'PFRON - Aktywność zawodowa osób niepełnosprawnych',
    sektor: 'Rynek pracy',
    beneficjenci: ['Pracodawcy', 'Osoby niepełnosprawne'],
    kwota_max: '100 000 zł',
    opis: 'Dofinansowanie stanowisk pracy dla osób z niepełnosprawnościami.',
    termin: 'Nabory ciągłe',
    link: 'https://www.pfron.org.pl/aktywnosc',
    status: 'aktywna',
    slowa_kluczowe: ['PFRON', 'niepełnosprawność', 'praca', 'zatrudnienie', 'stanowisko']
  },
  {
    id: 'arp-polskie-mosty',
    nazwa: 'ARP - Polskie Mosty Technologiczne',
    sektor: 'Innowacje',
    beneficjenci: ['Startupy', 'Centra B+R'],
    kwota_max: '5 000 000 zł',
    opis: 'Współpraca międzynarodowa w zakresie innowacji i komercjalizacji technologii.',
    termin: 'Nabory tematyczne',
    link: 'https://www.arp.pl/mosty',
    status: 'aktywna',
    slowa_kluczowe: ['ARP', 'technologie', 'innowacje', 'startup', 'komercjalizacja']
  },
  {
    id: 'bgk-termomodernizacja',
    nazwa: 'BOŚ/BGK - Termomodernizacja budynków wielorodzinnych',
    sektor: 'Budownictwo',
    beneficjenci: ['Wspólnoty mieszkaniowe', 'Spółdzielnie'],
    kwota_max: '10 000 000 zł',
    opis: 'Preferencyjne kredyty i dopłaty do termomodernizacji budynków mieszkalnych.',
    termin: 'Dostępne przez cały rok',
    link: 'https://www.bgk.pl/termomodernizacja',
    status: 'aktywna',
    slowa_kluczowe: ['termomodernizacja', 'budynki', 'wspólnota', 'ocieplenie', 'kredyt']
  },
  {
    id: 'frp-rozwoj-regionalny',
    nazwa: 'FRP - Fundusz Rozwoju Przedsiębiorstw',
    sektor: 'Biznes',
    beneficjenci: ['MŚP', 'Średnie przedsiębiorstwa'],
    kwota_max: '15 000 000 zł',
    opis: 'Pożyczki na rozwój firm, inwestycje, kapitał obrotowy.',
    termin: 'Nabory ciągłe',
    link: 'https://www.bgk.pl/frp',
    status: 'aktywna',
    slowa_kluczowe: ['FRP', 'pożyczka', 'MŚP', 'rozwój', 'inwestycje', 'kapitał']
  },
  {
    id: 'ncbr-lider',
    nazwa: 'NCBR - LIDER',
    sektor: 'Nauka',
    beneficjenci: ['Liderzy zespołów badawczych', 'Naukowcy'],
    kwota_max: '3 000 000 zł',
    opis: 'Wsparcie ambitnych projektów badawczych kierowanych przez doświadczonych naukowców.',
    termin: 'Nabór 1x rocznie',
    link: 'https://www.ncbr.gov.pl/lider',
    status: 'aktywna',
    slowa_kluczowe: ['NCBR', 'LIDER', 'badania', 'naukowcy', 'projekty', 'granty']
  },
  {
    id: 'rpowp-turystyka',
    nazwa: 'RPOWP - Rozwój turystyki i dziedzictwa',
    sektor: 'Turystyka',
    beneficjenci: ['Samorządy', 'Przedsiębiorcy turystyczni', 'NGO'],
    kwota_max: '5 000 000 zł',
    opis: 'Rozwój infrastruktury turystycznej, rewitalizacja zabytków, promocja regionu.',
    termin: 'Nabory regionalne',
    link: 'https://www.rpo.wielkopolskie.pl/turystyka',
    status: 'aktywna',
    slowa_kluczowe: ['turystyka', 'zabytki', 'rewitalizacja', 'infrastruktura', 'promocja']
  },
  {
    id: 'msp-zielona-transformacja',
    nama: 'MSP - Zielona transformacja sektora MŚP',
    sektor: 'Zrównoważony rozwój',
    beneficjenci: ['MŚP'],
    kwota_max: '5 000 000 zł',
    opis: 'Dofinansowanie transformacji ekologicznej firm - OZE, gospodarka cyrkularna, redukcja emisji.',
    termin: 'Nabory kwartalne do 2026',
    link: 'https://www.parp.gov.pl/zielona-transformacja',
    status: 'aktywna',
    slowa_kluczowe: ['zielona transformacja', 'ekologia', 'MŚP', 'OZE', 'cyrkularna', 'emisja']
  },
  {
    id: 'nfosigw-mobilnosc-elektryczna',
    nazwa: 'NFOŚiGW - Mobilność elektryczna dla samorządów',
    sektor: 'Transport',
    beneficjenci: ['JST', 'Związki międzygminne'],
    kwota_max: '30 000 000 zł',
    opis: 'Zakup pojazdów elektrycznych, budowa stacji ładowania dla samorządów.',
    termin: 'Nabory ciągłe',
    link: 'https://www.nfosigw.gov.pl/elektromobilnosc',
    status: 'aktywna',
    slowa_kluczowe: ['elektromobilność', 'pojazdy', 'elektryczne', 'ładowarki', 'samorząd']
  },
  {
    id: 'bgk-starter',
    nazwa: 'BGK - Starter dla młodych przedsiębiorców',
    sektor: 'Start-upy',
    beneficjenci: ['Młodzi przedsiębiorcy do 30 lat'],
    kwota_max: '100 000 zł',
    opis: 'Niskooprocentowane pożyczki na rozpoczęcie działalności gospodarczej.',
    termin: 'Dostępne przez cały rok',
    link: 'https://www.bgk.pl/starter',
    status: 'aktywna',
    slowa_kluczowe: ['starter', 'młody przedsiębiorca', 'pożyczka', 'biznes', 'startup']
  },
  {
    id: 'mnisw-studenckie-kola',
    nazwa: 'MNiSW - Wsparcie studenckich kół naukowych',
    sektor: 'Edukacja',
    beneficjenci: ['SKN', 'Studenci'],
    kwota_max: '50 000 zł',
    opis: 'Granty na projekty badawcze, zakup sprzętu, udział w konferencjach dla SKN.',
    termin: 'Nabór 1x rocznie',
    link: 'https://www.gov.pl/web/nauka/skn',
    status: 'aktywna',
    slowa_kluczowe: ['SKN', 'studenci', 'koło naukowe', 'badania', 'granty']
  },
  {
    id: 'womens-fund',
    nazwa: 'Fundusz dla kobiet przedsiębiorczyń',
    sektor: 'Przedsiębiorczość',
    beneficjenci: ['Kobiety prowadzące działalność'],
    kwota_max: '200 000 zł',
    opis: 'Wsparcie dla kobiet rozpoczynających lub rozwijających działalność gospodarczą.',
    termin: 'Nabory co 6 miesięcy',
    link: 'https://www.parp.gov.pl/kobiety-biznes',
    status: 'aktywna',
    slowa_kluczowe: ['kobiety', 'przedsiębiorczość', 'biznes', 'startup', 'działalność']
  }
];

// Baza danych pism i wniosków
const pismaDB = [
  {
    id: 'wniosek-500plus',
    nazwa: 'Wniosek o świadczenie wychowawcze (500+)',
    kategoria: 'Świadczenia rodzinne',
    opis: 'Oficjalny wniosek o przyznanie świadczenia wychowawczego 500+ na dziecko.',
    pdf: 'https://www.gov.pl/attachment/wniosek-500plus.pdf',
    link: 'https://www.gov.pl/web/rodzina/swiadczenie-wychowawcze-rodzina-500-plus',
    slowa_kluczowe: ['500+', 'świadczenie', 'wychowawcze', 'dziecko', 'wniosek']
  },
  {
    id: 'wniosek-dodatek-mieszkaniowy',
    nazwa: 'Wniosek o dodatek mieszkaniowy',
    kategoria: 'Pomoc społeczna',
    opis: 'Wniosek o przyznanie dodatku mieszkaniowego dla gospodarstw o niskich dochodach.',
    pdf: 'https://www.gov.pl/attachment/dodatek-mieszkaniowy-wniosek.pdf',
    link: 'https://www.gov.pl/web/gov/uzyskaj-dodatek-mieszkaniowy',
    slowa_kluczowe: ['dodatek', 'mieszkaniowy', 'czynsz', 'mieszkanie', 'wynajem']
  },
  {
    id: 'reklamacja-spoldzielnia',
    nazwa: 'Reklamacja do spółdzielni mieszkaniowej',
    kategoria: 'Reklamacje',
    opis: 'Wzór pisma reklamacyjnego w sprawie usterek, zalania lub innych problemów w mieszkaniu.',
    szablon: true,
    link: 'https://www.gov.pl/web/gov/reklamacje',
    slowa_kluczowe: ['reklamacja', 'spółdzielnia', 'zalanie', 'usterka', 'mieszkanie', 'naprawa']
  },
  {
    id: 'odwolanie-zus',
    nazwa: 'Odwołanie od decyzji ZUS',
    kategoria: 'Odwołania',
    opis: 'Wzór odwołania od niekorzystnej decyzji Zakładu Ubezpieczeń Społecznych.',
    szablon: true,
    link: 'https://www.zus.pl/odwolania',
    slowa_kluczowe: ['odwołanie', 'ZUS', 'decyzja', 'odmowa', 'emerytura', 'renta']
  },
  {
    id: 'wniosek-zasilek-chorobowy',
    nazwa: 'Wniosek o zasiłek chorobowy',
    kategoria: 'ZUS',
    opis: 'Wniosek o wypłatę zasiłku chorobowego za okres niezdolności do pracy.',
    pdf: 'https://www.zus.pl/documents/wniosek-chorobowy.pdf',
    link: 'https://www.zus.pl/swiadczenia/zasilki/zasilek-chorobowy',
    slowa_kluczowe: ['zasiłek', 'chorobowy', 'choroba', 'L4', 'ZUS', 'wniosek']
  },
  {
    id: 'wniosek-emerytura',
    nazwa: 'Wniosek o emeryturę',
    kategoria: 'ZUS',
    opis: 'Wniosek o przyznanie emerytury dla osób, które osiągnęły wiek emerytalny.',
    pdf: 'https://www.zus.pl/documents/wniosek-emerytura.pdf',
    link: 'https://www.zus.pl/swiadczenia/emerytury-i-renty/emerytura',
    slowa_kluczowe: ['emerytura', 'wniosek', 'wiek emerytalny', 'ZUS', 'senior']
  },
  {
    id: 'pozew-o-zaplate',
    nazwa: 'Pozew o zapłatę',
    kategoria: 'Sądowe',
    opis: 'Wzór pozwu o zapłatę należności, odszkodowania lub innych roszczeń pieniężnych.',
    szablon: true,
    link: 'https://www.gov.pl/web/sprawiedliwosc/pozew',
    slowa_kluczowe: ['pozew', 'zapłata', 'sąd', 'należność', 'dług', 'odszkodowanie']
  },
  {
    id: 'wezwanie-do-zaplaty',
    nazwa: 'Wezwanie do zapłaty',
    kategoria: 'Windykacja',
    opis: 'Wzór pisma z wezwaniem dłużnika do zapłaty zaległej kwoty przed skierowaniem sprawy do sądu.',
    szablon: true,
    link: 'https://www.gov.pl/web/sprawiedliwosc/wezwanie-do-zaplaty',
    slowa_kluczowe: ['wezwanie', 'zapłata', 'dług', 'należność', 'windykacja']
  },
  {
    id: 'wniosek-alimenty',
    nazwa: 'Wniosek o świadczenia z funduszu alimentacyjnego',
    kategoria: 'Świadczenia rodzinne',
    opis: 'Wniosek o przyznanie świadczeń z funduszu alimentacyjnego dla dzieci, których rodzic nie płaci alimentów.',
    pdf: 'https://www.gov.pl/attachment/wniosek-alimenty.pdf',
    link: 'https://www.gov.pl/web/rodzina/fundusz-alimentacyjny',
    slowa_kluczowe: ['alimenty', 'fundusz', 'alimentacyjny', 'dziecko', 'egzekucja']
  },
  {
    id: 'wniosek-stypendium',
    nazwa: 'Wniosek o stypendium socjalne',
    kategoria: 'Edukacja',
    opis: 'Wniosek o stypendium socjalne dla studentów z trudną sytuacją materialną.',
    pdf: 'https://www.gov.pl/attachment/stypendium-socjalne.pdf',
    link: 'https://www.gov.pl/web/nauka/stypendium-socjalne',
    slowa_kluczowe: ['stypendium', 'socjalne', 'student', 'uczelnia', 'dochody']
  },
  {
    id: 'reklamacja-produkt',
    nazwa: 'Reklamacja towaru/usługi',
    kategoria: 'Reklamacje',
    opis: 'Wzór pisma reklamacyjnego produktu lub usługi niezgodnej z umową.',
    szablon: true,
    link: 'https://www.uokik.gov.pl/reklamacje',
    slowa_kluczowe: ['reklamacja', 'towar', 'produkt', 'usługa', 'wada', 'sklep']
  },
  {
    id: 'wniosek-urlop-bezplatny',
    nazwa: 'Wniosek o urlop bezpłatny',
    kategoria: 'Praca',
    opis: 'Wzór wniosku do pracodawcy o udzielenie urlopu bezpłatnego.',
    szablon: true,
    link: 'https://www.gov.pl/web/praca/urlop-bezplatny',
    slowa_kluczowe: ['urlop', 'bezpłatny', 'pracodawca', 'wniosek', 'praca']
  },
  {
    id: 'oswiadczenie-majątkowe',
    nazwa: 'Oświadczenie majątkowe',
    kategoria: 'Urzędowe',
    opis: 'Wzór oświadczenia o stanie majątkowym wymaganego przez różne instytucje.',
    szablon: true,
    link: 'https://www.gov.pl/web/gov/oswiadczenie-majatkowe',
    slowa_kluczowe: ['oświadczenie', 'majątkowe', 'dochody', 'majątek', 'urząd']
  },
  {
    id: 'wniosek-bon-energetyczny',
    nazwa: 'Wniosek o bon energetyczny',
    kategoria: 'Energia',
    opis: 'Wniosek o przyznanie bonu energetycznego dla gospodarstw o niższych dochodach.',
    pdf: 'https://www.gov.pl/attachment/bon-energetyczny.pdf',
    link: 'https://www.gov.pl/web/klimat/bon-energetyczny',
    slowa_kluczowe: ['bon', 'energetyczny', 'energia', 'prąd', 'wsparcie']
  },
  {
    id: 'odwolanie-mandat',
    nazwa: 'Odwołanie od mandatu karnego',
    kategoria: 'Odwołania',
    opis: 'Wzór odwołania od mandatu karnego do sądu.',
    szablon: true,
    link: 'https://www.gov.pl/web/sprawiedliwosc/odwolanie-mandat',
    slowa_kluczowe: ['odwołanie', 'mandat', 'sąd', 'kara', 'wykroczenie']
  },
  {
    id: 'wniosek-pfron',
    nazwa: 'Wniosek o dofinansowanie z PFRON',
    kategoria: 'Rehabilitacja',
    opis: 'Wniosek o dofinansowanie sprzętu rehabilitacyjnego, likwidacji barier lub innych świadczeń z PFRON.',
    pdf: 'https://www.pfron.org.pl/documents/wniosek-pfron.pdf',
    link: 'https://www.pfron.org.pl/dofinansowania',
    slowa_kluczowe: ['PFRON', 'dofinansowanie', 'niepełnosprawność', 'rehabilitacja', 'sprzęt']
  },
  {
    id: 'wniosek-czyste-powietrze',
    nazwa: 'Wniosek o dofinansowanie - Czyste Powietrze',
    kategoria: 'Środowisko',
    opis: 'Wniosek o dofinansowanie wymiany źródła ciepła i termomodernizacji w programie Czyste Powietrze.',
    pdf: 'https://www.nfosigw.gov.pl/documents/czyste-powietrze-wniosek.pdf',
    link: 'https://www.gov.pl/web/nfosigw/czyste-powietrze',
    slowa_kluczowe: ['czyste powietrze', 'termomodernizacja', 'ogrzewanie', 'pompa ciepła']
  },
  {
    id: 'zawiadomienie-policja',
    nazwa: 'Zawiadomienie do policji/prokuratury',
    kategoria: 'Prawne',
    opis: 'Wzór zawiadomienia o popełnieniu przestępstwa do policji lub prokuratury.',
    szablon: true,
    link: 'https://www.gov.pl/web/sprawiedliwosc/zawiadomienie',
    slowa_kluczowe: ['zawiadomienie', 'policja', 'prokuratura', 'przestępstwo', 'kradzież']
  },
  {
    id: 'pismo-do-urzedu',
    nazwa: 'Pismo ogólne do urzędu',
    kategoria: 'Urzędowe',
    opis: 'Uniwersalny wzór pisma urzędowego - prośba, zapytanie, wyjaśnienie.',
    szablon: true,
    link: 'https://www.gov.pl/web/gov/pisma-urzedowe',
    slowa_kluczowe: ['pismo', 'urząd', 'urzędowe', 'prośba', 'zapytanie']
  },
  {
    id: 'wniosek-karta-duzej-rodziny',
    nazwa: 'Wniosek o Kartę Dużej Rodziny',
    kategoria: 'Świadczenia rodzinne',
    opis: 'Wniosek o wydanie Karty Dużej Rodziny dla rodzin 3+.',
    pdf: 'https://www.gov.pl/attachment/kdr-wniosek.pdf',
    link: 'https://www.gov.pl/web/rodzina/karta-duzej-rodziny',
    slowa_kluczowe: ['karta', 'duża rodzina', '3+', 'trójka dzieci', 'zniżki']
  }
];

// Rozszerzona baza danych świadczeń (30 świadczeń)
const swiadczeniaDB = [
  {
    id: '500plus',
    nazwa: 'Program Rodzina 500+',
    kategoria: 'Świadczenia rodzinne',
    krotki_opis: 'Świadczenie wychowawcze 500 zł miesięcznie na każde dziecko do 18. roku życia.',
    kwalifikacja: [
      'Obywatel Polski lub osoba legalnie przebywająca w Polsce',
      'Dziecko do ukończenia 18. roku życia',
      'Bez kryterium dochodowego'
    ],
    dokumenty: [
      'Wniosek o świadczenie wychowawcze',
      'Odpis skrócony aktu urodzenia dziecka',
      'Numer rachunku bankowego'
    ],
    link: 'https://www.gov.pl/web/rodzina/swiadczenie-wychowawcze-rodzina-500-plus',
    pdf: 'https://www.gov.pl/attachment/1234567890',
    slowa_kluczowe: ['500+', '500 plus', 'dziecko', 'świadczenie', 'wychowawcze', 'rodzina'],
    ostatnia_aktualizacja: '2024-01-15'
  },
  {
    id: 'dodatek-mieszkaniowy',
    nazwa: 'Dodatek mieszkaniowy',
    kategoria: 'Pomoc społeczna',
    krotki_opis: 'Wsparcie finansowe na pokrycie części kosztów utrzymania mieszkania dla gospodarstw domowych o niskich dochodach.',
    kwalifikacja: [
      'Dochód gospodarstwa domowego poniżej określonego progu',
      'Posiadanie tytułu prawnego do lokalu',
      'Powierzchnia mieszkania nie przekracza norm'
    ],
    dokumenty: [
      'Wniosek o dodatek mieszkaniowy',
      'Zaświadczenia o dochodach członków gospodarstwa',
      'Dokument potwierdzający tytuł prawny do lokalu',
      'Zaświadczenie o powierzchni mieszkania'
    ],
    link: 'https://www.gov.pl/web/gov/uzyskaj-dodatek-mieszkaniowy',
    pdf: 'https://www.gov.pl/attachment/dodatek-mieszkaniowy.pdf',
    slowa_kluczowe: ['mieszkanie', 'dodatek', 'czynsz', 'rachunki', 'wynajem', 'niskie dochody'],
    ostatnia_aktualizacja: '2024-02-10'
  },
  {
    id: 'dodatek-oslonowy',
    nazwa: 'Dodatek osłonowy',
    kategoria: 'Energia',
    krotki_opis: 'Jednorazowe wsparcie finansowe na częściowe pokrycie kosztów zakupu energii elektrycznej, gazu ziemnego lub ciepła.',
    kwalifikacja: [
      'Gospodarstwo domowe spełniające kryterium dochodowe',
      'Główne źródło ogrzewania: energia elektryczna, gaz ziemny lub ciepło systemowe'
    ],
    dokumenty: [
      'Wniosek o dodatek osłonowy',
      'Zaświadczenia o dochodach',
      'Potwierdzenie źródła ogrzewania'
    ],
    link: 'https://www.gov.pl/web/klimat/dodatek-oslonowy',
    pdf: 'https://www.gov.pl/attachment/dodatek-oslonowy.pdf',
    slowa_kluczowe: ['energia', 'prąd', 'gaz', 'ogrzewanie', 'rachunki', 'osłonowy', 'drożyzna'],
    ostatnia_aktualizacja: '2024-03-01'
  },
  {
    id: 'zasilek-pielegnacyjny',
    nazwa: 'Zasiłek pielęgnacyjny',
    kategoria: 'Świadczenia opiekuńcze',
    krotki_opis: 'Świadczenie dla osób niepełnosprawnych lub w wieku emerytalnym wymagających opieki i pomocy innej osoby.',
    kwalifikacja: [
      'Osoba niepełnosprawna ze znacznym stopniem niepełnosprawności',
      'Dziecko niepełnosprawne do 16. roku życia',
      'Osoba w wieku emerytalnym niezdolna do samodzielnej egzystencji'
    ],
    dokumenty: [
      'Wniosek o zasiłek pielęgnacyjny',
      'Orzeczenie o niepełnosprawności lub niezdolności do samodzielnej egzystencji',
      'Dokument tożsamości'
    ],
    link: 'https://www.gov.pl/web/rodzina/zasilek-pielegnacyjny',
    pdf: 'https://www.gov.pl/attachment/zasilek-pielegnacyjny.pdf',
    slowa_kluczowe: ['zasiłek', 'pielęgnacyjny', 'niepełnosprawność', 'opieka', 'senior', 'emeryt'],
    ostatnia_aktualizacja: '2024-01-20'
  },
  {
    id: 'swiadczenie-wspierajace',
    nazwa: 'Świadczenie wspierające',
    kategoria: 'Świadczenia opiekuńcze',
    krotki_opis: 'Nowe świadczenie dla osób z niepełnosprawnościami, które zastępuje dotychczasowe świadczenia opiekuńcze.',
    kwalifikacja: [
      'Osoba z niepełnosprawnością w wieku od 18. roku życia',
      'Decyzja ustalająca poziom potrzeby wsparcia'
    ],
    dokumenty: [
      'Wniosek o świadczenie wspierające',
      'Orzeczenie o niepełnosprawności',
      'Wyniki oceny poziomu potrzeby wsparcia'
    ],
    link: 'https://www.gov.pl/web/rodzina/swiadczenie-wspierajace',
    pdf: 'https://www.gov.pl/attachment/swiadczenie-wspierajace.pdf',
    slowa_kluczowe: ['wsparcie', 'niepełnosprawność', 'świadczenie', 'opieka', 'nowe'],
    ostatnia_aktualizacja: '2024-01-01'
  },
  {
    id: 'bon-energetyczny',
    nazwa: 'Bon energetyczny',
    kategoria: 'Energia',
    krotki_opis: 'Jednorazowe wsparcie finansowe dla gospodarstw domowych o niższych dochodach na pokrycie kosztów energii.',
    kwalifikacja: [
      'Dochód na osobę poniżej 2500 zł (gospodarstwo jednoosobowe) lub 1700 zł (gospodarstwo wieloosobowe)',
      'Główne źródło ogrzewania'
    ],
    dokumenty: [
      'Wniosek o bon energetyczny',
      'Zaświadczenia o dochodach wszystkich członków gospodarstwa'
    ],
    link: 'https://www.gov.pl/web/klimat/bon-energetyczny',
    pdf: null,
    slowa_kluczowe: ['bon', 'energia', 'energetyczny', 'prąd', 'wsparcie', 'dochody'],
    ostatnia_aktualizacja: '2024-02-15'
  },
  {
    id: 'zasilek-rodzinny',
    nazwa: 'Zasiłek rodzinny',
    kategoria: 'Świadczenia rodzinne',
    krotki_opis: 'Świadczenie dla rodzin z dziećmi, uzależnione od kryterium dochodowego.',
    kwalifikacja: [
      'Dochód na osobę w rodzinie nie przekracza 674 zł',
      'Dziecko do ukończenia 18. roku życia lub nauki (max 24 lata)'
    ],
    dokumenty: [
      'Wniosek o zasiłek rodzinny',
      'Zaświadczenia o dochodach',
      'Odpisy aktów urodzenia dzieci',
      'Zaświadczenie ze szkoły (jeśli dziecko powyżej 18 lat)'
    ],
    link: 'https://www.gov.pl/web/rodzina/zasilek-rodzinny',
    pdf: 'https://www.gov.pl/attachment/zasilek-rodzinny.pdf',
    slowa_kluczowe: ['zasiłek', 'rodzinny', 'dzieci', 'dochody', 'świadczenie'],
    ostatnia_aktualizacja: '2024-01-10'
  },
  {
    id: 'becikowe',
    nazwa: 'Becikowe (Jednorazowa zapomoga z tytułu urodzenia dziecka)',
    kategoria: 'Świadczenia rodzinne',
    krotki_opis: 'Jednorazowa zapomoga w wysokości 1000 zł z tytułu urodzenia dziecka.',
    kwalifikacja: [
      'Dochód na osobę w rodzinie nie przekracza 1922 zł',
      'Pozostawanie pod opieką medyczną nie później niż od 10. tygodnia ciąży'
    ],
    dokumenty: [
      'Wniosek o jednorazową zapomogę',
      'Zaświadczenie lekarskie o pozostawaniu pod opieką',
      'Akt urodzenia dziecka',
      'Zaświadczenia o dochodach'
    ],
    link: 'https://www.gov.pl/web/rodzina/jednorazowa-zapomoga-z-tytulu-urodzenia-dziecka',
    pdf: 'https://www.gov.pl/attachment/becikowe.pdf',
    slowa_kluczowe: ['becikowe', 'urodzenie', 'dziecko', 'zapomoga', 'ciąża', 'noworodek'],
    ostatnia_aktualizacja: '2024-01-05'
  },
  {
    id: 'kosiniakowe',
    nazwa: 'Kosiniakowe (Świadczenie rodzicielskie)',
    kategoria: 'Świadczenia rodzinne',
    krotki_opis: 'Świadczenie rodzicielskie w wysokości 1000 zł miesięcznie dla rodziców korzystających z urlopu rodzicielskiego.',
    kwalifikacja: [
      'Zgłoszenie urodzenia dziecka do USC',
      'Niepodejmowanie pracy w okresie pobierania świadczenia',
      'Bez kryterium dochodowego'
    ],
    dokumenty: [
      'Wniosek o świadczenie rodzicielskie',
      'Akt urodzenia dziecka',
      'Oświadczenie o niepodejmowaniu pracy'
    ],
    link: 'https://www.gov.pl/web/rodzina/swiadczenie-rodzicielskie',
    pdf: 'https://www.gov.pl/attachment/kosiniakowe.pdf',
    slowa_kluczowe: ['kosiniakowe', 'rodzicielskie', 'urlop', 'macierzyński', 'ojcowski', 'noworodek'],
    ostatnia_aktualizacja: '2024-02-01'
  },
  {
    id: 'zasilek-dla-bezrobotnych',
    nazwa: 'Zasiłek dla bezrobotnych',
    kategoria: 'Praca',
    krotki_opis: 'Świadczenie dla osób bezrobotnych zarejestrowanych w urzędzie pracy.',
    kwalifikacja: [
      'Rejestracja w urzędzie pracy jako osoba bezrobotna',
      'Posiadanie odpowiedniego stażu pracy (365 dni w ostatnich 18 miesiącach)',
      'Niepodejmowanie pracy zarobkowej'
    ],
    dokumenty: [
      'Wniosek o zasiłek dla bezrobotnych',
      'Świadectwa pracy lub inne dokumenty potwierdzające zatrudnienie',
      'Dokument potwierdzający rozwiązanie umowy o pracę'
    ],
    link: 'https://www.gov.pl/web/rodzina/zasilek-dla-bezrobotnych',
    pdf: 'https://www.gov.pl/attachment/zasilek-bezrobotnych.pdf',
    slowa_kluczowe: ['bezrobotny', 'zasiłek', 'praca', 'zwolnienie', 'urząd pracy'],
    ostatnia_aktualizacja: '2024-02-20'
  },
  {
    id: 'karta-duzej-rodziny',
    nazwa: 'Karta Dużej Rodziny',
    kategoria: 'Ulgi i zniżki',
    krotki_opis: 'Program zniżek i ulg dla rodzin z co najmniej trójką dzieci.',
    kwalifikacja: [
      'Rodzina z co najmniej trójką dzieci',
      'Dzieci do 18. roku życia lub do 25. roku (uczące się)'
    ],
    dokumenty: [
      'Wniosek o Kartę Dużej Rodziny',
      'Odpisy aktów urodzenia dzieci',
      'Zaświadczenia ze szkoły (dla dzieci powyżej 18 lat)'
    ],
    link: 'https://www.gov.pl/web/rodzina/karta-duzej-rodziny',
    pdf: 'https://www.gov.pl/attachment/kdr.pdf',
    slowa_kluczowe: ['karta', 'duża rodzina', 'zniżki', 'ulgi', 'trójka dzieci', '3+'],
    ostatnia_aktualizacja: '2024-01-15'
  },
  {
    id: 'dobry-start',
    nazwa: 'Dobry Start (300+)',
    kategoria: 'Świadczenia rodzinne',
    krotki_opis: 'Jednorazowe świadczenie 300 zł na wyprawkę szkolną dla ucznia.',
    kwalifikacja: [
      'Dziecko uczęszczające do szkoły',
      'Bez kryterium dochodowego',
      'Raz w roku szkolnym'
    ],
    dokumenty: [
      'Wniosek o świadczenie Dobry Start',
      'Numer PESEL dziecka'
    ],
    link: 'https://www.gov.pl/web/rodzina/dobry-start-300-plus',
    pdf: 'https://www.gov.pl/attachment/dobry-start.pdf',
    slowa_kluczowe: ['300+', 'dobry start', 'szkoła', 'wyprawka', 'uczeń', 'wrzesień'],
    ostatnia_aktualizacja: '2024-08-01'
  },
  {
    id: 'alimenty',
    nazwa: 'Świadczenia z funduszu alimentacyjnego',
    kategoria: 'Świadczenia rodzinne',
    krotki_opis: 'Wsparcie dla dzieci, których rodzic nie płaci alimentów.',
    kwalifikacja: [
      'Dziecko do 18. roku życia (lub 25. roku - jeśli uczy się)',
      'Egzekucja alimentów od dłużnika alimentacyjnego',
      'Dochód rodziny poniżej 1209 zł na osobę'
    ],
    dokumenty: [
      'Wniosek o świadczenia z funduszu alimentacyjnego',
      'Odpis wyroku zasądzającego alimenty',
      'Zaświadczenie o prowadzeniu egzekucji',
      'Zaświadczenia o dochodach'
    ],
    link: 'https://www.gov.pl/web/rodzina/fundusz-alimentacyjny',
    pdf: 'https://www.gov.pl/attachment/alimenty.pdf',
    slowa_kluczowe: ['alimenty', 'fundusz', 'alimentacyjny', 'egzekucja', 'dłużnik'],
    ostatnia_aktualizacja: '2024-01-25'
  },
  {
    id: 'zasilek-chorobowy',
    nazwa: 'Zasiłek chorobowy',
    kategoria: 'ZUS',
    krotki_opis: 'Świadczenie za okres niezdolności do pracy z powodu choroby.',
    kwalifikacja: [
      'Osoba ubezpieczona w ZUS',
      'Niezdolność do pracy potwierdzona zwolnieniem lekarskim',
      'Minimalny okres ubezpieczenia (90 dni)'
    ],
    dokumenty: [
      'Zwolnienie lekarskie (e-ZLA)',
      'Wniosek o zasiłek chorobowy'
    ],
    link: 'https://www.zus.pl/swiadczenia/zasilki/zasilek-chorobowy',
    pdf: 'https://www.zus.pl/documents/zasilek-chorobowy.pdf',
    slowa_kluczowe: ['zasiłek', 'chorobowy', 'choroba', 'zwolnienie', 'L4', 'ZUS'],
    ostatnia_aktualizacja: '2024-02-05'
  },
  {
    id: 'zasilek-macierzynski',
    nazwa: 'Zasiłek macierzyński',
    kategoria: 'ZUS',
    krotki_opis: 'Świadczenie za okres urlopu macierzyńskiego, rodzicielskiego i ojcowskiego.',
    kwalifikacja: [
      'Osoba ubezpieczona w ZUS',
      'Urlop macierzyński/rodzicielski/ojcowski',
      'Zgłoszenie urodzenia dziecka'
    ],
    dokumenty: [
      'Wniosek o zasiłek macierzyński',
      'Akt urodzenia dziecka',
      'Zaświadczenie o okresie urlopu'
    ],
    link: 'https://www.zus.pl/swiadczenia/zasilki/zasilek-macierzynski',
    pdf: 'https://www.zus.pl/documents/zasilek-macierzynski.pdf',
    slowa_kluczowe: ['macierzyński', 'urlop', 'ciąża', 'poród', 'dziecko', 'ZUS', 'rodzicielski', 'ojcowski'],
    ostatnia_aktualizacja: '2024-02-10'
  },
  {
    id: 'zasilek-opiekunczy',
    nazwa: 'Zasiłek opiekuńczy',
    kategoria: 'ZUS',
    krotki_opis: 'Świadczenie za okres sprawowania opieki nad chorym członkiem rodziny.',
    kwalifikacja: [
      'Osoba ubezpieczona w ZUS',
      'Konieczność osobistego sprawowania opieki nad chorym',
      'Zaświadczenie lekarskie o konieczności opieki'
    ],
    dokumenty: [
      'Wniosek o zasiłek opiekuńczy',
      'Zaświadczenie lekarskie o konieczności opieki'
    ],
    link: 'https://www.zus.pl/swiadczenia/zasilki/zasilek-opiekunczy',
    pdf: 'https://www.zus.pl/documents/zasilek-opiekunczy.pdf',
    slowa_kluczowe: ['opiekuńczy', 'opieka', 'dziecko', 'chore', 'ZUS', 'zasiłek'],
    ostatnia_aktualizacja: '2024-02-01'
  },
  {
    id: 'emerytura',
    nazwa: 'Emerytura',
    kategoria: 'ZUS',
    krotki_opis: 'Świadczenie emerytalne dla osób, które osiągnęły wiek emerytalny.',
    kwalifikacja: [
      'Wiek emerytalny: 60 lat (kobiety), 65 lat (mężczyźni)',
      'Odpowiedni staż ubezpieczeniowy'
    ],
    dokumenty: [
      'Wniosek o emeryturę',
      'Dokumenty potwierdzające okresy zatrudnienia',
      'Dowód osobisty'
    ],
    link: 'https://www.zus.pl/swiadczenia/emerytury-i-renty/emerytura',
    pdf: 'https://www.zus.pl/documents/emerytura.pdf',
    slowa_kluczowe: ['emerytura', 'wiek emerytalny', 'senior', 'ZUS', 'staż'],
    ostatnia_aktualizacja: '2024-01-30'
  },
  {
    id: 'renta',
    nazwa: 'Renta z tytułu niezdolności do pracy',
    kategoria: 'ZUS',
    krotki_opis: 'Świadczenie dla osób niezdolnych do pracy z powodu stanu zdrowia.',
    kwalifikacja: [
      'Orzeczenie o całkowitej lub częściowej niezdolności do pracy',
      'Odpowiedni okres ubezpieczenia',
      'Niezdolność powstała w okresie ubezpieczenia'
    ],
    dokumenty: [
      'Wniosek o rentę',
      'Dokumentacja medyczna',
      'Dokumenty potwierdzające okresy ubezpieczenia'
    ],
    link: 'https://www.zus.pl/swiadczenia/emerytury-i-renty/renta-z-tytulu-niezdolnosci-do-pracy',
    pdf: 'https://www.zus.pl/documents/renta.pdf',
    slowa_kluczowe: ['renta', 'niezdolność', 'praca', 'orzeczenie', 'ZUS', 'choroba'],
    ostatnia_aktualizacja: '2024-02-12'
  },
  {
    id: 'dofinansowanie-turnusu',
    nazwa: 'Dofinansowanie turnusu rehabilitacyjnego',
    kategoria: 'Rehabilitacja',
    krotki_opis: 'Wsparcie finansowe na turnus rehabilitacyjny dla osób niepełnosprawnych.',
    kwalifikacja: [
      'Orzeczenie o niepełnosprawności',
      'Skierowanie lekarskie na rehabilitację',
      'Dochód rodziny poniżej określonego progu'
    ],
    dokumenty: [
      'Wniosek o dofinansowanie',
      'Orzeczenie o niepełnosprawności',
      'Skierowanie lekarskie',
      'Zaświadczenia o dochodach'
    ],
    link: 'https://www.pfron.org.pl/turnus-rehabilitacyjny',
    pdf: 'https://www.pfron.org.pl/documents/turnus.pdf',
    slowa_kluczowe: ['turnus', 'rehabilitacja', 'niepełnosprawność', 'sanatorium', 'PFRON'],
    ostatnia_aktualizacja: '2024-03-01'
  },
  {
    id: 'likwidacja-barier',
    nazwa: 'Dofinansowanie likwidacji barier architektonicznych',
    kategoria: 'Rehabilitacja',
    krotki_opis: 'Wsparcie na dostosowanie mieszkania do potrzeb osoby niepełnosprawnej.',
    kwalifikacja: [
      'Orzeczenie o niepełnosprawności',
      'Posiadanie tytułu prawnego do lokalu',
      'Dochód rodziny poniżej określonego progu'
    ],
    dokumenty: [
      'Wniosek o dofinansowanie',
      'Orzeczenie o niepełnosprawności',
      'Kosztorys prac',
      'Dokument potwierdzający tytuł prawny do lokalu'
    ],
    link: 'https://www.pfron.org.pl/likwidacja-barier',
    pdf: 'https://www.pfron.org.pl/documents/bariery.pdf',
    slowa_kluczowe: ['bariery', 'architektoniczne', 'mieszkanie', 'adaptacja', 'niepełnosprawność', 'PFRON'],
    ostatnia_aktualizacja: '2024-02-15'
  },
  {
    id: 'dofinansowanie-sprzetu',
    nazwa: 'Dofinansowanie zakupu sprzętu rehabilitacyjnego',
    kategoria: 'Rehabilitacja',
    krotki_opis: 'Wsparcie na zakup wózka inwalidzkiego, protezy, aparatu słuchowego i innego sprzętu.',
    kwalifikacja: [
      'Orzeczenie o niepełnosprawności',
      'Zlecenie lekarskie na sprzęt',
      'Dochód rodziny poniżej określonego progu'
    ],
    dokumenty: [
      'Wniosek o dofinansowanie',
      'Orzeczenie o niepełnosprawności',
      'Zlecenie lekarskie',
      'Oferta/faktura proforma'
    ],
    link: 'https://www.pfron.org.pl/sprzet-rehabilitacyjny',
    pdf: 'https://www.pfron.org.pl/documents/sprzet.pdf',
    slowa_kluczowe: ['sprzęt', 'rehabilitacyjny', 'wózek', 'proteza', 'aparat', 'PFRON'],
    ostatnia_aktualizacja: '2024-02-20'
  },
  {
    id: 'dofinansowanie-studiow',
    nazwa: 'Dofinansowanie kształcenia studentów niepełnosprawnych',
    kategoria: 'Edukacja',
    krotki_opis: 'Wsparcie dla studentów z niepełnosprawnościami na pokrycie kosztów kształcenia.',
    kwalifikacja: [
      'Student uczelni wyższej',
      'Orzeczenie o niepełnosprawności',
      'Aktywne studiowanie'
    ],
    dokumenty: [
      'Wniosek o dofinansowanie',
      'Orzeczenie o niepełnosprawności',
      'Zaświadczenie z uczelni'
    ],
    link: 'https://www.pfron.org.pl/studenci',
    pdf: 'https://www.pfron.org.pl/documents/studenci.pdf',
    slowa_kluczowe: ['studia', 'student', 'niepełnosprawność', 'nauka', 'uczelnia', 'PFRON'],
    ostatnia_aktualizacja: '2024-01-20'
  },
  {
    id: 'program-czyste-powietrze',
    nazwa: 'Program Czyste Powietrze',
    kategoria: 'Środowisko',
    krotki_opis: 'Dofinansowanie wymiany źródła ciepła i termomodernizacji domów jednorodzinnych.',
    kwalifikacja: [
      'Właściciel lub współwłaściciel budynku jednorodzinnego',
      'Dochód gospodarstwa domowego poniżej określonego progu (dla wyższej dotacji)'
    ],
    dokumenty: [
      'Wniosek o dofinansowanie',
      'Dokument potwierdzający tytuł prawny do nieruchomości',
      'Audyt energetyczny (w niektórych przypadkach)',
      'Oferty/faktury za wykonane prace'
    ],
    link: 'https://www.gov.pl/web/nfosigw/czyste-powietrze',
    pdf: 'https://www.nfosigw.gov.pl/documents/czyste-powietrze.pdf',
    slowa_kluczowe: ['czyste powietrze', 'ogrzewanie', 'węgiel', 'pompa ciepła', 'termomodernizacja', 'dom'],
    ostatnia_aktualizacja: '2024-03-10'
  },
  {
    id: 'moj-prad',
    nazwa: 'Program Mój Prąd',
    kategoria: 'Środowisko',
    krotki_opis: 'Dofinansowanie instalacji fotowoltaicznych w domach jednorodzinnych.',
    kwalifikacja: [
      'Właściciel budynku jednorodzinnego',
      'Instalacja fotowoltaiczna o mocy od 2 do 10 kW'
    ],
    dokumenty: [
      'Wniosek o dofinansowanie',
      'Dokument potwierdzający tytuł prawny',
      'Faktura za instalację',
      'Protokół odbioru instalacji'
    ],
    link: 'https://www.gov.pl/web/nfosigw/moj-prad',
    pdf: 'https://www.nfosigw.gov.pl/documents/moj-prad.pdf',
    slowa_kluczowe: ['fotowoltaika', 'panele', 'słoneczne', 'prąd', 'energia', 'odnawialna'],
    ostatnia_aktualizacja: '2024-02-25'
  },
  {
    id: 'ulga-termomodernizacyjna',
    nazwa: 'Ulga termomodernizacyjna',
    kategoria: 'Ulgi podatkowe',
    krotki_opis: 'Odliczenie wydatków na termomodernizację budynku mieszkalnego od podstawy opodatkowania.',
    kwalifikacja: [
      'Właściciel lub współwłaściciel budynku jednorodzinnego',
      'Wydatki poniesione na termomodernizację',
      'Maksymalne odliczenie: 53 000 zł'
    ],
    dokumenty: [
      'Faktury za wykonane prace',
      'Zeznanie podatkowe PIT',
      'Dokument potwierdzający własność nieruchomości'
    ],
    link: 'https://www.gov.pl/web/finanse/ulga-termomodernizacyjna',
    pdf: 'https://www.gov.pl/documents/ulga-termo.pdf',
    slowa_kluczowe: ['ulga', 'termomodernizacja', 'podatek', 'PIT', 'ocieplenie', 'okna'],
    ostatnia_aktualizacja: '2024-03-15'
  },
  {
    id: 'ulga-rehabilitacyjna',
    nazwa: 'Ulga rehabilitacyjna',
    kategoria: 'Ulgi podatkowe',
    krotki_opis: 'Odliczenie wydatków związanych z rehabilitacją od podatku dochodowego.',
    kwalifikacja: [
      'Osoba niepełnosprawna lub jej opiekun',
      'Wydatki na cele rehabilitacyjne lub ułatwienia w funkcjonowaniu'
    ],
    dokumenty: [
      'Orzeczenie o niepełnosprawności',
      'Faktury/rachunki potwierdzające wydatki',
      'Zeznanie podatkowe PIT'
    ],
    link: 'https://www.gov.pl/web/finanse/ulga-rehabilitacyjna',
    pdf: 'https://www.gov.pl/documents/ulga-rehab.pdf',
    slowa_kluczowe: ['ulga', 'rehabilitacyjna', 'niepełnosprawność', 'podatek', 'PIT', 'odliczenie'],
    ostatnia_aktualizacja: '2024-01-15'
  },
  {
    id: 'zwolnienie-z-oplaty-skarbowej',
    nazwa: 'Zwolnienie z opłaty skarbowej',
    kategoria: 'Ulgi podatkowe',
    krotki_opis: 'Zwolnienie z opłaty skarbowej dla określonych grup społecznych.',
    kwalifikacja: [
      'Osoby o niskich dochodach',
      'Osoby niepełnosprawne',
      'Inne określone w przepisach przypadki'
    ],
    dokumenty: [
      'Wniosek o zwolnienie z opłaty skarbowej',
      'Dokumenty potwierdzające uprawnienie do zwolnienia'
    ],
    link: 'https://www.gov.pl/web/finanse/oplata-skarbowa',
    pdf: 'https://www.gov.pl/documents/oplata-skarbowa.pdf',
    slowa_kluczowe: ['opłata skarbowa', 'zwolnienie', 'podatek', 'urząd', 'dokument'],
    ostatnia_aktualizacja: '2024-02-01'
  },
  {
    id: 'stypendium-socjalne',
    nazwa: 'Stypendium socjalne',
    kategoria: 'Edukacja',
    krotki_opis: 'Wsparcie finansowe dla studentów z trudnej sytuacji materialnej.',
    kwalifikacja: [
      'Student uczelni wyższej',
      'Dochód na osobę w rodzinie poniżej określonego progu',
      'Kontynuowanie studiów'
    ],
    dokumenty: [
      'Wniosek o stypendium socjalne',
      'Zaświadczenia o dochodach członków rodziny',
      'Zaświadczenie o statusie studenta'
    ],
    link: 'https://www.gov.pl/web/nauka/stypendium-socjalne',
    pdf: 'https://www.gov.pl/documents/stypendium-socjalne.pdf',
    slowa_kluczowe: ['stypendium', 'socjalne', 'student', 'studia', 'uczelnia', 'dochody'],
    ostatnia_aktualizacja: '2024-09-01'
  },
  {
    id: 'zasilek-pogrzebowy',
    nazwa: 'Zasiłek pogrzebowy',
    kategoria: 'ZUS',
    krotki_opis: 'Jednorazowe świadczenie z tytułu pokrycia kosztów pogrzebu.',
    kwalifikacja: [
      'Osoba, która pokryła koszty pogrzebu',
      'Zmarły był ubezpieczony lub pobierał świadczenie z ZUS'
    ],
    dokumenty: [
      'Wniosek o zasiłek pogrzebowy',
      'Akt zgonu',
      'Rachunki za pogrzeb'
    ],
    link: 'https://www.zus.pl/swiadczenia/zasilki/zasilek-pogrzebowy',
    pdf: 'https://www.zus.pl/documents/zasilek-pogrzebowy.pdf',
    slowa_kluczowe: ['zasiłek', 'pogrzebowy', 'pogrzeb', 'śmierć', 'ZUS', 'koszty'],
    ostatnia_aktualizacja: '2024-01-10'
  },
  {
    id: 'renta-rodzinna',
    nazwa: 'Renta rodzinna',
    kategoria: 'ZUS',
    krotki_opis: 'Świadczenie dla członków rodziny osoby zmarłej, która była uprawniona do emerytury lub renty.',
    kwalifikacja: [
      'Członek rodziny osoby zmarłej (małżonek, dziecko, rodzic)',
      'Zmarły był uprawniony do emerytury/renty lub spełniał warunki do jej uzyskania'
    ],
    dokumenty: [
      'Wniosek o rentę rodzinną',
      'Akt zgonu',
      'Dokumenty potwierdzające pokrewieństwo',
      'Dokumenty zmarłego dotyczące uprawnień emerytalnych'
    ],
    link: 'https://www.zus.pl/swiadczenia/emerytury-i-renty/renta-rodzinna',
    pdf: 'https://www.zus.pl/documents/renta-rodzinna.pdf',
    slowa_kluczowe: ['renta', 'rodzinna', 'śmierć', 'małżonek', 'dziecko', 'ZUS'],
    ostatnia_aktualizacja: '2024-01-20'
  }
];

// Prosty retriever - szukanie najlepszych dopasowań
const findBestMatches = (query, limit = 3) => {
  const queryLower = query.toLowerCase();
  const scored = swiadczeniaDB.map(sw => {
    let score = 0;
    
    sw.slowa_kluczowe.forEach(keyword => {
      if (queryLower.includes(keyword.toLowerCase())) {
        score += 10;
      }
    });
    
    if (queryLower.includes(sw.nazwa.toLowerCase())) {
      score += 20;
    }
    
    if (queryLower.includes(sw.kategoria.toLowerCase())) {
      score += 5;
    }
    
    return { ...sw, score };
  });
  
  return scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
};

const App = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showPersonalization, setShowPersonalization] = useState(false);
  const [showAlerts, setShowAlerts] = useState(false);
  const [activeTab, setActiveTab] = useState('chat'); // chat, favorites, history, personalization, alerts, pisma, dotacje
  const [pismaQuery, setPismaQuery] = useState('');
  const [pismaLoading, setPismaLoading] = useState(false);
  const [pismaResult, setPismaResult] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('wszystkie');
  const [dotacjeQuery, setDotacjeQuery] = useState('');
  const [dotacjeLoading, setDotacjeLoading] = useState(false);
  const [dotacjeResult, setDotacjeResult] = useState(null);
  const [selectedSektor, setSelectedSektor] = useState('wszystkie');
  
  // Personalizacja
  const [personalizationData, setPersonalizationData] = useState({
    liczba_dzieci: 0,
    wiek_dzieci: [],
    dochod_na_osobe: 0,
    niepelnosprawnosc: false,
    status_zawodowy: 'zatrudniony', // zatrudniony, bezrobotny, student, emeryt
    stan_cywilny: 'single', // single, married, divorced
    wlasnosc_mieszkania: 'wynajem' // wynajem, wlasnosc, spoldzielcze
  });

  // Wczytaj dane z localStorage przy starcie
  useEffect(() => {
    const savedHistory = localStorage.getItem('chatHistory');
    const savedFavorites = localStorage.getItem('favorites');
    const savedPersonalization = localStorage.getItem('personalizationData');
    
    if (savedHistory) {
      setChatHistory(JSON.parse(savedHistory));
    }
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    if (savedPersonalization) {
      setPersonalizationData(JSON.parse(savedPersonalization));
    }
  }, []);

  // Zapisz historię do localStorage
  useEffect(() => {
    if (chatHistory.length > 0) {
      localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
    }
  }, [chatHistory]);

  // Zapisz ulubione do localStorage
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Zapisz personalizację do localStorage
  useEffect(() => {
    localStorage.setItem('personalizationData', JSON.stringify(personalizationData));
  }, [personalizationData]);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    
    const userMessage = { role: 'user', content: query, timestamp: new Date().toISOString() };
    setChatHistory(prev => [...prev, userMessage]);

    try {
      const matches = findBestMatches(query);
      
      if (matches.length === 0) {
        const aiMessage = {
          role: 'assistant',
          content: `Nie znalazłem dokładnego dopasowania do Twojego pytania. Sprawdź oficjalne źródła:\n\n• [Portal Gov.pl](https://www.gov.pl)\n• [ZUS](https://www.zus.pl)\n• [Biznes.gov.pl](https://www.biznes.gov.pl)\n\nMożesz też spróbować doprecyzować pytanie lub zapytać o konkretne świadczenie.`,
          matches: [],
          timestamp: new Date().toISOString()
        };
        setChatHistory(prev => [...prev, aiMessage]);
        setResult(aiMessage);
        setLoading(false);
        return;
      }

      const contextForAI = matches.map(m => 
        `${m.nazwa}: ${m.krotki_opis}`
      ).join('\n');
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const prompt = `Jesteś asystentem obywatela w Polsce. Odpowiadaj TYLKO po polsku. Użytkownik pyta: "${query}"\n\nDostępne świadczenia w bazie danych:\n${contextForAI}\n\nOdpowiedz krótko i konkretnie (max 3-4 zdania):
      1. Które świadczenie/a pasują do pytania użytkownika
      2. Podstawowe informacje o kwalifikacji
      3. Zachęć do sprawdzenia szczegółów poniżej. NIE podawaj linków ani nie wymyślaj świadczeń spoza podanej bazy.`;

      const result = await model.generateContent(prompt);
      console.log(result.response.text());
      const aiResponse = result.response.text();

      const aiMessage = {
        role: 'assistant',
        content: aiResponse,
        matches: matches,
        timestamp: new Date().toISOString()
      };

      setChatHistory(prev => [...prev, aiMessage]);
      setResult(aiMessage);
      
    } catch (error) {
      console.error('Błąd:', error);
      const errorMessage = {
        role: 'assistant',
        content: 'Wystąpił błąd podczas przetwarzania zapytania. Spróbuj ponownie.',
        matches: [],
        timestamp: new Date().toISOString()
      };
      setChatHistory(prev => [...prev, errorMessage]);
      setResult(errorMessage);
    }
    
    setLoading(false);
    setQuery('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSearch();
    }
  };

  const toggleFavorite = (swiadczenieId) => {
    setFavorites(prev => {
      if (prev.includes(swiadczenieId)) {
        return prev.filter(id => id !== swiadczenieId);
      } else {
        return [...prev, swiadczenieId];
      }
    });
  };

  const isFavorite = (swiadczenieId) => {
    return favorites.includes(swiadczenieId);
  };

  const clearHistory = () => {
    if (window.confirm('Czy na pewno chcesz wyczyścić całą historię?')) {
      setChatHistory([]);
      localStorage.removeItem('chatHistory');
    }
  };

  const downloadAllPDFs = (matches) => {
    const pdfsToDownload = matches.filter(m => m.pdf);
    if (pdfsToDownload.length === 0) {
      alert('Brak dostępnych plików PDF dla wybranych świadczeń.');
      return;
    }
    
    pdfsToDownload.forEach((sw, idx) => {
      setTimeout(() => {
        const link = document.createElement('a');
        link.href = sw.pdf;
        link.download = `${sw.id}.pdf`;
        link.click();
      }, idx * 500);
    });
  };

  const getPersonalizedRecommendations = () => {
    const recommendations = [];
    
    if (personalizationData.liczba_dzieci > 0) {
      recommendations.push(swiadczeniaDB.find(s => s.id === '500plus'));
      recommendations.push(swiadczeniaDB.find(s => s.id === 'zasilek-rodzinny'));
      recommendations.push(swiadczeniaDB.find(s => s.id === 'dobry-start'));
    }
    
    if (personalizationData.liczba_dzieci >= 3) {
      recommendations.push(swiadczeniaDB.find(s => s.id === 'karta-duzej-rodziny'));
    }
    
    if (personalizationData.dochod_na_osobe < 1000) {
      recommendations.push(swiadczeniaDB.find(s => s.id === 'dodatek-mieszkaniowy'));
      recommendations.push(swiadczeniaDB.find(s => s.id === 'dodatek-oslonowy'));
    }
    
    if (personalizationData.niepelnosprawnosc) {
      recommendations.push(swiadczeniaDB.find(s => s.id === 'zasilek-pielegnacyjny'));
      recommendations.push(swiadczeniaDB.find(s => s.id === 'swiadczenie-wspierajace'));
      recommendations.push(swiadczeniaDB.find(s => s.id === 'dofinansowanie-turnusu'));
    }
    
    if (personalizationData.status_zawodowy === 'bezrobotny') {
      recommendations.push(swiadczeniaDB.find(s => s.id === 'zasilek-dla-bezrobotnych'));
    }
    
    if (personalizationData.status_zawodowy === 'student') {
      recommendations.push(swiadczeniaDB.find(s => s.id === 'stypendium-socjalne'));
    }
    
    if (personalizationData.status_zawodowy === 'emeryt') {
      recommendations.push(swiadczeniaDB.find(s => s.id === 'emerytura'));
    }
    
    return recommendations.filter(Boolean);
  };

  // Wyszukiwanie pism
  const findMatchingPisma = (query, limit = 5) => {
    const queryLower = query.toLowerCase();
    const scored = pismaDB.map(pismo => {
      let score = 0;
      
      pismo.slowa_kluczowe.forEach(keyword => {
        if (queryLower.includes(keyword.toLowerCase())) {
          score += 10;
        }
      });
      
      if (queryLower.includes(pismo.nazwa.toLowerCase())) {
        score += 20;
      }
      
      if (queryLower.includes(pismo.kategoria.toLowerCase())) {
        score += 5;
      }
      
      return { ...pismo, score };
    });
    
    return scored
      .filter(s => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  };

  const handlePismaSearch = async () => {
    if (!pismaQuery.trim()) return;

    setPismaLoading(true);
    
    try {
      const matches = findMatchingPisma(pismaQuery);
      
      if (matches.length === 0) {
        const aiMessage = {
          content: `Nie znalazłem dokładnego dopasowania w bazie pism. Spróbuj bardziej ogólnego opisu, np:\n- "reklamacja produktu"\n- "wniosek o świadczenie"\n- "odwołanie od decyzji"\n\nLub sprawdź oficjalne źródła:\n• [Portal Gov.pl](https://www.gov.pl)\n• [Wzory pism](https://www.gov.pl/web/gov/wzory-pism)`,
          matches: []
        };
        setPismaResult(aiMessage);
        setPismaLoading(false);
        return;
      }

      const contextForAI = matches.map(m => 
        `${m.nazwa}: ${m.opis}`
      ).join('\n');

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [
            {
              role: 'user',
              content: `Jesteś asystentem prawnym w Polsce. Odpowiadaj TYLKO po polsku.

Użytkownik szuka pisma/wniosku: "${pismaQuery}"

Dostępne pisma w bazie danych:
${contextForAI}

Odpowiedz krótko (2-3 zdania):
1. Które pismo/pisma pasują do potrzeby użytkownika
2. Co użytkownik znajdzie w tych dokumentach
3. Zachęć do pobrania/sprawdzenia szczegółów poniżej

NIE podawaj linków ani nie wymyślaj pism spoza bazy.`
            }
          ]
        })
      });

      const data = await response.json();
      const aiResponse = data.content[0].text;

      setPismaResult({
        content: aiResponse,
        matches: matches
      });
      
    } catch (error) {
      console.error('Błąd:', error);
      setPismaResult({
        content: 'Wystąpił błąd podczas wyszukiwania pism. Spróbuj ponownie.',
        matches: []
      });
    }
    
    setPismaLoading(false);
  };

  const handlePismaKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handlePismaSearch();
    }
  };

  const getCategoryPisma = () => {
    if (selectedCategory === 'wszystkie') {
      return pismaDB;
    }
    return pismaDB.filter(p => p.kategoria === selectedCategory);
  };

  const pismaCategories = ['wszystkie', ...new Set(pismaDB.map(p => p.kategoria))];

  // Wyszukiwanie dotacji
  const findMatchingDotacje = (query, limit = 5) => {
    const queryLower = query.toLowerCase();
    const scored = dotacjeDB.map(dotacja => {
      let score = 0;
      
      dotacja.slowa_kluczowe.forEach(keyword => {
        if (queryLower.includes(keyword.toLowerCase())) {
          score += 10;
        }
      });
      
      if (queryLower.includes(dotacja.nazwa.toLowerCase())) {
        score += 20;
      }
      
      if (queryLower.includes(dotacja.sektor.toLowerCase())) {
        score += 5;
      }
      
      dotacja.beneficjenci.forEach(ben => {
        if (queryLower.includes(ben.toLowerCase())) {
          score += 8;
        }
      });
      
      return { ...dotacja, score };
    });
    
    return scored
      .filter(s => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  };

  const handleDotacjeSearch = async () => {
    if (!dotacjeQuery.trim()) return;

    setDotacjeLoading(true);
    
    try {
      const matches = findMatchingDotacje(dotacjeQuery);
      
      if (matches.length === 0) {
        const aiMessage = {
          content: `Nie znalazłem dokładnego dopasowania w bazie dotacji. Spróbuj bardziej ogólnego opisu, np:\n- "dotacje dla startupy"\n- "wsparcie na OZE"\n- "granty badawcze"\n\nLub sprawdź:\n• [Fundusze Europejskie](https://www.funduszeeuropejskie.gov.pl)\n• [PARP](https://www.parp.gov.pl)`,
          matches: []
        };
        setDotacjeResult(aiMessage);
        setDotacjeLoading(false);
        return;
      }

      const contextForAI = matches.map(m => 
        `${m.nazwa} (${m.sektor}): ${m.opis}. Beneficjenci: ${m.beneficjenci.join(', ')}`
      ).join('\n');

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [
            {
              role: 'user',
              content: `Jesteś ekspertem ds. funduszy i dotacji w Polsce. Odpowiadaj TYLKO po polsku.

Użytkownik szuka dotacji: "${dotacjeQuery}"

Dostępne programy dotacyjne:
${contextForAI}

Odpowiedz krótko (2-3 zdania):
1. Który program/y pasują do potrzeby użytkownika
2. Kto może się ubiegać i na co można otrzymać wsparcie
3. Zachęć do sprawdzenia szczegółów poniżej

NIE podawaj linków ani nie wymyślaj programów spoza bazy.`
            }
          ]
        })
      });

      const data = await response.json();
      const aiResponse = data.content[0].text;

      setDotacjeResult({
        content: aiResponse,
        matches: matches
      });
      
    } catch (error) {
      console.error('Błąd:', error);
      setDotacjeResult({
        content: 'Wystąpił błąd podczas wyszukiwania dotacji. Spróbuj ponownie.',
        matches: []
      });
    }
    
    setDotacjeLoading(false);
  };

  const handleDotacjeKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleDotacjeSearch();
    }
  };

  const getSektorDotacje = () => {
    if (selectedSektor === 'wszystkie') {
      return dotacjeDB;
    }
    return dotacjeDB.filter(d => d.sektor === selectedSektor);
  };

  const dotacjeSektory = ['wszystkie', ...new Set(dotacjeDB.map(d => d.sektor))];

  const exampleQuestions = [
    "Czy mogę dostać 500+ na dziecko?",
    "Mam dwójkę dzieci i nie stać mnie na rachunki",
    "Jakie wsparcie dla osoby niepełnosprawnej?",
    "Dodatek na ogrzewanie - kto może dostać?"
  ];

  const renderSwiadczenie = (sw, showFavoriteButton = true) => (
    <div key={sw.id} style={{
      background: '#f8f9fb',
      borderRadius: '12px',
      padding: '20px',
      marginBottom: '15px',
      border: '2px solid #e1e8ed',
      position: 'relative'
    }}>
      {showFavoriteButton && (
        <button
          onClick={() => toggleFavorite(sw.id)}
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '24px',
            transition: 'transform 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          {isFavorite(sw.id) ? '❤️' : '🤍'}
        </button>
      )}
      
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '10px'
      }}>
        <CheckCircle size={24} color="#10b981" />
        <h3 style={{
          fontSize: '20px',
          fontWeight: '700',
          color: '#2c3e50',
          margin: 0,
          paddingRight: '40px'
        }}>
          {sw.nazwa}
        </h3>
      </div>
      
      <div style={{
        display: 'inline-block',
        background: '#e8f4f8',
        color: '#2c5aa0',
        padding: '4px 12px',
        borderRadius: '20px',
        fontSize: '14px',
        fontWeight: '600',
        marginBottom: '15px'
      }}>
        {sw.kategoria}
      </div>

      <p style={{
        color: '#5a6c7d',
        lineHeight: '1.6',
        marginBottom: '15px'
      }}>
        {sw.krotki_opis}
      </p>

      <div style={{ marginBottom: '15px' }}>
        <h4 style={{
          fontSize: '16px',
          fontWeight: '600',
          color: '#2c3e50',
          marginBottom: '10px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <CheckCircle size={18} color="#2c5aa0" />
          Kto może skorzystać:
        </h4>
        <ul style={{
          paddingLeft: '20px',
          color: '#5a6c7d',
          lineHeight: '1.8'
        }}>
          {sw.kwalifikacja.map((k, kIdx) => (
            <li key={kIdx}>{k}</li>
          ))}
        </ul>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <h4 style={{
          fontSize: '16px',
          fontWeight: '600',
          color: '#2c3e50',
          marginBottom: '10px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <FileText size={18} color="#2c5aa0" />
          Potrzebne dokumenty:
        </h4>
        <ul style={{
          paddingLeft: '20px',
          color: '#5a6c7d',
          lineHeight: '1.8'
        }}>
          {sw.dokumenty.map((d, dIdx) => (
            <li key={dIdx}>{d}</li>
          ))}
        </ul>
      </div>

      <div style={{
        display: 'flex',
        gap: '10px',
        flexWrap: 'wrap'
      }}>
        <a
          href={sw.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '14px',
            transition: 'transform 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <ExternalLink size={16} />
          Oficjalna strona
        </a>
        
        {sw.pdf && (
          <a
            href={sw.pdf}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: '#f8f9fb',
              color: '#2c5aa0',
              padding: '10px 20px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '14px',
              border: '2px solid #2c5aa0',
              transition: 'transform 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <Download size={16} />
            Pobierz PDF
          </a>
        )}
      </div>
      
      <div style={{
        marginTop: '15px',
        fontSize: '12px',
        color: '#999',
        fontStyle: 'italic'
      }}>
        Ostatnia aktualizacja: {sw.ostatnia_aktualizacja}
      </div>
    </div>
  );

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%)',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '30px',
          marginBottom: '20px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '15px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '15px'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)',
                color: 'white',
                width: '50px',
                height: '50px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px'
              }}>
                📋
              </div>
              <div>
                <h1 style={{
                  fontSize: '28px',
                  fontWeight: '800',
                  color: '#2c3e50',
                  margin: 0
                }}>
                  Pomocnik Obywatela
                </h1>
                <p style={{
                  color: '#5a6c7d',
                  fontSize: '14px',
                  margin: 0
                }}>
                  AI-powered assistant
                </p>
              </div>
            </div>
            
            {/* Navigation */}
            <div style={{
              display: 'flex',
              gap: '10px',
              flexWrap: 'wrap'
            }}>
              <button
                onClick={() => setActiveTab('chat')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: activeTab === 'chat' ? 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)' : '#f8f9fb',
                  color: activeTab === 'chat' ? 'white' : '#2c5aa0',
                  border: 'none',
                  padding: '10px 16px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '14px'
                }}
              >
                <MessageSquare size={18} />
                Chat
              </button>
              <button
                onClick={() => setActiveTab('personalization')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: activeTab === 'personalization' ? 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)' : '#f8f9fb',
                  color: activeTab === 'personalization' ? 'white' : '#2c5aa0',
                  border: 'none',
                  padding: '10px 16px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '14px'
                }}
              >
                <User size={18} />
                Personalizacja
              </button>
              <button
                onClick={() => setActiveTab('favorites')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: activeTab === 'favorites' ? 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)' : '#f8f9fb',
                  color: activeTab === 'favorites' ? 'white' : '#2c5aa0',
                  border: 'none',
                  padding: '10px 16px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '14px',
                  position: 'relative'
                }}
              >
                <Heart size={18} />
                Ulubione {favorites.length > 0 && `(${favorites.length})`}
              </button>
              <button
                onClick={() => setActiveTab('history')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: activeTab === 'history' ? 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)' : '#f8f9fb',
                  color: activeTab === 'history' ? 'white' : '#2c5aa0',
                  border: 'none',
                  padding: '10px 16px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '14px'
                }}
              >
                <History size={18} />
                Historia
              </button>
              <button
                onClick={() => setActiveTab('alerts')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: activeTab === 'alerts' ? 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)' : '#f8f9fb',
                  color: activeTab === 'alerts' ? 'white' : '#2c5aa0',
                  border: 'none',
                  padding: '10px 16px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '14px'
                }}
              >
                <Bell size={18} />
                Powiadomienia
              </button>
              <button
                onClick={() => setActiveTab('pisma')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: activeTab === 'pisma' ? 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)' : '#f8f9fb',
                  color: activeTab === 'pisma' ? 'white' : '#2c5aa0',
                  border: 'none',
                  padding: '10px 16px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '14px'
                }}
              >
                <Edit size={18} />
                Pisma i wnioski
              </button>
              <button
                onClick={() => setActiveTab('dotacje')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: activeTab === 'dotacje' ? 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)' : '#f8f9fb',
                  color: activeTab === 'dotacje' ? 'white' : '#2c5aa0',
                  border: 'none',
                  padding: '10px 16px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '14px'
                }}
              >
                <TrendingUp size={18} />
                Dotacje
              </button>
            </div>
          </div>
        </div>

        {/* Personalization Tab */}
        {activeTab === 'personalization' && (
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '30px',
            marginBottom: '20px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
          }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#2c3e50',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <Settings size={24} color="#2c5aa0" />
              Personalizacja - Powiedz nam o sobie
            </h2>
            <p style={{
              color: '#5a6c7d',
              marginBottom: '25px',
              lineHeight: '1.6'
            }}>
              Podaj podstawowe informacje o swojej sytuacji, a pokażemy Ci świadczenia, które mogą Ci przysługiwać.
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '20px',
              marginBottom: '25px'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  fontWeight: '600',
                  color: '#2c3e50',
                  marginBottom: '8px'
                }}>
                  Liczba dzieci:
                </label>
                <input
                  type="number"
                  min="0"
                  value={personalizationData.liczba_dzieci}
                  onChange={(e) => setPersonalizationData({
                    ...personalizationData,
                    liczba_dzieci: parseInt(e.target.value) || 0
                  })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e1e8ed',
                    borderRadius: '8px',
                    fontSize: '16px'
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontWeight: '600',
                  color: '#2c3e50',
                  marginBottom: '8px'
                }}>
                  Dochód na osobę (zł/miesiąc):
                </label>
                <input
                  type="number"
                  min="0"
                  value={personalizationData.dochod_na_osobe}
                  onChange={(e) => setPersonalizationData({
                    ...personalizationData,
                    dochod_na_osobe: parseInt(e.target.value) || 0
                  })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e1e8ed',
                    borderRadius: '8px',
                    fontSize: '16px'
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontWeight: '600',
                  color: '#2c3e50',
                  marginBottom: '8px'
                }}>
                  Status zawodowy:
                </label>
                <select
                  value={personalizationData.status_zawodowy}
                  onChange={(e) => setPersonalizationData({
                    ...personalizationData,
                    status_zawodowy: e.target.value
                  })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e1e8ed',
                    borderRadius: '8px',
                    fontSize: '16px'
                  }}
                >
                  <option value="zatrudniony">Zatrudniony</option>
                  <option value="bezrobotny">Bezrobotny</option>
                  <option value="student">Student</option>
                  <option value="emeryt">Emeryt/Rencista</option>
                </select>
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontWeight: '600',
                  color: '#2c3e50',
                  marginBottom: '8px'
                }}>
                  Mieszkanie:
                </label>
                <select
                  value={personalizationData.wlasnosc_mieszkania}
                  onChange={(e) => setPersonalizationData({
                    ...personalizationData,
                    wlasnosc_mieszkania: e.target.value
                  })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e1e8ed',
                    borderRadius: '8px',
                    fontSize: '16px'
                  }}
                >
                  <option value="wynajem">Wynajem</option>
                  <option value="wlasnosc">Własność</option>
                  <option value="spoldzielcze">Spółdzielcze</option>
                </select>
              </div>
            </div>

            <div style={{
              marginBottom: '25px'
            }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                cursor: 'pointer',
                fontWeight: '600',
                color: '#2c3e50'
              }}>
                <input
                  type="checkbox"
                  checked={personalizationData.niepelnosprawnosc}
                  onChange={(e) => setPersonalizationData({
                    ...personalizationData,
                    niepelnosprawnosc: e.target.checked
                  })}
                  style={{
                    width: '20px',
                    height: '20px',
                    cursor: 'pointer'
                  }}
                />
                Niepełnosprawność (Ty lub członek rodziny)
              </label>
            </div>

            {/* Personalized Recommendations */}
            {getPersonalizedRecommendations().length > 0 && (
              <div style={{
                background: 'linear-gradient(135deg, #e8f4f8 0%, #d6ebf5 100%)',
                padding: '25px',
                borderRadius: '12px',
                border: '2px solid #2c5aa0'
              }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  color: '#2c3e50',
                  marginBottom: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <Sparkles size={24} color="#2c5aa0" />
                  Świadczenia dla Ciebie ({getPersonalizedRecommendations().length})
                </h3>
                <p style={{
                  color: '#5a6c7d',
                  marginBottom: '20px'
                }}>
                  Na podstawie podanych informacji, mogą Ci przysługiwać następujące świadczenia:
                </p>
                {getPersonalizedRecommendations().map(sw => renderSwiadczenie(sw))}
              </div>
            )}

            {getPersonalizedRecommendations().length === 0 && (
              <div style={{
                background: '#f8f9fb',
                padding: '20px',
                borderRadius: '12px',
                textAlign: 'center',
                color: '#5a6c7d'
              }}>
                Uzupełnij dane powyżej, aby zobaczyć spersonalizowane rekomendacje.
              </div>
            )}
          </div>
        )}

        {/* Favorites Tab */}
        {activeTab === 'favorites' && (
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '30px',
            marginBottom: '20px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
          }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#2c3e50',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <Heart size={24} color="#2c5aa0" />
              Ulubione świadczenia ({favorites.length})
            </h2>
            
            {favorites.length === 0 ? (
              <div style={{
                background: '#f8f9fb',
                padding: '40px',
                borderRadius: '12px',
                textAlign: 'center',
                color: '#5a6c7d'
              }}>
                <Heart size={48} color="#ccc" style={{ marginBottom: '15px' }} />
                <p style={{ fontSize: '18px', marginBottom: '10px' }}>
                  Nie masz jeszcze ulubionych świadczeń
                </p>
                <p>
                  Kliknij ikonę serca przy interesujących Cię świadczeniach, aby zapisać je tutaj.
                </p>
              </div>
            ) : (
              <>
                {swiadczeniaDB.filter(sw => favorites.includes(sw.id)).map(sw => renderSwiadczenie(sw))}
                
                <button
                  onClick={() => downloadAllPDFs(swiadczeniaDB.filter(sw => favorites.includes(sw.id)))}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    background: 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)',
                    color: 'white',
                    border: 'none',
                    padding: '15px 25px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '16px',
                    marginTop: '20px'
                  }}
                >
                  <Download size={20} />
                  Pobierz wszystkie PDF-y ({swiadczeniaDB.filter(sw => favorites.includes(sw.id) && sw.pdf).length})
                </button>
              </>
            )}
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '30px',
            marginBottom: '20px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <h2 style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#2c3e50',
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <History size={24} color="#2c5aa0" />
                Historia rozmów
              </h2>
              
              {chatHistory.length > 0 && (
                <button
                  onClick={clearHistory}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: '#fee',
                    color: '#c33',
                    border: '2px solid #c33',
                    padding: '10px 16px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '14px'
                  }}
                >
                  <Trash2 size={16} />
                  Wyczyść historię
                </button>
              )}
            </div>

            {chatHistory.length === 0 ? (
              <div style={{
                background: '#f8f9fb',
                padding: '40px',
                borderRadius: '12px',
                textAlign: 'center',
                color: '#5a6c7d'
              }}>
                <History size={48} color="#ccc" style={{ marginBottom: '15px' }} />
                <p style={{ fontSize: '18px' }}>
                  Brak historii rozmów
                </p>
              </div>
            ) : (
              <div style={{
                maxHeight: '600px',
                overflowY: 'auto'
              }}>
                {chatHistory.map((msg, idx) => (
                  <div key={idx} style={{
                    marginBottom: '20px',
                    padding: '15px',
                    background: msg.role === 'user' ? '#e8f4f8' : '#f8f9fb',
                    borderRadius: '12px',
                    border: `2px solid ${msg.role === 'user' ? '#2c5aa0' : '#e1e8ed'}`
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      marginBottom: '10px'
                    }}>
                      <div style={{
                        fontSize: '20px'
                      }}>
                        {msg.role === 'user' ? '👤' : '🤖'}
                      </div>
                      <div style={{
                        fontWeight: '600',
                        color: '#2c5aa0'
                      }}>
                        {msg.role === 'user' ? 'Ty' : 'Asystent AI'}
                      </div>
                      <div style={{
                        fontSize: '12px',
                        color: '#999',
                        marginLeft: 'auto'
                      }}>
                        {new Date(msg.timestamp).toLocaleString('pl-PL')}
                      </div>
                    </div>
                    <div style={{
                      color: '#2c3e50',
                      lineHeight: '1.6',
                      whiteSpace: 'pre-wrap'
                    }}>
                      {msg.content}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Alerts Tab */}
        {activeTab === 'alerts' && (
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '30px',
            marginBottom: '20px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
          }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#2c3e50',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <Bell size={24} color="#2c5aa0" />
              Powiadomienia o zmianach
            </h2>

            <div style={{
              background: 'linear-gradient(135deg, #fff4e6 0%, #ffe8cc 100%)',
              padding: '20px',
              borderRadius: '12px',
              border: '2px solid #ff9800',
              marginBottom: '20px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '10px'
              }}>
                <AlertCircle size={24} color="#ff9800" />
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#2c3e50',
                  margin: 0
                }}>
                  Aktualizacja przepisów - 01.03.2024
                </h3>
              </div>
              <p style={{
                color: '#5a6c7d',
                lineHeight: '1.6',
                marginBottom: '10px'
              }}>
                <strong>Program Czyste Powietrze</strong> - zwiększono wysokość dofinansowania dla gospodarstw o najniższych dochodach.
              </p>
              <a
                href="https://www.gov.pl/web/nfosigw/czyste-powietrze"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#2c5aa0',
                  fontWeight: '600'
                }}
              >
                Sprawdź szczegóły →
              </a>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, #e8f4f8 0%, #d6ebf5 100%)',
              padding: '20px',
              borderRadius: '12px',
              border: '2px solid #2c5aa0',
              marginBottom: '20px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '10px'
              }}>
                <CheckCircle size={24} color="#10b981" />
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#2c3e50',
                  margin: 0
                }}>
                  Nowe świadczenie dostępne
                </h3>
              </div>
              <p style={{
                color: '#5a6c7d',
                lineHeight: '1.6',
                marginBottom: '10px'
              }}>
                <strong>Bon energetyczny</strong> - nowy program wsparcia dla gospodarstw domowych o niższych dochodach. Sprawdź, czy się kwalifikujesz!
              </p>
              <button
                onClick={() => {
                  setActiveTab('chat');
                  setQuery('Bon energetyczny - kto może dostać?');
                }}
                style={{
                  background: '#2c5aa0',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                Sprawdź szczegóły
              </button>
            </div>

            <div style={{
              background: '#f8f9fb',
              padding: '20px',
              borderRadius: '12px',
              border: '2px solid #e1e8ed'
            }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '700',
                color: '#2c3e50',
                marginBottom: '15px'
              }}>
                Subskrybuj powiadomienia
              </h3>
              <p style={{
                color: '#5a6c7d',
                lineHeight: '1.6',
                marginBottom: '15px'
              }}>
                Otrzymuj powiadomienia o zmianach w przepisach i nowych świadczeniach dla Twoich ulubionych kategorii.
              </p>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px'
              }}>
                {['Świadczenia rodzinne', 'Pomoc społeczna', 'Energia', 'ZUS', 'Rehabilitacja'].map(cat => (
                  <label key={cat} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'white',
                    padding: '10px 15px',
                    borderRadius: '8px',
                    border: '2px solid #e1e8ed',
                    cursor: 'pointer'
                  }}>
                    <input type="checkbox" style={{ cursor: 'pointer' }} />
                    <span style={{ fontSize: '14px', fontWeight: '600' }}>{cat}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Pisma i Wnioski Tab */}
        {activeTab === 'pisma' && (
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '30px',
            marginBottom: '20px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
          }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#2c3e50',
              marginBottom: '10px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <Edit size={24} color="#2c5aa0" />
              Pisma i wnioski do pobrania
            </h2>
            <p style={{
              color: '#5a6c7d',
              marginBottom: '25px',
              lineHeight: '1.6'
            }}>
              Znajdź potrzebny dokument - przeglądaj bazę lub zapytaj AI o konkretne pismo.
            </p>

            {/* AI Search */}
            <div style={{
              background: 'linear-gradient(135deg, #e8f4f8 0%, #d6ebf5 100%)',
              padding: '25px',
              borderRadius: '12px',
              marginBottom: '30px',
              border: '2px solid #2c5aa0'
            }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '700',
                color: '#2c3e50',
                marginBottom: '15px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <Sparkles size={20} color="#2c5aa0" />
                Zapytaj AI o pismo
              </h3>
              
              <textarea
                value={pismaQuery}
                onChange={(e) => setPismaQuery(e.target.value)}
                onKeyPress={handlePismaKeyPress}
                placeholder="Np. 'Potrzebuję pisma reklamacyjnego do spółdzielni' lub 'Jak złożyć wniosek o emeryturę?'"
                style={{
                  width: '100%',
                  minHeight: '80px',
                  padding: '15px',
                  fontSize: '16px',
                  border: '2px solid #2c5aa0',
                  borderRadius: '8px',
                  resize: 'vertical',
                  fontFamily: 'inherit',
                  marginBottom: '15px'
                }}
              />
              
              <button
                onClick={handlePismaSearch}
                disabled={pismaLoading || !pismaQuery.trim()}
                style={{
                  background: pismaLoading ? '#ccc' : 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '12px 25px',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: pismaLoading ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                {pismaLoading ? (
                  <>
                    <Loader size={18} className="spin" />
                    Szukam...
                  </>
                ) : (
                  <>
                    <Search size={18} />
                    Znajdź pismo
                  </>
                )}
              </button>

              {/* AI Result */}
              {pismaResult && (
                <div style={{
                  marginTop: '20px',
                  background: 'white',
                  padding: '20px',
                  borderRadius: '12px'
                }}>
                  <div style={{
                    color: '#2c3e50',
                    lineHeight: '1.6',
                    marginBottom: '20px',
                    whiteSpace: 'pre-wrap'
                  }}>
                    {pismaResult.content}
                  </div>

                  {pismaResult.matches && pismaResult.matches.length > 0 && (
                    <div>
                      {pismaResult.matches.map((pismo, idx) => (
                        <div key={idx} style={{
                          background: '#f8f9fb',
                          padding: '20px',
                          borderRadius: '12px',
                          marginBottom: '15px',
                          border: '2px solid #e1e8ed'
                        }}>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            marginBottom: '10px'
                          }}>
                            <FileText size={24} color="#2c5aa0" />
                            <h4 style={{
                              fontSize: '18px',
                              fontWeight: '700',
                              color: '#2c3e50',
                              margin: 0
                            }}>
                              {pismo.nazwa}
                            </h4>
                          </div>

                          <div style={{
                            display: 'inline-block',
                            background: '#e8f4f8',
                            color: '#2c5aa0',
                            padding: '4px 12px',
                            borderRadius: '20px',
                            fontSize: '14px',
                            fontWeight: '600',
                            marginBottom: '12px'
                          }}>
                            {pismo.kategoria}
                          </div>

                          <p style={{
                            color: '#5a6c7d',
                            lineHeight: '1.6',
                            marginBottom: '15px'
                          }}>
                            {pismo.opis}
                          </p>

                          <div style={{
                            display: 'flex',
                            gap: '10px',
                            flexWrap: 'wrap'
                          }}>
                            {pismo.pdf ? (
                              <a
                                href={pismo.pdf}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '8px',
                                  background: 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)',
                                  color: 'white',
                                  padding: '10px 20px',
                                  borderRadius: '8px',
                                  textDecoration: 'none',
                                  fontWeight: '600',
                                  fontSize: '14px'
                                }}
                              >
                                <Download size={16} />
                                Pobierz PDF
                              </a>
                            ) : (
                              <a
                                href={pismo.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '8px',
                                  background: 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)',
                                  color: 'white',
                                  padding: '10px 20px',
                                  borderRadius: '8px',
                                  textDecoration: 'none',
                                  fontWeight: '600',
                                  fontSize: '14px'
                                }}
                              >
                                <ExternalLink size={16} />
                                {pismo.szablon ? 'Zobacz szablon' : 'Więcej informacji'}
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Category Filter */}
            <div style={{
              marginBottom: '20px'
            }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '700',
                color: '#2c3e50',
                marginBottom: '15px'
              }}>
                Przeglądaj po kategorii
              </h3>
              <div style={{
                display: 'flex',
                gap: '10px',
                flexWrap: 'wrap'
              }}>
                {pismaCategories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    style={{
                      background: selectedCategory === cat 
                        ? 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)' 
                        : '#f8f9fb',
                      color: selectedCategory === cat ? 'white' : '#2c5aa0',
                      border: selectedCategory === cat ? 'none' : '2px solid #e1e8ed',
                      padding: '10px 20px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: '600',
                      fontSize: '14px',
                      transition: 'all 0.2s',
                      textTransform: 'capitalize'
                    }}
                  >
                    {cat} ({cat === 'wszystkie' ? pismaDB.length : pismaDB.filter(p => p.kategoria === cat).length})
                  </button>
                ))}
              </div>
            </div>

            {/* Documents Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '20px'
            }}>
              {getCategoryPisma().map(pismo => (
                <div key={pismo.id} style={{
                  background: '#f8f9fb',
                  padding: '20px',
                  borderRadius: '12px',
                  border: '2px solid #e1e8ed',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '10px'
                  }}>
                    {pismo.pdf ? (
                      <Download size={24} color="#10b981" />
                    ) : (
                      <FileText size={24} color="#2c5aa0" />
                    )}
                    <div style={{
                      flex: 1
                    }}>
                      <h4 style={{
                        fontSize: '16px',
                        fontWeight: '700',
                        color: '#2c3e50',
                        margin: 0,
                        lineHeight: '1.3'
                      }}>
                        {pismo.nazwa}
                      </h4>
                    </div>
                  </div>

                  <div style={{
                    display: 'inline-block',
                    background: '#e8f4f8',
                    color: '#2c5aa0',
                    padding: '3px 10px',
                    borderRadius: '15px',
                    fontSize: '12px',
                    fontWeight: '600',
                    marginBottom: '12px'
                  }}>
                    {pismo.kategoria}
                  </div>

                  <p style={{
                    color: '#5a6c7d',
                    fontSize: '14px',
                    lineHeight: '1.5',
                    marginBottom: '15px',
                    minHeight: '60px'
                  }}>
                    {pismo.opis}
                  </p>

                  {pismo.pdf ? (
                    <a
                      href={pismo.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        background: 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)',
                        color: 'white',
                        padding: '10px 15px',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        fontWeight: '600',
                        fontSize: '14px',
                        width: '100%'
                      }}
                    >
                      <Download size={16} />
                      Pobierz PDF
                    </a>
                  ) : (
                    <a
                      href={pismo.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        background: '#f8f9fb',
                        color: '#2c5aa0',
                        padding: '10px 15px',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        fontWeight: '600',
                        fontSize: '14px',
                        border: '2px solid #2c5aa0',
                        width: '100%'
                      }}
                    >
                      <ExternalLink size={16} />
                      Zobacz więcej
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Dotacje Tab */}
        {activeTab === 'dotacje' && (
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '30px',
            marginBottom: '20px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
          }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#2c3e50',
              marginBottom: '10px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <TrendingUp size={24} color="#2c5aa0" />
              Dotacje i granty - aktywne programy 2024-2025
            </h2>
            <p style={{
              color: '#5a6c7d',
              marginBottom: '25px',
              lineHeight: '1.6'
            }}>
              Przeglądaj aktualne programy dotacyjne lub zapytaj AI o najlepsze źródło finansowania dla Twojego projektu.
            </p>

            {/* AI Search */}
            <div style={{
              background: 'linear-gradient(135deg, #e8f4f8 0%, #d6ebf5 100%)',
              padding: '25px',
              borderRadius: '12px',
              marginBottom: '30px',
              border: '2px solid #2c5aa0'
            }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '700',
                color: '#2c3e50',
                marginBottom: '15px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <Sparkles size={20} color="#2c5aa0" />
                Zapytaj AI o dotację
              </h3>
              
              <textarea
                value={dotacjeQuery}
                onChange={(e) => setDotacjeQuery(e.target.value)}
                onKeyPress={handleDotacjeKeyPress}
                placeholder="Np. 'Szukam dotacji na fotowoltaikę dla firmy' lub 'Granty na badania medyczne'"
                style={{
                  width: '100%',
                  minHeight: '80px',
                  padding: '15px',
                  fontSize: '16px',
                  border: '2px solid #2c5aa0',
                  borderRadius: '8px',
                  resize: 'vertical',
                  fontFamily: 'inherit',
                  marginBottom: '15px'
                }}
              />
              
              <button
                onClick={handleDotacjeSearch}
                disabled={dotacjeLoading || !dotacjeQuery.trim()}
                style={{
                  background: dotacjeLoading ? '#ccc' : 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '12px 25px',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: dotacjeLoading ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                {dotacjeLoading ? (
                  <>
                    <Loader size={18} className="spin" />
                    Szukam...
                  </>
                ) : (
                  <>
                    <Search size={18} />
                    Znajdź dotację
                  </>
                )}
              </button>

              {/* AI Result */}
              {dotacjeResult && (
                <div style={{
                  marginTop: '20px',
                  background: 'white',
                  padding: '20px',
                  borderRadius: '12px'
                }}>
                  <div style={{
                    color: '#2c3e50',
                    lineHeight: '1.6',
                    marginBottom: '20px',
                    whiteSpace: 'pre-wrap'
                  }}>
                    {dotacjeResult.content}
                  </div>

                  {dotacjeResult.matches && dotacjeResult.matches.length > 0 && (
                    <div>
                      {dotacjeResult.matches.map((dotacja, idx) => (
                        <div key={idx} style={{
                          background: '#f8f9fb',
                          padding: '20px',
                          borderRadius: '12px',
                          marginBottom: '15px',
                          border: '2px solid #e1e8ed'
                        }}>
                          <div style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            justifyContent: 'space-between',
                            marginBottom: '15px',
                            gap: '15px'
                          }}>
                            <div style={{ flex: 1 }}>
                              <h4 style={{
                                fontSize: '20px',
                                fontWeight: '700',
                                color: '#2c3e50',
                                marginBottom: '8px'
                              }}>
                                {dotacja.nazwa}
                              </h4>
                              <div style={{
                                display: 'flex',
                                gap: '8px',
                                flexWrap: 'wrap',
                                marginBottom: '10px'
                              }}>
                                <span style={{
                                  background: '#e8f4f8',
                                  color: '#2c5aa0',
                                  padding: '4px 12px',
                                  borderRadius: '15px',
                                  fontSize: '13px',
                                  fontWeight: '600'
                                }}>
                                  {dotacja.sektor}
                                </span>
                                <span style={{
                                  background: '#d1fae5',
                                  color: '#059669',
                                  padding: '4px 12px',
                                  borderRadius: '15px',
                                  fontSize: '13px',
                                  fontWeight: '600'
                                }}>
                                  {dotacja.status}
                                </span>
                              </div>
                            </div>
                            <div style={{
                              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                              color: 'white',
                              padding: '12px 16px',
                              borderRadius: '8px',
                              textAlign: 'center',
                              minWidth: '140px'
                            }}>
                              <div style={{
                                fontSize: '12px',
                                opacity: '0.9',
                                marginBottom: '4px'
                              }}>
                                Max kwota
                              </div>
                              <div style={{
                                fontSize: '18px',
                                fontWeight: '700'
                              }}>
                                {dotacja.kwota_max}
                              </div>
                            </div>
                          </div>

                          <p style={{
                            color: '#5a6c7d',
                            lineHeight: '1.6',
                            marginBottom: '15px'
                          }}>
                            {dotacja.opis}
                          </p>

                          <div style={{
                            background: 'white',
                            padding: '15px',
                            borderRadius: '8px',
                            marginBottom: '15px'
                          }}>
                            <h5 style={{
                              fontSize: '14px',
                              fontWeight: '700',
                              color: '#2c3e50',
                              marginBottom: '8px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px'
                            }}>
                              <Building2 size={16} color="#2c5aa0" />
                              Beneficjenci:
                            </h5>
                            <div style={{
                              display: 'flex',
                              gap: '8px',
                              flexWrap: 'wrap'
                            }}>
                              {dotacja.beneficjenci.map((ben, benIdx) => (
                                <span key={benIdx} style={{
                                  background: '#f8f9fb',
                                  color: '#5a6c7d',
                                  padding: '6px 12px',
                                  borderRadius: '6px',
                                  fontSize: '13px',
                                  border: '1px solid #e1e8ed'
                                }}>
                                  {ben}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div style={{
                            background: 'white',
                            padding: '15px',
                            borderRadius: '8px',
                            marginBottom: '15px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px'
                          }}>
                            <AlertCircle size={20} color="#ff9800" />
                            <div>
                              <strong style={{ color: '#2c3e50' }}>Termin:</strong>{' '}
                              <span style={{ color: '#5a6c7d' }}>{dotacja.termin}</span>
                            </div>
                          </div>

                          <a
                            href={dotacja.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '8px',
                              background: 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)',
                              color: 'white',
                              padding: '12px 24px',
                              borderRadius: '8px',
                              textDecoration: 'none',
                              fontWeight: '600',
                              fontSize: '15px',
                              transition: 'transform 0.2s'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                          >
                            <ExternalLink size={18} />
                            Szczegóły programu
                          </a>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Sektor Filter */}
            <div style={{
              marginBottom: '20px'
            }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '700',
                color: '#2c3e50',
                marginBottom: '15px'
              }}>
                Przeglądaj po sektorze
              </h3>
              <div style={{
                display: 'flex',
                gap: '10px',
                flexWrap: 'wrap'
              }}>
                {dotacjeSektory.map(sektor => (
                  <button
                    key={sektor}
                    onClick={() => setSelectedSektor(sektor)}
                    style={{
                      background: selectedSektor === sektor 
                        ? 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)' 
                        : '#f8f9fb',
                      color: selectedSektor === sektor ? 'white' : '#2c5aa0',
                      border: selectedSektor === sektor ? 'none' : '2px solid #e1e8ed',
                      padding: '10px 20px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: '600',
                      fontSize: '14px',
                      transition: 'all 0.2s',
                      textTransform: 'capitalize'
                    }}
                  >
                    {sektor} ({sektor === 'wszystkie' ? dotacjeDB.length : dotacjeDB.filter(d => d.sektor === sektor).length})
                  </button>
                ))}
              </div>
            </div>

            {/* Dotacje Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gap: '20px'
            }}>
              {getSektorDotacje().map(dotacja => (
                <div key={dotacja.id} style={{
                  background: '#f8f9fb',
                  padding: '20px',
                  borderRadius: '12px',
                  border: '2px solid #e1e8ed',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '12px',
                    gap: '10px'
                  }}>
                    <h4 style={{
                      fontSize: '17px',
                      fontWeight: '700',
                      color: '#2c3e50',
                      margin: 0,
                      lineHeight: '1.3',
                      flex: 1
                    }}>
                      {dotacja.nazwa}
                    </h4>
                  </div>

                  <div style={{
                    display: 'flex',
                    gap: '6px',
                    marginBottom: '12px',
                    flexWrap: 'wrap'
                  }}>
                    <span style={{
                      background: '#e8f4f8',
                      color: '#2c5aa0',
                      padding: '3px 10px',
                      borderRadius: '15px',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      {dotacja.sektor}
                    </span>
                    <span style={{
                      background: '#d1fae5',
                      color: '#059669',
                      padding: '3px 10px',
                      borderRadius: '15px',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      aktywna
                    </span>
                  </div>

                  <p style={{
                    color: '#5a6c7d',
                    fontSize: '14px',
                    lineHeight: '1.5',
                    marginBottom: '15px',
                    flex: 1
                  }}>
                    {dotacja.opis}
                  </p>

                  <div style={{
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: 'white',
                    padding: '10px',
                    borderRadius: '8px',
                    textAlign: 'center',
                    marginBottom: '12px'
                  }}>
                    <div style={{
                      fontSize: '11px',
                      opacity: '0.9',
                      marginBottom: '2px'
                    }}>
                      Maksymalna kwota
                    </div>
                    <div style={{
                      fontSize: '16px',
                      fontWeight: '700'
                    }}>
                      {dotacja.kwota_max}
                    </div>
                  </div>

                  <div style={{
                    fontSize: '12px',
                    color: '#5a6c7d',
                    marginBottom: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <AlertCircle size={14} />
                    <span>{dotacja.termin}</span>
                  </div>

                  <a
                    href={dotacja.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      background: 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)',
                      color: 'white',
                      padding: '10px 15px',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      fontWeight: '600',
                      fontSize: '14px'
                    }}
                  >
                    <ExternalLink size={16} />
                    Szczegóły
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Chat Tab */}
        {activeTab === 'chat' && (
          <>
            {chatHistory.length > 0 && (
              <div style={{
                background: 'white',
                borderRadius: '16px',
                padding: '30px',
                marginBottom: '20px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                maxHeight: '500px',
                overflowY: 'auto'
              }}>
                {chatHistory.map((msg, idx) => (
                  <div key={idx}>
                    <div style={{
                      display: 'flex',
                      gap: '15px',
                      marginBottom: '20px',
                      alignItems: 'flex-start'
                    }}>
                      <div style={{
                        background: msg.role === 'user' 
                          ? 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)'
                          : 'linear-gradient(135deg, #34d399 0%, #10b981 100%)',
                        color: 'white',
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        fontSize: '20px'
                      }}>
                        {msg.role === 'user' ? '👤' : '🤖'}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{
                          fontSize: '14px',
                          fontWeight: '600',
                          color: '#2c5aa0',
                          marginBottom: '8px'
                        }}>
                          {msg.role === 'user' ? 'Ty' : 'Asystent AI'}
                        </div>
                        <div style={{
                          color: '#2c3e50',
                          lineHeight: '1.6',
                          whiteSpace: 'pre-wrap'
                        }}>
                          {msg.content}
                        </div>
                        
                        {msg.matches && msg.matches.length > 0 && (
                          <div style={{ marginTop: '20px' }}>
                            {msg.matches.map((sw, swIdx) => (
                              <div key={swIdx}>
                                {renderSwiadczenie(sw)}
                              </div>
                            ))}
                            
                            {msg.matches.filter(m => m.pdf).length > 0 && (
                              <button
                                onClick={() => downloadAllPDFs(msg.matches)}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '10px',
                                  background: 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)',
                                  color: 'white',
                                  border: 'none',
                                  padding: '12px 20px',
                                  borderRadius: '8px',
                                  cursor: 'pointer',
                                  fontWeight: '600',
                                  fontSize: '14px',
                                  marginTop: '10px'
                                }}
                              >
                                <Download size={18} />
                                Pobierz wszystkie PDF-y ({msg.matches.filter(m => m.pdf).length})
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '30px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '15px'
              }}>
                <MessageSquare size={24} color="#2c5aa0" />
                <h2 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#2c3e50',
                  margin: 0
                }}>
                  Zadaj pytanie
                </h2>
              </div>
              
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Np. 'Mam dwójkę dzieci i nie stać mnie na rachunki - jakie świadczenia mi przysługują?'"
                style={{
                  width: '100%',
                  minHeight: '100px',
                  padding: '15px',
                  fontSize: '16px',
                  border: '2px solid #e1e8ed',
                  borderRadius: '12px',
                  resize: 'vertical',
                  fontFamily: 'inherit',
                  marginBottom: '15px'
                }}
              />
              
              <button
                onClick={handleSearch}
                disabled={loading || !query.trim()}
                style={{
                  background: loading ? '#ccc' : 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '15px 30px',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  transition: 'transform 0.2s'
                }}
                onMouseOver={(e) => !loading && (e.currentTarget.style.transform = 'translateY(-2px)')}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                {loading ? (
                  <>
                    <Loader size={20} className="spin" />
                    Analizuję...
                  </>
                ) : (
                  <>
                    <Sparkles size={20} />
                    Zapytaj AI
                  </>
                )}
              </button>

              {chatHistory.length === 0 && (
                <div style={{ marginTop: '25px' }}>
                  <p style={{
                    fontSize: '14px',
                    color: '#5a6c7d',
                    marginBottom: '12px',
                    fontWeight: '600'
                  }}>
                    Przykładowe pytania:
                  </p>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                  }}>
                    {exampleQuestions.map((q, idx) => (
                      <button
                        key={idx}
                        onClick={() => setQuery(q)}
                        style={{
                          background: '#f8f9fb',
                          border: '1px solid #e1e8ed',
                          borderRadius: '8px',
                          padding: '12px 15px',
                          textAlign: 'left',
                          cursor: 'pointer',
                          fontSize: '14px',
                          color: '#2c5aa0',
                          transition: 'all 0.2s'
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.background = '#e8f4f8';
                          e.currentTarget.style.borderColor = '#2c5aa0';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.background = '#f8f9fb';
                          e.currentTarget.style.borderColor = '#e1e8ed';
                        }}
                      >
                        💡 {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default App;