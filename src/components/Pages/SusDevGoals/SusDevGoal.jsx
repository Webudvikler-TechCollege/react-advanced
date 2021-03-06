import React, { useState, useEffect } from "react";
import Styles from "./SusDevGoals.module.scss";

// Hent parametre
const getParams = (url) => {
  return url.substr(url.lastIndexOf('/')+1)
};

export default function Goal(props) {

  const id = getParams(props.location.pathname);
  const [data, setData] = useState(null);

  console.log(id);

  useEffect(() => {
    console.log(data);
    if (!data && id) {
      fetch("https://api.mediehuset.net/sdg/goals/" + id)
        .then((res) => res.json())
        .then((apidata) => setData(apidata));
    }
  }, [data, setData, id]);

  return (
    <div>
      {data ? (
        <div>
          <h2>{data.item.title}</h2>
          <h3>{data.item.byline}</h3>
          <p><img alt="{data.item.title}" src={data.item.image}></img></p>
          <p className={Styles.description}>{data.item.description}</p>
          <ul> 
            {data.item.targets && data.item.targets.map(target => {
              return (
                <li key={target.id}>
                  {target.title}
                  {target.description}
                </li>
              )
            })}
          </ul>
        </div>
      ) : (
        <div>Loading..</div>
      )}
    </div>
  );
}
