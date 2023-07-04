import { sidebarActions } from "..";

export const layoutElements = () => {
  return {
    sidebar: document.getElementById("sidebar"),
    headerMainFooter: document.getElementById("header-main-footer"),
  };
};

export const openSidebar = () => {
  const layout = layoutElements();
  layout.sidebar.style.left = "0px";
  layout.headerMainFooter.style.marginLeft = "256px";

  return (dispatch) => {
    dispatch(sidebarActions.openSidebar());
  };
};

// Auto open sidebar on medium screens(768px)
export const autoOpenSidebar = () => {
  const layout = layoutElements();
  layout.sidebar.style.left = "0px";
  layout.headerMainFooter.style.marginLeft = "256px";

  return (dispatch) => {
    dispatch(sidebarActions.openSidebar());
  };
};

export const closeSidebar = () => {
  const layout = layoutElements();
  layout.sidebar.style.left = "-256px";
  layout.headerMainFooter.style.marginLeft = "0px";

  return (dispatch) => {
    dispatch(sidebarActions.closeSidebar());
  };
};

// Auto close sidebar on medium screens(768px)
export const autoCloseSidebar = () => {
  const layout = layoutElements();
  layout.sidebar.style.left = "-256px";
  layout.headerMainFooter.style.marginLeft = "0px";

  return (dispatch) => {
    dispatch(sidebarActions.closeSidebar());
  };
};
