#!/usr/bin/env python3
"""
Dutch GP Results Loader
This script loads official Dutch GP results using FastF1 and exports them for comparison with ML predictions.
"""

import json
import pandas as pd
import fastf1 as f1
from fastf1.core import Laps
import argparse
from datetime import datetime
import os

def clean_driver_name(driver_name: str) -> str:
    """
    Clean driver names by removing any unwanted characters and handling specific variations.
    """
    if pd.isna(driver_name):
        return driver_name
    
    cleaned_name = driver_name.replace('.', '').replace('-', ' ').strip()
    
    # Use a dictionary for specific driver name mappings
    name_mapping = {
        'Andrea Kimi Antonelli': 'Kimi Antonelli',
        'Kimi Andrea Antonelli': 'Kimi Antonelli',
        'Liam Lawson': 'Liam Lawson',
        'Yuki Tsunoda': 'Yuki Tsunoda',
    }
    
    return name_mapping.get(cleaned_name, cleaned_name)

def load_dutch_gp_results(year: int, gp_name: str = "Dutch Grand Prix") -> pd.DataFrame:
    """
    Load official Dutch GP results for a given year.
    
    Args:
        year (int): Year of the Grand Prix
        gp_name (str): Name of the Grand Prix (default: "Dutch Grand Prix")
    
    Returns:
        pd.DataFrame: DataFrame with race results
    """
    try:
        print(f"Loading {gp_name} results for {year}...")
        
        # Load the race session
        session = f1.get_session(year, gp_name, 'R')
        session.load(laps=True, telemetry=False, weather=False)
        
        # Get results
        results = session.results
        
        print(f"Successfully loaded results for {year} {gp_name}")
        print(f"Number of drivers: {len(results)}")
        print(f"Columns available: {list(results.columns)}")
        
        # Check required columns
        required_cols = ['FullName', 'TeamName', 'Position', 'Status']
        if not all(col in results.columns for col in required_cols):
            print(f"Warning: Missing required columns. Available: {list(results.columns)}")
            return pd.DataFrame()
        
        # Clean and format data
        cleaned_results = results.assign(
            Driver=results['FullName'].apply(clean_driver_name),
            Team=results['TeamName']
        )
        
        # Select relevant columns
        final_results = cleaned_results[['Driver', 'Team', 'Position', 'Status']].copy()
        
        # Convert position to numeric
        final_results['Position'] = pd.to_numeric(final_results['Position'], errors='coerce')
        
        # Sort by position
        final_results = final_results.sort_values('Position').reset_index(drop=True)
        
        return final_results
        
    except Exception as e:
        print(f"Error loading {gp_name} results for {year}: {e}")
        return pd.DataFrame()

def export_results_to_json(results: pd.DataFrame, output_file: str = "dutch_gp_results.json"):
    """
    Export results to JSON format for use in the web interface.
    
    Args:
        results (pd.DataFrame): Race results DataFrame
        output_file (str): Output JSON file path
    """
    if results.empty:
        print("No results to export.")
        return
    
    # Convert to list of dictionaries
    results_list = []
    for _, row in results.iterrows():
        result_dict = {
            'position': int(row['Position']),
            'driver': row['Driver'],
            'team': row['Team'],
            'status': row['Status']
        }
        results_list.append(result_dict)
    
    # Create export data
    export_data = {
        'grand_prix': 'Dutch Grand Prix',
        'year': datetime.now().year,
        'export_date': datetime.now().isoformat(),
        'results': results_list
    }
    
    # Write to JSON file
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(export_data, f, indent=2, ensure_ascii=False)
    
    print(f"Results exported to {output_file}")
    print(f"Total drivers: {len(results_list)}")

def export_results_to_html(results: pd.DataFrame, output_file: str = "dutch_gp_results.html"):
    """
    Export results to HTML format for easy viewing.
    
    Args:
        results (pd.DataFrame): Race results DataFrame
        output_file (str): Output HTML file path
    """
    if results.empty:
        print("No results to export.")
        return
    
    html_content = f"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Dutch GP Results - {datetime.now().year}</title>
        <style>
            body {{ font-family: Arial, sans-serif; margin: 20px; }}
            table {{ border-collapse: collapse; width: 100%; }}
            th, td {{ border: 1px solid #ddd; padding: 8px; text-align: left; }}
            th {{ background-color: #f2f2f2; }}
            .podium {{ background-color: #fff3cd; }}
            .winner {{ background-color: #d4edda; }}
        </style>
    </head>
    <body>
        <h1>🏁 Dutch Grand Prix {datetime.now().year} - Official Results</h1>
        <p><strong>Export Date:</strong> {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}</p>
        
        <table>
            <thead>
                <tr>
                    <th>Position</th>
                    <th>Driver</th>
                    <th>Team</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
    """
    
    for _, row in results.iterrows():
        position = int(row['Position'])
        row_class = 'winner' if position == 1 else ('podium' if position <= 3 else '')
        
        html_content += f"""
                <tr class="{row_class}">
                    <td>{position}</td>
                    <td>{row['Driver']}</td>
                    <td>{row['Team']}</td>
                    <td>{row['Status']}</td>
                </tr>
        """
    
    html_content += """
            </tbody>
        </table>
    </body>
    </html>
    """
    
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    print(f"HTML results exported to {output_file}")

def main():
    """Main function to run the Dutch GP results loader."""
    parser = argparse.ArgumentParser(description='Load Dutch GP results using FastF1')
    parser.add_argument('--year', type=int, default=datetime.now().year,
                       help='Year of the Grand Prix (default: current year)')
    parser.add_argument('--gp-name', type=str, default='Dutch Grand Prix',
                       help='Name of the Grand Prix (default: Dutch Grand Prix)')
    parser.add_argument('--output-json', type=str, default='dutch_gp_results.json',
                       help='Output JSON file path (default: dutch_gp_results.json)')
    parser.add_argument('--output-html', type=str, default='dutch_gp_results.html',
                       help='Output HTML file path (default: dutch_gp_results.html)')
    parser.add_argument('--format', choices=['json', 'html', 'both'], default='both',
                       help='Output format (default: both)')
    
    args = parser.parse_args()
    
    print("🏎️ Dutch GP Results Loader")
    print("=" * 40)
    
    # Load results
    results = load_dutch_gp_results(args.year, args.gp_name)
    
    if results.empty:
        print("❌ Failed to load results. Please check the year and Grand Prix name.")
        return
    
    # Display results summary
    print("\n📊 Results Summary:")
    print(f"Total drivers: {len(results)}")
    print(f"Winner: {results.iloc[0]['Driver']} ({results.iloc[0]['Team']})")
    print(f"Podium: {', '.join([results.iloc[i]['Driver'] for i in range(min(3, len(results)))])}")
    
    # Export results
    if args.format in ['json', 'both']:
        export_results_to_json(results, args.output_json)
    
    if args.format in ['html', 'both']:
        export_results_to_html(results, args.output_html)
    
    print("\n✅ Results loading completed successfully!")

if __name__ == "__main__":
    main()
