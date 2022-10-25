import type { NextPage } from "next";
import { FetchEventResult } from "next/dist/server/web/types";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { Layout } from "../../components/Layout";
import { useData } from "../../hooks/useData";
import styles from "../../styles/GamePage.module.scss";
import Modal from "../../components/Modal";

const Footer = () => {
    const router = useRouter();
    return(
        <div className={styles.footerBox}>
            <div className={styles.footer}>
                <button className={styles.button} onClick={() => router.back()}>
                    이전
                </button>
                <span>16강</span>
            </div>
            <div className={styles.stateBar}>
                <div className={styles.state}></div>
            </div>
        </div>
    )
    }
const Home: NextPage = () => {

    let [modal, setModal] = useState(false);
    let images = ["/assets/gamePage/dog2.jpg", "/assets/gamePage/dog3.jpg"];
    let [image, setImage] = useState(images[0]);

    return(
        <Layout footer={<Footer></Footer>} noBackground>
            
                <div className={styles.contents}>
                        <div className={styles.img1Area}>
                            <div className={styles.imgBorder1}>
                                <img className={styles.img1} src={images[0]}></img>
                            </div>
                            <img className={styles.mag1} onClick={()=>{setModal(!modal); setImage(images[0])}} src="/assets/gamePage/확대.svg"></img>
                        </div>
                        
                        <div className={styles.img2Area}>
                            <div className={styles.imgBorder2}>
                                <img className={styles.img2} src={images[1]}></img>
                            </div>
                            <img className={styles.mag2} onClick={()=>{setModal(!modal); setImage(images[1])}} src="/assets/gamePage/확대.svg"></img>
                        </div>
                        <img className={styles.vs} src="/assets/gamePage/vs.png"></img>
                   
                    {
                    modal == true ? <Modal closeModal={() => setModal(!modal)} image={image}></Modal> : null
                    }
                </div>
        </Layout>
    )
}

export default Home;

