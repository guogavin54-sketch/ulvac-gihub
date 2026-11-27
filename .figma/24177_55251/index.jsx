import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.content}>
      <p className={styles.headingText}>Equipment & materials for power devices</p>
      <div className={styles.container5}>
        <div className={styles.card}>
          <div className={styles.aPhase1ImagesBusines}>
            <img
              src="../image/mwxdgbhh-2giwe71.png"
              className={styles.a01SemiconductorAndE}
            />
          </div>
          <div className={styles.container}>
            <div className={styles.tag2}>
              <p className={styles.tag}>Ion Implantation</p>
            </div>
            <p className={styles.title}>SOPHI-400</p>
            <div className={styles.description}>
              <p className={styles.superMiniaturization}>
                High-energy ion implanter, top share in power devices and IGBT
              </p>
            </div>
            <div className={styles.button2}>
              <p className={styles.button}>Learn More</p>
              <img
                src="../image/mwxdgbhc-clpst6c.svg"
                className={styles.chevronRight}
              />
            </div>
          </div>
        </div>
        <div className={styles.card2}>
          <div className={styles.aPhase1ImagesBusines}>
            <img
              src="../image/mwxdgbhh-sq6ivd6.png"
              className={styles.a01SemiconductorAndE}
            />
          </div>
          <div className={styles.container2}>
            <div className={styles.tag3}>
              <p className={styles.tag}>Sputtering Systems</p>
            </div>
            <p className={styles.title}>uGmni-300S</p>
            <div className={styles.description}>
              <p className={styles.superMiniaturization}>
                Mass-production sputtering for power, opto and RF devices
              </p>
            </div>
            <div className={styles.button2}>
              <p className={styles.button}>Learn More</p>
              <img
                src="../image/mwxdgbhc-clpst6c.svg"
                className={styles.chevronRight}
              />
            </div>
          </div>
        </div>
        <div className={styles.card3}>
          <div className={styles.aPhase1ImagesBusines}>
            <img
              src="../image/mwxdgbhh-v02mdg7.png"
              className={styles.a01SemiconductorAndE}
            />
          </div>
          <div className={styles.container3}>
            <div className={styles.tag5}>
              <p className={styles.tag4}>Sputtering Systems</p>
            </div>
            <p className={styles.title}>SEGul-200</p>
            <div className={styles.description}>
              <p className={styles.superMiniaturization}>
                Sputtering for GaN device mass production
              </p>
            </div>
            <div className={styles.button2}>
              <p className={styles.button}>Learn More</p>
              <img
                src="../image/mwxdgbhc-clpst6c.svg"
                className={styles.chevronRight}
              />
            </div>
          </div>
        </div>
        <div className={styles.card4}>
          <div className={styles.aPhase1ImagesBusines}>
            <img
              src="../image/mwxdgbhh-ps7qeiq.png"
              className={styles.a01SemiconductorAndE}
            />
          </div>
          <div className={styles.container4}>
            <div className={styles.tag6}>
              <p className={styles.tag}>Dry Etching Systems</p>
            </div>
            <p className={styles.title}>NE-550EX</p>
            <p className={styles.superMiniaturization2}>
              Magnetic-field ICP dry etching
            </p>
            <div className={styles.button2}>
              <p className={styles.button}>Learn More</p>
              <img
                src="../image/mwxdgbhc-clpst6c.svg"
                className={styles.chevronRight}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.button4}>
        <p className={styles.button3}>All products</p>
        <div className={styles.icon}>
          <img
            src="../image/mwxdgbhc-c45rk1h.svg"
            className={styles.chevronRight2}
          />
        </div>
      </div>
    </div>
  );
}

export default Component;
