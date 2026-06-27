import json
import os
from pathlib import Path

# Read cards data
def parse_cards_xlsx():
    cards_data = []
    
    # Map from the Cards.xlsx file we saw earlier
    # This simulates reading the Excel file - in real scenario we'd use pandas/openpyxl
    # But for now, I'll extract from the earlier read
    
    # Actually, let's read from the actual Excel file
    try:
        import pandas as pd
        df = pd.read_excel('E:/Nazia-Porfolio/Cards.xlsx')
        print(f"Read {len(df)} cards from Excel")
        
        for _, row in df.iterrows():
            # Get the contract folder name from Delivered column
            delivered_path = str(row['Delivered']).strip()
            if pd.isna(delivered_path) or delivered_path == 'nan' or not delivered_path:
                continue
                
            # Extract folder name (remove leading/trailing slashes, get last part)
            folder_name = delivered_path.strip('/\\').split('/')[-1].split('\\')[-1]
            
            # Look for images in the contract folder
            contract_folder_path = f"E:/Nazia-Porfolio/Contracts/{folder_name}"
            image_paths = []
            
            if os.path.exists(contract_folder_path):
                for file in os.listdir(contract_folder_path):
                    if file.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg')):
                        # Exclude logo-footer.png from "Remake Image as Editable File"
                        if folder_name == "Remake Image as Editable File" and file.lower() == "logo-footer.png":
                            continue
                        image_paths.append(f"Contracts/{folder_name}/{file}")
                image_paths.sort()  # Consistent ordering
            else:
                # Fallback: try with quotes/escaped chars handled
                folder_name_clean = folder_name.replace('!', '').replace('?', '').replace('.', '').replace(' ', '_')
                contract_folder_path = f"E:/Nazia-Porfolio/Contracts/{folder_name_clean}"
                if os.path.exists(contract_folder_path):
                    for file in os.listdir(contract_folder_path):
                        if file.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg')):
                            # Exclude logo-footer.png from "Remake Image as Editable File"
                            if folder_name_clean == "Remake Image as Editable File" and file.lower() == "logo-footer.png":
                                continue
                            image_paths.append(f"Contracts/{folder_name_clean}/{file}")
                    image_paths.sort()
            
            # Handle NaN values properly
            def clean_str(val, default=""):
                if pd.isna(val) or str(val).strip().lower() in ('nan', 'nat', 'none', ''):
                    return default
                return str(val).strip()
            
            def clean_int(val, default=5):
                try:
                    return int(val)
                except (ValueError, TypeError):
                    return default
            
            if image_paths:  # Only add cards that have images
                card = {
                    "id": len(cards_data) + 1,
                    "serial": clean_int(row['S/N'], len(cards_data) + 1),
                    "title": clean_str(row['Title'], f"Card {len(cards_data) + 1}"),
                    "company": clean_str(row['Company / Team Name']),
                    "rating": clean_int(row['Rating'], 5),
                    "clientName": clean_str(row['Client Name']),
                    "clientPhoto": clean_str(row['Client Photo']).replace('\\', '/'),
                    "feedback": clean_str(row['Client Feedback']),
                    "category": clean_str(row['Category']),
                    "delivered": image_paths[0] if image_paths else "",
                    "allImages": image_paths
                }
                cards_data.append(card)
                
        print(f"Generated {len(cards_data)} cards with images")
        return cards_data
        
    except Exception as e:
        print(f"Error processing Excel: {e}")
        # Fallback: generate from the data we saw earlier in read_file output
        return generate_fallback_cards()

def generate_fallback_cards():
    """Generate cards based on the Excel data we saw in read_file"""
    # This is a simplified version - in reality we'd parse the actual Excel
    cards_data = [
        {
            "id": 1,
            "serial": 1,
            "title": "yet another isolation",
            "company": "Martin Laschkolnig",
            "rating": 5,
            "clientName": "Martin Laschkolnig",
            "clientPhoto": "Portraits/Martin Laschkolnig.jpeg",
            "feedback": "Absolute 5* experience, great job well done!",
            "category": "Photo Editing /  Background Removal",
            "delivered": "Contracts/yet another isolation/Delivered Image.png",
            "allImages": ["Contracts/yet another isolation/Delivered Image.png"]
        },
        {
            "id": 2,
            "serial": 2,
            "title": "Vectorize Image In Adobe Illustrator",
            "company": "Domonique M",
            "rating": 5,
            "clientName": "Domonique M",
            "clientPhoto": "Portraits/Domonique M.jpg",
            "feedback": "Nazia was amazing!!! Her communication is excellent. There were no language barriers at all. I needed a PNG file to be converted to AI and she did it with no problem all within the same day of hiring her. When I realized I made a mistake on the file, she fixed it with no problem and was willing to make any changes if needed. Anyone else who hires her will not be disappointed. I'll be coming back for more work",
            "category": "Vector Conversion / Vectorization / Image to Vector",
            "delivered": "Contracts/Vectorize Image In Adobe Illustrator/dog-mama-print.png",
            "allImages": ["Contracts/Vectorize Image In Adobe Illustrator/dog-mama-print.png"]
        },
        {
            "id": 3,
            "serial": 3,
            "title": "Urgent! Need vector versions of 4 logos by Friday AM",
            "company": "Ward Company",
            "rating": 5,
            "clientName": "Jennifer Ward",
            "clientPhoto": "Portraits/Jennifer Ward.jpg",
            "feedback": "Great job!",
            "category": "Vector Conversion / Vectorization / Image to Vector",
            "delivered": "Contracts/Urgent! Need vector versions of 4 logos by Friday AM/KOLeeLogo_582x284.png",
            "allImages": [
                "Contracts/Urgent! Need vector versions of 4 logos by Friday AM/KOLeeLogo_582x284.png",
                "Contracts/Urgent! Need vector versions of 4 logos by Friday AM/StandardModern_500x360.png",
                "Contracts/Urgent! Need vector versions of 4 logos by Friday AM/WF_JohnBarneslarge.png",
                "Contracts/Urgent! Need vector versions of 4 logos by Friday AM/dekajohnson.png"
            ]
        }
    ]
    return cards_data

if __name__ == "__main__":
    cards = parse_cards_xlsx()
    
    # Write to public/data/cards.json
    output_path = "E:/Nazia-Porfolio/public/data/cards.json"
    with open(output_path, 'w') as f:
        json.dump(cards, f, indent=2)
    
    print(f"Cards data written to {output_path}")
    print(f"Total cards: {len(cards)}")