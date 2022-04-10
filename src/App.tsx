import { defineComponent, h, KeepAlive } from "vue"
import { RouterView, useRoute } from "vue-router"
import './base.css'
import { TCB } from "@/components/themeChangeButton/ThemeChangeButton"


export default defineComponent({
  setup() {
    return () => (
      <div class={'primary'}>
        <RouterView ></RouterView>
        <TCB></TCB>

      </div>)
  }
}
) 