import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Image } from "react-native";
export const Product = ({
    imageUrl,
    title,
    description
}: {
    imageUrl: string;
    title: string;
    description: string;
}) => {
    return (
        <View className="flex w-full flex-row items-center gap-x-3">
            <View className="flex items-center justify-center rounded-[10px] bg-primary p-2">
                <Image
                    className="aspect-square h-8"
                    source={{ uri: imageUrl }}
                    resizeMode="center"
                />
            </View>
            <View className="flex h-full flex-1">
                <Text className="font-outfit text-lg text-textPrimary">
                    {title}
                </Text>
                <Text
                    className="flex-1 font-outfit text-textSecondary"
                    ellipsizeMode="tail"
                    numberOfLines={1}>
                    {description}
                </Text>
            </View>
        </View>
    );
};
