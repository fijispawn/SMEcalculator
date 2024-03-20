import styles from './IndicatorsWrapper.module.css';
import NavigationTabs from "./NavigationTabs.jsx";

export const IndicatorsWrapper = ({ children, activeTab, className }) => (
    <div className={`${styles.wrapper} ${className}`}>
        <NavigationTabs activeTab={activeTab} />
        <div className={styles.content}>{children}</div>
    </div>
)
