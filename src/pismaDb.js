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

export default pismaDB;