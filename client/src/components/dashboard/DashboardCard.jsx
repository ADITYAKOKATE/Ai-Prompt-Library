import "./DashboardCard.css";

function DashboardCard({
  title,
  value,
  description,
  icon,
}) {
  return (
    <div className="dashboard-card">
      <div className="dashboard-card-top">
        <span className="dashboard-card-icon">
          {icon}
        </span>

        <span className="dashboard-card-title">
          {title}
        </span>
      </div>

      <strong className="dashboard-card-value">
        {value}
      </strong>

      <p className="dashboard-card-description">
        {description}
      </p>
    </div>
  );
}

export default DashboardCard;