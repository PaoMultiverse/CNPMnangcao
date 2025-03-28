class NavigationStrategy {
  navigateToRole(navigate, role) {
    console.log("Navigating to role:", role);
    const routes = {
      tenant: "/tenant",
      landlord: "/landlord",
      admin: "/admin",
    };

    navigate(routes[role] || "/");
  }
}

const navigationStrategyInstance = new NavigationStrategy();
export default navigationStrategyInstance;
