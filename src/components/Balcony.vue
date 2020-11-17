<template>
  <div class="row justify-content-md-center">
    <div class="col-sm-6 text-center">
      <h2>Balcony</h2>
      <div class="btn-group-vertical" role="group">
        <button type="button" class="btn btn-primary" onclick="up(0)">
          Up
        </button>
        <button type="button" class="btn btn-primary" onclick="stop(0)">
          stop
        </button>
        <button type="button" class="btn btn-secondary" onclick="down(0)">
          down
        </button>
      </div>

      <div class="btn-group-vertical" role="group">
        <button type="button" class="btn btn-secondary" onclick="openBlind(0)">
          Open
        </button>
        <button type="button" class="btn btn-secondary" onclick="closeBlind(0)">
          Close
        </button>
      </div>

      <div class="balcony mt-3">
        <div class="frame">
          <div class="blind" id="balcony"></div>
        </div>
      </div>

      <div class="w-100 mt-3">
        <div class="btn-group-vertical" role="group">
          <button
            type="button"
            class="btn btn-danger"
            onclick="setTopPosition(0)"
          >
            Set top position
          </button>
          <button type="button" class="btn btn-danger" onclick="setLimit(0)">
            Set bottom position
          </button>
          <button
            type="button"
            class="btn btn-danger"
            onclick="setIgnoreLimits()"
          >
            Ignore limits
          </button>
        </div>
      </div>
      <div class="w-100 mt-5">
        <span class="badge badge-secondary" id="balconyPosition">0</span>
      </div>
      <div class="w-100 mt-5">
        <span class="badge badge-secondary" id="balconyTarget">0</span>
      </div>
    </div>

    <div class="col-sm-6 text-center">
      <h2>Window</h2>
      <div class="btn-group-vertical" role="group">
        <button type="button" class="btn btn-primary" onclick="up(1)">
          Up
        </button>
        <button type="button" class="btn btn-primary" onclick="stop(1)">
          stop
        </button>
        <button type="button" class="btn btn-secondary" onclick="down(1)">
          down
        </button>
      </div>
      <div class="btn-group-vertical" role="group">
        <button type="button" class="btn btn-secondary" onclick="openBlind(1)">
          Open
        </button>
        <button type="button" class="btn btn-secondary" onclick="closeBlind(1)">
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
