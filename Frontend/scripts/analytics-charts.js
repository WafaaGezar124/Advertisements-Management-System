/**
 * AdSphere - Analytics & Reports JavaScript
 * Handles all chart rendering and interactive functionality for analytics dashboard
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
    initializeEventListeners();
    initializeExportFunctions();
});

/**
 * Initialize all charts on the analytics page
 */
function initializeCharts() {
    // Mini sparkline charts for metric cards
    createSparklineChart('impressionsChart', [120, 135, 130, 145, 155, 148, 165]);
    createSparklineChart('clicksChart', [42, 45, 48, 50, 52, 48, 55]);
    createSparklineChart('conversionsChart', [5.2, 5.5, 5.8, 6.1, 6.5, 6.3, 6.8]);
    createSparklineChart('roiChart', [220, 230, 235, 240, 238, 242, 245]);

    // Main campaign performance chart
    createCampaignPerformanceChart();

    // Channel performance doughnut chart
    createChannelsChart();

    // Demographics bar chart
    createDemographicsChart();
}

/**
 * Create sparkline charts for metric cards
 */
function createSparklineChart(canvasId, data) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                data: data,
                borderColor: getComputedStyle(document.documentElement).getPropertyValue('--primary') || '#0d6efd',
                borderWidth: 2,
                fill: true,
                backgroundColor: 'rgba(13, 110, 253, 0.1)',
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 4,
                pointHoverBackgroundColor: '#0d6efd',
                pointHoverBorderColor: '#fff',
                pointHoverBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: true,
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 8,
                    displayColors: false,
                    callbacks: {
                        title: function() { return ''; },
                        label: function(context) {
                            return context.parsed.y.toFixed(1);
                        }
                    }
                }
            },
            scales: {
                x: {
                    display: false
                },
                y: {
                    display: false
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });
}

/**
 * Create main campaign performance line chart
 */
function createCampaignPerformanceChart() {
    const ctx = document.getElementById('campaignPerformanceChart');
    if (!ctx) return;

    const performanceChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan 1', 'Jan 5', 'Jan 10', 'Jan 15', 'Jan 20', 'Jan 25', 'Jan 30'],
            datasets: [
                {
                    label: 'Summer Sale 2024',
                    data: [320, 350, 380, 420, 450, 440, 456],
                    borderColor: '#0d6efd',
                    backgroundColor: 'rgba(13, 110, 253, 0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 2
                },
                {
                    label: 'Product Launch Q2',
                    data: [280, 290, 295, 310, 320, 315, 318],
                    borderColor: '#6c757d',
                    backgroundColor: 'rgba(108, 117, 125, 0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 2
                },
                {
                    label: 'Brand Awareness',
                    data: [450, 480, 520, 560, 590, 610, 625],
                    borderColor: '#28a745',
                    backgroundColor: 'rgba(40, 167, 69, 0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 2
                },
                {
                    label: 'Holiday Special',
                    data: [150, 160, 170, 175, 185, 190, 195],
                    borderColor: '#ffc107',
                    backgroundColor: 'rgba(255, 193, 7, 0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        padding: 15,
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    titleFont: {
                        size: 13
                    },
                    bodyFont: {
                        size: 12
                    },
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            label += context.parsed.y + 'K impressions';
                            return label;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            size: 11
                        }
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        callback: function(value) {
                            return value + 'K';
                        },
                        font: {
                            size: 11
                        }
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });

    // Handle metric type selector change
    const metricSelector = document.querySelector('.card-body select.form-select');
    if (metricSelector) {
        metricSelector.addEventListener('change', function(e) {
            updateChartMetric(performanceChart, e.target.value);
        });
    }
}

/**
 * Update chart based on selected metric
 */
function updateChartMetric(chart, metric) {
    const metricData = {
        'Impressions': {
            data: [
                [320, 350, 380, 420, 450, 440, 456],
                [280, 290, 295, 310, 320, 315, 318],
                [450, 480, 520, 560, 590, 610, 625],
                [150, 160, 170, 175, 185, 190, 195]
            ],
            suffix: 'K impressions'
        },
        'Clicks': {
            data: [
                [12, 13, 14, 15, 16, 15, 15.1],
                [10, 11, 11.5, 12, 12.2, 12.3, 12.4],
                [16, 17, 17.5, 18, 18.3, 18.4, 18.5],
                [13, 14, 14.2, 14.5, 14.7, 14.8, 14.8]
            ],
            suffix: 'K clicks'
        },
        'Conversions': {
            data: [
                [1.4, 1.45, 1.5, 1.55, 1.6, 1.62, 1.642],
                [1.3, 1.35, 1.4, 1.45, 1.48, 1.5, 1.52],
                [0.85, 0.88, 0.9, 0.93, 0.95, 0.97, 0.982],
                [1.5, 1.55, 1.6, 1.63, 1.65, 1.67, 1.68]
            ],
            suffix: 'K conversions'
        }
    };

    const selectedData = metricData[metric];
    if (selectedData) {
        chart.data.datasets.forEach((dataset, index) => {
            dataset.data = selectedData.data[index];
        });
        
        chart.options.plugins.tooltip.callbacks.label = function(context) {
            let label = context.dataset.label || '';
            if (label) {
                label += ': ';
            }
            label += context.parsed.y + ' ' + selectedData.suffix;
            return label;
        };
        
        chart.update();
    }
}

/**
 * Create channels performance doughnut chart
 */
function createChannelsChart() {
    const ctx = document.getElementById('channelsChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Google Ads', 'Facebook', 'Instagram', 'LinkedIn', 'Twitter', 'YouTube'],
            datasets: [{
                data: [35, 25, 20, 10, 5, 5],
                backgroundColor: [
                    '#0d6efd',
                    '#0dcaf0',
                    '#d63384',
                    '#0077b5',
                    '#1da1f2',
                    '#ff0000'
                ],
                borderWidth: 0,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        usePointStyle: true,
                        padding: 15,
                        font: {
                            size: 12
                        },
                        generateLabels: function(chart) {
                            const data = chart.data;
                            if (data.labels.length && data.datasets.length) {
                                return data.labels.map((label, i) => {
                                    const value = data.datasets[0].data[i];
                                    return {
                                        text: `${label} (${value}%)`,
                                        fillStyle: data.datasets[0].backgroundColor[i],
                                        hidden: false,
                                        index: i
                                    };
                                });
                            }
                            return [];
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + '% of traffic';
                        }
                    }
                }
            }
        }
    });
}

/**
 * Create demographics bar chart
 */
function createDemographicsChart() {
    const ctx = document.getElementById('demographicsChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['18-24', '25-34', '35-44', '45-54', '55-64', '65+'],
            datasets: [
                {
                    label: 'Male',
                    data: [15, 28, 25, 18, 10, 4],
                    backgroundColor: '#0d6efd',
                    borderRadius: 4
                },
                {
                    label: 'Female',
                    data: [18, 32, 22, 15, 9, 4],
                    backgroundColor: '#d63384',
                    borderRadius: 4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 15,
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y + '%';
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            size: 11
                        }
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        },
                        font: {
                            size: 11
                        }
                    }
                }
            }
        }
    });
}

/**
 * Initialize event listeners for interactive elements
 */
function initializeEventListeners() {
    // Add animation to metric cards on hover
    const metricCards = document.querySelectorAll('.metric-card');
    metricCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });

    // Animate table rows on hover
    const tableRows = document.querySelectorAll('table tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f8f9fa';
            this.style.transition = 'background-color 0.2s ease';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
        });
    });
}

/**
 * Initialize export functionality
 */
function initializeExportFunctions() {
    // Export as PDF button
    const pdfBtn = document.querySelector('.btn-outline-primary');
    if (pdfBtn && pdfBtn.textContent.includes('PDF')) {
        pdfBtn.addEventListener('click', function() {
            showExportNotification('Generating PDF report...', 'info');
            
            // Simulate export process
            setTimeout(() => {
                showExportNotification('PDF report exported successfully!', 'success');
                // In production, this would trigger actual PDF generation
                console.log('Exporting analytics report as PDF...');
            }, 1500);
        });
    }

    // Export as Excel button
    const excelBtn = document.querySelector('.btn-outline-success');
    if (excelBtn && excelBtn.textContent.includes('Excel')) {
        excelBtn.addEventListener('click', function() {
            showExportNotification('Generating Excel spreadsheet...', 'info');
            
            // Simulate export process
            setTimeout(() => {
                showExportNotification('Excel file exported successfully!', 'success');
                // In production, this would trigger actual Excel generation
                console.log('Exporting analytics report as Excel...');
            }, 1500);
        });
    }

    // Schedule Report button
    const scheduleBtn = document.querySelector('.btn-primary');
    if (scheduleBtn && scheduleBtn.textContent.includes('Schedule')) {
        scheduleBtn.addEventListener('click', function() {
            showScheduleModal();
        });
    }
}

/**
 * Show export notification
 */
function showExportNotification(message, type) {
    // Create toast notification
    const toast = document.createElement('div');
    toast.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    toast.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    toast.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(toast);
    
    // Auto dismiss after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 150);
    }, 3000);
}

/**
 * Show schedule report modal
 */
function showScheduleModal() {
    // Create modal dynamically
    const modalHtml = `
        <div class="modal fade" id="scheduleReportModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Schedule Report</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form id="scheduleReportForm">
                            <div class="mb-3">
                                <label class="form-label">Report Frequency</label>
                                <select class="form-select" required>
                                    <option value="">Select frequency...</option>
                                    <option value="daily">Daily</option>
                                    <option value="weekly">Weekly</option>
                                    <option value="monthly">Monthly</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Email Recipients</label>
                                <input type="email" class="form-control" placeholder="email@example.com" required>
                                <small class="form-text text-muted">Separate multiple emails with commas</small>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Report Format</label>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="format" value="pdf" checked>
                                    <label class="form-check-label">PDF</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="format" value="excel">
                                    <label class="form-check-label">Excel</label>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Start Date</label>
                                <input type="date" class="form-control" required>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" onclick="submitScheduleReport()">Schedule Report</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to page if not exists
    if (!document.getElementById('scheduleReportModal')) {
        document.body.insertAdjacentHTML('beforeend', modalHtml);
    }
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('scheduleReportModal'));
    modal.show();
}

/**
 * Submit schedule report form
 */
window.submitScheduleReport = function() {
    const form = document.getElementById('scheduleReportForm');
    if (form.checkValidity()) {
        showExportNotification('Report scheduled successfully!', 'success');
        const modal = bootstrap.Modal.getInstance(document.getElementById('scheduleReportModal'));
        modal.hide();
    } else {
        form.reportValidity();
    }
}

/**
 * Utility function to format numbers
 */
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

/**
 * Update metrics in real-time (simulate live data)
 */
function startLiveUpdates() {
    setInterval(() => {
        // This would connect to real-time data source in production
        console.log('Checking for metric updates...');
    }, 30000); // Check every 30 seconds
}

// Initialize live updates
startLiveUpdates();

console.log('Analytics charts initialized successfully');
