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

export default swiadczeniaDB;