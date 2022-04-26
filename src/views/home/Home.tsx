import classes from './home.module.css'
import { FooterBar } from "@/components/footerBar/FooterBar"
import { ImgUpload } from '@/components/imgUpload/ImgUpload'
import { StyleSelect } from '@/components/styleSelect/StyleSelect'
import { Curring } from '@/util'
import { upload } from '@/api/api'
import { reactive, ref } from 'vue'




const styleLists = [
  { name: '梵高', value: '', key: 'style-vango' },
  { name: "像素", value: '', key: 'style-pixel' },
  { name: "莫奈", value: '', key: 'style-mona' },
  { name: "冬天", value: '', key: "style-winter" }
]


styleLists.map(o => {
  o.value = new URL(`../../assets/styleImages/${o.key}.jpeg`, import.meta.url).href
})

export const Home = () => {
  const style = ref('')
  const image = ref()

  const getStyle = (_style: string) => {
    style.value = _style
  }
  const getImgae = (images: Array<Blob>) => {

    image.value = images
  }
  const uploadForm = Curring((style: string, image: Blob | Array<Blob>) => {
    const _form = new FormData()
    _form.append("style", style)
    if (image instanceof Array) {
      for (let _i of image) {
        _form.append("image", _i, '111')
      }
    } else {
      _form.append("image", image, '222')
    }
    console.log(_form.getAll("style"))
    return upload(_form)
  })

  return (<>
    <div class={classes.wrapper}>

      <header > Magic Mirror </header>


      <container>
        <div class={classes.show}>
          <StyleSelect styleList={styleLists} onStyle={getStyle} ></StyleSelect>
        </div>

        <div class={classes.upload}>
          <ImgUpload onImage={getImgae}></ImgUpload>
          <button onClick={() => {
            if (style.value !== '' && image.value?.length) uploadForm(style.value, image.value)
          }}> UPLOAD</button>
        </div>


      </container>


      <footer>
        <FooterBar></FooterBar>
      </footer>


    </div>

  </>)
}
