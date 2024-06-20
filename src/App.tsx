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

    const itemData = parsed?.data?.assessmentItem?.item?.itemData;
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

  function copy(what: "parsed" | "itemData") {
    navigator.clipboard.writeText(what === "parsed" ? parsed : itemData);
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
          <button onClick={() => copy("parsed")}>Copy parsed</button>
        </div>
      </div>
      <div className="input-container">
        <label>
          Item Data (read only)
          <textarea value={itemData} readOnly />
        </label>
        <div>
          <button onClick={() => copy("itemData")}>Copy item data</button>
        </div>
      </div>
    </div>
  );
}

export default App;
