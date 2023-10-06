"use client";

import AdminHome from "@web/containers/AdminHome";
import { useRedirectAuth } from "@web/context/auth";
import FedexLayout from "@web/layouts/FedexLayout";

export default function FedexManager() {
  useRedirectAuth("admin");

  return (
    <FedexLayout>
      <AdminHome />
    </FedexLayout>
  );
}
