import { defineStore } from "pinia";

export const useMainStore = defineStore("main", () => {
  const activeOragnization = ref(null);

  const setOrganization = (data) => {
    activeOragnization.value = data;
  }

  return {
    activeOragnization,
    setOrganization,
  };
});
