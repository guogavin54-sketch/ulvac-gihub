import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.privacyPolicyTermsOf}>
        <div className={styles.containerRight}>
          <div className={styles.list}>
            <p className={styles.home}>About ULVAC</p>
            <p className={styles.home2}>Overview</p>
            <p className={styles.home2}>Company Profile</p>
            <p className={styles.home2}>History of ULVAC</p>
            <p className={styles.home2}>Group Companies</p>
            <p className={styles.home2}>Sustainability</p>
          </div>
          <div className={styles.list}>
            <p className={styles.home}>Business & Products</p>
            <p className={styles.home2}>Our Business</p>
            <p className={styles.home2}>Technology</p>
            <p className={styles.home2}>Products</p>
          </div>
          <div className={styles.list2}>
            <p className={styles.home}>Media</p>
            <p className={styles.home2}>News</p>
            <p className={styles.home2}>Vacuum Magazine</p>
            <div className={styles.itemNavigation}>
              <p className={styles.home3}>Investor Relations</p>
              <img
                src="../image/mwycybzb-p26l9xq.svg"
                className={styles.openInNew}
              />
            </div>
            <p className={styles.home2}>Download List</p>
          </div>
          <div className={styles.list}>
            <p className={styles.home}>Reach Us</p>
            <p className={styles.home2}>Contact</p>
            <p className={styles.home2}>Support</p>
          </div>
        </div>
        <img
          src="../image/mwycybzd-7bwpfwt.png"
          className={styles.uLvaclogoWhite1}
        />
      </div>
      <div className={styles.container}>
        <p className={styles.a2026UlvacIncAllRigh}>
          © 2026 ULVAC, Inc. All Rights Reserved.
        </p>
        <div className={styles.item}>
          <p className={styles.home2}>Privacy Policy</p>
          <p className={styles.home2}>Terms of Use</p>
          <p className={styles.home2}>Sitemap</p>
        </div>
      </div>
    </div>
  );
}

export default Component;
