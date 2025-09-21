// Azerbaijan GP Results Loader and Comparison Script
// This script loads official Azerbaijan GP results and compares them with ML predictions

class AzerbaijanGPResults {
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

    // Load official race results
    loadOfficialResults() {
        // Official 2025 Azerbaijan Grand Prix Results
        this.officialResults = [
            { position: 1, driver: "Max Verstappen", team: "Red Bull Racing", actualPosition: 1, status: "Finished" },
            { position: 2, driver: "George Russell", team: "Mercedes", actualPosition: 2, status: "Finished" },
            { position: 3, driver: "Carlos Sainz", team: "Williams", actualPosition: 3, status: "Finished" },
            { position: 4, driver: "Kimi Antonelli", team: "Mercedes", actualPosition: 4, status: "Finished" },
            { position: 5, driver: "Liam Lawson", team: "Racing Bulls", actualPosition: 5, status: "Finished" },
            { position: 6, driver: "Isack Hadjar", team: "Racing Bulls", actualPosition: 6, status: "Finished" },
            { position: 7, driver: "Lando Norris", team: "McLaren", actualPosition: 7, status: "Finished" },
            { position: 8, driver: "Lewis Hamilton", team: "Ferrari", actualPosition: 8, status: "Finished" },
            { position: 9, driver: "Charles Leclerc", team: "Ferrari", actualPosition: 9, status: "Finished" },
            { position: 10, driver: "Fernando Alonso", team: "Aston Martin", actualPosition: 10, status: "Finished" },
            { position: 11, driver: "Lance Stroll", team: "Aston Martin", actualPosition: 11, status: "Finished" },
            { position: 12, driver: "Gabriel Bortoleto", team: "Kick Sauber", actualPosition: 12, status: "Finished" },
            { position: 13, driver: "Nico Hulkenberg", team: "Kick Sauber", actualPosition: 13, status: "Finished" },
            { position: 14, driver: "Alexander Albon", team: "Williams", actualPosition: 14, status: "Finished" },
            { position: 15, driver: "Esteban Ocon", team: "Haas F1 Team", actualPosition: 15, status: "Finished" },
            { position: 16, driver: "Pierre Gasly", team: "Alpine", actualPosition: 16, status: "Finished" },
            { position: 17, driver: "Yuki Tsunoda", team: "Red Bull Racing", actualPosition: 17, status: "Finished" },
            { position: 18, driver: "Oliver Bearman", team: "Haas F1 Team", actualPosition: 18, status: "Finished" },
            { position: 19, driver: "Franco Colapinto", team: "Alpine", actualPosition: 19, status: "Finished" },
            { position: 20, driver: "Oscar Piastri", team: "McLaren", actualPosition: 21, status: "DNF" } // Crashed on lap 1
        ];
    }

    // Setup event listeners
    setupEventListeners() {
        // Add refresh button functionality
        const refreshButton = document.createElement('button');
        refreshButton.className = 'refresh-button';
        refreshButton.textContent = '🔄 Load Official Results';
        refreshButton.onclick = () => this.displayResultsComparison();
        
        const forceRealButton = document.createElement('button');
        forceRealButton.className = 'force-real-button';
        forceRealButton.textContent = '📊 Show Analysis';
        forceRealButton.onclick = () => this.showDetailedAnalysis();

        // Add buttons to the first model section
        const firstModelSection = document.querySelector('.model-section:first-child');
        if (firstModelSection) {
            firstModelSection.appendChild(refreshButton);
            firstModelSection.appendChild(forceRealButton);
        }
    }

    // Display results comparison
    displayResultsComparison() {
        // Hide detailed analysis if it's showing
        const detailedAnalysis = document.getElementById('detailed-analysis');
        if (detailedAnalysis) {
            detailedAnalysis.style.display = 'none';
        }

        // Show results comparison
        const resultsComparison = document.getElementById('results-comparison');
        if (resultsComparison) {
            resultsComparison.style.display = 'block';
        }

        // Populate official results
        this.populateOfficialResults();
        
        // Calculate and display accuracy metrics
        this.calculateAccuracyMetrics();
    }

    // Populate official results table
    populateOfficialResults() {
        const tbody = document.getElementById('official-results-tbody');
        if (!tbody) return;

        tbody.innerHTML = '';
        this.officialResults.forEach(result => {
            const row = document.createElement('tr');
            if (result.position <= 3) {
                row.className = 'podium';
            }
            
            const statusClass = result.status === 'DNF' ? 'poor' : 'good';
            
            // Find predictions for this driver
            const gbPrediction = this.predictions.gradientBoosting.find(p => p.driver === result.driver);
            const rfPrediction = this.predictions.randomForest.find(p => p.driver === result.driver);
            
            const gbPredPos = gbPrediction ? gbPrediction.position : '-';
            const rfPredPos = rfPrediction ? rfPrediction.position : '-';
            
            // Calculate accuracy classes
            const gbAccuracy = this.getAccuracyClass(result.position, gbPredPos);
            const rfAccuracy = this.getAccuracyClass(result.position, rfPredPos);
            
            row.innerHTML = `
                <td class="position">${result.position}</td>
                <td class="driver">${result.driver}</td>
                <td class="team">${result.team}</td>
                <td class="status ${statusClass}">${result.status}</td>
                <td class="prediction ${gbAccuracy}">${gbPredPos}</td>
                <td class="prediction ${rfAccuracy}">${rfPredPos}</td>
            `;
            tbody.appendChild(row);
        });
    }

    // Get accuracy class for prediction styling
    getAccuracyClass(actualPos, predictedPos) {
        if (predictedPos === '-') return 'poor';
        
        const diff = Math.abs(actualPos - predictedPos);
        if (diff === 0) return 'perfect';
        if (diff <= 2) return 'good';
        if (diff <= 5) return 'fair';
        return 'poor';
    }

    // Calculate accuracy metrics
    calculateAccuracyMetrics() {
        const gbAccuracy = this.calculateModelAccuracy(this.predictions.gradientBoosting);
        const rfAccuracy = this.calculateModelAccuracy(this.predictions.randomForest);

        // Update Gradient Boosting metrics
        document.getElementById('gb-accuracy').textContent = `${gbAccuracy.top10Accuracy}%`;
        document.getElementById('gb-details').innerHTML = `
            <span>Podium: ${gbAccuracy.podiumCorrect}/3</span>
            <span>Top 5: ${gbAccuracy.top5Correct}/5</span>
            <span>Top 10: ${gbAccuracy.top10Correct}/10</span>
        `;

        // Update Random Forest metrics
        document.getElementById('rf-accuracy').textContent = `${rfAccuracy.top10Accuracy}%`;
        document.getElementById('rf-details').innerHTML = `
            <span>Podium: ${rfAccuracy.podiumCorrect}/3</span>
            <span>Top 5: ${rfAccuracy.top5Correct}/5</span>
            <span>Top 10: ${rfAccuracy.top10Correct}/10</span>
        `;
    }

    // Calculate model accuracy
    calculateModelAccuracy(predictions) {
        const actualTop10 = this.officialResults.slice(0, 10).map(r => r.driver);
        const actualTop5 = this.officialResults.slice(0, 5).map(r => r.driver);
        const actualPodium = this.officialResults.slice(0, 3).map(r => r.driver);

        const predictedTop10 = predictions.slice(0, 10).map(p => p.driver);
        const predictedTop5 = predictions.slice(0, 5).map(p => p.driver);
        const predictedPodium = predictions.slice(0, 3).map(p => p.driver);

        const top10Correct = predictedTop10.filter(driver => actualTop10.includes(driver)).length;
        const top5Correct = predictedTop5.filter(driver => actualTop5.includes(driver)).length;
        const podiumCorrect = predictedPodium.filter(driver => actualPodium.includes(driver)).length;

        return {
            top10Accuracy: Math.round((top10Correct / 10) * 100),
            top5Accuracy: Math.round((top5Correct / 5) * 100),
            podiumAccuracy: Math.round((podiumCorrect / 3) * 100),
            top10Correct,
            top5Correct,
            podiumCorrect
        };
    }

    // Show detailed analysis
    showDetailedAnalysis() {
        // Hide results comparison if it's showing
        const resultsComparison = document.getElementById('results-comparison');
        if (resultsComparison) {
            resultsComparison.style.display = 'none';
        }

        // Show detailed analysis
        const detailedAnalysis = document.getElementById('detailed-analysis');
        if (detailedAnalysis) {
            detailedAnalysis.style.display = 'block';
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AzerbaijanGPResults();
});
