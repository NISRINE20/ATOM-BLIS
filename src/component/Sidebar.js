const SidebarComponent = ({
  isDashboardVisible,
  toggleDashboard,
  userName,
  userPosition,
  handleAddMaterialsClick,
  handleChartsClick,
  handleHomeClick,
  handleFilterModalOpen,
  showCharts,
}) => {
  return (
    <div className="sidebar">
      {/* ...existing code... */}
      {isDashboardVisible && (
        <>
          <button onClick={handleAddMaterialsClick}>Add Materials</button>
          <button onClick={handleChartsClick}>View Charts</button>
          <button onClick={handleHomeClick}>Home</button>
          <button onClick={handleFilterModalOpen}>Filter Records</button>
        </>
      )}
      {/* ...existing code... */}
    </div>
  );
};

export default SidebarComponent;