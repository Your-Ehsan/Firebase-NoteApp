import { useState } from "react";
import ReactMde from "react-mde";
import Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";

function Editor(props) {
  const [SelectedTab, setSelectedTab] = useState("write");

  const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
    simpleLineBreaks: true,
  });

  return (
    <section className="w-full">
      <ReactMde
        // eslint-disable-next-line react/prop-types
        value={props.TempNoteText}
        // eslint-disable-next-line react/prop-types
        onChange={props.setTempNoteText}
        selectedTab={SelectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown) =>
          Promise.resolve(converter.makeHtml(markdown))
        }
        minPreviewHeight={80}
        minEditorHeight={80}
        heightUnits="vh"
      />
    </section>
  );
}

export default Editor;
