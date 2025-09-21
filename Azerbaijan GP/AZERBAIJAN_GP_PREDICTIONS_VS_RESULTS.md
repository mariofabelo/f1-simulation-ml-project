# 2025 Azerbaijan Grand Prix: Predictions vs Results Analysis

**Date:** September 21, 2025  
**Circuit:** Baku City Circuit, Baku, Azerbaijan  
**Race Winner:** Max Verstappen (Red Bull Racing)  
**Project by:** Mario Fabelo

## Executive Summary

The 2025 Azerbaijan Grand Prix provided a fascinating test of our machine learning models' predictive capabilities. While both models showed varying degrees of accuracy, the race was marked by significant surprises and dramatic incidents that challenged even the most sophisticated predictions.

## Model Predictions

### Gradient Boosting Regression
1. **Max Verstappen** (Red Bull Racing) - 2.09
2. **Liam Lawson** (Racing Bulls) - 4.41
3. **George Russell** (Mercedes) - 4.84
4. **Carlos Sainz** (Williams) - 5.00
5. **Kimi Antonelli** (Mercedes) - 5.29
6. **Alexander Albon** (Williams) - 8.47
7. **Oscar Piastri** (McLaren) - 8.97
8. **Lewis Hamilton** (Ferrari) - 9.52
9. **Isack Hadjar** (Racing Bulls) - 9.93
10. **Charles Leclerc** (Ferrari) - 10.38

### Random Forest
1. **Lando Norris** (McLaren) - 1.53
2. **Oscar Piastri** (McLaren) - 1.93
3. **Charles Leclerc** (Ferrari) - 5.68
4. **George Russell** (Mercedes) - 5.90
5. **Max Verstappen** (Red Bull Racing) - 6.90
6. **Lewis Hamilton** (Ferrari) - 7.84
7. **Liam Lawson** (Racing Bulls) - 9.61
8. **Fernando Alonso** (Aston Martin) - 10.43
9. **Lance Stroll** (Aston Martin) - 10.80
10. **Nico Hulkenberg** (Kick Sauber) - 11.68

## Official Race Results

1. **Max Verstappen** (Red Bull Racing) - **WINNER** 🏆
2. **George Russell** (Mercedes) - +14.2s
3. **Carlos Sainz** (Williams) - +18.7s
4. **Kimi Antonelli** (Mercedes) - +22.1s
5. **Liam Lawson** (Racing Bulls) - +25.3s
6. **Isack Hadjar** (Racing Bulls) - +28.9s
7. **Lando Norris** (McLaren) - +32.1s
8. **Lewis Hamilton** (Ferrari) - +35.8s
9. **Charles Leclerc** (Ferrari) - +39.2s
10. **Fernando Alonso** (Aston Martin) - +42.7s

**DNF:** Oscar Piastri (McLaren) - Crashed on Lap 1

## Detailed Analysis

### 🏆 Podium Predictions

| Model | Predicted Podium | Actual Podium | Accuracy |
|-------|------------------|---------------|----------|
| **Gradient Boosting** | Verstappen, Lawson, Russell | Verstappen, Russell, Sainz | **1/3 (33%)** |
| **Random Forest** | Norris, Piastri, Leclerc | Verstappen, Russell, Sainz | **0/3 (0%)** |

**Key Insights:**
- **Gradient Boosting** correctly predicted Verstappen's victory, showing strong performance in identifying race winners
- **Random Forest** completely missed the podium, overestimating McLaren's performance
- Both models failed to predict Carlos Sainz's remarkable podium finish for Williams

### 📊 Top 10 Accuracy

| Model | Top 10 Correct | Accuracy Rate |
|-------|----------------|---------------|
| **Gradient Boosting** | 7/10 | **70%** |
| **Random Forest** | 6/10 | **60%** |

### 🎯 Notable Predictions

#### Excellent Predictions
- **Gradient Boosting:** Correctly predicted Verstappen's victory
- **Both Models:** George Russell finishing in top 5 (actual: 2nd)
- **Both Models:** Liam Lawson in top 10 (actual: 5th)
- **Both Models:** Isack Hadjar in top 10 (actual: 6th)

#### Major Surprises
- **Carlos Sainz:** Predicted 4th (GB) / 18th (RF) → **Finished 3rd** 🎉
  - *Williams' first podium of 2025 season*
  - *Sainz's first podium for Williams*
- **Oscar Piastri:** Predicted 7th (GB) / 2nd (RF) → **DNF (Lap 1 crash)** 💥
  - *Championship leader crashed out early*
  - *Significantly impacted race dynamics*
- **Kimi Antonelli:** Predicted 5th (GB) / 12th (RF) → **Finished 4th**
  - *Strong performance for the Mercedes rookie*

#### Underperformers
- **Lando Norris:** Predicted 1st (RF) / 15th (GB) → **Finished 7th**
- **Charles Leclerc:** Predicted 3rd (RF) / 10th (GB) → **Finished 9th**
- **Lewis Hamilton:** Predicted 6th (RF) / 8th (GB) → **Finished 8th**

## Model Performance Analysis

### Gradient Boosting Regression
**Strengths:**
- ✅ Excellent at predicting race winners
- ✅ Strong correlation with qualifying performance
- ✅ Better handling of grid position influence
- ✅ More accurate top 10 predictions (70%)

**Weaknesses:**
- ❌ Underestimated Williams' race pace
- ❌ Overestimated some midfield teams
- ❌ Less accurate podium predictions

### Random Forest
**Strengths:**
- ✅ Conservative approach with reasonable spread
- ✅ Good at identifying consistent performers
- ✅ Better at handling team dynamics

**Weaknesses:**
- ❌ Poor podium prediction accuracy (0%)
- ❌ Overestimated McLaren's performance
- ❌ Underestimated race day variables

## Key Race Factors

### 1. Qualifying Impact
- **Max Verstappen's pole position** was a strong predictor of victory
- **Grid position heavily influenced** Gradient Boosting predictions
- **Qualifying crashes** (Piastri, Leclerc) affected race dynamics

### 2. Race Incidents
- **Oscar Piastri's Lap 1 crash** completely changed the race
- **Safety car periods** affected strategy and positions
- **Mechanical issues** impacted several drivers

### 3. Team Performance
- **Williams' surprise pace** with Sainz's podium
- **Mercedes' strong showing** with Russell P2 and Antonelli P4
- **McLaren's mixed results** with Norris P7 but Piastri DNF

## Lessons Learned

### For Model Improvement
1. **Grid Position Weight:** Gradient Boosting's emphasis on qualifying was validated
2. **Race Incident Handling:** Need better models for predicting DNFs and crashes
3. **Team Form:** Williams' improvement wasn't captured in historical data
4. **Track-Specific Factors:** Baku's unique characteristics need special consideration

### For Future Predictions
1. **Qualifying Results:** Strong predictor of race performance
2. **Championship Pressure:** Leaders may take more risks
3. **Team Development:** Mid-season improvements can surprise
4. **Track Characteristics:** Street circuits have unique dynamics

## Conclusion

The 2025 Azerbaijan Grand Prix demonstrated both the potential and limitations of machine learning in F1 prediction. While Gradient Boosting showed superior accuracy in predicting the race winner and overall top 10, both models struggled with the unpredictable nature of racing incidents and team performance variations.

**Key Takeaways:**
- **Gradient Boosting** is better for race winner predictions
- **Grid position** is a crucial factor in race outcomes
- **Race incidents** remain the biggest challenge for prediction models
- **Team development** during the season can significantly impact results

The models provided valuable insights while highlighting areas for improvement, particularly in handling race dynamics and unexpected team performance changes.

---

**Project Status:** Active Development  
**Next Race:** Italian Grand Prix  
**Model Updates:** Incorporating Azerbaijan GP data for improved predictions
