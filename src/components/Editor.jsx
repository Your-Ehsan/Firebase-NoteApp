import { useState } from "react";
import ReactMde from "react-mde";
import Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";

// eslint-disable-next-line react/prop-types
function Editor({ TempNoteText, setTempNoteText }) {
  const [SelectedTab, setSelectedTab] = useState("write"),

   converter = new Showdown.Converter({
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
        value={TempNoteText}
        // eslint-disable-next-line react/prop-types
        onChange={setTempNoteText}
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
