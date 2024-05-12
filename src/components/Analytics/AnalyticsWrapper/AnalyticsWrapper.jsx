import AnalyticsTabs from "./AnalyticsNav";
import styles from "../../Indicators/IndicatorsWrapper/IndicatorsWrapper.module.css";

export const AnalyticsWrapper = ({ children, activeTab, className }) => (
  <div className={`${styles.wrapper} ${className}`}>
    <AnalyticsTabs activeTab={activeTab} />
    <div className={styles.content}>{children}</div>
  </div>
);
