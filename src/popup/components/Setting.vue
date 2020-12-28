<template>
    <div>
        <div v-show ="statusType !== 'expired'">
            <el-row>
                <h3> Viblo Dark Mode: </h3>
                <el-switch
                    v-model="darkMode"
                    active-text="Yes"
                    inactive-text="No"
                    active-value="true"
                    inactive-value="false"
                    @change="changeMode"
                    >
                </el-switch>
            </el-row>
        </div>
    </div> 
</template>

<script>
const browser = require('webextension-polyfill');

export default {
  name: 'HelloWorld',
  
  data: function(){
        return{
            darkMode: localStorage.viblo_dark_mode,
        };
    },

    filters: {
        addZero: function (value) {
            return parseInt(value) < 10 ? `0${value}` : value;
            
        }
    },

    methods: {
        changeMode(value) {
            this.darkMode = value;
            this.writeInConsole(value);

        },
        writeInConsole(value) {
            localStorage.viblo_dark_mode = value;
            browser.tabs.query({ active: true, currentWindow: true }).then(tabs => {
                browser.tabs
                .sendMessage(tabs[0].id, { msg: { action: "print_in_console" }, value: value });
            });
        }

    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .timer {
        margin-top: 5em !important;

    }
    .start-time, .end-time {
        margin-bottom: 1em;
    }
    .clock {
        font-size: 16px;
        width: auto;
        height: 100px;
        min-width: 450px;
        font-family: 'Share Tech Mono', monospace;
        margin-top: 5em;
        display: block;


    }

    .center {
        margin-left: 18%;
        background: radial-gradient(ellipse at center,  #0a2e38  1%, #000000 100%);        
        border: 1px solid white;

        width: 60%;
        float:none;
        padding-left: 1em;
        height: 3.2em;
        border-radius: 1em;
        box-shadow: 4px -5px #888888;
        padding-top: 0.5em;
   }
    .float-left {
        float:left;
        padding:0em 0.3em;
        color: #daf6ff;
        font-weight: bold;
        text-shadow: 0 0 50px rgba(10, 175, 230, 1),  0 0 50px rgba(10, 175, 230, 0);

    }
    .text-small {
        font-size: 13px;
    }
    .padding-top {
        padding-top: 1em;
    }
</style>
