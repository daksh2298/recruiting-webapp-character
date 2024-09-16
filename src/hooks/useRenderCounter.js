import React from "react";

// utility hook to quickly test the re-renders without profiler
function useRenderCounter() {
  const ref = React.useRef();
  React.useEffect(() => {
    if (ref.current)
      ref.current.textContent = Number(ref.current?.textContent || "0") + 1;
  });
  return (
    <span
      style={{
        backgroundColor: "#ccc",
        borderRadius: 4,
        padding: "2px 4px",
        fontSize: "0.8rem",
        margin: "0 6px",
        display: "inline-block",
      }}
      ref={ref}
    />
  );
}

export default useRenderCounter;
