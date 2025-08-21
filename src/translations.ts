// Helper function to get translation with fallback to English or Italian
const getTranslation = (language: Language, key: TranslationKey): string => {
  // Try the requested language first
  if (translations[language] && translations[language][key]) {
    return translations[language][key];
  }
  // Fall back to English
  if (translations.en && translations.en[key]) {
    return translations.en[key];
  }
  // Fall back to Italian
  if (translations.it && translations.it[key]) {
    return translations.it[key];
  }
  // Return the key itself as last resort
  return key.toString();
};

// Complete translations for Ristorante Dagino in all supported languages
export const translations = {
  it: {
    // Navigation
    home: "Home",
    menu: "Menu", 
    about: "Chi Siamo",
    contact: "Contatti",
    callNow: "Chiama Ora",
    call: "Chiama",
    
    // Language selector
    selectLanguage: "Seleziona Lingua",
    continue: "Continua",
    
    // Hero section
    tagline: "Autentica Cucina Italiana dal 2011",
    description: "Benvenuti sul sito web della Pizzeria Da Gino a Den Helder! Qui potete gustare l'autentica cucina italiana con ingredienti freschi.",
    discoverMenu: "Scopri il Menu",
    bookTable: "Prenota Tavolo",
    
    // Menu section
    ourMenu: "La Nostra Carta",
    menuDescription: "Piatti tradizionali preparati con ingredienti freschi e ricette tramandate di generazione in generazione",
    popular: "Popolare",
    
    // Menu categories
    antipasti: "Antipasti",
    aperitivi: "Aperitivi", 
    caffe: "Caffè",
    pizze: "Pizze",
    pasta: "Pasta",
    risotti: "Risotti e Lasagne",
    secondi: "Secondi di Carne e Pesce",
    dolci: "Dolci",
    bibite: "Bibite Analcoliche",
    vini: "Vini",
    birre: "Birre",
    distillati: "Distillati",
    
    // About section
    ourStory: "La Nostra Storia",
    tradition: "Tradizione",
    traditionDesc: "Dal 2011 portiamo a Den Helder l'autentica tradizione culinaria italiana con ricette tramandate",
    passion: "Passione", 
    passionDesc: "Ogni piatto è preparato con amore e dedizione per offrire un'esperienza unica",
    quality: "Ingredienti Freschi",
    qualityDesc: "Utilizziamo solo ingredienti freschi e di prima qualità, selezionati con cura per garantire il massimo sapore",
    
    // Contact section
    contactTitle: "Vieni a Trovarci",
    contactDescription: "Contattaci per prenotazioni o vieni a trovarci nel nostro ristorante",
    whereWeAre: "Dove Siamo",
    directions: "Indicazioni Stradali",
    contacts: "Contatti",
    callToBook: "Chiama per Prenotare",
    
    // Footer
    allRightsReserved: "Tutti i diritti riservati",
    
    // Reviews section
    reviews: "Recensioni",
    ourReviews: "Le Nostre Recensioni",
    reviewsDescription: "Scopri cosa dicono i nostri clienti sulla loro esperienza gastronomica italiana",
    seeAllReviews: "Vedi Tutte le Recensioni",
    writeReview: "Scrivi una Recensione",
    reviewsOnTripAdvisor: "Recensioni su TripAdvisor",
    shareExperience: "Condividi la Tua Esperienza",
    averageRating: "Valutazione Media",
    totalReviews: "Recensioni Totali",
    ratingDistribution: "Distribuzione Valutazioni",
    latestReviews: "Recensioni Recenti",
  showMoreReviews: "Mostra altre recensioni",
  viewAllReviews: "Vedi tutte le recensioni",
  reviewsBy: "Recensioni di",
    
    // Additional info
    allergyNotice: "Gestiamo le vostre allergie o intolleranze alimentari con la massima attenzione durante la preparazione dei nostri piatti. La contaminazione incrociata di allergeni non può mai essere completamente esclusa nella nostra cucina. Vi preghiamo di indicare chiaramente le vostre allergie o intolleranze al momento dell'ordine!",
    deliveryInfo: "Cerchiamo sempre di consegnare il tuo ordine il più rapidamente possibile. La domenica e nei giorni festivi, i tempi di consegna potrebbero allungarsi a causa dell'elevata domanda.",
    
    // Detailed hours
    openingHours: "Orari di Apertura",
    deliveryTimes: "Tempi di Consegna",
    monday: "Lunedì",
    tuesday: "Martedì", 
    wednesday: "Mercoledì",
    thursday: "Giovedì",
    friday: "Venerdì",
    saturday: "Sabato",
    sunday: "Domenica",
    closed: "Chiuso",
    restaurantHours: "13:30 - 21:30",
    deliverySchedule: "16:30 - 21:00",
    
    // Restaurant info
    restaurantName: "Ristorante Pizzeria Da Gino",
    phone: "0223610117 / 0645069661",
    email: "info@pizzeriadagino.nl",
    address: "Beatrixstraat 37, 1781 EM Den Helder",
    hours: "Lunedì-Martedì, Giovedì-Domenica: 13:30-21:30 | Mercoledì: Chiuso",
    deliveryHours: "16:30-21:00",
    
    // Reservation System
    makeReservation: "Prenota un Tavolo",
    reservationDescription: "Prenota il tuo tavolo online e vieni a gustare la nostra autentica cucina italiana",
    reservationFormDescription: "Compila il modulo per prenotare il tuo tavolo",
    selectDate: "Seleziona Data",
    pickDate: "Scegli una data",
    numberOfGuests: "Numero di Ospiti",
    selectGuests: "Seleziona ospiti",
    guest: "ospite",
    guests: "ospiti",
    person: "persona",
    people: "persone",
    selectTime: "Seleziona Orario",
    available: "disponibili",
    noAvailableSlots: "Nessun orario disponibile per questa data",
    continueBooking: "Continua Prenotazione",
    customerInformation: "Informazioni Cliente",
    customerInfo: "Informazioni Cliente",
    customerInfoDescription: "Inserisci i tuoi dati per completare la prenotazione",
    fullName: "Nome Completo",
    enterName: "Inserisci il tuo nome",
  // Use phoneNumber for label; keep top-level 'phone' for contact number
    phoneNumber: "Numero di Telefono",
    enterPhone: "Inserisci il tuo telefono",
  // Use emailAddress for label; keep top-level 'email' for contact address
    emailAddress: "Indirizzo Email",
    enterEmail: "Inserisci la tua email",
    enterNotes: "Inserisci eventuali note o richieste speciali",
    specialRequests: "Richieste Speciali",
    specialRequestsPlaceholder: "Allergie, preferenze alimentari o richieste speciali...",
    reservationSummary: "Riepilogo Prenotazione",
    date: "Data",
  time: "Orario",
    confirmReservation: "Conferma Prenotazione",
    submitting: "Invio in corso...",
    importantInformation: "Informazioni Importanti",
    reservationPolicy: "Le prenotazioni vengono confermate telefonicamente entro 2 ore. Ti preghiamo di arrivare puntuale per mantenere il tuo tavolo.",
    confirmationCall: "Riceverai una chiamata di conferma dal nostro staff per confermare la prenotazione.",
    arrivalTime: "Ti preghiamo di arrivare all'orario prenotato. I tavoli vengono mantenuti per 15 minuti dopo l'orario prenotato.",
    invalidGuestCount: "Numero di ospiti non valido",
    nameRequired: "Il nome è obbligatorio",
    validEmailRequired: "Inserisci un indirizzo email valido",
    phoneRequired: "Il numero di telefono è obbligatorio",
    slotNoLongerAvailable: "Questo orario non è più disponibile",
    reservationSubmitted: "Prenotazione inviata con successo! Ti contatteremo presto per confermare.",
    reservationError: "Errore nell'invio della prenotazione. Riprova o chiamaci direttamente.",
    reservations: "Prenotazioni",
    
    // Email confirmation system
    emailConfirmation: "Conferma Email",
    emailConfirmationDescription: "Ti abbiamo inviato una email di conferma. Controlla la tua casella di posta e clicca sul link per confermare la prenotazione.",
    confirmationEmailSent: "Email di Conferma Inviata",
    checkYourEmail: "Controlla la tua email",
    emailSentTo: "Abbiamo inviato una email di conferma a:",
    didNotReceiveEmail: "Non hai ricevuto l'email?",
    resendConfirmation: "Reinvia Conferma",
    confirmationExpires: "Il link di conferma scadrà tra 24 ore",
    reservationConfirmed: "Prenotazione Confermata!",
    thankYouForBooking: "Grazie per aver prenotato con noi!",
    reservationDetails: "Dettagli della Prenotazione",
    confirmationNumber: "Numero di Conferma",
    seeYouSoon: "Non vediamo l'ora di vederti!",
    addToCalendar: "Aggiungi al Calendario",
    
    // Email templates
    confirmationEmailSubject: "Conferma la tua prenotazione - Ristorante Da Gino",
    confirmationEmailGreeting: "Ciao",
    confirmationEmailMessage: "Grazie per aver scelto il Ristorante Da Gino! Per confermare la tua prenotazione, clicca sul pulsante qui sotto:",
    confirmReservationButton: "Conferma Prenotazione",
    confirmationEmailFooter: "Se non hai effettuato questa prenotazione, ignora questa email.",
    confirmationEmailAlternative: "Se il pulsante non funziona, copia e incolla questo link nel tuo browser:",
    
    // Reservation status
    reservationPending: "In Attesa di Conferma",
    reservationConfirmedStatus: "Confermata",
    reservationCancelled: "Cancellata",
    reservationExpired: "Scaduta",
    
    // Search System
    searchSite: "Cerca nel sito",
    searchPlaceholder: "Cerca piatti, informazioni...",
    recentSearches: "Ricerche recenti",
    searchResults: "Risultati",
    noResultsFound: "Nessun risultato trovato per",
    clearSearch: "Pulisci",
    quickAccess: "Accesso rapido",
    section: "Sezione",
    
  // General Categories
  categories: "Categorie",
  information: "Informazioni",
  // location key already defined above; avoid duplicate
    
    // Missing translations for category section
    informationSection: "Informazioni",
    informationDescription: "Trova tutte le informazioni sul nostro ristorante",
    madeWithLove: "Fatto con ❤️ in Den Helder",
    
    // Additional missing translations
  // (deduplicated keys removed)
    
    // Additional footer and info translations
    allergyTitle: "Informazioni sugli Allergeni",
    deliveryTitle: "Informazioni Consegne",
    
    // Category Navigation Section
    explore: "Esplora",
    exploreRestaurant: "Esplora il Nostro Ristorante",
    exploreDescription: "Scopri tutto quello che abbiamo da offrire: dalla nostra cucina autentica ai nostri servizi",
    beverages: "Bevande",
    beveragesDescription: "Scopri la nostra selezione di vini italiani, birre artigianali e bevande",
    services: "Servizi",
    servicesDescription: "Prenotazioni online, consegna a domicilio e servizi per i nostri clienti",
    delivery: "Consegna",
    takeaway: "Asporto",
    categoriesText: "Categorie",
    dishesCount: "70+ Piatti",
    italianCuisine: "Cucina Italiana",
    drinksCount: "50+ Bevande",
    italianWines: "Vini Italiani",
    onlineReservations: "Prenotazioni Online",
    homeDelivery: "Consegna a Domicilio",
    since2011: "Dal 2011",
    rating5Stars: "5.0 ★ Rating",
    goToMenu: "Vai al Menu",
    contactUs: "Contattaci",
    authentic: "Autentico",
    
    // Google Maps integration
    viewOnMaps: "Visualizza su Maps",
    getDirections: "Ottieni Indicazioni",
    walkingDistance: "Distanza a piedi dalla Stazione Centrale di Den Helder: 8 minuti",
    parkingInfo: "Parcheggio gratuito in strada disponibile nelle vicinanze"
  },
  
  en: {
    // Navigation
    home: "Home",
    menu: "Menu",
    about: "About Us", 
    contact: "Contact",
    callNow: "Call Now",
    call: "Call",
    
    // Language selector
    selectLanguage: "Select Language",
    continue: "Continue",
    
    // Hero section
    tagline: "Authentic Italian Cuisine since 2011",
    description: "Welcome to Pizzeria Da Gino in Den Helder! Here you can enjoy authentic Italian cuisine with fresh ingredients.",
    discoverMenu: "Discover Menu",
    bookTable: "Book Table",
    
    // Menu section
    ourMenu: "Our Menu",
    menuDescription: "Traditional dishes prepared with fresh ingredients and recipes passed down through generations",
    popular: "Popular",
    
    // Menu categories
    antipasti: "Appetizers",
    aperitivi: "Aperitifs",
    caffe: "Coffee",
    pizze: "Pizzas", 
    pasta: "Pasta",
    risotti: "Risottos & Lasagna",
    secondi: "Meat & Fish",
    dolci: "Desserts",
    bibite: "Soft Drinks",
    vini: "Wines",
    birre: "Beers",
    distillati: "Spirits",
    
    // About section
    ourStory: "Our Story",
    tradition: "Tradition",
    traditionDesc: "Since 2011, we bring authentic Italian culinary tradition to Den Helder with time-honored recipes",
    passion: "Passion",
    passionDesc: "Every dish is prepared with love and dedication to offer a unique experience",
    quality: "Fresh Ingredients",
    qualityDesc: "We use only fresh, premium ingredients, carefully selected to ensure maximum flavor",
    
    // Contact section
    contactTitle: "Come Visit Us",
    contactDescription: "Contact us for reservations or come visit us at our restaurant",
    whereWeAre: "Where We Are",
    directions: "Get Directions",
    contacts: "Contact",
    callToBook: "Call to Book",
    
    // Footer
    allRightsReserved: "All rights reserved",
    
    // Reviews section
    reviews: "Reviews",
    ourReviews: "Our Reviews",
    reviewsDescription: "Discover what our customers say about their Italian dining experience",
    seeAllReviews: "See All Reviews",
    writeReview: "Write a Review",
    reviewsOnTripAdvisor: "Reviews on TripAdvisor",
    shareExperience: "Share Your Experience",
    averageRating: "Average Rating",
    totalReviews: "Total Reviews",
    ratingDistribution: "Rating Distribution",
    latestReviews: "Latest Reviews",
  showMoreReviews: "Show more reviews",
  viewAllReviews: "View all reviews",
  reviewsBy: "Reviews by",
    
    // Additional info
    allergyNotice: "We handle your allergies or food intolerances with the utmost care during the preparation of our dishes. Cross-contamination of allergens can never be completely excluded in our kitchen. Please clearly indicate your allergies or intolerances when ordering!",
    deliveryInfo: "We always try to deliver your order as quickly as possible. On Sundays and holidays, delivery times may be longer due to high demand.",
    
    // Detailed hours
    openingHours: "Opening Hours",
    deliveryTimes: "Delivery Times",
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday", 
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday",
    sunday: "Sunday",
    closed: "Closed",
    restaurantHours: "13:30 - 21:30",
    deliverySchedule: "16:30 - 21:00",
    
    // Restaurant info
    restaurantName: "Ristorante Pizzeria Da Gino",
    phone: "0223610117 / 0645069661",
    email: "info@pizzeriadagino.nl",
    address: "Beatrixstraat 37, 1781 EM Den Helder",
    hours: "Monday-Tuesday, Thursday-Sunday: 13:30-21:30 | Wednesday: Closed",
    deliveryHours: "16:30-21:00",
    
    // Reservation System
    makeReservation: "Book a Table",
    reservationDescription: "Book your table online and come taste our authentic Italian cuisine",
    selectDate: "Select Date",
    pickDate: "Pick a date",
    numberOfGuests: "Number of Guests",
    guest: "guest",
    guests: "guests",
    selectTime: "Select Time",
    available: "available",
    customerInformation: "Customer Information",
    fullName: "Full Name",
    enterName: "Enter your name",
    phoneNumber: "Phone Number",
    enterPhone: "Enter your phone",
    emailAddress: "Email Address",
    enterEmail: "Enter your email",
    specialRequests: "Special Requests",
    specialRequestsPlaceholder: "Allergies, dietary preferences or special requests...",
    reservationSummary: "Reservation Summary",
    date: "Date",
    time: "Time",
    confirmReservation: "Confirm Reservation",
    submitting: "Submitting...",
    importantInformation: "Important Information",
    reservationPolicy: "Reservations are confirmed by phone within 2 hours. Please arrive on time to keep your table.",
    confirmationCall: "You will receive a confirmation call from our staff to confirm your reservation.",
    arrivalTime: "Please arrive at your booked time. Tables are held for 15 minutes after the booked time.",
    invalidGuestCount: "Invalid number of guests",
    nameRequired: "Name is required",
    validEmailRequired: "Please enter a valid email address",
    phoneRequired: "Phone number is required",
    slotNoLongerAvailable: "This time slot is no longer available",
    reservationSubmitted: "Reservation submitted successfully! We will contact you soon to confirm.",
    reservationError: "Error submitting reservation. Please try again or call us directly.",
    reservations: "Reservations",
    
    // Email confirmation system
    emailConfirmation: "Email Confirmation",
    emailConfirmationDescription: "We have sent you a confirmation email. Please check your inbox and click the link to confirm your reservation.",
    confirmationEmailSent: "Confirmation Email Sent",
    checkYourEmail: "Check Your Email",
    emailSentTo: "We have sent a confirmation email to:",
    didNotReceiveEmail: "Didn't receive the email?",
    resendConfirmation: "Resend Confirmation",
    confirmationExpires: "The confirmation link will expire in 24 hours",
    reservationConfirmed: "Reservation Confirmed!",
    thankYouForBooking: "Thank you for booking with us!",
    reservationDetails: "Reservation Details",
    confirmationNumber: "Confirmation Number",
    seeYouSoon: "We look forward to seeing you!",
    addToCalendar: "Add to Calendar",
    
    // Email templates
    confirmationEmailSubject: "Confirm your reservation - Ristorante Da Gino",
    confirmationEmailGreeting: "Hello",
    confirmationEmailMessage: "Thank you for choosing Ristorante Da Gino! To confirm your reservation, please click the button below:",
    confirmReservationButton: "Confirm Reservation",
    confirmationEmailFooter: "If you did not make this reservation, please ignore this email.",
    confirmationEmailAlternative: "If the button doesn't work, copy and paste this link into your browser:",
    
    // Reservation status
    reservationPending: "Awaiting Confirmation",
    reservationConfirmedStatus: "Confirmed",
    reservationCancelled: "Cancelled",
    reservationExpired: "Expired",
    
    // Search System
    searchSite: "Search site",
    searchPlaceholder: "Search dishes, information...",
    recentSearches: "Recent searches",
    searchResults: "Results",
    noResultsFound: "No results found for",
    clearSearch: "Clear",
    quickAccess: "Quick access",
    section: "Section",
    
    // General Categories
    categories: "Categories",
    information: "Information",
    location: "Location",
    
    // Missing translations for category section
    informationSection: "Information",
    informationDescription: "Find all information about our restaurant",
    madeWithLove: "Made with ❤️ in Den Helder",
    
    // Additional missing translations
  // (deduplicated keys removed)
    
    // Additional footer and info translations
    allergyTitle: "Allergy Information",
    deliveryTitle: "Delivery Information",
    
    // Category Navigation Section
    explore: "Explore",
    exploreRestaurant: "Explore Our Restaurant",
    exploreDescription: "Discover everything we have to offer: from our authentic cuisine to our services",
    beverages: "Beverages",
    beveragesDescription: "Discover our selection of Italian wines, craft beers and drinks",
    services: "Services",
    servicesDescription: "Online reservations, home delivery and services for our customers",
    delivery: "Delivery",
    takeaway: "Takeaway",
    categoriesText: "Categories",
    dishesCount: "70+ Dishes",
    italianCuisine: "Italian Cuisine",
    drinksCount: "50+ Drinks",
    italianWines: "Italian Wines",
    onlineReservations: "Online Reservations",
    homeDelivery: "Home Delivery",
    since2011: "Since 2011",
    rating5Stars: "5.0 ★ Rating",
    goToMenu: "Go to Menu",
    contactUs: "Contact Us",
    authentic: "Authentic",
    
    // Google Maps integration
    viewOnMaps: "View on Maps",
    getDirections: "Get Directions", 
    walkingDistance: "Walking distance from Den Helder Centraal Station: 8 minutes",
    parkingInfo: "Free street parking available nearby"
  },
  
  es: {
    // Navigation
    home: "Inicio",
    menu: "Menú",
    about: "Quiénes Somos",
    contact: "Contacto",
    callNow: "Llamar Ahora",
    call: "Llamar",
    
    // Language selector
    selectLanguage: "Seleccionar Idioma",
    continue: "Continuar",
    
    // Hero section
    tagline: "Auténtica Cocina Italiana desde 2011",
    description: "¡Bienvenidos al sitio web de la Pizzería Da Gino en Den Helder! Aquí pueden disfrutar de la auténtica cocina italiana con ingredientes frescos.",
    discoverMenu: "Descubrir Menú",
    bookTable: "Reservar Mesa",
    
    // Menu section
    ourMenu: "Nuestra Carta",
    menuDescription: "Platos tradicionales preparados con ingredientes frescos y recetas transmitidas de generación en generación",
    popular: "Popular",
    
    // Menu categories
    antipasti: "Entrantes",
    aperitivi: "Aperitivos",
    caffe: "Café",
    pizze: "Pizzas",
    pasta: "Pasta",
    risotti: "Risottos y Lasaña",
    secondi: "Carnes y Pescados",
    dolci: "Postres",
    bibite: "Refrescos",
    vini: "Vinos",
    birre: "Cervezas",
    distillati: "Licores",
    
    // About section
    ourStory: "Nuestra Historia",
    tradition: "Tradición",
    traditionDesc: "Desde 2011 llevamos a Den Helder la auténtica tradición culinaria italiana con recetas tradicionales",
    passion: "Pasión",
    passionDesc: "Cada plato se prepara con amor y dedicación para ofrecer una experiencia única",
    quality: "Ingredientes Frescos",
    qualityDesc: "Utilizamos solo ingredientes frescos y de primera calidad, seleccionados cuidadosamente para garantizar el máximo sabor",
    
    // Contact section
    contactTitle: "Ven a Visitarnos",
    contactDescription: "Contáctanos para reservas o ven a visitarnos en nuestro restaurante",
    whereWeAre: "Dónde Estamos",
    directions: "Cómo Llegar",
    contacts: "Contacto",
    callToBook: "Llamar para Reservar",
    
    // Footer
    allRightsReserved: "Todos los derechos reservados",
    
    // Reviews section
    reviews: "Reseñas",
    ourReviews: "Nuestras Reseñas",
    reviewsDescription: "Descubre lo que dicen nuestros clientes sobre su experiencia gastronómica italiana",
    seeAllReviews: "Ver Todas las Reseñas",
    writeReview: "Escribir una Reseña",
    reviewsOnTripAdvisor: "Reseñas en TripAdvisor",
    shareExperience: "Comparte tu Experiencia",
    averageRating: "Calificación Promedio",
    totalReviews: "Reseñas Totales",
    ratingDistribution: "Distribución de Calificaciones",
    latestReviews: "Reseñas Recientes",
    
    // Additional info
    allergyNotice: "Manejamos sus alergias o intolerancias alimentarias con el máximo cuidado durante la preparación de nuestros platos. La contaminación cruzada de alérgenos nunca puede excluirse completamente en nuestra cocina. ¡Por favor indique claramente sus alergias o intolerancias al hacer el pedido!",
    deliveryInfo: "Siempre tratamos de entregar su pedido lo más rápido posible. Los domingos y días festivos, los tiempos de entrega pueden ser más largos debido a la alta demanda.",
    
    // Detailed hours
    openingHours: "Horarios de Apertura",
    deliveryTimes: "Horarios de Entrega",
    monday: "Lunes",
    tuesday: "Martes",
    wednesday: "Miércoles",
    thursday: "Jueves", 
    friday: "Viernes",
    saturday: "Sábado",
    sunday: "Domingo",
    closed: "Cerrado",
    restaurantHours: "13:30 - 21:30",
    deliverySchedule: "16:30 - 21:00",
    
    // Restaurant info
    restaurantName: "Ristorante Pizzeria Da Gino",
    phone: "0223610117 / 0645069661",
    email: "info@pizzeriadagino.nl",
    address: "Beatrixstraat 37, 1781 EM Den Helder",
    hours: "Lunes-Martes, Jueves-Domingo: 13:30-21:30 | Miércoles: Cerrado",
    deliveryHours: "16:30-21:00",
    
    // Reservation System
    makeReservation: "Reservar Mesa",
    reservationDescription: "Reserva tu mesa online y ven a degustar nuestra auténtica cocina italiana",
    selectDate: "Seleccionar Fecha",
    pickDate: "Elegir una fecha",
    numberOfGuests: "Número de Comensales",
    guest: "comensal",
    guests: "comensales",
    selectTime: "Seleccionar Hora",
    available: "disponibles",
    customerInformation: "Información del Cliente",
    fullName: "Nombre Completo",
    enterName: "Introduce tu nombre",
    phoneNumber: "Número de Teléfono",
    enterPhone: "Introduce tu teléfono",
    emailAddress: "Dirección de Email",
    enterEmail: "Introduce tu email",
    specialRequests: "Solicitudes Especiales",
    specialRequestsPlaceholder: "Alergias, preferencias dietéticas o solicitudes especiales...",
    reservationSummary: "Resumen de Reserva",
    date: "Fecha",
    time: "Hora",
    confirmReservation: "Confirmar Reserva",
    submitting: "Enviando...",
    importantInformation: "Información Importante",
    reservationPolicy: "Las reservas se confirman por teléfono en 2 horas. Por favor llega puntual para mantener tu mesa.",
    confirmationCall: "Recibirás una llamada de confirmación de nuestro personal para confirmar tu reserva.",
    arrivalTime: "Por favor llega a la hora reservada. Las mesas se mantienen 15 minutos después de la hora reservada.",
    invalidGuestCount: "Número de comensales inválido",
    nameRequired: "El nombre es obligatorio",
    validEmailRequired: "Por favor introduce una dirección de email válida",
    phoneRequired: "El número de teléfono es obligatorio",
    slotNoLongerAvailable: "Esta hora ya no está disponible",
    reservationSubmitted: "¡Reserva enviada con éxito! Te contactaremos pronto para confirmar.",
    reservationError: "Error al enviar la reserva. Inténtalo de nuevo o llámanos directamente.",
    reservations: "Reservas",
    
    // Email confirmation system
    emailConfirmation: "Confirmación de Email",
    emailConfirmationDescription: "Te hemos enviado un email de confirmación. Por favor revisa tu bandeja de entrada y haz clic en el enlace para confirmar tu reserva.",
    confirmationEmailSent: "Email de Confirmación Enviado",
    checkYourEmail: "Revisa tu Email",
    emailSentTo: "Hemos enviado un email de confirmación a:",
    didNotReceiveEmail: "¿No recibiste el email?",
    resendConfirmation: "Reenviar Confirmación",
    confirmationExpires: "El enlace de confirmación expirará en 24 horas",
    reservationConfirmed: "¡Reserva Confirmada!",
    thankYouForBooking: "¡Gracias por reservar con nosotros!",
    reservationDetails: "Detalles de la Reserva",
    confirmationNumber: "Número de Confirmación",
    seeYouSoon: "¡Esperamos verte pronto!",
    addToCalendar: "Añadir al Calendario",
    
    // Email templates
    confirmationEmailSubject: "Confirma tu reserva - Ristorante Da Gino",
    confirmationEmailGreeting: "Hola",
    confirmationEmailMessage: "¡Gracias por elegir Ristorante Da Gino! Para confirmar tu reserva, haz clic en el botón de abajo:",
    confirmReservationButton: "Confirmar Reserva",
    confirmationEmailFooter: "Si no hiciste esta reserva, ignora este email.",
    confirmationEmailAlternative: "Si el botón no funciona, copia y pega este enlace en tu navegador:",
    
    // Reservation status
    reservationPending: "Esperando Confirmación",
    reservationConfirmedStatus: "Confirmada",
    reservationCancelled: "Cancelada",
    reservationExpired: "Expirada",
    
    // Search System
    searchSite: "Buscar en el sitio",
    searchPlaceholder: "Buscar platos, información...",
    recentSearches: "Búsquedas recientes",
    searchResults: "Resultados",
    noResultsFound: "No se encontraron resultados para",
    clearSearch: "Limpiar",
    quickAccess: "Acceso rápido",
    section: "Sección",
    
    // General Categories
    categories: "Categorías",
    information: "Información",
    location: "Ubicación",
    
    // Missing translations for category section
    informationSection: "Información",
    informationDescription: "Encuentra toda la información sobre nuestro restaurante",
    madeWithLove: "Hecho con ❤️ en Den Helder",
    
    // Additional missing translations
  // (deduplicated keys removed)
    
    // Additional footer and info translations
    allergyTitle: "Información sobre Alergias",
    deliveryTitle: "Información de Entrega",
    
    // Category Navigation Section
    explore: "Explorar",
    exploreRestaurant: "Explora Nuestro Restaurante",
    exploreDescription: "Descubre todo lo que tenemos que ofrecer: desde nuestra cocina auténtica hasta nuestros servicios",
    beverages: "Bebidas",
    beveragesDescription: "Descubre nuestra selección de vinos italianos, cervezas artesanales y bebidas",
    services: "Servicios",
    servicesDescription: "Reservas online, entrega a domicilio y servicios para nuestros clientes",
    delivery: "Entrega",
    takeaway: "Para Llevar",
    categoriesText: "Categorías",
    dishesCount: "70+ Platos",
    italianCuisine: "Cocina Italiana",
    drinksCount: "50+ Bebidas",
    italianWines: "Vinos Italianos",
    onlineReservations: "Reservas Online",
    homeDelivery: "Entrega a Domicilio",
    since2011: "Desde 2011",
    rating5Stars: "5.0 ★ Rating",
    goToMenu: "Ir al Menú",
    contactUs: "Contáctanos",
    authentic: "Auténtico"
  },
  
  fr: {
    // Navigation
    home: "Accueil",
    menu: "Menu",
    about: "Qui Sommes-Nous",
    contact: "Contact",
    callNow: "Appeler",
    call: "Appeler",
    
    // Language selector
    selectLanguage: "Choisir la Langue",
    continue: "Continuer",
    
    // Hero section
    tagline: "Cuisine Italienne Authentique depuis 2011",
    description: "Bienvenue sur le site web de la Pizzeria Da Gino à Den Helder ! Ici vous pouvez déguster une cuisine italienne authentique avec des ingrédients frais.",
    discoverMenu: "Découvrir le Menu",
    bookTable: "Réserver une Table",
    
    // Menu section
    ourMenu: "Notre Carte",
    menuDescription: "Plats traditionnels préparés avec des ingrédients frais et des recettes transmises de génération en génération",
    popular: "Populaire",
    
    // Menu categories
    antipasti: "Entrées",
    aperitivi: "Apéritifs",
    caffe: "Café",
    pizze: "Pizzas",
    pasta: "Pâtes",
    risotti: "Risottos et Lasagnes",
    secondi: "Viandes et Poissons",
    dolci: "Desserts",
    bibite: "Boissons Sans Alcool",
    vini: "Vins",
    birre: "Bières",
    distillati: "Spiritueux",
    
    // About section
    ourStory: "Notre Histoire",
    tradition: "Tradition",
    traditionDesc: "Depuis 2011, nous apportons à Den Helder l'authentique tradition culinaire italienne avec des recettes traditionnelles",
    passion: "Passion",
    passionDesc: "Chaque plat est préparé avec amour et dévouement pour offrir une expérience unique",
    quality: "Ingrédients Frais",
    qualityDesc: "Nous utilisons uniquement des ingrédients frais et de première qualité, soigneusement sélectionnés pour garantir un maximum de saveur",
    
    // Contact section
    contactTitle: "Venez Nous Rendre Visite",
    contactDescription: "Contactez-nous pour des réservations ou venez nous rendre visite dans notre restaurant",
    whereWeAre: "Où Nous Sommes",
    directions: "Itinéraire",
    contacts: "Contact",
    callToBook: "Appeler pour Réserver",
    
    // Footer
    allRightsReserved: "Tous droits réservés",
    
    // Reviews section
    reviews: "Avis",
    ourReviews: "Nos Avis",
    reviewsDescription: "Découvrez ce que nos clients disent de leur expérience gastronomique italienne",
    seeAllReviews: "Voir Tous les Avis",
    writeReview: "Écrire un Avis",
    reviewsOnTripAdvisor: "Avis sur TripAdvisor",
    shareExperience: "Partagez votre Expérience",
    averageRating: "Note Moyenne",
    totalReviews: "Total des Avis",
    ratingDistribution: "Distribution des Notes",
    latestReviews: "Derniers Avis",
    
    // Additional info
    allergyNotice: "Nous traitons vos allergies ou intolérances alimentaires avec le plus grand soin lors de la préparation de nos plats. La contamination croisée d'allergènes ne peut jamais être complètement exclue dans notre cuisine. Veuillez indiquer clairement vos allergies ou intolérances lors de la commande !",
    deliveryInfo: "Nous essayons toujours de livrer votre commande le plus rapidement possible. Les dimanches et jours fériés, les délais de livraison peuvent être plus longs en raison de la forte demande.",
    
    // Detailed hours
    openingHours: "Heures d'Ouverture",
    deliveryTimes: "Heures de Livraison",
    monday: "Lundi",
    tuesday: "Mardi",
    wednesday: "Mercredi",
    thursday: "Jeudi",
    friday: "Vendredi",
    saturday: "Samedi",
    sunday: "Dimanche",
    closed: "Fermé",
    restaurantHours: "13:30 - 21:30",
    deliverySchedule: "16:30 - 21:00",
    
    // Restaurant info
    restaurantName: "Ristorante Pizzeria Da Gino",
    phone: "0223610117 / 0645069661",
    email: "info@pizzeriadagino.nl",
    address: "Beatrixstraat 37, 1781 EM Den Helder",
    hours: "Lundi-Mardi, Jeudi-Dimanche: 13:30-21:30 | Mercredi: Fermé",
    deliveryHours: "16:30-21:00",
    
    // Reservation System
    makeReservation: "Réserver une Table",
    reservationDescription: "Réservez votre table en ligne et venez déguster notre cuisine italienne authentique",
    selectDate: "Sélectionner la Date",
    pickDate: "Choisir une date",
    numberOfGuests: "Nombre de Convives",
    guest: "convive",
    guests: "convives",
    selectTime: "Sélectionner l'Heure",
    available: "disponibles",
    customerInformation: "Informations Client",
    fullName: "Nom Complet",
    enterName: "Entrez votre nom",
    phoneNumber: "Numéro de Téléphone",
    enterPhone: "Entrez votre téléphone",
    emailAddress: "Adresse Email",
    enterEmail: "Entrez votre email",
    specialRequests: "Demandes Spéciales",
    specialRequestsPlaceholder: "Allergies, préférences alimentaires ou demandes spéciales...",
    reservationSummary: "Résumé de Réservation",
    date: "Date",
    time: "Heure",
    confirmReservation: "Confirmer la Réservation",
    submitting: "Envoi en cours...",
    importantInformation: "Informations Importantes",
    reservationPolicy: "Les réservations sont confirmées par téléphone dans les 2 heures. Veuillez arriver à l'heure pour garder votre table.",
    confirmationCall: "Vous recevrez un appel de confirmation de notre personnel pour confirmer votre réservation.",
    arrivalTime: "Veuillez arriver à l'heure réservée. Les tables sont maintenues 15 minutes après l'heure réservée.",
    invalidGuestCount: "Nombre de convives invalide",
    nameRequired: "Le nom est obligatoire",
    validEmailRequired: "Veuillez entrer une adresse email valide",
    phoneRequired: "Le numéro de téléphone est obligatoire",
    slotNoLongerAvailable: "Cette heure n'est plus disponible",
    reservationSubmitted: "Réservation envoyée avec succès ! Nous vous contacterons bientôt pour confirmer.",
    reservationError: "Erreur lors de l'envoi de la réservation. Veuillez réessayer ou nous appeler directement.",
    reservations: "Réservations",
    
    // Email confirmation system
    emailConfirmation: "Confirmation Email",
    emailConfirmationDescription: "Nous vous avons envoyé un email de confirmation. Veuillez vérifier votre boîte de réception et cliquer sur le lien pour confirmer votre réservation.",
    confirmationEmailSent: "Email de Confirmation Envoyé",
    checkYourEmail: "Vérifiez votre Email",
    emailSentTo: "Nous avons envoyé un email de confirmation à:",
    didNotReceiveEmail: "Vous n'avez pas reçu l'email?",
    resendConfirmation: "Renvoyer la Confirmation",
    confirmationExpires: "Le lien de confirmation expirera dans 24 heures",
    reservationConfirmed: "Réservation Confirmée!",
    thankYouForBooking: "Merci d'avoir réservé chez nous!",
    reservationDetails: "Détails de la Réservation",
    confirmationNumber: "Numéro de Confirmation",
    seeYouSoon: "Nous avons hâte de vous voir!",
    addToCalendar: "Ajouter au Calendrier",
    
    // Email templates
    confirmationEmailSubject: "Confirmez votre réservation - Ristorante Da Gino",
    confirmationEmailGreeting: "Bonjour",
    confirmationEmailMessage: "Merci d'avoir choisi Ristorante Da Gino! Pour confirmer votre réservation, veuillez cliquer sur le bouton ci-dessous:",
    confirmReservationButton: "Confirmer la Réservation",
    confirmationEmailFooter: "Si vous n'avez pas fait cette réservation, veuillez ignorer cet email.",
    confirmationEmailAlternative: "Si le bouton ne fonctionne pas, copiez et collez ce lien dans votre navigateur:",
    
    // Reservation status
    reservationPending: "En Attente de Confirmation",
    reservationConfirmedStatus: "Confirmée",
    reservationCancelled: "Annulée",
    reservationExpired: "Expirée",
    
    // Search System
    searchSite: "Rechercher sur le site",
    searchPlaceholder: "Rechercher plats, informations...",
    recentSearches: "Recherches récentes",
    searchResults: "Résultats",
    noResultsFound: "Aucun résultat trouvé pour",
    clearSearch: "Effacer",
    quickAccess: "Accès rapide",
    section: "Section",
    
    // General Categories
    categories: "Catégories",
    information: "Information",
    location: "Emplacement",
    
    // Missing translations for category section
    informationSection: "Information",
    informationDescription: "Trouvez toutes les informations sur notre restaurant",
    madeWithLove: "Fait avec ❤️ à Den Helder",
    
    // Additional missing translations
  // (deduplicated keys removed)
    
    // Additional footer and info translations
    allergyTitle: "Informations sur les Allergies",
    deliveryTitle: "Informations de Livraison",
    
    // Category Navigation Section
    explore: "Explorer",
    exploreRestaurant: "Explorez Notre Restaurant",
    exploreDescription: "Découvrez tout ce que nous avons à offrir : de notre cuisine authentique à nos services",
    beverages: "Boissons",
    beveragesDescription: "Découvrez notre sélection de vins italiens, bières artisanales et boissons",
    services: "Services",
    servicesDescription: "Réservations en ligne, livraison à domicile et services pour nos clients",
    delivery: "Livraison",
    takeaway: "À Emporter",
    categoriesText: "Catégories",
    dishesCount: "70+ Plats",
    italianCuisine: "Cuisine Italienne",
    drinksCount: "50+ Boissons",
    italianWines: "Vins Italiens",
    onlineReservations: "Réservations en Ligne",
    homeDelivery: "Livraison à Domicile",
    since2011: "Depuis 2011",
    rating5Stars: "5.0 ★ Note",
    goToMenu: "Aller au Menu",
    contactUs: "Nous Contacter",
    authentic: "Authentique"
  },
  
  de: {
    // Navigation
    home: "Startseite",
    menu: "Speisekarte",
    about: "Über Uns",
    contact: "Kontakt",
    callNow: "Jetzt Anrufen",
    call: "Anrufen",
    
    // Language selector
    selectLanguage: "Sprache Wählen",
    continue: "Weiter",
    
    // Hero section
    tagline: "Authentische Italienische Küche seit 2011",
    description: "Willkommen auf der Website der Pizzeria Da Gino in Den Helder! Hier können Sie authentische italienische Küche mit frischen Zutaten genießen.",
    discoverMenu: "Speisekarte Entdecken",
    bookTable: "Tisch Reservieren",
    
    // Menu section
    ourMenu: "Unsere Speisekarte",
    menuDescription: "Traditionelle Gerichte zubereitet mit frischen Zutaten und Rezepten, die von Generation zu Generation weitergegeben wurden",
    popular: "Beliebt",
    
    // Menu categories
    antipasti: "Vorspeisen",
    aperitivi: "Aperitifs",
    caffe: "Kaffee",
    pizze: "Pizzen",
    pasta: "Pasta",
    risotti: "Risottos & Lasagne",
    secondi: "Fleisch & Fisch",
    dolci: "Desserts",
    bibite: "Alkoholfreie Getränke",
    vini: "Weine",
    birre: "Biere",
    distillati: "Spirituosen",
    
    // About section
    ourStory: "Unsere Geschichte",
    tradition: "Tradition",
    traditionDesc: "Seit 2011 bringen wir nach Den Helder die authentische italienische kulinarische Tradition mit traditionellen Rezepten",
    passion: "Leidenschaft",
    passionDesc: "Jedes Gericht wird mit Liebe und Hingabe zubereitet, um ein einzigartiges Erlebnis zu bieten",
    quality: "Frische Zutaten",
    qualityDesc: "Wir verwenden nur frische, erstklassige Zutaten, sorgfältig ausgewählt für maximalen Geschmack",
    
    // Contact section
    contactTitle: "Besuchen Sie Uns",
    contactDescription: "Kontaktieren Sie uns für Reservierungen oder besuchen Sie uns in unserem Restaurant",
    whereWeAre: "Wo Wir Sind",
    directions: "Wegbeschreibung",
    contacts: "Kontakt",
    callToBook: "Anrufen zum Reservieren",
    
    // Footer
    allRightsReserved: "Alle Rechte vorbehalten",
    
    // Reviews section
    reviews: "Bewertungen",
    ourReviews: "Unsere Bewertungen",
    reviewsDescription: "Entdecken Sie, was unsere Kunden über ihr italienisches Esserlebnis sagen",
    seeAllReviews: "Alle Bewertungen Anzeigen",
    writeReview: "Bewertung Schreiben",
    reviewsOnTripAdvisor: "Bewertungen auf TripAdvisor",
    shareExperience: "Teilen Sie Ihre Erfahrung",
    averageRating: "Durchschnittsbewertung",
    totalReviews: "Gesamtbewertungen",
    ratingDistribution: "Bewertungsverteilung",
    latestReviews: "Neueste Bewertungen",
    
    // Additional info
    allergyNotice: "Wir behandeln Ihre Allergien oder Nahrungsmittelunverträglichkeiten mit größter Sorgfalt bei der Zubereitung unserer Gerichte. Eine Kreuzkontamination von Allergenen kann in unserer Küche nie vollständig ausgeschlossen werden. Bitte geben Sie Ihre Allergien oder Unverträglichkeiten bei der Bestellung deutlich an!",
    deliveryInfo: "Wir versuchen immer, Ihre Bestellung so schnell wie möglich zu liefern. An Sonn- und Feiertagen können sich die Lieferzeiten aufgrund der hohen Nachfrage verlängern.",
    
    // Detailed hours
    openingHours: "Öffnungszeiten",
    deliveryTimes: "Lieferzeiten",
    monday: "Montag",
    tuesday: "Dienstag",
    wednesday: "Mittwoch",
    thursday: "Donnerstag",
    friday: "Freitag",
    saturday: "Samstag",
    sunday: "Sonntag",
    closed: "Geschlossen",
    restaurantHours: "13:30 - 21:30",
    deliverySchedule: "16:30 - 21:00",
    
    // Restaurant info
    restaurantName: "Ristorante Pizzeria Da Gino",
    phone: "0223610117 / 0645069661",
    email: "info@pizzeriadagino.nl",
    address: "Beatrixstraat 37, 1781 EM Den Helder",
    hours: "Montag-Dienstag, Donnerstag-Sonntag: 13:30-21:30 | Mittwoch: Geschlossen",
    deliveryHours: "16:30-21:00",
    
    // Reservation System
    makeReservation: "Tisch Reservieren",
    reservationDescription: "Reservieren Sie Ihren Tisch online und kommen Sie, um unsere authentische italienische Küche zu probieren",
    selectDate: "Datum Auswählen",
    pickDate: "Datum wählen",
    numberOfGuests: "Anzahl der Gäste",
    guest: "Gast",
    guests: "Gäste",
    selectTime: "Zeit Auswählen",
    available: "verfügbar",
    customerInformation: "Kundeninformationen",
    fullName: "Vollständiger Name",
    enterName: "Geben Sie Ihren Namen ein",
    phoneNumber: "Telefonnummer",
    enterPhone: "Geben Sie Ihr Telefon ein",
    emailAddress: "E-Mail-Adresse",
    enterEmail: "Geben Sie Ihre E-Mail ein",
    specialRequests: "Besondere Wünsche",
    specialRequestsPlaceholder: "Allergien, Ernährungspräferenzen oder besondere Wünsche...",
    reservationSummary: "Reservierungszusammenfassung",
    date: "Datum",
    time: "Zeit",
    confirmReservation: "Reservierung Bestätigen",
    submitting: "Wird gesendet...",
    importantInformation: "Wichtige Informationen",
    reservationPolicy: "Reservierungen werden telefonisch innerhalb von 2 Stunden bestätigt. Bitte kommen Sie pünktlich, um Ihren Tisch zu behalten.",
    confirmationCall: "Sie erhalten einen Bestätigungsanruf von unserem Personal zur Bestätigung Ihrer Reservierung.",
    arrivalTime: "Bitte kommen Sie zur gebuchten Zeit. Tische werden 15 Minuten nach der gebuchten Zeit gehalten.",
    invalidGuestCount: "Ungültige Anzahl von Gästen",
    nameRequired: "Name ist erforderlich",
    validEmailRequired: "Bitte geben Sie eine gültige E-Mail-Adresse ein",
    phoneRequired: "Telefonnummer ist erforderlich",
    slotNoLongerAvailable: "Diese Zeit ist nicht mehr verfügbar",
    reservationSubmitted: "Reservierung erfolgreich gesendet! Wir werden uns bald mit Ihnen in Verbindung setzen, um zu bestätigen.",
    reservationError: "Fehler beim Senden der Reservierung. Bitte versuchen Sie es erneut oder rufen Sie uns direkt an.",
    reservations: "Reservierungen",
    
    // Email confirmation system
    emailConfirmation: "E-Mail-Bestätigung",
    emailConfirmationDescription: "Wir haben Ihnen eine Bestätigungs-E-Mail gesendet. Bitte überprüfen Sie Ihren Posteingang und klicken Sie auf den Link, um Ihre Reservierung zu bestätigen.",
    confirmationEmailSent: "Bestätigungs-E-Mail Gesendet",
    checkYourEmail: "Überprüfen Sie Ihre E-Mail",
    emailSentTo: "Wir haben eine Bestätigungs-E-Mail gesendet an:",
    didNotReceiveEmail: "E-Mail nicht erhalten?",
    resendConfirmation: "Bestätigung Erneut Senden",
    confirmationExpires: "Der Bestätigungslink läuft in 24 Stunden ab",
    reservationConfirmed: "Reservierung Bestätigt!",
    thankYouForBooking: "Vielen Dank für Ihre Buchung bei uns!",
    reservationDetails: "Reservierungsdetails",
    confirmationNumber: "Bestätigungsnummer",
    seeYouSoon: "Wir freuen uns darauf, Sie zu sehen!",
    addToCalendar: "Zum Kalender Hinzufügen",
    
    // Email templates
    confirmationEmailSubject: "Bestätigen Sie Ihre Reservierung - Ristorante Da Gino",
    confirmationEmailGreeting: "Hallo",
    confirmationEmailMessage: "Vielen Dank, dass Sie Ristorante Da Gino gewählt haben! Um Ihre Reservierung zu bestätigen, klicken Sie bitte auf den Button unten:",
    confirmReservationButton: "Reservierung Bestätigen",
    confirmationEmailFooter: "Wenn Sie diese Reservierung nicht vorgenommen haben, ignorieren Sie diese E-Mail.",
    confirmationEmailAlternative: "Wenn der Button nicht funktioniert, kopieren Sie diesen Link und fügen Sie ihn in Ihren Browser ein:",
    
    // Reservation status
    reservationPending: "Wartet auf Bestätigung",
    reservationConfirmedStatus: "Bestätigt",
    reservationCancelled: "Storniert",
  // General Categories
  categories: "Kategorien",
  information: "Information",
  location: "Standort",
    
  // Missing translations for category section
  informationSection: "Information",
  informationDescription: "Finden Sie alle Informationen über unser Restaurant",
  madeWithLove: "Mit ❤️ in Den Helder gemacht",
    
  // Additional missing translations
  // (deduplicated keys removed)
    
  // Additional footer and info translations
  allergyTitle: "Allergie-Informationen",
  deliveryTitle: "Lieferinformationen",
    
  // Category Navigation Section
  explore: "Entdecken",
  exploreRestaurant: "Entdecken Sie Unser Restaurant",
  exploreDescription: "Entdecken Sie alles, was wir zu bieten haben: von unserer authentischen Küche bis zu unseren Dienstleistungen",
  beverages: "Getränke",
  beveragesDescription: "Entdecken Sie unsere Auswahl an italienischen Weinen, handwerklichen Bieren und Getränken",
  services: "Dienstleistungen",
  servicesDescription: "Online-Reservierungen, Lieferung nach Hause und Dienstleistungen für unsere Kunden",
  delivery: "Lieferung",
  takeaway: "Zum Mitnehmen",
  categoriesText: "Kategorien",
  dishesCount: "70+ Gerichte",
  italianCuisine: "Italienische Küche",
  drinksCount: "50+ Getränke",
  italianWines: "Italienische Weine",
  onlineReservations: "Online-Reservierungen",
  homeDelivery: "Hauslieferung",
  since2011: "Seit 2011",
  rating5Stars: "5.0 ★ Bewertung",
  goToMenu: "Zur Speisekarte",
  contactUs: "Kontaktieren Sie Uns",
  authentic: "Authentisch",
    
  // Search System
  searchSite: "Website durchsuchen",
  searchPlaceholder: "Gerichte, Informationen suchen...",
  recentSearches: "Letzte Suchen",
  searchResults: "Ergebnisse",
  noResultsFound: "Keine Ergebnisse gefunden für",
  clearSearch: "Löschen",
  quickAccess: "Schnellzugriff",
  section: "Bereich"
  },
  
  nl: {
    // Navigation
    home: "Home",
    menu: "Menu",
    about: "Over Ons",
    contact: "Contact",
    callNow: "Nu Bellen",
    call: "Bellen",
    
    // Language selector
    selectLanguage: "Taal Selecteren",
    continue: "Doorgaan",
    
    // Hero section
    tagline: "Authentieke Italiaanse Keuken sinds 2011",
    description: "Welkom op de website van Pizzeria Da Gino in Den Helder! Hier kunt u genieten van authentieke Italiaanse keuken met verse ingrediënten.",
    discoverMenu: "Menu Ontdekken",
    bookTable: "Tafel Reserveren",
    
    // Menu section
    ourMenu: "Ons Menu",
    menuDescription: "Traditionele gerechten bereid met verse ingrediënten en recepten doorgegeven van generatie op generatie",
    popular: "Populair",
    
    // Menu categories
    antipasti: "Voorgerechten",
    aperitivi: "Aperitieven",
    caffe: "Koffie",
    pizze: "Pizza's",
    pasta: "Pasta",
    risotti: "Risotto's & Lasagne",
    secondi: "Vlees & Vis",
    dolci: "Desserts",
    bibite: "Frisdranken",
    vini: "Wijnen",
    birre: "Bieren",
    distillati: "Sterke Dranken",
    
    // About section
    ourStory: "Ons Verhaal",
    tradition: "Traditie",
    traditionDesc: "Sinds 2011 brengen we naar Den Helder de authentieke Italiaanse culinaire traditie met traditionele recepten",
    passion: "Passie",
    passionDesc: "Elk gerecht wordt met liefde en toewijding bereid om een unieke ervaring te bieden",
    quality: "Verse Ingrediënten",
    qualityDesc: "We gebruiken alleen verse, eersteklas ingrediënten, zorgvuldig geselecteerd voor maximale smaak",
    
    // Contact section
    contactTitle: "Kom Ons Bezoeken",
    contactDescription: "Neem contact met ons op voor reserveringen of kom ons bezoeken in ons restaurant",
    whereWeAre: "Waar We Zijn",
    directions: "Routebeschrijving",
    contacts: "Contact",
    callToBook: "Bellen om te Reserveren",
    
    // Footer
    allRightsReserved: "Alle rechten voorbehouden",
    
    // Reviews section
    reviews: "Recensies",
    ourReviews: "Onze Recensies",
    reviewsDescription: "Ontdek wat onze klanten zeggen over hun Italiaanse eetervaring",
    seeAllReviews: "Alle Recensies Bekijken",
    writeReview: "Recensie Schrijven",
    reviewsOnTripAdvisor: "Recensies op TripAdvisor",
    shareExperience: "Deel Je Ervaring",
    averageRating: "Gemiddelde Beoordeling",
    totalReviews: "Totaal Recensies",
    ratingDistribution: "Beoordelingsverdeling",
    latestReviews: "Nieuwste Recensies",
    
    // Additional info
    allergyNotice: "Wij behandelen uw allergieën of voedselintoleranties met de grootste zorg tijdens de bereiding van onze gerechten. Kruisbesmetting van allergenen kan nooit volledig worden uitgesloten in onze keuken. Geef uw allergieën of intoleranties duidelijk aan bij het bestellen!",
    deliveryInfo: "We proberen uw bestelling altijd zo snel mogelijk te bezorgen. Op zondag en feestdagen kunnen de bezorgtijden langer zijn vanwege de hoge vraag.",
    
    // Detailed hours
    openingHours: "Openingstijden",
    deliveryTimes: "Bezorgtijden",
    monday: "Maandag",
    tuesday: "Dinsdag",
    wednesday: "Woensdag",
    thursday: "Donderdag",
    friday: "Vrijdag",
    saturday: "Zaterdag",
    sunday: "Zondag",
    closed: "Gesloten",
    restaurantHours: "13:30 - 21:30",
    deliverySchedule: "16:30 - 21:00",
    
    // Restaurant info
    restaurantName: "Ristorante Pizzeria Da Gino",
    phone: "0223610117 / 0645069661",
    email: "info@pizzeriadagino.nl",
    address: "Beatrixstraat 37, 1781 EM Den Helder",
    hours: "Maandag-Dinsdag, Donderdag-Zondag: 13:30-21:30 | Woensdag: Gesloten",
    deliveryHours: "16:30-21:00",
    
    // Reservation System
    makeReservation: "Tafel Reserveren",
    reservationDescription: "Reserveer je tafel online en kom onze authentieke Italiaanse keuken proeven",
    selectDate: "Datum Selecteren",
    pickDate: "Kies een datum",
    numberOfGuests: "Aantal Gasten",
    guest: "gast",
    guests: "gasten",
    selectTime: "Tijd Selecteren",
    available: "beschikbaar",
    customerInformation: "Klantinformatie",
    fullName: "Volledige Naam",
    enterName: "Voer je naam in",
    phoneNumber: "Telefoonnummer",
    enterPhone: "Voer je telefoon in",
    emailAddress: "E-mailadres",
    enterEmail: "Voer je e-mail in",
    specialRequests: "Speciale Verzoeken",
    specialRequestsPlaceholder: "Allergieën, voedingsvoorkeuren of speciale verzoeken...",
    reservationSummary: "Reserveringssamenvatting",
    date: "Datum",
    time: "Tijd",
    confirmReservation: "Reservering Bevestigen",
    submitting: "Verzenden...",
    importantInformation: "Belangrijke Informatie",
    reservationPolicy: "Reserveringen worden telefonisch bevestigd binnen 2 uur. Kom alsjeblieft op tijd om je tafel te behouden.",
    confirmationCall: "Je ontvangt een bevestigingsoproep van ons personeel om je reservering te bevestigen.",
    arrivalTime: "Kom alsjeblieft op de gereserveerde tijd. Tafels worden 15 minuten na de gereserveerde tijd vastgehouden.",
    invalidGuestCount: "Ongeldig aantal gasten",
    nameRequired: "Naam is verplicht",
    validEmailRequired: "Voer een geldig e-mailadres in",
    phoneRequired: "Telefoonnummer is verplicht",
    slotNoLongerAvailable: "Deze tijd is niet meer beschikbaar",
    reservationSubmitted: "Reservering succesvol verzonden! We nemen binnenkort contact met je op om te bevestigen.",
    reservationError: "Fout bij het verzenden van de reservering. Probeer opnieuw of bel ons direct.",
    reservations: "Reserveringen",
    
    // Email confirmation system
    emailConfirmation: "E-mail Bevestiging",
    emailConfirmationDescription: "We hebben je een bevestigings-e-mail gestuurd. Controleer je inbox en klik op de link om je reservering te bevestigen.",
    confirmationEmailSent: "Bevestigings-e-mail Verzonden",
    checkYourEmail: "Controleer Je E-mail",
    emailSentTo: "We hebben een bevestigings-e-mail gestuurd naar:",
    didNotReceiveEmail: "E-mail niet ontvangen?",
    resendConfirmation: "Bevestiging Opnieuw Verzenden",
    confirmationExpires: "De bevestigingslink verloopt over 24 uur",
    reservationConfirmed: "Reservering Bevestigd!",
    thankYouForBooking: "Bedankt voor het boeken bij ons!",
    reservationDetails: "Reserveringsdetails",
    confirmationNumber: "Bevestigingsnummer",
    seeYouSoon: "We kijken er naar uit je te zien!",
    addToCalendar: "Toevoegen aan Kalender",
    
    // Email templates
    confirmationEmailSubject: "Bevestig je reservering - Ristorante Da Gino",
    confirmationEmailGreeting: "Hallo",
    confirmationEmailMessage: "Bedankt voor het kiezen van Ristorante Da Gino! Om je reservering te bevestigen, klik op de knop hieronder:",
    confirmReservationButton: "Reservering Bevestigen",
    confirmationEmailFooter: "Als je deze reservering niet hebt gemaakt, negeer deze e-mail.",
    confirmationEmailAlternative: "Als de knop niet werkt, kopieer en plak deze link in je browser:",
    
    // Reservation status
    reservationPending: "Wacht op Bevestiging",
    reservationConfirmedStatus: "Bevestigd",
    reservationCancelled: "Geannuleerd",
    // General Categories
    categories: "Categorieën",
    information: "Informatie",
    location: "Locatie",
    
    // Missing translations for category section
    informationSection: "Informatie",
    informationDescription: "Vind alle informatie over ons restaurant",
    madeWithLove: "Gemaakt met ❤️ in Den Helder",
    
    // Additional missing translations
    person: "persoon",
    people: "personen",
    reservationFormDescription: "Vul het formulier in om je tafel te reserveren",
    customerInfo: "Klantinformatie",
    customerInfoDescription: "Voer je gegevens in om de reservering te voltooien",
    enterNotes: "Voer eventuele notities of speciale verzoeken in",
    noAvailableSlots: "Geen beschikbare tijdsloten voor deze datum",
    continueBooking: "Boeking Voortzetten",
    selectGuests: "Gasten selecteren",
    
    // Additional footer and info translations
    allergyTitle: "Allergie Informatie",
    deliveryTitle: "Bezorginformatie",
    
    // Category Navigation Section
    explore: "Ontdekken",
    exploreRestaurant: "Ontdek Ons Restaurant",
    exploreDescription: "Ontdek alles wat we te bieden hebben: van onze authentieke keuken tot onze services",
    beverages: "Drankjes",
    beveragesDescription: "Ontdek onze selectie Italiaanse wijnen, ambachtelijke bieren en drankjes",
    services: "Services",
    servicesDescription: "Online reserveringen, thuisbezorging en services voor onze klanten",
    delivery: "Bezorging",
    takeaway: "Afhalen",
    categoriesText: "Categorieën",
    dishesCount: "70+ Gerechten",
    italianCuisine: "Italiaanse Keuken",
    drinksCount: "50+ Drankjes",
    italianWines: "Italiaanse Wijnen",
    onlineReservations: "Online Reserveringen",
    homeDelivery: "Thuisbezorging",
    since2011: "Sinds 2011",
    rating5Stars: "5.0 ★ Beoordeling",
    goToMenu: "Naar Menu",
    contactUs: "Neem Contact Op",
    authentic: "Authentiek",
    
  // (duplicate Reviews keys removed)
    
    // Search System
    searchSite: "Website doorzoeken",
    searchPlaceholder: "Zoek gerechten, informatie...",
    recentSearches: "Recente zoekopdrachten",
    searchResults: "Resultaten",
    noResultsFound: "Geen resultaten gevonden voor",
    clearSearch: "Wissen",
    quickAccess: "Snelle toegang",
    section: "Sectie"
  },
  
  pt: {
    // Navigation
    home: "Início",
    menu: "Menu",
    about: "Sobre Nós",
    contact: "Contato",
    callNow: "Ligar Agora",
    call: "Ligar",
    
    // Language selector
    selectLanguage: "Selecionar Idioma",
    continue: "Continuar",
    
    // Hero section
    tagline: "Cozinha Italiana Autêntica desde 2011",
    description: "Bem-vindos ao site web da Pizzeria Da Gino em Den Helder! Aqui podem saborear a autêntica cozinha italiana com ingredientes frescos.",
    discoverMenu: "Descobrir Menu",
    bookTable: "Reservar Mesa",
    
    // Menu section
    ourMenu: "Nosso Cardápio",
    menuDescription: "Pratos tradicionais preparados com ingredientes frescos e receitas passadas de geração em geração",
    popular: "Popular",
    
    // Menu categories
    antipasti: "Entradas",
    aperitivi: "Aperitivos",
    caffe: "Café",
    pizze: "Pizzas",
    pasta: "Massas",
    risotti: "Risotos e Lasanha",
    secondi: "Carnes e Peixes",
    dolci: "Sobremesas",
    bibite: "Refrigerantes",
    vini: "Vinhos",
    birre: "Cervejas",
    distillati: "Destilados",
    
    // About section
    ourStory: "Nossa História",
    tradition: "Tradição",
    traditionDesc: "Desde 2011 trazemos para Den Helder a autêntica tradição culinária italiana com receitas tradicionais",
    passion: "Paixão",
    passionDesc: "Cada prato é preparado com amor e dedicação para oferecer uma experiência única",
    quality: "Ingredientes Frescos",
    qualityDesc: "Usamos apenas ingredientes frescos e de primeira qualidade, cuidadosamente selecionados para garantir o máximo sabor",
    
    // Contact section
    contactTitle: "Venha Nos Visitar",
    contactDescription: "Entre em contato conosco para reservas ou venha nos visitar em nosso restaurante",
    whereWeAre: "Onde Estamos",
    directions: "Como Chegar",
    contacts: "Contato",
    callToBook: "Ligar para Reservar",
    
    // Footer
    allRightsReserved: "Todos os direitos reservados",
    
    // Reviews section
    reviews: "Avaliações",
    ourReviews: "Nossas Avaliações",
    reviewsDescription: "Descubra o que nossos clientes dizem sobre sua experiência gastronômica italiana",
    seeAllReviews: "Ver Todas as Avaliações",
    writeReview: "Escrever uma Avaliação",
    reviewsOnTripAdvisor: "Avaliações no TripAdvisor",
    shareExperience: "Compartilhe sua Experiência",
    averageRating: "Avaliação Média",
    totalReviews: "Total de Avaliações",
    ratingDistribution: "Distribuição de Avaliações",
    latestReviews: "Avaliações Recentes",
    
    // Additional info
    allergyNotice: "Tratamos suas alergias ou intolerâncias alimentares com o máximo cuidado durante a preparação de nossos pratos. A contaminação cruzada de alérgenos nunca pode ser completamente excluída em nossa cozinha. Por favor, indique claramente suas alergias ou intolerâncias ao fazer o pedido!",
    deliveryInfo: "Sempre tentamos entregar seu pedido o mais rápido possível. Aos domingos e feriados, os tempos de entrega podem ser mais longos devido à alta demanda.",
    
    // Detailed hours
    openingHours: "Horários de Funcionamento",
    deliveryTimes: "Horários de Entrega",
    monday: "Segunda-feira",
    tuesday: "Terça-feira",
    wednesday: "Quarta-feira",
    thursday: "Quinta-feira",
    friday: "Sexta-feira",
    saturday: "Sábado",
    sunday: "Domingo",
    closed: "Fechado",
    restaurantHours: "13:30 - 21:30",
    deliverySchedule: "16:30 - 21:00",
    
    // Restaurant info
    restaurantName: "Ristorante Pizzeria Da Gino",
    phone: "0223610117 / 0645069661",
    email: "info@pizzeriadagino.nl",
    address: "Beatrixstraat 37, 1781 EM Den Helder",
    hours: "Segunda-Terça, Quinta-Domingo: 13:30-21:30 | Quarta: Fechado",
    deliveryHours: "16:30-21:00",
    
    // Reservation System
    makeReservation: "Reservar Mesa",
    reservationDescription: "Reserve sua mesa online e venha saborear nossa autêntica culinária italiana",
    selectDate: "Selecionar Data",
    pickDate: "Escolher uma data",
    numberOfGuests: "Número de Convidados",
    guest: "convidado",
    guests: "convidados",
    selectTime: "Selecionar Horário",
    available: "disponíveis",
    customerInformation: "Informações do Cliente",
    fullName: "Nome Completo",
    enterName: "Digite seu nome",
    phoneNumber: "Número de Telefone",
    enterPhone: "Digite seu telefone",
    emailAddress: "Endereço de Email",
    enterEmail: "Digite seu email",
    specialRequests: "Solicitações Especiais",
    specialRequestsPlaceholder: "Alergias, preferências alimentares ou solicitações especiais...",
    reservationSummary: "Resumo da Reserva",
    date: "Data",
    time: "Horário",
    confirmReservation: "Confirmar Reserva",
    submitting: "Enviando...",
    importantInformation: "Informações Importantes",
    reservationPolicy: "As reservas são confirmadas por telefone em 2 horas. Por favor, chegue no horário para manter sua mesa.",
    confirmationCall: "Você receberá uma ligação de confirmação da nossa equipe para confirmar sua reserva.",
    arrivalTime: "Por favor, chegue no horário reservado. As mesas são mantidas por 15 minutos após o horário reservado.",
    invalidGuestCount: "Número de convidados inválido",
    nameRequired: "Nome é obrigatório",
    validEmailRequired: "Por favor, digite um endereço de email válido",
    phoneRequired: "Número de telefone é obrigatório",
    slotNoLongerAvailable: "Este horário não está mais disponível",
    reservationSubmitted: "Reserva enviada com sucesso! Entraremos em contato em breve para confirmar.",
    reservationError: "Erro ao enviar a reserva. Tente novamente ou nos ligue diretamente.",
    reservations: "Reservas",
    
    // Email confirmation system
    emailConfirmation: "Confirmação por Email",
    emailConfirmationDescription: "Enviamos um email de confirmação para você. Verifique sua caixa de entrada e clique no link para confirmar sua reserva.",
    confirmationEmailSent: "Email de Confirmação Enviado",
    checkYourEmail: "Verifique seu Email",
    emailSentTo: "Enviamos um email de confirmação para:",
    didNotReceiveEmail: "Não recebeu o email?",
    resendConfirmation: "Reenviar Confirmação",
    confirmationExpires: "O link de confirmação expirará em 24 horas",
    reservationConfirmed: "Reserva Confirmada!",
    thankYouForBooking: "Obrigado por reservar conosco!",
    reservationDetails: "Detalhes da Reserva",
    confirmationNumber: "Número de Confirmação",
    seeYouSoon: "Mal podemos esperar para vê-lo!",
    addToCalendar: "Adicionar ao Calendário",
    
    // Email templates
    confirmationEmailSubject: "Confirme sua reserva - Ristorante Da Gino",
    confirmationEmailGreeting: "Olá",
    confirmationEmailMessage: "Obrigado por escolher o Ristorante Da Gino! Para confirmar sua reserva, clique no botão abaixo:",
    confirmReservationButton: "Confirmar Reserva",
    confirmationEmailFooter: "Se você não fez esta reserva, ignore este email.",
    confirmationEmailAlternative: "Se o botão não funcionar, copie e cole este link em seu navegador:",
    
    // Reservation status
    reservationPending: "Aguardando Confirmação",
    reservationConfirmedStatus: "Confirmada",
    reservationCancelled: "Cancelada",
    reservationExpired: "Expirada",
    
  // (duplicate Reviews keys removed)
    
    // Search System
    searchSite: "Pesquisar site",
    searchPlaceholder: "Pesquisar pratos, informações...",
    recentSearches: "Pesquisas recentes",
    searchResults: "Resultados",
    noResultsFound: "Nenhum resultado encontrado para",
    clearSearch: "Limpar",
    quickAccess: "Acesso rápido",
    section: "Seção",
    
    // General Categories
    categories: "Categorias",
    information: "Informação",
    location: "Localização",
    
    // Missing translations for category section
    informationSection: "Informação",
    informationDescription: "Encontre todas as informações sobre nosso restaurante",
    madeWithLove: "Feito com ❤️ em Den Helder",
    
    // Additional missing translations
    person: "pessoa",
    people: "pessoas",
    reservationFormDescription: "Preencha o formulário para reservar sua mesa",
    customerInfo: "Informações do Cliente",
    customerInfoDescription: "Digite seus dados para completar a reserva",
    enterNotes: "Digite qualquer observação ou solicitação especial",
    noAvailableSlots: "Nenhum horário disponível para esta data",
    continueBooking: "Continuar Reserva",
    selectGuests: "Selecionar convidados",
    
    // Additional footer and info translations
    allergyTitle: "Informações sobre Alergias",
    deliveryTitle: "Informações de Entrega",
    
    // Category Navigation Section
    explore: "Explorar",
    exploreRestaurant: "Explore Nosso Restaurante",
    exploreDescription: "Descubra tudo o que temos a oferecer: desde nossa cozinha autêntica até nossos serviços",
    beverages: "Bebidas",
    beveragesDescription: "Descubra nossa seleção de vinhos italianos, cervejas artesanais e bebidas",
    services: "Serviços",
    servicesDescription: "Reservas online, entrega em domicílio e serviços para nossos clientes",
    delivery: "Entrega",
    takeaway: "Para Viagem",
    categoriesText: "Categorias",
    dishesCount: "70+ Pratos",
    italianCuisine: "Culinária Italiana",
    drinksCount: "50+ Bebidas",
    italianWines: "Vinhos Italianos",
    onlineReservations: "Reservas Online",
    homeDelivery: "Entrega em Domicílio",
    since2011: "Desde 2011",
    rating5Stars: "5.0 ★ Avaliação",
    goToMenu: "Ir ao Cardápio",
    contactUs: "Entre em Contato",
    authentic: "Autêntico"
  }
} as const;

export { getTranslation };
export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations['it'];

export const languages: { code: Language; name: string; nativeName: string; flag: string }[] = [
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', flag: '🇳🇱' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' }
];