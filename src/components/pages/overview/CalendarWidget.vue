<script setup lang="ts">
import { ref, computed } from "vue";
import { ChevronLeft, ChevronRight } from "lucide-vue-next";

const dayHeaders = ["S", "M", "T", "W", "T", "F", "S"];

const currentWeekStart = ref<Date>(getWeekStart(new Date()));

function getWeekStart(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day;
  return new Date(d.setDate(diff));
}

function getWeekDates(startDate: Date): Date[] {
  const dates: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    dates.push(date);
  }
  return dates;
}

const weekDates = computed(() => getWeekDates(currentWeekStart.value));

const currentMonthYear = computed(() => {
  const date = weekDates.value[0];
  if (!date) return "";
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
});

const today = new Date();
today.setHours(0, 0, 0, 0);

function isToday(date: Date): boolean {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d.getTime() === today.getTime();
}

function goToNextWeek() {
  const newDate = new Date(currentWeekStart.value);
  newDate.setDate(newDate.getDate() + 7);
  currentWeekStart.value = newDate;
}

function goToPreviousWeek() {
  const newDate = new Date(currentWeekStart.value);
  newDate.setDate(newDate.getDate() - 7);
  currentWeekStart.value = newDate;
}
</script>

<template>
  <div class="bg-white rounded-[10px] p-6">
    <div class="flex items-center w-full justify-between mb-6">
      <button @click="goToPreviousWeek" class="">
        <ChevronLeft :size="20" class="text-gray-400" />
      </button>
      <span class="text-lg font-semibold text-[#141522]">
        {{ currentMonthYear }}
      </span>
      <button @click="goToNextWeek" class="">
        <ChevronRight :size="20" class="text-gray-400" />
      </button>
    </div>

    <div class="grid grid-cols-7 gap-2">
      <div
        v-for="date in weekDates"
        :key="`date-${date.getTime()}`"
        :class="[
          'flex flex-col items-center gap-3 p-1 rounded-full',
          isToday(date) ? 'bg-[#141522]' : '',
        ]"
      >
        <div
          :class="[
            'text-center text-xs font-semibold',
            isToday(date) ? 'text-white' : 'text-gray-600',
          ]"
        >
          {{ dayHeaders[date.getDay()] }}
        </div>
        <div
          :class="[
            'text-center text-[10px] rounded-full transition-all w-4 h-4 flex items-center justify-center',
            isToday(date)
              ? 'bg-white text-red-500 font-semibold'
              : 'bg-gray-100 text-[#141522]',
          ]"
        >
          {{ date.getDate() }}
        </div>
      </div>
    </div>
  </div>
</template>
