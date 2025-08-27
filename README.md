# F1 Dutch Grand Prix Prediction ML Project

A machine learning project that predicts Formula 1 race results using historical data and free practice session information. This project uses Gradient Boosting and Random Forest models to forecast driver finishing positions for upcoming Grand Prix events.

## 🏎️ Project Overview

This project leverages the FastF1 library to access Formula 1 telemetry and timing data, building predictive models that can forecast race outcomes based on:

- Historical race performance data
- Free practice session lap times
- Qualifying results (when available)
- Driver and team form throughout the season
- Grid positions and starting positions

## 🚀 Features

### Data Processing
- **Historical Race Analysis**: Processes past race results to build driver performance profiles
- **Free Practice Integration**: Incorporates FP1, FP2, and FP3 session data for enhanced predictions
- **Qualifying Data**: Uses grid positions when available for more accurate predictions
- **Driver Name Cleaning**: Handles variations in driver names across different data sources

### Machine Learning Models
- **Gradient Boosting Regressor**: Primary model with optimized hyperparameters
- **Random Forest Regressor**: Alternative model for comparison
- **Cross-Validation**: Uses GroupKFold to prevent data leakage between races
- **Feature Engineering**: Creates comprehensive feature sets including:
  - Season-to-date performance metrics
  - Form scores and qualifying performance
  - Practice session statistics
  - Historical finish positions and reliability

### Prediction Capabilities
- **Point Predictions**: Direct finish position predictions
- **Monte Carlo Simulations**: 3000+ simulations for probability analysis
- **Win/Podium Probabilities**: Calculates chances for different finishing positions
- **Expected Points**: Projects championship points based on predicted finishes

## 📋 Prerequisites

Before running this project, ensure you have the following installed:

```bash
# Core dependencies
pip install fastf1
pip install scikit-learn
pip install pandas
pip install joblib
pip install tqdm
pip install matplotlib
pip install numpy
```

## 🛠️ Installation & Setup

1. **Clone or download the project files**
2. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```
   Or install manually:
   ```bash
   pip install fastf1 scikit-learn pandas joblib tqdm matplotlib numpy
   ```

3. **Open the Jupyter notebook**:
   ```bash
   jupyter notebook F1_Dutch_GP_prediction_ML_GBR_Random_Forest.ipynb
   ```

## 📊 Usage

### Basic Prediction

```python
# Run prediction for a specific Grand Prix
race_order, summary = run_prediction_with_fallback(
    year=2025, 
    grand_prix="Hungarian Grand Prix", 
    mode="race-only", 
    n_sims=5000, 
    race_only=False, 
    model_type='GradientBoosting'
)
```

### Model Comparison

```python
# Compare Gradient Boosting vs Random Forest
race_order_gb, summary_gb = run_prediction_with_fallback(
    2025, "Hungarian Grand Prix", mode="race-only", 
    n_sims=5000, race_only=False, model_type='GradientBoosting'
)

race_order_rf, summary_rf = run_prediction_with_fallback(
    2025, "Hungarian Grand Prix", mode="race-only", 
    n_sims=5000, race_only=False, model_type='RandomForest'
)
```

### Prediction Modes

- **`race-only`**: Uses only historical race data (no practice sessions)
- **`with-grid`**: Includes qualifying results and grid positions
- **`no-grid`**: Excludes grid position information

## 🔧 Key Functions

### Data Loading Functions
- `load_past_race_results()`: Retrieves historical race data
- `load_qualifying_results()`: Gets qualifying session results
- `load_practice_features()`: Extracts free practice session data
- `build_season_table()`: Creates season-wide performance metrics

### Model Functions
- `build_training_data()`: Prepares labeled training dataset
- `assemble_prediction_frame()`: Creates feature matrix for predictions
- `fit_model()`: Trains and evaluates ML models
- `convert_sim_preds_to_standings()`: Converts predictions to race standings

### Utility Functions
- `clean_driver_name()`: Standardizes driver names
- `safe_div()`: Handles division by zero safely
- `session_key()`: Creates unique session identifiers

## 📈 Model Performance

The models are evaluated using:
- **Mean Absolute Error (MAE)**: Average prediction error in positions
- **Root Mean Square Error (RMSE)**: Penalizes larger prediction errors
- **R-squared Score**: Measures model fit quality
- **Cross-Validation**: Prevents overfitting using GroupKFold

## 🏁 Supported Grand Prix

The project includes data for the following 2025 season races:
- Australian Grand Prix
- Chinese Grand Prix
- Japanese Grand Prix
- Bahrain Grand Prix
- Saudi Arabian Grand Prix
- Miami Grand Prix
- Emilia Romagna Grand Prix
- Monaco Grand Prix
- Spanish Grand Prix
- Canadian Grand Prix
- Austrian Grand Prix
- British Grand Prix
- Belgian Grand Prix
- Hungarian Grand Prix

## 🔄 Data Sources

- **FastF1 Library**: Primary data source for F1 telemetry and timing
- **Official F1 Data**: Race results, qualifying times, and session data
- **Practice Sessions**: FP1, FP2, FP3 lap times and performance metrics

## ⚠️ Important Notes

1. **Data Availability**: The project includes fallback logic to use previous year's data if current year data is unavailable
2. **Caching**: FastF1 caches data locally for improved performance
3. **Driver Changes**: The model handles driver name variations and team changes
4. **Missing Data**: Robust handling of missing practice sessions or qualifying data

## 🤝 Contributing

Feel free to contribute to this project by:
- Adding new features or models
- Improving data processing functions
- Enhancing prediction accuracy
- Adding support for additional Grand Prix

## 📄 License

This project is for educational and research purposes. Please respect F1 data usage terms and conditions.

## 🙏 Acknowledgments

- FastF1 library developers for providing access to F1 data
- Formula 1 for the official timing and telemetry data
- The open-source community for the machine learning libraries used

---

**Note**: This project is designed for educational purposes and race prediction analysis. Actual race results may vary due to numerous factors not captured in the model.
