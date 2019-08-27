import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  ActivityIndicator
} from "react-native";
import MD5 from "react-native-md5";

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSize: 10,
      pageNum: 1,
      total: 0,
      orders: []
    };
  }
  componentDidMount() {
    this.login();
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.state.orders}
          keyExtractor={this._keyExtractor}
          renderItem={this.renderListItem}
        />
      </View>
    );
  }
  _keyExtractor = (e, i) => String(i);
  login = () => {
    let timesTamp = Math.round(new Date().getTime() / 1000);
    let str = `password=123456timesTamp=${timesTamp}username=app`;
    let signature = MD5.hex_md5(str).toLocaleLowerCase();
    let params = `username=app&password=123456&timesTamp=${timesTamp}&signature=${signature}`;
    let that = this;
    fetch("http://47.110.15.39:9080/app/login", {
      method: "POST",
      body: params,
      headers: {
        "Content-type": "application/x-www-form-urlencoded"
      }
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(info) {
        if (info.code == 200) {
          //console.warn(info.data.token);
          that.setState({
            token: info.data.token
          });
          that.fetchOrders(info.data.token);
        }
      });
  };

  fetchOrders = token => {
    fetch("http://47.110.15.39:9080/app/installOrder/list", {
      method: "POST",
      body: `type=1&pageSize=${this.state.pageSize}&pageNum=${this.state.pageNum}`,
      headers: {
        token: token,
        "Content-type": "application/x-www-form-urlencoded"
      }
    })
      .then(function(response) {
        return response.json();
      })
      .then(info => {
        this.setState({
          total: info.data.total || 0,
          orders: info.data.list || []
        });
      });
  };
  //渲染列表的每一行数据
  renderListItem = ({ item }) => {
    //console.warn(JSON.stringify(item, null, " "));
    let cinema = item.cinema || {};
    return (
      <View style={styles.listItem}>
        <View style={styles.listTitleContainer}>
          <Text style={styles.itemTitle}>维修单编号:{item.workNum}</Text>
        </View>
        <View style={{ padding: 4 }}>
          <Text style={styles.itemBodyText}>影院名称：{cinema.name}</Text>
          <Text style={styles.itemBodyText}>
            地址：{cinema.address || "暂无"}
          </Text>
          <Text style={styles.itemBodyText}>上报时间：{item.createTime}</Text>
        </View>

        <View style={styles.footer}>
          <View style={[styles.btnContainer,{borderColor:"#ccc"}]}>
            <Button title="拒绝" color="#ccc" onPress={() => {}}></Button>
          </View>
          <View style={styles.btnContainer}>
            <Button title="接单" onPress={() => {}}></Button>
          </View>
        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  listItem: {
    marginTop: 6,
    marginLeft: 12,
    marginRight: 12,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "#FFF",
    backgroundColor: "#FFF",
    padding: 10,
    paddingBottom: 0
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "400",
    color: "#000"
  },
  listTitleContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 6
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    padding: 6
  },
  btnContainer: {
    width: 100,
    height: 26,
    borderWidth: 1,
    borderColor: "#3385FF",
    borderRadius: 6,
    justifyContent: "center",
    overflow: "hidden",
    marginRight: 5
  },
  itemBodyText: {
    fontSize: 16,
    lineHeight: 32
  }
});
