<template>
  <b-form @submit.prevent="onSubmit">
    <b-form-group
      label="Назва *:"
      label-for="teamName"
    >
      <b-form-input
        id="teamName"
        v-model="name"
        required
        trim
      ></b-form-input>
    </b-form-group>

    <p>Скорочена назва: {{ nameShort }}</p>

    <b-form-group
      label="... або введіть свою:"
      label-for="teamNameShort"
    >
      <b-form-input
        id="teamNameShort"
        v-model="name_short"
        trim
      ></b-form-input>
    </b-form-group>

    <b-button type="submit" :disabled="isDisabled" variant="primary">Додати</b-button>
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

      return matches[0] === 'ФК' ? `${matches[0]} ${matches[1]}` : matches[0];
    },
  },
};
</script>

<style scoped>

</style>
