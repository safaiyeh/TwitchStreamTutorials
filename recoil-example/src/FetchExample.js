import React, { useEffect } from 'react';
import { atom, useRecoilState, RecoilRoot } from 'recoil';

const catFactsState = atom({
  key: 'catFacts',
  default: []
});

const fetchingState = atom({
  key: 'fetching',
  default: 'false',
})

const FetchExample = () => {
  const [catFacts, setCatFacts] = useRecoilState(catFactsState);
  const [fetching, setFetching] = useRecoilState(fetchingState);

   const getCatFacts = () => {
     setFetching('true');
     fetch('https://cat-fact.herokuapp.com/facts')
      .then(response => response.json())
      .then(data => {
        setCatFacts(data.all)
        setFetching(false);
      });
   }

   useEffect(() => {
    getCatFacts();
   });

  return (
    <>
        <h1>Fetch Example</h1>
        {fetching ? <p>loading cat facts...</p> : <p>{JSON.stringify(catFacts)}</p>}
        <p>{JSON.stringify(catFacts)}</p>
    </>
  )
}

const FetchExampleComponent = () => <RecoilRoot><FetchExample/></RecoilRoot>;

export default FetchExampleComponent;