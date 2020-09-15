import * as OCustomComponents from "./components"

const oComponents = {};

oComponents.install = function(Vue, options){
    for(let item in OCustomComponents){
        Vue.component(OCustomComponents[item].name, OCustomComponents[item])
    }
}

export default oComponents;
