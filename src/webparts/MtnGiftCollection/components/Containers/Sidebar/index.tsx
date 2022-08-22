import * as React from 'react';
import styles from "./styles.module.scss"

const Sidebar = () => {
  return (
    <div className={styles.app}>
        <div className={styles.logo_container}>
        <div className={styles.header_logo}>
                    <img src={require('../../assets/Vector.png')} alt="logo" />
                </div>
        </div>
        <div className={styles.mtn_logo}>
        <div className={styles.header_logo2}>
                    <img src={require('../../assets/Y’ello.png')} alt="logo" />
                </div>
        </div>
    </div>
  )
}

export default Sidebar