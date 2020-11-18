<template>
  <b-container fluid>
    <h1>Blinds control</h1>
    <b-row>
      <b-col sm="3" mt="5">
        <div class="form-group">
          <label for="pass">Password for calibration</label>
          <b-form-input
            type="password"
            placeholder="Enter password..."
            v-model="pass"
            id="pass"
          />
        </div>
      </b-col>
    </b-row>
    <b-row>
      <Window ref="balcony" :width="10" :height="20" :motorId="0" />
      <Window ref="window" :width="10" :height="11" :motorId="1" />
    </b-row>
  </b-container>
</template>

<script>
import ws from '@/shared'
import Window from '@/components/Window'

export default {
  name: 'Main',
  components: {
    Window
  },
  data() {
    return {
      ignoreLimits: 0,
      pass: ''
    }
  },
  created() {
    ws.onopen = () => {
      ws.send('getBlindsPosition')
    }

    ws.onmessage = event => {
      console.log('Response from server: ', event.data)
      if (event.data.includes('blindsPosition')) {
        const motorId = parseInt(event.data.split(':')[2])
        const position = parseInt(event.data.split(':')[4])
        const target = parseInt(event.data.split(':')[6])
        const limit = parseInt(event.data.split(':')[8])
        const ignoreLimits = parseInt(event.data.split(':')[10])
        const imageElementId = motorId === 0 ? 'balcony' : 'window'

        this.$refs[imageElementId].redraw({
          position,
          target,
          limit,
          ignoreLimits
        })
      }
    }
  }
}
</script>

<style></style>
