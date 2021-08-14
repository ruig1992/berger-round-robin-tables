<template>
  <b-form class="app-participants-add-form" @submit.prevent="onSubmit">
    <b-form-group
      label="Назва *:"
      label-for="teamName"
    >
      <b-form-input
        id="teamName"
        v-model="name"
        autocomplete="on"
        required
        trim
      />
    </b-form-group>

    <p><span class="app-form-label">Скорочена назва:</span> {{ nameShort }}</p>

    <b-form-group
      label="... або введіть свою:"
      label-for="teamNameShort"
    >
      <b-form-input
        id="teamNameShort"
        v-model="name_short"
        autocomplete="on"
        trim
      />
    </b-form-group>

    <b-button
      :disabled="isDisabled"
      type="submit"
      variant="primary"
    >Додати</b-button>
  </b-form>
</template>

<script>
export default {
  props: {
    isDisabled: {type: Boolean, default: true},
  },
  data() {
    return {
      name: '',
      name_short: '',
    };
  },
  methods: {
    onSubmit() {
      if (!this.name) {
        return;
      }
      this.$emit('added', {
        id: Date.now(),
        name: this.name,
        name_short: this.name_short || this.nameShort,
        empty_value: false,
      });
      this.name = '';
      this.name_short = '';
    },
  },
  computed: {
    nameShort() {
      const matches = this.name
        .replace(/"/g, '')
        .split(' ')
        .filter((m) => m);

      return matches[0] === 'ФК' ? `${matches[0]} ${matches[1] || ''}` : matches[0];
    },
  },
};
</script>

<style scoped>
.app-participants-add-form,
.app-participants-add-form input {
  font-size: 0.95em;
}
</style>
