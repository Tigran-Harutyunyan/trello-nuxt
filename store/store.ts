import { defineStore } from "pinia";

export const useMainStore = defineStore("main", () => {
  const isSidebarOpen = ref(false);
  const isCardModalOpen = ref(false);
  const pendingCardId = ref(''); // Id of card to open modal with.

  const setPendingCard = (id: string) => {
    pendingCardId.value = id;
  }

  const onOpenCardModal = () => {
    isCardModalOpen.value = true;
  }

  const onCloseCardModal = () => {
    isCardModalOpen.value = false;
  }

  const onOpenSidebar = () => {
    isSidebarOpen.value = true;
  }

  const onCloseSidebar = () => {
    isSidebarOpen.value = false;
  }

  const resetPendingCard = () => {
    pendingCardId.value = '';
  }

  return {
    isSidebarOpen,
    isCardModalOpen,
    pendingCardId,
    onOpenSidebar,
    onCloseSidebar,
    onCloseCardModal,
    onOpenCardModal,
    setPendingCard,
    resetPendingCard
  };
});
