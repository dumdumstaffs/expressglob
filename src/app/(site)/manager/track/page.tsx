"use client";

import AdminSuite from "@web/containers/AdminSuite";
import { useRedirectAuth } from "@web/context/auth";
import FedexLayout from "@web/layouts/FedexLayout";

export default function FedexManagerTrack() {
  useRedirectAuth("admin");

  return (
    <FedexLayout>
      <AdminSuite />
    </FedexLayout>
  );
}
