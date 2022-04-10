
import themes from "@/theme/options";
import { initTheme, setTheme } from "@/theme/set_theme";
import classes from './TCB.module.css'
const TCB = () => {
  let CurTheme = initTheme()

  const changeTheme = (e: MouseEvent) => {
    const btn = e.target as HTMLButtonElement
    if (CurTheme == btn.value) return
    CurTheme = setTheme(btn.value)
  }

  return (<div class={classes.box}>
    {themes.map(({ name, key }) => {
      return <button value={key} onClick={changeTheme}>{name}</button>
    })}

  </div>
  )

}
export { TCB }