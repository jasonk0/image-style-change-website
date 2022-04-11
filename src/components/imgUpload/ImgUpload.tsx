import { defineComponent, ref, reactive, Ref, toRefs, PropType } from "vue";
import classes from './img_upload.module.css'
import demo4 from "@/assets/demo4.jpeg"
import { Url } from "url";

type Lists = Array<string> | Array<{ value: string | number, name: string }>
const lists = ['梵高', '朋克', '像素风', '二次元']
const zoomLists = [{ value: null, name: "不缩放" }, { value: 100 * 80, name: '100*80' }, { value: 400 * 500, name: '400*500' }]
const ImgUpload = defineComponent({


  props: {
    styleList: { type: Array as PropType<Lists>, default: lists },
    maxSize: { type: Number, default: 1024 * 1024 },
    zoomOptions: { type: Array as PropType<Lists>, default: zoomLists }
  },


  setup(props) {
    const formData = reactive({ style: '', images: [] as Array<string>, zoom: '' })
    const { style, images, zoom } = toRefs(formData)

    const imageSelector = (imgs: FileList) => {
      for (let i = 0; i < imgs.length; i++) {
        images.value.push(getFileURL(imgs[i]))
      }
    }

    const getFileURL = (file: File) => {
      let url = '';
      // 下面函数执行的效果是一样的，只是需要针对不同的浏览器执行不同的 js 函数而已
      if (window.URL != undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file);
      } else if (window.webkitURL != undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
      }
      return url;
    }

    return () => <>
      <form action="/" method="POST">

        <Select name="style-select" lists={props.styleList} value={style} />
        <Select name="zoom-select" lists={props.zoomOptions} value={zoom} />

        <input type="file" accept=".jpeg" multiple class={classes.inputfile} id="file"
          onChange={(e) => imageSelector((e.target as HTMLInputElement).files!)} />
        <label for="file" class={classes.label_button}>这是个按钮</label>

        {images.value.length ?
          '' : images.value.map(image => <img class={"preview"} src={image} alt="preview"></img>)}
        {/* <img class={"preview"} src={images.value} alt="preview"></img> */}
      </form>
    </>
  }
})

const Select = ({ name, lists, value }: {
  name: string, lists: Lists, value: Ref<string>
}) => {

  return <>
    <label for={name}>
      <select name={name} id={name} onChange={(e) => value.value = (e.target as HTMLOptionElement).value}>
        {lists.map(l => {
          return <option value={() => typeof l == 'object' ? l.value : l
          }> {typeof l == 'object' ? l.name : l}</option>
        })}
      </select>
    </label>

  </>
}

const Input = ({ value }: { value: Ref<String> }) => {
  return <>
    <input value={value.value}
      onChange={(e) => value.value = (e.target as HTMLInputElement).value}
    />
  </>
}
export { ImgUpload }