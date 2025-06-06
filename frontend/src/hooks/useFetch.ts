import { Contest } from "@/types";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

export const useFetch = () => {
  const [data, setData] = useState<Contest[]>([]);
  const [loader, setLoader] = useState<boolean>(true);

  const allContestsRef = useRef<Contest[]>([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/v1/all/contests')
    .then(res => {
      allContestsRef.current = res.data;
      setData(res.data);
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      setLoader(false);
    });
  }, [])

  return {
    allContestsRef,
    data,
    setData,
    loader,
    setLoader,
  }
}