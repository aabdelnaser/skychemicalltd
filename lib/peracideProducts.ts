export interface PeracideProduct {
  id: string;
  name: string;
  format: string;
  description: string;
  applications: string[];
  featured?: boolean;
}

export interface PeracideDocument {
  id: string;
  title: string;
  type: 'SDS' | 'TDS' | 'Certificate' | 'Test Report' | 'Guide' | 'Approval';
  description: string;
  fileSize: string;
  updatedAt: string;
}

export const peracideProducts: PeracideProduct[] = [
  {
    id: 'per-3g-box',
    name: 'Peracide 3g Tablets',
    format: 'Box',
    description: 'ISPAA-based effervescent tablets delivering a precise, measured dose of peracetic acid. Proven efficacy against bacteria, viruses, fungi, spores and biofilm. Ideal for surface disinfection and decontamination across regulated environments.',
    applications: ['Healthcare', 'Veterinary', 'Food Processing', 'Public Health'],
    featured: true,
  },
  {
    id: 'per-3g-tub',
    name: 'Peracide 3g Tablets',
    format: 'Tub',
    description: 'ISPAA-based effervescent tablets in a resealable tub format. Delivers a precise dose of peracetic acid with broad-spectrum antimicrobial activity.',
    applications: ['Healthcare', 'Veterinary', 'Food Processing', 'Public Health'],
  },
  {
    id: 'per-3g-tube',
    name: 'Peracide 3g Tablets',
    format: 'Tube',
    description: 'Portable tube format of Peracide 3g effervescent tablets. Convenient for point-of-use disinfection in clinical and field settings.',
    applications: ['Healthcare', 'Field Operations', 'Emergency Response'],
  },
  {
    id: 'per-6g-box',
    name: 'Peracide 6g Tablets',
    format: 'Box',
    description: 'Higher-strength 6g tablets for demanding disinfection applications. DEFRA-approved for use under General and Poultry Disease Orders. Proven against a broad spectrum of livestock and agricultural pathogens.',
    applications: ['Agriculture', 'Poultry', 'Livestock', 'Biosecurity'],
    featured: true,
  },
  {
    id: 'per-6g-tub',
    name: 'Peracide 6g Tablets',
    format: 'Tub',
    description: 'DEFRA-approved 6g tablets in a durable resealable tub. High-strength formulation for large-scale biosecurity programmes.',
    applications: ['Agriculture', 'Poultry', 'Livestock', 'Biosecurity'],
  },
  {
    id: 'per-dil-500',
    name: 'Peracide 500ml Dilution Bottle',
    format: '500ml Dilution Bottle',
    description: 'Pre-calibrated 500ml dilution bottle engineered for accurate Peracide solution preparation. Graduated markings ensure correct concentration and eliminate dosing error in clinical and regulated environments.',
    applications: ['Hospitals', 'Clinics', 'Care Homes', 'Laboratories'],
  },
  {
    id: 'per-drain-3in1',
    name: '3-in-1 Drain Disinfectant',
    format: 'Liquid',
    description: 'Single-product solution combining drain cleaning, deodourising and peracetic acid disinfection. Eliminates biofilm and malodour from drain channels. Safe for all drain materials including stainless steel and PVC.',
    applications: ['Hospitality', 'Food Production', 'Healthcare', 'Drain Maintenance'],
  },
  {
    id: 'per-gran',
    name: 'Peracide Granules',
    format: 'Granules',
    description: 'Free-flowing granule format for wide-area decontamination. Dissolves rapidly in water to produce a controlled peracetic acid solution. Particularly suited to large floor areas and outdoor applications.',
    applications: ['Farming', 'Animal Housing', 'Large Area Treatment', 'Biosecurity'],
  },
  {
    id: 'per-gran-box',
    name: 'Peracide Granules',
    format: 'Box',
    description: 'Bulk box format of Peracide granules for high-volume or contracted decontamination operations.',
    applications: ['Farming', 'Biosecurity', 'Contract Disinfection'],
  },
  {
    id: 'per-wipe',
    name: 'Peracide Commode Wipe',
    format: 'Wipes',
    description: 'Ready-to-use peracetic acid impregnated wipes for the safe disinfection of commodes, sanitary equipment and patient-contact surfaces. Colour-coded to support infection prevention protocols.',
    applications: ['Care Homes', 'NHS', 'Disability Services', 'Community Care'],
  },
  {
    id: 'per-wipe-ref',
    name: 'Peracide Commode Wipe Refill',
    format: 'Refill Pack',
    description: 'Economical refill pack for Peracide Commode Wipe dispensers. Reduces plastic waste while maintaining full peracetic acid efficacy.',
    applications: ['Care Homes', 'NHS', 'Disability Services'],
  },
  {
    id: 'per-start',
    name: 'Peracide Starter Pack',
    format: 'Kit',
    description: 'Complete introduction kit including Peracide tablets, a calibrated dilution bottle, and a comprehensive usage and dilution rate guide. The ideal entry point for organisations trialling the Peracide range.',
    applications: ['Healthcare', 'Food Production', 'Veterinary', 'New Accounts'],
    featured: true,
  },
  {
    id: 'per-5l',
    name: 'Peracide 5L Jerrycan',
    format: '5 Litre Jerrycan',
    description: 'Five litre liquid Peracide concentrate for high-volume users and facilities with continuous disinfection requirements. Suitable for fogging systems, mop application and manual surface treatment.',
    applications: ['Agriculture', 'Large Facilities', 'Industrial', 'Veterinary', 'Contract Cleaning'],
  },
];

export const peracideDocuments: PeracideDocument[] = [
  {
    id: 'sds',
    title: 'Safety Data Sheet (SDS)',
    type: 'SDS',
    description: 'Full GHS-compliant Safety Data Sheet covering all Peracide tablet and liquid formats. Includes hazard classification, first aid, storage and disposal information.',
    fileSize: '420 KB',
    updatedAt: 'Mar 2025',
  },
  {
    id: 'tds',
    title: 'Technical Data Sheet',
    type: 'TDS',
    description: 'Detailed product specifications including dilution rates, contact times, efficacy data and compatibility guidance for all Peracide formats.',
    fileSize: '285 KB',
    updatedAt: 'Mar 2025',
  },
  {
    id: 'en14476',
    title: 'EN14476 Virucidal Efficacy Report',
    type: 'Test Report',
    description: 'Third-party laboratory report confirming virucidal efficacy to EN14476:2013+A2:2019, including activity against SARS-CoV-2, Norovirus and Adenovirus.',
    fileSize: '1.1 MB',
    updatedAt: 'Feb 2024',
  },
  {
    id: 'en1276',
    title: 'EN1276 Bactericidal Efficacy Report',
    type: 'Test Report',
    description: 'Quantitative suspension test results to EN1276 confirming broad-spectrum bactericidal activity under dirty conditions.',
    fileSize: '890 KB',
    updatedAt: 'Feb 2024',
  },
  {
    id: 'defra',
    title: 'DEFRA Approval Certificate',
    type: 'Approval',
    description: 'DEFRA Approved Disinfectant certificate authorising use of Peracide under the Foot and Mouth Disease Order, General Diseases Order and Poultry Disease Order.',
    fileSize: '210 KB',
    updatedAt: 'Jan 2025',
  },
  {
    id: 'astm',
    title: 'ASTM E2315 Biofilm Efficacy Report',
    type: 'Test Report',
    description: 'American Standard test results confirming Peracide efficacy against biofilm-forming bacteria including Pseudomonas aeruginosa and Staphylococcus aureus.',
    fileSize: '740 KB',
    updatedAt: 'Nov 2024',
  },
  {
    id: 'gmp',
    title: 'GMP Certificate',
    type: 'Certificate',
    description: 'Good Manufacturing Practice certificate covering Peracide production processes, quality management and batch traceability.',
    fileSize: '195 KB',
    updatedAt: 'Apr 2025',
  },
  {
    id: 'guide',
    title: 'Dilution Rate & Application Guide',
    type: 'Guide',
    description: 'Step-by-step guidance on correct dilution rates, contact times and application methods across healthcare, agricultural, food production and veterinary sectors.',
    fileSize: '340 KB',
    updatedAt: 'Mar 2025',
  },
];
