import { Language, getTranslation } from '../translations';

interface StructuredDataProps {
  language: Language;
}

const StructuredData = ({ language }: StructuredDataProps) => {
  const businessData = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: 'Ristorante Pizzeria Da Gino',
    alternateName: 'Da Gino',
    description: getTranslation(language, 'description'),
    image: [
      'https://www.ristorantedagino.nl/restaurant-interior.jpg',
      'https://www.ristorantedagino.nl/pizza-margherita.jpg',
      'https://www.ristorantedagino.nl/pasta-carbonara.jpg',
    ],
    logo: 'https://www.ristorantedagino.nl/logo.png',
    url: 'https://www.ristorantedagino.nl',
    telephone: '+31223610117',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Beatrixstraat 37',
      addressLocality: 'Den Helder',
      postalCode: '1781 EM',
      addressCountry: 'NL',
      addressRegion: 'North Holland',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 52.954783,
      longitude: 4.759416,
    },
    openingHours: [
      'Mo 13:30-21:30',
      'Tu 13:30-21:30',
      'Th 13:30-21:30',
      'Fr 13:30-21:30',
      'Sa 13:30-21:30',
      'Su 13:30-21:30',
    ],
    servesCuisine: ['Italian', 'Pizza', 'Pasta', 'Mediterranean'],
    priceRange: '€€',
    currenciesAccepted: 'EUR',
    paymentAccepted: ['Cash', 'Credit Card', 'Debit Card'],
    foundingDate: '2010',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '6',
      bestRating: '5',
      worstRating: '1',
    },
    review: [
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'Giovanni M.',
        },
        datePublished: '2024-11-28',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
        },
        reviewBody:
          "Ottima pizza e pasta, ingredienti freschi e servizio cordiale. Un vero pezzo d'Italia in Olanda. Torneremo sicuramente!",
      },
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'Linda V.',
        },
        datePublished: '2024-11-15',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
        },
        reviewBody:
          'Fantastisch eten en vriendelijke bediening. De sfeer is gezellig en het voelt echt authentiek Italiaans. Aanrader!',
      },
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'Michael B.',
        },
        datePublished: '2024-11-10',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
        },
        reviewBody:
          'Excellent pizza and pasta dishes. The atmosphere is warm and welcoming. Staff is very friendly and attentive.',
      },
    ],
    hasMenu: {
      '@type': 'Menu',
      name: 'Main Menu',
      description: getTranslation(language, 'menuDescription'),
      hasMenuSection: [
        {
          '@type': 'MenuSection',
          name: getTranslation(language, 'antipasti'),
          description: 'Traditional Italian appetizers',
          hasMenuItem: [
            {
              '@type': 'MenuItem',
              name: 'Carpaccio',
              description: 'filetto tagliato sottile con rucola e parmigiano',
              offers: {
                '@type': 'Offer',
                price: '13.50',
                priceCurrency: 'EUR',
              },
            },
          ],
        },
        {
          '@type': 'MenuSection',
          name: getTranslation(language, 'pizze'),
          description: 'Wood-fired pizzas with fresh ingredients',
          hasMenuItem: [
            {
              '@type': 'MenuItem',
              name: 'Pizza Margherita',
              description: 'salsa di pomodoro e mozzarella',
              offers: {
                '@type': 'Offer',
                price: '12.00',
                priceCurrency: 'EUR',
              },
            },
          ],
        },
        {
          '@type': 'MenuSection',
          name: getTranslation(language, 'pasta'),
          description: 'Fresh pasta with traditional sauces',
          hasMenuItem: [
            {
              '@type': 'MenuItem',
              name: 'Spaghetti Carbonara',
              description: 'con uovo e pancetta in salsa di panna',
              offers: {
                '@type': 'Offer',
                price: '16.00',
                priceCurrency: 'EUR',
              },
            },
          ],
        },
      ],
    },
    makesOffer: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Dine-in Service',
          description: 'Full restaurant dining experience',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Takeaway Service',
          description: 'Food pickup and takeaway orders',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Delivery Service',
          description: 'Food delivery to your location',
          areaServed: 'Den Helder',
        },
      },
    ],
    amenityFeature: [
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Parking',
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Wheelchair Accessible',
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Outdoor Seating',
        value: false,
      },
    ],
    acceptsReservations: true,
  };

  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.ristorantedagino.nl/',
      },
    ],
  };

  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Ristorante Pizzeria Da Gino',
    url: 'https://www.ristorantedagino.nl',
    logo: 'https://www.ristorantedagino.nl/logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+31223610117',
      contactType: 'customer service',
      availableLanguage: ['Italian', 'Dutch', 'English'],
    },
    sameAs: [
      'https://www.tripadvisor.com/Restaurant_Review-g188591-d3694185-Reviews-Pizzeria_Da_Gino-Den_Helder_North_Holland_Province.html',
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(businessData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationData),
        }}
      />
    </>
  );
};

export default StructuredData;
