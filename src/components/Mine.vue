<template>
  <div>mine</div>
</template>

<script>
export default {
  props: {
    logged: Boolean,
  },
  watch: {
    logged: function (val, oldVal) {
      console.log('logged', val)
    },
  },
}
</script>
