<template>
<div>
    <h1>Stay Focus</h1>
    <div v-show ="statusType !== 'expired'">
        <div class="end-time">
            <el-date-picker
                v-model="end"
                type="datetime"
                placeholder="Select date and time">
            </el-date-picker>
        </div>
        <el-row>
            <el-button type="primary" @click="set()">Set</el-button>
        </el-row>
        <div class="clock" v-if="show">
            <div class="center">
                <div class="day float-left">
                   <span class="text-small"> Day </span>
                    <br>
                    <span class="number">{{ days | addZero }}</span>
                </div>
                <div class="float-left padding-top">
                 :
                </div>
               
                <div class="hour float-left">
                    <span class="text-small">  Hours </span>
                    <br>
                    <span class="number">{{ hours | addZero }}</span>
                </div>
                    <div class="float-left padding-top">
                 :
                </div>
                <div class="min  float-left ">
                    <span class="text-small"> Minutes </span>
                    <br>
                 <span class="number">{{ minutes | addZero }}</span>
                </div>
                <div class="float-left padding-top">
                 :
                </div>
                <div class="sec  float-left">
                    <span class="text-small"> Seconds </span>
                    <br>
                    <span class="number">{{ seconds | addZero }}</span>
                </div>
                </div>
            </div>
        </div>
        <div class="clock" v-if="!show">
            First set your time! 
        </div>
    </div>
</template>

<script>
export default {
  name: 'HelloWorld',
    props: ['trans'] ,

  data: function(){
        return{
            timer:"",
            wordString: {
                expired: 'Hết',
                running : 'Running',
                upcoming : 'upcoming',
            },
            start: "",
            end: "",
            interval: "",
            days:"",
            minutes:"",
            hours:"",
            seconds:"",
            message:"",
            statusType:"",
            statusText: "",
            value1: "",
            value2: "",
            endtime: "Dec 25, 2020 00:00:00",  
            show: false,
            data: '',
        
        };
    },
    filters: {
        addZero: function (value) {
            return parseInt(value) < 10 ? `0${value}` : value;
            
        }
    },
    created: function () {
            this.wordString = JSON.parse(this.trans);
        },
    mounted(){
        this.start = new Date().getTime();

        if(localStorage.end) {
            this.end = new Date(localStorage.end).getTime();
            this.show = true;

        } else {
            this.show = false;
        }

        this.timerCount(this.start,this.end);
        this.interval = setInterval(() => {
            this.timerCount(this.start,this.end);
        }, 1000);
    },
    methods: {
        timerCount: function(start,end){
            // Get todays date and time
            var now = new Date().getTime();
            // Find the distance between now an the count down date
            var distance = start - now;
            var passTime =  end - now;

            if(distance < 0 && passTime < 0){
                this.message = this.wordString.expired;
                this.statusType = "Happy New Year!";
                this.statusText = this.wordString.status.expired;
                clearInterval(this.interval);
                return;

            }else if(distance < 0 && passTime > 0){
                this.calcTime(passTime);
                this.message = this.wordString.running;
                this.statusType = "running";
                this.statusText = this.wordString.status.running;

            } else if( distance > 0 && passTime > 0 ){
                this.calcTime(distance); 
                this.message = this.wordString.upcoming;
                this.statusType = "upcoming";
                this.statusText = this.wordString.status.upcoming;
            }
        },
        calcTime: function(dist){
        // Time calculations for days, hours, minutes and seconds
            this.days = Math.floor(dist / (1000 * 60 * 60 * 24));
            this.hours = Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            this.minutes = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60));
            this.seconds = Math.floor((dist % (1000 * 60)) / 1000);
        },
        set() {
            localStorage.end = new Date(this.end);
            this.end = new Date(localStorage.end).getTime();
            this.show = true;
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
        font-size: 22px;
        width: auto;
        height: 100px;
        min-width: 450px;
        font-family: Share Tech Mono,monospace;
        margin-top: 2em;
        margin-bottom: 2em;
        display: block;
    }

    .center {
        margin-left: 9%;
        background: radial-gradient(ellipse at center,#0a2e38 1%,#000 100%);
        border: 1px solid #fff;
        width: 75%;
        float: none;
        padding-left: 1em;
        height: 3.2em;
        border-radius: 1em;
        box-shadow: 4px -5px #888;
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
