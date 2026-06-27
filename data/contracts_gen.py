import pandas as pd
import os
import glob
import json
import re
from pathlib import Path

df = pd.read_excel('D:/Website Project/Website Logo and images/contracts.xlsx')
# Filter: has delivered link, not Marla Davidson-Currie, not empty title
df = df[
    df['Delivered'].notna() & 
    (df['Delivered'].astype(str).str.strip() != '') & 
    (~df['Client Name'].astype(str).str.contains('Marla Davidson-Currie', na=False)) &
    (df['Title'].astype(str).str.strip() != '')
]

# Sources
public_contracts = 'D:/Website Project/nazia-portfolio-vite/public/Contracts'
type_source = 'D:/Website Project/Website Logo and images/Contracts'
portraits_dir = 'D:/Website Project/nazia-portfolio-vite/public/Portraits'
existing_folders = set(os.listdir(public_contracts)) if os.path.exists(public_contracts) else set()

# Find matching folder (case-insensitive, partial match)
def find_folder(folder_name, existing):
    # Exact match
    if folder_name in existing:
        return folder_name
    # Case-insensitive
    for f in existing:
        if f.lower() == folder_name.lower():
            return f
    # Substring match
    best = None
    best_len = 0
    for f in existing:
        fl = f.lower()
        fnl = folder_name.lower()
        if fnl in fl or fl in fnl:
            if len(f) > best_len:
                best = f
                best_len = len(f)
    return best

contracts = []
for _, row in df.iterrows():
    delivered = str(row['Delivered']).strip()
    # Folder name is the part after "Contracts\\\\"
    folder_name = delivered.replace('Contracts\\\', '', 1).strip('/\\')
    matched_folder = find_folder(folder_name, existing_folders)
    
    if not matched_folder:
        print(f"No matching folder found for: {folder_name} (skipping)")
        continue
    
    # Get images from matched folder
    folder_path = os.path.join(public_contracts, matched_folder)
    images = []
    allowed_exts = ('.png', '.jpg', '.jpeg', '.gif', '.webp', '.avif')
    if os.path.isdir(folder_path):
        for f in sorted(os.listdir(folder_path)):
            if f.lower().endswith(allowed_exts):
                path = f"/Contracts/{matched_folder}/{f}"
                images.append(path)
    
    # Skip if no images found
    if not images:
        print(f"No images in folder: {matched_folder} (skipping)")
        continue
    
    # Get client photo
    client_photo = str(row.get('Client Photo', '') or '').strip()
    if client_photo and client_photo != 'nan':
        # Convert paths like "Portraits\\\\Name.jpg" to "/Portraits/Name.jpg"
        if 'Portraits' in client_photo:
            parts = client_photo.split('Portraits')
            if len(parts) > 1:
                client_photo = '/Portraits' + parts[-1].lstrip('/\\')
            else:
                client_photo = ''
        else:
            client_photo = ''
    else:
        client_photo = ''
    
    contract = {
        "id": int(row['S/N']),
        "serial": int(row['S/N']),
        "title": str(row['Title']),
        "company": str(row.get('Company / Team Name', '') or ''),
        "rating": int(row['Rating']) if pd.notna(row['Rating']) else 5,
        "clientName": str(row['Client Name']),
        "clientPhoto": client_photo,
        "feedback": str(row.get('Client Feedback', '') or ''),
        "category": str(row.get('Category', '') or ''),
        "delivered": images[0] if images else "",
        "allImages": images[:6]  # max 6 images
    }
    contracts.append(contract)

(Float(cherry-picking best 100: assuming >=80 checks))

# Write contracts.json
out_path = 'D:/Website Project/nazia-portfolio-vite/public/data/contracts.json'
os.makedirs(os.path.dirname(out_path), exist_ok=True)
with open(out_path, 'w', encoding='utf-8') as f:
    json.dump(contracts, f, indent=2, ensure_ascii=False)

print(f"Generated {len(contracts)} contracts")
