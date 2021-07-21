import React, { useState, useRef } from "react";

const text =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

// get time diff in seconds
const getTimeDiff = (start, end) => {
  const diff = end - start;
  const secs = diff / 1000;
  return Math.floor(secs);
};

// take time in second and a string and return words per minute
const getWPM = (time, text) => {
  const words = text.split(" ");
  const wordCount = words.length;
  const wpm = (wordCount / time) * 60;
  return Math.floor(wpm);
};

// get accuracy from string length and mistakes
const getAccuracy = (length, mistakes) => {
  const accuracy = (length - mistakes) / length;
  return Math.floor(accuracy * 100);
};

const Type = () => {
  const [pos, setPos] = useState(0);
  const [begin, setBegin] = useState(false);
  const [finish, setFinish] = useState(false);
  const [input, setInput] = useState("");
  const [focused, setFocused] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [finishTime, setFinishTime] = useState(0);
  const [mistake, setMistake] = useState(0);

  const inputRef = useRef();

  const handleInput = (e) => {
    let v = e.target.value;
    v = v.charAt(v.length - 1);
    setInput(v);

    if (text.charAt(pos) === v) {
      if (begin === false) {
        setBegin(true);
        setStartTime(Date.now);
      }
      if (pos === text.length - 1) {
        setFinish(true);
        setFinishTime(Date.now);
      }
      setPos((p) => p + 1);
    } else if (!finish) {
      setMistake((m) => m + 1);
    }
  };

  return (
    <>
      {finish && (
        <div className="mb-4">
          <div>Time taken: {getTimeDiff(startTime, finishTime)} s</div>
          <div>WPM: {getWPM(getTimeDiff(startTime, finishTime), text)}</div>
          <div>Accuracy: {getAccuracy(text.length, mistake)}%</div>
        </div>
      )}
      <div
        className={`max-w-3xl border-2 rounded-lg p-4 ${
          focused ? "border-blue-400" : "border-gray-200"
        }`}
        onClick={() => inputRef.current.focus()}
      >
        <span className="text-blue-400">{text.slice(0, pos)}</span>
        <span className="text-xl bg-blue-600 text-gray-50 font-bold">
          {text.charAt(pos)}
        </span>
        <span>{text.slice(pos + 1)}</span>
      </div>
      {finish && (
        <button
          onClick={() => {
            setBegin(false);
            setFinish(false);
            setPos(0);
            setInput("");
            setMistake(0);
          }}
          className="py-2 px-4 mt-4 bg-blue-200 rounded-md"
        >
          Restart
        </button>
      )}
      <input
        type="text"
        ref={inputRef}
        onChange={handleInput}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        value={input}
        className="outline-none text-2xl blur-0 absolute top-0 left-1/2 text-transparent p-2"
        style={{ textShadow: "0px 0px 1px #000" }}
      />
    </>
  );
};

export default Type;
