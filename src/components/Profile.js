import React from 'react';
import styles from '../css/Profile.module.css';

function Profile() {
  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileHeader}>
        <div className={styles.avatar}></div>
        <div>
          <h2>Kazi Ishmamul Haque</h2>
          <p>Joined: 10 May 2025</p>
        </div>
      </div>

      <div className={styles.profileBody}>
        <h3>About</h3>
        <p>Studies in Ahsanullah University of Science and Technology(AUST)</p>

        <h3>Interest</h3>
        <p>Interested in Modern Warefare & Modern Technology</p>
        
        
      </div>
    </div>
  );
}

export default Profile;
