import demo3 from '@/assets/demo3.jpeg'
import classes from './home.module.css'
import { FooterBar } from "@/components/footerBar/FooterBar"
import { ImgUpload } from '@/components/imgUpload/ImgUpload'


export const Home = () => {
  return (<>
    <div class={classes.wrapper}>


      <header > Magic Mirror</header>


      <container>内容container
        <div class={classes.show}><img src={demo3} alt="demo" /></div>

        <div class={classes.upload}>
          <ImgUpload></ImgUpload></div>
        {/* <label for="xuanzewo"> <input type="select" id="xuanzewo" value="8" />选择我</label> */}

        <button> UPLOAD</button>

      </container>


      <footer>
        <FooterBar></FooterBar>
      </footer>


    </div>

  </>)
}
