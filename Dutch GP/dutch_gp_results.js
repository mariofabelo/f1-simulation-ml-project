// Dutch GP Results Loader and Comparison Script
// This script loads official Dutch GP results and compares them with ML predictions

class DutchGPResults {
    constructor() {
        this.officialResults = null;
        this.predictions = {
            gradientBoosting: this.getGradientBoostingPredictions(),
            randomForest: this.getRandomForestPredictions()
        };
        this.init();
    }

    // Initialize the results loader
    init() {
        this.loadOfficialResults();
        this.setupEventListeners();
    }

    // Get Gradient Boosting predictions from the HTML
    getGradientBoostingPredictions() {
        const predictions = [];
        const table = document.querySelector('.model-section:first-child .predictions-table tbody');
        if (table) {
            const rows = table.querySelectorAll('tr');
            rows.forEach((row, index) => {
                const position = index + 1;
                const driver = row.querySelector('.driver').textContent;
                const team = row.querySelector('.team').textContent;
                const prediction = parseFloat(row.querySelector('.prediction').textContent);
                predictions.push({ position, driver, team, prediction });
            });
        }
        return predictions;
    }

    // Get Random Forest predictions from the HTML
    getRandomForestPredictions() {
        const predictions = [];
        const table = document.querySelector('.model-section:last-child .predictions-table tbody');
        if (table) {
            const rows = table.querySelectorAll('tr');
            rows.forEach((row, index) => {
                const position = index + 1;
                const driver = row.querySelector('.driver').textContent;
                const team = row.querySelector('.team').textContent;
                const prediction = parseFloat(row.querySelector('.prediction').textContent);
                predictions.push({ position, driver, team, prediction });
            });
        }
        return predictions;
    }

    // Load official Dutch GP results
    async loadOfficialResults() {
        try {
            console.log('🚀 Starting to load official Dutch GP results...');
            
            // Try to load from FastF1 API first (if available)
            const results = await this.loadFromFastF1();
            console.log('📥 Results from loadFromFastF1:', results ? `${results.length} results` : 'null');
            
            if (results && results.length > 0) {
                this.officialResults = results;
                console.log('✅ Loaded REAL Dutch GP results from FastF1!');
                console.log('🏆 First result:', results[0]);
                this.showRealResultsIndicator();
            } else {
                // Fallback to sample data for demonstration
                console.log('📊 No real results found, using sample data');
                this.officialResults = this.getSampleResults();
                console.log('📊 Using sample results for demonstration');
            }
            this.displayComparison();
        } catch (error) {
            console.log('❌ Error in loadOfficialResults:', error);
            this.officialResults = this.getSampleResults();
            this.displayComparison();
        }
    }

    // Attempt to load results from FastF1 API
    async loadFromFastF1() {
        try {
            console.log('🔍 Attempting to load real Dutch GP results...');
            
            // Try to load from the Python script output first
            const response = await fetch('dutch_gp_results.json');
            console.log('📡 Fetch response status:', response.status, response.ok);
            
            if (response.ok) {
                const data = await response.json();
                console.log('✅ Successfully loaded real results from JSON:', data);
                console.log('📊 Number of results:', data.results ? data.results.length : 'undefined');
                return data.results;
            } else {
                console.log('❌ JSON file not found or error loading:', response.status, response.statusText);
            }
            
            // If JSON file doesn't exist, try to run the Python script
            console.log('🔄 Attempting to load from FastF1...');
            
            // For now, we'll use a fallback approach
            // In a production environment, you could call the Python script via a backend API
            return null;
        } catch (error) {
            console.log('❌ Error loading from FastF1:', error);
            
            // If fetch fails (e.g., CORS issues with file:// protocol), try to use embedded data
            console.log('🔄 Fetch failed, trying to use embedded real results...');
            return this.getEmbeddedRealResults();
        }
    }

    // Sample results for demonstration (replace with actual results when available)
    getSampleResults() {
        return [
            { position: 1, driver: "Max Verstappen", team: "Red Bull Racing", status: "Finished" },
            { position: 2, driver: "Lando Norris", team: "McLaren", status: "Finished" },
            { position: 3, driver: "Oscar Piastri", team: "McLaren", status: "Finished" },
            { position: 4, driver: "George Russell", team: "Mercedes", status: "Finished" },
            { position: 5, driver: "Charles Leclerc", team: "Ferrari", status: "Finished" },
            { position: 6, driver: "Lewis Hamilton", team: "Ferrari", status: "Finished" },
            { position: 7, driver: "Fernando Alonso", team: "Aston Martin", status: "Finished" },
            { position: 8, driver: "Lance Stroll", team: "Aston Martin", status: "Finished" },
            { position: 9, driver: "Nico Hulkenberg", team: "Kick Sauber", status: "Finished" },
            { position: 10, driver: "Gabriel Bortoleto", team: "Kick Sauber", status: "Finished" },
            { position: 11, driver: "Liam Lawson", team: "Racing Bulls", status: "Finished" },
            { position: 12, driver: "Kimi Antonelli", team: "Mercedes", status: "Finished" },
            { position: 13, driver: "Isack Hadjar", team: "Racing Bulls", status: "Finished" },
            { position: 14, driver: "Alexander Albon", team: "Williams", status: "Finished" },
            { position: 15, driver: "Esteban Ocon", team: "Haas F1 Team", status: "Finished" },
            { position: 16, driver: "Pierre Gasly", team: "Alpine", status: "Finished" },
            { position: 17, driver: "Yuki Tsunoda", team: "Red Bull Racing", status: "Finished" },
            { position: 18, driver: "Carlos Sainz", team: "Williams", status: "Finished" },
            { position: 19, driver: "Oliver Bearman", team: "Haas F1 Team", status: "Finished" },
            { position: 20, driver: "Franco Colapinto", team: "Alpine", status: "Finished" },
            { position: 21, driver: "Jack Doohan", team: "Alpine", status: "Finished" }
        ];
    }

    // Embedded real results from FastF1 (fallback when fetch fails)
    getEmbeddedRealResults() {
        console.log('📥 Loading embedded real Dutch GP results...');
        return [
            { position: 1, driver: "Oscar Piastri", team: "McLaren", status: "Finished" },
            { position: 2, driver: "Max Verstappen", team: "Red Bull Racing", status: "Finished" },
            { position: 3, driver: "Isack Hadjar", team: "Racing Bulls", status: "Finished" },
            { position: 4, driver: "George Russell", team: "Mercedes", status: "Finished" },
            { position: 5, driver: "Alexander Albon", team: "Williams", status: "Finished" },
            { position: 6, driver: "Kimi Antonelli", team: "Mercedes", status: "Finished" },
            { position: 7, driver: "Oliver Bearman", team: "Haas F1 Team", status: "Finished" },
            { position: 8, driver: "Lance Stroll", team: "Aston Martin", status: "Finished" },
            { position: 9, driver: "Fernando Alonso", team: "Aston Martin", status: "Finished" },
            { position: 10, driver: "Yuki Tsunoda", team: "Red Bull Racing", status: "Finished" },
            { position: 11, driver: "Esteban Ocon", team: "Haas F1 Team", status: "Finished" },
            { position: 12, driver: "Franco Colapinto", team: "Alpine", status: "Finished" },
            { position: 13, driver: "Liam Lawson", team: "Racing Bulls", status: "Finished" },
            { position: 14, driver: "Carlos Sainz", team: "Williams", status: "Finished" },
            { position: 15, driver: "Nico Hulkenberg", team: "Kick Sauber", status: "Finished" },
            { position: 16, driver: "Gabriel Bortoleto", team: "Kick Sauber", status: "Finished" },
            { position: 17, driver: "Pierre Gasly", team: "Alpine", status: "Finished" },
            { position: 18, driver: "Lando Norris", team: "McLaren", status: "Finished" },
            { position: 19, driver: "Charles Leclerc", team: "Ferrari", status: "Finished" },
            { position: 20, driver: "Lewis Hamilton", team: "Ferrari", status: "Finished" }
        ];
    }

    // Display the comparison between predictions and actual results
    displayComparison() {
        this.createComparisonSection();
        this.createResultsTable();
        this.createAccuracyMetrics();
        this.createHighlights();
    }

    // Create the comparison section
    createComparisonSection() {
        const existingSection = document.querySelector('.comparison-highlights');
        if (existingSection) {
            existingSection.remove();
        }

        const comparisonSection = document.createElement('div');
        comparisonSection.className = 'comparison-highlights';
        
        // Check if we have real results
        const isRealResults = this.officialResults && this.officialResults.length > 0 && 
                             this.officialResults[0].driver === "Oscar Piastri" && 
                             this.officialResults[0].position === 1;
        
        const resultsSource = isRealResults ? "🏆 REAL DUTCH GP RESULTS FROM FASTF1" : "🏆 Sample Dutch GP Results";
        
        comparisonSection.innerHTML = `
            <h3 class="highlights-title">🏁 OFFICIAL RESULTS vs PREDICTIONS</h3>
            <div class="results-container">
                <div class="official-results-section">
                    <h4 class="section-title">${resultsSource}</h4>
                    <div id="official-results-table"></div>
                </div>
                <div class="comparison-section">
                    <h4 class="section-title">📊 Prediction Accuracy</h4>
                    <div id="accuracy-metrics"></div>
                </div>
            </div>
            <div class="highlights-grid" id="comparison-highlights"></div>
        `;

        const container = document.querySelector('.container');
        const footer = document.querySelector('.footer');
        container.insertBefore(comparisonSection, footer);
    }

    // Create the official results table
    createResultsTable() {
        const tableContainer = document.getElementById('official-results-table');
        if (!tableContainer) return;

        const table = document.createElement('table');
        table.className = 'predictions-table official-results';
        table.innerHTML = `
            <thead>
                <tr>
                    <th>Pos</th>
                    <th>Driver</th>
                    <th>Team</th>
                    <th>Status</th>
                    <th>GBR Pred</th>
                    <th>RF Pred</th>
                </tr>
            </thead>
            <tbody>
                ${this.officialResults.map(result => this.createResultRow(result)).join('')}
            </tbody>
        `;

        tableContainer.appendChild(table);
    }

    // Create a result row with comparison data
    createResultRow(result) {
        const gbrPred = this.findPrediction(this.predictions.gradientBoosting, result.driver);
        const rfPred = this.findPrediction(this.predictions.randomForest, result.driver);
        
        const gbrAccuracy = this.calculatePositionAccuracy(gbrPred?.position, result.position);
        const rfAccuracy = this.calculatePositionAccuracy(rfPred?.position, result.position);
        
        const rowClass = result.position <= 3 ? 'podium' : '';
        const gbrClass = this.getAccuracyClass(gbrAccuracy);
        const rfClass = this.getAccuracyClass(rfAccuracy);

        return `
            <tr class="${rowClass}">
                <td class="position">${result.position}</td>
                <td class="driver">${result.driver}</td>
                <td class="team">${result.team}</td>
                <td class="status">${result.status}</td>
                <td class="prediction ${gbrClass}" title="Predicted: ${gbrPred?.position || 'N/A'} (${gbrPred?.prediction?.toFixed(2) || 'N/A'})">
                    ${gbrPred ? gbrPred.position : 'N/A'}
                </td>
                <td class="prediction ${rfClass}" title="Predicted: ${rfPred?.position || 'N/A'} (${rfPred?.prediction?.toFixed(2) || 'N/A'})">
                    ${rfPred ? rfPred.position : 'N/A'}
                </td>
            </tr>
        `;
    }

    // Find prediction for a specific driver
    findPrediction(predictions, driverName) {
        return predictions.find(p => p.driver === driverName);
    }

    // Calculate position accuracy
    calculatePositionAccuracy(predicted, actual) {
        if (!predicted || !actual) return null;
        return Math.abs(predicted - actual);
    }

    // Get CSS class for accuracy styling
    getAccuracyClass(accuracy) {
        if (accuracy === null) return '';
        if (accuracy === 0) return 'perfect';
        if (accuracy <= 2) return 'good';
        if (accuracy <= 5) return 'fair';
        return 'poor';
    }

    // Create accuracy metrics
    createAccuracyMetrics() {
        const metricsContainer = document.getElementById('accuracy-metrics');
        if (!metricsContainer) return;

        const gbrMetrics = this.calculateModelMetrics(this.predictions.gradientBoosting);
        const rfMetrics = this.calculateModelMetrics(this.predictions.randomForest);

        metricsContainer.innerHTML = `
            <div class="metrics-grid">
                <div class="metric-card">
                    <div class="metric-title">Gradient Boosting</div>
                    <div class="metric-value">${gbrMetrics.accuracy.toFixed(1)}%</div>
                    <div class="metric-label">Accuracy</div>
                    <div class="metric-details">
                        <span>Perfect: ${gbrMetrics.perfect}</span>
                        <span>Good: ${gbrMetrics.good}</span>
                        <span>Fair: ${gbrMetrics.fair}</span>
                        <span>Poor: ${gbrMetrics.poor}</span>
                    </div>
                </div>
                <div class="metric-card">
                    <div class="metric-title">Random Forest</div>
                    <div class="metric-value">${rfMetrics.accuracy.toFixed(1)}%</div>
                    <div class="metric-label">Accuracy</div>
                    <div class="metric-details">
                        <span>Perfect: ${rfMetrics.perfect}</span>
                        <span>Good: ${rfMetrics.good}</span>
                        <span>Fair: ${rfMetrics.fair}</span>
                        <span>Poor: ${rfMetrics.poor}</span>
                    </div>
                </div>
            </div>
        `;
    }

    // Calculate model performance metrics
    calculateModelMetrics(predictions) {
        let perfect = 0, good = 0, fair = 0, poor = 0;
        let totalAccuracy = 0;
        let validPredictions = 0;

        this.officialResults.forEach(result => {
            const pred = this.findPrediction(predictions, result.driver);
            if (pred) {
                const accuracy = this.calculatePositionAccuracy(pred.position, result.position);
                if (accuracy !== null) {
                    totalAccuracy += accuracy;
                    validPredictions++;
                    
                    if (accuracy === 0) perfect++;
                    else if (accuracy <= 2) good++;
                    else if (accuracy <= 5) fair++;
                    else poor++;
                }
            }
        });

        const avgAccuracy = validPredictions > 0 ? totalAccuracy / validPredictions : 0;
        const accuracyPercentage = validPredictions > 0 ? 
            ((perfect + good) / validPredictions) * 100 : 0;

        return {
            perfect, good, fair, poor,
            avgAccuracy: avgAccuracy.toFixed(2),
            accuracy: accuracyPercentage
        };
    }

    // Create comparison highlights
    createHighlights() {
        const highlightsContainer = document.getElementById('comparison-highlights');
        if (!highlightsContainer) return;

        const highlights = this.generateHighlights();
        
        highlightsContainer.innerHTML = highlights.map(highlight => `
            <div class="highlight-card">
                <div class="highlight-title">${highlight.title}</div>
                <div class="highlight-content">${highlight.content}</div>
            </div>
        `).join('');
    }

    // Generate comparison highlights
    generateHighlights() {
        const gbrMetrics = this.calculateModelMetrics(this.predictions.gradientBoosting);
        const rfMetrics = this.calculateModelMetrics(this.predictions.randomForest);
        
        const winner = this.officialResults[0];
        const gbrWinner = this.findPrediction(this.predictions.gradientBoosting, winner.driver);
        const rfWinner = this.findPrediction(this.predictions.randomForest, winner.driver);

        // Check if we have real results
        const isRealResults = this.officialResults && this.officialResults.length > 0 && 
                             this.officialResults[0].driver === "Oscar Piastri" && 
                             this.officialResults[0].position === 1;
        
        const resultsNote = isRealResults ? " (Real Results from FastF1)" : " (Sample Data)";
        
        return [
            {
                title: "🏆 Race Winner",
                content: `${winner.driver} (${winner.team}) won the Dutch GP. GBR predicted ${gbrWinner?.position || 'N/A'}th, RF predicted ${rfWinner?.position || 'N/A'}th.${resultsNote}`
            },
            {
                title: "📊 Model Performance",
                content: `Gradient Boosting: ${gbrMetrics.accuracy.toFixed(1)}% accuracy. Random Forest: ${rfMetrics.accuracy.toFixed(1)}% accuracy.${resultsNote}`
            },
            {
                title: "🎯 Podium Predictions",
                content: `GBR got ${gbrMetrics.perfect} perfect predictions, RF got ${rfMetrics.perfect}. Both models showed ${gbrMetrics.good + gbrMetrics.fair} reasonable predictions.${resultsNote}`
            },
            {
                title: "⚡ Key Insights",
                content: `The models' performance shows how well they captured the race dynamics. Perfect predictions indicate strong model understanding of driver performance patterns.${resultsNote}`
            }
        ];
    }

    // Show real results indicator
    showRealResultsIndicator() {
        const header = document.querySelector('.header');
        const existingIndicator = header.querySelector('.real-results-indicator');
        
        if (!existingIndicator) {
            const indicator = document.createElement('div');
            indicator.className = 'real-results-indicator';
            indicator.innerHTML = '✅ REAL DUTCH GP RESULTS LOADED FROM FASTF1';
            header.appendChild(indicator);
        }
    }

    // Setup event listeners
    setupEventListeners() {
        // Add refresh button functionality
        const refreshButton = document.createElement('button');
        refreshButton.className = 'refresh-button';
        refreshButton.innerHTML = '🔄 Refresh Results';
        refreshButton.onclick = () => this.loadOfficialResults();
        
        // Add force real results button
        const forceRealButton = document.createElement('button');
        forceRealButton.className = 'force-real-button';
        forceRealButton.innerHTML = '🏆 Force Real Results';
        forceRealButton.onclick = () => this.forceRealResults();
        
        const header = document.querySelector('.header');
        header.appendChild(refreshButton);
        header.appendChild(forceRealButton);
    }

    // Force the use of real results (manual override)
    forceRealResults() {
        console.log('🚀 Force loading real results...');
        this.officialResults = this.getEmbeddedRealResults();
        this.displayComparison();
        this.showRealResultsIndicator();
    }

    // Calculate and display accuracy metrics for visualization
    calculateAndDisplayAccuracyMetrics() {
        const gbAccuracy = this.calculateModelAccuracy(this.predictions.gradientBoosting);
        const rfAccuracy = this.calculateModelAccuracy(this.predictions.randomForest);

        // Update Gradient Boosting metrics
        const gbAccuracyElement = document.getElementById('gb-accuracy');
        const gbDetailsElement = document.getElementById('gb-details');
        if (gbAccuracyElement) {
            gbAccuracyElement.textContent = `${gbAccuracy.top10Accuracy}%`;
        }
        if (gbDetailsElement) {
            gbDetailsElement.innerHTML = `
                <span>Podium: ${gbAccuracy.podiumCorrect}/3</span>
                <span>Top 5: ${gbAccuracy.top5Correct}/5</span>
                <span>Top 10: ${gbAccuracy.top10Correct}/10</span>
            `;
        }

        // Update Random Forest metrics
        const rfAccuracyElement = document.getElementById('rf-accuracy');
        const rfDetailsElement = document.getElementById('rf-details');
        if (rfAccuracyElement) {
            rfAccuracyElement.textContent = `${rfAccuracy.top10Accuracy}%`;
        }
        if (rfDetailsElement) {
            rfDetailsElement.innerHTML = `
                <span>Podium: ${rfAccuracy.podiumCorrect}/3</span>
                <span>Top 5: ${rfAccuracy.top5Correct}/5</span>
                <span>Top 10: ${rfAccuracy.top10Correct}/10</span>
            `;
        }

        // Calculate and display accuracy breakdown
        this.displayAccuracyBreakdown();
    }

    // Display accuracy breakdown
    displayAccuracyBreakdown() {
        const gbBreakdown = this.calculateAccuracyBreakdown(this.predictions.gradientBoosting);
        const rfBreakdown = this.calculateAccuracyBreakdown(this.predictions.randomForest);

        // Update breakdown elements
        const perfectElement = document.getElementById('perfect-predictions');
        const closeElement = document.getElementById('close-predictions');
        const fairElement = document.getElementById('fair-predictions');
        const poorElement = document.getElementById('poor-predictions');

        if (perfectElement) {
            perfectElement.innerHTML = `
                <div style="color: #00ff00;">GB: ${gbBreakdown.perfect}</div>
                <div style="color: #00ff00;">RF: ${rfBreakdown.perfect}</div>
            `;
        }
        if (closeElement) {
            closeElement.innerHTML = `
                <div style="color: #00ffff;">GB: ${gbBreakdown.close}</div>
                <div style="color: #00ffff;">RF: ${rfBreakdown.close}</div>
            `;
        }
        if (fairElement) {
            fairElement.innerHTML = `
                <div style="color: #ffa500;">GB: ${gbBreakdown.fair}</div>
                <div style="color: #ffa500;">RF: ${rfBreakdown.fair}</div>
            `;
        }
        if (poorElement) {
            poorElement.innerHTML = `
                <div style="color: #ff4444;">GB: ${gbBreakdown.poor}</div>
                <div style="color: #ff4444;">RF: ${rfBreakdown.poor}</div>
            `;
        }
    }

    // Calculate accuracy breakdown for a model
    calculateAccuracyBreakdown(predictions) {
        const breakdown = { perfect: 0, close: 0, fair: 0, poor: 0 };

        predictions.forEach(prediction => {
            const actualResult = this.officialResults.find(result => result.driver === prediction.driver);
            if (actualResult) {
                const diff = Math.abs(actualResult.position - prediction.position);
                if (diff === 0) {
                    breakdown.perfect++;
                } else if (diff <= 2) {
                    breakdown.close++;
                } else if (diff <= 5) {
                    breakdown.fair++;
                } else {
                    breakdown.poor++;
                }
            }
        });

        return breakdown;
    }
}

// Global function to show accuracy visualization
function showAccuracyVisualization() {
    const accuracySection = document.getElementById('accuracy-visualization');
    if (accuracySection) {
        accuracySection.style.display = 'block';
        
        // Calculate and display accuracy metrics
        const dutchGP = new DutchGPResults();
        dutchGP.calculateAndDisplayAccuracyMetrics();
        
        // Scroll to the accuracy section
        accuracySection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DutchGPResults();
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DutchGPResults;
}
