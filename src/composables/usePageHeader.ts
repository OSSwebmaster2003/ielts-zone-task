import { ref } from "vue";

const pageHeader = ref<string>("");

export function usePageHeader() {
  const setPageHeader = (text: string) => {
    pageHeader.value = text;
  };

  const getPageHeader = () => {
    return pageHeader;
  };

  return {
    pageHeader,
    setPageHeader,
    getPageHeader,
  };
}
