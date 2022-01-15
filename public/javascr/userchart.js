const labels = [
    'Not Vaccinated',
    'Half Vaccinated',
    'Fully Vaccinated',
]
const data = {
    labels: labels,
    datasets: [{
        label: 'Vacination Drivw',
        data: [nvv, hvv, fvv],
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
        ],
        borderWidth: 1
    }]
};

const config = {
    type: 'bar',
    data: data,
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    },
};

const myChart = new Chart(
    document.getElementById('UserChart'),
    config
);