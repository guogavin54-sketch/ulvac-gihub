import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.section}>
      <div className={styles.bG}>
        <div className={styles.eclipse} />
        <div className={styles.rectangle29} />
      </div>
      <img src="../image/mwxdhfkz-qw3wqo3.png" className={styles.image40} />
      <img src="../image/mwxdhfkz-bbtswlb.png" className={styles.texture} />
      <div className={styles.container}>
        <div className={styles.title}>
          <p className={styles.talkToUs}>Talk to us</p>
          <p className={styles.superMiniaturization}>
            Tell us your device, your material and your target, <br />
            our process engineers respond with the relevant technology.
          </p>
        </div>
        <div className={styles.button2}>
          <p className={styles.button}>Inquiry</p>
          <div className={styles.icon}>
            <img
              src="../image/mwxdhfky-b7tic6a.svg"
              className={styles.chevronRight}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Component;
