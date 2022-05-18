import { defineComponent } from 'vue'
import { router } from '@/router'
import classes from './footer_bar.module.css'

const bar = [{
  path: "/about",
  name: "About",
},
{
  path: "/issues",
  name: "Issues",
},
{
  path: "/cyclegan",
  name: "Cyclegan",
},
]
type Route = { path: string; name: any }

const FooterBar = defineComponent({
  props: {
    nav: {
      type: Object,
      default: bar
    }
  },
  setup(props) {
    const clickPath = (e: MouseEvent) => {
      let tar = e.target as HTMLSpanElement
      router.push(tar.id)
      // router.go(1)
    }
    return () => (
      <div onClick={clickPath} class={classes.wrapper}>
        {props.nav.map((route: Route) => {
          return <span id={route.path} class={classes.footerItem}>{route.name}</span>
        })}
      </div>
    )
  }
})

const FooterBarData = () => {
  const clickPath = (e: MouseEvent) => {
    let tar = e.target as HTMLSpanElement
    router.push(tar.id)
    // router.go(1)
  }
  return (
    <div onClick={clickPath} class={classes.wrapper}>
      {bar.map(route => {
        return <span id={route.path} class={classes.footerItem}>{route.name}</span>
      })}
    </div>
  )
}

export { FooterBar }