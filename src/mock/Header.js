import { Compass, Store, Users } from "lucide-react";

export const headerMenues = [
  {
    id: 1,
    icon: <Compass />,
    slug: "/explore?type=trending",
    name: "Explore",
  },
  {
    id: 2,
    icon: <Users />,
    slug: "/groups?type=my-groups",
    name: "Groups",
  },
  {
    id: 3,
    icon: <Store />,
    slug: "/marketplace?type=nfts",
    name: "Marketplace",
  },
];
