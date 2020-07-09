import React from 'react';
import { atom, RecoilRoot, useRecoilState, selector, useRecoilValue } from 'recoil';

const textState = atom({
  key: 'textState',
  default: ''
});

const charCountState = selector({
  key: 'charCountState',
  get: ({get}) => {
    const text = get(textState);

    return text.length;
  }
})

const CharacterCounter = () => {
  const [text, setText] = useRecoilState(textState);
  const count = useRecoilValue(charCountState);

  const onChange = (event) => {
    setText(event.target.value);
  }

  return (
    <>
      <input type="text" value={text} onChange={onChange} />
      <br />
      Echo: {text}
      <br />
      Character Count: {count}
    </>
  )
}

function CounterExample() {
  return (
    <RecoilRoot>
      <CharacterCounter />
    </RecoilRoot>
  );
}

export default CounterExample;
