<script setup lang="ts">
import { MoreHorizontal, X } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PopoverClose } from "radix-vue";
import { toast } from "vue-sonner";
import { useBoard } from "@/composables/useBoard";

const router = useRouter();

const { deleteBoard } = useBoard();

interface BoardOptionsProps {
  id: string;
}

const { id } = defineProps<BoardOptionsProps>();

const closeRef = ref();

const onDelete = async () => {
  closeRef.value.$el.click();

  const { orgId, board } = await deleteBoard(id);

  if (board?.id && orgId) {
    toast.success(`Deleted ${board.title} board.`);
    router.push(`/organization/${orgId}`);
  }
};
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button class="h-auto w-auto p-2" variant="transparent">
        <MoreHorizontal class="h-4 w-4" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="px-0 pt-3 pb-3" side="bottom" align="start">
      <div class="text-sm font-medium text-center text-neutral-600 pb-4">
        Board actions
      </div>
      <PopoverClose ref="closeRef" as-child>
        <Button
          class="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
          variant="ghost"
        >
          <X class="h-4 w-4" />
        </Button>
      </PopoverClose>
      <Button
        variant="ghost"
        @click="onDelete"
        class="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
      >
        Delete this board
      </Button>
    </PopoverContent>
  </Popover>
</template>
