<template>
    <div class="puzzle" :class="{'quake': alertFlag}">
        <div class="hint-button" @click.stop="hintClick">Hint 버튼 (남은 힌트 횟수 : {{hintCnt}}번)</div>
        <puzzle-piece v-for="(puz, idx) in puzzleInfo" :key="idx" :img="currentIdx" :info="puz" :style="pieceStyle(idx)"/>
        <div class="left-btn" @click="move(-1)">
            <div class="arrow"></div>
        </div>
        <div class="right-btn" @click="move(1)">
            <div class="arrow"></div>
        </div>
        <div class="hint-image" :class="[this.showFlag? 'hint-' + this.currentIdx : '', {'unfold' : this.hintFlag}]"
            :style="hintStyle"
        ></div>
        <span class="guide-message">방향키를 움직여서 퍼즐을 맞춰주세요 :)</span>
        <div class="alert-message" v-show="alertFlag">아직 다음 레벨로 넘어갈 수 없습니다.</div>
    </div>
</template>

<script>
import PuzzlePiece from './PuzzlePiece'

export default {
    name: 'Puzzle',
    components: {PuzzlePiece},
    beforeMount() {
        window.addEventListener('keydown', this.handleKey);
        this.mixPuzzle();
    },
    beforeUnmount() {
        window.removeEventListener('keydown', this.handleKey);
    },
    computed:{
        hintStyle(){
            let style = {};
            style['background-image'] = 'url('+require("../assets/" + this.currentIdx+".jpg" )+')';
            return style;
        }
    },
    data() {
        return {
            currentIdx: 1,
            alertFlag : false,
            hintFlag : false,
            showFlag : false,
            hintCnt : 3,
            possibleNext : [true, true, false, false, false, false, false],
            now:11,
            answerInfo:[
                {id: 0,  top:'0', left: '0',            bgposx:'0',         bgposy:'0'},
                {id: 1,  top:'0', left: '200px',        bgposx:'-200px',    bgposy:'0'},
                {id: 2,  top:'0', left: '400px',        bgposx:'-400px',    bgposy:'0'},

                {id: 3,  top:'200px', left: '0',        bgposx:'0',         bgposy:'-200px'},
                {id: 4,  top:'200px', left: '200px',    bgposx:'-200px',    bgposy:'-200px'},
                {id: 5,  top:'200px', left: '400px',    bgposx:'-400px',    bgposy:'-200px'},

                {id: 6,  top:'400px', left: '0',        bgposx:'0',         bgposy:'-400px'},
                {id: 7,  top:'400px', left: '200px',    bgposx:'-200px',    bgposy:'-400px'},
                {id: 8,  top:'400px', left: '400px',    bgposx:'-400px',    bgposy:'-400px'},

                {id: 9,  top:'600px', left: '0',        bgposx:'0',         bgposy:'-600px'},
                {id: 10, top:'600px', left: '200px',    bgposx:'-200px',    bgposy:'-600px'},
                {id: 11, top:'600px', left: '400px',    bgposx:'-400px',    bgposy:'-600px'}
            ],
            puzzleInfo:[
                {id: 0,  top:'0', left: '0',            bgposx:'0',         bgposy:'0'},
                {id: 1,  top:'0', left: '200px',        bgposx:'-200px',    bgposy:'0'},
                {id: 2,  top:'0', left: '400px',        bgposx:'-400px',    bgposy:'0'},

                {id: 3,  top:'200px', left: '0',        bgposx:'0',         bgposy:'-200px'},
                {id: 4,  top:'200px', left: '200px',    bgposx:'-200px',    bgposy:'-200px'},
                {id: 5,  top:'200px', left: '400px',    bgposx:'-400px',    bgposy:'-200px'},

                {id: 6,  top:'400px', left: '0',        bgposx:'0',         bgposy:'-400px'},
                {id: 7,  top:'400px', left: '200px',    bgposx:'-200px',    bgposy:'-400px'},
                {id: 8,  top:'400px', left: '400px',    bgposx:'-400px',    bgposy:'-400px'},

                {id: 9,  top:'600px', left: '0',        bgposx:'0',         bgposy:'-600px'},
                {id: 10, top:'600px', left: '200px',    bgposx:'-200px',    bgposy:'-600px'},
                {id: 11, top:'600px', left: '400px',    bgposx:'-400px',    bgposy:'-600px'},
            ]
        }
    },
    methods: {
        async hintClick(){
            this.hintCnt--;
            if(0 <= this.hintCnt){
                this.hintFlag = true;
                this.showFlag = true;
                let res = await this.folding()
                setTimeout(()=>{this.showFlag = false;},1000);
            } else{
                this.hintCnt = 0;
            }
        },
        folding(){
            return new Promise((res)=>setTimeout(()=>{
                this.hintFlag = false;
                res('success');
            },4000));
        },
        pieceStyle(idx){
            let style = {};
            if(this.now === this.puzzleInfo[idx].id){
                style['box-shadow'] = '0 0 0 3px red inset';
            }
            return style;
        },
        move(next) {
            if ((this.currentIdx + next) < 1 || 6 < (this.currentIdx + next)) {
                return true;
            } else if(!this.possibleNext[this.currentIdx + next]){
                this.alertFlag = true;
                setTimeout(()=>{this.alertFlag = false;},1000);
            }
            else{
                this.currentIdx = (this.currentIdx + next);
                this.mixPuzzle();
            }
        },
        swap(next, now){
            let tmpX = this.puzzleInfo[now].bgposx;
            let tmpY = this.puzzleInfo[now].bgposy;
            this.puzzleInfo[now].bgposx = this.puzzleInfo[next].bgposx;
            this.puzzleInfo[now].bgposy = this.puzzleInfo[next].bgposy;
            this.puzzleInfo[next].bgposx = tmpX;
            this.puzzleInfo[next].bgposy = tmpY;
        },
        handleKey(e, initial = false) {
            let next = -1;
            switch (e.keyCode) {
                case 37:
                    // left
                    if(!((this.now%3 - 1) < 0)){
                        next = this.now - 1;
                        this.swap(next, this.now);
                        this.now = next;
                    }
                    break;
                case 38:
                    // up
                    if(!((this.now - 3) < 0)){
                        next = this.now - 3;
                        this.swap(next, this.now);
                        this.now = next;
                    }
                    break;
                case 39:
                    // right
                    if(!((this.now%3 + 1) === 3)){
                        next = this.now + 1;
                        this.swap(next, this.now);
                        this.now = next;
                    }
                    break;
                case 40:
                    // down
                    if(!(11 < (this.now + 3))){
                        next = this.now + 3;
                        this.swap(next, this.now);
                        this.now = next;
                    }
                    break;
                default:
                    break;
            }
            if(!initial){
                this.checkAnswer();
            }
        },
        mixPuzzle(){
            this.hintCnt = 3;
            for(let i = 0; i < 300; i++){
                this.handleKey({keyCode : Math.floor(Math.random() * 4) + 37}, true);
            }
        },
        checkAnswer(){
            let passFlag = true;
            this.puzzleInfo.forEach((puz,idx) =>{
                if(puz.top !== this.answerInfo[idx].top || puz.left !== this.answerInfo[idx].left
                    || puz.bgposx !== this.answerInfo[idx].bgposx || puz.bgposy !== this.answerInfo[idx].bgposy
                ){
                    passFlag = false;
                }
            })
            this.possibleNext[this.currentIdx + 1] = passFlag;
        }
    }
}
</script>

<style lang="scss" scoped>
.puzzle{
    width: 600px;
    height: 800px;
    position: relative;
    box-shadow: 2px 2px 20px 14px #aaa;

    &.quake{animation: quake .1s infinite;}
}
@keyframes quake {
    from{left:-2px;}
    to{left:2px;}
}
.hint-button{
    position: absolute;
    top: -40px; left: 0;
    background-color: #64B5F6;
    border-radius: 10px;
    padding: 4px 12px;
    cursor: pointer;
    &:hover{background-color: #1976D2; color: white;font-weight: bold;}
    &:active{background-color: #0D47A1; }
}

.guide-message{
    position: absolute; bottom: -28px; right: 0; font-weight: bold; color: #333;
}
.alert-message{
    position: absolute; left: 60px; top:40%; font-weight: bold; font-size: 28px;
    color: #6A1B9A; box-shadow: 0 0 10px 10px white; background-color: white;
}
.left-btn, .right-btn {
    position: fixed;
    top: 0;
    width: 120px;
    height: 100vh;
    cursor: pointer;

    .arrow {
        width: 40px;
        height: 40px;
        position: fixed;
        top: calc(50% - 40px);
        border-left: 3px solid #aaa;
        border-bottom: 3px solid #aaa;
    }

    &:hover {
        background-color: rgba(0, 0, 0, 0.1);
        .arrow {
            border-left: 3px solid #666;
            border-bottom: 3px solid #666;
        }
    }

    &:active {
        background-color: rgba(0, 0, 0, 0.2);
        .arrow {
            border-left: 3px solid #333;
            border-bottom: 3px solid #333;
        }
    }
}

.left-btn {
    left: 0;
    .arrow {
        left: 46px;
        transform: rotate(45deg);
    }
}

.right-btn {
    right: 0;
    .arrow {
        right: 46px;
        transform: rotate(225deg);
    }
}

.hint-image{
    position: absolute;
    width: 600px; height: 0;
    transition: height 2s;
    &.unfold{height: 800px;transition: height 2s;}
}

</style>
