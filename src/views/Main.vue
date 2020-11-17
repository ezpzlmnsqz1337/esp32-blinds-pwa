<template>
  <div class="container-fluid">
    <h1>Blinds control</h1>
    <Balcony />
    <Window />
  </div>
</template>

<script>
import Balcony from '@/components/Balcony'
import Window from '@/components/Window'

export default {
  name: 'Main',
  components: {
    Balcony,
    Window
  }
}
</script>
