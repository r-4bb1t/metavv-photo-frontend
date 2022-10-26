import type { NextPage } from "next";
import { FetchEventResult } from "next/dist/server/web/types";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { Layout } from "../../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../../redux/store";
import { GameStart } from "../../../components/GameStart";
import Vote from "../../../components/Vote";
import MyResultPage from "../../../components/Result/MyResultPage";
import Frame from "../../../components/Result/Frame";
import AllResultPage from "../../../components/Result/AllResultPage";

export enum PAGE_STATE {
  index,
  vote,
  all,
  frame,
  my,
}

const Home: NextPage = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");

  const [pageState, setPageState] = useState(PAGE_STATE.index);

  const fetchData = useCallback(async () => {
    const result = await (
      await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/${router.query.gameId}`
      ).catch((e: FetchEventResult) => {
        console.log(e);
        router.push("/");
      })
    )?.json();
    setTitle(result.title);
  }, [router]);

  useEffect(() => {
    if (router.query.gameId) {
      fetchData();
    }
  }, [fetchData, router.query.gameId]);

  return (
    <>
      {
        {
          [PAGE_STATE.index]: (
            <GameStart title={title} setPageState={setPageState} />
          ),
          [PAGE_STATE.vote]: (
            <Vote
              setPageState={setPageState}
              gameId={router.query.gameId as string}
            />
          ),
          [PAGE_STATE.all]: (
            <AllResultPage
              setPageState={setPageState}
              gameId={router.query.gameId as string}
            />
          ),
          [PAGE_STATE.frame]: (
            <Frame
              setPageState={setPageState}
              gameId={router.query.gameId as string}
            />
          ),
          [PAGE_STATE.my]: (
            <MyResultPage
              setPageState={setPageState}
              gameId={router.query.gameId as string}
            />
          ),
        }[pageState]
      }
    </>
  );
};

export default Home;
