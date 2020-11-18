<template>
  <b-col sm="6" class="text-center">
    <h2>Window</h2>
    <b-button-group vertical>
      <b-button variant="primary" @click="up(0)">
        Up
      </b-button>
      <b-button variant="primary" @click="stop(0)">
        stop
      </b-button>
      <b-button variant="secondary" @click="down(0)">
        down
      </b-button>
    </b-button-group>

    <b-button-group vertical>
      <b-button variant="secondary" @click="openBlind(0)">
        Open
      </b-button>
      <b-button variant="secondary" @click="closeBlind(0)">
        Close
      </b-button>
    </b-button-group>

    <div
      class="window mt-3"
      :style="{ width: `${width}rem`, height: `${height}rem` }"
    >
      <div class="frame">
        <div class="blind" ref="window"></div>
        <div
          v-show="target != position"
          class="blind pending"
          ref="windowTarget"
        ></div>
      </div>
    </div>

    <div class="w-100 mt-3">
      <b-button-group vertical>
        <b-button variant="danger" @click="setTopPosition()">
          Set top position
        </b-button>
        <b-button variant="danger" @click="setLimit()">
          Set bottom position
        </b-button>
        <b-button variant="danger" @click="setIgnoreLimits()">
          Ignore limits
        </b-button>
      </b-button-group>
    </div>
    <div class="w-100 mt-5">
      <b-badge>{{ position }}</b-badge>
    </div>
    <div class="w-100 mt-5">
      <b-badge>{{ target }}</b-badge>
    </div>
  </b-col>
</template>

<script>
import ws from '@/shared'
import sha256 from 'crypto-js/sha256'

export default {
  name: 'Window',
  props: {
    width: {
      type: Number,
      default: 10
    },
    height: {
      type: Number,
      default: 10
    },
    motorId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      position: 0,
      target: 0,
      limit: 0,
      ignoreLimits: false,
      minMotorStep: 5000
    }
  },
  methods: {
    redraw(opts) {
      this.position = opts.position
      this.target = opts.target
      this.limit = opts.limit
      this.ignoreLimits = opts.ignoreLimits

      let scale = Math.fround(this.position / this.limit)
      if (scale > 1) scale = 1
      if (scale < 0) scale = 0

      let scaleTarget = Math.fround(this.target / this.limit)
      if (scale > 1) scale = 1
      if (scale < 0) scale = 0

      this.$refs.window.style.transform = `scaleY(${scale})`
      this.$refs.windowTarget.style.transform = `scaleY(${scaleTarget})`
    },
    up() {
      ws.send(`up:${this.motorId}:${this.minMotorStep}`)
    },
    down() {
      ws.send(`down:${this.motorId}:${this.minMotorStep}`)
    },
    stop() {
      ws.send(`stop:${this.motorId}`)
    },
    openBlind() {
      ws.send(`open:${this.motorId}`)
    },
    closeBlind() {
      ws.send(`close:${this.motorId}`)
    },
    setTopPosition() {
      const pass = document.getElementById('pass').value
      ws.send(`setTopPosition:${this.motorId}:${sha256(pass).toString()}`)
    },
    setLimit() {
      const pass = document.getElementById('pass').value
      ws.send(`setLimit:${this.motorId}:${sha256(pass).toString()}`)
    },
    setIgnoreLimits() {
      const pass = this.$parent.$data.pass
      ws.send(`setIgnoreLimits:${this.ignoreLimits}:${sha256(pass).toString()}`)
      this.ignoreLimits = this.ignoreLimits === 1 ? 0 : 1
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.window {
  position: relative;
  margin: 0 auto;
}

.frame {
  position: absolute;
  height: 100%;
  width: 100%;
  border: 1rem solid #5f5f5f;
  background-color: #d9f6ff;
  z-index: 1;
}

.blind {
  position: absolute;
  z-index: 10;
  height: 100%;
  width: 100%;
  background-color: #a8a6b9;
  border-bottom: none;
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 1s;
}

.blind.pending {
  z-index: 10;
  background-color: #fbff1f;
  animation: blinker 2s linear infinite;
}

@keyframes blinker {
  0% {
    opacity: 0.9;
  }
  50% {
    opacity: 0.7;
  }
  100% {
    opacity: 0.9;
  }
}
</style>
