import { useEffect, useState } from "react";
import "./App.css";

function parse(input: string) {
  const output = {
    parsed: "",
    itemData: "",
  };

  if (!input) return output;

  try {
    let parsed = JSON.parse(input);
    output.parsed = JSON.stringify(parsed, null, 2);

    const itemData =
      parsed?.data?.assessmentItem?.item?.itemData ||
      parsed?.assessmentItem?.item?.itemData ||
      parsed?.item?.itemData ||
      parsed?.itemData;
    if (itemData) {
      parsed = JSON.parse(itemData);
      output.itemData = JSON.stringify(parsed, null, 2);
    }
  } catch (err) {
    console.error(err);
  }

  return output;
}

function App() {
  const [input, setInput] = useState("");
  const [parsed, setParsed] = useState("");
  const [itemData, setItemData] = useState("");

  useEffect(() => {
    const out = parse(input);
    setParsed(out.parsed);
    setItemData(out.itemData);
  }, [input]);

  function copy(what: "parsed" | "itemData" | "question") {
    let text = "";
    if (what === "parsed") {
      text = parsed;
    } else if (what === "itemData") {
      text = itemData;
    } else if (what === "question") {
      const parsedItemData = JSON.parse(itemData);
      if (!parsedItemData?.question) {
        return;
      }
      text = JSON.stringify(parsedItemData.question, null, 2);
    } else {
      return;
    }
    navigator.clipboard.writeText(text);
  }

  return (
    <div className="app-container">
      <div className="input-container">
        <label>
          Input
          <textarea value={input} onChange={(e) => setInput(e.target.value)} />
        </label>
      </div>
      <div className="input-container">
        <label>
          Parsed (read only)
          <textarea value={parsed} readOnly />
        </label>
        <div>
          <button onClick={() => copy("parsed")} disabled={!parsed}>
            Copy parsed
          </button>
        </div>
      </div>
      <div className="input-container">
        <label>
          Item Data (read only)
          <textarea value={itemData} readOnly />
        </label>
        <div>
          <button onClick={() => copy("itemData")} disabled={!itemData}>
            Copy item data
          </button>
          <button onClick={() => copy("question")} disabled={!itemData}>
            Copy question
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
