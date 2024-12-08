import { Typography, useTheme } from "@mui/material";
import WidgetWrapper from "../../utils/WidgetWrapper";
import FlexBetween from "../../utils/FlexBetween";
import image from "./mental-health-support-flyer-template_23-2149170508.jpg";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>                                                                                                                           
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
      src={image}
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>Mental Health Care</Typography>
        <Typography color={medium}>MindWell.com</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
      Your pathway to serene and radiant mental well-being, ensuring your mind is refreshed, nurtured, and shining with positivity.
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;