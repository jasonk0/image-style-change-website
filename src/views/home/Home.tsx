import classes from './home.module.css'
import { FooterBar } from "@/components/footerBar/FooterBar"
import { ImgUpload } from '@/components/imgUpload/ImgUpload'
import { StyleSelect } from '@/components/styleSelect/StyleSelect'
import { Curring } from '@/util'
import { upload } from '@/api/api'
import { reactive, ref } from 'vue'
import { blob } from 'node:stream/consumers'




const styleLists = [
  { value: "", name: 'vangogh', key: 'style-vango' },
  { value: "", name: 'cezanne', key: 'style-pixel' },
  { value: "", name: 'monet', key: 'style-mona' },
  { value: "", name: 'ukiyoe', key: "style-winter" }
]


styleLists.map(o => {
  o.value = new URL(`../../assets/styleImages/${o.key}.jpeg`, import.meta.url).href
})

export const Home = () => {
  const style = ref('')
  const image = ref()
  const imgEd = ref()

  const getStyle = (_style: string) => {
    style.value = _style
  }
  const getImgae = (images: Array<Blob>) => {

    image.value = images
  }
  const uploadForm = () => {
    if (style.value == '' || image.value == undefined) return console.log('请选择风格及图片')

    const _form = new FormData()
    let index = 0
    _form.append("style", style.value)

    for (let img of image.value) {
      _form.append(`${index++}`, img)
    }
    _form.append('nums', `${index}`)

    upload(_form).then((url) => {
      imgEd.value = url!
    })

  }

  return (<>
    <div class={classes.wrapper}>

      <header > Magic Mirror </header>


      <container>
        <div class={classes.show}>
          <StyleSelect styleList={styleLists} onStyle={getStyle} ></StyleSelect>
        </div>

        <div class={classes.upload}>
          <ImgUpload onImage={getImgae} imgEd={imgEd}></ImgUpload>
        </div>
        <button onClick={() => uploadForm()}> UPLOAD</button>


      </container>


      <footer>
        <FooterBar></FooterBar>
      </footer>


    </div>

  </>)
}
