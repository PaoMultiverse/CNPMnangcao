class NavigationStrategy {
  navigate(navigate, role) {
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
