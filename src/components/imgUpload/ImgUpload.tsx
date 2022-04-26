import { defineComponent, ref, reactive, Ref, toRefs, PropType, shallowReactive, isShallow } from "vue";
import classes from './img_upload.module.css'
import demo4 from "@/assets/demo4.jpeg"
import { compress, getFileURL } from '@/util/conpress'



type Lists = Array<string> | Array<{ value: string | number, name: string }>
const lists = ['梵高', '朋克', '像素风', '二次元']
const zoomLists = [{ value: null, name: "不缩放" }, { value: 100 * 80, name: '100*80' }, { value: 400 * 500, name: '400*500' }]

const ImgUpload = defineComponent({


  props: {
    maxSize: { type: Number, default: 1024 * 1024 },
    zoomOptions: { type: Array as PropType<Lists>, default: zoomLists },
    onImage: Function
  },


  setup(props, { emit }) {
    const formData = reactive({ style: '', images: [] as Array<Blob>, zoom: '' })
    const { style, images, zoom } = toRefs(formData)

    const getClientSize = () => {
      const width = document.body.clientWidth
      const height = document.body.clientHeight
      return { width, height }
    }

    const imageSelector = async (imgs: FileList) => {
      // 图片的上传，把upload柯里化接受style和images两个参数，够了再执行
      for (let i = 0; i < imgs.length; i++) {
        const { imageData, base64, canvas } = await compress(getFileURL(imgs[i]), 60)
        images.value.push(imageData!)
        // 使用img标签
        // images.value.push(base64)
        // 使用canvas
        const preview = document.getElementsByClassName(classes.preview_div)[0]
        preview.appendChild(canvas)
      }
      console.log(images.value)
      emit('image', images.value)
    }



    return () => <div class={classes.wrapper}>
      <div style={"display: flex;"}>

        <input type="file" accept=".jpeg" multiple class={classes.inputfile} id="file"
          onChange={(e) => imageSelector((e.target as HTMLInputElement).files!)} />
        <label for="file" class={classes.label_button}>上传</label>
      </div>
      <div class={classes.preview_div} >
        {/* {images.value.map(image => <img src={image} alt="preview"></img>)} */}
        {/* <img class={"preview"} src={images.value[0]} alt="preview"></img> */}
      </div>
    </div>
  }
})




const Input = ({ value }: { value: Ref<String> }) => {
  return <>
    <input value={value.value}
      onChange={(e) => value.value = (e.target as HTMLInputElement).value}
    />
  </>
}
export { ImgUpload }