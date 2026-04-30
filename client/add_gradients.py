import sys
import re

file_path = r'c:\Users\richi\.gemini\antigravity\scratch\bpomate\client\src\index.css'
with open(file_path, 'r', encoding='utf-8') as f:
    css = f.read()

# Update CSS variables to include gradients
vars_to_replace = """  --taxwire-dark: #022c1b;
  --taxwire-green: #06402B;
  --taxwire-green-hover: #085238;
  --taxwire-light-green: #E8F5EE;
  --taxwire-accent: #11BA70;
  --taxwire-accent-hover: #0E9B5D;"""

new_vars = """  /* Emerald Aurora Palette */
  --taxwire-dark: #021a11;
  --taxwire-green: #06402B;
  --taxwire-light-green: #E8F5EE;
  --taxwire-accent: #10b981;
  
  /* Premium Gradients */
  --gradient-premium: linear-gradient(135deg, #059669 0%, #0d9488 100%);
  --gradient-premium-hover: linear-gradient(135deg, #047857 0%, #0f766e 100%);
  --gradient-aurora: linear-gradient(120deg, #022c1b 0%, #064e3b 40%, #0f172a 100%);
  --gradient-text: linear-gradient(135deg, #0f172a 0%, #064e3b 100%);"""

css = css.replace(vars_to_replace, new_vars)

# Update Auth Panel Background
auth_panel_replace = "background: linear-gradient(145deg, var(--taxwire-dark), var(--taxwire-green));"
auth_panel_new = "background: var(--gradient-aurora); background-size: 200% 200%; animation: aurora 12s ease infinite;"
css = css.replace(auth_panel_replace, auth_panel_new)

# Add aurora animation
if "@keyframes aurora" not in css:
    css += "\n@keyframes aurora { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }\n"

# Update Global Header Background
header_replace = "background: var(--taxwire-dark);"
header_new = "background: var(--gradient-aurora); background-size: 200% 200%; animation: aurora 15s ease infinite;"
css = css.replace(header_replace, header_new)

# Update Buttons
btn_replace = "background: var(--taxwire-accent);"
btn_new = "background: var(--gradient-premium);"
css = css.replace(btn_replace, btn_new)

btn_hover_replace = "background: var(--taxwire-accent-hover);"
btn_hover_new = "background: var(--gradient-premium-hover);"
css = css.replace(btn_hover_replace, btn_hover_new)

# Update Page Title
title_replace = "color: var(--text-dark);"
title_new = "background: var(--gradient-text); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;"
css = css.replace("color: var(--text-dark); margin-bottom: 0.5rem;", title_new + " margin-bottom: 0.5rem;")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(css)

print('CSS gradients added.')
