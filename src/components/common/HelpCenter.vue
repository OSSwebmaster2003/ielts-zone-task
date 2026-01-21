<template>
  <div class="help-center-wrapper relative mt-auto">
    <!-- Question mark icon with glow, overlapping at top -->
    <div class="w-16 h-16 bg-[#141522] absolute rounded-full flex items-center justify-center shadow-lg z-20 border-4 border-white left-1/2 -translate-x-1/2 -top-8" style="box-shadow: 0 0 20px rgba(255, 255, 255, 0.3), 0 4px 12px rgba(0, 0, 0, 0.15), 0 0 30px rgba(0, 0, 0, 0.1);">
      <span class="font-bold text-[28px] leading-[120%] tracking-[1%] text-white">
        ?
      </span>
    </div>

    <div class="help-center-card relative bg-[#141522] text-white rounded-lg p-4.5 overflow-hidden">
      <!-- Decorative curved shapes in corners -->
      <div class="absolute top-0 left-0 w-40 h-40 rounded-full -translate-x-1/2 -translate-y-1/2 " style="background-color: rgba(255, 255, 255, 0.08);"></div>
      <div class="absolute bottom-0 right-0 w-40 h-40 rounded-full translate-x-1/2 translate-y-1/2 " style="background-color: rgba(255, 255, 255, 0.08);"></div>

      <h3 class="text-base font-semibold leading-[150%] tracking-[-2%] text-center mb-3 z-10 mt-13">
        Help Center
      </h3>

      <p class="text-xs text-white text-center mb-9  relative z-10 font-medium tracking-[-2%]">
        Having Trouble in Learning.<br>
        Please contact us for<br>
        more questions.
      </p>

      <button class="w-full bg-white text-[#141522] rounded-[10px] py-3 font-semibold text-xs hover:bg-gray-100 transition-all relative z-10 cursor-pointer tracking-[-2%]">
        Go To Help Center
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.help-center-wrapper {
  position: relative;
}

.help-center-card {
  position: relative;
}
</style>
