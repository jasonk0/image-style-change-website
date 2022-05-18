import classes from './home.module.css'
import { FooterBar } from "@/components/footerBar/FooterBar"
import { ImgUpload } from '@/components/imgUpload/ImgUpload'
import { StyleSelect } from '@/components/styleSelect/StyleSelect'
import { Curring, processCanvas } from '@/util'
import { upload } from '@/api/api'
import { onMounted, reactive, ref } from 'vue'






const styleLists = [
  { value: "", name: 'vangogh', key: 'style-vango' },
  { value: "", name: 'cezanne', key: 'style-cezanne' },
  { value: "", name: 'monet', key: 'style-monet' },
  { value: "", name: 'ukiyoe', key: "style-ukiyoe" }
]


styleLists.map(o => {
  o.value = new URL(`../../assets/styleImages/${o.key}.jpeg`, import.meta.url).href
})

export const Home = {
  setup() {

    const style = ref('')
    const image = ref()
    const imgEd = ref()
    const loading = ref(false);
    let dirty = false

    // 初始化， 加入进度条
    function initProcess() {
      const canvas = processCanvas()
      const wrapper = document.getElementsByClassName(classes.canvas)[0]
      wrapper.appendChild(canvas)
    };
    const getStyle = (_style: string) => {
      style.value = _style
    }
    const getImgae = (images: Array<Blob>) => {
      image.value = images
    }
    const uploadForm = () => {
      if (style.value == '' || image.value == undefined) return console.log('请选择风格及图片')

      if (loading.value != true && dirty != true) initProcess() //如果 在loading状态，就不要再添加了

      loading.value = true
      dirty = true

      const _form = new FormData()
      let index = 0
      _form.append("style", style.value)

      for (let img of image.value) {
        _form.append(`${index++}`, img)
      }
      _form.append('nums', `${index}`)

      // 上传
      upload(_form).then((url) => {
        loading.value = false
        imgEd.value = url!
      })

    }

    return () => (<>
      <div class={classes.wrapper}>

        <header > Magic Mirror </header>


        <container>
          <div class={classes.show}>
            <StyleSelect styleList={styleLists} onStyle={getStyle} ></StyleSelect>
          </div>

          <div class={classes.upload}>
            <ImgUpload onImage={getImgae} imgEd={imgEd}></ImgUpload>
            <div class={[classes.canvas, loading.value && classes.loading_show]}></div>

          </div>
          <button onClick={() => uploadForm()}>Transfer</button>

        </container>


        <footer>
          <FooterBar></FooterBar>
        </footer>


      </div>


    </>)
  }

}
