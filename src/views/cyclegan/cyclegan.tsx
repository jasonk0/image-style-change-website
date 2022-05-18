import { defineComponent, reactive } from 'vue';
import Editor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import text from './cycleganMd'


export default defineComponent({
  setup() {
    const md = reactive({
      text: text.text,
      id: "preview-md"
    });
    const scrollElement = document.documentElement

    return () => (
      <div class="wrapper">
        <Editor.Catalog
          style={"position:fixed; right: 2vw; top: 15vh; width:27%;"}
          editorId={md.id}
          scrollElement={scrollElement}
        />
        <Editor
          editorId={md.id}
          theme='dark'
          previewOnly={true}
          highlightCss='https://cdn.jsdelivr.net/npm/highlight.js@11.2.0/styles/atom-one-dark.css'
          modelValue={md.text} onChange={(value) => (md.text = value)} />
      </div>

    );
  }
});