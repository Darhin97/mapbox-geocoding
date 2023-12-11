"use client";
import AsyncSelect from "react-select/async";
import axios from "axios";
import { useState } from "react";

export default function Home() {
  const [selected, setSelected] = useState<string | null>(null);

  // console.log(selected?.split("/"));

  const handleFetch = async (inputValue: string) => {
    const res = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${inputValue}.json?access_token=pk.eyJ1IjoiamhlbHktYm9saXZpYSIsImEiOiJjbHEwcmE4OWMwMTE2Mmxwa2IwYXBqc3doIn0.SFMWp-LVdJVxIacd_b5FVw`
    );
    console.log("Response from reques", res);

    const info = res.data.features.map((data) => ({
      label: data.place_name,
      value: `${data.center[1]}/${data.center[0]}/${data.place_name}`,
    }));

    // console.log(info);

    return res.data.features.map((data) => ({
      label: data.place_name,
      value: `${data.center[1]}/${data.center[0]}/${data.place_name}`,
    }));
  };

  return (
    <div className="pt-10 w-full h-full">
      <div className="max-w-xl mx-auto border rounded-md shadow-md p-9 space-y-6">
        <h1>Mapbox POC</h1>
        <AsyncSelect
          isClearable
          isSearchable
          loadOptions={handleFetch}
          onChange={(val) => {
            console.log(val);
            if (val) {
              setSelected(val.value);
            }
          }}
        />
        {/* <button onClick={handleclick}>click me</button> */}
      </div>
    </div>
  );
}
