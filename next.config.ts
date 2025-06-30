// next.config.ts
import withNextIntl from "next-intl/plugin";

const nextConfig = {
  experimental: {
    serverActions: {},
  },
  // weitere Optionen hier
};

export default withNextIntl()(nextConfig);
