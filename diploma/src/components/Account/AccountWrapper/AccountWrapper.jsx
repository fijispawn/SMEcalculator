import AccountNav from "./AccountNav";
import styles from './AccountWrapper.module.css'

export const AccountWrapper = ({ children, activeTab }) => (
  <div className={styles.wrapper}>
    <AccountNav  activeTab={activeTab} />
    <div className={styles.content}>{children}</div>
  </div>
);
