import React from "react";
import { View, Text } from "react-native";
import OrderList from "./OrderList"
export default class extends React.Component{
    render(){
        return (
            <View style={{flex:1}}>
                <OrderList></OrderList>
            </View>
        );
    }
}