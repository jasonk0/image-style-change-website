import { stringifyStyle } from "@vue/shared"
import { type } from "os"
import { emit } from "process"
import { defineComponent, PropType, reactive, toRef } from "vue"
import classes from './sytle_select.module.css'

// type Lists = Array<{ value: string, name: string }>

type Lists = Array<{ value: string, name: string, isActive?: boolean }>

const StyleSelect = defineComponent({
  props: {
    styleList: Array as PropType<Lists>,
    onStyle: Function
  },
  setup(props, { emit }) {
    const styleList = props.styleList?.map(o => reactive(o))
    let selectStyle = 'vangogh'
    // 获取选取目标
    const select = (value: string) => {
      console.log(value)
      selectStyle = value
      toggle(value)
      emit('style', selectStyle)
    }
    // 控制items的选中状态
    const toggle = (name: string) => {
      styleList?.map(s => {
        s.isActive = s.name == name
      })
    }

    return () => (<>
      {styleList?.map(style => <SelectItem name={style.name} value={style.value} onSelected={select} isActive={style.isActive} />)}
    </>)
  }
})

const SelectItem = defineComponent({
  props: {
    name: String,
    value: String,
    isActive: Boolean,
    onSelected: Function
  },
  setup(props, { emit }) {
    const name = props.name
    const value = props.value
    return () => (
      <div class={[classes.wrapper, props.isActive ? classes.active : '']}>
        {props.isActive}
        <label for={name} class={classes.label} onClick={() => emit('selected', name)}>
          <input id={name} type="hidden" value={name} style={"opacity: 0"} />
          <img src={value} alt={name} />
        </label>
      </div>

    )
  }
})
export { StyleSelect }