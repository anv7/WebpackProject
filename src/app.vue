<!--只是一个组件-->

<template>
<div id="app">
    <div id="cover">
        <Header></Header>
        <Footer></Footer>
        <Todo></Todo>
    </div>
</div>
</template>
<script>
    import Header from './todo/header.vue';
    import Footer from './todo/footer.jsx';
    import Todo from './todo/todo.vue';

    export default {
        components:{
            Header,Footer,Todo
        }

    }
</script>
<style lang="less" scoped>
    #app{
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        #cover{
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            background: #999;
            opacity: .4;
            z-index: -1;
        }
    }

</style>