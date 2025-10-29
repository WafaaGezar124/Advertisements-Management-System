// Performance Chart
const ctx = document.getElementById('performanceChart').getContext('2d');
new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
        datasets: [{
            label: 'Revenue',
            data: [3000, 4000, 3500, 5000, 6000],
            borderColor: '#256D6F',
            borderWidth: 2,
            fill: true
        }]
    },
    options: {
        responsive: true,
        scales: { y: { beginAtZero: true } }
    }
});

// Engagement Chart
const ctx02 = document.getElementById('engagementChart').getContext('2d');
new Chart(ctx02, {
    type: 'doughnut',
    data: {
        labels: ['Likes', 'Comments', 'Shares', 'Views'],
        datasets: [{
            label: 'Engagement Rate',
            data: [45, 25, 15, 15],
            backgroundColor: ['#0d6efd', '#198754', '#ffc107', '#dc3545'],
            borderColor: '#fff',
            borderWidth: 2
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { position: 'bottom' },
            tooltip: {
                backgroundColor: '#000',
                titleColor: '#fff',
                bodyColor: '#fff'
            }
        },
        cutout: '65%'
    }
});

// Client Engagement Chart
const ctx03 = document.getElementById('clientEngagementChart').getContext('2d');
new Chart(ctx03, {
    type: 'bar',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'Active Clients',
            data: [120, 150, 180, 200, 230, 250, 300, 320, 310, 350, 370, 400],
            backgroundColor: '#256D6F',
            borderRadius: 8
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: { beginAtZero: true },
            x: { ticks: { color: '#333' } }
        }
    }
});
