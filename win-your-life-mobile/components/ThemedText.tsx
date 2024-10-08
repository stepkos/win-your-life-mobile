import { Text, type TextProps, StyleSheet } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?:
    | "default"
    | "title"
    | "titleAlt"
    | "defaultSemiBold"
    | "subtitle"
    | "link";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <Text
      style={[
        { color },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "titleAlt" ? styles.titleAlt : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: "FredokaRegular",
  },
  defaultSemiBold: {
    fontSize: 32,
    lineHeight: 24,
    // fontWeight: "600",s
    fontFamily: "FredokaRegular",
  },
  titleAlt: {
    fontSize: 32,
    // fontWeight: "bold",
    lineHeight: 32,
    color: "#410B0B",
    backgroundColor: "#D8A25E",
    padding: 10,
    borderRadius: 5,
    fontFamily: "FredokaSemiBold",
  },
  title: {
    fontSize: 32,
    // fontWeight: "bold",
    lineHeight: 32,
    color: "#D8A25E",
    padding: 10,
    borderRadius: 5,
    fontFamily: "FredokaSemiBold",
  },
  subtitle: {
    fontSize: 24,
    // fontWeight: "bold",
    fontFamily: "FredokaBold",
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: "#0a7ea4",
  },
});
