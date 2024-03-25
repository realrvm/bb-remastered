import { lazy } from "react";

const ProfileMain = lazy(() => import("./ui/profile-main/ProfileMain"));
const ProfileActive = lazy(() => import("./ui/profile-active/ProfileActive"));
const ProfilePersonal = lazy(
  () => import("./ui/profile-personal/ProfilePersonal"),
);
const ProfileDocs = lazy(() => import("./ui/profile-docs/ProfileDocs"));
const ProfileClient = lazy(() => import("./ui/profile-client/ProfileClient"));

export {
  ProfileMain,
  ProfileActive,
  ProfilePersonal,
  ProfileDocs,
  ProfileClient,
};
