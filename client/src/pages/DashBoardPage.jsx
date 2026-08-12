import {
  FaFileAlt,
  FaStar,
  FaFolder,
  FaClock,
} from "react-icons/fa";

import DashboardCard from "../components/dashboard/DashboardCard";
import LoadingSpinner from "../components/common/LoadingSpinner";
import usePrompts from "../hooks/usePrompts";

import "./DashBoardPage.css";

function DashboardPage() {
  const { prompts, loading } = usePrompts();

  if (loading) return <LoadingSpinner />;

  const favoriteCount = prompts.filter(
    (prompt) => prompt.isFavorite
  ).length;

  const categoriesCount = new Set(
    prompts.map((prompt) => prompt.category)
  ).size;

  const recentPrompts = [...prompts]
    .sort(
      (a, b) =>
        new Date(b.createdAt) -
        new Date(a.createdAt)
    )
    .slice(0, 5);

  return (
    <div className="dashboard-page">
      <div className="page-heading">
        <div>
          <p className="page-eyebrow">OVERVIEW</p>
          <h2>Dashboard</h2>
          <p>
            Manage and organize your reusable AI prompts.
          </p>
        </div>
      </div>

      <section className="dashboard-grid">
        <DashboardCard
          title="Total Prompts"
          value={loading ? "..." : prompts.length}
          description="Prompts in your library"
          icon={<FaFileAlt />}
        />

        <DashboardCard
          title="Favorite Prompts"
          value={loading ? "..." : favoriteCount}
          description="Your most useful prompts"
          icon={<FaStar />}
        />

        <DashboardCard
          title="Categories"
          value={loading ? "..." : categoriesCount}
          description="Categories currently in use"
          icon={<FaFolder />}
        />

        <DashboardCard
          title="Recently Added"
          value={loading ? "..." : recentPrompts.length}
          description="Latest prompts added"
          icon={<FaClock />}
        />
      </section>
    </div>
  );
}

export default DashboardPage;