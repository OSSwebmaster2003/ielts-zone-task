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
          <canvas ref="progressCanvas" width="80" height="80"></canvas>
          <div class="absolute inset-0 flex items-center justify-center">
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
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from "vue";
import { Chart, ArcElement, Tooltip } from "chart.js";

Chart.register(ArcElement, Tooltip);

const progressCanvas = ref<HTMLCanvasElement | null>(null);
let progressChart: Chart | null = null;

const runningTaskData = ref({
  current: 65,
  total: 100,
  progress: 45,
});

const initChart = () => {
  if (!progressCanvas.value) return;

  const ctx = progressCanvas.value.getContext("2d");
  if (!ctx) return;

  const canvas = progressCanvas.value;
  const container = canvas.parentElement;
  if (container) {
    const size = Math.min(container.clientWidth, container.clientHeight);
    canvas.width = size;
    canvas.height = size;
  }

  if (progressChart) {
    progressChart.destroy();
    progressChart = null;
  }

  progressChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      datasets: [
        {
          data: [
            runningTaskData.value.progress,
            100 - runningTaskData.value.progress,
          ],
          backgroundColor: ["#546fff", "rgba(84, 111, 255, 0.1)"],
          borderWidth: 0,
          // @ts-ignore
          cutout: "75%",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        tooltip: {
          enabled: false,
        },
      },
    },
  });
};

onMounted(async () => {
  await nextTick();
  setTimeout(() => {
    initChart();
  }, 0);
});

onBeforeUnmount(() => {
  if (progressChart) {
    progressChart.destroy();
    progressChart = null;
  }
});

watch(
  () => runningTaskData.value.progress,
  (newProgress) => {
    if (progressChart) {
      // @ts-ignore
      progressChart.data.datasets[0].data = [newProgress, 100 - newProgress];
      progressChart.update();
    }
  },
);
</script>
