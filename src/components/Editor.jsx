import { useState } from "react";
import ReactMde from "react-mde";
import Showdown from "showdown";
import PropTypes from "prop-types";
import "react-mde/lib/styles/css/react-mde-all.css";
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
        value={TempNoteText}
        onChange={setTempNoteText}
        selectedTab={SelectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown) =>
          Promise.resolve(converter.makeHtml(markdown))
        }
        minPreviewHeight={75}
        minEditorHeight={60}
        maxEditorHeight={75}
        initialEditorHeight={80}
        heightUnits="vh"
      />
    </section>
  );
}

Editor.propTypes = {
  TempNoteText: PropTypes.string.isRequired,
  setTempNoteText: PropTypes.func.isRequired,
};
export default Editor;
