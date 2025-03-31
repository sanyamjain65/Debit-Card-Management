import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Images } from '@/constants/images';



function TabIcon({ focused, icon: Icon, title }: any) {
    return (
        <View className='min-w-[90px] mt-4 justify-center items-center'>
                <Icon
                    width={24}
                    height={24}
                    fill={focused ? "#01D167" : "#DDDDDD"}
                />
                <Text className={`text-[9px] mt-1 font-bold ${focused ? 'text-[#01D167]' : 'text-[#DDDDDD]'}`}>
                    {title}
                </Text>
        </View>

    );
}

const _layout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarItemStyle: {
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                },
                tabBarStyle: {
                    backgroundColor: "#ffffff",
                    height: 56,
                    position: "absolute",
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "index",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={Images.Home} title="Home" />
                    ),
                }}
            />

            <Tabs.Screen
                name="cards"
                options={{
                    title: "cards",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={Images.Pay} title="Debit Card" />
                    ),
                }}
            />
             <Tabs.Screen
                name="payments"
                options={{
                    title: "payments",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={Images.Payment} title="Payments" />
                    ),
                }}
            />
             <Tabs.Screen
                name="credit"
                options={{
                    title: "credit",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={Images.Credit} title="Credit" />
                    ),
                }}
            />
             <Tabs.Screen
                name="profile"
                options={{
                    title: "profile",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={Images.User} title="Profile" />
                    ),
                }}
            />
        </Tabs>
    )
}

export default _layout

const styles = StyleSheet.create({})