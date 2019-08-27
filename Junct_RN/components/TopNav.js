import React from "react";
import { View, Text, StyleSheet } from "react-native";
import TopBarNav from "top-bar-nav";
import OrderUncomplete from "../views/engineer/OrderUncomplete"
import OrderHistory from "../views/engineer/OrderHistory"
const Scene = ({ index }) => {
    return (index == 0?<OrderUncomplete></OrderUncomplete>
            :<OrderHistory></OrderHistory>);
};

const ROUTES = {
  Scene
};

// There are three types of labels (image, text, and element)
const ROUTESTACK = [
  { text: "待办工单", title: "Scene" },
  { text: "历史工单", title: "Scene" }
];

export default class Example extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <TopBarNav
          // routeStack and renderScene are required props
          routeStack={ROUTESTACK}
          renderScene={(route, i) => {
            // This is a lot like the now deprecated Navigator component
            let Component = ROUTES[route.title];
            return <Component index={i} />;
          }}
          // Below are optional props
          headerStyle={[styles.headerStyle, { paddingTop: 30 }]} // probably want to add paddingTop if using TopBarNav for the  entire height of screen to account for notches/status bars
          textStyle={styles.textStyle}
          underlineStyle={styles.underlineStyle}
          imageStyle={styles.imageStyle}
          sidePadding={40} // Can't set sidePadding in headerStyle because it's needed to calculate the width of the tabs
          inactiveOpacity={1}
          fadeLabels={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerStyle: {
    borderBottomWidth: 1,
    borderColor: "#FFF",
    backgroundColor: "#3385ff"
  },
  textStyle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#FFF"
  },
  imageStyle: {
    height: 20,
    width: 20,
    tintColor: "#FFF"
  },
  underlineStyle: {
    height: 6,
    backgroundColor: "#FFF",
    width: 100,
    marginBottom: -2
  }
});
