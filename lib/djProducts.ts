export type DJCategory =
  | 'disinfectants-sanitisers'
  | 'floor-carpet'
  | 'washroom-toilet'
  | 'catering-glasswash'
  | 'animal-care'
  | 'hand-care'
  | 'drain-care'
  | 'odour-control'
  | 'glass-windows'
  | 'multi-purpose'
  | 'beer-cellar';

export interface DJProduct {
  id: string;
  name: string;
  subtitle: string;
  category: DJCategory;
  inStock: boolean;
  featured?: boolean;
}

export const DJ_CATEGORIES: { slug: DJCategory; label: string; colour: string; border: string }[] = [
  { slug: 'disinfectants-sanitisers', label: 'Disinfectants & Sanitisers', colour: 'text-blue-800',   border: 'border-l-blue-700' },
  { slug: 'floor-carpet',            label: 'Floor & Carpet Care',        colour: 'text-teal-800',   border: 'border-l-teal-600' },
  { slug: 'washroom-toilet',         label: 'Washroom & Toilet',          colour: 'text-violet-800', border: 'border-l-violet-600' },
  { slug: 'catering-glasswash',      label: 'Catering & Glasswash',       colour: 'text-amber-800',  border: 'border-l-amber-600' },
  { slug: 'animal-care',             label: 'Animal Care',                colour: 'text-green-800',  border: 'border-l-green-600' },
  { slug: 'hand-care',               label: 'Hand Care',                  colour: 'text-rose-800',   border: 'border-l-rose-600' },
  { slug: 'drain-care',              label: 'Drain Care',                 colour: 'text-slate-700',  border: 'border-l-slate-500' },
  { slug: 'odour-control',           label: 'Odour Control',              colour: 'text-indigo-800', border: 'border-l-indigo-600' },
  { slug: 'glass-windows',           label: 'Glass & Windows',            colour: 'text-sky-800',    border: 'border-l-sky-500' },
  { slug: 'multi-purpose',           label: 'Multi-Purpose',              colour: 'text-gray-700',   border: 'border-l-gray-500' },
  { slug: 'beer-cellar',             label: 'Beer & Cellar',              colour: 'text-yellow-800', border: 'border-l-yellow-600' },
];

export const djProducts: DJProduct[] = [
  { id: 'aroma-lemon',        name: 'Aroma Lemon',        subtitle: 'Lemon Fragranced Floor Gel',                                    category: 'floor-carpet',            inStock: true },
  { id: 'aroma-pine',         name: 'Aroma Pine',         subtitle: 'Pine Fragranced Floor Gel',                                     category: 'floor-carpet',            inStock: true },
  { id: 'aura-xtra',          name: 'Aura Xtra',          subtitle: 'Deodouriser Concentrate',                                       category: 'odour-control',           inStock: true },
  { id: 'biogen',             name: 'Biogen',             subtitle: 'Virucidal Disinfectant',                                        category: 'disinfectants-sanitisers', inStock: true, featured: true },
  { id: 'channel-blocks',     name: 'Channel Blocks',     subtitle: 'Fragranced Deodourising Toilet Blocks',                         category: 'washroom-toilet',         inStock: true },
  { id: 'chloricide',         name: 'Chloricide',         subtitle: 'Effervescent Chlorine Generating Sanitiser Tablets',            category: 'disinfectants-sanitisers', inStock: true, featured: true },
  { id: 'chloricide-plus',    name: 'Chloricide Plus',    subtitle: 'Chlorine Generating Sanitiser Tablets with Detergent',          category: 'disinfectants-sanitisers', inStock: true, featured: true },
  { id: 'chlorine-bleach',    name: 'Chlorine Bleach',    subtitle: 'Chlorine Active Hypochlorite (5% Solution)',                    category: 'disinfectants-sanitisers', inStock: true },
  { id: 'd-light',            name: 'D-Light',            subtitle: 'Glass, Window, and Mirror Cleaner',                             category: 'glass-windows',           inStock: true },
  { id: 'dazzle',             name: 'Dazzle',             subtitle: 'Detergent for Enclosed Glass Wash Machines',                    category: 'catering-glasswash',      inStock: true },
  { id: 'dazzle-plus',        name: 'Dazzle Plus',        subtitle: 'Detergent for Enclosed Glass Wash Machines with Renovate',      category: 'catering-glasswash',      inStock: true },
  { id: 'deep-blue',          name: 'Deep Blue',          subtitle: 'Perfumed Cleaner, Sanitiser, and Descaler',                     category: 'washroom-toilet',         inStock: true },
  { id: 'deluxe',             name: 'Deluxe',             subtitle: 'Luxury White Hand Soap with Moisturiser',                       category: 'hand-care',               inStock: true },
  { id: 'duo-plus',           name: 'Duo Plus',           subtitle: 'Heavy Duty Degreaser & Sanitiser',                              category: 'multi-purpose',           inStock: true },
  { id: 'efface-apple',       name: 'Efface Apple',       subtitle: 'Boarding Kennel Sanitiser – Apple',                             category: 'animal-care',             inStock: true },
  { id: 'efface-lemon',       name: 'Efface Lemon',       subtitle: 'Boarding Kennel Sanitiser – Lemon',                             category: 'animal-care',             inStock: true },
  { id: 'elite',              name: 'Elite',              subtitle: 'Concentrated Carpet and Upholstery Shampoo for Extraction Machines', category: 'floor-carpet',       inStock: true },
  { id: 'enhance',            name: 'Enhance',            subtitle: 'Perfumed and Concentrated Cleaner, Polish, and Maintainer',     category: 'floor-carpet',            inStock: true },
  { id: 'express-pro',        name: 'Express Pro',        subtitle: 'Powerful Beerline Cleaner',                                     category: 'beer-cellar',             inStock: true },
  { id: 'lustre',             name: 'Lustre',             subtitle: 'Rinse Aid',                                                     category: 'catering-glasswash',      inStock: true },
  { id: 'magic-wild-berry',   name: 'Magic – Wild Berry', subtitle: 'Highly Concentrated Odour Neutraliser – Wild Berries Fragrance', category: 'odour-control',          inStock: true },
  { id: 'magma-plus',         name: 'Magma Plus',         subtitle: 'Heavy Duty Drain Degreaser and Emulsifier',                     category: 'drain-care',              inStock: true },
  { id: 'magnum-plus',        name: 'Magnum Plus',        subtitle: 'Automatic Dishwash Detergent with Chlorine',                    category: 'catering-glasswash',      inStock: true },
  { id: 'magnum',             name: 'Magnum',             subtitle: 'Automatic Dishwash Detergent',                                  category: 'catering-glasswash',      inStock: true },
  { id: 'refillable-wipes',   name: 'Refillable Wipes',   subtitle: 'Plastic Free Refillable Wipe Pack',                             category: 'multi-purpose',           inStock: true },
  { id: 'urinal-mat',         name: 'Urinal Mat',         subtitle: 'Urinal Screen Deodoriser Mat',                                  category: 'washroom-toilet',         inStock: true },
  { id: 'majestic',           name: 'Majestic',           subtitle: 'Moisturising Barrier Cream for Wet and Dry Conditions',         category: 'hand-care',               inStock: true },
  { id: 'maximus',            name: 'Maximus',            subtitle: 'Citrus Based Multi-Purpose Cleaner',                            category: 'multi-purpose',           inStock: true },
  { id: 'natural',            name: 'Natural',            subtitle: 'Bactericidal Washing Up Liquid',                                category: 'catering-glasswash',      inStock: true },
  { id: 'optic-cleaner',      name: 'Optic Cleaner',      subtitle: 'Concentrated Spirit Dispenser Cleaner',                        category: 'beer-cellar',             inStock: true },
  { id: 'peracide',           name: 'Peracide',           subtitle: 'In Situ Peracetic Acid (ISPAA) Based Disinfectant and Cleaner', category: 'disinfectants-sanitisers', inStock: true, featured: true },
  { id: 'drain-disinfectant', name: 'Drain Disinfectant', subtitle: 'Peracide Drain Disinfectant – Removes Odours at the Source',   category: 'drain-care',              inStock: true },
  { id: 'progen',             name: 'Progen',             subtitle: 'Multi-Purpose Disinfectant Detergent',                         category: 'disinfectants-sanitisers', inStock: true },
  { id: 'rainbow',            name: 'Rainbow',            subtitle: 'Coloured Beer Line Cleaner',                                    category: 'beer-cellar',             inStock: true },
  { id: 'rapid',              name: 'Rapid',              subtitle: 'Drain Cleaner',                                                 category: 'drain-care',              inStock: true },
  { id: 'remedy',             name: 'Remedy',             subtitle: 'Heavy Duty Multi-Purpose Cleaner and Degreaser',                category: 'multi-purpose',           inStock: true },
  { id: 'renovate',           name: 'Renovate',           subtitle: 'Glass Restorer and Machine Sanitiser',                         category: 'catering-glasswash',      inStock: true },
  { id: 'restore',            name: 'Restore',            subtitle: 'Spot and Stain Remover for Carpets and Upholstery',             category: 'floor-carpet',            inStock: true },
  { id: 'rub-and-scrub',      name: 'Rub and Scrub',      subtitle: 'Animal Shampoo',                                               category: 'animal-care',             inStock: true },
  { id: 'saffron',            name: 'Saffron',            subtitle: 'Hand and Body Wash, and Hair Shampoo',                         category: 'hand-care',               inStock: true },
  { id: 'spotless',           name: 'Spotless',           subtitle: 'Concentrated Cleaner Sanitiser',                               category: 'disinfectants-sanitisers', inStock: true },
  { id: 'storm',              name: 'Storm',              subtitle: 'Drain Cleaner',                                                 category: 'drain-care',              inStock: true },
  { id: 'supreme',            name: 'Supreme',            subtitle: 'Automatic Glass and Dish Washer Descaler',                     category: 'catering-glasswash',      inStock: true },
  { id: 'supreme-tablets',    name: 'Supreme Tablets',    subtitle: 'Tablets for Descaling',                                        category: 'catering-glasswash',      inStock: false },
  { id: 'swift',              name: 'Swift',              subtitle: 'Toilet Cleaner and Descaler for Hard Water Areas',              category: 'washroom-toilet',         inStock: true },
  { id: 'topaz',              name: 'Topaz',              subtitle: 'Oven Cleaner',                                                  category: 'catering-glasswash',      inStock: true },
  { id: 'utopia',             name: 'Utopia',             subtitle: 'Unperfumed Bactericidal Handwash',                              category: 'hand-care',               inStock: true },
  { id: 'zircon',             name: 'Zircon',             subtitle: 'Alcohol Hand Sanitiser',                                       category: 'hand-care',               inStock: true },
];
