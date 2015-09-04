"use strict";
(function (root, factory) {
    // https://github.com/umdjs/umd/blob/master/amdWeb.js
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        root.pubSub = factory();
    }
}(this, function () {
    return {
        cache:{},
        uuid:0,
        subscribe:function(channel, callback, context){
            if(!this.cache[channel]){
                this.cache[channel]=[];
            }
            this.cache[channel].push({cb:callback, id:this.uuid++, c:context});
            return this.uuid;
        },
        unsubscribe:function(channel, arg){
            var c=this.cache[channel];
            var k=(!isNaN(arg-0))?c.id:c.cb;
            for(var i=0;i<c.length;i++){
                if(k===arg){
                    c.splice(i,1);
                    break;
                }
            }
        },
        publish:function(channel, args){
            var c=(this.cache[channel]!==undefined)?this.cache[channel]:[];
            for(var i=0;i<c.length;i++){
                c[i].cb.apply(c[i].c, args || []);
            }
        }
    }
}));