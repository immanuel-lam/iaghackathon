"""
Generate realistic synthetic BOM weather/storm data for Ultimo (Sydney, NSW 2007)
based on Sydney Observatory Hill station 066062 patterns.

Data is modelled on known Sydney climate patterns:
- Wettest months: Feb, Mar, Jun
- Storm season: Oct-Mar
- Hail season: Sep-Dec
- Major events modelled on real events (2022 floods, 2018 hailstorm, etc.)
"""

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.dates as mdates
from matplotlib.patches import FancyBboxPatch
import seaborn as sns
from datetime import datetime, timedelta
import os

np.random.seed(42)

OUTPUT_DIR = "/Users/immanuellam/Desktop/iaghackathon/reference/charts"
DATA_DIR = "/Users/immanuellam/Desktop/iaghackathon/reference/data"
os.makedirs(OUTPUT_DIR, exist_ok=True)
os.makedirs(DATA_DIR, exist_ok=True)

# --- Style setup ---
plt.rcParams.update({
    'font.family': 'sans-serif',
    'font.sans-serif': ['Helvetica Neue', 'Arial', 'DejaVu Sans'],
    'font.size': 11,
    'axes.titlesize': 14,
    'axes.titleweight': 'bold',
    'axes.labelsize': 11,
    'figure.facecolor': '#FFFFFF',
    'axes.facecolor': '#F8F9FA',
    'axes.edgecolor': '#DEE2E6',
    'axes.grid': True,
    'grid.alpha': 0.3,
    'grid.color': '#ADB5BD',
})

COLORS = {
    'primary': '#1B4F72',
    'flood': '#2980B9',
    'storm': '#8E44AD',
    'hail': '#E74C3C',
    'wind': '#E67E22',
    'fire': '#D35400',
    'accent': '#27AE60',
    'dark': '#2C3E50',
    'light_bg': '#F8F9FA',
}

# --- Generate synthetic daily rainfall data (2004-2024) ---
def generate_daily_rainfall():
    dates = pd.date_range('2004-01-01', '2024-12-31', freq='D')
    n = len(dates)

    # Base rainfall patterns - Sydney monthly averages (mm/day probability)
    # Jan=100, Feb=120, Mar=130, Apr=130, May=120, Jun=130, Jul=70, Aug=80, Sep=70, Oct=80, Nov=80, Dec=80
    monthly_avg_total = [100, 120, 130, 130, 120, 130, 70, 80, 70, 80, 80, 80]

    rainfall = np.zeros(n)
    for i, date in enumerate(dates):
        month = date.month - 1
        # Probability of rain on any day (~40-50% in wet months, ~30% in dry)
        rain_prob = 0.35 + 0.15 * (monthly_avg_total[month] / 130)

        if np.random.random() < rain_prob:
            # Exponential distribution for rain amounts
            mean_rain = monthly_avg_total[month] / (30 * rain_prob)
            rainfall[i] = np.random.exponential(mean_rain)

            # Occasional heavy events
            if np.random.random() < 0.03:
                rainfall[i] *= np.random.uniform(3, 8)

    # Inject known major events (realistic for Sydney)
    major_events = {
        '2007-06-09': 110,  # Pasha Bulker storm
        '2012-03-08': 95,
        '2014-12-16': 80,
        '2015-04-21': 130,  # April superstorm
        '2016-06-05': 150,  # June East Coast Low
        '2018-11-22': 75,
        '2020-02-09': 120,  # Feb 2020 storms
        '2021-03-20': 160,  # March 2021 flooding
        '2022-02-25': 105,  # Flood event start
        '2022-03-02': 180,  # Peak of 2022 floods
        '2022-03-08': 140,  # Continued flooding
        '2022-07-04': 130,  # July 2022 floods
        '2024-02-05': 95,
    }

    for date_str, amount in major_events.items():
        idx = dates.get_loc(pd.Timestamp(date_str))
        rainfall[idx] = amount + np.random.normal(0, 10)
        # Add surrounding days
        for offset in [-1, 1]:
            if 0 <= idx + offset < n:
                rainfall[idx + offset] = max(rainfall[idx + offset], amount * np.random.uniform(0.3, 0.6))

    df = pd.DataFrame({'date': dates, 'rainfall_mm': np.round(rainfall, 1)})
    df['rainfall_mm'] = df['rainfall_mm'].clip(lower=0)
    return df

# --- Generate storm/severe weather events ---
def generate_storm_events():
    events = []

    for year in range(2004, 2025):
        # Storm season (Oct-Mar) has more events
        n_storms = np.random.poisson(8)  # ~8 significant storms per year

        for _ in range(n_storms):
            # Weight towards storm season
            if np.random.random() < 0.7:
                month = np.random.choice([10, 11, 12, 1, 2, 3])
            else:
                month = np.random.choice([4, 5, 6, 7, 8, 9])

            day = np.random.randint(1, 28)

            if month <= 3:
                event_year = year
            else:
                event_year = year

            event_type = np.random.choice(
                ['thunderstorm', 'severe_storm', 'flash_flood', 'hail', 'damaging_wind'],
                p=[0.35, 0.25, 0.15, 0.15, 0.10]
            )

            severity = np.random.choice(['minor', 'moderate', 'severe'], p=[0.5, 0.35, 0.15])

            events.append({
                'date': f'{event_year}-{month:02d}-{day:02d}',
                'type': event_type,
                'severity': severity,
                'wind_kmh': np.random.randint(40, 130) if event_type in ['severe_storm', 'damaging_wind'] else np.random.randint(20, 60),
                'rainfall_mm': np.random.randint(10, 80),
            })

    # Add specific major events
    major = [
        {'date': '2007-06-09', 'type': 'severe_storm', 'severity': 'severe', 'wind_kmh': 135, 'rainfall_mm': 110},
        {'date': '2014-12-16', 'type': 'hail', 'severity': 'severe', 'wind_kmh': 95, 'rainfall_mm': 45},
        {'date': '2015-04-21', 'type': 'flash_flood', 'severity': 'severe', 'wind_kmh': 80, 'rainfall_mm': 130},
        {'date': '2016-06-05', 'type': 'severe_storm', 'severity': 'severe', 'wind_kmh': 120, 'rainfall_mm': 150},
        {'date': '2018-12-20', 'type': 'hail', 'severity': 'severe', 'wind_kmh': 70, 'rainfall_mm': 35},
        {'date': '2020-02-09', 'type': 'flash_flood', 'severity': 'severe', 'wind_kmh': 85, 'rainfall_mm': 120},
        {'date': '2021-03-20', 'type': 'flash_flood', 'severity': 'severe', 'wind_kmh': 75, 'rainfall_mm': 160},
        {'date': '2022-02-25', 'type': 'flash_flood', 'severity': 'severe', 'wind_kmh': 65, 'rainfall_mm': 105},
        {'date': '2022-03-02', 'type': 'flash_flood', 'severity': 'severe', 'wind_kmh': 70, 'rainfall_mm': 180},
        {'date': '2022-07-04', 'type': 'flash_flood', 'severity': 'severe', 'wind_kmh': 55, 'rainfall_mm': 130},
        {'date': '2024-02-05', 'type': 'severe_storm', 'severity': 'moderate', 'wind_kmh': 100, 'rainfall_mm': 95},
    ]
    events.extend(major)

    df = pd.DataFrame(events)
    df['date'] = pd.to_datetime(df['date'])
    df = df.sort_values('date').reset_index(drop=True)
    return df

# --- Generate hail events ---
def generate_hail_events():
    events = []
    for year in range(2004, 2025):
        n_hail = np.random.poisson(3)  # ~3 hail events per year in Sydney
        for _ in range(n_hail):
            month = np.random.choice([9, 10, 11, 12, 1, 2, 3], p=[0.1, 0.2, 0.25, 0.2, 0.1, 0.1, 0.05])
            day = np.random.randint(1, 28)
            event_year = year

            hail_size_cm = np.random.choice([1, 2, 3, 4, 5, 6, 7], p=[0.25, 0.3, 0.2, 0.12, 0.07, 0.04, 0.02])

            events.append({
                'date': f'{event_year}-{month:02d}-{day:02d}',
                'hail_size_cm': hail_size_cm,
                'damage_reported': hail_size_cm >= 3,
            })

    # Major hail events
    events.append({'date': '2014-12-16', 'hail_size_cm': 6, 'damage_reported': True})
    events.append({'date': '2018-12-20', 'hail_size_cm': 7, 'damage_reported': True})
    events.append({'date': '2020-01-20', 'hail_size_cm': 5, 'damage_reported': True})

    df = pd.DataFrame(events)
    df['date'] = pd.to_datetime(df['date'])
    return df.sort_values('date').reset_index(drop=True)

# --- Generate data ---
print("Generating synthetic data...")
rainfall_df = generate_daily_rainfall()
storms_df = generate_storm_events()
hail_df = generate_hail_events()

# Save raw data
rainfall_df.to_csv(f"{DATA_DIR}/daily_rainfall_066062_2004_2024.csv", index=False)
storms_df.to_csv(f"{DATA_DIR}/storm_events_ultimo_2004_2024.csv", index=False)
hail_df.to_csv(f"{DATA_DIR}/hail_events_ultimo_2004_2024.csv", index=False)
print(f"Data saved to {DATA_DIR}/")

# ============================================================
# CHART 1: Monthly Storm Frequency
# ============================================================
print("Creating Chart 1: Monthly Storm Frequency...")
fig, ax = plt.subplots(figsize=(10, 6))

storms_df['month'] = storms_df['date'].dt.month
monthly_counts = storms_df.groupby('month').size()
month_names = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

bars = ax.bar(range(1, 13), [monthly_counts.get(m, 0) for m in range(1, 13)],
              color=[COLORS['storm'] if m in [10, 11, 12, 1, 2, 3] else COLORS['primary'] for m in range(1, 13)],
              alpha=0.85, edgecolor='white', linewidth=0.5)

ax.set_xticks(range(1, 13))
ax.set_xticklabels(month_names)
ax.set_xlabel('Month')
ax.set_ylabel('Number of Storm Events')
ax.set_title('Monthly Storm Frequency — Ultimo, Sydney\n2004–2024 (21 years)', pad=15)

# Add annotation for peak season
ax.axvspan(9.5, 12.5, alpha=0.05, color=COLORS['hail'], zorder=0)
ax.axvspan(0.5, 3.5, alpha=0.05, color=COLORS['hail'], zorder=0)
ax.text(11, max(monthly_counts) * 0.92, 'Peak\nSeason', ha='center', fontsize=9,
        color=COLORS['storm'], fontstyle='italic')
ax.text(2, max(monthly_counts) * 0.92, 'Peak\nSeason', ha='center', fontsize=9,
        color=COLORS['storm'], fontstyle='italic')

ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)
plt.tight_layout()
plt.savefig(f"{OUTPUT_DIR}/01_monthly_storm_frequency.png", dpi=150, bbox_inches='tight')
plt.close()

# ============================================================
# CHART 2: Year-over-Year Severe Weather Trend
# ============================================================
print("Creating Chart 2: Year-over-Year Trend...")
fig, ax = plt.subplots(figsize=(10, 6))

storms_df['year'] = storms_df['date'].dt.year
yearly_counts = storms_df.groupby('year').size()
yearly_severe = storms_df[storms_df['severity'] == 'severe'].groupby('year').size()

years = range(2004, 2025)
total_counts = [yearly_counts.get(y, 0) for y in years]
severe_counts = [yearly_severe.get(y, 0) for y in years]

ax.bar(years, total_counts, color=COLORS['primary'], alpha=0.4, label='All events', edgecolor='white')
ax.bar(years, severe_counts, color=COLORS['hail'], alpha=0.8, label='Severe events', edgecolor='white')

# Trend line
z = np.polyfit(list(years), total_counts, 1)
p = np.poly1d(z)
ax.plot(years, p(list(years)), '--', color=COLORS['dark'], alpha=0.7, linewidth=2, label='Trend')

ax.set_xlabel('Year')
ax.set_ylabel('Number of Events')
ax.set_title('Severe Weather Events by Year — Ultimo, Sydney\nAll events vs. severe classification', pad=15)
ax.legend(loc='upper left', framealpha=0.9)
ax.set_xticks(range(2004, 2025, 2))
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)

plt.tight_layout()
plt.savefig(f"{OUTPUT_DIR}/02_yearly_trend.png", dpi=150, bbox_inches='tight')
plt.close()

# ============================================================
# CHART 3: Rainfall Extremes Timeline
# ============================================================
print("Creating Chart 3: Rainfall Extremes Timeline...")
fig, ax = plt.subplots(figsize=(12, 5))

# Filter to days with >30mm
extreme = rainfall_df[rainfall_df['rainfall_mm'] > 30].copy()
extreme['date'] = pd.to_datetime(extreme['date'])

# Color by severity
colors = []
for val in extreme['rainfall_mm']:
    if val >= 100:
        colors.append(COLORS['hail'])
    elif val >= 50:
        colors.append(COLORS['storm'])
    else:
        colors.append(COLORS['flood'])

ax.scatter(extreme['date'], extreme['rainfall_mm'], c=colors, s=30, alpha=0.7, edgecolors='white', linewidth=0.3)

# Annotate major events
annotations = [
    ('2007-06-09', 'Pasha Bulker\nstorm'),
    ('2016-06-05', 'East Coast\nLow'),
    ('2022-03-02', '2022 Floods\n(peak)'),
    ('2021-03-20', 'March 2021\nfloods'),
]

for date_str, label in annotations:
    date = pd.Timestamp(date_str)
    row = extreme[extreme['date'] == date]
    if not row.empty:
        val = row['rainfall_mm'].values[0]
        ax.annotate(label, xy=(date, val), xytext=(date + timedelta(days=90), val + 15),
                   fontsize=8, ha='left', arrowprops=dict(arrowstyle='->', color='#555', lw=0.8),
                   color=COLORS['dark'])

# Threshold lines
ax.axhline(y=50, color=COLORS['storm'], linestyle='--', alpha=0.4, linewidth=1)
ax.axhline(y=100, color=COLORS['hail'], linestyle='--', alpha=0.4, linewidth=1)
ax.text(rainfall_df['date'].min(), 52, '50mm (heavy)', fontsize=8, color=COLORS['storm'], alpha=0.7)
ax.text(rainfall_df['date'].min(), 102, '100mm (extreme)', fontsize=8, color=COLORS['hail'], alpha=0.7)

ax.set_xlabel('Date')
ax.set_ylabel('Daily Rainfall (mm)')
ax.set_title('Extreme Rainfall Events (>30mm days) — Sydney Observatory Hill\n2004–2024', pad=15)
ax.xaxis.set_major_locator(mdates.YearLocator(2))
ax.xaxis.set_major_formatter(mdates.DateFormatter('%Y'))
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)

plt.tight_layout()
plt.savefig(f"{OUTPUT_DIR}/03_rainfall_extremes_timeline.png", dpi=150, bbox_inches='tight')
plt.close()

# ============================================================
# CHART 4: Risk Summary Card
# ============================================================
print("Creating Chart 4: Risk Summary Card...")
fig, ax = plt.subplots(figsize=(10, 7))
ax.set_xlim(0, 10)
ax.set_ylim(0, 10)
ax.axis('off')

# Background
fig.patch.set_facecolor('#FFFFFF')

# Title area
ax.text(5, 9.5, 'PROPERTY RISK PROFILE', ha='center', va='top', fontsize=18,
        fontweight='bold', color=COLORS['dark'])
ax.text(5, 8.9, 'Ultimo, NSW 2007 — Based on 21 years of data (2004–2024)',
        ha='center', va='top', fontsize=11, color='#666')

# Risk categories
categories = [
    ('FLOOD RISK', 'HIGH', COLORS['hail'],
     f"{storms_df[storms_df['type'] == 'flash_flood'].shape[0]} flood events recorded\n3 major floods in last 5 years (2020, 2021, 2022)"),
    ('STORM RISK', 'HIGH', COLORS['storm'],
     f"{storms_df[storms_df['type'].isin(['thunderstorm', 'severe_storm'])].shape[0]} storm events recorded\nPeak season: October–March"),
    ('HAIL RISK', 'MODERATE', COLORS['wind'],
     f"{hail_df.shape[0]} hail events recorded\n{hail_df[hail_df['damage_reported']].shape[0]} caused property damage"),
    ('WIND DAMAGE', 'MODERATE', COLORS['wind'],
     f"{storms_df[storms_df['wind_kmh'] > 90].shape[0]} events with winds >90km/h\nMax recorded: 135 km/h (June 2007)"),
]

y_pos = 8.0
for cat_name, risk_level, color, description in categories:
    # Category box
    rect = FancyBboxPatch((0.3, y_pos - 1.4), 9.4, 1.5,
                          boxstyle="round,pad=0.05",
                          facecolor='#F8F9FA', edgecolor='#DEE2E6', linewidth=1)
    ax.add_patch(rect)

    # Risk level badge
    badge_color = COLORS['hail'] if risk_level == 'HIGH' else COLORS['wind']
    badge = FancyBboxPatch((7.5, y_pos - 0.7), 1.8, 0.6,
                           boxstyle="round,pad=0.05",
                           facecolor=badge_color, edgecolor='none', alpha=0.9)
    ax.add_patch(badge)
    ax.text(8.4, y_pos - 0.4, risk_level, ha='center', va='center',
            fontsize=9, fontweight='bold', color='white')

    # Text
    ax.text(0.7, y_pos - 0.3, cat_name, fontsize=11, fontweight='bold', color=COLORS['dark'])
    ax.text(0.7, y_pos - 0.9, description, fontsize=9, color='#555', va='top')

    y_pos -= 1.8

# Bottom stats row
stats_y = 0.8
stats = [
    ('Total Events', str(storms_df.shape[0])),
    ('Avg/Year', f"{storms_df.shape[0] / 21:.0f}"),
    ('Extreme Rain Days', str(rainfall_df[rainfall_df['rainfall_mm'] > 50].shape[0])),
    ('Max Daily Rain', f"{rainfall_df['rainfall_mm'].max():.0f}mm"),
]

for i, (label, value) in enumerate(stats):
    x = 1.2 + i * 2.3
    ax.text(x, stats_y + 0.3, value, ha='center', fontsize=14, fontweight='bold', color=COLORS['primary'])
    ax.text(x, stats_y - 0.2, label, ha='center', fontsize=8, color='#888')

# Source note
ax.text(5, 0.0, 'Source: Bureau of Meteorology Station 066062 (Sydney Observatory Hill) | Synthetic data based on real patterns',
        ha='center', fontsize=7, color='#AAA', style='italic')

plt.tight_layout()
plt.savefig(f"{OUTPUT_DIR}/04_risk_summary_card.png", dpi=150, bbox_inches='tight')
plt.close()

# ============================================================
# CHART 5: Event Type Breakdown (Donut)
# ============================================================
print("Creating Chart 5: Event Type Breakdown...")
fig, ax = plt.subplots(figsize=(8, 8))

type_counts = storms_df['type'].value_counts()
type_labels = {
    'thunderstorm': 'Thunderstorms',
    'severe_storm': 'Severe Storms',
    'flash_flood': 'Flash Floods',
    'hail': 'Hail Events',
    'damaging_wind': 'Damaging Wind',
}
labels = [type_labels.get(t, t) for t in type_counts.index]
colors_pie = [COLORS['storm'], COLORS['primary'], COLORS['flood'], COLORS['hail'], COLORS['wind']]

wedges, texts, autotexts = ax.pie(type_counts.values, labels=labels, colors=colors_pie,
                                   autopct='%1.0f%%', startangle=90, pctdistance=0.8,
                                   wedgeprops=dict(width=0.5, edgecolor='white', linewidth=2))

for autotext in autotexts:
    autotext.set_fontsize(10)
    autotext.set_fontweight('bold')
    autotext.set_color('white')

ax.set_title('Storm Event Types — Ultimo, Sydney\n2004–2024', pad=20, fontsize=14, fontweight='bold')

# Center text
ax.text(0, 0, f'{storms_df.shape[0]}\nTotal\nEvents', ha='center', va='center',
        fontsize=16, fontweight='bold', color=COLORS['dark'])

plt.tight_layout()
plt.savefig(f"{OUTPUT_DIR}/05_event_type_breakdown.png", dpi=150, bbox_inches='tight')
plt.close()

# ============================================================
# CHART 6: Hail Events by Size
# ============================================================
print("Creating Chart 6: Hail Events...")
fig, ax = plt.subplots(figsize=(10, 5))

hail_df['year'] = hail_df['date'].dt.year
hail_yearly = hail_df.groupby('year').agg(
    count=('hail_size_cm', 'count'),
    max_size=('hail_size_cm', 'max'),
    damage_events=('damage_reported', 'sum')
).reindex(range(2004, 2025), fill_value=0)

ax.bar(hail_yearly.index, hail_yearly['count'], color=COLORS['flood'], alpha=0.5, label='All hail events')
ax.bar(hail_yearly.index, hail_yearly['damage_events'], color=COLORS['hail'], alpha=0.8, label='Damaging hail (≥3cm)')

ax2 = ax.twinx()
ax2.plot(hail_yearly.index, hail_yearly['max_size'], 'o-', color=COLORS['wind'],
         markersize=5, linewidth=1.5, label='Max hail size (cm)')
ax2.set_ylabel('Largest Hailstone (cm)', color=COLORS['wind'])
ax2.tick_params(axis='y', labelcolor=COLORS['wind'])

ax.set_xlabel('Year')
ax.set_ylabel('Number of Hail Events')
ax.set_title('Hail Events by Year — Ultimo, Sydney\nFrequency and maximum hailstone size', pad=15)
ax.set_xticks(range(2004, 2025, 2))

lines1, labels1 = ax.get_legend_handles_labels()
lines2, labels2 = ax2.get_legend_handles_labels()
ax.legend(lines1 + lines2, labels1 + labels2, loc='upper left', framealpha=0.9)

ax.spines['top'].set_visible(False)
plt.tight_layout()
plt.savefig(f"{OUTPUT_DIR}/06_hail_events.png", dpi=150, bbox_inches='tight')
plt.close()

print(f"\nDone! All charts saved to {OUTPUT_DIR}/")
print(f"Data files saved to {DATA_DIR}/")
print("\nCharts generated:")
print("  01_monthly_storm_frequency.png")
print("  02_yearly_trend.png")
print("  03_rainfall_extremes_timeline.png")
print("  04_risk_summary_card.png")
print("  05_event_type_breakdown.png")
print("  06_hail_events.png")
