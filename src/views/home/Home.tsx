import classes from './home.module.css'
import { FooterBar } from "@/components/footerBar/FooterBar"
import { ImgUpload } from '@/components/imgUpload/ImgUpload'
import { StyleSelect } from '@/components/styleSelect/StyleSelect'
import { reactive } from 'vue'




const styleLists = [
  { name: '梵高', value: '', key: 'style-vango' },
  { name: "像素", value: '', key: 'style-pixel' },
  { name: "莫奈", value: '', key: 'style-mona' }]


styleLists.map(o => {
  o.value = new URL(`../../assets/styleImages/${o.key}.jpeg`, import.meta.url).href
})

export const Home = () => {
  return (<>
    <div class={classes.wrapper}>

      <header > Magic Mirror </header>


      <container>
        <div class={classes.show}>
          <StyleSelect styleList={styleLists}></StyleSelect>
        </div>

        <div class={classes.upload}>
          <ImgUpload></ImgUpload>
          {/* <button> UPLOAD</button> */}
        </div>
        {/* <label for="xuanzewo"> <input type="select" id="xuanzewo" value="8" />选择我</label> */}


      </container>


      <footer>
        <FooterBar></FooterBar>
      </footer>


    </div>

  </>)
}
