<template>
  <div
    class="bg-[#141522] flex flex-row sm:flex-col justify-between items-center sm:items-start text-white rounded-[10px] p-5 flex-wrap w-full h-full">
    <div>
      <h3 class="text-white font-semibold text-base leading-[150%] tracking-[-2%] sm:mb-4 mb-2">
        Running Task
      </h3>
      <div class="text-[32px] font-bold sm:mb-2 mb-1">
        {{ runningTaskData.current }}
      </div>
    </div>
    <div class="">
      <div class="flex items-center flex-wrap gap-4.5">
        <div class="w-20 h-20 relative">
          <Doughnut :data="chartData" :options="chartOptions" />
          <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span class="text-sm font-semibold">{{ runningTaskData.progress }}%</span>
          </div>
        </div>
        <div>
          <div class="text-xl font-semibold">{{ runningTaskData.total }}</div>
          <div class="text-[#8E92BC] text-sm font-medium">Task</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { Doughnut } from "vue-chartjs";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  type ChartData,
  type ChartOptions,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip);

const runningTaskData = ref({
  current: 65,
  total: 100,
  progress: 45,
});

const chartData = computed<ChartData<"doughnut">>(() => ({
  datasets: [
    {
      data: [
        runningTaskData.value.progress,
        100 - runningTaskData.value.progress,
      ],
      backgroundColor: ["#546fff", "rgba(84, 111, 255, 0.1)"],
      borderWidth: 0,
      cutout: "75%",
    },
  ],
}));

const chartOptions = computed<ChartOptions<"doughnut">>(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    tooltip: {
      enabled: false,
    },
  },
}));
</script>
