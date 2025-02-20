import "./App.css";
import { useCallback, useState } from "react";

function App() {
  const [world, setWorld] = useState<string[][]>([]);
  const [seed, setSeed] = useState(() => Date.now());
  const [dimension, setDimension] = useState(25);
    const[error, setError] = useState<string|null>(null)
  const onSubmit = useCallback(() => {
        setError(null)
    fetch(
      "/gen?" + new URLSearchParams({
        seed,
        dimension,
      }),
    ).then((r) => r.json()).then(setWorld).catch(e=>setError(e.message));
  }, [seed, dimension]);
  return (
    <>
      <h1>Dun-Gen</h1>
      <p>A dungeon generator</p>
            {error}
      <br />
      <br />

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <div>
          <label htmlFor="seed" style={{ marginInlineEnd: "4px" }}>Seed:</label>
          <input
            id="seed"
            type="number"
            value={seed}
            onChange={(e) => setSeed(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="dimension" style={{ marginInlineEnd: "4px" }}>
            World size:
          </label>
          <input
            id="dimension"
            name="dimension"
            type="number"
            value={dimension}
            onChange={(e) => setDimension(e.target.value)}
          />
        </div>
        <button type="submit" onClick={onSubmit}>Generate!</button>
      </div>

      <div
        style={{
          display: "grid",
          width: (16 * dimension) + "px",
          height: (16 * dimension) + "px",
          gap: 0,
          gridTemplateColumns: `repeat(${dimension}, 1fr)`,
          gridTemplateRows: `repeat(${dimension}, 1fr)`,
          outline: "1px solid green",
        }}
      >
        {world.map((options: string[], i: number) => (
          <div
            style={{ fontSize: "16px", height:'16px', width: '16px', margin: 0, lineHeight: "1rem", padding: 0 }}
            key={i}
          >
            {options.length === 1 && options[0].startsWith("/")
              ? <img src={options[0]} />
              : <ManyOptions options={options} />}
          </div>
        ))}
      </div>
    </>
  );
}

function ManyOptions({ options }: { options: string[] }) {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        console.log(options);
      }}
    >
      {options.length}
    </div>
  );
}

export default App;
