<template>
  <div>
    <draggable
      v-model="participantsData"
      animation="200"
      class="app-participants-list"
      draggable=".drag-item"
      ghost-class="draggable-ghost"
      group="participants"
      tag="ul"
      @start="drag=true"
      @end="drag=false"
      @update="onUpdate"
    >
      <li v-for="(item, index) in participantsData"
          :key="item.id"
          class="app-participants-list__item drag-item"
      >
        <span>{{ 1 + index }} - {{ item.name }}</span>
        <b-button variant="danger" size="sm" @click="onDelete(item.id)">Видалити</b-button>
      </li>
    </draggable>

    <b-button variant="danger" size="sm" @click="onDeleteAll">Видалити всіх</b-button>
  </div>
</template>

<script>
import Draggable from 'vuedraggable';

export default {
  props: {
    participants: {type: Array},
    qwe: {type: Number},
  },
  data() {
    return {
      participantsData: this.participants,
    };
  },
  watch: {
    participants(newValue, oldValue) {
      if (newValue.length !== oldValue.length) {
        this.participantsData = newValue;
      }
    }
  },
  methods: {
    onUpdate() {
      this.$emit('updated', [...this.participantsData]);
    },
    onDelete(id) {
      this.$emit('deleting', id);
    },
    onDeleteAll() {
      this.$emit('deleting-all');
    }
  },
  components: {Draggable},
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
  padding: 0;
  font-size: 0.9em;
}

.app-participants-list__item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  border: 1px solid #999;
  cursor: move;
}
</style>
