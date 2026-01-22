<template>
  <div class="bg-[#F5F5F7] rounded-[10px] p-5 rder-gray-200 w-full h-full">
    <div class="flex items-center justify-between sm:mb-6 mb-4 flex-wrap">
      <h3
        class="text-base font-semibold leading-[150%] tracking-[-2%] text-[#141522]"
      >
        Activity
      </h3>
      <Select
        v-model="selectedPeriod"
        :options="periodOptions"
        :borderless="true"
        width="w-31"
        textColor="text-[#141522]"
      />
    </div>

    <div class="h-40">
      <Line :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

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

const activityData = ref([
  { day: "S", tasks: 1 },
  { day: "M", tasks: 6 },
  { day: "T", tasks: 3 },
  { day: "W", tasks: 4 },
  { day: "T", tasks: 0 },
  { day: "F", tasks: 7 },
  { day: "S", tasks: 1 },
]);

const chartData = computed<ChartData<"line">>(() => ({
  labels: activityData.value.map((d) => d.day),
  datasets: [
    {
      label: "Tasks",
      data: activityData.value.map((d) => d.tasks),
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
}));

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
      suggestedMax: 3,
      ticks: {
        stepSize: 1,
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
