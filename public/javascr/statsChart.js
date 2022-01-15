const labels = [
    'Deaths',
    'Confirmed',
    'Cured',
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
    hoverOffset: 4
    }]
};

const config = {
    type: 'doughnut',
    data: data,
  };

const myChart = new Chart(
    document.getElementById('statsChart'),
    config
);