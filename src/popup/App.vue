<template>
    <div id="app">
        <div class="menu">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="Home" name="first">
                    <div id="timer" class="timer">
                        <Timer
                        trans='{  
                        "day":"Day",
                        "hours":"Hours",
                        "minutes":"Minutes",
                        "seconds":"Seconds",
                        "expired":"Event has been expired.",
                        "running":"Till the end of event.",
                        "upcoming":"Till start of event.",
                        "status": {
                            "expired":"Expired",
                            "running":"Running",
                            "upcoming":"Future"
                            }}'
                        ></Timer>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="Config" name="second">
                    <Setting>
                    </Setting>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import Timer from './components/Timer.vue'
import Setting from './components/Setting.vue'

export default {
  name: 'App',
  components: {
    Timer,
    Setting,
  },
  data() {
    return {
      activeName: 'first',
    }
  }
}
</script>

<style>
body{
  background: #610900;
  text-align:center;
  padding: 0;
  color: white;
}
.el-tabs__item {
  color: white !important;
}
.el-tabs__item.is-active {
  font-weight: bold;
}
</style>