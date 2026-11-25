import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.content}>
      <div className={styles.container}>
        <p className={styles.headingText}>
          Vacuum <br />
          Magazine
        </p>
        <div className={styles.button2}>
          <p className={styles.button}>See All Magazine</p>
          <div className={styles.icon}>
            <img
              src="../image/mwu5hvmo-fkfsnhy.svg"
              className={styles.chevronRight}
            />
          </div>
        </div>
      </div>
      <div className={styles.container2}>
        <div className={styles.cardPadding}>
          <div className={styles.imageVaccum}>
            <img src="../image/mwu5hvmq-y5y9mim.png" className={styles.image16} />
          </div>
          <div className={styles.text2}>
            <div className={styles.frame3465184}>
              <div className={styles.tag2}>
                <p className={styles.tag}>テクノロジーを知る</p>
              </div>
            </div>
            <div className={styles.text}>
              <p className={styles.title}>
                ULVAC Receives the "2025 TSMC Excellent Performance Award."
              </p>
              <p className={styles.date}>2025.12.25</p>
            </div>
          </div>
        </div>
        <div className={styles.cardPadding2}>
          <div className={styles.imageVaccum2}>
            <img src="../image/mwu5hvmq-z7p8bkw.png" className={styles.image162} />
          </div>
          <div className={styles.text4}>
            <div className={styles.tag3}>
              <p className={styles.tag}>未来を探る</p>
            </div>
            <div className={styles.text3}>
              <p className={styles.title2}>
                ULVAC Receives "Best Partner Award" from SK hynix
              </p>
              <p className={styles.date}>2025.11.21</p>
            </div>
          </div>
        </div>
        <div className={styles.cardPadding3}>
          <div className={styles.imageVaccum2}>
            <img src="../image/mwu5hvmq-z7p8bkw.png" className={styles.image162} />
          </div>
          <div className={styles.text5}>
            <div className={styles.tag4}>
              <p className={styles.tag}>人とものづくり</p>
            </div>
            <div className={styles.text3}>
              <p className={styles.title2}>
                ULVAC Recognized with CDP "Climate Change 2024" and "Water Security
                2024" B Score
              </p>
              <p className={styles.date}>2025.04.01</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Component;
