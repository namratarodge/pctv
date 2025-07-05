// app/dashboard/Charts.tsx
'use client';

import { Line, Bar } from 'react-chartjs-2';

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

export default function HomeCharts() {
  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [{
      label: 'Content Created',
      data: [20, 40, 65, 80, 95],
      borderColor: '#3b82f6',
      fill: false,
    }],
  };

  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [{
      label: 'New Users',
      data: [50, 70, 100, 120, 150],
      backgroundColor: '#10b981',
    }],
  };

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <div className="bg-white p-4 rounded-md shadow">
        <h2 className="text-xl font-bold mb-4">Content Growth</h2>
        <Line data={lineData} />
      </div>
      <div className="bg-white p-4 rounded-md shadow">
        <h2 className="text-xl font-bold mb-4">User Registrations</h2>
        <Bar data={barData} />
      </div>
    </section>
  );
}