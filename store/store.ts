import { defineStore } from "pinia";

export const useMainStore = defineStore("main", () => {
  const isSidebarOpen = ref(false);
  const isCardModalOpen = ref(false);
  const isProModalOpen = ref(false);
  const pendingCardId = ref(''); // Id of card to open modal with.
  const isPro = ref(false);
  const availableCount = ref();

  const setPendingCard = (id: string) => {
    pendingCardId.value = id;
  }

  const onOpenCardModal = () => {
    isCardModalOpen.value = true;
  }

  const closeCardModal = () => {
    isCardModalOpen.value = false;
  }

  const onOpenSidebar = () => {
    isSidebarOpen.value = true;
  }

  const openProModal = () => {
    isProModalOpen.value = true;
  }

  const closeProModal = () => {
    isProModalOpen.value = false;
  }

  const resetPendingCard = () => {
    pendingCardId.value = "";
  }

  const setPro = (value: boolean) => {
    isPro.value = value;
  }

  const setAvailableCount = (value: number) => {
    availableCount.value = value;
  }

  return {
    isSidebarOpen,
    isCardModalOpen,
    pendingCardId,
    isProModalOpen,
    isPro,
    availableCount,
    onOpenSidebar,
    closeCardModal,
    onOpenCardModal,
    setPendingCard,
    openProModal,
    closeProModal,
    resetPendingCard,
    setPro,
    setAvailableCount
  };
});
