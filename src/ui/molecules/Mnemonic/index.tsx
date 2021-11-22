import { useRef, useState } from "react";

import * as S from "./styles";
import { MnemonicExportProps, MnemonicProps } from "./types";

// Transform component to tags
export const MnemonicImport = ({ label, handleChange, ...props }: MnemonicProps) => {
  const [state, setState] = useState({ tags: [] });

  const inputRef = useRef(null);
  // const buttonRef = useRef(null);

  // const handleOnMouseOut = () => (buttonRef.current.innerHTML = "Paste from clipboard");
  const onInputKeyDown = (e) => {
    const val = e.target.value;
    const sameValue = state.tags.find((tag) => tag.toLowerCase() === val.toLowerCase());
    const hasSpace = /\s/.test(val);
    if (val && e.key === "Enter") {
      if (sameValue || hasSpace) {
        return;
      }
      setState({ tags: [...state.tags, val] });
      inputRef.current.value = null;
    } else if (e.key === "Backspace" && !val) {
      handleRemove(state.tags.length - 1);
    }
  };
  const handleRemove = (i: number) => {
    const newTags = [...state.tags];
    newTags.splice(i, 1);
    setState({ tags: newTags });
  };

  return (
    <S.Wrapper>
      <S.MnemonicContainer>
        <label htmlFor={props.name}>{label}</label>
      </S.MnemonicContainer>
      <S.MnemonicImport hasTag={!!state.tags.length}>
        <ul>
          {state.tags &&
            state.tags.map((item, index) => (
              <S.MnemonicListItem key={index}>
                <button onClick={() => handleRemove(index)} type="button">
                  {item}
                </button>
              </S.MnemonicListItem>
            ))}
          <li>
            <input
              ref={inputRef}
              placeholder="Type your secret phrase to restore your wallet"
              onKeyDown={onInputKeyDown}
            />
          </li>
        </ul>

        <S.MnemonicAction type="button">
          <span>Click to paste</span>
        </S.MnemonicAction>
      </S.MnemonicImport>

      {/* <Field {...props} /> */}
    </S.Wrapper>
  );
};

export const MnemonicExport = ({ label, phrases }: MnemonicExportProps) => {
  const buttonRef = useRef(null);
  const handleOnMouseOut = () => (buttonRef.current.innerHTML = "Copy from clipboard");

  const handleCopy = async () => {
    await navigator.clipboard.writeText(phrases.join(" "));
    buttonRef.current.innerHTML = "Copied";
  };
  return (
    <S.Wrapper>
      <S.MnemonicContainer>
        <label htmlFor={label}>{label}</label>
      </S.MnemonicContainer>
      <S.TagsContainer>
        {phrases && phrases.map((item, index) => <S.Tag key={index}>{item}</S.Tag>)}
      </S.TagsContainer>
      <S.MnemonicAction
        type="button"
        ref={buttonRef}
        onMouseOut={handleOnMouseOut}
        onClick={handleCopy}>
        <span>Copy to clipboard</span>
      </S.MnemonicAction>
    </S.Wrapper>
  );
};
