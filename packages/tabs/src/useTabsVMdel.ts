import { computed, getCurrentInstance } from "vue"
export const useVModel = (props,name,emit)=>{
    
    let mode = computed({
        get(){
            return props.modelValue
        },
        set(val){
            emit('update:modelValue',val)
        }
    })
    return mode
}