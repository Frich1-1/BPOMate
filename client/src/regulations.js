// ============================================================
// BPOMate — BPOM Regulatory Database
// Version 1.0.0 | Based on BPOM PerKa & SNI Standards
// Authority: Badan Pengawas Obat dan Makanan (BPOM RI)
// ============================================================

const BPOM_DB = {
  version: '1.0.0',
  lastUpdated: '2024-01-15',
  authority: 'Badan Pengawas Obat dan Makanan (BPOM RI)',

  categories: [
    {
      id: 'confectionery',
      name: 'Confectionery & Bakery Products',
      description: 'Biscuits, cookies, cakes, candy, chocolate, wafers, and related sweet baked/confectionery goods',
      icon: 'cookie',
      color: '#F59E0B',
      colorLight: 'rgba(245,158,11,0.12)',
      active: true,
      keywords: {
        high: ['biscuit', 'cookie', 'chocolate', 'candy', 'cake', 'wafer', 'pastry', 'confection', 'confectionery', 'brownie', 'muffin', 'donut', 'doughnut', 'macaron', 'tart', 'pie', 'praline', 'truffle', 'nougat', 'caramel', 'fudge', 'bonbon'],
        medium: ['baked', 'cream filling', 'cocoa', 'flour', 'wheat', 'vanilla', 'glazed', 'coated', 'filled', 'crust', 'icing', 'frosting', 'ganache', 'meringue', 'shortbread'],
        low: ['crunchy', 'crispy', 'chewy', 'sweet', 'dessert', 'treat', 'snack bar', 'energy bar']
      },
      regulations: [
        { code: 'SNI 2973:2011', title: 'Biskuit — Syarat Mutu dan Cara Uji' },
        { code: 'PerKa BPOM No. 16/2016', title: 'Kriteria Mikrbiologi dalam Pangan Olahan' },
        { code: 'PerKa BPOM No. 5/2018', title: 'Batas Maksimum Cemaran Logam Berat dalam Pangan Olahan' },
        { code: 'PerKa BPOM No. 11/2019', title: 'Bahan Tambahan Pangan Perisa' }
      ],
      parameters: [
        { name: 'Moisture Content', unit: '% (max)', limit: '5.0', method: 'SNI 01-2891-1992 / Gravimetric', type: 'mandatory', group: 'Physical-Chemical' },
        { name: 'Ash Content', unit: '% (max)', limit: '2.0', method: 'SNI 01-2891-1992 / Gravimetric', type: 'mandatory', group: 'Physical-Chemical' },
        { name: 'Total Fat', unit: '% (max)', limit: '30.0', method: 'Soxhlet Extraction', type: 'mandatory', group: 'Nutritional' },
        { name: 'Total Sugar (as sucrose)', unit: '% (max)', limit: '40.0', method: 'AOAC 920.183', type: 'mandatory', group: 'Nutritional' },
        { name: 'Protein Content', unit: '% (min)', limit: '5.0', method: 'Kjeldahl Method', type: 'mandatory', group: 'Nutritional' },
        { name: 'Sodium', unit: 'mg/100g', limit: 'Report', method: 'AAS / Flame Photometry', type: 'mandatory', group: 'Nutritional' },
        { name: 'Energy (calculated)', unit: 'kcal/100g', limit: 'Report', method: 'Calculation per BPOM', type: 'mandatory', group: 'Nutritional' },
        { name: 'Lead (Pb)', unit: 'mg/kg (max)', limit: '0.50', method: 'AAS / ICP-MS', type: 'mandatory', group: 'Heavy Metals' },
        { name: 'Cadmium (Cd)', unit: 'mg/kg (max)', limit: '0.10', method: 'AAS / ICP-MS', type: 'mandatory', group: 'Heavy Metals' },
        { name: 'Arsenic (As)', unit: 'mg/kg (max)', limit: '0.50', method: 'AAS / ICP-MS', type: 'mandatory', group: 'Heavy Metals' },
        { name: 'Mercury (Hg)', unit: 'mg/kg (max)', limit: '0.03', method: 'AAS / Cold Vapor', type: 'mandatory', group: 'Heavy Metals' },
        { name: 'Total Plate Count (TPC)', unit: 'CFU/g (max)', limit: '1×10⁴', method: 'SNI 2897:2008 pour plate', type: 'mandatory', group: 'Microbiological' },
        { name: 'Coliform', unit: 'APM/g (max)', limit: '10', method: 'MPN / SNI 2897:2008', type: 'mandatory', group: 'Microbiological' },
        { name: 'Salmonella sp.', unit: 'per 25g', limit: 'Negative', method: 'ISO 6579 / SNI 2897:2008', type: 'mandatory', group: 'Microbiological' },
        { name: 'Staphylococcus aureus', unit: 'CFU/g (max)', limit: '1×10²', method: 'SNI 2897:2008', type: 'mandatory', group: 'Microbiological' },
        { name: 'Mold & Yeast', unit: 'CFU/g (max)', limit: '50', method: 'SNI 2897:2008', type: 'mandatory', group: 'Microbiological' },
        { name: 'Artificial Colorants', unit: '—', limit: 'Permitted types per PerKa', method: 'TLC / HPLC', type: 'conditional', group: 'Additives' },
        { name: 'Preservatives (Benzoate/Sorbate)', unit: 'mg/kg', limit: 'Per PerKa additive limit', method: 'HPLC', type: 'conditional', group: 'Additives' },
        { name: 'Artificial Sweeteners', unit: 'mg/kg', limit: 'Per PerKa additive limit', method: 'HPLC', type: 'conditional', group: 'Additives' }
      ]
    },

    {
      id: 'dairy',
      name: 'Dairy Products',
      description: 'Milk, cheese, yogurt, butter, ice cream, whey, and dairy-derived processed products',
      icon: 'milk',
      color: '#60A5FA',
      colorLight: 'rgba(96,165,250,0.12)',
      active: true,
      keywords: {
        high: ['milk', 'dairy', 'cheese', 'yogurt', 'yoghurt', 'butter', 'cream', 'whey', 'lactose', 'ice cream', 'kefir', 'skyr'],
        medium: ['pasteurized', 'uht', 'ultra high temperature', 'full cream', 'skim', 'low fat', 'fresh milk', 'processed milk', 'curd', 'fermented milk', 'cultured'],
        low: ['calcium', 'milky', 'lactic', 'bovine', 'casein', 'creamery']
      },
      regulations: [
        { code: 'SNI 3141.1:2011', title: 'Susu Segar — Syarat Mutu' },
        { code: 'SNI 01-3950:2014', title: 'Susu UHT (Ultra High Temperature)' },
        { code: 'PerKa BPOM No. 21/2016', title: 'Kategori Pangan — Produk Susu dan Analognya' },
        { code: 'PerKa BPOM No. 5/2018', title: 'Batas Maksimum Cemaran Logam Berat' }
      ],
      parameters: [
        { name: 'Fat Content', unit: '% (min)', limit: '3.0', method: 'Gerber / Babcock Method', type: 'mandatory', group: 'Physical-Chemical' },
        { name: 'Protein Content', unit: '% (min)', limit: '2.8', method: 'Kjeldahl Method', type: 'mandatory', group: 'Nutritional' },
        { name: 'Total Solids', unit: '% (min)', limit: '11.5', method: 'Gravimetric', type: 'mandatory', group: 'Physical-Chemical' },
        { name: 'Non-Fat Solids', unit: '% (min)', limit: '8.0', method: 'Calculation', type: 'mandatory', group: 'Physical-Chemical' },
        { name: 'Density', unit: 'g/mL (min)', limit: '1.0270', method: 'Lactodensimeter', type: 'mandatory', group: 'Physical-Chemical' },
        { name: 'Titratable Acidity', unit: '° SH or % LA', limit: '6.0–7.5 °SH', method: 'Titrimetric', type: 'mandatory', group: 'Physical-Chemical' },
        { name: 'pH', unit: '—', limit: '6.3–6.8', method: 'pH Meter', type: 'mandatory', group: 'Physical-Chemical' },
        { name: 'Antibiotic Residue', unit: '—', limit: 'Negative', method: 'Rapid Screening / HPLC', type: 'mandatory', group: 'Contaminants & Residues' },
        { name: 'Aflatoxin M1', unit: 'μg/kg (max)', limit: '0.5', method: 'ELISA / HPLC-FLD', type: 'mandatory', group: 'Contaminants & Residues' },
        { name: 'Lead (Pb)', unit: 'mg/kg (max)', limit: '0.02', method: 'AAS / ICP-MS', type: 'mandatory', group: 'Heavy Metals' },
        { name: 'Cadmium (Cd)', unit: 'mg/kg (max)', limit: '0.01', method: 'AAS / ICP-MS', type: 'mandatory', group: 'Heavy Metals' },
        { name: 'Mercury (Hg)', unit: 'mg/kg (max)', limit: '0.01', method: 'AAS / Cold Vapor', type: 'mandatory', group: 'Heavy Metals' },
        { name: 'Total Plate Count (TPC)', unit: 'CFU/mL (max)', limit: '3×10⁴', method: 'SNI 2897:2008 pour plate', type: 'mandatory', group: 'Microbiological' },
        { name: 'Coliform', unit: 'APM/mL (max)', limit: '10', method: 'MPN Method', type: 'mandatory', group: 'Microbiological' },
        { name: 'E. coli', unit: 'APM/mL (max)', limit: '< 3', method: 'MPN / Confirmatory', type: 'mandatory', group: 'Microbiological' },
        { name: 'Salmonella sp.', unit: 'per 25 mL', limit: 'Negative', method: 'ISO 6579 / SNI 2897:2008', type: 'mandatory', group: 'Microbiological' },
        { name: 'Listeria monocytogenes', unit: 'per 25 mL', limit: 'Negative', method: 'ISO 11290-1', type: 'mandatory', group: 'Microbiological' },
        { name: 'Staphylococcus aureus', unit: 'CFU/mL (max)', limit: '1×10²', method: 'SNI 2897:2008', type: 'conditional', group: 'Microbiological' }
      ]
    },

    {
      id: 'beverages',
      name: 'Non-Alcoholic Beverages',
      description: 'Fruit juices, tea, coffee, energy drinks, carbonated drinks, syrup, and mineral water',
      icon: 'cup-soda',
      color: '#34D399',
      colorLight: 'rgba(52,211,153,0.12)',
      active: true,
      keywords: {
        high: ['juice', 'drink', 'beverage', 'tea', 'coffee', 'water', 'syrup', 'soda', 'energy drink', 'isotonic', 'nectar', 'squash'],
        medium: ['carbonated', 'still', 'sparkling', 'concentrate', 'infused', 'flavored water', 'bottled', 'packaged drink', 'rtd', 'ready-to-drink', 'sport drink'],
        low: ['refreshing', 'liquid', 'cold brew', 'iced', 'hot drink', 'herbal tea', 'kombucha']
      },
      regulations: [
        { code: 'SNI 01-3719-1995', title: 'Minuman Sari Buah (Nectar/Fruit Drink)' },
        { code: 'PerKa BPOM No. 14/2014', title: 'Batas Maksimum BTP pada Minuman' },
        { code: 'SNI 01-3554:2006', title: 'Air Minum Dalam Kemasan (AMDK)' },
        { code: 'PerKa BPOM No. 16/2016', title: 'Kriteria Mikrobiologi dalam Pangan Olahan' }
      ],
      parameters: [
        { name: 'Total Dissolved Solids (Brix)', unit: '°Brix', limit: 'Report', method: 'Refractometer', type: 'mandatory', group: 'Physical-Chemical' },
        { name: 'pH', unit: '—', limit: 'Report', method: 'pH Meter', type: 'mandatory', group: 'Physical-Chemical' },
        { name: 'Total Sugar', unit: 'g/100 mL', limit: 'Report', method: 'AOAC Refractometric / Lane-Eynon', type: 'mandatory', group: 'Nutritional' },
        { name: 'Vitamin C (if fortified)', unit: 'mg/100 mL', limit: 'Report vs label', method: 'Titrimetric / HPLC', type: 'conditional', group: 'Nutritional' },
        { name: 'Benzoic Acid', unit: 'mg/kg (max)', limit: '600', method: 'HPLC', type: 'mandatory', group: 'Additives' },
        { name: 'Sorbic Acid', unit: 'mg/kg (max)', limit: '1,000', method: 'HPLC', type: 'conditional', group: 'Additives' },
        { name: 'Artificial Sweeteners', unit: 'mg/kg', limit: 'Per PerKa limit', method: 'HPLC', type: 'conditional', group: 'Additives' },
        { name: 'Artificial Colorants', unit: '—', limit: 'Permitted types only', method: 'TLC / HPLC', type: 'conditional', group: 'Additives' },
        { name: 'Lead (Pb)', unit: 'mg/L (max)', limit: '0.10', method: 'AAS / ICP-MS', type: 'mandatory', group: 'Heavy Metals' },
        { name: 'Cadmium (Cd)', unit: 'mg/L (max)', limit: '0.01', method: 'AAS / ICP-MS', type: 'mandatory', group: 'Heavy Metals' },
        { name: 'Arsenic (As)', unit: 'mg/L (max)', limit: '0.20', method: 'AAS / ICP-MS', type: 'mandatory', group: 'Heavy Metals' },
        { name: 'Mercury (Hg)', unit: 'mg/L (max)', limit: '0.001', method: 'AAS / Cold Vapor', type: 'mandatory', group: 'Heavy Metals' },
        { name: 'Total Plate Count (TPC)', unit: 'CFU/mL (max)', limit: '1×10²', method: 'SNI 2897:2008', type: 'mandatory', group: 'Microbiological' },
        { name: 'Coliform', unit: 'APM/mL (max)', limit: '< 3', method: 'MPN Method', type: 'mandatory', group: 'Microbiological' },
        { name: 'E. coli', unit: 'per 100 mL', limit: 'Negative', method: 'MPN Confirmatory', type: 'mandatory', group: 'Microbiological' },
        { name: 'Yeast & Mold', unit: 'CFU/mL (max)', limit: '50', method: 'SNI 2897:2008', type: 'mandatory', group: 'Microbiological' },
        { name: 'Salmonella sp.', unit: 'per 25 mL', limit: 'Negative', method: 'ISO 6579', type: 'mandatory', group: 'Microbiological' }
      ]
    },

    {
      id: 'snack_foods',
      name: 'Snack Foods',
      description: 'Potato chips, corn snacks, crackers, extruded snacks, popcorn, and similar savory fried/baked snacks',
      icon: 'zap',
      color: '#FB923C',
      colorLight: 'rgba(251,146,60,0.12)',
      active: true,
      keywords: {
        high: ['chips', 'crackers', 'snack', 'popcorn', 'pretzels', 'puffed', 'extruded snack', 'kerupuk', 'corn snack'],
        medium: ['fried', 'baked snack', 'roasted', 'potato', 'corn', 'cassava', 'rice cracker', 'seasoned', 'pork rind', 'pellet'],
        low: ['crunchy', 'crispy', 'salty', 'savory snack', 'salted', 'party snack']
      },
      regulations: [
        { code: 'SNI 01-4232-1996', title: 'Keripik Kentang — Syarat Mutu dan Cara Uji' },
        { code: 'PerKa BPOM No. 5/2018', title: 'Batas Maksimum Cemaran Logam Berat' },
        { code: 'PerKa BPOM No. 16/2016', title: 'Kriteria Mikrobiologi dalam Pangan Olahan' },
        { code: 'EU Reg 2017/2158', title: 'Acrylamide Benchmark Levels (reference)' }
      ],
      parameters: [
        { name: 'Moisture Content', unit: '% (max)', limit: '4.0', method: 'Gravimetric / AOAC 925.10', type: 'mandatory', group: 'Physical-Chemical' },
        { name: 'Ash Content', unit: '% (max)', limit: '4.0', method: 'Gravimetric', type: 'mandatory', group: 'Physical-Chemical' },
        { name: 'Total Fat', unit: '% (max)', limit: '35.0', method: 'Soxhlet Extraction', type: 'mandatory', group: 'Nutritional' },
        { name: 'Sodium (Salt)', unit: 'mg/100g', limit: 'Report', method: 'AAS / Flame Photometry', type: 'mandatory', group: 'Nutritional' },
        { name: 'Carbohydrate (by difference)', unit: '%', limit: 'Report', method: 'Calculation', type: 'mandatory', group: 'Nutritional' },
        { name: 'Acrylamide', unit: 'μg/kg', limit: '< 1,000 (advisory)', method: 'LC-MS/MS', type: 'mandatory', group: 'Process Contaminants' },
        { name: 'Lead (Pb)', unit: 'mg/kg (max)', limit: '0.20', method: 'AAS / ICP-MS', type: 'mandatory', group: 'Heavy Metals' },
        { name: 'Cadmium (Cd)', unit: 'mg/kg (max)', limit: '0.10', method: 'AAS / ICP-MS', type: 'mandatory', group: 'Heavy Metals' },
        { name: 'Arsenic (As)', unit: 'mg/kg (max)', limit: '0.50', method: 'AAS / ICP-MS', type: 'mandatory', group: 'Heavy Metals' },
        { name: 'Mercury (Hg)', unit: 'mg/kg (max)', limit: '0.03', method: 'AAS / Cold Vapor', type: 'mandatory', group: 'Heavy Metals' },
        { name: 'Total Plate Count (TPC)', unit: 'CFU/g (max)', limit: '1×10⁴', method: 'SNI 2897:2008', type: 'mandatory', group: 'Microbiological' },
        { name: 'Coliform', unit: 'APM/g (max)', limit: '10', method: 'MPN Method', type: 'mandatory', group: 'Microbiological' },
        { name: 'Salmonella sp.', unit: 'per 25g', limit: 'Negative', method: 'ISO 6579', type: 'mandatory', group: 'Microbiological' },
        { name: 'Staphylococcus aureus', unit: 'CFU/g (max)', limit: '1×10²', method: 'SNI 2897:2008', type: 'mandatory', group: 'Microbiological' },
        { name: 'Mold & Yeast', unit: 'CFU/g (max)', limit: '1×10²', method: 'SNI 2897:2008', type: 'mandatory', group: 'Microbiological' },
        { name: 'Artificial Flavors', unit: '—', limit: 'Permitted types only', method: 'GC-MS / HPLC', type: 'conditional', group: 'Additives' },
        { name: 'Artificial Colorants', unit: '—', limit: 'Permitted types only', method: 'HPLC', type: 'conditional', group: 'Additives' }
      ]
    },

    {
      id: 'processed_meat',
      name: 'Processed Meat Products',
      description: 'Sausage, corned beef, meatballs, nuggets, ham, bacon, deli meats, and cured/smoked meat products',
      icon: 'beef',
      color: '#F87171',
      colorLight: 'rgba(248,113,113,0.12)',
      active: true,
      keywords: {
        high: ['sausage', 'corned beef', 'meatball', 'nugget', 'ham', 'bacon', 'deli meat', 'salami', 'pepperoni', 'luncheon meat', 'spam'],
        medium: ['processed meat', 'cured', 'smoked', 'ground meat', 'minced meat', 'chicken nugget', 'beef burger', 'meat patty', 'hot dog'],
        low: ['ready-to-eat', 'cooked meat', 'meat product', 'meat filling', 'protein product']
      },
      regulations: [
        { code: 'SNI 3820:2015', title: 'Sosis Daging — Syarat Mutu' },
        { code: 'SNI 01-3775:2006', title: 'Corned Beef — Syarat Mutu' },
        { code: 'SNI 01-6683:2002', title: 'Bakso Daging — Syarat Mutu' },
        { code: 'PerKa BPOM No. 36/2013', title: 'Batas Maksimum Cemaran dalam Daging Olahan' }
      ],
      parameters: [
        { name: 'Protein Content', unit: '% (min)', limit: '13.0', method: 'Kjeldahl Method', type: 'mandatory', group: 'Nutritional' },
        { name: 'Fat Content', unit: '% (max)', limit: '25.0', method: 'Soxhlet Extraction', type: 'mandatory', group: 'Nutritional' },
        { name: 'Moisture Content', unit: '% (max)', limit: '70.0', method: 'Gravimetric', type: 'mandatory', group: 'Physical-Chemical' },
        { name: 'NaCl (Salt)', unit: '% (max)', limit: '3.0', method: 'Mohr Argentometric Titration', type: 'mandatory', group: 'Physical-Chemical' },
        { name: 'Nitrite Residue (as NaNO₂)', unit: 'mg/kg (max)', limit: '30', method: 'Spectrophotometric (Griess)', type: 'mandatory', group: 'Additives' },
        { name: 'Nitrate Residue (as NaNO₃)', unit: 'mg/kg (max)', limit: '50', method: 'Spectrophotometric', type: 'mandatory', group: 'Additives' },
        { name: 'Borax (Boron)', unit: '—', limit: 'Not detected', method: 'Colorimetric / ICP-OES', type: 'mandatory', group: 'Illegal Additives' },
        { name: 'Formalin (Formaldehyde)', unit: '—', limit: 'Not detected', method: 'Colorimetric / HPLC', type: 'mandatory', group: 'Illegal Additives' },
        { name: 'Lead (Pb)', unit: 'mg/kg (max)', limit: '0.10', method: 'AAS / ICP-MS', type: 'mandatory', group: 'Heavy Metals' },
        { name: 'Cadmium (Cd)', unit: 'mg/kg (max)', limit: '0.05', method: 'AAS / ICP-MS', type: 'mandatory', group: 'Heavy Metals' },
        { name: 'Arsenic (As)', unit: 'mg/kg (max)', limit: '0.50', method: 'AAS / ICP-MS', type: 'mandatory', group: 'Heavy Metals' },
        { name: 'Total Plate Count (TPC)', unit: 'CFU/g (max)', limit: '1×10⁵', method: 'SNI 2897:2008', type: 'mandatory', group: 'Microbiological' },
        { name: 'Coliform', unit: 'APM/g (max)', limit: '10', method: 'MPN Method', type: 'mandatory', group: 'Microbiological' },
        { name: 'Salmonella sp.', unit: 'per 25g', limit: 'Negative', method: 'ISO 6579', type: 'mandatory', group: 'Microbiological' },
        { name: 'Staphylococcus aureus', unit: 'CFU/g (max)', limit: '1×10²', method: 'SNI 2897:2008', type: 'mandatory', group: 'Microbiological' },
        { name: 'Clostridium perfringens', unit: 'CFU/g (max)', limit: '1×10²', method: 'ISO 7937', type: 'mandatory', group: 'Microbiological' },
        { name: 'Listeria monocytogenes', unit: 'per 25g', limit: 'Negative', method: 'ISO 11290-1', type: 'mandatory', group: 'Microbiological' }
      ]
    },

    {
      id: 'instant_noodles',
      name: 'Instant Noodles & Pasta',
      description: 'Instant noodles, cup noodles, dried pasta, vermicelli, glass noodles, and starch-based convenience foods',
      icon: 'waves',
      color: '#A78BFA',
      colorLight: 'rgba(167,139,250,0.12)',
      active: true,
      keywords: {
        high: ['noodle', 'instant noodle', 'ramen', 'pasta', 'spaghetti', 'vermicelli', 'bihun', 'mi goreng', 'cup noodle', 'laksa'],
        medium: ['fried noodle', 'wheat noodle', 'dried noodle', 'seasoning packet', 'instant pasta', 'udon', 'soba', 'glass noodle', 'cellophane noodle'],
        low: ['starch-based', 'flour noodle', 'convenience food', 'quick meal', 'soup noodle']
      },
      regulations: [
        { code: 'SNI 3551:2012', title: 'Mie Instan — Syarat Mutu dan Cara Uji' },
        { code: 'PerKa BPOM No. 5/2018', title: 'Batas Maksimum Cemaran Logam Berat' },
        { code: 'PerKa BPOM No. 16/2016', title: 'Kriteria Mikrobiologi dalam Pangan Olahan' },
        { code: 'PerKa BPOM No. 21/2016', title: 'Kategori Pangan — Pasta dan Produk Serupa' }
      ],
      parameters: [
        { name: 'Moisture Content', unit: '% (max)', limit: '12.0', method: 'Gravimetric / AOAC 925.10', type: 'mandatory', group: 'Physical-Chemical' },
        { name: 'Ash Content', unit: '% (max)', limit: '4.0', method: 'Gravimetric', type: 'mandatory', group: 'Physical-Chemical' },
        { name: 'Total Fat', unit: '% (max)', limit: '20.0', method: 'Soxhlet Extraction', type: 'mandatory', group: 'Nutritional' },
        { name: 'Protein Content', unit: '% (min)', limit: '8.0', method: 'Kjeldahl Method', type: 'mandatory', group: 'Nutritional' },
        { name: 'Total Carbohydrate', unit: '%', limit: 'Report', method: 'Calculation by difference', type: 'mandatory', group: 'Nutritional' },
        { name: 'Sodium', unit: 'mg/100g', limit: 'Report', method: 'AAS / Flame Photometry', type: 'mandatory', group: 'Nutritional' },
        { name: 'Benzoic Acid', unit: 'mg/kg', limit: 'Not permitted in noodle', method: 'HPLC', type: 'mandatory', group: 'Additives' },
        { name: 'Sorbic Acid (in sauce)', unit: 'mg/kg (max)', limit: '1,000', method: 'HPLC', type: 'conditional', group: 'Additives' },
        { name: 'Lead (Pb)', unit: 'mg/kg (max)', limit: '0.50', method: 'AAS / ICP-MS', type: 'mandatory', group: 'Heavy Metals' },
        { name: 'Cadmium (Cd)', unit: 'mg/kg (max)', limit: '0.10', method: 'AAS / ICP-MS', type: 'mandatory', group: 'Heavy Metals' },
        { name: 'Arsenic (As)', unit: 'mg/kg (max)', limit: '0.50', method: 'AAS / ICP-MS', type: 'mandatory', group: 'Heavy Metals' },
        { name: 'Mercury (Hg)', unit: 'mg/kg (max)', limit: '0.03', method: 'AAS / Cold Vapor', type: 'mandatory', group: 'Heavy Metals' },
        { name: 'Total Plate Count (TPC)', unit: 'CFU/g (max)', limit: '1×10⁴', method: 'SNI 2897:2008', type: 'mandatory', group: 'Microbiological' },
        { name: 'Coliform', unit: 'APM/g (max)', limit: '10', method: 'MPN Method', type: 'mandatory', group: 'Microbiological' },
        { name: 'Salmonella sp.', unit: 'per 25g', limit: 'Negative', method: 'ISO 6579', type: 'mandatory', group: 'Microbiological' },
        { name: 'Staphylococcus aureus', unit: 'CFU/g (max)', limit: '1×10²', method: 'SNI 2897:2008', type: 'mandatory', group: 'Microbiological' },
        { name: 'Mold & Yeast', unit: 'CFU/g (max)', limit: '50', method: 'SNI 2897:2008', type: 'mandatory', group: 'Microbiological' }
      ]
    },

    {
      id: 'sauces_condiments',
      name: 'Sauces & Condiments',
      description: 'Soy sauce, ketchup, chili sauce, oyster sauce, fish sauce, seasoning, vinegar, and marinades',
      icon: 'droplets',
      color: '#E879F9',
      colorLight: 'rgba(232,121,249,0.12)',
      active: true,
      keywords: {
        high: ['sauce', 'ketchup', 'soy sauce', 'chili sauce', 'sambal', 'vinegar', 'oyster sauce', 'fish sauce', 'worcestershire'],
        medium: ['condiment', 'seasoning sauce', 'sweet soy', 'tomato sauce', 'hot sauce', 'marinade', 'salad dressing', 'teriyaki', 'hoisin'],
        low: ['spicy sauce', 'fermented sauce', 'umami', 'bottled sauce', 'dip', 'relish']
      },
      regulations: [
        { code: 'SNI 01-2543-1999', title: 'Kecap Kedelai (Soy Sauce) — Syarat Mutu' },
        { code: 'SNI 01-2976-2006', title: 'Saus Tomat — Syarat Mutu' },
        { code: 'SNI 01-2977-2006', title: 'Saus Cabe — Syarat Mutu' },
        { code: 'PerKa BPOM No. 21/2016', title: 'BTP yang Diizinkan pada Saus dan Sejenisnya' }
      ],
      parameters: [
        { name: 'pH', unit: '—', limit: '3.5–5.5 (ketchup/chili)', method: 'pH Meter', type: 'mandatory', group: 'Physical-Chemical' },
        { name: 'Total Soluble Solids (Brix)', unit: '°Brix', limit: 'Report', method: 'Refractometer', type: 'mandatory', group: 'Physical-Chemical' },
        { name: 'Total NaCl (Salt)', unit: '%', limit: 'Report', method: 'Mohr Argentometric Titration', type: 'mandatory', group: 'Physical-Chemical' },
        { name: 'Total Nitrogen (soy sauce)', unit: '% (min)', limit: '1.5', method: 'Kjeldahl Method', type: 'conditional', group: 'Nutritional' },
        { name: 'Total Sugar', unit: '%', limit: 'Report', method: 'Luff-Schoorl / HPLC', type: 'mandatory', group: 'Nutritional' },
        { name: 'Benzoic Acid', unit: 'mg/kg (max)', limit: '600', method: 'HPLC', type: 'mandatory', group: 'Additives' },
        { name: 'Sorbic Acid', unit: 'mg/kg (max)', limit: '1,000', method: 'HPLC', type: 'conditional', group: 'Additives' },
        { name: 'Artificial Colorants', unit: '—', limit: 'Permitted types per PerKa', method: 'TLC / HPLC', type: 'conditional', group: 'Additives' },
        { name: 'MSG (Monosodium Glutamate)', unit: 'mg/kg', limit: 'Report / Quantum Satis', method: 'HPLC', type: 'conditional', group: 'Additives' },
        { name: 'Lead (Pb)', unit: 'mg/kg (max)', limit: '0.20', method: 'AAS / ICP-MS', type: 'mandatory', group: 'Heavy Metals' },
        { name: 'Cadmium (Cd)', unit: 'mg/kg (max)', limit: '0.10', method: 'AAS / ICP-MS', type: 'mandatory', group: 'Heavy Metals' },
        { name: 'Arsenic (As)', unit: 'mg/kg (max)', limit: '0.25', method: 'AAS / ICP-MS', type: 'mandatory', group: 'Heavy Metals' },
        { name: 'Mercury (Hg)', unit: 'mg/kg (max)', limit: '0.03', method: 'AAS / Cold Vapor', type: 'mandatory', group: 'Heavy Metals' },
        { name: 'Total Plate Count (TPC)', unit: 'CFU/mL (max)', limit: '1×10⁴', method: 'SNI 2897:2008', type: 'mandatory', group: 'Microbiological' },
        { name: 'Coliform', unit: 'APM/mL (max)', limit: '10', method: 'MPN Method', type: 'mandatory', group: 'Microbiological' },
        { name: 'Salmonella sp.', unit: 'per 25 mL', limit: 'Negative', method: 'ISO 6579', type: 'mandatory', group: 'Microbiological' },
        { name: 'Mold & Yeast', unit: 'CFU/mL (max)', limit: '50', method: 'SNI 2897:2008', type: 'mandatory', group: 'Microbiological' }
      ]
    },

    {
      id: 'supplements',
      name: 'Dietary & Food Supplements',
      description: 'Vitamin supplements, mineral capsules/tablets, herbal supplements, probiotics, and functional food products',
      icon: 'pill',
      color: '#2DD4BF',
      colorLight: 'rgba(45,212,191,0.12)',
      active: true,
      keywords: {
        high: ['supplement', 'vitamin', 'mineral supplement', 'herbal supplement', 'capsule', 'tablet', 'softgel', 'probiotic', 'nutraceutical'],
        medium: ['dietary supplement', 'health product', 'functional food', 'multivitamin', 'omega-3', 'fish oil', 'zinc', 'iron supplement', 'calcium supplement', 'gummy vitamin'],
        low: ['health', 'wellness', 'immune support', 'energy boost', 'fortified food', 'prebiotic', 'collagen']
      },
      regulations: [
        { code: 'PerKa BPOM No. 11/2014', title: 'Persyaratan Sertifikasi Suplemen Kesehatan' },
        { code: 'PerKa BPOM No. 5/2018', title: 'Batas Maksimum Cemaran Logam Berat' },
        { code: 'PerKa BPOM No. 16/2016', title: 'Kriteria Mikrobiologi dalam Suplemen Kesehatan' },
        { code: 'Permenkes No. 033/2012', title: 'BTP yang Diizinkan dalam Suplemen Makanan' }
      ],
      parameters: [
        { name: 'Moisture Content / Loss on Drying', unit: '% (max)', limit: '5.0', method: 'Gravimetric (105°C, 2h)', type: 'mandatory', group: 'Physical-Chemical' },
        { name: 'Active Ingredient Potency', unit: '% of label claim', limit: '90–110%', method: 'HPLC / UV-Vis / Titrimetric', type: 'mandatory', group: 'Active Ingredients' },
        { name: 'Dissolution Rate (tablet/capsule)', unit: '% dissolved', limit: '≥ 75% in 45 min', method: 'USP Dissolution Apparatus II', type: 'mandatory', group: 'Physical-Chemical' },
        { name: 'Disintegration Time', unit: 'min (max)', limit: '30', method: 'USP Disintegration Tester', type: 'conditional', group: 'Physical-Chemical' },
        { name: 'Uniformity of Weight', unit: '% RSD', limit: '≤ 5.0%', method: 'Gravimetric (n=20)', type: 'conditional', group: 'Physical-Chemical' },
        { name: 'Lead (Pb)', unit: 'mg/kg (max)', limit: '2.0', method: 'AAS / ICP-MS', type: 'mandatory', group: 'Heavy Metals' },
        { name: 'Cadmium (Cd)', unit: 'mg/kg (max)', limit: '0.5', method: 'AAS / ICP-MS', type: 'mandatory', group: 'Heavy Metals' },
        { name: 'Arsenic (As)', unit: 'mg/kg (max)', limit: '1.0', method: 'AAS / ICP-MS', type: 'mandatory', group: 'Heavy Metals' },
        { name: 'Mercury (Hg)', unit: 'mg/kg (max)', limit: '0.1', method: 'AAS / Cold Vapor', type: 'mandatory', group: 'Heavy Metals' },
        { name: 'Total Plate Count (TPC)', unit: 'CFU/g (max)', limit: '1×10³', method: 'SNI 2897:2008', type: 'mandatory', group: 'Microbiological' },
        { name: 'Coliform', unit: 'APM/g (max)', limit: '< 3', method: 'MPN Method', type: 'mandatory', group: 'Microbiological' },
        { name: 'E. coli', unit: 'per g', limit: 'Negative', method: 'MPN Confirmatory', type: 'mandatory', group: 'Microbiological' },
        { name: 'Salmonella sp.', unit: 'per 25g', limit: 'Negative', method: 'ISO 6579', type: 'mandatory', group: 'Microbiological' },
        { name: 'Mold & Yeast', unit: 'CFU/g (max)', limit: '1×10²', method: 'SNI 2897:2008', type: 'mandatory', group: 'Microbiological' },
        { name: 'Staphylococcus aureus', unit: 'CFU/g (max)', limit: '1×10²', method: 'SNI 2897:2008', type: 'mandatory', group: 'Microbiological' },
        { name: 'Pesticide Residues (herbal)', unit: '—', limit: 'Below MRL', method: 'GC-MS / LC-MS/MS', type: 'conditional', group: 'Contaminants' },
        { name: 'Aflatoxins (herbal)', unit: 'μg/kg (max)', limit: 'B1: 2, Total: 4', method: 'HPLC-FLD / ELISA', type: 'conditional', group: 'Contaminants' }
      ]
    },

    {
      id: 'infant_formula',
      name: 'Infant Formula & Baby Food',
      description: 'Infant formula (stage 1–3), follow-on formula, baby food purees, and weaning/toddler nutrition products',
      icon: 'baby',
      color: '#FCD34D',
      colorLight: 'rgba(252,211,77,0.12)',
      active: true,
      keywords: {
        high: ['infant formula', 'baby formula', 'baby food', 'baby milk', 'toddler formula', 'follow-on formula', 'stage 1', 'stage 2', 'stage 3'],
        medium: ['infant', 'newborn', 'toddler', 'breast milk substitute', 'weaning food', 'growing-up milk', 'baby cereal', 'baby puree'],
        low: ['0-6 months', '6-12 months', '1-3 years', 'first foods', 'starter formula']
      },
      regulations: [
        { code: 'PerKa BPOM No. 21/2016', title: 'Persyaratan Formula Bayi dan Formula Lanjutan' },
        { code: 'SNI 01-7111.1-2005', title: 'Formula Bayi — Syarat Mutu dan Cara Uji' },
        { code: 'Permenkes No. 39/2013', title: 'Susu Formula dan Produk Pengganti Air Susu Ibu' },
        { code: 'Codex Alimentarius STAN 72-1981', title: 'Standard for Infant Formula (international ref.)' }
      ],
      parameters: [
        { name: 'Protein Content', unit: 'g/100 kcal', limit: '1.8–3.0', method: 'Kjeldahl Method', type: 'mandatory', group: 'Macronutrients' },
        { name: 'Fat Content', unit: 'g/100 kcal', limit: '4.4–6.0', method: 'Rose-Gottlieb / Gerber', type: 'mandatory', group: 'Macronutrients' },
        { name: 'Carbohydrate (as Lactose equiv.)', unit: 'g/100 kcal', limit: '9.0–14.0', method: 'Enzymatic / HPLC', type: 'mandatory', group: 'Macronutrients' },
        { name: 'Energy Density', unit: 'kcal/100 mL', limit: '60–70', method: 'Calculation', type: 'mandatory', group: 'Macronutrients' },
        { name: 'Vitamin A', unit: 'μg RE/100 kcal', limit: '60–180', method: 'HPLC-UV/DAD', type: 'mandatory', group: 'Vitamins' },
        { name: 'Vitamin D', unit: 'μg/100 kcal', limit: '1.0–2.5', method: 'HPLC-UV', type: 'mandatory', group: 'Vitamins' },
        { name: 'Vitamin E', unit: 'mg α-TE/100 kcal', limit: '≥ 0.5', method: 'HPLC-FLD', type: 'mandatory', group: 'Vitamins' },
        { name: 'Vitamin C', unit: 'mg/100 kcal', limit: '≥ 10', method: 'Titrimetric / HPLC', type: 'mandatory', group: 'Vitamins' },
        { name: 'Calcium', unit: 'mg/100 kcal', limit: '50–140', method: 'AAS / ICP-OES', type: 'mandatory', group: 'Minerals' },
        { name: 'Iron (Fe)', unit: 'mg/100 kcal', limit: '0.3–1.3', method: 'AAS / ICP-OES', type: 'mandatory', group: 'Minerals' },
        { name: 'Zinc (Zn)', unit: 'mg/100 kcal', limit: '0.5–1.5', method: 'AAS / ICP-OES', type: 'mandatory', group: 'Minerals' },
        { name: 'Iodine', unit: 'μg/100 kcal', limit: '10–50', method: 'ICP-MS / Titrimetric', type: 'mandatory', group: 'Minerals' },
        { name: 'Lead (Pb)', unit: 'mg/kg (max)', limit: '0.01', method: 'AAS / ICP-MS', type: 'mandatory', group: 'Heavy Metals (Strict)' },
        { name: 'Cadmium (Cd)', unit: 'mg/kg (max)', limit: '0.01', method: 'AAS / ICP-MS', type: 'mandatory', group: 'Heavy Metals (Strict)' },
        { name: 'Arsenic (As)', unit: 'mg/kg (max)', limit: '0.05', method: 'AAS / ICP-MS', type: 'mandatory', group: 'Heavy Metals (Strict)' },
        { name: 'Mercury (Hg)', unit: 'mg/kg (max)', limit: '0.01', method: 'AAS / Cold Vapor', type: 'mandatory', group: 'Heavy Metals (Strict)' },
        { name: 'Total Plate Count (TPC)', unit: 'CFU/g (max)', limit: '1×10³', method: 'SNI 2897:2008', type: 'mandatory', group: 'Microbiological' },
        { name: 'Coliform', unit: 'per g', limit: 'Negative', method: 'MPN Method', type: 'mandatory', group: 'Microbiological' },
        { name: 'Salmonella sp.', unit: 'per 25g', limit: 'Negative', method: 'ISO 6579', type: 'mandatory', group: 'Microbiological' },
        { name: 'Cronobacter sakazakii', unit: 'per 10g', limit: 'Negative', method: 'ISO 22964', type: 'mandatory', group: 'Microbiological' },
        { name: 'Listeria monocytogenes', unit: 'per 25g', limit: 'Negative', method: 'ISO 11290-1', type: 'mandatory', group: 'Microbiological' }
      ]
    },

    {
      id: 'cooking_oils',
      name: 'Cooking Oils & Edible Fats',
      description: 'Palm oil, coconut oil, olive oil, soybean oil, canola oil, margarine, shortening, and refined edible fats',
      icon: 'flask-conical',
      color: '#86EFAC',
      colorLight: 'rgba(134,239,172,0.12)',
      active: true,
      keywords: {
        high: ['cooking oil', 'palm oil', 'olive oil', 'coconut oil', 'margarine', 'vegetable oil', 'edible oil', 'shortening'],
        medium: ['soybean oil', 'sunflower oil', 'canola oil', 'corn oil', 'refined oil', 'virgin oil', 'extra virgin', 'butter blend', 'spread'],
        low: ['fat', 'lipid', 'frying oil', 'hydrogenated', 'lard', 'ghee', 'clarified butter']
      },
      regulations: [
        { code: 'SNI 7709:2012', title: 'Minyak Sawit Olahan (Refined Palm Oil) — Syarat Mutu' },
        { code: 'SNI 3741:2013', title: 'Minyak Goreng — Syarat Mutu' },
        { code: 'PerKa BPOM No. 5/2018', title: 'Batas Maksimum Cemaran Logam Berat' },
        { code: 'Codex Stan 210-1999', title: 'Codex Standard for Edible Oils (international ref.)' }
      ],
      parameters: [
        { name: 'Moisture & Volatile Matter', unit: '% (max)', limit: '0.15', method: 'Gravimetric (AOCS Ca 2c-25)', type: 'mandatory', group: 'Physical-Chemical' },
        { name: 'Free Fatty Acid (FFA / Acid Value)', unit: 'mg KOH/g (max)', limit: '0.60', method: 'AOCS Ca 5a-40', type: 'mandatory', group: 'Quality Indicators' },
        { name: 'Peroxide Value (PV)', unit: 'mEq/kg (max)', limit: '5.0', method: 'AOCS Cd 8-53', type: 'mandatory', group: 'Quality Indicators' },
        { name: 'Iodine Value (IV)', unit: 'g I₂/100g', limit: 'Per oil type', method: 'Wijs Method (AOCS Cd 1-25)', type: 'mandatory', group: 'Quality Indicators' },
        { name: 'Saponification Value', unit: 'mg KOH/g', limit: 'Per oil type', method: 'AOCS Cd 3-25', type: 'conditional', group: 'Quality Indicators' },
        { name: 'Color (Lovibond 5.25" cell)', unit: 'R/Y Lovibond units', limit: 'Per grade spec.', method: 'Lovibond Tintometer', type: 'mandatory', group: 'Physical-Chemical' },
        { name: 'Trans Fatty Acid', unit: '% of total FA (max)', limit: '2.0', method: 'GC-FID (AOCS Ce 1h-05)', type: 'mandatory', group: 'Fatty Acid Profile' },
        { name: 'Fatty Acid Composition', unit: '%', limit: 'Identity report', method: 'GC-FID', type: 'conditional', group: 'Fatty Acid Profile' },
        { name: 'Lead (Pb)', unit: 'mg/kg (max)', limit: '0.10', method: 'AAS / ICP-MS', type: 'mandatory', group: 'Heavy Metals' },
        { name: 'Arsenic (As)', unit: 'mg/kg (max)', limit: '0.10', method: 'AAS / ICP-MS', type: 'mandatory', group: 'Heavy Metals' },
        { name: 'Cadmium (Cd)', unit: 'mg/kg (max)', limit: '0.05', method: 'AAS / ICP-MS', type: 'mandatory', group: 'Heavy Metals' },
        { name: '3-MCPD Esters', unit: 'μg/kg (max)', limit: '1,250', method: 'DGF C-VI 18 (10) / LC-MS/MS', type: 'mandatory', group: 'Process Contaminants' },
        { name: 'Glycidyl Esters (as GE)', unit: 'μg/kg (max)', limit: '1,000', method: 'DGF C-VI 18 (10) / GC-MS', type: 'mandatory', group: 'Process Contaminants' },
        { name: 'Polycyclic Aromatic Hydrocarbons (PAH)', unit: 'μg/kg', limit: 'BaP ≤ 2.0', method: 'HPLC-FLD / GC-MS', type: 'conditional', group: 'Process Contaminants' },
        { name: 'Mold & Yeast', unit: 'CFU/mL (max)', limit: '10', method: 'SNI 2897:2008', type: 'conditional', group: 'Microbiological' }
      ]
    },

    {
      id: 'seafood',
      name: 'Seafood & Fishery Products',
      description: 'Fresh and processed fish, shrimp, crab, squid, shellfish, surimi, fish fillets, dried fish, and fish-based products',
      icon: 'fish',
      color: '#38BDF8',
      colorLight: 'rgba(56,189,248,0.12)',
      active: true,
      keywords: {
        high: ['fish', 'seafood', 'shrimp', 'prawn', 'crab', 'squid', 'tuna', 'salmon', 'mackerel', 'tilapia', 'catfish', 'shellfish', 'clam', 'oyster', 'surimi', 'fillet', 'anchovy', 'sardine'],
        medium: ['dried fish', 'smoked fish', 'salted fish', 'frozen fish', 'fish cake', 'fish ball', 'processed seafood', 'lobster', 'scallop'],
        low: ['marine product', 'aquaculture', 'fishery', 'dehydrated fish', 'fish paste']
      },
      regulations: [
        { code: 'SNI 2729:2013', title: 'Ikan Segar — Syarat Mutu dan Keamanan Pangan' },
        { code: 'SNI 01-2728-2006', title: 'Udang Beku — Syarat Mutu' },
        { code: 'PerKa BPOM No. 5/2018', title: 'Batas Maksimum Cemaran Logam Berat dalam Pangan' },
        { code: 'PerKa BPOM No. 36/2013', title: 'Batas Cemaran dan Residu dalam Produk Perikanan' },
        { code: 'SNI 3460:2009', title: 'Tuna Loin Beku — Syarat Mutu' }
      ],
      parameters: [
        { name: 'Organoleptic Score', unit: 'Min score', limit: '7 (of 9)', method: 'Sensory Panel (SNI)', type: 'mandatory', group: 'Sensory' },
        { name: 'pH (freshness)', unit: '—', limit: '6.8–7.2', method: 'pH Meter', type: 'mandatory', group: 'Physical-Chemical' },
        { name: 'TVB-N (Total Volatile Base Nitrogen)', unit: 'mg N/100g (max)', limit: '30', method: 'Conway Microdiffusion', type: 'mandatory', group: 'Freshness Indicators' },
        { name: 'TMA-N (Trimethylamine Nitrogen)', unit: 'mg N/100g (max)', limit: '5', method: 'Conway Microdiffusion', type: 'mandatory', group: 'Freshness Indicators' },
        { name: 'Histamine (scombroid fish)', unit: 'mg/kg (max)', limit: '100', method: 'HPLC / Fluorometric', type: 'mandatory', group: 'Freshness Indicators' },
        { name: 'Moisture Content', unit: '% (max)', limit: '86.0', method: 'Gravimetric', type: 'mandatory', group: 'Physical-Chemical' },
        { name: 'Protein Content', unit: '% (min)', limit: '15.0', method: 'Kjeldahl Method', type: 'mandatory', group: 'Nutritional' },
        { name: 'Antibiotic Residue (Chloramphenicol)', unit: 'μg/kg', limit: 'Not detected', method: 'ELISA / LC-MS/MS', type: 'mandatory', group: 'Drug Residues' },
        { name: 'Antibiotic Residue (Nitrofuran)', unit: 'μg/kg', limit: 'Not detected', method: 'LC-MS/MS', type: 'mandatory', group: 'Drug Residues' },
        { name: 'Oxytetracycline Residue', unit: 'mg/kg (max)', limit: '0.1', method: 'HPLC / LC-MS/MS', type: 'conditional', group: 'Drug Residues' },
        { name: 'Lead (Pb)', unit: 'mg/kg (max)', limit: '0.30', method: 'AAS / ICP-MS', type: 'mandatory', group: 'Heavy Metals' },
        { name: 'Cadmium (Cd)', unit: 'mg/kg (max)', limit: '0.10', method: 'AAS / ICP-MS', type: 'mandatory', group: 'Heavy Metals' },
        { name: 'Mercury (Hg)', unit: 'mg/kg (max)', limit: '0.50', method: 'AAS / Cold Vapor', type: 'mandatory', group: 'Heavy Metals' },
        { name: 'Methylmercury (predatory fish)', unit: 'mg/kg (max)', limit: '1.0', method: 'GC-AAS / LC-ICP-MS', type: 'mandatory', group: 'Heavy Metals' },
        { name: 'Arsenic (As) — inorganic', unit: 'mg/kg (max)', limit: '1.0', method: 'AAS / ICP-MS (speciation)', type: 'mandatory', group: 'Heavy Metals' },
        { name: 'Formalin (Formaldehyde)', unit: '—', limit: 'Not detected', method: 'Colorimetric / HPLC', type: 'mandatory', group: 'Illegal Additives' },
        { name: 'Total Plate Count (TPC)', unit: 'CFU/g (max)', limit: '5×10⁵', method: 'SNI 2897:2008', type: 'mandatory', group: 'Microbiological' },
        { name: 'Coliform', unit: 'APM/g (max)', limit: '10', method: 'MPN Method', type: 'mandatory', group: 'Microbiological' },
        { name: 'Salmonella sp.', unit: 'per 25g', limit: 'Negative', method: 'ISO 6579', type: 'mandatory', group: 'Microbiological' },
        { name: 'Vibrio cholerae', unit: 'per 25g', limit: 'Negative', method: 'ISO 21872-1', type: 'mandatory', group: 'Microbiological' },
        { name: 'Staphylococcus aureus', unit: 'CFU/g (max)', limit: '1×10²', method: 'SNI 2897:2008', type: 'mandatory', group: 'Microbiological' }
      ]
    },

    {
      id: 'spices_seasonings',
      name: 'Spices & Seasonings',
      description: 'Ground spices, whole spices, spice blends, seasoning powder, bouillon cubes, curry paste, and dry rubs',
      icon: 'sparkles',
      color: '#FB923C',
      colorLight: 'rgba(251,146,60,0.12)',
      active: true,
      keywords: {
        high: ['spice', 'seasoning', 'pepper', 'chili powder', 'turmeric', 'coriander', 'cumin', 'cinnamon', 'ginger powder', 'curry', 'bouillon', 'nutmeg', 'cloves', 'cardamom', 'bumbu'],
        medium: ['spice blend', 'masala', 'dried herb', 'herb mix', 'seasoning powder', 'rempah', 'paprika', 'garlic powder', 'onion powder', 'lada', 'kunyit'],
        low: ['aromatic', 'flavor blend', 'dried spice', 'ground spice']
      },
      regulations: [
        { code: 'SNI 01-3709-1995', title: 'Lada Putih Bubuk — Syarat Mutu' },
        { code: 'SNI 01-3714-1995', title: 'Kunyit Bubuk — Syarat Mutu' },
        { code: 'PerKa BPOM No. 5/2018', title: 'Batas Maksimum Cemaran Logam Berat' },
        { code: 'Codex Stan 183-1993', title: 'Codex Standard for Certain Spices' },
        { code: 'PerKa BPOM No. 8/2018', title: 'Batas Maksimum Cemaran Fisik, Kimia, dan Biologi' }
      ],
      parameters: [
        { name: 'Moisture Content', unit: '% (max)', limit: '12.0', method: 'Gravimetric (105°C)', type: 'mandatory', group: 'Physical-Chemical' },
        { name: 'Total Ash Content', unit: '% (max)', limit: '8.0', method: 'Gravimetric (550°C)', type: 'mandatory', group: 'Physical-Chemical' },
        { name: 'Water-insoluble Ash', unit: '% (max)', limit: '1.5', method: 'Gravimetric', type: 'mandatory', group: 'Physical-Chemical' },
        { name: 'Volatile Oil (essential oil)', unit: 'mL/100g (min)', limit: 'Per commodity spec.', method: 'Steam Distillation', type: 'conditional', group: 'Quality Indicators' },
        { name: 'Curcumin Content (turmeric)', unit: '% (min)', limit: '2.0', method: 'HPLC / UV-Vis', type: 'conditional', group: 'Active Compounds' },
        { name: 'Capsaicin Content (chili)', unit: 'SHU', limit: 'Report', method: 'HPLC', type: 'conditional', group: 'Active Compounds' },
        { name: 'Aflatoxin B1', unit: 'μg/kg (max)', limit: '5', method: 'HPLC-FLD / ELISA', type: 'mandatory', group: 'Mycotoxins' },
        { name: 'Total Aflatoxins (B1+B2+G1+G2)', unit: 'μg/kg (max)', limit: '10', method: 'HPLC-FLD / ELISA', type: 'mandatory', group: 'Mycotoxins' },
        { name: 'Ochratoxin A (OTA)', unit: 'μg/kg (max)', limit: '15', method: 'HPLC-FLD / ELISA', type: 'mandatory', group: 'Mycotoxins' },
        { name: 'Pesticide Residues', unit: '—', limit: 'Below CAC MRL', method: 'GC-MS / LC-MS/MS', type: 'mandatory', group: 'Pesticide Residues' },
        { name: 'Lead (Pb)', unit: 'mg/kg (max)', limit: '2.0', method: 'AAS / ICP-MS', type: 'mandatory', group: 'Heavy Metals' },
        { name: 'Cadmium (Cd)', unit: 'mg/kg (max)', limit: '1.0', method: 'AAS / ICP-MS', type: 'mandatory', group: 'Heavy Metals' },
        { name: 'Arsenic (As)', unit: 'mg/kg (max)', limit: '1.0', method: 'AAS / ICP-MS', type: 'mandatory', group: 'Heavy Metals' },
        { name: 'Sudan Dye (illegal red colorant)', unit: '—', limit: 'Not detected', method: 'TLC / HPLC', type: 'mandatory', group: 'Illegal Additives' },
        { name: 'Total Plate Count (TPC)', unit: 'CFU/g (max)', limit: '5×10⁵', method: 'SNI 2897:2008', type: 'mandatory', group: 'Microbiological' },
        { name: 'E. coli', unit: 'per g', limit: 'Negative', method: 'MPN Confirmatory', type: 'mandatory', group: 'Microbiological' },
        { name: 'Salmonella sp.', unit: 'per 25g', limit: 'Negative', method: 'ISO 6579', type: 'mandatory', group: 'Microbiological' },
        { name: 'Mold & Yeast', unit: 'CFU/g (max)', limit: '1×10⁴', method: 'SNI 2897:2008', type: 'mandatory', group: 'Microbiological' }
      ]
    },

    {
      id: 'canned_foods',
      name: 'Canned & Retorted Foods',
      description: 'Canned vegetables, canned fruit, canned fish, canned meat, retort pouches, and commercially sterilized packaged foods',
      icon: 'archive',
      color: '#94A3B8',
      colorLight: 'rgba(148,163,184,0.12)',
      active: true,
      keywords: {
        high: ['canned', 'retort', 'sterilized', 'canned fish', 'canned meat', 'canned vegetable', 'canned fruit', 'aseptic', 'tin can'],
        medium: ['retort pouch', 'shelf-stable', 'hermetically sealed', 'autoclave', 'commercially sterile', 'canned tuna', 'canned sardine', 'canned corn'],
        low: ['packaged preserved', 'long shelf life', 'ready-to-eat canned', 'self-stable']
      },
      regulations: [
        { code: 'SNI 01-3715-1995', title: 'Ikan Sarden dalam Kaleng — Syarat Mutu' },
        { code: 'SNI 01-2891-1992', title: 'Cara Uji Makanan dan Minuman (General)' },
        { code: 'PerKa BPOM No. 16/2016', title: 'Kriteria Mikrobiologi dalam Pangan Olahan (Sterilisasi)' },
        { code: 'Codex CAC/RCP 23-1979', title: 'Code of Hygienic Practice for Low-Acid Canned Foods' },
        { code: 'PerKa BPOM No. 5/2018', title: 'Batas Maksimum Cemaran Logam Berat' }
      ],
      parameters: [
        { name: 'Commercial Sterility', unit: '—', limit: 'Pass (no growth after incubation)', method: 'Incubation 37°C/14d + 55°C/7d', type: 'mandatory', group: 'Sterility Tests' },
        { name: 'Clostridium botulinum', unit: 'per 25g', limit: 'Negative', method: 'Anaerobic culture / PCR', type: 'mandatory', group: 'Sterility Tests' },
        { name: 'pH (for acidified products)', unit: '—', limit: '≤ 4.6', method: 'pH Meter', type: 'conditional', group: 'Physical-Chemical' },
        { name: 'Drained Weight', unit: 'g', limit: '≥ Stated net weight', method: 'Gravimetric', type: 'mandatory', group: 'Physical-Chemical' },
        { name: 'Can Integrity (seam check)', unit: '—', limit: 'Pass all seam criteria', method: 'Visual + Seam Micrometer', type: 'mandatory', group: 'Packaging Integrity' },
        { name: 'Tin (Sn) Migration', unit: 'mg/kg (max)', limit: '200', method: 'AAS / ICP-OES', type: 'mandatory', group: 'Packaging Contaminants' },
        { name: 'BPA (Bisphenol A) Migration', unit: 'μg/kg (max)', limit: '50', method: 'HPLC-UV / LC-MS/MS', type: 'mandatory', group: 'Packaging Contaminants' },
        { name: 'Lead (Pb)', unit: 'mg/kg (max)', limit: '0.10', method: 'AAS / ICP-MS', type: 'mandatory', group: 'Heavy Metals' },
        { name: 'Cadmium (Cd)', unit: 'mg/kg (max)', limit: '0.05', method: 'AAS / ICP-MS', type: 'mandatory', group: 'Heavy Metals' },
        { name: 'Mercury (Hg)', unit: 'mg/kg (max)', limit: '0.03', method: 'AAS / Cold Vapor', type: 'mandatory', group: 'Heavy Metals' },
        { name: 'Arsenic (As)', unit: 'mg/kg (max)', limit: '0.50', method: 'AAS / ICP-MS', type: 'mandatory', group: 'Heavy Metals' },
        { name: 'Protein Content', unit: '%', limit: 'Per product type', method: 'Kjeldahl Method', type: 'mandatory', group: 'Nutritional' },
        { name: 'Sodium', unit: 'mg/100g', limit: 'Report', method: 'AAS / Flame Photometry', type: 'mandatory', group: 'Nutritional' }
      ]
    },

    {
      id: 'frozen_foods',
      name: 'Frozen & Chilled Foods',
      description: 'Frozen ready meals, frozen dumplings, frozen pizza, frozen vegetables, ice cream, and refrigerated convenience foods',
      icon: 'snowflake',
      color: '#67E8F9',
      colorLight: 'rgba(103,232,249,0.12)',
      active: true,
      keywords: {
        high: ['frozen', 'frozen food', 'ice cream', 'frozen meal', 'frozen pizza', 'frozen dumpling', 'frozen vegetables', 'sorbet', 'gelato', 'frozen yogurt'],
        medium: ['chilled', 'refrigerated', 'ready meal', 'dim sum', 'gyoza', 'spring roll', 'frozen patty', 'quick frozen', 'iqf', 'blast frozen'],
        low: ['deep frozen', 'cold chain', 'individually quick frozen', 'freeze-thaw stable']
      },
      regulations: [
        { code: 'SNI 01-3562-1994', title: 'Es Krim — Syarat Mutu' },
        { code: 'Codex STAN 212-1999', title: 'Standard for Quick Frozen Vegetables' },
        { code: 'PerKa BPOM No. 16/2016', title: 'Kriteria Mikrobiologi dalam Pangan Olahan' },
        { code: 'PerKa BPOM No. 5/2018', title: 'Batas Maksimum Cemaran Logam Berat' }
      ],
      parameters: [
        { name: 'Core Product Temperature', unit: '°C (max)', limit: '-18', method: 'Calibrated Thermometer', type: 'mandatory', group: 'Temperature Control' },
        { name: 'Overrun (ice cream)', unit: '% (max)', limit: '100', method: 'Volumetric (AOAC)', type: 'conditional', group: 'Physical-Chemical' },
        { name: 'Milk Fat (ice cream)', unit: '% (min)', limit: '2.5', method: 'Gerber / Rose-Gottlieb', type: 'conditional', group: 'Dairy Parameters' },
        { name: 'Total Solids (ice cream)', unit: '% (min)', limit: '34', method: 'Gravimetric', type: 'conditional', group: 'Dairy Parameters' },
        { name: 'Moisture Content', unit: '% (max)', limit: 'Per product spec.', method: 'Gravimetric', type: 'mandatory', group: 'Physical-Chemical' },
        { name: 'Total Fat', unit: '%', limit: 'Per product spec.', method: 'Soxhlet Extraction', type: 'mandatory', group: 'Nutritional' },
        { name: 'Sodium', unit: 'mg/100g', limit: 'Report', method: 'AAS / Flame Photometry', type: 'mandatory', group: 'Nutritional' },
        { name: 'Artificial Colorants', unit: '—', limit: 'Permitted types only', method: 'TLC / HPLC', type: 'conditional', group: 'Additives' },
        { name: 'Lead (Pb)', unit: 'mg/kg (max)', limit: '0.10', method: 'AAS / ICP-MS', type: 'mandatory', group: 'Heavy Metals' },
        { name: 'Cadmium (Cd)', unit: 'mg/kg (max)', limit: '0.05', method: 'AAS / ICP-MS', type: 'mandatory', group: 'Heavy Metals' },
        { name: 'Total Plate Count (TPC)', unit: 'CFU/g (max)', limit: '1×10⁵', method: 'SNI 2897:2008', type: 'mandatory', group: 'Microbiological' },
        { name: 'Salmonella sp.', unit: 'per 25g', limit: 'Negative', method: 'ISO 6579', type: 'mandatory', group: 'Microbiological' },
        { name: 'Listeria monocytogenes', unit: 'per 25g', limit: 'Negative', method: 'ISO 11290-1', type: 'mandatory', group: 'Microbiological' },
        { name: 'Staphylococcus aureus', unit: 'CFU/g (max)', limit: '1×10²', method: 'SNI 2897:2008', type: 'mandatory', group: 'Microbiological' }
      ]
    },

    {
      id: 'fermented_foods',
      name: 'Fermented Foods & Pickled Products',
      description: 'Tempeh, tofu, fermented soy sauce, kimchi, pickles, natto, miso, vinegar-based products, and traditional Indonesian fermented foods',
      icon: 'beaker',
      color: '#C084FC',
      colorLight: 'rgba(192,132,252,0.12)',
      active: true,
      keywords: {
        high: ['tempeh', 'tempe', 'tofu', 'tahu', 'fermented', 'kimchi', 'pickle', 'miso', 'natto', 'kombucha', 'vinegar', 'tape', 'oncom', 'kefir'],
        medium: ['fermented soybean', 'lacto-fermented', 'probiotic food', 'brined', 'cultured', 'fermented vegetable', 'acidified', 'cuka', 'acar'],
        low: ['beneficial bacteria', 'live culture', 'biofermented', 'traditional fermented']
      },
      regulations: [
        { code: 'SNI 3144:2015', title: 'Tempe Kedelai — Syarat Mutu' },
        { code: 'SNI 01-3142:1992', title: 'Tahu — Syarat Mutu dan Cara Uji' },
        { code: 'PerKa BPOM No. 16/2016', title: 'Kriteria Mikrobiologi dalam Pangan Olahan' },
        { code: 'SNI 01-3711-1995', title: 'Cuka Makan — Syarat Mutu' }
      ],
      parameters: [
        { name: 'Moisture Content', unit: '% (max)', limit: '65.0', method: 'Gravimetric', type: 'mandatory', group: 'Physical-Chemical' },
        { name: 'Protein Content', unit: '% (min)', limit: '20.0 (tempeh)', method: 'Kjeldahl Method', type: 'mandatory', group: 'Nutritional' },
        { name: 'Fat Content', unit: '% (max)', limit: '10.0', method: 'Soxhlet Extraction', type: 'mandatory', group: 'Nutritional' },
        { name: 'pH', unit: '—', limit: 'Per product spec.', method: 'pH Meter', type: 'mandatory', group: 'Physical-Chemical' },
        { name: 'Titratable Acidity (vinegar)', unit: '% acetic acid (min)', limit: '4.0', method: 'Titrimetric', type: 'conditional', group: 'Physical-Chemical' },
        { name: 'Formalin (Formaldehyde)', unit: '—', limit: 'Not detected', method: 'Colorimetric / HPLC', type: 'mandatory', group: 'Illegal Additives' },
        { name: 'Benzoic Acid (tofu/tempeh)', unit: '—', limit: 'Not permitted', method: 'HPLC', type: 'mandatory', group: 'Illegal Additives' },
        { name: 'Lead (Pb)', unit: 'mg/kg (max)', limit: '0.10', method: 'AAS / ICP-MS', type: 'mandatory', group: 'Heavy Metals' },
        { name: 'Cadmium (Cd)', unit: 'mg/kg (max)', limit: '0.05', method: 'AAS / ICP-MS', type: 'mandatory', group: 'Heavy Metals' },
        { name: 'Total Plate Count (TPC)', unit: 'CFU/g (max)', limit: '1×10⁶', method: 'SNI 2897:2008', type: 'mandatory', group: 'Microbiological' },
        { name: 'E. coli', unit: 'APM/g (max)', limit: '<3', method: 'MPN Confirmatory', type: 'mandatory', group: 'Microbiological' },
        { name: 'Salmonella sp.', unit: 'per 25g', limit: 'Negative', method: 'ISO 6579', type: 'mandatory', group: 'Microbiological' },
        { name: 'Staphylococcus aureus', unit: 'CFU/g (max)', limit: '1×10²', method: 'SNI 2897:2008', type: 'mandatory', group: 'Microbiological' }
      ]
    },

    {
      id: 'cereal_grains',
      name: 'Cereal, Grain & Flour Products',
      description: 'Rice, wheat flour, corn flour, oatmeal, breakfast cereals, granola, muesli, and starch-based raw ingredients',
      icon: 'wheat',
      color: '#FCD34D',
      colorLight: 'rgba(252,211,77,0.12)',
      active: true,
      keywords: {
        high: ['rice', 'flour', 'wheat flour', 'oatmeal', 'cereal', 'granola', 'muesli', 'grain', 'corn flour', 'tapioca', 'starch', 'oat', 'beras'],
        medium: ['breakfast cereal', 'fortified cereal', 'whole grain', 'rolled oat', 'brown rice', 'white rice', 'semolina', 'bran', 'quinoa', 'terigu'],
        low: ['milled', 'refined grain', 'wholemeal', 'enriched flour', 'bleached flour']
      },
      regulations: [
        { code: 'SNI 6128:2015', title: 'Beras — Syarat Mutu' },
        { code: 'SNI 3751:2009', title: 'Tepung Terigu (Wheat Flour) — Syarat Mutu' },
        { code: 'SNI 01-3727-1995', title: 'Tepung Jagung — Syarat Mutu' },
        { code: 'PerKa BPOM No. 5/2018', title: 'Batas Maksimum Cemaran Logam Berat' }
      ],
      parameters: [
        { name: 'Moisture Content', unit: '% (max)', limit: '14.0 (rice) / 14.5 (flour)', method: 'Gravimetric (105°C)', type: 'mandatory', group: 'Physical-Chemical' },
        { name: 'Ash Content', unit: '% (max)', limit: '0.60 (wheat flour)', method: 'Gravimetric (550°C)', type: 'mandatory', group: 'Physical-Chemical' },
        { name: 'Protein Content', unit: '% (min)', limit: '7.0 (wheat flour)', method: 'Kjeldahl Method', type: 'mandatory', group: 'Nutritional' },
        { name: 'Crude Fiber', unit: '% (max)', limit: '0.4', method: 'Gravimetric', type: 'mandatory', group: 'Physical-Chemical' },
        { name: 'Gluten Content (wheat)', unit: '% wet gluten (min)', limit: '24.0', method: 'AOAC 38-11.02', type: 'conditional', group: 'Quality Indicators' },
        { name: 'Broken Grain (rice)', unit: '% (max)', limit: '2.0–25.0 (by grade)', method: 'Visual Sorting', type: 'mandatory', group: 'Quality Indicators' },
        { name: 'Aflatoxin B1', unit: 'μg/kg (max)', limit: '5', method: 'HPLC-FLD / ELISA', type: 'mandatory', group: 'Mycotoxins' },
        { name: 'Total Aflatoxins', unit: 'μg/kg (max)', limit: '10', method: 'HPLC-FLD / ELISA', type: 'mandatory', group: 'Mycotoxins' },
        { name: 'Deoxynivalenol (DON)', unit: 'μg/kg (max)', limit: '750', method: 'HPLC / LC-MS/MS', type: 'mandatory', group: 'Mycotoxins' },
        { name: 'Inorganic Arsenic (rice)', unit: 'mg/kg (max)', limit: '0.20', method: 'AAS / ICP-MS (speciation)', type: 'mandatory', group: 'Heavy Metals' },
        { name: 'Cadmium (Cd)', unit: 'mg/kg (max)', limit: '0.40', method: 'AAS / ICP-MS', type: 'mandatory', group: 'Heavy Metals' },
        { name: 'Lead (Pb)', unit: 'mg/kg (max)', limit: '0.20', method: 'AAS / ICP-MS', type: 'mandatory', group: 'Heavy Metals' },
        { name: 'Insect / Rodent Contamination', unit: '—', limit: 'Absent', method: 'Visual inspection (AOAC 945.75)', type: 'mandatory', group: 'Physical Contaminants' },
        { name: 'Total Plate Count (TPC)', unit: 'CFU/g (max)', limit: '1×10⁶', method: 'SNI 2897:2008', type: 'mandatory', group: 'Microbiological' },
        { name: 'Mold & Yeast', unit: 'CFU/g (max)', limit: '1×10⁴', method: 'SNI 2897:2008', type: 'mandatory', group: 'Microbiological' },
        { name: 'Salmonella sp.', unit: 'per 25g', limit: 'Negative', method: 'ISO 6579', type: 'mandatory', group: 'Microbiological' }
      ]
    },

    {
      id: 'ready_to_eat',
      name: 'Ready-to-Eat & Prepared Meals',
      description: 'Pre-packed sandwiches, salads, cooked rice boxes, bento meals, sushi, and commercially prepared fresh or chilled RTE foods',
      icon: 'utensils',
      color: '#34D399',
      colorLight: 'rgba(52,211,153,0.12)',
      active: true,
      keywords: {
        high: ['ready to eat', 'rte', 'prepared meal', 'bento', 'lunch box', 'sandwich', 'salad', 'sushi', 'cooked rice', 'takeaway', 'meal kit'],
        medium: ['pre-packed meal', 'heat and eat', 'microwave meal', 'chilled meal', 'catering food', 'meal prep', 'fresh prepared', 'wrap', 'nasi kotak'],
        low: ['convenience meal', 'on-the-go', 'pre-cooked', 'deli food', 'meal replacement']
      },
      regulations: [
        { code: 'PerKa BPOM No. 16/2016', title: 'Kriteria Mikrobiologi dalam Pangan Siap Saji' },
        { code: 'Permenkes 1096/2011', title: 'Higiene Sanitasi Jasaboga (Catering Hygiene Standard)' },
        { code: 'Codex CAC/RCP 39-1993', title: 'Code of Hygienic Practice for Pre-cooked and Cooked Foods' },
        { code: 'PerKa BPOM No. 5/2018', title: 'Batas Maksimum Cemaran Logam Berat' }
      ],
      parameters: [
        { name: 'Aerobic Plate Count', unit: 'CFU/g (max)', limit: '1×10⁵', method: 'SNI 2897:2008 pour plate', type: 'mandatory', group: 'Microbiological' },
        { name: 'E. coli', unit: 'APM/g (max)', limit: '<3', method: 'MPN Confirmatory', type: 'mandatory', group: 'Microbiological' },
        { name: 'Salmonella sp.', unit: 'per 25g', limit: 'Negative', method: 'ISO 6579', type: 'mandatory', group: 'Microbiological' },
        { name: 'Staphylococcus aureus', unit: 'CFU/g (max)', limit: '1×10²', method: 'SNI 2897:2008', type: 'mandatory', group: 'Microbiological' },
        { name: 'Bacillus cereus', unit: 'CFU/g (max)', limit: '1×10³', method: 'ISO 7932', type: 'mandatory', group: 'Microbiological' },
        { name: 'Listeria monocytogenes', unit: 'per 25g', limit: 'Negative', method: 'ISO 11290-1', type: 'mandatory', group: 'Microbiological' },
        { name: 'Clostridium perfringens', unit: 'CFU/g (max)', limit: '1×10²', method: 'ISO 7937', type: 'mandatory', group: 'Microbiological' },
        { name: 'Core Temperature (at service)', unit: '°C', limit: '≥60 (hot) / ≤5 (chilled)', method: 'Calibrated Thermometer', type: 'mandatory', group: 'Temperature Control' },
        { name: 'Water Activity (Aw)', unit: '—', limit: 'Per product type — report', method: 'Aw Meter / Dew Point', type: 'mandatory', group: 'Physical-Chemical' },
        { name: 'Protein Content', unit: '%', limit: 'Per label claim ±20%', method: 'Kjeldahl Method', type: 'mandatory', group: 'Nutritional' },
        { name: 'Total Fat', unit: '%', limit: 'Per label claim ±20%', method: 'Soxhlet Extraction', type: 'mandatory', group: 'Nutritional' },
        { name: 'Sodium', unit: 'mg/100g', limit: 'Report vs label', method: 'AAS / Flame Photometry', type: 'mandatory', group: 'Nutritional' },
        { name: 'Lead (Pb)', unit: 'mg/kg (max)', limit: '0.10', method: 'AAS / ICP-MS', type: 'mandatory', group: 'Heavy Metals' }
      ]
    },

    {
      id: 'traditional_snacks',
      name: 'Traditional Snacks (Jajanan Pasar)',
      description: 'Indonesian traditional snacks including onde-onde, kue lapis, klepon, lemper, risoles, martabak, and other sweet or savory traditional pastries',
      icon: 'star',
      color: '#F472B6',
      colorLight: 'rgba(244,114,182,0.12)',
      active: true,
      keywords: {
        high: ['risoles', 'lumpia', 'onde-onde', 'kue lapis', 'klepon', 'lemper', 'martabak', 'pastel', 'kroket', 'jajanan', 'kue tradisional', 'pukis'],
        medium: ['traditional cake', 'serabi', 'gethuk', 'nagasari', 'dadar gulung', 'lapis legit', 'kue putu', 'bika ambon', 'wingko', 'dodol', 'wajik'],
        low: ['jajanan pasar', 'ketan', 'glutinous rice snack', 'palm sugar snack', 'coconut snack', 'fried traditional cake']
      },
      regulations: [
        { code: 'PerKa BPOM No. 16/2016', title: 'Kriteria Mikrobiologi dalam Pangan Jalanan (Jajanan)' },
        { code: 'PerKa BPOM No. 5/2018', title: 'Batas Maksimum Cemaran Logam Berat' },
        { code: 'PerKa BPOM No. 11/2019', title: 'Bahan Tambahan Pangan Perisa dan Pewarna' },
        { code: 'SNI 7388:2009', title: 'Batas Maksimum Cemaran Mikroba dalam Pangan' }
      ],
      parameters: [
        { name: 'Moisture Content', unit: '% (max)', limit: '40.0', method: 'Gravimetric', type: 'mandatory', group: 'Physical-Chemical' },
        { name: 'Ash Content', unit: '% (max)', limit: '3.0', method: 'Gravimetric (550°C)', type: 'mandatory', group: 'Physical-Chemical' },
        { name: 'Total Fat', unit: '% (max)', limit: '30.0', method: 'Soxhlet Extraction', type: 'mandatory', group: 'Nutritional' },
        { name: 'Total Sugar', unit: '%', limit: 'Report', method: 'Luff-Schoorl', type: 'mandatory', group: 'Nutritional' },
        { name: 'Borax (Boron)', unit: '—', limit: 'Not detected', method: 'Colorimetric (Kunyit) / ICP-OES', type: 'mandatory', group: 'Illegal Additives' },
        { name: 'Formalin (Formaldehyde)', unit: '—', limit: 'Not detected', method: 'Colorimetric / HPLC', type: 'mandatory', group: 'Illegal Additives' },
        { name: 'Rhodamine B (illegal red dye)', unit: '—', limit: 'Not detected', method: 'TLC / HPLC', type: 'mandatory', group: 'Illegal Additives' },
        { name: 'Metanil Yellow (illegal yellow dye)', unit: '—', limit: 'Not detected', method: 'TLC / HPLC', type: 'mandatory', group: 'Illegal Additives' },
        { name: 'Permitted Artificial Colorants', unit: '—', limit: 'Type & limit per PerKa', method: 'TLC / HPLC', type: 'conditional', group: 'Additives' },
        { name: 'Benzoic Acid', unit: 'mg/kg (max)', limit: '1,000', method: 'HPLC', type: 'conditional', group: 'Additives' },
        { name: 'Lead (Pb)', unit: 'mg/kg (max)', limit: '0.50', method: 'AAS / ICP-MS', type: 'mandatory', group: 'Heavy Metals' },
{ name: 'Cadmium (Cd)', unit: 'mg/kg (max)', limit: '0.10', method: 'AAS / ICP-MS', type: 'mandatory', group: 'Heavy Metals' },
        { name: 'Total Plate Count (TPC)', unit: 'CFU/g (max)', limit: '1×10⁶', method: 'SNI 2897:2008', type: 'mandatory', group: 'Microbiological' },
        { name: 'E. coli', unit: 'APM/g (max)', limit: '<3', method: 'MPN Confirmatory', type: 'mandatory', group: 'Microbiological' },
        { name: 'Salmonella sp.', unit: 'per 25g', limit: 'Negative', method: 'ISO 6579', type: 'mandatory', group: 'Microbiological' },
        { name: 'Staphylococcus aureus', unit: 'CFU/g (max)', limit: '1×10³', method: 'SNI 2897:2008', type: 'mandatory', group: 'Microbiological' },
        { name: 'Mold & Yeast', unit: 'CFU/g (max)', limit: '1×10²', method: 'SNI 2897:2008', type: 'mandatory', group: 'Microbiological' }
      ]
    },

    {
      id: 'honey_bee_products',
      name: 'Honey & Bee Products',
      description: 'Raw honey, processed honey, propolis, royal jelly, bee pollen, and honey-based syrups',
      icon: 'hexagon',
      color: '#FBBF24',
      colorLight: 'rgba(251,191,36,0.12)',
      active: true,
      keywords: {
        high: ['honey', 'madu', 'royal jelly', 'propolis', 'bee pollen', 'comb honey', 'raw honey', 'nectar'],
        medium: ['syrup', 'sweetener', 'natural sweetener', 'apiary', 'honeycomb'],
        low: ['bee product', 'mead base', 'glucose', 'fructose']
      },
      regulations: [
        { code: 'SNI 8664:2018', title: 'Madu — Syarat Mutu' },
        { code: 'PerKa BPOM No. 5/2018', title: 'Batas Maksimum Cemaran Logam Berat' },
        { code: 'PerKa BPOM No. 8/2018', title: 'Batas Maksimum Cemaran Kimia' },
        { code: 'Codex STAN 12-1981', title: 'Standard for Honey' }
      ],
      parameters: [
        { name: 'Moisture Content', unit: '% (max)', limit: '22.0', method: 'Refractometer', type: 'mandatory', group: 'Physical-Chemical' },
        { name: 'Reducing Sugars', unit: '% (min)', limit: '65.0', method: 'Luff-Schoorl / HPLC', type: 'mandatory', group: 'Carbohydrates' },
        { name: 'Sucrose Content', unit: '% (max)', limit: '5.0', method: 'Luff-Schoorl / HPLC', type: 'mandatory', group: 'Carbohydrates' },
        { name: 'HMF (Hydroxymethylfurfural)', unit: 'mg/kg (max)', limit: '50', method: 'HPLC-UV / Spectrophotometric', type: 'mandatory', group: 'Quality Indicators' },
        { name: 'Diastase Activity', unit: 'Schade units (min)', limit: '3', method: 'Spectrophotometric (Schade)', type: 'mandatory', group: 'Enzymatic Activity' },
        { name: 'Acidity', unit: 'meq/kg (max)', limit: '50', method: 'Titrimetric', type: 'mandatory', group: 'Physical-Chemical' },
        { name: 'Water-insoluble Solids', unit: '% (max)', limit: '0.1', method: 'Gravimetric', type: 'mandatory', group: 'Physical-Chemical' },
        { name: 'Ash Content', unit: '% (max)', limit: '0.5', method: 'Gravimetric (600°C)', type: 'mandatory', group: 'Physical-Chemical' },
        { name: 'Chloramphenicol Residue', unit: 'μg/kg', limit: 'Not detected', method: 'LC-MS/MS / ELISA', type: 'mandatory', group: 'Drug Residues' },
        { name: 'Lead (Pb)', unit: 'mg/kg (max)', limit: '1.0', method: 'AAS / ICP-MS', type: 'mandatory', group: 'Heavy Metals' },
        { name: 'Cadmium (Cd)', unit: 'mg/kg (max)', limit: '0.2', method: 'AAS / ICP-MS', type: 'mandatory', group: 'Heavy Metals' },
        { name: 'Arsenic (As)', unit: 'mg/kg (max)', limit: '1.0', method: 'AAS / ICP-MS', type: 'mandatory', group: 'Heavy Metals' }
      ]
    },

    {
      id: 'sugar_sweeteners',
      name: 'Sugar & Sweeteners',
      description: 'Granulated sugar, brown sugar, palm sugar, stevia, artificial sweeteners, and sweetening syrups',
      icon: 'box',
      color: '#A1A1AA',
      colorLight: 'rgba(161,161,170,0.12)',
      active: true,
      keywords: {
        high: ['sugar', 'gula', 'sucrose', 'stevia', 'sweetener', 'palm sugar', 'brown sugar', 'gula aren', 'gula merah'],
        medium: ['aspartame', 'sucralose', 'saccharin', 'erythritol', 'xylitol', 'sorbitol', 'maltitol', 'syrup', 'molasses'],
        low: ['crystal sugar', 'powdered sugar', 'icing sugar', 'fructose', 'glucose']
      },
      regulations: [
        { code: 'SNI 3140.3:2010', title: 'Gula Kristal Putih — Syarat Mutu' },
        { code: 'PerKa BPOM No. 11/2019', title: 'BTP Pemanis (Sweetener Additives)' },
        { code: 'SNI 01-3743-1995', title: 'Gula Palma — Syarat Mutu' }
      ],
      parameters: [
        { name: 'Polarization (Sucrose)', unit: '°Z (min)', limit: '99.6', method: 'Polarimeter', type: 'mandatory', group: 'Physical-Chemical' },
        { name: 'Moisture Content', unit: '% (max)', limit: '0.1', method: 'Gravimetric (105°C)', type: 'mandatory', group: 'Physical-Chemical' },
        { name: 'Color (ICUMSA)', unit: 'IU (max)', limit: '300', method: 'Spectrophotometric (ICUMSA)', type: 'mandatory', group: 'Physical-Chemical' },
        { name: 'Ash Content', unit: '% (max)', limit: '0.1', method: 'Gravimetric / Conductometric', type: 'mandatory', group: 'Physical-Chemical' },
        { name: 'Reducing Sugars', unit: '% (max)', limit: '0.1', method: 'Titrimetric (Lane-Eynon)', type: 'mandatory', group: 'Physical-Chemical' },
        { name: 'Sulfur Dioxide (SO2)', unit: 'mg/kg (max)', limit: '30', method: 'Titrimetric / Monier-Williams', type: 'mandatory', group: 'Additives' },
        { name: 'Lead (Pb)', unit: 'mg/kg (max)', limit: '2.0', method: 'AAS / ICP-MS', type: 'mandatory', group: 'Heavy Metals' },
        { name: 'Arsenic (As)', unit: 'mg/kg (max)', limit: '1.0', method: 'AAS / ICP-MS', type: 'mandatory', group: 'Heavy Metals' },
        { name: 'Total Plate Count (TPC)', unit: 'CFU/10g (max)', limit: '250', method: 'SNI 2897:2008', type: 'mandatory', group: 'Microbiological' },
        { name: 'Yeast & Mold', unit: 'CFU/10g (max)', limit: '10', method: 'SNI 2897:2008', type: 'mandatory', group: 'Microbiological' }
      ]
    },

    {
      id: 'drinking_water',
      name: 'Drinking Water (AMDK)',
      description: 'Bottled mineral water, demineralized water, oxygenated water, and packaged drinking water products',
      icon: 'droplets',
      color: '#60A5FA',
      colorLight: 'rgba(96,165,250,0.12)',
      active: true,
      keywords: {
        high: ['water', 'air minum', 'amdk', 'mineral water', 'demineralized', 'bottled water', 'spring water', 'drinking water'],
        medium: ['oxygenated', 'purified water', 'ro water', 'reverse osmosis', 'distilled water', 'alkaline water'],
        low: ['gallon', 'cup water', 'hydration', 'pure water']
      },
      regulations: [
        { code: 'SNI 3554:2015', title: 'Air Minum Dalam Kemasan (AMDK)' },
        { code: 'Permenkes No. 492/2010', title: 'Persyaratan Kualitas Air Minum' },
        { code: 'PerKa BPOM No. 5/2018', title: 'Cemaran Logam Berat AMDK' }
      ],
      parameters: [
        { name: 'Odor & Taste', unit: '—', limit: 'Normal / Odorless', method: 'Sensory', type: 'mandatory', group: 'Sensory' },
        { name: 'pH', unit: '—', limit: '6.5–8.5 (mineral)', method: 'pH Meter', type: 'mandatory', group: 'Physical-Chemical' },
        { name: 'Turbidity', unit: 'NTU (max)', limit: '1.5', method: 'Turbidimeter', type: 'mandatory', group: 'Physical-Chemical' },
        { name: 'Color', unit: 'TCU (max)', limit: '5', method: 'Colorimeter / Pt-Co scale', type: 'mandatory', group: 'Physical-Chemical' },
        { name: 'Total Dissolved Solids (TDS)', unit: 'mg/L (max)', limit: '500 (mineral)', method: 'Gravimetric / TDS Meter', type: 'mandatory', group: 'Physical-Chemical' },
        { name: 'Nitrate (as NO3)', unit: 'mg/L (max)', limit: '45', method: 'Spectrophotometric', type: 'mandatory', group: 'Chemical Indicators' },
        { name: 'Nitrite (as NO2)', unit: 'mg/L (max)', limit: '0.005', method: 'Spectrophotometric', type: 'mandatory', group: 'Chemical Indicators' },
        { name: 'Fluoride (F)', unit: 'mg/L (max)', limit: '1.0', method: 'Ion Selective Electrode', type: 'mandatory', group: 'Chemical Indicators' },
        { name: 'Cyanide (CN)', unit: 'mg/L (max)', limit: '0.05', method: 'Spectrophotometric', type: 'mandatory', group: 'Chemical Indicators' },
        { name: 'Lead (Pb)', unit: 'mg/L (max)', limit: '0.005', method: 'AAS / ICP-MS', type: 'mandatory', group: 'Heavy Metals' },
        { name: 'Arsenic (As)', unit: 'mg/L (max)', limit: '0.01', method: 'AAS / ICP-MS', type: 'mandatory', group: 'Heavy Metals' },
        { name: 'Cadmium (Cd)', unit: 'mg/L (max)', limit: '0.003', method: 'AAS / ICP-MS', type: 'mandatory', group: 'Heavy Metals' },
        { name: 'Coliform (Total)', unit: 'per 250 mL', limit: 'Negative', method: 'Membrane Filtration', type: 'mandatory', group: 'Microbiological' },
        { name: 'Pseudomonas aeruginosa', unit: 'per 250 mL', limit: 'Negative', method: 'Membrane Filtration', type: 'mandatory', group: 'Microbiological' }
      ]
    },

    {
      id: 'coffee_tea',
      name: 'Coffee & Tea',
      description: 'Roasted coffee beans, ground coffee, instant coffee, tea leaves, tea bags, matcha, and herbal tea blends',
      icon: 'coffee',
      color: '#A16207',
      colorLight: 'rgba(161,98,7,0.12)',
      active: true,
      keywords: {
        high: ['coffee', 'tea', 'kopi', 'teh', 'matcha', 'instant coffee', 'ground coffee', 'tea bag', 'roasted coffee', 'green tea', 'black tea'],
        medium: ['decaf', 'espresso', 'oolong', 'white tea', 'herbal tea', 'caffeine', 'robusta', 'arabica', 'chamomile', 'peppermint'],
        low: ['brew', 'infusion', 'leaves', 'beans', 'beverage base']
      },
      regulations: [
        { code: 'SNI 01-3836-2006', title: 'Teh Kering Dalam Kemasan' },
        { code: 'SNI 01-3542-2004', title: 'Kopi Bubuk — Syarat Mutu' },
        { code: 'PerKa BPOM No. 5/2018', title: 'Batas Cemaran Logam Berat' },
        { code: 'PerKa BPOM No. 8/2018', title: 'Batas Cemaran Mikotoksin' }
      ],
      parameters: [
        { name: 'Moisture Content', unit: '% (max)', limit: '7.0', method: 'Gravimetric (105°C)', type: 'mandatory', group: 'Physical-Chemical' },
        { name: 'Ash Content', unit: '%', limit: 'Per spec', method: 'Gravimetric', type: 'mandatory', group: 'Physical-Chemical' },
        { name: 'Water Extract', unit: '% (min)', limit: '20.0 (coffee)', method: 'Gravimetric', type: 'mandatory', group: 'Physical-Chemical' },
        { name: 'Caffeine Content', unit: '%', limit: '0.45 - 2.0 (coffee)', method: 'HPLC / Kjeldahl', type: 'mandatory', group: 'Active Compounds' },
        { name: 'Ochratoxin A (coffee)', unit: 'μg/kg (max)', limit: '5.0', method: 'HPLC-FLD', type: 'mandatory', group: 'Mycotoxins' },
        { name: 'Lead (Pb)', unit: 'mg/kg (max)', limit: '2.0', method: 'AAS / ICP-MS', type: 'mandatory', group: 'Heavy Metals' },
        { name: 'Cadmium (Cd)', unit: 'mg/kg (max)', limit: '0.2', method: 'AAS / ICP-MS', type: 'mandatory', group: 'Heavy Metals' },
        { name: 'Total Plate Count (TPC)', unit: 'CFU/g (max)', limit: '10,000 (tea)', method: 'SNI 2897:2008', type: 'mandatory', group: 'Microbiological' },
        { name: 'Pesticide Residues', unit: '—', limit: 'Below MRL', method: 'GC-MS / LC-MS/MS', type: 'mandatory', group: 'Pesticide Residues' }
      ]
    },

    {
      id: 'alcoholic_beverages',
      name: 'Alcoholic Beverages',
      description: 'Beer, wine, spirits, traditional fermented alcohols (arak, tuak), liqueurs, and RTD mixed drinks',
      icon: 'beer',
      color: '#EAB308',
      colorLight: 'rgba(234,179,8,0.12)',
      active: true,
      keywords: {
        high: ['alcohol', 'beer', 'wine', 'spirit', 'liquor', 'vodka', 'whiskey', 'arak', 'tuak', 'ciu', 'brem'],
        medium: ['fermented drink', 'distilled spirit', 'liqueur', 'champagne', 'cider', 'rum', 'gin', 'tequila'],
        low: ['minuman beralkohol', 'khamr', 'ethanol', 'rtd alcohol', 'cocktail mix']
      },
      regulations: [
        { code: 'PerKa BPOM No. 14/2016', title: 'Standar Mutu Minuman Beralkohol' },
        { code: 'PerPres No. 74 Tahun 2013', title: 'Pengendalian Minuman Beralkohol' },
        { code: 'SNI 01-3140.1-2001', title: 'Bir — Syarat Mutu' }
      ],
      parameters: [
        { name: 'Ethanol (ABV)', unit: '% ABV', limit: 'Match Label Claim', method: 'GC-FID / Distillation', type: 'mandatory', group: 'Composition' },
        { name: 'Methanol', unit: 'mg/L (max)', limit: 'Strict limits', method: 'GC-FID', type: 'mandatory', group: 'Toxic Impurities' },
        { name: 'Higher Alcohols', unit: 'mg/L', limit: 'Per spec', method: 'GC-FID', type: 'conditional', group: 'Toxic Impurities' },
        { name: 'Total Acidity', unit: 'g/L', limit: 'Per spec', method: 'Titrimetric', type: 'mandatory', group: 'Physical-Chemical' },
        { name: 'Sulfur Dioxide (SO2)', unit: 'mg/L', limit: 'Per BPOM rules', method: 'Monier-Williams', type: 'mandatory', group: 'Additives' },
        { name: 'Lead (Pb)', unit: 'mg/L (max)', limit: '0.2', method: 'AAS / ICP-MS', type: 'mandatory', group: 'Heavy Metals' },
        { name: 'Total Plate Count (Beer/Wine)', unit: 'CFU/mL', limit: 'Per spec', method: 'SNI 2897:2008', type: 'mandatory', group: 'Microbiological' }
      ]
    },

    {
      id: 'cocoa_chocolate',
      name: 'Cocoa & Chocolate',
      description: 'Cocoa powder, cocoa butter, milk chocolate, dark chocolate, compound chocolate, and cocoa-based spreads',
      icon: 'cookie',
      color: '#713F12',
      colorLight: 'rgba(113,63,18,0.12)',
      active: true,
      keywords: {
        high: ['chocolate', 'cocoa', 'cokelat', 'kakao', 'cocoa powder', 'dark chocolate', 'white chocolate', 'milk chocolate'],
        medium: ['compound', 'cocoa butter', 'cacao', 'praline', 'truffle', 'ganache', 'chocolate mass'],
        low: ['cocoa liquor', 'nibs', 'spread', 'fondant', 'confectioners']
      },
      regulations: [
        { code: 'SNI 3747:2009', title: 'Kakao Bubuk — Syarat Mutu' },
        { code: 'SNI 7934:2014', title: 'Cokelat dan Produk Cokelat' },
        { code: 'PerKa BPOM No. 5/2018', title: 'Batas Cemaran Logam Berat' }
      ],
      parameters: [
        { name: 'Moisture Content', unit: '% (max)', limit: '5.0', method: 'Gravimetric / Karl Fischer', type: 'mandatory', group: 'Physical-Chemical' },
        { name: 'Fat Content (Cocoa Butter)', unit: '%', limit: '10.0 - 22.0+', method: 'Soxhlet Extraction', type: 'mandatory', group: 'Physical-Chemical' },
        { name: 'Total Ash Content', unit: '% (max)', limit: '8.0', method: 'Gravimetric (550°C)', type: 'mandatory', group: 'Physical-Chemical' },
        { name: 'pH (Alkalized Cocoa)', unit: '—', limit: '6.5 - 8.5', method: 'pH Meter', type: 'conditional', group: 'Physical-Chemical' },
        { name: 'Total Sugar (Chocolate)', unit: '%', limit: 'Label Claim', method: 'HPLC / Luff-Schoorl', type: 'mandatory', group: 'Nutritional' },
        { name: 'Lead (Pb)', unit: 'mg/kg (max)', limit: '1.0', method: 'AAS / ICP-MS', type: 'mandatory', group: 'Heavy Metals' },
        { name: 'Cadmium (Cd)', unit: 'mg/kg (max)', limit: '0.5 (chocolate)', method: 'AAS / ICP-MS', type: 'mandatory', group: 'Heavy Metals' },
        { name: 'Salmonella sp.', unit: 'per 25g', limit: 'Negative', method: 'ISO 6579', type: 'mandatory', group: 'Microbiological' },
        { name: 'Total Plate Count (TPC)', unit: 'CFU/g (max)', limit: '5,000', method: 'SNI 2897:2008', type: 'mandatory', group: 'Microbiological' }
      ]
    },

    {
      id: 'candy_confections',
      name: 'Candy & Sugar Confections',
      description: 'Hard candy, soft candy, gummy, marshmallow, nougat, caramel, pastilles, and chewing gum',
      icon: 'lollipop',
      color: '#EC4899',
      colorLight: 'rgba(236,72,153,0.12)',
      active: true,
      keywords: {
        high: ['candy', 'permen', 'gummy', 'marshmallow', 'lollipop', 'chewing gum', 'bubble gum', 'hard candy'],
        medium: ['soft candy', 'nougat', 'caramel', 'toffee', 'pastille', 'mint', 'jelly candy', 'fondant'],
        low: ['sweet', 'sugar confectionery', 'dragee', 'licorice']
      },
      regulations: [
        { code: 'SNI 3547.1:2008', title: 'Kembang Gula Keras (Hard Candy)' },
        { code: 'SNI 3547.2:2008', title: 'Kembang Gula Lunak (Soft Candy)' },
        { code: 'PerKa BPOM No. 11/2019', title: 'BTP Pewarna & Perisa' }
      ],
      parameters: [
        { name: 'Moisture Content', unit: '% (max)', limit: '3.5 (Hard) / 20.0 (Soft)', method: 'Gravimetric', type: 'mandatory', group: 'Physical-Chemical' },
        { name: 'Reducing Sugars', unit: '% (max)', limit: '24.0 (Hard Candy)', method: 'Luff-Schoorl', type: 'mandatory', group: 'Carbohydrates' },
        { name: 'Total Sugar', unit: '%', limit: 'Label Claim', method: 'HPLC', type: 'mandatory', group: 'Carbohydrates' },
        { name: 'Artificial Colorants', unit: '—', limit: 'Permitted BPOM only', method: 'TLC / HPLC', type: 'mandatory', group: 'Additives' },
        { name: 'Lead (Pb)', unit: 'mg/kg (max)', limit: '1.0', method: 'AAS / ICP-MS', type: 'mandatory', group: 'Heavy Metals' },
        { name: 'Copper (Cu)', unit: 'mg/kg (max)', limit: '2.0', method: 'AAS / ICP-MS', type: 'mandatory', group: 'Heavy Metals' },
        { name: 'Total Plate Count (TPC)', unit: 'CFU/g (max)', limit: '5,000', method: 'SNI 2897:2008', type: 'mandatory', group: 'Microbiological' },
        { name: 'Salmonella', unit: 'per 25g', limit: 'Negative', method: 'ISO 6579', type: 'mandatory', group: 'Microbiological' }
      ]
    },

    {
      id: 'herbal_jamu',
      name: 'Herbal & Jamu Products',
      description: 'Traditional medicines (Jamu), standardized herbal medicines (OHT), phytopharmaceuticals, and herbal extracts',
      icon: 'leaf',
      color: '#10B981',
      colorLight: 'rgba(16,185,129,0.12)',
      active: true,
      keywords: {
        high: ['jamu', 'herbal', 'obat tradisional', 'oht', 'fitofarmaka', 'extract', 'ekstrak', 'herbal capsule', 'simplisia'],
        medium: ['traditional medicine', 'ginger', 'turmeric', 'temulawak', 'moringa', 'ginseng', 'botanical'],
        low: ['tonic', 'remedy', 'plant extract', 'decoction']
      },
      regulations: [
        { code: 'PerKa BPOM No. 32/2019', title: 'Persyaratan Keamanan Obat Tradisional' },
        { code: 'PerKa BPOM No. 12/2014', title: 'Persyaratan Mutu Obat Tradisional' },
        { code: 'Farmakope Herbal', title: 'Monografi Ekstrak Tumbuhan' }
      ],
      parameters: [
        { name: 'Moisture Content', unit: '% (max)', limit: '10.0 (powder/capsule)', method: 'Gravimetric / Karl Fischer', type: 'mandatory', group: 'Physical-Chemical' },
        { name: 'Active Marker / Phytochemical', unit: 'mg/g', limit: 'Match Spec/Label', method: 'HPLC / GC', type: 'mandatory', group: 'Active Compounds' },
        { name: 'BKO (Adulterants)', unit: '—', limit: 'Negative', method: 'LC-MS/MS / TLC', type: 'mandatory', group: 'Adulterants' },
        { name: 'Total Aflatoxins', unit: 'μg/kg (max)', limit: '20.0', method: 'HPLC-FLD / ELISA', type: 'mandatory', group: 'Mycotoxins' },
        { name: 'Lead (Pb)', unit: 'mg/kg (max)', limit: '10.0', method: 'AAS / ICP-MS', type: 'mandatory', group: 'Heavy Metals' },
        { name: 'Arsenic (As)', unit: 'mg/kg (max)', limit: '5.0', method: 'AAS / ICP-MS', type: 'mandatory', group: 'Heavy Metals' },
        { name: 'Total Plate Count (TPC)', unit: 'CFU/g (max)', limit: '5×10⁷ (raw)', method: 'SNI 2897:2008', type: 'mandatory', group: 'Microbiological' },
        { name: 'Pathogens (E.coli, Salmonella)', unit: 'per g', limit: 'Negative', method: 'Standard Culture', type: 'mandatory', group: 'Microbiological' }
      ]
    },

    {
      id: 'edible_ices',
      name: 'Edible Ices & Sorbets',
      description: 'Water-based popsicles, sorbets, shaved ice desserts, ice lollies, and non-dairy frozen desserts',
      icon: 'popsicle',
      color: '#06B6D4',
      colorLight: 'rgba(6,182,212,0.12)',
      active: true,
      keywords: {
        high: ['popsicle', 'sorbet', 'ice lolly', 'es lilin', 'es puter', 'shaved ice', 'slushie'],
        medium: ['water ice', 'frozen dessert', 'non-dairy ice cream', 'granita', 'sno-cone'],
        low: ['frozen stick', 'icy treat', 'chilled snack']
      },
      regulations: [
        { code: 'PerKa BPOM No. 21/2016', title: 'Kategori Pangan (Es Untuk Dimakan)' },
        { code: 'PerKa BPOM No. 16/2016', title: 'Kriteria Mikrobiologi' }
      ],
      parameters: [
        { name: 'Total Solids', unit: '% (min)', limit: 'Per spec', method: 'Refractometer', type: 'mandatory', group: 'Physical-Chemical' },
        { name: 'Total Sugar', unit: '%', limit: 'Label Claim', method: 'HPLC / Luff-Schoorl', type: 'mandatory', group: 'Nutritional' },
        { name: 'Artificial Sweeteners', unit: '—', limit: 'Permitted BPOM only', method: 'HPLC', type: 'conditional', group: 'Additives' },
        { name: 'Artificial Colorants', unit: '—', limit: 'Permitted BPOM only', method: 'HPLC / TLC', type: 'mandatory', group: 'Additives' },
        { name: 'Total Plate Count (TPC)', unit: 'CFU/g (max)', limit: '100,000', method: 'SNI 2897:2008', type: 'mandatory', group: 'Microbiological' },
        { name: 'Coliform', unit: 'APM/g (max)', limit: '10', method: 'MPN', type: 'mandatory', group: 'Microbiological' }
      ]
    },

    {
      id: 'dried_fruits_nuts',
      name: 'Dried Fruits & Nuts',
      description: 'Roasted peanuts, mixed nuts, raisins, dried dates, candied fruits, dried mango, and seeds',
      icon: 'nut',
      color: '#D97706',
      colorLight: 'rgba(217,119,6,0.12)',
      active: true,
      keywords: {
        high: ['nut', 'kacang', 'dried fruit', 'raisin', 'kismis', 'kurma', 'dates', 'almond', 'cashew', 'peanut'],
        medium: ['roasted nut', 'seed', 'sunflower seed', 'pumpkin seed', 'candied fruit', 'manisan', 'pistachio', 'walnut'],
        low: ['trail mix', 'dehydrated fruit', 'fruit snack', 'kernel']
      },
      regulations: [
        { code: 'PerKa BPOM No. 5/2018', title: 'Cemaran Logam Berat' },
        { code: 'PerKa BPOM No. 8/2018', title: 'Cemaran Mikotoksin (Aflatoksin)' },
        { code: 'SNI 01-4218-1996', title: 'Kacang Garing — Syarat Mutu' }
      ],
      parameters: [
        { name: 'Moisture Content', unit: '% (max)', limit: '4.0 (nuts)', method: 'Gravimetric', type: 'mandatory', group: 'Physical-Chemical' },
        { name: 'Peroxide Value (Nuts)', unit: 'meq/kg (max)', limit: '10.0', method: 'Titrimetric (AOCS)', type: 'mandatory', group: 'Quality Indicators' },
        { name: 'Sulfur Dioxide (SO2) (Dried Fruit)', unit: 'mg/kg (max)', limit: '2000 (varies)', method: 'Monier-Williams', type: 'conditional', group: 'Additives' },
        { name: 'Total Aflatoxins (Nuts)', unit: 'μg/kg (max)', limit: '10.0', method: 'HPLC-FLD / ELISA', type: 'mandatory', group: 'Mycotoxins' },
        { name: 'Lead (Pb)', unit: 'mg/kg (max)', limit: '0.2', method: 'AAS / ICP-MS', type: 'mandatory', group: 'Heavy Metals' },
        { name: 'Total Plate Count', unit: 'CFU/g (max)', limit: '10,000', method: 'SNI 2897:2008', type: 'mandatory', group: 'Microbiological' }
      ]
    },

    {
      id: 'egg_products',
      name: 'Egg & Egg Products',
      description: 'Salted eggs, century eggs, liquid egg, egg powder, frozen egg yolk, and processed egg albumen',
      icon: 'egg',
      color: '#FCD34D',
      colorLight: 'rgba(252,211,77,0.12)',
      active: true,
      keywords: {
        high: ['egg', 'telur', 'telur asin', 'salted egg', 'egg powder', 'liquid egg', 'century egg', 'tepung telur'],
        medium: ['egg yolk', 'egg white', 'albumen', 'pasteurized egg', 'pidan'],
        low: ['avian egg', 'poultry product', 'dried egg', 'meringue powder']
      },
      regulations: [
        { code: 'SNI 4301:2020', title: 'Telur Asin — Syarat Mutu' },
        { code: 'PerKa BPOM No. 16/2016', title: 'Kriteria Mikrobiologi Pangan Olahan' },
        { code: 'PerKa BPOM No. 5/2018', title: 'Logam Berat' }
      ],
      parameters: [
        { name: 'Moisture Content (Powder)', unit: '% (max)', limit: '5.0', method: 'Gravimetric', type: 'mandatory', group: 'Physical-Chemical' },
        { name: 'Salt (NaCl) Content (Salted Egg)', unit: '%', limit: '2.0 - 5.0+', method: 'Mohr Titration', type: 'mandatory', group: 'Physical-Chemical' },
        { name: 'Protein Content', unit: '%', limit: 'Label Claim / Spec', method: 'Kjeldahl Method', type: 'mandatory', group: 'Nutritional' },
        { name: 'Sudan Red / Sudan Dyes', unit: '—', limit: 'Not detected', method: 'LC-MS/MS', type: 'mandatory', group: 'Illegal Additives' },
        { name: 'Salmonella', unit: 'per 25g', limit: 'Negative', method: 'ISO 6579', type: 'mandatory', group: 'Microbiological' },
        { name: 'Total Plate Count (Pasteurized)', unit: 'CFU/g (max)', limit: '50,000', method: 'SNI 2897:2008', type: 'mandatory', group: 'Microbiological' }
      ]
    },

    {
      id: 'coconut_products',
      name: 'Coconut Products',
      description: 'Coconut milk, coconut cream, desiccated coconut, virgin coconut oil (VCO), coconut water, and nata de coco',
      icon: 'tree-palm',
      color: '#A3E635',
      colorLight: 'rgba(163,230,53,0.12)',
      active: true,
      keywords: {
        high: ['coconut', 'kelapa', 'santan', 'coconut milk', 'coconut cream', 'vco', 'nata de coco', 'desiccated coconut'],
        medium: ['coconut water', 'kelapa parut', 'coconut butter', 'kopra', 'copra'],
        low: ['palm fruit', 'coconut oil', 'maca', 'coconut shreds']
      },
      regulations: [
        { code: 'SNI 7381:2008', title: 'Virgin Coconut Oil (VCO)' },
        { code: 'SNI 01-3816-1995', title: 'Kelapa Parut Kering (Desiccated Coconut)' },
        { code: 'SNI 01-4320-1996', title: 'Nata de Coco' }
      ],
      parameters: [
        { name: 'Moisture Content', unit: '% (max)', limit: '0.2 (VCO) / 3.0 (Desiccated)', method: 'Gravimetric / Karl Fischer', type: 'mandatory', group: 'Physical-Chemical' },
        { name: 'Fat Content', unit: '% (min)', limit: 'Per spec', method: 'Soxhlet / Rose-Gottlieb', type: 'mandatory', group: 'Macronutrients' },
        { name: 'Free Fatty Acid (VCO)', unit: '% as Lauric (max)', limit: '0.2', method: 'Titrimetric (AOCS)', type: 'mandatory', group: 'Quality Indicators' },
        { name: 'Peroxide Value (VCO)', unit: 'meq/kg (max)', limit: '2.0', method: 'Titrimetric (AOCS)', type: 'mandatory', group: 'Quality Indicators' },
        { name: 'pH (Nata / Coconut Water)', unit: '—', limit: 'Per spec', method: 'pH Meter', type: 'conditional', group: 'Physical-Chemical' },
        { name: 'Sulfur Dioxide (Desiccated)', unit: 'mg/kg (max)', limit: '50', method: 'Monier-Williams', type: 'mandatory', group: 'Additives' },
        { name: 'Salmonella', unit: 'per 25g', limit: 'Negative', method: 'ISO 6579', type: 'mandatory', group: 'Microbiological' }
      ]
    },

    {
      id: 'food_packaging',
      name: 'Food Contact Materials',
      description: 'Plastics, paper, metal cans, ceramics, and glass packaging directly interacting with food',
      icon: 'package',
      color: '#94A3B8',
      colorLight: 'rgba(148,163,184,0.12)',
      active: true,
      keywords: {
        high: ['packaging', 'kemasan', 'food grade', 'food contact', 'plastic', 'can', 'botol', 'paperboard'],
        medium: ['migration', 'BPA', 'phthlates', 'styrofoam', 'PET', 'PP', 'HDPE', 'LDPE', 'kaleng'],
        low: ['wrapper', 'seal', 'film', 'barrier', 'container']
      },
      regulations: [
        { code: 'PerKa BPOM No. 20/2019', title: 'Kemasan Pangan' },
        { code: 'SNI 7323:2008', title: 'Plastik untuk Kemasan Makanan' }
      ],
      parameters: [
        { name: 'Overall Migration', unit: 'mg/dm²', limit: '≤ 10', method: 'Gravimetric (EN 1186)', type: 'mandatory', group: 'Migration Testing' },
        { name: 'Specific Migration of Heavy Metals', unit: 'mg/kg', limit: 'Per BPOM Limits', method: 'ICP-OES / ICP-MS', type: 'mandatory', group: 'Specific Migration' },
        { name: 'Specific Migration of BPA (Polycarbonate)', unit: 'mg/kg (max)', limit: '0.05', method: 'HPLC-UV / LC-MS/MS', type: 'conditional', group: 'Specific Migration' },
        { name: 'Specific Migration of Formaldehyde', unit: 'mg/kg (max)', limit: '15.0', method: 'Spectrophotometric / HPLC', type: 'conditional', group: 'Specific Migration' },
        { name: 'Specific Migration of Phthalates', unit: 'mg/kg', limit: 'Per BPOM Limits', method: 'GC-MS', type: 'conditional', group: 'Specific Migration' },
        { name: 'Fluorescent Brighteners (Paper)', unit: '—', limit: 'Negative migration', method: 'UV Lamp / Extraction', type: 'conditional', group: 'Material Analysis' }
      ]
    },

    {
      id: 'pet_food',
      name: 'Pet Food & Animal Feed',
      description: 'Dry kibble, wet canned food, treats, and supplements for domestic pets (dogs, cats, birds, fish)',
      icon: 'paw-print',
      color: '#A8A29E',
      colorLight: 'rgba(168,162,158,0.12)',
      active: true,
      keywords: {
        high: ['pet food', 'dog food', 'cat food', 'pakan hewan', 'kibble', 'wet food', 'pet treat'],
        medium: ['animal feed', 'bird seed', 'fish pellet', 'canine', 'feline'],
        low: ['pet supplement', 'bone', 'chew', 'biscuit hewan']
      },
      regulations: [
        { code: 'PerMentan No. 22/2017', title: 'Pendaftaran Pakan Hewan Kesayangan' },
        { code: 'SNI 7980:2014', title: 'Pakan Kucing (Cat Food)' },
        { code: 'AAFCO', title: 'Pet Food Nutrient Profiles (Reference)' }
      ],
      parameters: [
        { name: 'Moisture Content', unit: '% (max)', limit: '12.0 (Dry)', method: 'Gravimetric', type: 'mandatory', group: 'Proximate Analysis' },
        { name: 'Crude Protein', unit: '% (min)', limit: 'Label Claim', method: 'Kjeldahl Method', type: 'mandatory', group: 'Proximate Analysis' },
        { name: 'Crude Fat', unit: '% (min)', limit: 'Label Claim', method: 'Acid Hydrolysis / Soxhlet', type: 'mandatory', group: 'Proximate Analysis' },
        { name: 'Taurine (Cat Food)', unit: '% (min)', limit: '0.1 (Dry)', method: 'HPLC', type: 'conditional', group: 'Amino Acids' },
        { name: 'Aflatoxin B1', unit: 'μg/kg (max)', limit: '20.0', method: 'HPLC-FLD / ELISA', type: 'mandatory', group: 'Mycotoxins' },
        { name: 'Salmonella', unit: 'per 25g', limit: 'Negative', method: 'ISO 6579', type: 'mandatory', group: 'Microbiological' },
        { name: 'Melamine', unit: 'mg/kg (max)', limit: '2.5', method: 'LC-MS/MS', type: 'mandatory', group: 'Adulterants' }
      ]
    },

    {
      id: 'cosmetics',
      name: 'Cosmetics & Personal Care',
      description: 'Skincare, makeup, hair care, body lotions, soaps, perfumes, and other topical cosmetic preparations',
      icon: 'spray-can',
      color: '#F43F5E',
      colorLight: 'rgba(244,63,94,0.12)',
      active: true,
      keywords: {
        high: ['cosmetic', 'skincare', 'makeup', 'kosmetik', 'lotion', 'cream', 'serum', 'soap', 'shampoo', 'perfume'],
        medium: ['hair care', 'body wash', 'lipstick', 'foundation', 'sunscreen', 'deodorant', 'toner', 'cleanser'],
        low: ['personal care', 'topical', 'beauty', 'pomade', 'balm']
      },
      regulations: [
        { code: 'PerKa BPOM No. 12/2019', title: 'Cemaran dalam Kosmetika' },
        { code: 'PerKa BPOM No. 23/2019', title: 'Persyaratan Teknis Bahan Kosmetika' },
        { code: 'ASEAN Cosmetic Directive', title: 'ACD Annexes' }
      ],
      parameters: [
        { name: 'pH (Aqueous/Emulsion)', unit: '—', limit: 'Varies (typically 4.5-8.0)', method: 'pH Meter', type: 'mandatory', group: 'Physical-Chemical' },
        { name: 'Lead (Pb)', unit: 'mg/kg (max)', limit: '20', method: 'AAS / ICP-MS', type: 'mandatory', group: 'Heavy Metals' },
        { name: 'Arsenic (As)', unit: 'mg/kg (max)', limit: '5', method: 'AAS / ICP-MS', type: 'mandatory', group: 'Heavy Metals' },
        { name: 'Mercury (Hg)', unit: 'mg/kg (max)', limit: '1', method: 'AAS / Cold Vapor', type: 'mandatory', group: 'Heavy Metals' },
        { name: 'Hydroquinone', unit: '—', limit: 'Negative', method: 'HPLC', type: 'conditional', group: 'Prohibited Substances' },
        { name: 'Total Aerobic Microbial Count (TAMC)', unit: 'CFU/g (max)', limit: '1,000 (Adult)', method: 'Plate Count (ISO 21149)', type: 'mandatory', group: 'Microbiological' },
        { name: 'Pseudomonas aeruginosa', unit: 'per 1g/mL', limit: 'Negative', method: 'ISO 22717', type: 'mandatory', group: 'Microbiological' }
      ]
    }
  ]
};

export default BPOM_DB;
