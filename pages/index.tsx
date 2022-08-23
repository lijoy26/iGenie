
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

import styles from "../styles/Home.module.css";
import Image from "next/image";

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <div className={`${styles.container} `}>
      <div className="outer">
        <div className="hdr">
          <div className="lg">
            <Image
              src="/images/genie.png"
              alt="logo"
              width={75}
              height={75}
            ></Image>
          </div>
          <div className="desc">
            <p style={{ color: "#102333", fontWeight: "bold", fontSize: 20 }}>
              Interview
              <br />
              <span style={{ color: "#ed6939", fontSize: 25,  }}>
                {" "}
                G e n i e{" "}
              </span>
            </p>
          </div>
        </div>
        <div className={`${styles.btn} `}>
         

          <button className="btn-primary">
            <Link href="/interview_form">
              <a style={{ color: "#D8DEE3", textDecoration: "none" }}>
                Take Interview
              </a>
            </Link>
          </button>

          <button className="btn-secondary">
            <Link href="/interview_results">
              <a style={{ color: "#D8DEE3", textDecoration: "none" }}>
                {" "}
                Interview Results{" "}
              </a>
            </Link>
          </button>
          <button className="btn-secondary">
            <Link href="/library">
              <a style={{ color: "#D8DEE3", textDecoration: "none" }}>
                {" "}
                Contribute to Library
              </a>
            </Link>
          </button>
         
        </div>
      </div>
      <style jsx>{`
        .hdr {
          display: flex;

          justify-content: center;
          align-items: center;
          flex-direction: row;
          flex-wrap: wrap;
          margin-bottom: 1rem;
        }
        p {
          margin-left: 1rem;
        }
        .lg {
          margin-bottom:1rem;
        }
        
         
      `}</style>
    </div>
  );
};

export default Home;

