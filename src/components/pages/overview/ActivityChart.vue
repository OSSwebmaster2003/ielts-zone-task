<script setup lang="ts">
import { ref, computed } from "vue";
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  type ChartData,
  type ChartOptions,
  type TooltipItem,
} from "chart.js";
import Select from "@/ui/Select.vue";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const selectedPeriod = ref("thisWeek");

const periodOptions = [
  { label: "This Week", value: "thisWeek" },
  { label: "This Month", value: "thisMonth" },
  { label: "This Year", value: "thisYear" },
];

const activityDataByPeriod = {
  thisWeek: [
    { label: "S", tasks: 1 },
    { label: "M", tasks: 6 },
    { label: "T", tasks: 3 },
    { label: "W", tasks: 4 },
    { label: "T", tasks: 0 },
    { label: "F", tasks: 7 },
    { label: "S", tasks: 1 },
  ],
  thisMonth: [
    { label: "Week 1", tasks: 12 },
    { label: "Week 2", tasks: 18 },
    { label: "Week 3", tasks: 15 },
    { label: "Week 4", tasks: 22 },
  ],
  thisYear: [
    { label: "Jan", tasks: 45 },
    { label: "Feb", tasks: 52 },
    { label: "Mar", tasks: 38 },
    { label: "Apr", tasks: 61 },
    { label: "May", tasks: 55 },
    { label: "Jun", tasks: 48 },
    { label: "Jul", tasks: 42 },
    { label: "Aug", tasks: 58 },
    { label: "Sep", tasks: 50 },
    { label: "Oct", tasks: 65 },
    { label: "Nov", tasks: 47 },
    { label: "Dec", tasks: 53 },
  ],
};

const chartData = computed<ChartData<"line">>(() => {
  const data = activityDataByPeriod[selectedPeriod.value as keyof typeof activityDataByPeriod];
  return {
    labels: data.map((d) => d.label),
    datasets: [
      {
        label: "Tasks",
        data: data.map((d) => d.tasks),
        borderColor: "#1a1a2e",
        borderWidth: 3,
        tension: 0.45,
        fill: false,

        pointRadius: 0,
        pointHoverRadius: 8,
        pointHitRadius: 12,
        pointBackgroundColor: "#ffffff",
        pointBorderColor: "#4f46e5",
        pointBorderWidth: 4,
      },
    ],
  };
});

const chartOptions = computed<ChartOptions<"line">>(() => ({
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: "index",
    intersect: false,
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: "#1a1a2e",
      padding: 10,
      displayColors: false,
      yAlign: "bottom",
      caretPadding: 12,

      titleFont: {
        size: 12,
        weight: "bold",
      },
      bodyFont: {
        size: 11,
      },
      callbacks: {
        label: (ctx: TooltipItem<"line">) => {
          const value = ctx.parsed.y;
          if (value === null) return "";
          const rounded = Math.round(value);
          return `${rounded} Task${rounded !== 1 ? "s" : ""}`;
        },
      },
    },
  },
  scales: {
    y: {
      grid: {
        display: false,
      },
      ticks: {
        color: "#666",
        font: {
          size: 12,
          weight: 500,
        },
      },
    },
    x: {
      beginAtZero: true,
      ticks: {
        color: "#666",
        font: {
          size: 12,
        },
      },
      grid: {
        color: "#e5e7eb",
      },
    },
  },
}));
</script>

<template>
  <div class="bg-[#F5F5F7] rounded-[10px] p-5 rder-gray-200 w-full h-full">
    <div class="flex items-center justify-between sm:mb-6 mb-4 flex-wrap">
      <h3 class="text-base font-semibold leading-[150%] tracking-[-2%] text-[#141522]">
        Activity
      </h3>
      <Select v-model="selectedPeriod" :options="periodOptions" :borderless="true" width="w-31"
        textColor="text-[#141522]" />
    </div>

    <div class="h-40">
      <Line :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>
