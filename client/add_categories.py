import sys
import re

new_cats = [
    ("canned_fruits", "Canned Fruits", "Fruits preserved in syrup or juice in cans", "apple", "high: ['canned fruit', 'peach', 'pineapple', 'syrup']"),
    ("canned_vegetables", "Canned Vegetables", "Vegetables preserved in brine or water", "carrot", "high: ['canned vegetable', 'peas', 'corn', 'beans']"),
    ("canned_meat", "Canned Meat", "Meat products sterilized in cans", "beef", "high: ['canned meat', 'corned beef', 'spam']"),
    ("dried_fruits", "Dried Fruits", "Dehydrated fruits like raisins, dates, apricots", "apple", "high: ['dried fruit', 'raisin', 'dates', 'prunes']"),
    ("dried_vegetables", "Dried Vegetables", "Dehydrated vegetables and mushrooms", "carrot", "high: ['dried vegetable', 'mushroom', 'seaweed']"),
    ("dried_fish", "Dried Fish", "Salted and dried fish products", "fish", "high: ['dried fish', 'ikan asin', 'anchovy']"),
    ("smoked_fish", "Smoked Fish", "Fish preserved by smoking", "fish", "high: ['smoked fish', 'ikan asap', 'salmon']"),
    ("processed_nuts", "Processed Nuts & Seeds", "Roasted, salted, or flavored nuts", "nut_off", "high: ['nut', 'peanut', 'almond', 'cashew']"),
    ("jams_jellies", "Jams & Jellies", "Fruit preserves, jams, marmalades", "droplet", "high: ['jam', 'jelly', 'marmalade', 'selai']"),
    ("chocolate_products", "Chocolate Products", "Milk, dark, and white chocolate bars", "box", "high: ['chocolate', 'cokelat', 'dark chocolate']"),
    ("cocoa_powder", "Cocoa Powder", "Processed cocoa powder for baking or drinking", "coffee", "high: ['cocoa powder', 'bubuk cokelat']"),
    ("coffee_beans", "Coffee Beans & Ground", "Roasted coffee beans and ground coffee", "coffee", "high: ['coffee', 'kopi', 'roasted bean']"),
    ("tea_leaves", "Tea Leaves", "Black, green, oolong, and herbal teas", "leaf", "high: ['tea', 'teh', 'green tea', 'black tea']"),
    ("plant_based_milks", "Plant-Based Milks", "Soy milk, almond milk, oat milk", "milk", "high: ['soy milk', 'almond milk', 'oat milk', 'susu kedelai']"),
    ("condensed_milk", "Condensed Milk", "Sweetened condensed milk and evaporated milk", "milk", "high: ['condensed milk', 'susu kental manis']"),
    ("cheese_hard", "Hard Cheeses", "Cheddar, parmesan, gouda cheeses", "cheese", "high: ['cheese', 'keju', 'cheddar', 'parmesan']"),
    ("cheese_soft", "Soft Cheeses", "Mozzarella, brie, cream cheese", "cheese", "high: ['soft cheese', 'mozzarella', 'cream cheese']"),
    ("butter_ghee", "Butter & Ghee", "Dairy butter and clarified butter", "box", "high: ['butter', 'mentega', 'ghee']"),
    ("margarine_spreads", "Margarine & Spreads", "Plant-based spreads and margarine", "box", "high: ['margarine', 'margarin', 'spread']"),
    ("mayonnaise_dressings", "Mayonnaise & Dressings", "Salad dressings and mayonnaise", "droplet", "high: ['mayonnaise', 'dressing', 'salad dressing']"),
    ("mustard_relishes", "Mustard & Relishes", "Mustard paste and pickle relishes", "droplet", "high: ['mustard', 'relish']"),
    ("table_salt", "Table Salt", "Iodized table salt and sea salt", "box", "high: ['salt', 'garam', 'sea salt']"),
    ("vinegar", "Vinegar Products", "Apple cider, white, and balsamic vinegar", "flask-conical", "high: ['vinegar', 'cuka', 'balsamic']"),
    ("soy_products", "Processed Soy Products", "Tofu, soy meat, textured vegetable protein", "box", "high: ['tofu', 'tahu', 'tvp', 'soy meat']"),
    ("energy_bars", "Energy & Protein Bars", "Fortified snack bars", "zap", "high: ['energy bar', 'protein bar', 'snack bar']"),
    ("protein_powders", "Protein Powders", "Whey, soy, and pea protein isolates", "activity", "high: ['protein powder', 'whey', 'isolate']"),
    ("pastries_cakes", "Pastries & Cakes", "Freshly baked cakes, croissants, and pastries", "star", "high: ['cake', 'pastry', 'croissant', 'pie']"),
]

colors = ['#F59E0B', '#60A5FA', '#34D399', '#FB923C', '#F87171', '#A78BFA', '#E879F9', '#2DD4BF', '#FCD34D', '#86EFAC', '#38BDF8', '#C084FC', '#F472B6', '#FBBF24', '#A1A1AA']

js_str = ""
for i, cat in enumerate(new_cats):
    cid, name, desc, icon, keywords = cat
    color = colors[i % len(colors)]
    
    js_str += f'''
    ,{{
      id: '{cid}',
      name: '{name}',
      description: '{desc}',
      icon: '{icon}',
      color: '{color}',
      colorLight: 'rgba(200,200,200,0.1)',
      active: true,
      keywords: {{
        {keywords},
        medium: ['processed', 'food', 'product'],
        low: ['edible', 'consumable']
      }},
      regulations: [
        {{ code: 'SNI General', title: 'Syarat Mutu Umum' }},
        {{ code: 'PerKa BPOM No. 5/2018', title: 'Cemaran Logam Berat' }}
      ],
      parameters: [
        {{ name: 'Moisture', unit: '%', limit: 'Report', method: 'Gravimetric', type: 'mandatory', group: 'Physical' }},
        {{ name: 'Lead (Pb)', unit: 'mg/kg', limit: '0.5', method: 'ICP-MS', type: 'mandatory', group: 'Heavy Metals' }},
        {{ name: 'TPC', unit: 'CFU/g', limit: '1x10^5', method: 'Plate Count', type: 'mandatory', group: 'Microbiological' }}
      ]
    }}'''

file_path = r'c:\Users\richi\.gemini\antigravity\scratch\bpomate\client\src\regulations.js'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

end_idx = content.rfind('    }\n  ]\n};')
if end_idx != -1:
    new_content = content[:end_idx + 5] + js_str + content[end_idx + 5:]
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Added 27 new categories successfully.")
else:
    print("Could not find insertion point.")
