<template>
    <div class="puzzle-piece" :style="pieceStyle">
    </div>
</template>

<script>
export default {
    name: "puzzlePiece",
    props:{
        info:{type:Object, default:()=>{}},
        img:{type:[Number, String], default:'1'}
    },
    computed:{
        pieceStyle(){
            let style = {}
            style['background-position'] = this.info.bgposx + ' ' +this.info.bgposy;
            style['top'] = this.info.top;
            style['left'] = this.info.left;
            style['background-image'] = 'url('+require("../assets/" + this.img+".jpg" )+')';
            return style;
        }
    }
}
</script>

<style scoped lang="scss">
.puzzle-piece{
    width: 200px; height: 200px;
    position: absolute;
}
</style>