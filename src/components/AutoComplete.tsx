import react, { ChangeEvent, FC, useState } from "react";


interface autoCompleteProps {
    data: any[];
  }

interface IData {
  name: string;
  code: string;
}

export const AutoComplete: FC<autoCompleteProps> = ({
    data
  }) => {
    const [search, setSearch] = useState({
      text: "",
      suggestions: []
    });
    const [isComponentVisible, setIsComponentVisible] = useState(true);
    const onTextChanged = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      let suggestions = [];
      if (value.length > 0) {
        const regex = new RegExp(`^${value}`, "i");
        suggestions = data.sort().filter((v: IData) => regex.test(v.name));
      }
      setIsComponentVisible(true);
      setSearch({ suggestions, text: value });
    };
  
    const suggestionSelected = (value: IData) => {
      setIsComponentVisible(false);
  
      setSearch({
        text: value.name,
        suggestions: []
      });
    };
  
    const { suggestions } = search;
  
    return (
            <><div
            onClick={() => setIsComponentVisible(false)}
            style={{
                display: isComponentVisible ? "block" : "none",
                width: "200vw",
                height: "200vh",
                backgroundColor: "transparent",
                position: "fixed",
                zIndex: 0,
                top: 0,
                left: 0
            }} /><div>
                <input
                    id="input"
                    autoComplete="off"
                    value={search.text}
                    onChange={onTextChanged}
                    type={"text"}/>
            </div>
        {suggestions.length > 0 && isComponentVisible && (
          <div>
            {suggestions.map((item: IData) => (
              <div key={item.code}>
                <div
                  key={item.code}
                  onClick={() => suggestionSelected(item)}
                >
                  {item.name}
                </div>
              </div>
            ))}
          </div>
        )}
        </>
    )
  };