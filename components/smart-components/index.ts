import {
  ServersideSmartComponentMap,
  SmartComponentMap,
} from "@pantheon-systems/pcc-react-sdk/components";
import { withSmartComponentErrorBoundary } from "./error-boundary";
import InfoCard from "./info-card";
import LeadCapture from "./lead-capture";
import MediaPreview from "./media-preview";
import TileNavigation from "./tile-navigation";

export const serverSmartComponentMap = {
  LEAD_CAPTURE: {
    title: "Lead Capture Form",
    iconUrl: null,
    fields: {
      heading: {
        displayName: "Heading",
        required: true,
        type: "string",
      },
      description: {
        displayName: "Description",
        required: true,
        type: "string",
      },
      inputLabel: {
        displayName: "Input Label",
        required: true,
        type: "string",
      },
      submitButtonText: {
        displayName: "Submit Button Text",
        required: false,
        type: "string",
      },
    },
  },
  MEDIA_PREVIEW: {
    title: "Media Preview",
    iconUrl: null,
    variants: ["standard", "hero"],
    exampleImageUrl: [
      "https://storage.googleapis.com/pcc-prod-user-uploads/preview-media-preview.png",
      "https://pantheon.io/sites/default/files/styles/inline_hero_image/public/2024-03/v1-hero-image%20%281%29_0.webp",
    ],
    fields: {
      url: {
        displayName: "URL",
        required: true,
        type: "string",
      },
    },
  },
  INFO_CARD: {
    title: "Info Card",
    iconUrl: null,
    fields: {
      title: {
        displayName: "Title",
        required: true,
        type: "string",
      },
      body: {
        displayName: "Body Text",
        required: true,
        type: "string",
      },
      icon: {
        displayName: "Icon",
        required: false,
        type: "enum",
        options: ["info", "warning", "success", "error", "tip"],
        defaultValue: "info",
      },
      theme: {
        displayName: "Theme",
        required: false,
        type: "enum",
        options: ["primary", "secondary", "info", "warning"],
        defaultValue: "primary",
      },
    },
  },
  TILE_NAVIGATION: {
    title: "Tile Navigation",
    iconUrl: null,
    fields: {
      documentIds: {
        displayName: "Document IDs",
        required: true,
        type: "object",
        multiple: true,
        fields: {
          item: {
            type: "string",
            displayName: "Document ID",
            required: true,
          },
        },
      },
    },
  },
} satisfies ServersideSmartComponentMap;

export const clientSmartComponentMap: SmartComponentMap = {
  MEDIA_PREVIEW: {
    ...serverSmartComponentMap.MEDIA_PREVIEW,
    reactComponent: withSmartComponentErrorBoundary(MediaPreview),
  },
  LEAD_CAPTURE: {
    ...serverSmartComponentMap.LEAD_CAPTURE,
    reactComponent: withSmartComponentErrorBoundary(LeadCapture),
  },
  INFO_CARD: {
    ...serverSmartComponentMap.INFO_CARD,
    reactComponent: withSmartComponentErrorBoundary(InfoCard),
  },
  TILE_NAVIGATION: {
    ...serverSmartComponentMap.TILE_NAVIGATION,
    reactComponent: withSmartComponentErrorBoundary(TileNavigation),
  },
};
