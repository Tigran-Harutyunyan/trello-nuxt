import { defineStore } from "pinia";

export const useMainStore = defineStore("main", () => {
  const isSidebarOpen = ref(false);

  const onOpenSidebar = () => {
    isSidebarOpen.value = true;
  }

  const onCloseSidebar = () => {
    isSidebarOpen.value = false;
  }


  return {
    isSidebarOpen,
    onOpenSidebar,
    onCloseSidebar,
  };
});
