import React, { Component } from "react";
import { StyleSheet, View, Image } from "react-native";
import TabNavigator from "react-native-tab-navigator";

import WorkTable from "./views/engineer/WorkTable";
import Mine from "./views/engineer/Mine";
import ChargeAproval from "./views/engineer/ChargeAproval";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: "WorkTable"
    };
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <TabNavigator>
          <TabNavigator.Item
            selected={this.state.selectedTab === "WorkTable"}
            title="工作台"
            renderIcon={() => (
              <Image
                style={styles.icons}
                source={require("./assets/img/wt.png")}
              />
            )}
            renderSelectedIcon={() => (
              <Image
                style={styles.icons}
                source={require("./assets/img/wt_a.png")}
              />
            )}
            onPress={() => this.setState({ selectedTab: "WorkTable" })}
          >
            <WorkTable></WorkTable>
          </TabNavigator.Item>

          {/* 充值审批 */}
          <TabNavigator.Item
            title="充值审批"
            selected={this.state.selectedTab === "ChargeApproval"}
            renderIcon={() => (
              <Image
                style={styles.icons}
                source={require("./assets/img/chr.png")}
              />
            )}
            renderSelectedIcon={() => (
              <Image
                style={styles.icons}
                source={require("./assets/img/chr_a.png")}
              />
            )}
            onPress={() => this.setState({ selectedTab: "ChargeApproval" })}
          >
            <ChargeAproval></ChargeAproval>
          </TabNavigator.Item>
          {/* 我的 */}
          <TabNavigator.Item
            title="我的"
            selected={this.state.selectedTab === "Mine"}
            renderIcon={() => (
              <Image
                style={styles.icons}
                source={require("./assets/img/mine.png")}
              />
            )}
            renderSelectedIcon={() => (
              <Image
                style={styles.icons}
                source={require("./assets/img/mine_a.png")}
              />
            )}
            onPress={() => this.setState({ selectedTab: "Mine" })}
          >
            <Mine></Mine>
          </TabNavigator.Item>
        </TabNavigator>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  icons: {
    width: 25,
    height: 24
  }
});
