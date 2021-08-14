<template>
  <div>
    <b-button size="sm" variant="danger" @click="onDeleteAll">Видалити всіх</b-button>

    <draggable
      animation="200"
      class="app-participants-list"
      draggable=".drag-item"
      ghost-class="draggable-ghost"
      group="participants"
      :list="participants"
      tag="ul"
      @start="drag=true"
      @end="drag=false"
    >
      <li
        v-for="(item, index) in participants"
        :key="item.id"
        class="app-participants-list__item drag-item"
      >
        <span
          class="app-participants-list__item-name"
          :class="{'app-participants-list__item-name--empty-value': item.empty_value}"
        >{{ 1 + index }} - {{ item.name }}</span>

        <div class="app-participants-list__item-buttons">
          <div title="Виключити">
            <b-form-checkbox
              switch
              class="app-participants-list__item-switch"
              :checked="!item.empty_value"
              @change="onToggleEmpty(item)"
            />
          </div>
          <b-button
            class="app-participants-list__item-btn-delete px-1"
            size="sm"
            title="Видалити"
            variant="link"
            @click="onDelete(item)"
          >
            <app-trash-icon />
          </b-button>
        </div>
      </li>
    </draggable>
  </div>
</template>

<script>
import Draggable from 'vuedraggable';
import AppTrashIcon from '@/components/icons/AppTrashIcon';
import ModalConfirm from '@/modal/modal-confirm';

export default {
  props: {
    participants: {type: Array},
  },
  data() {
    return {
      //checkedEmpty: false,
    };
  },
  methods: {
    onToggleEmpty(participant) {
      this.$emit('toggle-empty', participant.id);
    },
    onDelete(participant) {
      const { id, name } = participant;

      ModalConfirm({
        text: `Видалити учасника "${name}"?`,
      }).then((result) => {
        if (!result.isConfirmed) {
          return;
        }
        this.$emit('deleting', id);
      });
    },
    onDeleteAll() {
      ModalConfirm({
        text: 'Видалити всіх учасників?',
      }).then((result) => {
        if (!result.isConfirmed) {
          return;
        }
        this.$emit('deleting-all');
      });
    }
  },
  components: {Draggable, AppTrashIcon},
};
</script>

<style>
.draggable-ghost {
  opacity: .5;
  background-color: #c8ebfb;
}
.flip-list-move {
  transition: transform .5s;
}
.no-move {
  transition: transform 0s;
}

.app-participants-list {
  list-style-type: none;
  margin-top: 1.5rem;
  padding: 0;
  font-size: 0.9em;
}

.app-participants-list__item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  border: 1px solid #999;
  cursor: move;
}

.app-participants-list__item-name {
  flex: 1;
}
.app-participants-list__item-name--empty-value {
  text-decoration: line-through;
}

.app-participants-list__item-buttons {
  display: flex;
  align-items: center;
  margin-left: .5rem;
}

.app-participants-list__item-switch .custom-control-input:checked ~ .custom-control-label::before {
  background-color: #1e7e34;
  border-color: #1c7430;
}

.app-participants-list__item-btn-delete {
  width: 30px;
}
</style>
