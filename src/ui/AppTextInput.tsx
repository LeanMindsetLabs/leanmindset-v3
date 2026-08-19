import { forwardRef } from "react";
import { Platform, TextInput, type TextInputProps, type TextStyle } from "react-native";

/** Removes the default browser focus ring on web (yellow outline on TextInput). */
export const textInputWebFocus = Platform.select<TextStyle>({
  web: {
    outlineStyle: "solid",
    outlineWidth: 0,
    outlineColor: "transparent",
    boxShadow: "none",
  },
  default: {},
});

const AppTextInput = forwardRef<TextInput, TextInputProps>(function AppTextInput({ style, ...props }, ref) {
  return <TextInput ref={ref} {...props} style={[textInputWebFocus, style]} />;
});

export default AppTextInput;
