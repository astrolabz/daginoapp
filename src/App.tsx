import React, { useState, useEffect } from 'react';
import { useKV } from '@/spark-polyfills/kv';
// import { spark } from '@/spark';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Toaster } from 'sonner';
import { 
  List, 
  Phone, 
  MapPin, 
  Clock, 
  Star, 
  ChefHat, 
  Wine,
  Users,
  Heart,
  InstagramLogo,
  FacebookLogo,
  Sparkle,
  ChatCircle,
  PencilSimple,
  ArrowUpRight,
  EnvelopeSimple,
  CalendarCheck
} from "@phosphor-icons/react";
import LanguageSelector from './components/LanguageSelector';
import LanguageSwitcher from './components/LanguageSwitcher';
import ReviewCard from './components/ReviewCard';
import TripAdvisorReviews from './components/TripAdvisorReviews';
import ReservationSystem from './components/ReservationSystem';
import SearchSystem from './components/SearchSystem';
import CategoryNavigation from './components/CategoryNavigation';
import Breadcrumb from './components/Breadcrumb';
import { translations, Language, TranslationKey, getTranslation } from './translations';

// Menu descriptions in all languages
const menuDescriptions: Record<string, Record<number, string>> = {
  it: {
    1: 'filetto tagliato sottile con rucola e parmigiano',
    2: 'filetto tagliato sottile con rucola, pesto, maionese al tartufo e parmigiano',
    3: 'vitello tagliato sottile fritto con salsa tonnato',
    4: 'salumi e formaggi italiani vari',
    5: 'combinazione di Carpaccio, Vitello Tonnato e Caprese',
    6: 'prosciutto crudo con mozzarella fresca',
    7: 'pane tostato con pomodori freschi e basilico',
    8: 'pane tostato con pomodori freschi, burrata, pesto e basilico',
    9: 'con burrata, prosciutto crudo e basilico',
    10: 'pomodori con mozzarella e basilico',
    11: 'champignons saltati in padella',
    12: 'pane tostato con gorgonzola fuso',
    13: 'pane per pizza con burro alle erbe',
    14: 'gamberoni e cozze con una deliziosa salsa',
    15: 'pane fatto in casa con burro alle erbe per 2 persone',
    16: 'pane fatto in casa con burro alle erbe per 2 a 4 persone',
    17: 'salsa di pomodoro e mozzarella',
    18: 'salsa di pomodoro, mozzarella, prosciutto e ananas',
    19: 'salsa di pomodoro, mozzarella e salame',
    20: 'salsa di pomodoro, mozzarella e verdure varie',
    21: 'salsa di pomodoro, mozzarella, prosciutto, salame, funghi e carciofi',
    22: 'salsa di pomodoro e 4 tipi di formaggio',
    23: 'salsa di pomodoro, mozzarella e frutti di mare vari',
    24: 'salsa di pomodoro, mozzarella, burrata, pesto e pomodori freschi',
    25: 'salsa di pomodoro, mozzarella, zucchine grigliate, melanzane grigliate, rucola e parmigiano',
    26: 'salsa di pomodoro, mozzarella, pomodori freschi, rucola e parmigiano',
    27: 'salsa di pomodoro, mozzarella, pomodori freschi, prosciutto crudo e rucola',
    28: 'salsa di pomodoro, mozzarella, funghi, funghi di bosco, tartufo e rucola',
    29: 'con carne macinata in salsa di pomodoro',
    30: 'con salsa di pomodoro burrata e basilico',
    31: 'con uovo e pancetta in salsa di panna',
    32: 'con funghi selvatici in salsa di panna',
    33: 'con vari frutti di mare in salsa di pomodoro',
    34: 'con filetto di salmone fresco in salsa di panna',
    35: 'con verdure in salsa di panna',
    36: 'con filetto di pollo in salsa cremosa di pesto',
    37: 'con filetto di pollo, funghi in salsa cremosa di tartufo',
    38: 'con gamberoni e caviale in salsa cremosa al rosé',
    39: 'con gamberoni e salmone in salsa cremosa al rosé',
    40: 'ravioli freschi ripieni di ricotta e spinaci in salsa cremosa al rosé',
    41: 'ravioli freschi ripieni di ricotta e spinaci in salsa di burro e salvia',
    42: 'rotoli di pasta ripieni con ricotta e spinaci',
    43: 'tortellini con prosciutto in salsa di panna',
    44: '3 tipi di pasta con carne macinata, peperoncino e funghi in salsa di pomodoro e formaggio dal forno',
    45: 'riso con funghi porcini in salsa di panna',
    46: 'riso con funghi in salsa cremosa al tartufo',
    47: 'riso con frutti di mare',
    48: 'riso con gamberi e zucchine',
    49: 'lasagna con carne macinata in salsa di pomodoro e besciamella',
    50: 'lasagna con diversi tipi di formaggio',
    51: 'lasagna con spinaci e gorgonzola',
    52: 'lasagna con funghi porcini in besciamella e salsa di pomodoro',
    53: 'filetto di pollo con salsa rosa',
    54: 'filetto di pollo con salsa al roquefort',
    55: 'filetto di pollo con salsa cremosa ai funghi',
    56: 'filetto di pollo con verdure e salsa di pomodoro',
    57: 'bistecche di vitello con salsa al gorgonzola',
    58: 'bistecche di vitello con funghi selvatici in salsa cremosa',
    59: 'bistecche di vitello con prosciutto crudo in salsa al vino bianco e salvia',
    60: 'tagliata di manzo con rucola e scaglie di Parmigiano Reggiano',
    61: 'bistecca di vitello con funghi selvatici in salsa di panna',
    62: 'bistecca alla griglia servita con salsa all\'aglio',
    63: 'bistecca di vitello con salsa al pepe verde',
    64: 'bistecca con salsa ai funghi, pepe e gorgonzola mescolate insieme',
    65: 'gamberoni alla griglia serviti con salsa all\'aglio',
    66: 'gamberoni in salsa di pomodoro piccante',
    67: 'filetto di salmone con pepe verde e salsa al cognac',
    68: 'filetto di salmone fresco con salsa rosé',
    69: 'gelato alla vaniglia con salsa al cioccolato e panna montata',
    70: 'gelato alla vaniglia, pistacchio e fragola con panna montata',
    71: 'tiramisù fatto in casa',
    72: 'tartufo al cioccolato con salsa al cioccolato e panna montata',
    73: 'tartufo al cioccolato bianco con salsa al cioccolato e panna montata',
    74: 'gelato alla fragola con fragole fresche e panna montata',
    75: 'gelato al pistacchio con panna montata',
    // Aperitivi
    76: 'prosecco spumante italiano',
    77: 'vino porto rosso dolce',
    78: 'aperitivo alle erbe italiano',
    79: 'cocktail con prosecco e Aperol',
    80: 'cocktail con prosecco e limoncello',
    81: 'cocktail con prosecco e meloncello',
    82: 'cocktail amaro classico',
    83: 'aperitivo amaro con ghiaccio',
    84: 'aperitivo amaro con soda',
    85: 'aperitivo amaro con succo d\'arancia',
    // Caffè
    86: 'bevande calde tradizionali',
    87: 'tè alla menta fresca o allo zenzero',
    88: 'caffè con latte vaporizzato',
    89: 'caffè espresso con latte vaporizzato',
    90: 'espresso doppio',
    91: 'caffè con whisky irlandese e panna montata',
    92: 'caffè con Grand Marnier e panna montata',
    93: 'caffè con Tia Maria e panna montata',
    94: 'caffè con Amaretto e panna montata',
    // Vini
    95: 'vino della casa rosso, bianco o rosé',
    96: 'mezzo litro del vino della casa',
    97: 'un litro del vino della casa',
    98: 'vino rosso robusto del sud Italia',
    99: 'bicchiere di Primitivo',
    100: 'vino rosso siciliano',
    101: 'bicchiere di Nero d\'Avola',
    102: 'vino rosso della Sardegna',
    103: 'bicchiere di Cannonau',
    104: 'vino rosso toscano classico',
    105: 'bicchiere di Chianti Classico',
    106: 'vino rosso del Piemonte',
    107: 'bicchiere di Barbera',
    108: 'vino rosso degli Abruzzi',
    109: 'bicchiere di Montepulciano',
    110: 'vino rosso premium del Piemonte',
    111: 'prosecco spumante',
    112: 'bicchiere di Prosecco',
    113: 'vino bianco delle Marche',
    114: 'bicchiere di Verdicchio',
    115: 'vino bianco del nordest Italia',
    116: 'bicchiere di Pinot Grigio',
    117: 'vino bianco di Borgogna',
    118: 'bicchiere di Chardonnay',
    119: 'vino bianco della Sardegna',
    120: 'bicchiere di Vermentino',
    121: 'vino rosé della Puglia',
    122: 'bicchiere di Terre Sabeli Rosé',
    // Birre
    123: 'birra italiana fresca piccola',
    124: 'birra italiana fresca grande',
    125: 'birra artigianale locale',
    126: 'birra analcolica fresca',
    127: 'birra pilsner olandese',
    128: 'birra pilsner olandese',
    129: 'birra al limone con alcol',
    130: 'birra al limone analcolica',
    131: 'birra con tequila',
    // Bibite Analcoliche
    132: 'bevanda gassata alla cola',
    133: 'bevanda gassata al limone',
    134: 'bevanda gassata all\'arancia',
    135: 'sciroppo di ribes nero',
    136: 'acqua minerale gassata rossa',
    137: 'acqua minerale naturale blu',
    138: 'bevanda gassata amara al limone',
    139: 'acqua tonica',
    140: 'succo naturale di mela',
    141: 'succo naturale d\'arancia',
    142: 'tè freddo',
    143: 'tè verde freddo',
    144: 'bevanda lattea al cioccolato',
    145: 'yogurt da bere olandese',
    // Distillati
    146: 'rum bianco caraibico',
    147: 'rum scuro',
    148: 'liquore all\'anice italiano',
    149: 'cognac italiano',
    150: 'liquore al limone italiano',
    151: 'liquore alle mandorle italiano',
    152: 'grappa italiana',
    153: 'liquore cremoso al limone',
    154: 'liquore all\'arancia francese',
    155: 'liquore all\'arancia francese',
    156: 'whisky scozzese o irlandese',
    157: 'liquore al caffè',
    158: 'liquore scozzese al miele',
    159: 'liquore spagnolo alla vaniglia',
    160: 'amaro italiano alle erbe',
    161: 'amaro siciliano alle erbe'
  },
  en: {
    1: 'thinly sliced beef with arugula and parmesan',
    2: 'thinly sliced beef with arugula, pesto, truffle mayonnaise and parmesan',
    3: 'thinly sliced fried veal with tonnato sauce',
    4: 'various Italian cured meats and cheeses',
    5: 'combination of Carpaccio, Vitello Tonnato and Caprese',
    6: 'prosciutto with fresh mozzarella',
    7: 'toasted bread with fresh tomatoes and basil',
    8: 'toasted bread with fresh tomatoes, burrata, pesto and basil',
    9: 'with burrata, prosciutto and basil',
    10: 'tomatoes with mozzarella and basil',
    11: 'sautéed mushrooms',
    12: 'toasted bread with melted gorgonzola',
    13: 'pizza bread with herb butter',
    14: 'prawns and mussels with delicious sauce',
    15: 'homemade bread with herb butter for 2 people',
    16: 'homemade bread with herb butter for 2 to 4 people',
    17: 'tomato sauce and mozzarella',
    18: 'tomato sauce, mozzarella, ham and pineapple',
    19: 'tomato sauce, mozzarella and salami',
    20: 'tomato sauce, mozzarella and mixed vegetables',
    21: 'tomato sauce, mozzarella, ham, salami, mushrooms and artichokes',
    22: 'tomato sauce and 4 types of cheese',
    23: 'tomato sauce, mozzarella and mixed seafood',
    24: 'tomato sauce, mozzarella, burrata, pesto and fresh tomatoes',
    25: 'tomato sauce, mozzarella, grilled zucchini, grilled eggplant, arugula and parmesan',
    26: 'tomato sauce, mozzarella, fresh tomatoes, arugula and parmesan',
    27: 'tomato sauce, mozzarella, fresh tomatoes, prosciutto and arugula',
    28: 'tomato sauce, mozzarella, mushrooms, wild mushrooms, truffle and arugula',
    29: 'with ground meat in tomato sauce',
    30: 'with tomato sauce, burrata and basil',
    31: 'with egg and pancetta in cream sauce',
    32: 'with wild mushrooms in cream sauce',
    33: 'with mixed seafood in tomato sauce',
    34: 'with fresh salmon fillet in cream sauce',
    35: 'with vegetables in cream sauce',
    36: 'with chicken fillet in creamy pesto sauce',
    37: 'with chicken fillet and mushrooms in creamy truffle sauce',
    38: 'with prawns and caviar in creamy rosé sauce',
    39: 'with prawns and salmon in creamy rosé sauce',
    40: 'fresh ravioli filled with ricotta and spinach in creamy rosé sauce',
    41: 'fresh ravioli filled with ricotta and spinach in butter and sage sauce',
    42: 'pasta rolls filled with ricotta and spinach',
    43: 'tortellini with ham in cream sauce',
    44: '3 types of pasta with ground meat, chili and mushrooms in tomato sauce and cheese from the oven',
    45: 'rice with porcini mushrooms in cream sauce',
    46: 'rice with mushrooms in creamy truffle sauce',
    47: 'rice with seafood',
    48: 'rice with prawns and zucchini',
    49: 'lasagna with ground meat in tomato sauce and béchamel',
    50: 'lasagna with different types of cheese',
    51: 'lasagna with spinach and gorgonzola',
    52: 'lasagna with porcini mushrooms in béchamel and tomato sauce',
    53: 'chicken fillet with pink sauce',
    54: 'chicken fillet with roquefort sauce',
    55: 'chicken fillet with creamy mushroom sauce',
    56: 'chicken fillet with vegetables and tomato sauce',
    57: 'veal steaks with gorgonzola sauce',
    58: 'veal steaks with wild mushrooms in creamy sauce',
    59: 'veal steaks with prosciutto in white wine sauce and sage',
    60: 'sliced beef with arugula and Parmigiano Reggiano shavings',
    61: 'veal steak with wild mushrooms in cream sauce',
    62: 'grilled steak served with garlic sauce',
    63: 'veal steak with green pepper sauce',
    64: 'steak with mushroom, pepper and gorgonzola sauce mixed together',
    65: 'grilled prawns served with garlic sauce',
    66: 'prawns in spicy tomato sauce',
    67: 'salmon fillet with green pepper and cognac sauce',
    68: 'fresh salmon fillet with rosé sauce',
    69: 'vanilla ice cream with chocolate sauce and whipped cream',
    70: 'vanilla, pistachio and strawberry ice cream with whipped cream',
    71: 'homemade tiramisu',
    72: 'chocolate truffle with chocolate sauce and whipped cream',
    73: 'white chocolate truffle with chocolate sauce and whipped cream',
    74: 'strawberry ice cream with fresh strawberries and whipped cream',
    75: 'pistachio ice cream with whipped cream',
    // Aperitivi
    76: 'Italian sparkling prosecco',
    77: 'sweet red port wine',
    78: 'Italian herbal aperitif',
    79: 'cocktail with prosecco and Aperol',
    80: 'cocktail with prosecco and limoncello',
    81: 'cocktail with prosecco and meloncello',
    82: 'classic bitter cocktail',
    83: 'bitter aperitif on ice',
    84: 'bitter aperitif with soda',
    85: 'bitter aperitif with orange juice',
    // Caffè
    86: 'traditional hot beverages',
    87: 'fresh mint or ginger tea',
    88: 'coffee with steamed milk',
    89: 'espresso coffee with steamed milk',
    90: 'double espresso',
    91: 'coffee with Irish whiskey and whipped cream',
    92: 'coffee with Grand Marnier and whipped cream',
    93: 'coffee with Tia Maria and whipped cream',
    94: 'coffee with Amaretto and whipped cream',
    // Vini
    95: 'house wine red, white or rosé',
    96: 'half liter of house wine',
    97: 'one liter of house wine',
    98: 'robust red wine from southern Italy',
    99: 'glass of Primitivo',
    100: 'Sicilian red wine',
    101: 'glass of Nero d\'Avola',
    102: 'red wine from Sardinia',
    103: 'glass of Cannonau',
    104: 'classic Tuscan red wine',
    105: 'glass of Chianti Classico',
    106: 'red wine from Piedmont',
    107: 'glass of Barbera',
    108: 'red wine from Abruzzo',
    109: 'glass of Montepulciano',
    110: 'premium red wine from Piedmont',
    111: 'sparkling prosecco',
    112: 'glass of Prosecco',
    113: 'white wine from Marche',
    114: 'glass of Verdicchio',
    115: 'white wine from northeast Italy',
    116: 'glass of Pinot Grigio',
    117: 'white wine from Burgundy',
    118: 'glass of Chardonnay',
    119: 'white wine from Sardinia',
    120: 'glass of Vermentino',
    121: 'rosé wine from Puglia',
    122: 'glass of Terre Sabeli Rosé',
    // Birre
    123: 'small fresh Italian beer',
    124: 'large fresh Italian beer',
    125: 'local craft beer',
    126: 'fresh non-alcoholic beer',
    127: 'Dutch pilsner beer',
    128: 'Dutch pilsner beer',
    129: 'lemon beer with alcohol',
    130: 'non-alcoholic lemon beer',
    131: 'beer with tequila',
    // Bibite Analcoliche
    132: 'cola soft drink',
    133: 'lemon soft drink',
    134: 'orange soft drink',
    135: 'blackcurrant syrup',
    136: 'red sparkling mineral water',
    137: 'blue natural mineral water',
    138: 'bitter lemon soft drink',
    139: 'tonic water',
    140: 'natural apple juice',
    141: 'natural orange juice',
    142: 'iced tea',
    143: 'green iced tea',
    144: 'chocolate milk drink',
    145: 'Dutch drinking yogurt',
    // Distillati
    146: 'Caribbean white rum',
    147: 'dark rum',
    148: 'Italian anise liqueur',
    149: 'Italian cognac',
    150: 'Italian lemon liqueur',
    151: 'Italian almond liqueur',
    152: 'Italian grappa',
    153: 'creamy lemon liqueur',
    154: 'French orange liqueur',
    155: 'French orange liqueur',
    156: 'Scottish or Irish whisky',
    157: 'coffee liqueur',
    158: 'Scottish honey liqueur',
    159: 'Spanish vanilla liqueur',
    160: 'Italian herbal bitter',
    161: 'Sicilian herbal bitter'
  },
  es: {
    1: 'filete cortado fino con rúcula y parmesano',
    2: 'filete cortado fino con rúcula, pesto, mayonesa de trufa y parmesano',
    3: 'ternera cortada fina frita con salsa tonnato',
    4: 'embutidos y quesos italianos variados',
    5: 'combinación de Carpaccio, Vitello Tonnato y Caprese',
    6: 'jamón crudo con mozzarella fresca',
    7: 'pan tostado con tomates frescos y albahaca',
    8: 'pan tostado con tomates frescos, burrata, pesto y albahaca',
    9: 'con burrata, jamón crudo y albahaca',
    10: 'tomates con mozzarella y albahaca',
    11: 'champiñones salteados en sartén',
    12: 'pan tostado con gorgonzola fundido',
    13: 'pan de pizza con mantequilla de hierbas',
    14: 'langostinos y mejillones con deliciosa salsa',
    15: 'pan casero con mantequilla de hierbas para 2 personas',
    16: 'pan casero con mantequilla de hierbas para 2 a 4 personas',
    17: 'salsa de tomate y mozzarella',
    18: 'salsa de tomate, mozzarella, jamón y piña',
    19: 'salsa de tomate, mozzarella y salami',
    20: 'salsa de tomate, mozzarella y verduras variadas',
    21: 'salsa de tomate, mozzarella, jamón, salami, setas y alcachofas',
    22: 'salsa de tomate y 4 tipos de queso',
    23: 'salsa de tomate, mozzarella y mariscos variados',
    24: 'salsa de tomate, mozzarella, burrata, pesto y tomates frescos',
    25: 'salsa de tomate, mozzarella, calabacín a la plancha, berenjena a la plancha, rúcula y parmesano',
    26: 'salsa de tomate, mozzarella, tomates frescos, rúcula y parmesano',
    27: 'salsa de tomate, mozzarella, tomates frescos, jamón crudo y rúcula',
    28: 'salsa de tomate, mozzarella, setas, setas silvestres, trufa y rúcula',
    29: 'con carne picada en salsa de tomate',
    30: 'con salsa de tomate, burrata y albahaca',
    31: 'con huevo y panceta en salsa de nata',
    32: 'con setas silvestres en salsa de nata',
    33: 'con mariscos variados en salsa de tomate',
    34: 'con filete de salmón fresco en salsa de nata',
    35: 'con verduras en salsa de nata',
    36: 'con filete de pollo en salsa cremosa de pesto',
    37: 'con filete de pollo y setas en salsa cremosa de trufa',
    38: 'con langostinos y caviar en salsa cremosa rosé',
    39: 'con langostinos y salmón en salsa cremosa rosé',
    40: 'raviolis frescos rellenos de ricotta y espinacas en salsa cremosa rosé',
    41: 'raviolis frescos rellenos de ricotta y espinacas en salsa de mantequilla y salvia',
    42: 'rollitos de pasta rellenos de ricotta y espinacas',
    43: 'tortellini con jamón en salsa de nata',
    44: '3 tipos de pasta con carne picada, guindilla y setas en salsa de tomate y queso del horno',
    45: 'arroz con setas porcini en salsa de nata',
    46: 'arroz con setas en salsa cremosa de trufa',
    47: 'arroz con mariscos',
    48: 'arroz con langostinos y calabacín',
    49: 'lasaña con carne picada en salsa de tomate y bechamel',
    50: 'lasaña con diferentes tipos de queso',
    51: 'lasaña con espinacas y gorgonzola',
    52: 'lasaña con setas porcini en bechamel y salsa de tomate',
    53: 'filete de pollo con salsa rosa',
    54: 'filete de pollo con salsa de roquefort',
    55: 'filete de pollo con salsa cremosa de setas',
    56: 'filete de pollo con verduras y salsa de tomate',
    57: 'filetes de ternera con salsa de gorgonzola',
    58: 'filetes de ternera con setas silvestres en salsa cremosa',
    59: 'filetes de ternera con jamón crudo en salsa de vino blanco y salvia',
    60: 'ternera cortada con rúcula y virutas de Parmigiano Reggiano',
    61: 'filete de ternera con setas silvestres en salsa de nata',
    62: 'filete a la plancha servido con salsa de ajo',
    63: 'filete de ternera con salsa de pimienta verde',
    64: 'filete con salsa de setas, pimienta y gorgonzola mezcladas',
    65: 'langostinos a la plancha servidos con salsa de ajo',
    66: 'langostinos en salsa de tomate picante',
    67: 'filete de salmón con pimienta verde y salsa de coñac',
    68: 'filete de salmón fresco con salsa rosé',
    69: 'helado de vainilla con salsa de chocolate y nata montada',
    70: 'helado de vainilla, pistacho y fresa con nata montada',
    71: 'tiramisú casero',
    72: 'trufa de chocolate con salsa de chocolate y nata montada',
    73: 'trufa de chocolate blanco con salsa de chocolate y nata montada',
    74: 'helado de fresa con fresas frescas y nata montada',
    75: 'helado de pistacho con nata montada',
    // Aperitivi
    76: 'prosecco espumoso italiano',
    77: 'vino de oporto rojo dulce',
    78: 'aperitivo de hierbas italiano',
    79: 'cocktail con prosecco y Aperol',
    80: 'cocktail con prosecco y limoncello',
    81: 'cocktail con prosecco y meloncello',
    82: 'cocktail amargo clásico',
    83: 'aperitivo amargo con hielo',
    84: 'aperitivo amargo con soda',
    85: 'aperitivo amargo con zumo de naranja',
    // Caffè
    86: 'bebidas calientes tradicionales',
    87: 'té de menta fresca o jengibre',
    88: 'café con leche vaporizada',
    89: 'café expresso con leche vaporizada',
    90: 'expresso doble',
    91: 'café con whisky irlandés y nata montada',
    92: 'café con Grand Marnier y nata montada',
    93: 'café con Tia Maria y nata montada',
    94: 'café con Amaretto y nata montada',
    // Vini
    95: 'vino de la casa tinto, blanco o rosé',
    96: 'medio litro del vino de la casa',
    97: 'un litro del vino de la casa',
    98: 'vino tinto robusto del sur de Italia',
    99: 'copa de Primitivo',
    100: 'vino tinto siciliano',
    101: 'copa de Nero d\'Avola',
    102: 'vino tinto de Cerdeña',
    103: 'copa de Cannonau',
    104: 'vino tinto toscano clásico',
    105: 'copa de Chianti Classico',
    106: 'vino tinto del Piamonte',
    107: 'copa de Barbera',
    108: 'vino tinto de los Abruzos',
    109: 'copa de Montepulciano',
    110: 'vino tinto premium del Piamonte',
    111: 'prosecco espumoso',
    112: 'copa de Prosecco',
    113: 'vino blanco de las Marcas',
    114: 'copa de Verdicchio',
    115: 'vino blanco del nordeste de Italia',
    116: 'copa de Pinot Grigio',
    117: 'vino blanco de Borgoña',
    118: 'copa de Chardonnay',
    119: 'vino blanco de Cerdeña',
    120: 'copa de Vermentino',
    121: 'vino rosé de la Puglia',
    122: 'copa de Terre Sabeli Rosé',
    // Birre
    123: 'cerveza italiana fresca pequeña',
    124: 'cerveza italiana fresca grande',
    125: 'cerveza artesanal local',
    126: 'cerveza sin alcohol fresca',
    127: 'cerveza pilsner holandesa',
    128: 'cerveza pilsner holandesa',
    129: 'cerveza de limón con alcohol',
    130: 'cerveza de limón sin alcohol',
    131: 'cerveza con tequila',
    // Bibite Analcoliche
    132: 'refresco de cola',
    133: 'refresco de limón',
    134: 'refresco de naranja',
    135: 'jarabe de grosella negra',
    136: 'agua mineral con gas roja',
    137: 'agua mineral natural azul',
    138: 'refresco amargo de limón',
    139: 'agua tónica',
    140: 'zumo natural de manzana',
    141: 'zumo natural de naranja',
    142: 'té helado',
    143: 'té verde helado',
    144: 'bebida láctea de chocolate',
    145: 'yogur para beber holandés',
    // Distillati
    146: 'ron blanco caribeño',
    147: 'ron oscuro',
    148: 'licor de anís italiano',
    149: 'coñac italiano',
    150: 'licor de limón italiano',
    151: 'licor de almendra italiano',
    152: 'grappa italiana',
    153: 'licor cremoso de limón',
    154: 'licor de naranja francés',
    155: 'licor de naranja francés',
    156: 'whisky escocés o irlandés',
    157: 'licor de café',
    158: 'licor escocés de miel',
    159: 'licor español de vainilla',
    160: 'amargo italiano de hierbas',
    161: 'amargo siciliano de hierbas'
  },
  fr: {
    1: 'filet coupé finement avec roquette et parmesan',
    2: 'filet coupé finement avec roquette, pesto, mayonnaise à la truffe et parmesan',
    3: 'veau coupé finement frit avec sauce tonnato',
    4: 'charcuteries et fromages italiens variés',
    5: 'combinaison de Carpaccio, Vitello Tonnato et Caprese',
    6: 'jambon cru avec mozzarella fraîche',
    7: 'pain grillé avec tomates fraîches et basilic',
    8: 'pain grillé avec tomates fraîches, burrata, pesto et basilic',
    9: 'avec burrata, jambon cru et basilic',
    10: 'tomates avec mozzarella et basilic',
    11: 'champignons sautés à la poêle',
    12: 'pain grillé avec gorgonzola fondu',
    13: 'pain à pizza avec beurre aux herbes',
    14: 'crevettes et moules avec délicieuse sauce',
    15: 'pain maison avec beurre aux herbes pour 2 personnes',
    16: 'pain maison avec beurre aux herbes pour 2 à 4 personnes',
    17: 'sauce tomate et mozzarella',
    18: 'sauce tomate, mozzarella, jambon et ananas',
    19: 'sauce tomate, mozzarella et salami',
    20: 'sauce tomate, mozzarella et légumes variés',
    21: 'sauce tomate, mozzarella, jambon, salami, champignons et artichauts',
    22: 'sauce tomate et 4 types de fromage',
    23: 'sauce tomate, mozzarella et fruits de mer variés',
    24: 'sauce tomate, mozzarella, burrata, pesto et tomates fraîches',
    25: 'sauce tomate, mozzarella, courgettes grillées, aubergines grillées, roquette et parmesan',
    26: 'sauce tomate, mozzarella, tomates fraîches, roquette et parmesan',
    27: 'sauce tomate, mozzarella, tomates fraîches, jambon cru et roquette',
    28: 'sauce tomate, mozzarella, champignons, champignons sauvages, truffe et roquette',
    29: 'avec viande hachée en sauce tomate',
    30: 'avec sauce tomate, burrata et basilic',
    31: 'avec œuf et pancetta en sauce crème',
    32: 'avec champignons sauvages en sauce crème',
    33: 'avec fruits de mer variés en sauce tomate',
    34: 'avec filet de saumon frais en sauce crème',
    35: 'avec légumes en sauce crème',
    36: 'avec filet de poulet en sauce crémeuse au pesto',
    37: 'avec filet de poulet et champignons en sauce crémeuse à la truffe',
    38: 'avec crevettes et caviar en sauce crémeuse rosé',
    39: 'avec crevettes et saumon en sauce crémeuse rosé',
    40: 'raviolis frais farcis à la ricotta et épinards en sauce crémeuse rosé',
    41: 'raviolis frais farcis à la ricotta et épinards en sauce beurre et sauge',
    42: 'rouleaux de pâtes farcis à la ricotta et épinards',
    43: 'tortellini au jambon en sauce crème',
    44: '3 types de pâtes avec viande hachée, piment et champignons en sauce tomate et fromage du four',
    45: 'riz aux champignons porcini en sauce crème',
    46: 'riz aux champignons en sauce crémeuse à la truffe',
    47: 'riz aux fruits de mer',
    48: 'riz aux crevettes et courgettes',
    49: 'lasagne avec viande hachée en sauce tomate et béchamel',
    50: 'lasagne avec différents types de fromage',
    51: 'lasagne aux épinards et gorgonzola',
    52: 'lasagne aux champignons porcini en béchamel et sauce tomate',
    53: 'filet de poulet avec sauce rose',
    54: 'filet de poulet avec sauce au roquefort',
    55: 'filet de poulet avec sauce crémeuse aux champignons',
    56: 'filet de poulet avec légumes et sauce tomate',
    57: 'steaks de veau avec sauce au gorgonzola',
    58: 'steaks de veau avec champignons sauvages en sauce crémeuse',
    59: 'steaks de veau avec jambon cru en sauce au vin blanc et sauge',
    60: 'tagliata de bœuf avec roquette et copeaux de Parmigiano Reggiano',
    61: 'steak de veau avec champignons sauvages en sauce crème',
    62: 'steak grillé servi avec sauce à l\'ail',
    63: 'steak de veau avec sauce au poivre vert',
    64: 'steak avec sauce aux champignons, poivre et gorgonzola mélangées',
    65: 'crevettes grillées servies avec sauce à l\'ail',
    66: 'crevettes en sauce tomate piquante',
    67: 'filet de saumon avec poivre vert et sauce au cognac',
    68: 'filet de saumon frais avec sauce rosé',
    69: 'glace vanille avec sauce chocolat et chantilly',
    70: 'glace vanille, pistache et fraise avec chantilly',
    71: 'tiramisu fait maison',
    72: 'truffe au chocolat avec sauce chocolat et chantilly',
    73: 'truffe au chocolat blanc avec sauce chocolat et chantilly',
    74: 'glace à la fraise avec fraises fraîches et chantilly',
    75: 'glace à la pistache avec chantilly',
    // Aperitivi
    76: 'prosecco pétillant italien',
    77: 'vin de porto rouge doux',
    78: 'apéritif aux herbes italien',
    79: 'cocktail avec prosecco et Aperol',
    80: 'cocktail avec prosecco et limoncello',
    81: 'cocktail avec prosecco et meloncello',
    82: 'cocktail amer classique',
    83: 'apéritif amer avec glace',
    84: 'apéritif amer avec soda',
    85: 'apéritif amer avec jus d\'orange',
    // Caffè
    86: 'boissons chaudes traditionnelles',
    87: 'thé à la menthe fraîche ou au gingembre',
    88: 'café avec lait vaporisé',
    89: 'café expresso avec lait vaporisé',
    90: 'expresso double',
    91: 'café avec whisky irlandais et chantilly',
    92: 'café avec Grand Marnier et chantilly',
    93: 'café avec Tia Maria et chantilly',
    94: 'café avec Amaretto et chantilly',
    // Vini
    95: 'vin de la maison rouge, blanc ou rosé',
    96: 'demi-litre du vin de la maison',
    97: 'un litre du vin de la maison',
    98: 'vin rouge robuste du sud de l\'Italie',
    99: 'verre de Primitivo',
    100: 'vin rouge sicilien',
    101: 'verre de Nero d\'Avola',
    102: 'vin rouge de Sardaigne',
    103: 'verre de Cannonau',
    104: 'vin rouge toscan classique',
    105: 'verre de Chianti Classico',
    106: 'vin rouge du Piémont',
    107: 'verre de Barbera',
    108: 'vin rouge des Abruzzes',
    109: 'verre de Montepulciano',
    110: 'vin rouge premium du Piémont',
    111: 'prosecco pétillant',
    112: 'verre de Prosecco',
    113: 'vin blanc des Marches',
    114: 'verre de Verdicchio',
    115: 'vin blanc du nord-est de l\'Italie',
    116: 'verre de Pinot Grigio',
    117: 'vin blanc de Bourgogne',
    118: 'verre de Chardonnay',
    119: 'vin blanc de Sardaigne',
    120: 'verre de Vermentino',
    121: 'vin rosé des Pouilles',
    122: 'verre de Terre Sabeli Rosé',
    // Birre
    123: 'petite bière italienne fraîche',
    124: 'grande bière italienne fraîche',
    125: 'bière artisanale locale',
    126: 'bière sans alcool fraîche',
    127: 'bière pilsner hollandaise',
    128: 'bière pilsner hollandaise',
    129: 'bière au citron avec alcool',
    130: 'bière au citron sans alcool',
    131: 'bière avec tequila',
    // Bibite Analcoliche
    132: 'boisson gazeuse au cola',
    133: 'boisson gazeuse au citron',
    134: 'boisson gazeuse à l\'orange',
    135: 'sirop de cassis',
    136: 'eau minérale gazeuse rouge',
    137: 'eau minérale naturelle bleue',
    138: 'boisson gazeuse amère au citron',
    139: 'eau tonique',
    140: 'jus naturel de pomme',
    141: 'jus naturel d\'orange',
    142: 'thé glacé',
    143: 'thé vert glacé',
    144: 'boisson lactée au chocolat',
    145: 'yaourt à boire hollandais',
    // Distillati
    146: 'rhum blanc des Caraïbes',
    147: 'rhum brun',
    148: 'liqueur d\'anis italienne',
    149: 'cognac italien',
    150: 'liqueur de citron italienne',
    151: 'liqueur d\'amande italienne',
    152: 'grappa italienne',
    153: 'liqueur crémeuse au citron',
    154: 'liqueur d\'orange française',
    155: 'liqueur d\'orange française',
    156: 'whisky écossais ou irlandais',
    157: 'liqueur de café',
    158: 'liqueur écossaise au miel',
    159: 'liqueur espagnole à la vanille',
    160: 'amer italien aux herbes',
    161: 'amer sicilien aux herbes'
  },
  de: {
    1: 'dünn geschnittenes Rinderfilet mit Rucola und Parmesan',
    2: 'dünn geschnittenes Rinderfilet mit Rucola, Pesto, Trüffel-Mayonnaise und Parmesan',
    3: 'dünn geschnittenes gebratenes Kalb mit Tonnato-Sauce',
    4: 'verschiedene italienische Wurstwaren und Käse',
    5: 'Kombination aus Carpaccio, Vitello Tonnato und Caprese',
    6: 'roher Schinken mit frischer Mozzarella',
    7: 'geröstetes Brot mit frischen Tomaten und Basilikum',
    8: 'geröstetes Brot mit frischen Tomaten, Burrata, Pesto und Basilikum',
    9: 'mit Burrata, rohem Schinken und Basilikum',
    10: 'Tomaten mit Mozzarella und Basilikum',
    11: 'in der Pfanne gebratene Champignons',
    12: 'geröstetes Brot mit geschmolzenem Gorgonzola',
    13: 'Pizzabrot mit Kräuterbutter',
    14: 'Garnelen und Muscheln mit köstlicher Sauce',
    15: 'hausgemachtes Brot mit Kräuterbutter für 2 Personen',
    16: 'hausgemachtes Brot mit Kräuterbutter für 2 bis 4 Personen',
    17: 'Tomatensauce und Mozzarella',
    18: 'Tomatensauce, Mozzarella, Schinken und Ananas',
    19: 'Tomatensauce, Mozzarella und Salami',
    20: 'Tomatensauce, Mozzarella und verschiedenes Gemüse',
    21: 'Tomatensauce, Mozzarella, Schinken, Salami, Pilze und Artischocken',
    22: 'Tomatensauce und 4 Käsesorten',
    23: 'Tomatensauce, Mozzarella und verschiedene Meeresfrüchte',
    24: 'Tomatensauce, Mozzarella, Burrata, Pesto und frische Tomaten',
    25: 'Tomatensauce, Mozzarella, gegrillte Zucchini, gegrillte Aubergine, Rucola und Parmesan',
    26: 'Tomatensauce, Mozzarella, frische Tomaten, Rucola und Parmesan',
    27: 'Tomatensauce, Mozzarella, frische Tomaten, roher Schinken und Rucola',
    28: 'Tomatensauce, Mozzarella, Pilze, Waldpilze, Trüffel und Rucola',
    29: 'mit Hackfleisch in Tomatensauce',
    30: 'mit Tomatensauce, Burrata und Basilikum',
    31: 'mit Ei und Pancetta in Sahnesauce',
    32: 'mit Waldpilzen in Sahnesauce',
    33: 'mit verschiedenen Meeresfrüchten in Tomatensauce',
    34: 'mit frischem Lachsfilet in Sahnesauce',
    35: 'mit Gemüse in Sahnesauce',
    36: 'mit Hähnchenfilet in cremiger Pesto-Sauce',
    37: 'mit Hähnchenfilet und Pilzen in cremiger Trüffel-Sauce',
    38: 'mit Garnelen und Kaviar in cremiger Rosé-Sauce',
    39: 'mit Garnelen und Lachs in cremiger Rosé-Sauce',
    40: 'frische Ravioli gefüllt mit Ricotta und Spinat in cremiger Rosé-Sauce',
    41: 'frische Ravioli gefüllt mit Ricotta und Spinat in Butter-Salbei-Sauce',
    42: 'Nudelrollen gefüllt mit Ricotta und Spinat',
    43: 'Tortellini mit Schinken in Sahnesauce',
    44: '3 Nudelsorten mit Hackfleisch, Chili und Pilzen in Tomatensauce und Käse aus dem Ofen',
    45: 'Reis mit Steinpilzen in Sahnesauce',
    46: 'Reis mit Pilzen in cremiger Trüffel-Sauce',
    47: 'Reis mit Meeresfrüchten',
    48: 'Reis mit Garnelen und Zucchini',
    49: 'Lasagne mit Hackfleisch in Tomatensauce und Béchamel',
    50: 'Lasagne mit verschiedenen Käsesorten',
    51: 'Lasagne mit Spinat und Gorgonzola',
    52: 'Lasagne mit Steinpilzen in Béchamel und Tomatensauce',
    53: 'Hähnchenfilet mit Rosa Sauce',
    54: 'Hähnchenfilet mit Roquefort-Sauce',
    55: 'Hähnchenfilet mit cremiger Pilzsauce',
    56: 'Hähnchenfilet mit Gemüse und Tomatensauce',
    57: 'Kalbsschnitzel mit Gorgonzola-Sauce',
    58: 'Kalbsschnitzel mit Waldpilzen in cremiger Sauce',
    59: 'Kalbsschnitzel mit rohem Schinken in Weißweinsauce und Salbei',
    60: 'geschnittenes Rindfleisch mit Rucola und Parmigiano Reggiano Spänen',
    61: 'Kalbssteak mit Waldpilzen in Sahnesauce',
    62: 'gegrilltes Steak serviert mit Knoblauchsauce',
    63: 'Kalbssteak mit grüner Pfeffersauce',
    64: 'Steak mit Pilz-, Pfeffer- und Gorgonzola-Sauce gemischt',
    65: 'gegrillte Garnelen serviert mit Knoblauchsauce',
    66: 'Garnelen in würziger Tomatensauce',
    67: 'Lachsfilet mit grünem Pfeffer und Cognac-Sauce',
    68: 'frisches Lachsfilet mit Rosé-Sauce',
    69: 'Vanilleeis mit Schokoladensauce und Schlagsahne',
    70: 'Vanille-, Pistazien- und Erdbeereis mit Schlagsahne',
    71: 'hausgemachtes Tiramisu',
    72: 'Schokoladentruffle mit Schokoladensauce und Schlagsahne',
    73: 'weiße Schokoladentruffle mit Schokoladensauce und Schlagsahne',
    74: 'Erdbeereis mit frischen Erdbeeren und Schlagsahne',
    75: 'Pistazieneis mit Schlagsahne',
    // Aperitivi
    76: 'italienischer Prosecco-Sekt',
    77: 'süßer roter Portwein',
    78: 'italienischer Kräuterapéritif',
    79: 'Cocktail mit Prosecco und Aperol',
    80: 'Cocktail mit Prosecco und Limoncello',
    81: 'Cocktail mit Prosecco und Meloncello',
    82: 'klassischer Bitter-Cocktail',
    83: 'bitterer Aperitif mit Eis',
    84: 'bitterer Aperitif mit Soda',
    85: 'bitterer Aperitif mit Orangensaft',
    // Caffè
    86: 'traditionelle heiße Getränke',
    87: 'frischer Minz- oder Ingwertee',
    88: 'Kaffee mit aufgeschäumter Milch',
    89: 'Espresso-Kaffee mit aufgeschäumter Milch',
    90: 'doppelter Espresso',
    91: 'Kaffee mit irischem Whisky und Schlagsahne',
    92: 'Kaffee mit Grand Marnier und Schlagsahne',
    93: 'Kaffee mit Tia Maria und Schlagsahne',
    94: 'Kaffee mit Amaretto und Schlagsahne',
    // Vini
    95: 'Hauswein rot, weiß oder rosé',
    96: 'halber Liter Hauswein',
    97: 'ein Liter Hauswein',
    98: 'kräftiger Rotwein aus Süditalien',
    99: 'Glas Primitivo',
    100: 'sizilianischer Rotwein',
    101: 'Glas Nero d\'Avola',
    102: 'Rotwein aus Sardinien',
    103: 'Glas Cannonau',
    104: 'klassischer toskanischer Rotwein',
    105: 'Glas Chianti Classico',
    106: 'Rotwein aus dem Piemont',
    107: 'Glas Barbera',
    108: 'Rotwein aus den Abruzzen',
    109: 'Glas Montepulciano',
    110: 'Premium-Rotwein aus dem Piemont',
    111: 'Prosecco-Sekt',
    112: 'Glas Prosecco',
    113: 'Weißwein aus den Marken',
    114: 'Glas Verdicchio',
    115: 'Weißwein aus Nordostitalien',
    116: 'Glas Pinot Grigio',
    117: 'Weißwein aus Burgund',
    118: 'Glas Chardonnay',
    119: 'Weißwein aus Sardinien',
    120: 'Glas Vermentino',
    121: 'Roséwein aus Apulien',
    122: 'Glas Terre Sabeli Rosé',
    // Birre
    123: 'kleines frisches italienisches Bier',
    124: 'großes frisches italienisches Bier',
    125: 'lokales Craft-Bier',
    126: 'frisches alkoholfreies Bier',
    127: 'holländisches Pilsner-Bier',
    128: 'holländisches Pilsner-Bier',
    129: 'Zitronen-Bier mit Alkohol',
    130: 'alkoholfreies Zitronen-Bier',
    131: 'Bier mit Tequila',
    // Bibite Analcoliche
    132: 'Cola-Softdrink',
    133: 'Zitronen-Softdrink',
    134: 'Orangen-Softdrink',
    135: 'schwarzer Johannisbeersirup',
    136: 'rotes Mineralwasser mit Kohlensäure',
    137: 'blaues natürliches Mineralwasser',
    138: 'bitterer Zitronen-Softdrink',
    139: 'Tonic Water',
    140: 'natürlicher Apfelsaft',
    141: 'natürlicher Orangensaft',
    142: 'Eistee',
    143: 'grüner Eistee',
    144: 'Schokoladen-Milchgetränk',
    145: 'holländischer Trinkjoghurt',
    // Distillati
    146: 'karibischer weißer Rum',
    147: 'dunkler Rum',
    148: 'italienischer Anislikör',
    149: 'italienischer Cognac',
    150: 'italienischer Zitronenlikör',
    151: 'italienischer Mandellikör',
    152: 'italienische Grappa',
    153: 'cremiger Zitronenlikör',
    154: 'französischer Orangenlikör',
    155: 'französischer Orangenlikör',
    156: 'schottischer oder irischer Whisky',
    157: 'Kaffeelikör',
    158: 'schottischer Honiglikör',
    159: 'spanischer Vanillelikör',
    160: 'italienischer Kräuterbitter',
    161: 'sizilianischer Kräuterbitter'
  },
  nl: {
    1: 'dun gesneden rundvlees met rucola en parmezaan',
    2: 'dun gesneden rundvlees met rucola, pesto, truffel mayonaise en parmezaan',
    3: 'dun gesneden gebakken kalfsvlees met tonnato saus',
    4: 'diverse Italiaanse vleeswaren en kazen',
    5: 'combinatie van Carpaccio, Vitello Tonnato en Caprese',
    6: 'rauwe ham met verse mozzarella',
    7: 'geroosterd brood met verse tomaten en basilicum',
    8: 'geroosterd brood met verse tomaten, burrata, pesto en basilicum',
    9: 'met burrata, rauwe ham en basilicum',
    10: 'tomaten met mozzarella en basilicum',
    11: 'champignons gebakken in de pan',
    12: 'geroosterd brood met gesmolten gorgonzola',
    13: 'pizzabrood met kruidenboter',
    14: 'garnalen en mosselen met heerlijke saus',
    15: 'huisgemaakt brood met kruidenboter voor 2 personen',
    16: 'huisgemaakt brood met kruidenboter voor 2 tot 4 personen',
    17: 'tomatensaus en mozzarella',
    18: 'tomatensaus, mozzarella, ham en ananas',
    19: 'tomatensaus, mozzarella en salami',
    20: 'tomatensaus, mozzarella en diverse groenten',
    21: 'tomatensaus, mozzarella, ham, salami, champignons en artisjokken',
    22: 'tomatensaus en 4 soorten kaas',
    23: 'tomatensaus, mozzarella en diverse zeevruchten',
    24: 'tomatensaus, mozzarella, burrata, pesto en verse tomaten',
    25: 'tomatensaus, mozzarella, gegrilde courgette, gegrilde aubergine, rucola en parmezaan',
    26: 'tomatensaus, mozzarella, verse tomaten, rucola en parmezaan',
    27: 'tomatensaus, mozzarella, verse tomaten, rauwe ham en rucola',
    28: 'tomatensaus, mozzarella, champignons, wilde paddenstoelen, truffel en rucola',
    29: 'met gehakt in tomatensaus',
    30: 'met tomatensaus, burrata en basilicum',
    31: 'met ei en pancetta in roomsaus',
    32: 'met wilde paddenstoelen in roomsaus',
    33: 'met diverse zeevruchten in tomatensaus',
    34: 'met verse zalmfilet in roomsaus',
    35: 'met groenten in roomsaus',
    36: 'met kipfilet in romige pesto saus',
    37: 'met kipfilet en paddenstoelen in romige truffelsaus',
    38: 'met garnalen en kaviaar in romige rosé saus',
    39: 'met garnalen en zalm in romige rosé saus',
    40: 'verse ravioli gevuld met ricotta en spinazie in romige rosé saus',
    41: 'verse ravioli gevuld met ricotta en spinazie in boter-salie saus',
    42: 'pastarolletjes gevuld met ricotta en spinazie',
    43: 'tortellini met ham in roomsaus',
    44: '3 soorten pasta met gehakt, peper en paddenstoelen in tomatensaus en kaas uit de oven',
    45: 'rijst met porcini paddenstoelen in roomsaus',
    46: 'rijst met paddenstoelen in romige truffelsaus',
    47: 'rijst met zeevruchten',
    48: 'rijst met garnalen en courgette',
    49: 'lasagne met gehakt in tomatensaus en bechamel',
    50: 'lasagne met verschillende soorten kaas',
    51: 'lasagne met spinazie en gorgonzola',
    52: 'lasagne met porcini paddenstoelen in bechamel en tomatensaus',
    53: 'kipfilet met roze saus',
    54: 'kipfilet met roquefort saus',
    55: 'kipfilet met romige paddenstoelensaus',
    56: 'kipfilet met groenten en tomatensaus',
    57: 'kalfschnitzels met gorgonzola saus',
    58: 'kalfschnitzels met wilde paddenstoelen in romige saus',
    59: 'kalfschnitzels met rauwe ham in witte wijnsaus en salie',
    60: 'gesneden rundvlees met rucola en Parmigiano Reggiano schaafsel',
    61: 'kalfssteak met wilde paddenstoelen in roomsaus',
    62: 'gegrilde steak geserveerd met knoflooksaus',
    63: 'kalfssteak met groene pepersaus',
    64: 'steak met paddenstoel-, peper- en gorgonzolasaus gemengd',
    65: 'gegrilde garnalen geserveerd met knoflooksaus',
    66: 'garnalen in pittige tomatensaus',
    67: 'zalmfilet met groene peper en cognac saus',
    68: 'verse zalmfilet met rosé saus',
    69: 'vanille-ijs met chocoladesaus en slagroom',
    70: 'vanille-, pistache- en aardbeienijs met slagroom',
    71: 'huisgemaakt tiramisu',
    72: 'chocoladetruffel met chocoladesaus en slagroom',
    73: 'witte chocoladetruffel met chocoladesaus en slagroom',
    74: 'aardbeienijs met verse aardbeien en slagroom',
    75: 'pistache-ijs met slagroom',
    // Aperitivi
    76: 'Italiaanse mousserende prosecco',
    77: 'zoete rode port',
    78: 'Italiaans kruidenaperitief',
    79: 'cocktail met prosecco en Aperol',
    80: 'cocktail met prosecco en limoncello',
    81: 'cocktail met prosecco en meloncello',
    82: 'klassieke bitter cocktail',
    83: 'bitter aperitief met ijs',
    84: 'bitter aperitief met soda',
    85: 'bitter aperitief met sinaasappelsap',
    // Caffè
    86: 'traditionele warme dranken',
    87: 'verse munt- of gemberthee',
    88: 'koffie met gestoomde melk',
    89: 'espresso koffie met gestoomde melk',
    90: 'dubbele espresso',
    91: 'koffie met Ierse whisky en slagroom',
    92: 'koffie met Grand Marnier en slagroom',
    93: 'koffie met Tia Maria en slagroom',
    94: 'koffie met Amaretto en slagroom',
    // Vini
    95: 'huiswijn rood, wit of rosé',
    96: 'halve liter huiswijn',
    97: 'een liter huiswijn',
    98: 'krachtige rode wijn uit Zuid-Italië',
    99: 'glas Primitivo',
    100: 'Siciliaanse rode wijn',
    101: 'glas Nero d\'Avola',
    102: 'rode wijn uit Sardinië',
    103: 'glas Cannonau',
    104: 'klassieke Toscaanse rode wijn',
    105: 'glas Chianti Classico',
    106: 'rode wijn uit Piëmont',
    107: 'glas Barbera',
    108: 'rode wijn uit Abruzzo',
    109: 'glas Montepulciano',
    110: 'premium rode wijn uit Piëmont',
    111: 'mousserende prosecco',
    112: 'glas Prosecco',
    113: 'witte wijn uit Marche',
    114: 'glas Verdicchio',
    115: 'witte wijn uit Noordoost-Italië',
    116: 'glas Pinot Grigio',
    117: 'witte wijn uit Bourgondië',
    118: 'glas Chardonnay',
    119: 'witte wijn uit Sardinië',
    120: 'glas Vermentino',
    121: 'rosé wijn uit Puglia',
    122: 'glas Terre Sabeli Rosé',
    // Birre
    123: 'klein vers Italiaans bier',
    124: 'groot vers Italiaans bier',
    125: 'lokaal ambachtelijk bier',
    126: 'vers alcoholvrij bier',
    127: 'Nederlands pilsner bier',
    128: 'Nederlands pilsner bier',
    129: 'citroenbier met alcohol',
    130: 'alcoholvrij citroenbier',
    131: 'bier met tequila',
    // Bibite Analcoliche
    132: 'cola frisdrank',
    133: 'citroen frisdrank',
    134: 'sinaasappel frisdrank',
    135: 'zwarte bessensiroop',
    136: 'rood mineraalwater met koolzuur',
    137: 'blauw natuurlijk mineraalwater',
    138: 'bitter citroen frisdrank',
    139: 'tonic water',
    140: 'natuurlijk appelsap',
    141: 'natuurlijk sinaasappelsap',
    142: 'ijsthee',
    143: 'groene ijsthee',
    144: 'chocolade melkdrank',
    145: 'Nederlandse drinkbare yoghurt',
    // Distillati
    146: 'Caribische witte rum',
    147: 'donkere rum',
    148: 'Italiaanse anijslikeur',
    149: 'Italiaanse cognac',
    150: 'Italiaanse citroenlikeur',
    151: 'Italiaanse amandellikeur',
    152: 'Italiaanse grappa',
    153: 'romige citroenlikeur',
    154: 'Franse sinaasappellikeur',
    155: 'Franse sinaasappellikeur',
    156: 'Schotse of Ierse whisky',
    157: 'koffielikeur',
    158: 'Schotse honinglikeur',
    159: 'Spaanse vanillelikeur',
    160: 'Italiaanse kruidenbitter',
    161: 'Siciliaanse kruidenbitter'
  },
  pt: {
    1: 'filé cortado fino com rúcula e parmesão',
    2: 'filé cortado fino com rúcula, pesto, maionese de trufa e parmesão',
    3: 'vitela cortada fina frita com molho tonnato',
    4: 'embutidos e queijos italianos variados',
    5: 'combinação de Carpaccio, Vitello Tonnato e Caprese',
    6: 'presunto cru com mussarela fresca',
    7: 'pão torrado com tomates frescos e manjericão',
    8: 'pão torrado com tomates frescos, burrata, pesto e manjericão',
    9: 'com burrata, presunto cru e manjericão',
    10: 'tomates com mussarela e manjericão',
    11: 'champignons refogados na panela',
    12: 'pão torrado com gorgonzola derretido',
    13: 'pão de pizza com manteiga de ervas',
    14: 'camarões e mexilhões com molho delicioso',
    15: 'pão caseiro com manteiga de ervas para 2 pessoas',
    16: 'pão caseiro com manteiga de ervas para 2 a 4 pessoas',
    17: 'molho de tomate e mussarela',
    18: 'molho de tomate, mussarela, presunto e abacaxi',
    19: 'molho de tomate, mussarela e salame',
    20: 'molho de tomate, mussarela e vegetais variados',
    21: 'molho de tomate, mussarela, presunto, salame, cogumelos e alcachofras',
    22: 'molho de tomate e 4 tipos de queijo',
    23: 'molho de tomate, mussarela e frutos do mar variados',
    24: 'molho de tomate, mussarela, burrata, pesto e tomates frescos',
    25: 'molho de tomate, mussarela, abobrinha grelhada, berinjela grelhada, rúcula e parmesão',
    26: 'molho de tomate, mussarela, tomates frescos, rúcula e parmesão',
    27: 'molho de tomate, mussarela, tomates frescos, presunto cru e rúcula',
    28: 'molho de tomate, mussarela, cogumelos, cogumelos selvagens, trufa e rúcula',
    29: 'com carne moída no molho de tomate',
    30: 'com molho de tomate, burrata e manjericão',
    31: 'com ovo e panceta em molho de creme',
    32: 'com cogumelos selvagens em molho de creme',
    33: 'com frutos do mar variados em molho de tomate',
    34: 'com filé de salmão fresco em molho de creme',
    35: 'com vegetais em molho de creme',
    36: 'com filé de frango em molho cremoso de pesto',
    37: 'com filé de frango e cogumelos em molho cremoso de trufa',
    38: 'com camarões e caviar em molho cremoso rosé',
    39: 'com camarões e salmão em molho cremoso rosé',
    40: 'ravióli fresco recheado com ricota e espinafre em molho cremoso rosé',
    41: 'ravióli fresco recheado com ricota e espinafre em molho de manteiga e sálvia',
    42: 'rolinhos de massa recheados com ricota e espinafre',
    43: 'tortellini com presunto em molho de creme',
    44: '3 tipos de massa com carne moída, pimenta e cogumelos em molho de tomate e queijo do forno',
    45: 'arroz com cogumelos porcini em molho de creme',
    46: 'arroz com cogumelos em molho cremoso de trufa',
    47: 'arroz com frutos do mar',
    48: 'arroz com camarões e abobrinha',
    49: 'lasanha com carne moída em molho de tomate e bechamel',
    50: 'lasanha com diferentes tipos de queijo',
    51: 'lasanha com espinafre e gorgonzola',
    52: 'lasanha com cogumelos porcini em bechamel e molho de tomate',
    53: 'filé de frango com molho rosa',
    54: 'filé de frango com molho de roquefort',
    55: 'filé de frango com molho cremoso de cogumelos',
    56: 'filé de frango com vegetais e molho de tomate',
    57: 'bifes de vitela com molho de gorgonzola',
    58: 'bifes de vitela com cogumelos selvagens em molho cremoso',
    59: 'bifes de vitela com presunto cru em molho de vinho branco e sálvia',
    60: 'fatias de carne bovina com rúcula e lascas de Parmigiano Reggiano',
    61: 'bife de vitela com cogumelos selvagens em molho de creme',
    62: 'bife grelhado servido com molho de alho',
    63: 'bife de vitela com molho de pimenta verde',
    64: 'bife com molho de cogumelos, pimenta e gorgonzola misturados',
    65: 'camarões grelhados servidos com molho de alho',
    66: 'camarões em molho de tomate picante',
    67: 'filé de salmão com pimenta verde e molho de conhaque',
    68: 'filé de salmão fresco com molho rosé',
    69: 'sorvete de baunilha com molho de chocolate e chantilly',
    70: 'sorvete de baunilha, pistache e morango com chantilly',
    71: 'tiramisu caseiro',
    72: 'trufa de chocolate com molho de chocolate e chantilly',
    73: 'trufa de chocolate branco com molho de chocolate e chantilly',
    74: 'sorvete de morango com morangos frescos e chantilly',
    75: 'sorvete de pistache com chantilly',
    // Aperitivi
    76: 'prosecco espumante italiano',
    77: 'vinho do porto vermelho doce',
    78: 'aperitivo herbal italiano',
    79: 'cocktail com prosecco e Aperol',
    80: 'cocktail com prosecco e limoncello',
    81: 'cocktail com prosecco e meloncello',
    82: 'cocktail amargo clássico',
    83: 'aperitivo amargo com gelo',
    84: 'aperitivo amargo com água com gás',
    85: 'aperitivo amargo com suco de laranja',
    // Caffè
    86: 'bebidas quentes tradicionais',
    87: 'chá de menta fresca ou gengibre',
    88: 'café com leite vaporizado',
    89: 'café expresso com leite vaporizado',
    90: 'expresso duplo',
    91: 'café com whisky irlandês e chantilly',
    92: 'café com Grand Marnier e chantilly',
    93: 'café com Tia Maria e chantilly',
    94: 'café com Amaretto e chantilly',
    // Vini
    95: 'vinho da casa tinto, branco ou rosé',
    96: 'meio litro do vinho da casa',
    97: 'um litro do vinho da casa',
    98: 'vinho tinto robusto do sul da Itália',
    99: 'taça de Primitivo',
    100: 'vinho tinto siciliano',
    101: 'taça de Nero d\'Avola',
    102: 'vinho tinto da Sardenha',
    103: 'taça de Cannonau',
    104: 'vinho tinto toscano clássico',
    105: 'taça de Chianti Classico',
    106: 'vinho tinto do Piemonte',
    107: 'taça de Barbera',
    108: 'vinho tinto dos Abruzos',
    109: 'taça de Montepulciano',
    110: 'vinho tinto premium do Piemonte',
    111: 'prosecco espumante',
    112: 'taça de Prosecco',
    113: 'vinho branco das Marcas',
    114: 'taça de Verdicchio',
    115: 'vinho branco do nordeste da Itália',
    116: 'taça de Pinot Grigio',
    117: 'vinho branco da Borgonha',
    118: 'taça de Chardonnay',
    119: 'vinho branco da Sardenha',
    120: 'taça de Vermentino',
    121: 'vinho rosé da Puglia',
    122: 'taça de Terre Sabeli Rosé',
    // Birre
    123: 'cerveja italiana gelada pequena',
    124: 'cerveja italiana gelada grande',
    125: 'cerveja artesanal local',
    126: 'cerveja sem álcool gelada',
    127: 'cerveja pilsner holandesa',
    128: 'cerveja pilsner holandesa',
    129: 'cerveja com sabor de limão com álcool',
    130: 'cerveja com sabor de limão sem álcool',
    131: 'cerveja com tequila',
    // Bibite Analcoliche
    132: 'refrigerante de cola',
    133: 'refrigerante de limão',
    134: 'refrigerante de laranja',
    135: 'xarope de groselha preta',
    136: 'água mineral com gás vermelha',
    137: 'água mineral natural azul',
    138: 'refrigerante amargo de limão',
    139: 'água tônica',
    140: 'suco natural de maçã',
    141: 'suco natural de laranja',
    142: 'chá gelado',
    143: 'chá verde gelado',
    144: 'bebida láctea com chocolate',
    145: 'iogurte para beber holandês',
    // Distillati
    146: 'rum branco caribenho',
    147: 'rum escuro',
    148: 'licor de anis italiano',
    149: 'conhaque italiano',
    150: 'licor de limão italiano',
    151: 'licor de amêndoa italiano',
    152: 'aguardente italiana',
    153: 'licor cremoso de limão',
    154: 'licor de laranja francês',
    155: 'licor de laranja francês',
    156: 'whisky escocês ou irlandês',
    157: 'licor de café',
    158: 'licor escocês com mel',
    159: 'licor espanhol de baunilha',
    160: 'bitter italiano de ervas',
    161: 'bitter siciliano de ervas'
  }
};

// Menu data from Ristorante Dagino
const menuCategories = [
  {
    id: 'antipasti',
    name: 'Antipasti',
    icon: <ChefHat size={20} />,
    items: [
      {
        id: 1,
        name: 'Carpaccio',
        price: '€13.50',
        popular: true
      },
      {
        id: 2,
        name: 'Carpaccio Speciale',
        price: '€15.00'
      },
      {
        id: 3,
        name: 'Vitello Tonnato',
        price: '€13.50'
      },
      {
        id: 4,
        name: 'Antipasto Italiano',
        price: '€16.00'
      },
      {
        id: 5,
        name: 'Antipasto Speciale',
        price: '€17.50',
        popular: true
      },
      {
        id: 6,
        name: 'Prosciutto e Mozzarella',
        price: '€13.00'
      },
      {
        id: 7,
        name: 'Bruschette Pomodoro',
        price: '€12.00'
      },
      {
        id: 8,
        name: 'Bruschette Speciale',
        price: '€15.50'
      },
      {
        id: 9,
        name: 'Burrata',
        price: '€16.00'
      },
      {
        id: 10,
        name: 'Insalata Caprese',
        price: '€12.00'
      },
      {
        id: 11,
        name: 'Funghi Trifolati',
        price: '€12.00'
      },
      {
        id: 12,
        name: 'Crostini Gorgonzola',
        price: '€14.50'
      },
      {
        id: 13,
        name: 'Focaccia e burro',
        price: '€10.00'
      },
      {
        id: 14,
        name: 'Cozze e Gamberi',
        price: '€17.50'
      },
      {
        id: 15,
        name: 'Pane e Burro (medium)',
        price: '€4.50'
      },
      {
        id: 16,
        name: 'Pane e Burro (grande)',
        price: '€6.50'
      }
    ]
  },
  {
    id: 'pizze',
    name: 'Pizze',
    icon: <ChefHat size={20} />,
    items: [
      {
        id: 17,
        name: 'Margherita',
        price: '€12.00',
        popular: true
      },
      {
        id: 18,
        name: 'Hawaii',
        price: '€15.00'
      },
      {
        id: 19,
        name: 'Salame',
        price: '€13.50'
      },
      {
        id: 20,
        name: 'Vegetaria',
        price: '€16.50'
      },
      {
        id: 21,
        name: 'Stagioni',
        price: '€17.00'
      },
      {
        id: 22,
        name: 'Formaggi',
        price: '€16.00'
      },
      {
        id: 23,
        name: 'Pescatora',
        price: '€16.00'
      },
      {
        id: 24,
        name: 'Burrata',
        price: '€18.50',
        popular: true
      },
      {
        id: 25,
        name: 'Ortolana',
        price: '€18.50'
      },
      {
        id: 26,
        name: 'Rucola',
        price: '€16.00'
      },
      {
        id: 27,
        name: 'Parma',
        price: '€18.00'
      },
      {
        id: 28,
        name: 'Tartufo',
        price: '€19.50',
        popular: true
      }
    ]
  },
  {
    id: 'pasta',
    name: 'Pasta',
    icon: <Wine size={20} />,
    items: [
      {
        id: 29,
        name: 'Bolognese',
        price: '€13.00',
        popular: true
      },
      {
        id: 30,
        name: 'Pomodoro e Burrata',
        price: '€15.00'
      },
      {
        id: 31,
        name: 'Carbonara',
        price: '€14.00',
        popular: true
      },
      {
        id: 32,
        name: 'Ai Porcini',
        price: '€15.00'
      },
      {
        id: 33,
        name: 'Frutti di Mare',
        price: '€17.50'
      },
      {
        id: 34,
        name: 'Al Salmone',
        price: '€16.50'
      },
      {
        id: 35,
        name: 'Vegetariana',
        price: '€16.00'
      },
      {
        id: 36,
        name: 'Pesto e Pollo',
        price: '€16.50'
      },
      {
        id: 37,
        name: 'Pollo e Tartufo',
        price: '€17.50'
      },
      {
        id: 38,
        name: 'Gamberi e Caviale',
        price: '€18.00'
      },
      {
        id: 39,
        name: 'Gamberi e Salmone',
        price: '€19.50'
      },
      {
        id: 40,
        name: 'Ravioli Freschi',
        price: '€17.00'
      },
      {
        id: 41,
        name: 'Ravioli Freschi Burro e Salvia',
        price: '€16.00'
      },
      {
        id: 42,
        name: 'Cannelloni',
        price: '€15.00'
      },
      {
        id: 43,
        name: 'Tortellini alla Panna',
        price: '€16.00'
      },
      {
        id: 44,
        name: 'Tris Speciale',
        price: '€18.00'
      }
    ]
  },
  {
    id: 'risotti',
    name: 'Risotti e Lasagne',
    icon: <Wine size={20} />,
    items: [
      {
        id: 45,
        name: 'Risotto ai Porcini',
        price: '€15.50',
        popular: true
      },
      {
        id: 46,
        name: 'Risotto al Tartufo',
        price: '€18.00'
      },
      {
        id: 47,
        name: 'Risotto del Pescatora',
        price: '€16.50'
      },
      {
        id: 48,
        name: 'Risotto Scampi e Zucchine',
        price: '€18.50'
      },
      {
        id: 49,
        name: 'Lasagna',
        price: '€14.00'
      },
      {
        id: 50,
        name: 'Lasagna ai Formaggi',
        price: '€15.00'
      },
      {
        id: 51,
        name: 'Lasagna Spinaci e Zola',
        price: '€17.50'
      },
      {
        id: 52,
        name: 'Lasagna ai Porcini',
        price: '€17.50'
      }
    ]
  },
  {
    id: 'secondi',
    name: 'Secondi di Carne e Pesce',
    icon: <Users size={20} />,
    items: [
      {
        id: 53,
        name: 'Pollo in Salsa Rosa',
        price: '€27.00',
        popular: true
      },
      {
        id: 54,
        name: 'Pollo Roquefort',
        price: '€27.50'
      },
      {
        id: 55,
        name: 'Pollo ai Funghi',
        price: '€27.50'
      },
      {
        id: 56,
        name: 'Pollo alla Cacciatora',
        price: '€27.50'
      },
      {
        id: 57,
        name: 'Scaloppa Gorgonzola',
        price: '€29.50'
      },
      {
        id: 58,
        name: 'Scaloppa ai Porcini',
        price: '€30.00'
      },
      {
        id: 59,
        name: 'Saltimbocca alla Romana',
        price: '€30.00'
      },
      {
        id: 60,
        name: 'Tagliata di Vitella',
        price: '€33.50',
        popular: true
      },
      {
        id: 61,
        name: 'Bistecca ai Porcini',
        price: '€34.50'
      },
      {
        id: 62,
        name: 'Bistecca ai Ferri',
        price: '€32.00'
      },
      {
        id: 63,
        name: 'Bistecca al Pepe',
        price: '€33.00'
      },
      {
        id: 64,
        name: 'Bistecca Ciccio Bello',
        price: '€35.00'
      },
      {
        id: 65,
        name: 'Scampi alla Griglia',
        price: '€31.00'
      },
      {
        id: 66,
        name: 'Scampi alla Diavola',
        price: '€32.00'
      },
      {
        id: 67,
        name: 'Salmone al Pepe e Cognac',
        price: '€31.00'
      },
      {
        id: 68,
        name: 'Salmone in Salsa Rosa',
        price: '€30.00'
      }
    ]
  },
  {
    id: 'dolci',
    name: 'Dolci',
    icon: <Heart size={20} />,
    items: [
      {
        id: 69,
        name: 'Dama Bianca',
        price: '€7.00',
        popular: true
      },
      {
        id: 70,
        name: 'Gelato Italiano',
        price: '€7.00'
      },
      {
        id: 71,
        name: 'Tiramisù',
        price: '€7.50',
        popular: true
      },
      {
        id: 72,
        name: 'Tartufo al Cioccolato',
        price: '€7.00'
      },
      {
        id: 73,
        name: 'Tartufo Bianco',
        price: '€7.00'
      },
      {
        id: 74,
        name: 'Gelato alle Fragole',
        price: '€8.50'
      },
      {
        id: 75,
        name: 'Coppa al Pistacchio',
        price: '€7.50'
      }
    ]
  },
  {
    id: 'aperitivi',
    name: 'Aperitivi',
    icon: <Wine size={20} />,
    items: [
      {
        id: 76,
        name: 'Calice di Prosecco',
        price: '€8.00',
        popular: true
      },
      {
        id: 77,
        name: 'Porto Rosso',
        price: '€5.00'
      },
      {
        id: 78,
        name: 'Martini Rosso o Bianco',
        price: '€5.00'
      },
      {
        id: 79,
        name: 'Aperol Spritz',
        price: '€8.00',
        popular: true
      },
      {
        id: 80,
        name: 'Limoncello Spritz',
        price: '€8.00'
      },
      {
        id: 81,
        name: 'Meloncello Spritz',
        price: '€8.00'
      },
      {
        id: 82,
        name: 'Negroni',
        price: '€7.50'
      },
      {
        id: 83,
        name: 'Campari con ghiaccio',
        price: '€4.50'
      },
      {
        id: 84,
        name: 'Campari con soda',
        price: '€6.00'
      },
      {
        id: 85,
        name: 'Campari con succo d\'arancia',
        price: '€6.50'
      }
    ]
  },
  {
    id: 'caffe',
    name: 'Caffè',
    icon: <Heart size={20} />,
    items: [
      {
        id: 86,
        name: 'Tè, Caffè o Espresso',
        price: '€3.00'
      },
      {
        id: 87,
        name: 'Tè alla menta fresca o allo zenzero',
        price: '€4.00'
      },
      {
        id: 88,
        name: 'Latte Macchiato',
        price: '€4.00'
      },
      {
        id: 89,
        name: 'Cappuccino',
        price: '€4.00',
        popular: true
      },
      {
        id: 90,
        name: 'Espresso Doppio',
        price: '€4.50'
      },
      {
        id: 91,
        name: 'Irish Coffee',
        price: '€8.00'
      },
      {
        id: 92,
        name: 'French Coffee',
        price: '€8.00'
      },
      {
        id: 93,
        name: 'Spanish Coffee',
        price: '€8.00'
      },
      {
        id: 94,
        name: 'Italian Coffee',
        price: '€8.00'
      }
    ]
  },
  {
    id: 'vini',
    name: 'Vini',
    icon: <Wine size={20} />,
    items: [
      {
        id: 95,
        name: 'Vino della casa per bicchiere (rosso, bianco, rosé)',
        price: '€5.00'
      },
      {
        id: 96,
        name: 'Vino della casa caraffa ½ litro',
        price: '€15.00'
      },
      {
        id: 97,
        name: 'Vino della casa caraffa 1 litro',
        price: '€25.00'
      },
      {
        id: 98,
        name: 'Primitivo (bottiglia)',
        price: '€30.00',
        popular: true
      },
      {
        id: 99,
        name: 'Primitivo (bicchiere)',
        price: '€7.50'
      },
      {
        id: 100,
        name: 'Nero d\'Avola (bottiglia)',
        price: '€30.00'
      },
      {
        id: 101,
        name: 'Nero d\'Avola (bicchiere)',
        price: '€7.50'
      },
      {
        id: 102,
        name: 'Cannonau (bottiglia)',
        price: '€32.00'
      },
      {
        id: 103,
        name: 'Cannonau (bicchiere)',
        price: '€7.50'
      },
      {
        id: 104,
        name: 'Chianti Classico (bottiglia)',
        price: '€32.00',
        popular: true
      },
      {
        id: 105,
        name: 'Chianti Classico (bicchiere)',
        price: '€8.00'
      },
      {
        id: 106,
        name: 'Barbera (bottiglia)',
        price: '€36.00'
      },
      {
        id: 107,
        name: 'Barbera (bicchiere)',
        price: '€9.00'
      },
      {
        id: 108,
        name: 'Montepulciano (bottiglia)',
        price: '€30.00'
      },
      {
        id: 109,
        name: 'Montepulciano (bicchiere)',
        price: '€7.50'
      },
      {
        id: 110,
        name: 'Barolo (bottiglia)',
        price: '€60.00'
      },
      {
        id: 111,
        name: 'Prosecco (bottiglia)',
        price: '€27.50'
      },
      {
        id: 112,
        name: 'Prosecco (bicchiere)',
        price: '€8.00'
      },
      {
        id: 113,
        name: 'Verdicchio (bottiglia)',
        price: '€27.50'
      },
      {
        id: 114,
        name: 'Verdicchio (bicchiere)',
        price: '€7.00'
      },
      {
        id: 115,
        name: 'Pinot Grigio (bottiglia)',
        price: '€27.50'
      },
      {
        id: 116,
        name: 'Pinot Grigio (bicchiere)',
        price: '€7.00'
      },
      {
        id: 117,
        name: 'Chardonnay (bottiglia)',
        price: '€27.50'
      },
      {
        id: 118,
        name: 'Chardonnay (bicchiere)',
        price: '€7.00'
      },
      {
        id: 119,
        name: 'Vermentino (bottiglia)',
        price: '€30.00'
      },
      {
        id: 120,
        name: 'Vermentino (bicchiere)',
        price: '€7.00'
      },
      {
        id: 121,
        name: 'Terre Sabeli Rosé (bottiglia)',
        price: '€27.50'
      },
      {
        id: 122,
        name: 'Terre Sabeli Rosé (bicchiere)',
        price: '€7.00'
      }
    ]
  },
  {
    id: 'birre',
    name: 'Birre',
    icon: <Users size={20} />,
    items: [
      {
        id: 123,
        name: 'Moretti alla spina 0,25',
        price: '€4.25',
        popular: true
      },
      {
        id: 124,
        name: 'Moretti alla spina 0,50',
        price: '€8.50'
      },
      {
        id: 125,
        name: 'Skuumkoppe alla spina',
        price: '€5.50'
      },
      {
        id: 126,
        name: 'Heineken alla spina 0.0',
        price: '€4.50'
      },
      {
        id: 127,
        name: 'Amstel bottiglia',
        price: '€3.50'
      },
      {
        id: 128,
        name: 'Heineken bottiglia',
        price: '€3.50'
      },
      {
        id: 129,
        name: 'Radler 2.0',
        price: '€4.50'
      },
      {
        id: 130,
        name: 'Radler 0.0',
        price: '€4.50'
      },
      {
        id: 131,
        name: 'Desperados',
        price: '€6.00'
      }
    ]
  },
  {
    id: 'bibite',
    name: 'Bibite Analcoliche',
    icon: <Sparkle size={20} />,
    items: [
      {
        id: 132,
        name: 'Cola',
        price: '€3.00'
      },
      {
        id: 133,
        name: 'Sprite',
        price: '€3.00'
      },
      {
        id: 134,
        name: 'Fanta',
        price: '€3.00'
      },
      {
        id: 135,
        name: 'Cassis',
        price: '€3.00'
      },
      {
        id: 136,
        name: 'Spa Red',
        price: '€3.00'
      },
      {
        id: 137,
        name: 'Spa Blue',
        price: '€3.00'
      },
      {
        id: 138,
        name: 'Bitter Lemon',
        price: '€3.00'
      },
      {
        id: 139,
        name: 'Tonic',
        price: '€3.00'
      },
      {
        id: 140,
        name: 'Succo di Mela',
        price: '€3.00'
      },
      {
        id: 141,
        name: 'Succo d\'Arancia',
        price: '€3.00'
      },
      {
        id: 142,
        name: 'Tè Freddo',
        price: '€3.00'
      },
      {
        id: 143,
        name: 'Tè Freddo Verde',
        price: '€3.00'
      },
      {
        id: 144,
        name: 'Latte al Cioccolato',
        price: '€3.00'
      },
      {
        id: 145,
        name: 'Fristi',
        price: '€3.00'
      }
    ]
  },
  {
    id: 'distillati',
    name: 'Distillati',
    icon: <Wine size={20} />,
    items: [
      {
        id: 146,
        name: 'Bacardi',
        price: '€5.00'
      },
      {
        id: 147,
        name: 'Rum Nero',
        price: '€5.00'
      },
      {
        id: 148,
        name: 'Sambuca',
        price: '€5.00'
      },
      {
        id: 149,
        name: 'Cognac Italiano',
        price: '€6.00'
      },
      {
        id: 150,
        name: 'Limoncello',
        price: '€5.00',
        popular: true
      },
      {
        id: 151,
        name: 'Amaretto',
        price: '€5.00'
      },
      {
        id: 152,
        name: 'Grappa',
        price: '€5.00'
      },
      {
        id: 153,
        name: 'Limoncello Crema',
        price: '€7.00'
      },
      {
        id: 154,
        name: 'Grand Marnier',
        price: '€6.00'
      },
      {
        id: 155,
        name: 'Cointreau',
        price: '€6.00'
      },
      {
        id: 156,
        name: 'Whisky',
        price: '€5.00'
      },
      {
        id: 157,
        name: 'Tia Maria',
        price: '€6.00'
      },
      {
        id: 158,
        name: 'Drambuie',
        price: '€6.00'
      },
      {
        id: 159,
        name: 'Liquor 43',
        price: '€6.00'
      },
      {
        id: 160,
        name: 'Amaro Ramazotti',
        price: '€5.00'
      },
      {
        id: 161,
        name: 'Averna',
        price: '€5.00'
      }
    ]
  }
];

function App() {
  const [selectedLanguage, setSelectedLanguage] = useKV<Language | null>('selected-language', null);
  const [activeCategory, setActiveCategory] = useState('antipasti');
  const [activeSection, setActiveSection] = useState('hero');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<any>(null);

  // Check if user is owner on mount
  useEffect(() => {
    const checkUserPermissions = async () => {
      try {
        // const user = await spark.user();
        // setUserInfo(user);
      } catch (error) {
        console.log('User not authenticated');
      }
    };
    checkUserPermissions();
  }, []);

  // Scroll detection to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'menu', 'reservations', 'about', 'reviews', 'contact'];
      const menuCategories = ['antipasti', 'pizze', 'pasta', 'risotti', 'secondi', 'dolci', 'aperitivi', 'vini', 'birre', 'caffe', 'bibite', 'distillati'];
      
      const allSections = [...sections, ...menuCategories];
      
      for (const section of allSections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const isVisible = rect.top <= 100 && rect.bottom >= 100;
          
          if (isVisible) {
            setActiveSection(section);
            // If it's a menu category, also set it as active category
            if (menuCategories.includes(section)) {
              setActiveCategory(section);
            }
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Translation helper function with fallback
  const t = (key: TranslationKey): string => {
    if (!selectedLanguage) return '';
    return getTranslation(selectedLanguage, key);
  };

  // Get translated description for menu item
  const getItemDescription = (itemId: number): string => {
    if (!selectedLanguage) return '';
    return menuDescriptions[selectedLanguage]?.[itemId] || '';
  };

  // Show language selector if no language is selected
  if (!selectedLanguage) {
    return <LanguageSelector onLanguageSelect={setSelectedLanguage} />;
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
    setActiveSection(sectionId);
    
    // If navigating to a menu category, set it as active
    if (menuCategories.find(cat => cat.id === sectionId)) {
      setActiveCategory(sectionId);
    }
  };

  const handleCall = (phoneNumber?: string) => {
    // Extract first phone number if no specific number provided
    const phone = phoneNumber || t('phone').split(' / ')[0];
    // Clean the phone number (remove spaces and special characters except +)
    const cleanPhone = phone.replace(/[^\d+]/g, '');
    window.open(`tel:${cleanPhone}`, '_self');
  };

  const handleDirections = () => {
    const encodedAddress = encodeURIComponent(t('address'));
    window.open(`https://maps.google.com/?q=${encodedAddress}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Toaster position="top-right" />
      {/* Modern Navigation with glassmorphism */}
      <header className="sticky top-0 z-50 glass-nav">
        <div className="container-responsive h-16 md:h-18 flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
            <div className="h-8 w-8 md:h-10 md:w-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <ChefHat size={16} className="md:hidden text-primary-foreground" weight="bold" />
              <ChefHat size={20} className="hidden md:block text-primary-foreground" weight="bold" />
            </div>
            <h1 className="font-heading text-lg md:text-xl lg:text-2xl font-bold text-gradient">Da Gino</h1>
          </div>
          
          <div className="flex items-center gap-1 md:gap-3 flex-shrink-0">
            <div className="hidden sm:block">
              <SearchSystem 
                language={selectedLanguage}
                menuCategories={menuCategories}
                menuDescriptions={menuDescriptions}
                onNavigate={scrollToSection}
              />
            </div>
            <LanguageSwitcher 
              currentLanguage={selectedLanguage}
              onLanguageChange={setSelectedLanguage}
            />
            
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden h-10 w-10 hover-lift flex-shrink-0">
                  <List size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 sm:w-72 glass-card border-l">
                <nav className="flex flex-col space-y-2 mt-8">
                  {/* Add search for mobile */}
                  <div className="sm:hidden mb-4">
                    <SearchSystem 
                      language={selectedLanguage}
                      menuCategories={menuCategories}
                      menuDescriptions={menuDescriptions}
                      onNavigate={scrollToSection}
                    />
                  </div>
                  
                  {[
                    { key: 'home', section: 'hero' },
                    { key: 'menu', section: 'menu' },
                    { key: 'reservations', section: 'reservations' },
                    { key: 'about', section: 'about' },
                    { key: 'reviews', section: 'reviews' },
                    { key: 'contact', section: 'contact' }
                  ].map((item) => (
                    <Button 
                      key={item.key}
                      variant="ghost" 
                      className="justify-start text-base font-medium h-12 hover-lift"
                      onClick={() => scrollToSection(item.section)}
                    >
                      {t(item.key as TranslationKey)}
                    </Button>
                  ))}
                  
                  <div className="pt-4">
                    <Button 
                      onClick={() => handleCall()}
                      className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 h-12 btn-modern"
                    >
                      <Phone size={18} className="mr-2" />
                      {t('callNow')}
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Navigation with enhanced styling */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 xl:space-x-4">
            {[
              { key: 'home', section: 'hero' },
              { key: 'menu', section: 'menu' },
              { key: 'reservations', section: 'reservations' },
              { key: 'about', section: 'about' },
              { key: 'reviews', section: 'reviews' },
              { key: 'contact', section: 'contact' }
            ].map((item) => (
              <Button 
                key={item.key}
                variant="ghost" 
                onClick={() => scrollToSection(item.section)} 
                className="text-sm lg:text-base hover-lift relative group px-2 lg:px-3 xl:px-4"
              >
                {t(item.key as TranslationKey)}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 group-hover:w-full"></div>
              </Button>
            ))}
            
            <Button 
              onClick={() => handleCall()} 
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-sm lg:text-base btn-modern ml-2 lg:ml-4 px-3 lg:px-4"
            >
              <Phone size={14} className="mr-1 lg:mr-2" />
              <span className="hidden lg:inline">{t('call')}</span>
              <span className="lg:hidden">{t('callShort' as TranslationKey) || t('call')}</span>
            </Button>
          </nav>
        </div>
      </header>

      {/* Breadcrumb Navigation */}
      <Breadcrumb
        language={selectedLanguage}
        currentSection={activeSection}
        onNavigate={scrollToSection}
      />

      {/* Enhanced Hero Section */}
      <section id="hero" className="relative min-h-[85vh] flex items-center justify-center text-center section-padding">
        <div className="container-responsive max-w-5xl mx-auto space-y-8 animate-fade-in">
          <div className="space-y-6">
            <h1 className="font-heading text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-foreground text-shadow-soft leading-tight text-balance">
              {t('restaurantName')}
            </h1>
            <div className="max-w-3xl mx-auto space-y-4">
              <p className="font-body text-xl sm:text-2xl md:text-3xl text-muted-foreground font-light text-balance">
                {t('tagline')}
              </p>
              <p className="font-body text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-balance">
                {t('description')}
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button 
              size="lg" 
              onClick={() => scrollToSection('menu')}
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground w-full sm:w-auto h-14 text-lg px-8 btn-modern hover-lift"
            >
              <ChefHat size={24} className="mr-3" />
              {t('discoverMenu')}
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => scrollToSection('reservations')}
              className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground w-full sm:w-auto h-14 text-lg px-8 hover-lift"
            >
              <CalendarCheck size={24} className="mr-3" />
              {t('bookTable')}
            </Button>
          </div>
          
          {/* Decorative elements */}
          <div className="flex justify-center gap-6 pt-12 opacity-60">
            <div className="flex items-center gap-2">
              <Star size={20} className="text-accent" weight="fill" />
              <span className="font-body text-sm text-muted-foreground">{t('since2011')}</span>
            </div>
            <div className="w-px h-6 bg-border"></div>
            <div className="flex items-center gap-2">
              <Heart size={20} className="text-primary" weight="fill" />
              <span className="font-body text-sm text-muted-foreground">Den Helder</span>
            </div>
            <div className="w-px h-6 bg-border"></div>
            <div className="flex items-center gap-2">
              <ChefHat size={20} className="text-accent" />
              <span className="font-body text-sm text-muted-foreground">{t('authentic')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Category Navigation Section */}
      <CategoryNavigation 
        language={selectedLanguage}
        onNavigate={scrollToSection}
        activeSection={activeSection}
      />

      {/* Enhanced Menu Section */}
      <section id="menu" className="section-padding bg-gradient-to-b from-background to-secondary/20">
        <div className="container-responsive max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-6">
            <div className="inline-flex items-center gap-3 bg-primary/10 text-primary px-6 py-3 rounded-full">
              <ChefHat size={20} />
              <span className="font-body text-sm font-medium">Menu</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-6xl font-bold text-foreground text-balance">
              {t('ourMenu')}
            </h2>
            <p className="font-body text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
              {t('menuDescription')}
            </p>
          </div>

          {/* Enhanced Category Navigation */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12 p-2">
            {menuCategories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                onClick={() => {
                  setActiveCategory(category.id);
                  setActiveSection(category.id);
                }}
                className={`flex items-center gap-2 md:gap-3 text-xs sm:text-sm md:text-base px-3 sm:px-4 md:px-6 py-2 md:py-3 h-auto hover-lift transition-all duration-300 min-w-0 ${
                  activeCategory === category.id 
                    ? 'bg-gradient-to-r from-primary to-accent text-primary-foreground' 
                    : 'hover:bg-primary/5 hover:border-primary'
                }`}
              >
                <div className="flex items-center justify-center flex-shrink-0">
                  {category.icon}
                </div>
                <span className="font-medium truncate">{t(category.id as TranslationKey)}</span>
              </Button>
            ))}
          </div>

          {/* Enhanced Menu Items Grid */}
          <div id={activeCategory} className="grid gap-4 md:gap-6">
            {menuCategories
              .find(cat => cat.id === activeCategory)
              ?.items.map((item, index) => (
                <Card 
                  key={item.id} 
                  className="card-modern hover-lift animate-slide-up group"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <CardContent className="p-4 md:p-6 lg:p-8">
                    <div className="flex flex-col gap-4">
                      <div className="flex-1 space-y-2 md:space-y-3">
                        <div className="flex flex-col gap-2">
                          <div className="flex items-start justify-between gap-3">
                            <h3 className="font-heading text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-foreground leading-tight group-hover:text-primary transition-colors flex-1 min-w-0">
                              {item.name}
                            </h3>
                            <span className="font-heading text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-primary whitespace-nowrap flex-shrink-0">
                              {item.price}
                            </span>
                          </div>
                          {item.popular && (
                            <Badge className="bg-gradient-to-r from-accent/20 to-primary/20 text-primary border-primary/20 w-fit">
                              <Star size={12} className="mr-1" weight="fill" />
                              <span className="text-xs font-medium">{t('popular')}</span>
                            </Badge>
                          )}
                        </div>
                        <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed">
                          {getItemDescription(item.id)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            }
          </div>

          {/* Add individual sections for each category */}
          {menuCategories.map((category) => (
            <div key={`section-${category.id}`} id={category.id} className="hidden">
              {/* This creates anchor points for direct navigation */}
            </div>
          ))}
        </div>
      </section>

      {/* Enhanced Reservations Section */}
      <section id="reservations" className="section-padding bg-gradient-to-b from-secondary/20 to-background">
        <div className="container-responsive max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-6">
            <div className="inline-flex items-center gap-3 bg-primary/10 text-primary px-6 py-3 rounded-full">
              <CalendarCheck size={20} />
              <span className="font-body text-sm font-medium">{t('reservations')}</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-6xl font-bold text-foreground text-balance">
              {t('makeReservation')}
            </h2>
            <p className="font-body text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
              {t('reservationDescription')}
            </p>
          </div>

          <ReservationSystem language={selectedLanguage} />
        </div>
      </section>

      {/* Enhanced About Section */}
      <section id="about" className="section-padding bg-gradient-to-b from-background to-secondary/20">
        <div className="container-responsive max-w-6xl mx-auto text-center">
          <div className="mb-16 space-y-6">
            <div className="inline-flex items-center gap-3 bg-accent/10 text-accent px-6 py-3 rounded-full">
              <Heart size={20} weight="fill" />
              <span className="font-body text-sm font-medium">{t('ourStory')}</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-6xl font-bold text-foreground text-balance">
              {t('ourStory')}
            </h2>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                icon: <ChefHat size={48} className="text-primary" />,
                title: t('tradition'),
                description: t('traditionDesc')
              },
              {
                icon: <Heart size={48} className="text-accent" weight="fill" />,
                title: t('passion'),
                description: t('passionDesc')
              },
              {
                icon: <Star size={48} className="text-primary" weight="fill" />,
                title: t('quality'),
                description: t('qualityDesc')
              }
            ].map((item, index) => (
              <Card 
                key={index}
                className="card-modern text-center hover-lift animate-slide-up group"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardHeader className="pb-6 pt-8">
                  <div className="mx-auto mb-6 h-20 w-20 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <CardTitle className="font-heading text-xl md:text-2xl text-balance">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-8">
                  <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed text-balance">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Reviews Section with Automated TripAdvisor Integration */}
      <section id="reviews" className="section-padding bg-gradient-to-b from-background to-secondary/20">
        <div className="container-responsive max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-6">
            <div className="inline-flex items-center gap-3 bg-primary/10 text-primary px-6 py-3 rounded-full">
              <ChatCircle size={20} weight="fill" />
              <span className="font-body text-sm font-medium">TripAdvisor</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-6xl font-bold text-foreground text-balance">
              {t('ourReviews')}
            </h2>
            <p className="font-body text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
              {t('reviewsDescription')}
            </p>
          </div>

          {/* Automated TripAdvisor Reviews Component */}
          <TripAdvisorReviews language={selectedLanguage} />
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section id="contact" className="section-padding">
        <div className="container-responsive max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-6">
            <div className="inline-flex items-center gap-3 bg-primary/10 text-primary px-6 py-3 rounded-full">
              <MapPin size={20} />
              <span className="font-body text-sm font-medium">{t('contacts')}</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-6xl font-bold text-foreground text-balance">
              {t('contactTitle')}
            </h2>
            <p className="font-body text-lg md:text-xl text-muted-foreground text-balance">
              {t('contactDescription')}
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <Card className="card-modern hover-lift">
              <CardHeader className="pb-6">
                <CardTitle className="font-heading flex items-center gap-3 text-xl md:text-2xl">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <MapPin size={24} className="text-primary" />
                  </div>
                  {t('whereWeAre')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="font-body text-base md:text-lg text-foreground leading-relaxed">
                  {t('address')}
                </p>
                <Button 
                  onClick={handleDirections}
                  variant="outline"
                  className="w-full h-12 text-base hover-lift hover:bg-primary hover:text-primary-foreground"
                >
                  <MapPin size={20} className="mr-3" />
                  {t('directions')}
                </Button>
              </CardContent>
            </Card>

            <Card className="card-modern hover-lift">
              <CardHeader className="pb-6">
                <CardTitle className="font-heading flex items-center gap-3 text-xl md:text-2xl">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Phone size={24} className="text-primary" />
                  </div>
                  {t('contacts')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {/* Phone Numbers Section */}
                  <div className="space-y-3">
                    {t('phone').split(' / ').map((phone, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-secondary/30">
                        <div className="flex items-center gap-3">
                          <Phone size={20} className="text-primary" />
                          <span className="font-body text-base md:text-lg text-foreground">{phone}</span>
                        </div>
                        <Button 
                          size="sm"
                          onClick={() => handleCall(phone)}
                          className="bg-primary hover:bg-primary/90 text-primary-foreground"
                        >
                          <Phone size={16} className="mr-1" />
                          {t('call')}
                        </Button>
                      </div>
                    ))}
                  </div>
                  
                  {/* Email Section */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-secondary/30">
                    <div className="flex items-center gap-3">
                      <EnvelopeSimple size={20} className="text-primary" />
                      <span className="font-body text-base md:text-lg text-foreground">{t('email')}</span>
                    </div>
                    <Button 
                      size="sm"
                      onClick={() => window.open(`mailto:${t('email')}`, '_self')}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      <EnvelopeSimple size={16} className="mr-1" />
                      Email
                    </Button>
                  </div>
                  
                  {/* Detailed Hours Section */}
                  <div className="p-4 rounded-xl bg-secondary/30 space-y-4">
                    <div className="flex items-center gap-3">
                      <Clock size={20} className="text-primary" />
                      <span className="font-heading text-base font-semibold text-foreground">{t('openingHours')}</span>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-2 text-sm">
                      {[
                        { day: t('monday'), hours: t('restaurantHours'), delivery: t('deliverySchedule') },
                        { day: t('tuesday'), hours: t('restaurantHours'), delivery: t('deliverySchedule') },
                        { day: t('wednesday'), hours: t('closed'), delivery: t('closed') },
                        { day: t('thursday'), hours: t('restaurantHours'), delivery: t('deliverySchedule') },
                        { day: t('friday'), hours: t('restaurantHours'), delivery: t('deliverySchedule') },
                        { day: t('saturday'), hours: t('restaurantHours'), delivery: t('deliverySchedule') },
                        { day: t('sunday'), hours: t('restaurantHours'), delivery: t('deliverySchedule') }
                      ].map((dayInfo, index) => (
                        <div key={index} className="flex justify-between items-center py-1">
                          <span className="font-medium text-foreground">{dayInfo.day}:</span>
                          <div className="flex flex-col text-right">
                            <span className={`text-sm ${dayInfo.hours === t('closed') ? 'text-destructive' : 'text-muted-foreground'}`}>
                              {dayInfo.hours}
                            </span>
                            {dayInfo.hours !== t('closed') && (
                              <span className="text-xs text-muted-foreground">
                                {t('deliveryTimes')}: {dayInfo.delivery}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <Button 
                  onClick={() => handleCall()}
                  className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 h-12 text-base btn-modern"
                >
                  <Phone size={20} className="mr-3" />
                  {t('callToBook')}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-t from-secondary to-secondary/50 section-padding border-t border-border/50">
        <div className="container-responsive max-w-6xl mx-auto">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <ChefHat size={32} className="text-primary-foreground" weight="bold" />
                </div>
              </div>
              <h3 className="font-heading text-2xl md:text-4xl font-bold text-gradient">
                {t('restaurantName')}
              </h3>
              <p className="font-body text-base md:text-lg text-muted-foreground max-w-md mx-auto text-balance">
                {t('tagline')}
              </p>
            </div>
            
            <div className="flex justify-center gap-4">
              <Button 
                variant="outline" 
                size="icon" 
                className="h-12 w-12 rounded-xl hover-lift bg-background/50 border-border/50"
              >
                <InstagramLogo size={20} />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="h-12 w-12 rounded-xl hover-lift bg-background/50 border-border/50"
              >
                <FacebookLogo size={20} />
              </Button>
            </div>
            
            <Separator className="my-8" />
            
            <div className="space-y-2">
              <p className="font-body text-sm md:text-base text-muted-foreground">
                © 2024 {t('restaurantName')}. {t('allRightsReserved')}
              </p>
              <p className="font-body text-xs text-muted-foreground/70">
                {t('madeWithLove')}
              </p>
            </div>
            
            {/* Important notices */}
            <div className="mt-8 pt-8 border-t border-border/50">
              <div className="space-y-6 text-left max-w-4xl mx-auto">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-accent/20 flex items-center justify-center">
                      <span className="text-xs">🥜</span>
                    </div>
                    <h4 className="font-heading text-sm font-semibold text-foreground">{t('allergyTitle' as TranslationKey)}</h4>
                  </div>
                  <p className="font-body text-xs leading-relaxed text-muted-foreground">
                    {t('allergyNotice' as TranslationKey)}
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-xs">🚚</span>
                    </div>
                    <h4 className="font-heading text-sm font-semibold text-foreground">{t('deliveryTitle' as TranslationKey)}</h4>
                  </div>
                  <p className="font-body text-xs leading-relaxed text-muted-foreground">
                    {t('deliveryInfo' as TranslationKey)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;