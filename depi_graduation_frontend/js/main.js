// js/main.js
// Basic interactivity and sample charts for the front-end deliverable.
// - Toggle sidebar for small screens
// - Initialize Chart.js charts with sample data that matches the dashboard screenshot

document.addEventListener('DOMContentLoaded', function(){

  // Sidebar toggle for mobile
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');
  menuToggle.addEventListener('click', ()=>{
    sidebar.classList.toggle('open');
  });

  // Search (simple behavior)
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  searchBtn && searchBtn.addEventListener('click', ()=>{
    const q = searchInput.value.trim();
    if(q) alert('Search for: ' + q);
    else alert('Please type a search term.');
  });

  // Charts
  // Line (Campaign Performance)
  const lineCtx = document.getElementById('lineChart').getContext('2d');
  new Chart(lineCtx, {
    type: 'line',
    data: {
      labels: ['Jul','Aug','Oct','Nov','Dec','Jan','Feb','Mar','Apr'],
      datasets: [
        {label:'Campaign', data:[3000,3600,3200,4500,4000,4200,4800,5000,5400], borderColor:'#2b8cff', fill:false, tension:0.35},
        {label:'Email', data:[2000,2200,2000,2600,2500,2800,3000,3200,3600], borderColor:'#ff8a3d', fill:false, tension:0.35},
        {label:'Social', data:[600,700,650,900,800,850,950,1000,1200], borderColor:'#22c55e', fill:false, tension:0.35}
      ]
    },
    options:{plugins:{legend:{display:true}}, maintainAspectRatio:false, scales:{y:{beginAtZero:true}}}
  });

  // Doughnut (distribution)
  const dCtx = document.getElementById('doughnutChart').getContext('2d');
  new Chart(dCtx, {
    type:'doughnut',
    data:{labels:['A','B','C','D'], datasets:[{data:[35,25,20,20], backgroundColor:['#2b8cff','#22c55e','#ff8a3d','#e14d4d']} ]},
    options:{cutout:'70%', plugins:{legend:{position:'bottom'}}}
  });

  // doughnut 2
  const d2 = document.getElementById('doughnutChart2').getContext('2d');
  new Chart(d2, {type:'doughnut', data:{labels:['Client A','Client B','Client C'], datasets:[{data:[45,35,20], backgroundColor:['#2b8cff','#22c55e','#ff8a3d']} ]}, options:{cutout:'60%'}});

  // Bar chart (Engagement)
  const barCtx = document.getElementById('barChart').getContext('2d');
  new Chart(barCtx, {
    type: 'bar',
    data: {labels:['Mon','Tue','Wed','Thu','Fri','Sat'], datasets:[{label:'Engagement', data:[7000,4800,6100,3800,4300,5600], backgroundColor:'#2b8cff'}]},
    options:{plugins:{legend:{display:false}}, scales:{y:{beginAtZero:true}}, maintainAspectRatio:false}
  });

});
